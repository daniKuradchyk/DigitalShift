export const HOURLY_RATE = 80; // €/h
export const PM_PCT = 0.10;
export const CONTINGENCY_PCT = 0.12;

export const PROJECT_TYPES: Record<string, { label: string; baseHours: number; description: string }> = {
  "herramienta-interna":  { label: "Herramienta interna / backoffice",         baseHours: 120, description: "Panel de gestión para equipos internos" },
  "portal-clientes":      { label: "Portal de clientes",                        baseHours: 180, description: "Acceso seguro para clientes con datos propios" },
  "dashboard-operativo":  { label: "Panel operativo / dashboard",               baseHours: 130, description: "Visualización de métricas y KPIs en tiempo real" },
  "gestion-procesos":     { label: "Sistema de gestión de procesos",            baseHours: 200, description: "Workflows, aprobaciones y automatización de operaciones" },
  "marketplace":          { label: "Marketplace",                               baseHours: 360, description: "Plataforma con múltiples vendedores y compradores" },
  "plataforma-saas":      { label: "Plataforma SaaS",                           baseHours: 420, description: "Producto multi-tenant con suscripciones" },
  "app-web-corporativa":  { label: "App web con lógica de negocio",             baseHours: 200, description: "Aplicación con reglas de negocio complejas" },
  "ecommerce-custom":     { label: "Ecommerce con lógica personalizada",        baseHours: 280, description: "Tienda online con personalizaciones avanzadas" },
  "app-movil":            { label: "App móvil (iOS + Android)",                 baseHours: 320, description: "Aplicación nativa o híbrida multiplataforma" },
  "api-backend":          { label: "API / backend de integración",              baseHours: 100, description: "Capa de servicios y conectores para sistemas" },
  "plataforma-ia":        { label: "Plataforma con IA / automatización",        baseHours: 280, description: "Pipelines de IA, LLMs y automatización avanzada" },
};

export type ModuleLevel = "none" | "basic" | "medium" | "advanced";

export interface ModuleDef {
  id: string;
  label: string;
  section: string;
  hours: Record<ModuleLevel, number>;
  description?: string;
}

export const MODULES: ModuleDef[] = [
  // Auth & Usuarios
  { id: "auth-basic",       label: "Autenticación básica (email+pass)",   section: "Autenticación",  hours: { none: 0, basic: 16, medium: 28, advanced: 48  }, description: "Login, registro, recuperación de contraseña" },
  { id: "auth-social",      label: "Login social (Google, GitHub…)",      section: "Autenticación",  hours: { none: 0, basic: 12, medium: 20, advanced: 32  } },
  { id: "auth-2fa",         label: "Autenticación de dos factores",        section: "Autenticación",  hours: { none: 0, basic: 16, medium: 24, advanced: 36  } },
  { id: "rbac",             label: "Roles y permisos (RBAC)",              section: "Autenticación",  hours: { none: 0, basic: 20, medium: 40, advanced: 72  }, description: "Control de acceso granular por rol" },

  // Datos y CRUD
  { id: "crud-basic",       label: "CRUD básico de entidades",             section: "Datos",          hours: { none: 0, basic: 24, medium: 48, advanced: 88  } },
  { id: "search-filter",    label: "Búsqueda y filtros",                   section: "Datos",          hours: { none: 0, basic: 16, medium: 32, advanced: 56  } },
  { id: "import-export",    label: "Importación / exportación",            section: "Datos",          hours: { none: 0, basic: 16, medium: 28, advanced: 48  }, description: "CSV, Excel, JSON" },
  { id: "file-upload",      label: "Gestión de archivos",                  section: "Datos",          hours: { none: 0, basic: 12, medium: 24, advanced: 40  } },

  // Lógica de negocio
  { id: "workflow",         label: "Flujos de trabajo / aprobaciones",     section: "Lógica",         hours: { none: 0, basic: 32, medium: 64, advanced: 120 } },
  { id: "notifications",    label: "Notificaciones (email / push / SMS)",  section: "Lógica",         hours: { none: 0, basic: 16, medium: 32, advanced: 56  } },
  { id: "scheduling",       label: "Planificación / calendario / citas",   section: "Lógica",         hours: { none: 0, basic: 24, medium: 48, advanced: 80  } },
  { id: "billing",          label: "Facturación y pagos",                  section: "Lógica",         hours: { none: 0, basic: 32, medium: 64, advanced: 100 }, description: "Stripe, Redsys, suscripciones" },
  { id: "reporting",        label: "Informes y exportación a PDF",         section: "Lógica",         hours: { none: 0, basic: 20, medium: 40, advanced: 64  } },

  // Dashboards & UI
  { id: "charts",           label: "Gráficos e indicadores (KPIs)",        section: "UI Avanzada",    hours: { none: 0, basic: 16, medium: 32, advanced: 56  } },
  { id: "maps",             label: "Mapas y geolocalización",              section: "UI Avanzada",    hours: { none: 0, basic: 20, medium: 40, advanced: 64  } },
  { id: "realtime",         label: "Actualizaciones en tiempo real",       section: "UI Avanzada",    hours: { none: 0, basic: 24, medium: 40, advanced: 64  }, description: "WebSockets, Server-Sent Events" },
  { id: "drag-drop",        label: "Drag & drop / editors visuales",       section: "UI Avanzada",    hours: { none: 0, basic: 20, medium: 40, advanced: 72  } },

  // Integraciones externas
  { id: "erp-crm",          label: "Conector ERP / CRM",                   section: "Integraciones", hours: { none: 0, basic: 32, medium: 60, advanced: 100 }, description: "SAP, Salesforce, HubSpot, Odoo…" },
  { id: "payment-gateway",  label: "Pasarela de pago",                     section: "Integraciones", hours: { none: 0, basic: 20, medium: 36, advanced: 56  } },
  { id: "email-service",    label: "Servicio de email transaccional",      section: "Integraciones", hours: { none: 0, basic: 8,  medium: 16, advanced: 28  } },
  { id: "third-party-api",  label: "API de terceros (genérico)",           section: "Integraciones", hours: { none: 0, basic: 20, medium: 40, advanced: 64  } },

  // IA y automatización
  { id: "llm-chat",         label: "Chatbot / asistente con LLM",          section: "IA",            hours: { none: 0, basic: 32, medium: 64, advanced: 120 } },
  { id: "doc-processing",   label: "Procesamiento de documentos (OCR/IA)", section: "IA",            hours: { none: 0, basic: 24, medium: 56, advanced: 100 } },
  { id: "ml-model",         label: "Modelo de predicción / clasificación", section: "IA",            hours: { none: 0, basic: 40, medium: 80, advanced: 160 } },

  // Mobile
  { id: "mobile-ios",       label: "App iOS nativa",                       section: "Mobile",        hours: { none: 0, basic: 80, medium: 160, advanced: 280 } },
  { id: "mobile-android",   label: "App Android nativa",                   section: "Mobile",        hours: { none: 0, basic: 80, medium: 160, advanced: 280 } },
  { id: "push-notifications",label: "Push notifications móvil",            section: "Mobile",        hours: { none: 0, basic: 16, medium: 28, advanced: 44  } },

  // Admin y soporte
  { id: "admin-panel",      label: "Panel de administración",              section: "Admin",         hours: { none: 0, basic: 32, medium: 56, advanced: 96  } },
  { id: "audit-log",        label: "Log de auditoría / trazabilidad",      section: "Admin",         hours: { none: 0, basic: 16, medium: 28, advanced: 48  } },
  { id: "multi-tenant",     label: "Multi-tenant / multi-organización",    section: "Admin",         hours: { none: 0, basic: 40, medium: 80, advanced: 140 } },
  { id: "i18n",             label: "Internacionalización (i18n)",          section: "Admin",         hours: { none: 0, basic: 16, medium: 28, advanced: 44  } },
];

