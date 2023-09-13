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
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-Present Fadli Al Baihaqi'
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
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
