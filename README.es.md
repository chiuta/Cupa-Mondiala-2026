# Simulador del Mundial 2026 (no oficial)

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versión:** 7.6.5 · **Última actualización:** 2026-10-23

Idiomas de la interfaz: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Simulador ficticio del Mundial 2026 (48 selecciones, 104 partidos) en un único archivo HTML, sin servidor y sin cuenta. **No está afiliado a la FIFA, no contiene resultados reales y no es un pronóstico.**

**Aplicación en línea:** https://chiuta.github.io/Cupa-Mondiala-2026/

![Captura de pantalla](screenshot.es.png)

## Qué es

Un juego/experimento de simulación: la aplicación genera aleatoriamente un torneo completo (grupos, terceros puestos, dieciseisavos, octavos, cuartos, semifinales, partido por el tercer puesto y final), con marcadores, goleadores con el minuto, tarjetas, sanciones y estadísticas de partido. El formato (12 grupos de 4, los dos primeros más los 8 mejores terceros, 32 equipos en la fase eliminatoria) y los grupos siguen el torneo real del 11 de junio al 19 de julio de 2026; **los resultados los inventa un modelo simple** (fuerzas subjetivas de 1 a 5 para cada selección, goles según la distribución de Poisson, semilla). El torneo real ha terminado; nada de la aplicación refleja lo que ocurrió realmente en el campo.

## Funciones

Verificadas en el código y en el navegador (Chromium sin interfaz):
- Simulación completa con un clic (botón «Ejecutar» o tecla R), con la semilla mostrada; «Replay» desde el historial rehace la misma simulación (misma semilla y mismas fuerzas).
- «Forzar»: eliges una selección que debe ganar obligatoriamente el torneo simulado (recibe una bonificación de fuerza y sus resultados eliminatorios se arreglan). Es un escenario del tipo «qué pasaría si», sin valor estadístico.
- Resumen de la simulación actual (campeona, subcampeona, tercer puesto, máximo goleador) en el banner de «Grupos» y «Finales», con el botón «📋 Copiar resumen»: copia un texto simple que precisa que la simulación es ficticia (la dirección de la página solo se añade cuando la página se sirve por http/https).
- Grupos con clasificaciones y desempates (puntos, enfrentamientos directos, diferencia de goles, goles, juego limpio según las tarjetas simuladas, luego sorteo con la semilla), clasificación de los terceros, cuadro eliminatorio con la numeración oficial de los partidos (M73–M104) y diagrama SVG.
- Asignación de los terceros en los dieciseisavos según la tabla de 495 combinaciones (Anexo C del reglamento), transcrita de fuentes públicas (véase «Límites»).
- Goleadores con el minuto (incluida la prórroga, penalti, tiro libre, autogol), tarjetas amarillas/rojas, sanciones (2 amarillas = 1 partido; roja = 1 partido; las amarillas se borran tras la fase de grupos y tras los cuartos), clasificación de goleadores.
- Probabilidades mostradas en los partidos eliminatorios: calculadas con el mismo modelo de Poisson que usa la simulación (no son pronósticos).
- Historial (máximo 50 simulaciones, en el navegador) con filtrado, etiquetas, comparación de 2–4 simulaciones, estadísticas agregadas, estadísticas por selección y cara a cara, estadísticas por estadio.
- Batch: 50 / 200 / 500 / 1000 simulaciones; muestra las frecuencias del modelo (no probabilidades reales del torneo).
- Editor de fuerzas (1–5 para cada selección) con preajustes y preajustes propios guardados en local.
- Exportación / importación JSON del historial; enlace para compartir `#s=…` (la simulación comprimida en la dirección).
- Horas de los partidos en ET y en hora de Rumanía (ET + 7 horas), modo compacto, logros, impresión, atajos de teclado (se pueden desactivar desde la guía).

## Cómo se usa

1. Abre la página; en la primera carga se genera automáticamente una simulación.
2. Pulsa «🎲 Ejecutar» (o R) para una nueva; opcionalmente elige antes una selección en «Forzar».
3. Recorre las fases en la barra de pestañas: Grupos, 3.er puesto, Dieciseisavos, Octavos, Cuartos, Semifinales, Finales.
4. En «Historial» puedes ver, rehacer (Replay), etiquetar, compartir (🔗 Share), comparar o eliminar simulaciones.
5. En «Batch» elige el número de simulaciones y lee las frecuencias de los resultados.
6. «🎚️ Strengths» abre el editor de fuerzas; los cambios afectan a las simulaciones futuras.
7. «⬇️ Export» guarda el historial en un archivo JSON; «⬆️ Import» lo vuelve a cargar.
8. La tecla «?» abre la guía con los atajos; Esc cierra las ventanas.

