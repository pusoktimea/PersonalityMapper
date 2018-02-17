# Soft Psychology Consulting

## Website
### Setup

1. Install node version 8.9.3. We recommend using [nvm](https://github.com/creationix/nvm) which makes managing node versions easier.
2. Make sure the active node version is 8.9.3(`nvm use 8.9.3` or simply `nvm use` in the project root) and run `npm install` to install all dependencies.

### Run in development mode

Run `npm start` in the project root. This should open a browser window at address http://localhost:8080.

HMR is enabled in development server so please make sure to disable safe write in your editor:

- Sublime Text 3 - Add atomic_save: "false" to your user preferences
- WebStorm - uncheck Use "safe write" in Preferences > Appearance & Behavior > System Settings

Please make sure to update/install plugin in your editor to support .editorconfig rules.

- Sublime Text https://github.com/sindresorhus/editorconfig-sublime#readme
- Visual Studio Code https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- Webstorm has built-in support for .editorconfig.

### Build for production

Run `npm run build` in the project root. Deploy the content of the `dist` directory to the server.

## Storybook for demoing components

### Run in development mode

1. Run `npm run storybook` and go to http://localhost:9001/.
2. Stories should be put in each components directory in files following the `<some_name>.stories.js` naming convention.
