# Roofing companies en Florida — sin web vigente / web obsoleta

Listado de roofing companies de Florida (EE. UU.) cuyo **sitio web no está vigente, es obsoleto,
inseguro o directamente no existe**, con su **email oficial real** cuando está publicado. Pensado
para prospección (ofrecer diseño / renovación de sitios web).

## Archivos
- `roofing_florida_leads.xlsx` — 2 hojas: **"Con email"** (71 empresas con correo) y **"Todos los leads"** (165).
- `roofing_florida_leads.csv` — mismo contenido, una sola tabla.

## Columnas
Nombre de la empresa · Número de teléfono · Dirección · Correo electrónico oficial · Sitio web ·
Estado del sitio web · Diagnóstico · Ciudad · Ficha en Google Maps.

## Resultado
- **165 roofing companies distintas** en **35 ciudades** de Florida.
- **71 con email oficial real** (los 4 datos completos).
- 94 con web mala/inexistente pero **sin email publicado** (ver más abajo el porqué).

Reparto por estado de la web:
- `SIN HTTPS (OBSOLETA)` — 131: sitio que carga por `http://` sin SSL → viejo/inseguro.
- `SIN WEB` — 32: la empresa no tiene sitio web.
- `PLATAFORMA GRATUITA` — 1: solo Facebook / Google Sites / builder gratis.
- `FUNCIONAL` (parking) — 1: el dominio existe pero está parqueado / en venta.

## Cómo se obtuvo
1. Scraping de Google Maps en ~25 ciudades de Florida con el actor de Apify
   **`lukaskrivka/google-maps-with-contact-details`** (basado en `compass/crawler-google-places`),
   que además crawlea el sitio de cada empresa para extraer su email. → 549 roofing companies únicas.
2. Clasificación de la web por señal **objetiva de URL**: sin web / `http://` sin SSL / plataforma
   gratuita / dominio parqueado.
3. Verificación de carga real de cada sitio (¿está "vigente o funcional"?).
4. Filtro final: se conservan solo las de web pobre/obsoleta/inexistente y se deduplica por empresa.

## Aclaraciones importantes (honestas)
- **Los emails son 100% reales y extraídos del propio sitio de cada empresa. Ninguno fue inventado
  ni adivinado.** Por eso, donde no había email publicado, la celda queda vacía.
- **Por qué no son 200 con email:** el email se obtiene crawleando la web de la empresa. Las
  compañías con web **mala o inexistente** justamente casi nunca publican email — y las que sí lo
  publican suelen tener web funcional (lo contrario a lo pedido). La intersección real
  *(web pobre/nula + email propio)* es chica: **71** en este barrido de Florida.
- **Falsos positivos descartados:** muchos sitios devolvieron HTTP 403/406 al verificarlos. Eso es
  un **bloqueo del firewall (Cloudflare/WAF) al IP del scraper**, no que la web esté caída. Esas
  empresas (sitios sanos) **se excluyeron** para no ensuciar la lista.
- Conviene revisar a mano antes de contactar: las fichas y emails pueden cambiar con el tiempo.

## Para conseguir más leads con email
El crédito gratuito de Apify ($5) quedó casi agotado en este barrido. Para acercarse a 200 con
email haría falta scrapear más ciudades/condados de Florida (o más profundidad por ciudad), lo que
requiere crédito adicional de Apify.