## Privacidad y red

- No hay solicitudes de red: no encontré en el código ningún `fetch`, XHR, WebSocket, script, fuente, imagen o iframe externo. La página contiene una política CSP (`connect-src 'none'`, `default-src 'none'`) que los bloquea; la única URL del archivo es el espacio de nombres SVG, al que no se accede.
- Hosts externos contactados: **ninguno**. No hay telemetría, cuenta ni cookies.
- Almacenamiento local (`localStorage`, claves con el prefijo `cupa-mondiala-2026.`): el historial de simulaciones, las fuerzas personalizadas y los preajustes, las pestañas visitadas, el modo compacto, el ajuste de los atajos y algunas marcas de logros. Si `localStorage` está bloqueado (por ejemplo, en modo privado), la aplicación funciona y el historial queda solo en la sesión. Si el espacio se llena, se eliminan las simulaciones más antiguas y se te avisa.
- Atención: en GitHub Pages todas las páginas `chiuta.github.io/...` comparten el mismo `localStorage` (mismo origen); las claves de esta aplicación llevan prefijo, pero otras páginas del mismo dominio podrían leerlas o modificarlas.
- Los enlaces `#s=…` y los archivos JSON importados se tratan como datos no fiables: tamaños limitados (también tras la descompresión), JSON validado estrictamente, campos reconstruidos a partir de valores permitidos y mostrados como texto (protección contra XSS, «bombas zip» y contaminación de prototipos). Un enlace recibido te pide confirmación antes de importar.
- No solicita permisos del navegador (cámara, ubicación, notificaciones, etc.). Compartir por enlace usa el portapapeles solo por acción tuya.
- La aplicación no es una PWA instalable: no tiene service worker; funciona sin conexión solo si guardas el archivo o el navegador lo mantiene en caché.

## Límites y advertencias

- **Simulación ficticia.** Los marcadores, goles, tarjetas y estadísticas son aleatorios. No son los resultados reales del torneo y no son pronósticos. Los valores de «Batch» reflejan las fuerzas subjetivas elegidas, no probabilidades reales.
- **Jugadores reales.** Los nombres de jugadores se usan solo como etiquetas; los goles, tarjetas y sanciones que se les atribuyen son inventados. Las plantillas de la aplicación no son las oficiales y no han sido verificadas.
- **Modelo simplificado.** Desde la v7.4 la media de goles del modelo es ≈2,7 por partido (medida en 300 simulaciones: 2,69, incluida la prórroga; en los Mundiales recientes ≈2,6–2,8); antes era ≈3,7. Las simulaciones antiguas siguen marcadas en la aplicación y «Replay» las reproduce exactamente con su propio modelo. No hay lesiones, forma ni plantillas reales; los penaltis, tiros libres, autogoles y prórrogas tienen porcentajes fijos.
- **Calendario.** Los grupos corresponden al sorteo real (verificados en la página de Wikipedia del torneo). Las fechas, estadios y horas (ET) proceden de calendarios públicos de terceros (uno solo para los grupos, otro para los dieciseisavos, otro para los octavos hasta la final); las horas de octavos en adelante son las de la versión inicial de la aplicación y no se han confirmado de forma independiente. Puede haber errores.
- **Terceros (Anexo C).** La tabla de 495 combinaciones se transcribió de Wikipedia (incluido un espejo de ella) y se validó automáticamente: exhaustividad, grupos elegibles para cada partido, concordancia con el caso real documentado (fila 67). No se ha comparado fila a fila con el PDF oficial de la FIFA.
- **Desempate.** Para el empate total se sortea con la semilla de la simulación; no se usa el ranking de la FIFA.
- **Semilla.** El generador mulberry32 tiene una semilla de 32 bits: reproducible, pero no criptográfico. Un replay idéntico presupone el mismo motor; las simulaciones creadas con versiones anteriores (marcadas en la aplicación) usaron un cuadro eliminatorio aproximado y no se reproducen exactamente.
- No afiliado a la FIFA; «FIFA», «World Cup» y los nombres de selecciones, estadios y jugadores pertenecen a sus propietarios y se usan solo de forma descriptiva.

