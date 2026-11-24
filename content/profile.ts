export type Project = {
  slug: string;
  title: string;
  label: string;
  intro: string;
  challenge: string;
  contribution: string;
  outcome: string;
  tools: readonly string[];
  visual: "orbit" | "grid" | "dashboard";
};

export const profile = {
  name: "Jefferson Zambrano",
  fullName: "Jefferson Hair Zambrano Ruge",
  title: "Analista de Datos BI | Automatización de Procesos | Reporting & Data Analytics | Data Engineering",
  location: "Bogotá, Colombia",
  linkedin: "https://www.linkedin.com/in/jefferson-hair-zambrano-ruge-219a60245/",
  whatsapp: "https://wa.me/573232277151",
  email: "jehazaru2000@gmail.com",
  summary: "Automatizo la captura y los reportes, y desarrollo tableros BI para el seguimiento de operaciones.",
} as const;

export const navigation = [
  ["inicio", "Inicio"], ["sobre-mi", "Sobre mí"], ["experiencia", "Experiencia"],
  ["habilidades", "Habilidades"], ["proyectos", "Proyectos"], ["formacion", "Formación"],
  ["cv", "CV"], ["contacto", "Contacto"],
] as const;

export const experience = [
  {
    role: "Líder de mesa de telefonía móvil", company: "Fractalia · Telefónica",
    period: "Sep. 2024 – Actualidad", tools: ["Excel", "VBA", "n8n", "HTML", "JavaScript", "ApexCharts"],
    detail: "Estandaricé la captura con validaciones y macros de Excel para reducir errores y tiempo de consolidación. Automaticé la actualización de reportes con VBA y n8n, cruzo datos de múltiples fuentes y mantengo tableros con avances por sede, zona y fase. Elaboro informes para eventos electorales y coordino la documentación de las entregas.",
  },
  {
    role: "Analista de soporte de implementación", company: "Fractalia · Telefónica",
    period: "Ene. 2024 – Sep. 2024", tools: ["Bases de datos", "Reporting", "SSH"],
    detail: "Analicé datos de rendimiento y preparé informes de implementación. Administré respaldos y validé los entregables, además de coordinar accesos para intervenciones técnicas.",
  },
  {
    role: "Líder de mesa de telefonía fija", company: "Fractalia · Proyecto APOLO2",
    period: "Jul. 2023 – Dic. 2023", tools: ["Validación de datos", "Informes operativos"],
    detail: "Consolidé los avances diarios de instalación en puestos de votación y elaboré reportes para el seguimiento de proveedores durante las elecciones territoriales de 2023.",
  },
  {
    role: "Analista administrativo", company: "Xorex · Proyecto SENA",
    period: "Inicio en sep. 2022", tools: ["Cruce de bases", "Control documental"],
    detail: "Verifiqué registros de instalaciones de telecomunicaciones en sedes del SENA y di seguimiento a pendientes técnicos y documentales de interventoría.",
  },
  {
    role: "Líder de mesa de telefonía fija", company: "Xorex · Proyecto APOLO",
    period: "Oct. 2021 – Sep. 2022", tools: ["Excel avanzado", "Control de instalaciones"],
    detail: "Consolidé bases de control e informes de avance de instalaciones y coordiné planes de trabajo con áreas internas y operadores externos.",
  },
  {
    role: "Analista de calidad", company: "Atento Colombia · Campaña Empresas Movistar",
    period: "Inicio en dic. 2019", tools: ["Indicadores", "PQR", "Remedy"],
    detail: "Atendí solicitudes de pymes y empresas sobre productos fijos. Hice seguimiento a indicadores y respondí PQR por canales escritos.",
  },
  {
    role: "Asistente contable y administrativo", company: "Sion Trade S.A.S.",
    period: "Inicio en jul. 2014", tools: ["Excel", "Control administrativo", "Reportes de productividad"],
    detail: "Gestioné información de clientes y contratos en Excel y preparé reportes diarios de productividad para apoyar el control administrativo.",
  },
] as const;

export const skills = [
  { title: "Datos y SQL", kind: "bi", image: "/skills/datos-sql.webp", summary: "Cruce de fuentes, procesos ETL y validación de registros.", items: ["SQL", "Python", "Excel avanzado", "Access"] },
  { title: "Automatización de procesos", kind: "automation", image: "/skills/automatizacion.webp", summary: "Captura de datos con validaciones, macros y flujos para actualizar reportes.", items: ["VBA", "n8n", "Power Automate"] },
  { title: "IA y orquestación", kind: "ai", image: "/skills/agentes-ia.webp", summary: "Formación en integración de herramientas y automatización con agentes.", items: ["Agentes de IA", "MCP", "n8n"] },
  { title: "Dashboards y reporting", kind: "web", image: "/skills/tableros-bi.webp", summary: "Indicadores de gestión y tableros interactivos para el seguimiento operativo.", items: ["Power BI", "HTML", "JavaScript", "ApexCharts"] },
] as const;

export const projects: readonly Project[] = [
  {
    slug: "tableros-de-avance-operativo",
    title: "Tableros web de avance operativo",
    label: "BI y reportería",
    intro: "Indicadores y tableros interactivos para revisar el avance de las implementaciones.",
    challenge: "Las áreas del proyecto necesitaban consultar el avance por sede, zona y fase a partir de registros de distintas fuentes.",
    contribution: "Desarrollé y mantuve tableros interactivos con HTML, JavaScript y ApexCharts. Crucé y validé las bases que alimentan los indicadores operativos.",
    outcome: "El equipo pudo consultar los avances y detectar pendientes por sede, zona y fase desde una vista compartida.",
    tools: ["HTML", "JavaScript", "ApexCharts", "Validación de datos"],
    visual: "dashboard",
  },
  {
    slug: "automatizacion-de-captura",
    title: "Automatización de captura y reporting",
    label: "Automatización de procesos",
    intro: "Macros, validaciones y flujos de trabajo aplicados a la captura y consolidación de información operativa.",
    challenge: "El seguimiento operativo dependía de pasos repetitivos de digitación y consolidación. Los informes necesitaban registros consistentes para que el equipo pudiera consultar el estado de las actividades.",
    contribution: "Estandaricé formatos de captura, incorporé validaciones y desarrollé macros de Excel para automatizar el ingreso de datos. Usé flujos n8n en la consolidación y actualización de reportes.",
    outcome: "El proceso sustituyó pasos de digitación manual y facilitó la preparación de reportes operativos.",
    tools: ["Excel", "VBA", "n8n"],
    visual: "orbit",
  },
  {
    slug: "seguimiento-electoral-apolo2",
    title: "Seguimiento de instalaciones · APOLO2",
    label: "Análisis operativo",
    intro: "Consolidación de avances diarios de proveedores para el seguimiento de instalaciones en puestos de votación.",
    challenge: "Durante las elecciones territoriales de 2023, el equipo necesitaba una vista consolidada del avance de las instalaciones de telefonía fija en los puestos de votación.",
    contribution: "Actualicé las bases de control, crucé registros reportados por proveedores y elaboré informes de avance para la Registraduría Nacional del Estado Civil.",
    outcome: "Los informes dieron a la mesa de operación información para revisar instalaciones y priorizar pendientes con proveedores.",
    tools: ["Excel", "Cruces de datos", "Reporting"],
    visual: "grid",
  },
];
