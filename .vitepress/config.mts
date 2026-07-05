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
      { text: 'Beginner', link: '/beginner/' },
      { text: 'Intermediate', link: '/intermediate/' },
      { text: 'Advanced', link: '/advanced/' },
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
        text: 'Advanced',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/advanced/' },
          { text: '01 Why Express', link: '/advanced/01-why-express' },
          { text: '02 Express server', link: '/advanced/02-express-server' },
          { text: '03 PostgreSQL with pg', link: '/advanced/03-postgresql-with-pg' },
          { text: '04 REST API', link: '/advanced/04-rest-api' },
          { text: '05 JWT auth', link: '/advanced/05-jwt-auth' },
          { text: '06 Middleware', link: '/advanced/06-middleware' },
          { text: '07 Docker deploy', link: '/advanced/07-docker-deploy' },
          { text: '08 Integration tests', link: '/advanced/08-integration-tests' },
          { text: '09 GitHub Actions', link: '/advanced/09-github-actions' },
          { text: '10 Production practices', link: '/advanced/10-production-practices' },
        ],
      },
      {
        text: 'Beginner',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/beginner/' },
          { text: '01 Install Node', link: '/beginner/01-install-node' },
          { text: '02 Values and types', link: '/beginner/02-values-and-types' },
          { text: '03 Functions and modules', link: '/beginner/03-functions-and-modules' },
          { text: '04 Read and write JSON', link: '/beginner/04-read-write-json' },
          { text: '05 The add command', link: '/beginner/05-add-command' },
          { text: '06 The list command', link: '/beginner/06-list-command' },
          { text: '07 Tests', link: '/beginner/07-tests' },
        ],
      },
      {
        text: 'Intermediate',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/intermediate/' },
          { text: '01 Why grow it', link: '/intermediate/01-why-grow-it' },
          { text: '02 The done command', link: '/intermediate/02-done-command' },
          { text: '03 The remove command', link: '/intermediate/03-remove-command' },
          { text: '04 Filtering', link: '/intermediate/04-filtering' },
          { text: '05 Async seed with fetch', link: '/intermediate/05-async-seed' },
          { text: '06 Wire the CLI', link: '/intermediate/06-wire-the-cli' },
          { text: '07 Tests', link: '/intermediate/07-tests' },
        ],
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
