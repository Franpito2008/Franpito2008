# Plantillas de cold email — roofing companies Florida (en inglés)

Dos plantillas. El script `outreach_mailer.gs` elige automáticamente cuál usar según la
columna **Template** del spreadsheet (`A` o `B`) y reemplaza los campos `{{...}}`.

Campos que se reemplazan solos: `{{Company}}`, `{{City}}`, `{{ProblemLine}}` (la línea
personalizada de cada empresa), `{{YourName}}`, `{{YourEmail}}`.

---

## Template A — empresa SIN sitio web real (landing desde cero)
**Subject:** `Quick question about {{Company}}'s website`

```
Hi {{Company}} team,

{{ProblemLine}}

These days the first thing a homeowner does before calling a roofer is look them up
online — and right now {{Company}} is hard to find. I build clean, mobile-friendly
landing pages for roofing companies that show your work, your reviews, and a clear
"get a free quote" button.

I'd be happy to design a free mockup of a homepage for {{Company}} so you can see
exactly how it would look before deciding anything. Want me to send it over?
Just reply "yes".

Best,
{{YourName}}
{{YourEmail}}

P.S. Not interested? Reply "stop" and I won't reach out again.
```

---

## Template B — empresa CON sitio web obsoleto/viejo (rediseño)
**Subject:** `Noticed something on {{Company}}'s website`

```
Hi {{Company}} team,

{{ProblemLine}}

I design and rebuild websites specifically for roofing companies. I'd be glad to put
together a free, no-obligation mockup of what a modern, secure, mobile-friendly site
for {{Company}} could look like — fast, and built to turn visitors in {{City}} into
booked jobs.

If you'd like to see it, just reply "yes" and I'll send it over in a couple of days.
No cost and no pressure.

Best,
{{YourName}}
{{YourEmail}}

P.S. If you'd rather not hear from me, just reply "stop" and I won't email again.
```

---

## Ejemplos de `{{ProblemLine}}` ya generados (uno por empresa)
- **Web sin HTTPS:** *"I came across {Company}'s website and noticed it still loads over an
  outdated, non-secure connection — Chrome actually shows visitors a 'Not secure' warning
  before they even see your work."*
- **Sin HTTPS + sin mobile + vacía:** se le suma *"It also doesn't adjust to phones... On
  top of that the page is nearly empty, so it isn't really bringing you any jobs."*
- **Solo Facebook:** *"I looked up {Company} online and noticed your only web presence is a
  Facebook page — there's no real website where homeowners can find you."*
- **Sin web:** *"I went looking for {Company} online and couldn't find a website anywhere —
  just your Google listing."*

## Por qué funcionan (cold email que convierte)
- **Cortos** (un cold email largo no se lee).
- Abren con un **problema real y específico** de esa empresa → no parece plantilla.
- Ofrecen un **mockup gratis** → bajísimo compromiso para que respondan "yes".
- CTA de una sola palabra ("yes") → fácil de contestar desde el celular.
- Incluyen **opt-out** ("stop") → cumple la ley CAN-SPAM de EE. UU.

## Buenas prácticas de envío (para no caer en spam)
1. Usá un **dominio aparte** (no tu Gmail personal), calentado 2-3 semanas.
2. **30-50 envíos/día por casilla**, no más. Subí el volumen de a poco.
3. Mandá en **horario de Florida** (mañana, martes a jueves rinde mejor).
4. Hacé **1 seguimiento** a los 3-4 días a quienes no respondieron ("just bumping this up").
5. Evitá palabras tipo "FREE!!!", signos de exclamación de más y links acortados.
