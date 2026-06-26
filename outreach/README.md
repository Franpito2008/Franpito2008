# Campaña de outreach — 81 roofing companies (web débil / sin web)

Correos personalizados ofreciendo rediseño de landing page a las 81 empresas de
Texas con sitio web obsoleto, caído o inexistente (todas con email verificado).

## Archivos
- `recipients.json` — lista lista para enviar (empresa, email, asunto, cuerpo).
- `emails_personalized.csv` — la misma data en CSV para revisar/editar.
- `eml/*.eml` — un borrador por empresa (importable a cualquier cliente de correo).
- `send_emails.py` — script de envío por SMTP (Gmail) con adjunto de video y pausas.

## Personalización aplicada
- Asunto: `A website concept for {Nombre de la empresa}`
- Saludo: `Hi {Nombre de la empresa} Team,`
- El video va como **link de Google Drive en el cuerpo** (no adjunto).
- Pie con línea de baja ("reply unsubscribe") + dirección postal.
- El resto del cuerpo es tu copy original, sin cambios.
- No se inventó ningún nombre de contacto (uso "{Empresa} Team" para no adivinar personas).

## ⚠️ Pendiente antes de enviar
1. **Reemplazar la dirección postal**: en el cuerpo aparece el placeholder
   `[REEMPLAZAR CON TU DIRECCION POSTAL REAL...]`. Hay que poner una dirección real
   (casa, PO Box o buzón virtual). No se inventa por ley (CAN-SPAM).
2. **Compartir el video de Drive como "Cualquiera con el enlace"**, si no los
   destinatarios no lo van a poder ver.
3. **App Password de Google** para `francosamtoni@gmail.com`.

## Cómo enviar
```bash
export GMAIL_USER="francosamtoni@gmail.com"
export GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx"   # App Password de Google
# Prueba sin enviar:
python3 send_emails.py --dry-run
# Prueba real a 1 empresa:
python3 send_emails.py --limit 1
# Envío completo:
python3 send_emails.py
```
El video ya va como link en el cuerpo, así que NO hace falta `--video`.
El script espera 40–90 s aleatorios entre cada envío y registra en `sent_log.csv`
(podés reanudar con `--start N`).

## Riesgo
81 cold-emails desde un Gmail común pueden activar filtros de spam aunque el video
sea un link. El envío lento (1 por vez con pausas) ayuda. Para volumen serio conviene
una plataforma con calentamiento de dominio (Instantly, Lemlist).