## Ejecución local / sin conexión

Descarga `index.html` y ábrelo en un navegador; no necesita servidor ni internet. Los enlaces para compartir usan la dirección del archivo abierto (en `file://` pueden ser largos e inutilizables en otros navegadores).

## Licencia

MIT — véase el archivo `LICENSE`.

## Autor

Alexio — Alexandru-Ionuț Chiuță, contacto: alexio@trom.tf

## Resumen

Un simulador ficticio y no oficial del formato del Mundial 2026 de la FIFA (48 selecciones, 104 partidos) en un único archivo HTML sin conexión. Todos los marcadores, goleadores, tarjetas y estadísticas son salida aleatoria de un modelo de Poisson simple con fuerzas subjetivas de las selecciones; no son resultados reales ni pronósticos, y los nombres de los jugadores son meras etiquetas. Están implementados los desempates de grupo, el cuadro eliminatorio oficial y la asignación de los terceros (tabla del Anexo C, transcrita de fuentes públicas); las importaciones y los enlaces compartidos se validan estrictamente. Sin solicitudes de red, sin telemetría; los datos quedan en localStorage. No afiliado a la FIFA.

## Historial / Changelog

### 7.6.5 — 2026-10-23
- Las claves de almacenamiento llevan ahora el prefijo de la aplicación (`cupa-mondiala-2026.*`); los datos existentes (historial, fuerzas, preajustes, idioma, ajustes) se migran automáticamente al iniciar y las copias antiguas `.fff.json` siguen pudiendo importarse.
- fff-kit 1.2.0: almacenamiento sin prefijo corregido
- Los cuadros nativos alert/confirm/prompt se sustituyen por diálogos FFF.dialog accesibles y traducidos (fff-kit 1.2.0).

### 7.6.3 — 2026-10-22
- fff-kit 1.1.4: objetivos táctiles y tamaño mínimo de texto; objetivos táctiles/texto corregidos

### 7.6.2 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 600 000 iteraciones, protección anti-clickjacking

### 7.6.1 — 2026-10-22
- Accesibilidad y móvil: los cuadros de diálogo bloqueantes del navegador (alertas, confirmaciones, solicitudes de texto) se sustituyen por notificaciones no bloqueantes y diálogos modales traducidos (8 idiomas), incluida la alternativa de copia del resumen y del enlace para compartir.
- Móvil: el texto mide al menos 12 px en pantallas estrechas y el resumen del aviso de ficción tiene un área táctil mayor.
- La etiqueta técnica enumera ahora los 8 idiomas de la interfaz (opciones estáticas en el selector de idioma).

### 7.5.0 — 2026-10-14
- Copia de seguridad y etiquetado de datos (fff-kit).

### 12 de octubre de 2026 (v7.4.1)
- 7.4.1 — 2026-10-12: la versión y la fecha de la última actualización se muestran en la aplicación

### 11 de octubre de 2026 (v7.4)
- El modelo de goles se recalibró: las intensidades de Poisson se escalan por 0,72, de ≈3,7 a ≈2,7 goles/partido (las probabilidades mostradas usan la misma escala).
- Cada simulación tiene ahora el campo `gm` (modelo de goles); las creadas antes (`gm` ausente) se muestran con una nota y «Replay» las reproduce idénticamente con el modelo antiguo (verificado: misma semilla, mismos marcadores que en la v7.3). La exportación/importación conserva `gm`.

### 11 de octubre de 2026 (v7.3)
- Resumen copiable de la simulación (campeona, subcampeona, tercer puesto, máximo goleador) en los banners «Grupos» y «Finales».
- CSP: `script-src` con hash SHA-256, sin `'unsafe-inline'`.

### 11 de octubre de 2026 (v7.2)
- La barra de advertencia y el panel de controles son ahora regiones de referencia (`section` con nombre): axe 0 infracciones, incluida `region`.
- La lista «Forzar» está agrupada por grupos (A–L) en lugar de un bloque plano de 48 entradas; sin el prefijo «⚡» repetido.
- En pantallas ≤520 px la cabecera y la advertencia son más compactas, y el panel de controles es una sola fila desplazable en horizontal (ocupa mucho menos pantalla).
- El diagrama del cuadro eliminatorio es enfocable con el teclado; versión v7.2.
