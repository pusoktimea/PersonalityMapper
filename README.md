# Soft Psychology Consulting

## Admin Panel

### Setup

1. Install node version 8.9.3. We recommend using [nvm](https://github.com/creationix/nvm) which makes managing node versions easier.
2. Make sure the active node version is 8.9.3(`nvm use 8.9.3` or simply `nvm use` in the project root) and run `npm install` to install all dependencies.

### Run in development mode

Run `npm start` in the project root. This should open a browser window at address http://localhost:8080.

### Build for production

Run `npm run build` in the project root. Deploy the content of the `dist` directory to the server.

## Storybook for demoing components

### Run in development mode

1. Run `npm run storybook` and go to http://localhost:9001/.
2. Stories should be put in each components directory in files following the `<some_name>.stories.js` naming convention.
