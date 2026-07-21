# Flow Circle

> **A community memory layer that keeps care, skills, and trust moving.**

Flow Circle is for the help that already happens between people: sharing a room, fixing a bike, reviewing a draft, cooking an extra plate, listening after midnight, or making space for someone new.

It gives these moments a gentle structure without turning relationships into a marketplace, a leaderboard, or an obligation to help everyone.

## Devpost preview

- **English static interactive demo:** [flow-circle-demo.helloworld-zoey.chatgpt.site/demo.html](https://flow-circle-demo.helloworld-zoey.chatgpt.site/demo.html)
- **Project presentation:** [flow-circle-demo.helloworld-zoey.chatgpt.site](https://flow-circle-demo.helloworld-zoey.chatgpt.site/)

The English demo is a safe, static walkthrough for hackathon reviewers. It has no accounts, backend, or data writes.

## Run this repository

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The presentation is available at `/`; the interactive English product demo is at `/demo.html`.

## What's in this repository

This is a complete, runnable static-site codebase for the Devpost submission:

- `index.html`, `styles.css`, and `script.js` — the project presentation page;
- `public/demo.html`, `public/demo.css`, and `public/demo.js` — the interactive English Flow Circle demo;
- `package.json` and `vite.config.js` — the Vite development and build setup;
- `screenshots/` — seven captures of the English interactive demo.

No backend, credentials, or real community data are included here.

## Actual runnable product

The actual working product is currently in Chinese:

- **Live app:** [liudong-circle-demo.helloworld-zoey.chatgpt.site](https://liudong-circle-demo.helloworld-zoey.chatgpt.site/)
- **Source of truth:** [Ciaoye/community-currency — main](https://github.com/Ciaoye/community-currency/tree/main)

That product contains the application flows and persistence work. This public repository contains the self-contained English static site used for the hackathon, rather than a copy of the Chinese backend.

## What it does

- lets a member ask for help or offer what they can give;
- keeps completed mutual aid distinct from a future intention;
- records circle-owned mutual credit as a shared memory, not a personal score;
- lets someone leave a “good card” of appreciation without turning recognition into payment;
- gives each community its own boundary, references, people, and rules.

## Design principles

- **You can ask.** Needing help is not a failure.
- **You can say no.** Refusal carries no penalty.
- **You can leave it unrecorded.** Care does not need to become data to be real.
- **Recognition is not payment.** Good cards never become money, points, or rankings.
- **Circles make their own rules.** There is no universal currency or rulebook.

## How Codex & GPT-5.6 were used

Codex with GPT-5.6 was a research-and-making partner throughout this project. We began by studying existing community-currency practices and interviewing stakeholders in communities this could serve. Together, those materials became the project's needs, principles, case notes, and product documents.

From that core, Codex & GPT-5.6 helped translate the work into a design language and prototype directions, build and deploy an early static test page, and shape the English Devpost preview. The AI did not decide what a community should value; it helped make the research, boundaries, and design choices legible and testable.

## Repository scope

This is a one-off public repository for the Devpost submission, but it contains the complete English static website source and assets. It does not use or require a separate local Git checkout.