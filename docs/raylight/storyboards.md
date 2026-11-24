# Producción audiovisual en Raylight

Estos cuatro guiones se pueden producir cuando exista acceso autorizado al editor. Las versiones estáticas del sitio ya funcionan. Usa 1080p a 24 fps para el máster, sin música obligatoria. Para web, exporta MP4 H.264 y WebM VP9, poster WebP y una versión móvil 720p.

## Identidad profesional · 10 segundos

| Tiempo | Plano y movimiento |
| --- | --- |
| 0–2 s | En fondo #030712, un trazo #00A3FF revela una sección del anillo. Acercamiento lento desde tres cuartos. |
| 2–6 s | Tres órbitas se alinean alrededor de un núcleo facetado. Enfoque pasa de un punto de luz al núcleo. |
| 6–9 s | El núcleo se desplaza a la derecha y aparece «Jefferson Zambrano» con «Datos, BI y automatización». |
| 9–10 s | Disminuye el brillo hasta recuperar el primer encuadre. |

Prompt para Raylight: «Crea un loop de 10 s con un núcleo facetado de cristal azul y metal oscuro, tres anillos orbitales y cámara lenta. Colores #030712, #0066FF, #00A3FF, #00D4FF. Inserta solamente Jefferson Zambrano y Datos, BI y automatización. Mantén texto inmóvil durante la lectura».

## Trayectoria · 15 segundos

| Tiempo | Plano y movimiento |
| --- | --- |
| 0–4 s | Puntos de luz se agrupan en filas. Texto «Captura y validación». |
| 4–9 s | Las filas se conectan en una secuencia única. Texto «Automatización de reportes». |
| 9–15 s | El encuadre abre y aparece una composición abstracta de indicadores. Texto «Seguimiento operativo». |

Prompt para Raylight: «Video de 15 s sobre captura, automatización y reporting en operaciones de telecomunicaciones. Usa datos abstractos sin números, fondos oscuros, transiciones luminosas, textos breves y una cámara coherente». 

## Automatización de captura · 12 segundos

| Tiempo | Plano y movimiento |
| --- | --- |
| 0–3 s | Una hoja abstracta representa el flujo manual sin celdas legibles. |
| 3–8 s | Dos carriles muestran captura y validación antes de confluir hacia el reporte. |
| 8–12 s | Los indicadores se ordenan. Cierra con «Excel · VBA · n8n». |

Prompt para Raylight: «Explica en 12 s cómo macros, validaciones y flujos apoyan la reportería. Mantén la representación como diagrama conceptual. Inserta capturas reales únicamente si se suministra material aprobado y anonimizado».

## Seguimiento APOLO2 · 12 segundos

| Tiempo | Plano y movimiento |
| --- | --- |
| 0–4 s | Una retícula abstracta representa instalaciones sin coordenadas reales. |
| 4–8 s | Tres grupos de registros convergen en un reporte consolidado. |
| 8–12 s | «Avances diarios de instalación» y «Seguimiento de proveedores» quedan legibles. |

Prompt para Raylight: «Video de 12 s sobre consolidación diaria de avances de instalación en el proyecto APOLO2, con geometría abstracta y sin ubicaciones, logos, cifras ni imágenes operativas privadas».

## Integración prevista

Reproducción manual accesible, `playsInline`, `preload="none"` y pausa al salir del viewport. El poster debe cumplir la función de alternativa cuando el dispositivo solicita menos movimiento o ahorro de datos.