export const COMPLEXITY_MULTIPLIERS: Record<string, { label: string; mult: number; description: string }> = {
  simple:  { label: "Simple",   mult: 0.80, description: "Pocas entidades, flujos lineales, sin integraciones" },
  medium:  { label: "Media",    mult: 1.00, description: "Lógica moderada, algunas integraciones estándar" },
  high:    { label: "Compleja", mult: 1.35, description: "Reglas de negocio complejas, múltiples sistemas" },
};

export const USERS_SCALE_MULTIPLIERS: Record<string, { label: string; mult: number }> = {
  tiny:    { label: "< 50 usuarios",     mult: 1.00 },
  small:   { label: "50–500 usuarios",   mult: 1.05 },
  medium:  { label: "500–5k usuarios",   mult: 1.12 },
  large:   { label: "> 5k usuarios",     mult: 1.25 },
};

export const DESIGN_LEVELS: Record<string, { label: string; frontendMult: number; extraHours: number; description: string }> = {
  basic:    { label: "Funcional",     frontendMult: 0.80, extraHours: 0,  description: "UI clara sin diseño personalizado" },
  standard: { label: "Estándar",      frontendMult: 1.00, extraHours: 0,  description: "Diseño cuidado con sistema de componentes" },
  premium:  { label: "Premium / UX",  frontendMult: 1.30, extraHours: 56, description: "Investigación UX, animaciones, design system" },
};

export const QA_LEVELS: Record<string, { label: string; pct: number; description: string }> = {
  basic:     { label: "Básico",              pct: 0.08, description: "Tests manuales puntuales" },
  thorough:  { label: "Completo",            pct: 0.15, description: "Testing manual + cobertura unitaria" },
  automated: { label: "Automatizado",        pct: 0.22, description: "Suite de tests unitarios e integración" },
  full:      { label: "QA + E2E",            pct: 0.28, description: "Cobertura completa con tests end-to-end" },
};

export const INFRA_LEVELS: Record<string, { label: string; extraHours: number; description: string }> = {
  basic:    { label: "Básica",    extraHours: 24,  description: "Deploy en Vercel / Railway con CI/CD mínimo" },
  standard: { label: "Estándar", extraHours: 52,  description: "CI/CD completo, entornos staging/producción" },
  advanced: { label: "Avanzada", extraHours: 88,  description: "Kubernetes, alta disponibilidad, multi-región" },
};

export interface SecurityOption {
  id: string;
  label: string;
  hours: number;
}

export const SECURITY_OPTIONS: SecurityOption[] = [
  { id: "pen-testing",    label: "Pentesting básico",             hours: 28 },
  { id: "sso",            label: "SSO / SAML",                    hours: 24 },
  { id: "gdpr-full",      label: "GDPR / RGPD completo",          hours: 20 },
  { id: "e2e-encryption", label: "Cifrado extremo a extremo",     hours: 24 },
  { id: "audit-security", label: "Auditoría de seguridad",        hours: 18 },
  { id: "mfa-advanced",   label: "MFA avanzado (FIDO2 / WebAuthn)",hours: 22 },
  { id: "waf",            label: "WAF + DDoS protection",         hours: 18 },
];

export const SCENARIOS = {
  low:  { label: "Optimista",    mult: 0.75, color: "text-[#63666D]" },
  mid:  { label: "Realista",     mult: 1.00, color: "text-brand-600"  },
  high: { label: "Conservador",  mult: 1.30, color: "text-[#63666D]" },
} as const;

export type ScenarioKey = keyof typeof SCENARIOS;
