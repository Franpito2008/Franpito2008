#!/usr/bin/env python3
"""
Envia los 81 correos personalizados a las roofing companies, con el video adjunto.

USO:
  export GMAIL_USER="tucorreo@gmail.com"
  export GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx"   # App Password de Google (16 caracteres)
  python3 send_emails.py --video /ruta/al/video.mp4 --from-name "Franco Samtoni" [--reply-to tu@correo.com]

OPCIONES:
  --dry-run            No envia, solo muestra que haria.
  --limit N            Envia solo a las primeras N empresas (para probar).
  --start N            Empieza desde la fila N (para reanudar).
  --delay-min / --delay-max   Segundos de espera aleatoria entre envios (default 40-90).

NOTA: Gmail permite ~500 envios/dia. Enviar 81 cold-emails de golpe puede activar
filtros de spam. El script va de a uno con pausas. Para volumen serio conviene
una plataforma de cold email (Instantly/Lemlist) con calentamiento de dominio.
"""
import os, sys, json, time, random, argparse, smtplib, mimetypes
from email.message import EmailMessage

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--video",required=False,help="ruta al video de 20s a adjuntar")
    ap.add_argument("--from-name",default="Franco Samtoni")
    ap.add_argument("--reply-to",default=None)
    ap.add_argument("--recipients",default=os.path.join(os.path.dirname(__file__),"recipients.json"))
    ap.add_argument("--dry-run",action="store_true")
    ap.add_argument("--limit",type=int,default=None)
    ap.add_argument("--start",type=int,default=0)
    ap.add_argument("--delay-min",type=float,default=40)
    ap.add_argument("--delay-max",type=float,default=90)
    a=ap.parse_args()

    user=os.environ.get("GMAIL_USER"); pwd=os.environ.get("GMAIL_APP_PASSWORD")
    if not a.dry_run and (not user or not pwd):
        sys.exit("ERROR: faltan GMAIL_USER / GMAIL_APP_PASSWORD en el entorno.")
    if a.video and not os.path.exists(a.video):
        sys.exit(f"ERROR: no existe el video {a.video}")

    recips=json.load(open(a.recipients))
    recips=recips[a.start:]
    if a.limit: recips=recips[:a.limit]

    sent_log=os.path.join(os.path.dirname(a.recipients),"sent_log.csv")
    logf=open(sent_log,"a")

    vid_bytes=None; vid_type=("video","mp4"); vid_name=None
    if a.video:
        vid_bytes=open(a.video,"rb").read()
        guess=mimetypes.guess_type(a.video)[0] or "video/mp4"
        vid_type=tuple(guess.split("/",1))
        vid_name=os.path.basename(a.video)

    server=None
    if not a.dry_run:
        server=smtplib.SMTP_SSL("smtp.gmail.com",465)
        server.login(user,pwd)

    for idx,r in enumerate(recips,1):
        msg=EmailMessage()
        msg["From"]=f'{a.from_name} <{user or "you@gmail.com"}>'
        msg["To"]=r["email"]
        msg["Subject"]=r["subject"]
        if a.reply_to: msg["Reply-To"]=a.reply_to
        msg.set_content(r["body"])
        if vid_bytes:
            msg.add_attachment(vid_bytes,maintype=vid_type[0],subtype=vid_type[1],filename=vid_name)
        if a.dry_run:
            print(f"[DRY] {idx}/{len(recips)} -> {r['email']:34} | {r['subject']}")
            continue
        try:
            server.send_message(msg)
            print(f"[OK]  {idx}/{len(recips)} -> {r['email']} ({r['company']})")
            logf.write(f"{r['email']},{r['company']},sent\n"); logf.flush()
        except Exception as e:
            print(f"[FAIL]{idx}/{len(recips)} -> {r['email']}: {e}")
            logf.write(f"{r['email']},{r['company']},FAILED:{e}\n"); logf.flush()
        if idx<len(recips):
            time.sleep(random.uniform(a.delay_min,a.delay_max))

    if server: server.quit()
    logf.close()
    print("Listo.")

if __name__=="__main__":
    main()
