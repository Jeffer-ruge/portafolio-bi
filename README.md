# Portafolio de Jefferson Zambrano

Portafolio profesional en español sobre análisis de datos, BI, automatización y operaciones de telecomunicaciones. La identidad visual usa un núcleo de datos como metáfora para la captura, validación y entrega de información.

## Ejecutar

Requiere Node.js 20.9 o superior y pnpm. Playwright utiliza Google Chrome para las comprobaciones de interfaz.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Para verificar la exportación estática y hacer las pruebas de interfaz:

```sh
pnpm lint
pnpm build
pnpm typecheck
pnpm test
```

Para servir la exportación localmente, ejecuta `node scripts/serve.mjs` después de compilar. La vista queda en `http://127.0.0.1:4389`.

## Actualizar

- Edita [content/profile.ts](content/profile.ts) para modificar la trayectoria, las habilidades, el contacto y los casos de estudio.
- Edita [app/globals.css](app/globals.css) para ajustar los tokens, la composición visual y los estilos responsive.
- La hoja de vida usa el archivo indicado de Descargas, `HV_Jefferson_Zambrano_Analista_BI_Automation.pdf`. Para actualizarla, copia el PDF a `public/cv-jefferson-zambrano.pdf` antes de compilar.
- El núcleo estático es un render ilustrativo. En escritorio compatible, el núcleo WebGL carga cuando la portada está a la vista. El lector puede pausarlo o activarlo en la portada. En móvil y con movimiento reducido, la vista inicial es estática.
- Scroll Split Card despliega el proceso de captura, validación y visualización al desplazarse. En móvil y con movimiento reducido, los tres pasos se leen directamente.
- Ejecuta `blender --background --python scripts/blender_core.py` en un equipo con Blender 4.x para obtener el modelo editable y su exportación GLB.

## Publicar en GitHub Pages

El código fuente está en `main` y GitHub Pages sirve la exportación estática de `gh-pages`. Para actualizar el sitio, configura `NEXT_PUBLIC_SITE_URL=https://jeffer-ruge.github.io/portafolio-bi/` en el entorno antes de ejecutar `pnpm build`. Después actualiza `gh-pages` con el contenido de `out/` y conserva el archivo `.nojekyll`. La variable define el prefijo de rutas, las URL canónicas y el sitemap.

Consulta el [informe de QA](docs/QA.md), el [inventario de recursos](docs/recursos.md) y los [storyboards](docs/raylight/storyboards.md).
