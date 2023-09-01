---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "JavaScript Documentation"
  tagline: Develop your JavaScript project
  actions:
    - theme: brand
      text: Introduction
      link: /introduction/
    - theme: alt
      text: Getting Started
      link: /introduction/getting-started

features:
  - title: Basic Knowledge
    details: Understand the basic
    link: /basic/
  - title: Nest JS
    details: Build your backend using Nest JS
    link: /nestjs/
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-name-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
}
</style>