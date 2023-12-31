import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/javascript-docs/',
  cleanUrls: true,
  lang: 'en-US',
  lastUpdated: true,
  srcDir: 'src',

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    // fr: {
    //   label: 'French',
    //   lang: 'fr', // optional, will be added  as `lang` attribute on `html` tag
    // }
  },

  title: 'JavaScript Documentation',
  description: 'JavaScript Documentation Collection',

  head: [
    ['link', { rel: 'icon', href: 'https://www.alibaihaqi.com/favicon.ico' }]
  ],

  themeConfig: {

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduction/' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      copyright: 'Copyright © 2023 - Present by Fadli Al Baihaqi'
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Introduction', link: '/introduction/' },
          { text: 'Getting Started', link: '/introduction/getting-started' }
        ]
      },
      {
        text: 'Basic Knowledge',
        collapsed: true,
        items: [
          { text: 'General Info', link: '/basic/' },
          { text: 'Variables', link: '/basic/variables' }
        ]
      },
      {
        text: 'Data Structure',
        collapsed: true,
        items: [
          { text: 'General Info', link: '/data-structure/' },
          { text: 'Big O Notation', link: '/data-structure/big-o-notation' },
        ]
      },
      {
        text: 'NestJS',
        items: [
          { text: 'General Info', link: '/nestjs/' },
          { text: 'Basic Implementation', link: '/nestjs/basic-implementation' },
          { text: 'Module, Controller, and Service', link: '/nestjs/module-controller-service' },
          { text: 'Middleware, Guard, Pipes, and Interceptor', link: '/nestjs/middleware-guard-pipes-interceptor' },
          { text: 'Http Module', link: '/nestjs/http' },
        ]
      },
      {
        text: 'Bun',
        items: [
          { text: 'Getting Started', link: '/bun/' },
          { text: 'Create Application', link: '/bun/create-application' },
          { text: 'Bun as a Package Manager', link: '/bun/package-manager' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alibaihaqi' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/alibaihaqi/' }
    ]
  }
})
