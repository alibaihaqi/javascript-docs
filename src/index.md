---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'JavaScript Documentation'
  tagline: Develop your JavaScript project
  actions:
    - theme: brand
      text: Introduction
      link: /introduction/
    - theme: alt
      text: Getting Started
      link: /introduction/getting-started

features:
  - title: Beginner
    details: Build a Node CLI todo app — no frameworks, no third-party packages
    link: /beginner/
  - title: Intermediate
    details: Grow the CLI todo — done/remove commands, filtering, and async fetch seeding
    link: /intermediate/
  - title: Advanced
    details: Express API with PostgreSQL, JWT auth, Docker, and CI/CD pipeline
    link: /advanced/
  - title: Basic Knowledge
    details: Understand the basic
    link: /basic/
  - title: Nest JS
    details: Build your backend using Nest JS
    link: /nestjs/
  - title: Bun
    details: Build your backend using Bun
    link: /bun/

---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-name-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
}
</style>