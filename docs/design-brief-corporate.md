# Qubelia — Brief del rediseño corporativo (2026)

Objetivo: que la web parezca la de una firma global (consultora / tecnológica grande),
no una landing generada por IA. Referencias: Deloitte, Meta, Stripe (páginas corporativas),
McKinsey. El sistema ya está implementado en `src/app/globals.css`; este brief define
cómo aplicar y qué eliminar en cada componente.

## Principios

1. **Blanco y tinta.** Fondo `#FFFFFF` (alterno `#F5F6F8` para bandas). Texto casi negro
   `#101014`, secundario `#3D4046`, atenuado `#63666D`.
2. **Un solo acento.** Azul corporativo `brand-600` (`#2C4BC4`) SOLO para: la barra del
   eyebrow, enlaces/hover, el CTA azul y detalles pequeños. Nunca degradados, nunca glow.
3. **Tipografía manda.** Titulares grandes en Geist, peso 600–650, tracking negativo.
   Usa las clases `.text-display`, `.text-h1/2/3`. Sin `gradient-text`.
4. **Líneas finas, no cajas flotantes.** Separación por `border-[#E4E6EA]` (1px).
   Tarjetas planas: fondo blanco, borde 1px, radio máx 4px, SIN sombra; hover = borde
   se oscurece (`hover:border-[#101014]`) o subrayado del enlace. Nada de blur/glass.
5. **Movimiento mínimo.** Solo fundidos de entrada (opacity + y ≤ 20px, duración ≤ 0.7s,
   una vez). PROHIBIDO: float, ping, pulse, shimmer, rotate, blur() animado, marquees
   infinitos, `animate-ping`, bucles `repeat: Infinity`.
6. **Cero atrezzo "tech".** Eliminar: ventanas de consola falsas (puntos de semáforo,
   `font-mono` decorativo, prompts `$`), badges pill con punto "en vivo", auroras,
   grids de fondo, orbes, `backdrop-blur`, `mix-blend`, `brightness-0 invert`
   (en fondo claro es `brightness-0 opacity-40`).

## Recetas concretas

- **Eyebrow de sección**: `<p className="section-tag">Texto</p>` — ya renderiza barra
  azul + uppercase gris. No añadir puntos ni iconos dentro.
- **Título de sección**: `.text-h2` + párrafo intro `text-lg text-[#3D4046] max-w-2xl`.
- **Botones**: componente `Button`. `primary` = negro sólido; `shine` = azul sólido;
  `ghost` = contorno gris→negro. En bandas oscuras usar clases manuales:
  `bg-white text-[#101014] hover:bg-white/90` o `border border-white/30 text-white hover:border-white`.
- **Enlaces de texto**: `text-[#101014] font-medium underline decoration-[#C9CCD3] underline-offset-4 hover:decoration-brand-600` o flecha `→` que se desplaza (`group-hover:translate-x-1`).
- **Tarjetas**: `border border-[#E4E6EA] bg-white p-8` (+ `hover:border-[#101014] transition-colors` si son clicables). Listas dentro con `divide-y divide-[#E4E6EA]`.
- **Stats**: numeral grande `text-4xl font-semibold tracking-tight text-[#101014]` +
  etiqueta `text-sm text-[#63666D]`. En filas divididas por líneas verticales
  (`divide-x divide-[#E4E6EA]`), no en tarjetas glow.
- **Bandas oscuras** (solo CTA final y footer): clase `band-dark` (re-mapea tokens).
  Texto blanco, botón blanco sólido. Máximo una banda oscura por página además del footer.
- **Iconos**: lucide-react a 20px, `text-[#101014]` o `text-brand-600`, trazo fino.
  Sin contenedores circulares con glow; si hace falta contenedor: cuadrado 40px
  `border border-[#E4E6EA]`.
- **Imágenes/ilustraciones SVG decorativas oscuras**: si un componente dibuja paneles
  navy/neón, sustituir por composición plana: bloques `#F5F6F8`, líneas `#E4E6EA`,
  acentos `brand-600`, texto tinta.
- **Formularios**: los estilos base ya están en globals.css (blanco, borde gris, focus azul).
  Etiquetas `text-sm font-medium text-[#101014]`.

## Qué NO tocar

- Copy/textos, estructura semántica (h1/h2, aria-*, ids de anclas como `#contacto`),
  metadatos SEO, JSON-LD, tracking (`trackContactChannelClick`, GTM), lógica de
  formularios y calculadoras, rutas/href.
- `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`, `var(--border)`,
  `var(--bg-surface)` ya apuntan al sistema claro: los `style={{color: "var(--…)"}}`
  existentes pueden quedarse. Lo que hay que eliminar son los colores duros del tema
  oscuro: `#060B1A`, `rgba(6,11,26,…)`, `rgba(10,17,40,…)`, `rgba(65,105,225,…)`,
  `bg-blue-500/[0.06]`, `text-white` (fuera de bandas oscuras/botones), `text-blue-300`,
  `border-blue-400/15`, sombras `shadow-[0_0_…rgba(65,105,225…)]`, etc.

## Ejemplares canónicos (leer antes de editar)

- `src/app/globals.css` — tokens y clases del sistema.
- `src/components/sections/Hero.tsx` — hero editorial, stats con divisores, logos grises.
- `src/components/sections/Header.tsx` — nav corporativa.
- `src/components/sections/Footer.tsx` — banda oscura `band-dark`.
- `src/components/common/Button.tsx` — variantes de botón.
