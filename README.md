<p align="center">
  <a href="https://nuxtjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Nuxt-2.15.3-brightgreen" alt="Nuxt version badge" />
  </a>
  <a href="https://vuetifyjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Vuetify-1.11.3-blue" alt="Vuetify version badge" />
  </a>
  <a href="https://www.cypress.io/" target="_blank">
    <img src="https://img.shields.io/badge/Cypress-6.8.0-brightgreen" alt="Cypress version badge" />
  </a>
</p>

<p align="center">
  <a href="https://axios.nuxtjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Axios-5.13.1-brightgreen" alt="Axios version badge" />
  </a>
  <a href="https://github.com/nuxt-community/proxy-module" target="_blank">
    <img src="https://img.shields.io/badge/@nuxtjs/proxy-2.1.0-brightgreen" alt="Proxy version badge" />
  </a>
  <a href="https://akryum.github.io/v-tooltip/#/" target="_blank">
    <img src="https://img.shields.io/badge/VTooltip-2.1.3-brightgreen" alt="VTooltip version badge" />
  </a>
  <a href="https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt" target="_blank">
    <img src="https://img.shields.io/badge/@nuxtjs/CookieUniversalNuxt-2.1.4-brightgreen" alt="Cookie version badge" />
  </a>
</p>


<p align="center">
  <a href="https://github.com/mathieucollet/solarsystem/actions/workflows/ci.yml" target="_blank">
    <img src="https://github.com/mathieucollet/solarsystem/actions/workflows/ci.yml/badge.svg" alt="Cypress CI result" />
  </a>
</p>

# Solar system

This project takes place in the context of my studies as a Fullstack developer in master.

The goal here is to retrieve data from an external API and to format this data using the Nuxtjs framework.

## Run the project
The project is available online here: [solarsystem-blond.vercel.app](https://solarsystem-blond.vercel.app/).

Otherwise locally, just clone the project and make a `yarn` then `yarn dev`

## Packages
- Vuetify : CSS/Components package to simplify the implementation of a correct style
- Cypress : End-to-end testing framework to ensure features work as intended
- Axios : Promise based HTTP client for node.js
- @nuxtjs/proxy : Used to set path rewrites here
- v-tooltip : Simple tooltip implementation
- @nuxtjs/cookie-universal-nuxt : Simplify the use of cookie here to simulate favorites persistence

## API
- [Solar system](https://api.le-systeme-solaire.net/) : Used to fetch solar system data
- [Qwant API](https://api.qwant.com/) : Used to fetch image related to fetched stolar objects

## Vuex / store
To optimize the calls to the solar system API, the data are fetched only once on arrival on the application (or on refresh). The data are stored in a store (🙄). The retrieval of a single entity or favorites is done via this store.

