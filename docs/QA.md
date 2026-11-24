# QA del portafolio azul compacto

Verificación local de la exportación de producción de Next.js en Chrome y Windows.

| Área | Qué se comprueba |
| --- | --- |
| Diseño responsive | Portada en diez anchos de 320 a 2560 px, con medición de proporciones y ancho útil en 320, 390 y 1440 px. |
| Casos de estudio | Los tres casos aparecen en una fila a 1440 px y en una lista con miniaturas a 390 y 320 px. Cada ficha enlaza a su detalle. |
| Tablero BI | El dispositivo gira con el desplazamiento y se estabiliza en una vista plana. Las cifras del ejemplo siguen identificadas como datos de demostración. |
| Movimiento | Activación, pausa y reanudación del núcleo 3D. Separación, giro y regreso de los tres paneles. Vista estática con movimiento reducido y en móvil táctil. |
| Navegación y contenido | Acceso por teclado, menú, enlaces por ancla, experiencia, educación y PDF de la hoja de vida. |

El orden de la portada prioriza el perfil, la demostración y los proyectos. En el móvil, las ilustraciones acompañan los títulos como miniaturas. En escritorio, las escenas animan durante el desplazamiento natural de la página. El tablero termina sin transformación 3D para que los datos se puedan leer de frente.

## Evidencias

- [Portada de escritorio](capturas/azul-compacto-1440.png)
- [Portada móvil](capturas/azul-compacto-390.png)
- [Casos en escritorio](capturas/proyectos-compactos-1440.png)
- [Casos en móvil](capturas/proyectos-compactos-390.png)
- [Tablero BI en escritorio](capturas/tablero-bi-scroll.png)
- [Tablero BI en móvil](capturas/tablero-bi-compacto-390.png)

La validación móvil se realizó con dimensiones y entrada táctil emuladas. El comportamiento en Safari, el rendimiento con GPU física y los equipos móviles reales quedan fuera de esta medición.

Las fechas de inicio de Sion Trade, Atento y el proyecto SENA se muestran tal como se documentó en la versión anterior. La hoja de vida descargable sigue siendo el PDF fuente suministrado por el usuario.

