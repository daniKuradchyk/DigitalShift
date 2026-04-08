#!/usr/bin/env node
/**
 * auto-blog.cjs — Daily auto-publishing system for Qubelia blog.
 *
 * Picks the next unpublished post from the editorial calendar,
 * injects it into posts.ts, updates the sitemap, commits and pushes.
 *
 * Usage:
 *   node scripts/auto-blog.cjs           — publish 1 post
 *   node scripts/auto-blog.cjs --count 3 — publish 3 posts at once
 *   node scripts/auto-blog.cjs --list    — show pending posts
 *   node scripts/auto-blog.cjs --reset   — reset published state
 *
 * Designed for daily execution via Windows Task Scheduler or cron.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ── Paths ───────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, "..");
const POSTS_FILE = path.join(ROOT, "src", "lib", "posts.ts");
const SITEMAP_FILE = path.join(ROOT, "src", "app", "sitemap.ts");
const STATE_FILE = path.join(__dirname, ".auto-blog-state.json");
const CALENDAR_DIR = __dirname;

// ── Helpers ─────────────────────────────────────────────────────────────
function today() {
  return new Date().toISOString().slice(0, 10);
}

function readState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  }
  return { published: [], lastDate: null };
}

function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: ROOT, encoding: "utf8", stdio: "pipe" });
}

// ── Load Editorial Calendar ─────────────────────────────────────────────
function loadCalendar() {
  const files = fs.readdirSync(CALENDAR_DIR)
    .filter((f) => f.startsWith("editorial-calendar") && f.endsWith(".json"))
    .sort();

  let allPosts = [];
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(CALENDAR_DIR, file), "utf8"));
    allPosts = allPosts.concat(data);
  }
  return allPosts;
}

// ── Build TypeScript source for a post ──────────────────────────────────
function postToTS(post, dateStr) {
  const esc = (s) => JSON.stringify(s);

  const sectionsTS = post.sections
    .map(
      (s) =>
        `      {\n        title: ${esc(s.title)},\n        body: [\n${s.body
          .map((b) => `          ${esc(b)},`)
          .join("\n")}\n        ],\n      }`
    )
    .join(",\n");

  const faqsTS = post.faqs
    .map(
      (f) =>
        `      {\n        q: ${esc(f.q)},\n        a: ${esc(f.a)},\n      }`
    )
    .join(",\n");

  const highlightsTS = post.highlights
    ? `\n    highlights: [\n${post.highlights.map((h) => `      ${esc(h)},`).join("\n")}\n    ],`
    : "";

  const ctaTS = post.cta
    ? `\n    cta: {\n      label: ${esc(post.cta.label)},\n      href: ${esc(post.cta.href)},\n      text: ${esc(post.cta.text)},\n    },`
    : "";

  return `  {
    slug: ${esc(post.slug)},
    title: ${esc(post.title)},
    description:
      ${esc(post.description)},
    h1: ${esc(post.h1)},
    date: ${esc(dateStr)},
    author: baseAuthor,
    tags: ${JSON.stringify(post.tags)},
    intro:
      ${esc(post.intro)},
    sections: [
${sectionsTS}
    ],${highlightsTS}
    faqs: [
${faqsTS}
    ],${ctaTS}
  },`;
}

// ── Inject post into posts.ts ───────────────────────────────────────────
function injectPost(postTS) {
  let content = fs.readFileSync(POSTS_FILE, "utf8");
  const marker = "\n];\n\nexport const postsMeta";
  if (!content.includes(marker)) {
    // Try alternative marker
    const alt = "];\n\nexport const postsMeta";
    if (!content.includes(alt)) {
      throw new Error("Cannot find injection marker in posts.ts");
    }
    content = content.replace(alt, `\n${postTS}\n];\n\nexport const postsMeta`);
  } else {
    content = content.replace(marker, `\n${postTS}\n];\n\nexport const postsMeta`);
  }
  fs.writeFileSync(POSTS_FILE, content, "utf8");
}

// ── Update sitemap date ─────────────────────────────────────────────────
function updateSitemap(dateStr) {
  let content = fs.readFileSync(SITEMAP_FILE, "utf8");
  const match = content.match(/const siteLastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  if (match) {
    content = content.replace(
      `const siteLastUpdated = "${match[1]}"`,
      `const siteLastUpdated = "${dateStr}"`
    );
    fs.writeFileSync(SITEMAP_FILE, content, "utf8");
  }
}

// ── CLI ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.includes("--list")) {
  const state = readState();
  const calendar = loadCalendar();
  console.log(`\n📋 Calendario editorial: ${calendar.length} posts total\n`);
  calendar.forEach((p, i) => {
    const status = state.published.includes(p.id) ? "✅" : "⏳";
    console.log(`  ${status} ${String(i + 1).padStart(2)}. ${p.title}`);
  });
  const pending = calendar.filter((p) => !state.published.includes(p.id)).length;
  console.log(`\n  Publicados: ${state.published.length} | Pendientes: ${pending}\n`);
  process.exit(0);
}

if (args.includes("--reset")) {
  writeState({ published: [], lastDate: null });
  console.log("🔄 Estado reseteado. Todos los posts están pendientes.");
  process.exit(0);
}

// Number of posts to publish in this run
const countIdx = args.indexOf("--count");
const count = countIdx !== -1 ? parseInt(args[countIdx + 1], 10) || 1 : 1;

// ── Main ────────────────────────────────────────────────────────────────
function main() {
  const state = readState();
  const calendar = loadCalendar();
  const dateStr = today();

  // Find unpublished posts
  const pending = calendar.filter((p) => !state.published.includes(p.id));
  if (pending.length === 0) {
    console.log("✅ Todos los posts del calendario editorial están publicados.");
    console.log("   Añade más entradas en archivos editorial-calendar-*.json");
    process.exit(0);
  }

  const toPublish = pending.slice(0, count);
  console.log(`\n📝 Publicando ${toPublish.length} post(s) — ${dateStr}\n`);

  // Pull latest changes first
  try {
    git("pull --rebase origin main");
    console.log("   ✅ Repo actualizado (git pull)");
  } catch (e) {
    console.log("   ⚠️  No se pudo hacer pull (puede ser la primera vez)");
  }

  // Inject each post
  const publishedSlugs = [];
  for (const post of toPublish) {
    const ts = postToTS(post, dateStr);
    injectPost(ts);
    state.published.push(post.id);
    publishedSlugs.push(post.slug);
    console.log(`   ✅ ${post.title}`);
  }

  // Update sitemap
  updateSitemap(dateStr);
  console.log("   ✅ Sitemap actualizado");

  // Git commit & push
  try {
    git("add src/lib/posts.ts src/app/sitemap.ts");

    const titles = toPublish.map((p) => `- ${p.title}`).join("\\n");
    const commitMsg =
      toPublish.length === 1
        ? `blog: ${toPublish[0].title}`
        : `blog: add ${toPublish.length} new SEO posts`;

    const fullMsg = `${commitMsg}\n\nAuto-published on ${dateStr}:\n${toPublish.map((p) => `- ${p.slug}`).join("\n")}`;

    // Write commit message to temp file to avoid shell escaping issues
    const msgFile = path.join(__dirname, ".commit-msg.tmp");
    fs.writeFileSync(msgFile, fullMsg);
    git(`commit -F "${msgFile}"`);
    fs.unlinkSync(msgFile);
    console.log("   ✅ Commit creado");

    git("push origin main");
    console.log("   ✅ Push completado");
  } catch (err) {
    console.error("❌ Error en git:", err.message);
    // Still save state so we don't retry failed posts
    writeState(state);
    process.exit(1);
  }

  // Save state
  state.lastDate = dateStr;
  writeState(state);

  console.log(`\n🚀 Publicado exitosamente:`);
  publishedSlugs.forEach((s) => console.log(`   /blog/${s}`));
  console.log(`\n   Posts restantes: ${pending.length - toPublish.length}`);
}

main();
