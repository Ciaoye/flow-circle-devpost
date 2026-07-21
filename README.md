# Flow Circle

> **A community memory layer that keeps care, skills, and trust moving.**

Flow Circle is a community tool for the help that already happens between people: sharing a room, fixing a bike, reviewing a draft, cooking an extra plate, listening after midnight, or making space for someone new.

Most of these exchanges happen in group chats and in-between moments. They matter, but they are difficult to see later. Flow Circle gives them a gentle structure without turning relationships into a marketplace, a leaderboard, or a promise to serve everyone.

## The idea

The number is a shadow. The relationship is real.

Flow Circle helps a community remember what is already moving through it. A person can ask for help, offer what they can, record a completed exchange, or write a short story of appreciation. Each action has a different meaning, so the product keeps them separate instead of flattening everything into points.

The goal is not to make every act of care measurable. The goal is to make it a little easier to ask, a little easier to offer, and a little easier for trust to travel.

## Inspiration

I practice non-consumption: swapping instead of buying, creating instead of consuming, and looking for surplus resources and value already around us. My events, consultations, and stays have often moved through direct exchange — but mostly between two people. When there is no immediate reciprocal match, an exchange can remain unresolved, even when both people are willing.

I wanted the exchange relationships already around me to become visible as a network: people connected through me should be able to find, trust, and support one another too. This is also a “Don’t Do It Yourself” experiment: a request can be a wish and an invitation to co-create, not a purchase order.

Flow Circle also makes space to notice invisible labor and small acts of care. It must not turn them into piecework, a ranking, or a claim on anyone’s time. Care badges are recognition, not payment; mutual credit records how contribution and receipt move through a circle, not a personal debt. The test is simple: can it make asking easier without making anyone harder to refuse, compare, or consume?

## What it does

### 1. Circles

A circle is a small social boundary where people, context and shared rules are known. Different groups can define their own references and rituals:

- a traveling exchange circle for hosting, cooking and local knowledge;
- a study circle for feedback, co-learning and listening practice;
- a living-together circle for meals, tools, rides and shared work.

There is no single universal currency or rulebook.

### 2. Needs and offers

Members can say what they need or what they can offer in one sentence. An offer is not a contract, and posting an offer does not mean agreeing to help everyone. It is simply an invitation to start a conversation.

### 3. Mutual credit

When a real exchange has already happened, the people involved can add it to their circle's shared record. Mutual credit makes one movement visible: what someone has contributed to the community, and what they have received from it.

It is not a debt between two people, a bank loan, a score, or a measure of personal worth. A balance simply describes how care and contribution have flowed through the circle over time. Unfinished plans do not change the record.

### 4. Care badges

A care badge is a small commemorative badge of appreciation, carrying a short story from the person who received help. It does not create credit, payment, a ranking, or an obligation to repay. It gives visible language to care that would otherwise disappear, and it can travel with a person across circles.

## How one moment flows

1. **Ask or offer.** Someone says one sentence in the language they already use with people they know.
2. **Help happens in real life.** The conversation continues in person or in an existing chat; Flow Circle does not replace the relationship.
3. **Remember it, if useful.** The people involved can record a completed exchange, or leave it unrecorded. Both are valid.
4. **Let trust travel.** Circle credit can circulate inside a circle. A care badge can help a person be recognized in another circle.

## Design principles

- **You can ask.** Needing help is not a failure or a debt.
- **You can say no.** Refusal carries no penalty and requires no explanation.
- **You can leave it unrecorded.** Not all care needs to become data to be real.
- **You can correct the story.** People involved can question, change or withdraw a record.
- **Recognition is not payment.** Care badges never become money, points or rankings.
- **Circles make their own rules.** A community decides what its references mean and where its boundaries are.

## What is in this prototype

This folder contains a self-contained, English-only presentation site for the Flow Circle hackathon submission. It includes:

- a visual explanation of the problem and product idea;
- the four core objects: circles, needs/offers, mutual credit and care badges;
- an illustrated four-step exchange loop;
- three example circles with different contexts and rules;
- a small interactive activity feed with Needs, Offers and Care badges filters;
- responsive layouts for desktop and mobile;
- a clear static boundary: no accounts, no backend and no data writes.

## Live versions

- **Actual runnable product (Chinese):** [liudong-circle-demo.helloworld-zoey.chatgpt.site](https://liudong-circle-demo.helloworld-zoey.chatgpt.site/). This is the working product with its database and application flows.
- **Source of truth:** the parent project’s [`main` branch](https://github.com/Ciaoye/community-currency/tree/main).
- **English static Devpost preview:** [flow-circle-demo.helloworld-zoey.chatgpt.site/demo.html](https://flow-circle-demo.helloworld-zoey.chatgpt.site/demo.html). It is a safe, English-only walkthrough for reviewers, not a translated production deployment and not connected to the backend.

## How Codex & GPT-5.6 were used

Codex with GPT-5.6 was a research-and-making partner throughout the project. We began by studying how existing community currencies work and by interviewing stakeholders in the communities this could serve. Together, those materials became the project’s needs, principles, case notes, and product documents.

From that core, Codex & GPT-5.6 helped turn the ideas into a design language and prototype directions, build and deploy an early static test page, and shape this English Devpost preview. The live Chinese product is now moving toward backend-supported testing. The AI did not decide what a community should value; it helped make the research, boundaries, and design choices legible and testable.

## Elevator pitch

### Short tagline

**A gentle exchange circle where care is seen and trust can travel.**

### Longer version

**Flow Circle helps existing exchanges become a visible circle: people can ask for help, offer what they can, and let trust travel beyond a one-to-one match — without turning relationships, kindness, or invisible labor into a marketplace, a leaderboard, or piecework.**

## Run locally

Open `index.html` directly, or serve this folder with any static server:

```bash
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Scope and publishing

This is a static presentation prototype, not the backend application. It intentionally stays independent so the idea can be shown safely and clearly at a hackathon.

The folder is ignored by the parent repository’s `.gitignore`, so it is not included in the project’s GitHub sync. Publish this folder separately as a static site or upload screenshots from it to Devpost.
