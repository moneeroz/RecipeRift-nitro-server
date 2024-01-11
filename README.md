# React Native Recipes Nitro BACK-END Server

Stack: Nitro, Node.js, PostegresDB, Prisma

This is a REST API for the front-end of the RN Recipes project

The code was written in Typescript and used a few external apis such as cloudinary

This project was developed by [Me](https://github.com/Moneeroz)
<br>

## Getting Started

clone the front-end repo from [Here](https://github.com/moneeroz/rn-recipes) and follow its README to get it running!

To run the following project on your machine please follow the steps below:

<br>

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

## Enviromental Variables

You will find a .env.example inside the config folder.

- Rename .env.example to .env
- Generate your api keys and database credintials (any sql db) and add them to the .env

## Development Server

Start the development server on <http://localhost:3000>

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```
