# Nuxt Firebase Todo List

[![Build Status](https://travis-ci.org/miksin/nuxt-firebase-todo-list.svg?branch=master)](https://travis-ci.org/miksin/nuxt-firebase-todo-list)

[Demo](https://miksin.github.io/nuxt-firebase-todo-list)

Todo List Web App built with Nuxt.js and Firebase

## Features

- [ ] Todo List
  - [x] Basics (CRUD)
  - [ ] List/Weekly/Monthly Views
  - [x] Mobile support
- [ ] Auth
  - [x] Middleware
  - [x] Firebase support
  - [ ] OpenID Connect

## Build Setup

``` bash
# firebase setting
$ cp .env.example .env
$ vi .env

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# deploy to gh-pages
$ yarn generate:gh-pages
$ yarn deploy
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
