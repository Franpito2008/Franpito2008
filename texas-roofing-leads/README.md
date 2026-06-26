# Roofing companies en Texas — sin web vigente / web obsoleta

Listado de roofing companies de Texas (EE. UU.) cuyo **sitio web no está vigente, es obsoleto o
de baja calidad**, con su **email oficial real** verificado. Pensado para prospección (ofrecer
diseño/renovación de sitios web).

## Archivos
- `roofing_texas_leads.xlsx` — planilla con formato (filtros, colores por prioridad).
- `roofing_texas_leads.csv` — mismos datos en CSV (UTF-8).

## Columnas
| Columna | Descripción |
|---|---|
| Nombre de la empresa | Razón social tal como figura en Google Maps |
| Número de teléfono | Teléfono de la ficha de Google Maps |
| Dirección de la empresa | Dirección física |
| Correo electrónico oficial | Email **real** extraído del sitio web de la empresa (no inventado) |
| Sitio web | URL detectada |
| Estado del sitio web | OBSOLETA/mala o CAIDA/no funcional |
| Prioridad de venta | ALTA (deficiencia técnica) / MEDIA (web sin actualizar) |
| Diagnóstico de la web | Motivo concreto por el que la web es deficiente |
| Ciudad / Ficha Google Maps | Referencias |

## Metodología (100% datos reales, sin inventar emails)
1. **Scraping de Google Maps** con el actor de Apify
   `lukaskrivka/google-maps-with-contact-details`, buscando *roofing company* en 18+ ciudades
   repartidas por todo Texas (Houston, Dallas, San Antonio, Austin, Fort Worth, El Paso,
   Corpus Christi, Lubbock, Laredo, Amarillo, Waco, Midland, Tyler, Beaumont, Abilene, etc.).
2. **Emails reales**: el actor extrae los emails publicados en el sitio web de cada empresa.
   No se inventó ni se adivinó ningún correo. Se descartaron emails basura (de Google, imágenes,
   servicios de terceros) y se priorizó el email cuyo dominio coincide con el de la empresa.
3. **Filtro de calidad de web** (verificación propia, visitando cada sitio): se conservaron
   únicamente las empresas cuya web presenta una deficiencia **comprobable**:
   - sin HTTPS,
   - sin versión móvil (no responsive),
   - página caída / vacía / dominio parqueado,
   - sin contenido actualizado (último año detectado ≤ 2021),
   - tecnología/editor obsoleto.
   Se **excluyeron** todas las empresas con un sitio web moderno y funcional.

## Nota sobre la cantidad
La cuenta de Apify usada es de plan **FREE** (tope de USD 5/mes), lo que limitó el escaneo a
~228 roofing companies. De esas, 131 tenían email real y solo **10** cumplían además el criterio
de web obsoleta/caída. Para llegar a 200 leads de este tipo hace falta escanear varios miles de
empresas (más ciudades), lo que requiere ampliar el saldo/plan de Apify.
