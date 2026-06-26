# Roofing Companies en Texas — Datos de contacto

Extracción de empresas de techado (roofing) en el estado de Texas, EE.UU., con
correos electrónicos oficiales verificados, generada con los actores de Apify
`lukaskrivka/google-maps-with-contact-details` (que internamente usa
`compass/crawler-google-places`).

## Archivos

- **`roofing_companies_texas.xlsx`** — Planilla principal (2 hojas).
- **`roofing_companies_texas.csv`** — Misma data principal en CSV.

### Hoja 1 — "200 Roofing Companies"
200 empresas **distintas** con email oficial verificado. Columnas:

| Columna | Detalle |
|---|---|
| Nombre de la empresa | Nombre tal cual figura en Google Maps |
| Numero de telefono | En formato internacional (+1...) |
| Direccion | Dirección completa |
| Correo electronico oficial | Email **real** extraído de la web/redes de la empresa |
| Tipo de email | Propio del dominio / Gmail-Outlook de la empresa / otro dominio |
| Sitio web | URL listada (o "sin sitio web") |
| Estado del sitio web | Resultado de verificación HTTP en vivo |
| Calidad web (lead) | Clasificación de qué tan débil/obsoleta es su web |
| Observacion | Nota explicativa |

Las filas están **ordenadas de peor a mejor presencia web**: arriba aparecen las
empresas sin sitio, con sitio caído, solo redes sociales, o sin HTTPS (web vieja).
Esas son los mejores prospectos para venderles diseño/marketing web.

### Hoja 2 — "Sin sitio web funcional"
Empresas roofing detectadas **sin sitio web, con sitio caído, o usando solo
Facebook**. Es lo más fiel al pedido de "sin web funcional", pero la mayoría
**no tiene email** (sin web, no hay de dónde extraerlo).

## Cómo se verificaron los emails (no inventados)

- Los emails los extrae el actor de Apify directamente del sitio web / perfiles
  reales de cada empresa. **No se inventó ni se adivinó ningún correo.**
- Se clasificó cada email:
  - **Propio (dominio de la empresa)**: el email usa el mismo dominio que su web
    (ej. `info@revelesroofing.com`). 167 casos.
  - **Propio (Gmail/Outlook de la empresa)**: cuenta de correo gratuita propia de
    la empresa (ej. `texasroofsystems@gmail.com`). 70 casos.
  - **Propio (otro dominio)**: email real en un dominio distinto al de la web. 27 casos.
- Se descartaron emails sospechosos/genéricos de terceros (sentry, wix, godaddy,
  no-reply, etc.).

## Nota importante sobre "sin sitio web" + "con email"

Hay una tensión técnica real: el email se obtiene **scrapeando el sitio web** de la
empresa. Una empresa **sin sitio web casi nunca tiene un email para extraer**.

De 480 empresas roofing distintas relevadas en Texas:
- 264 tenían email oficial verificable.
- Solo 35 no tenían sitio (o lo tenían caído / solo Facebook).
- Solo ~4 cumplían **ambas** condiciones a la vez.

Por eso la entrega prioriza **200 empresas con email garantizado** y marca con
claridad cuáles tienen web débil/obsoleta (81 de las 200: 3 caídas, 1 solo redes,
77 sin HTTPS/tecnología vieja), para que puedas filtrar los mejores prospectos.
La Hoja 2 lista por separado las empresas sin web funcional.

## Cobertura geográfica
43 ciudades de Texas (Houston, Dallas, San Antonio, Austin, Fort Worth, El Paso,
Corpus Christi, Lubbock, Amarillo, Midland, Odessa, Waco, Tyler, Abilene, etc.).
