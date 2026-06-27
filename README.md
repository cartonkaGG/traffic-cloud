# Cloud Agency

Premium digital agency website — веб-розробка, Telegram-боти та автоматизація бізнесу.

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — анімації та scroll-ефекти
- **Zustand** — Cloud Studio configurator

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Telegram Leads

Заявки з калькулятора відправляються через `/api/leads` у Telegram-чат.
Для Vercel додайте Environment Variables:

- `TELEGRAM_BOT_TOKEN` — токен бота з BotFather
- `TELEGRAM_CHAT_ID` — id чату або групи, куди мають приходити заявки

## Project Structure

```
app/                  # Next.js App Router pages
components/
  effects/            # Liquid glass, section backgrounds
  layout/             # Navbar, footer, chrome
  sections/           # Landing page sections
  studio/             # Cloud Studio builder
lib/                  # Design tokens, studio store
public/               # Static assets (hero video, mascot)
```

## Features

- Cinematic hero with video background & liquid glass typography
- Animated section backgrounds (aurora, mesh, pulse)
- Cloud Studio — online site brief builder at `/studio`
- Services, portfolio, process & contact sections
- Mobile-first responsive design
- Reduced motion support

## Live

[traffic-cloud.vercel.app](https://traffic-cloud.vercel.app)
