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
- El resto del cuerpo es tu copy original, sin cambios.
- No se inventó ningún nombre de contacto (uso "{Empresa} Team" para no adivinar personas).

## Cómo enviar
```bash
export GMAIL_USER="tucorreo@gmail.com"
export GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx"   # App Password de Google
# Prueba sin enviar:
python3 send_emails.py --dry-run
# Prueba real a 1 empresa:
python3 send_emails.py --video /ruta/al/video.mp4 --reply-to tu@correo.com --limit 1
# Envío completo:
python3 send_emails.py --video /ruta/al/video.mp4 --reply-to tu@correo.com
```
El script espera 40–90 s aleatorios entre cada envío y registra todo en `sent_log.csv`
(podés reanudar con `--start N`).

## Antes de enviar — leer
1. **Adjuntar el video**: hay que pasar el archivo del video de 20 s con `--video`.
2. **Riesgo de spam**: 81 cold-emails desde un Gmail común, con video pesado adjunto,
   pueden marcar la cuenta. Mejor: subir el video a un link (YouTube no listado /
   Loom / Drive) y poner el link en el cuerpo, en vez de adjuntarlo. Para volumen
   serio conviene una plataforma con calentamiento de dominio (Instantly, Lemlist).
3. **Legal (CAN-SPAM, EE.UU.)**: el email comercial debe incluir una dirección
   postal física real y una forma de darse de baja. Conviene agregar esas 2 líneas
   al pie antes de enviar.
