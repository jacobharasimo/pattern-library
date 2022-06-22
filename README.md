
<img alt="Getro Logo" src="https://getro-assets.s3.amazonaws.com/logo/logo-getro-dark.png" width="160">

# Rombo: Getro front end reusable components

This repository contains the reusable React components, assets and stylesheets. We use [storybook](https://storybook.js.org/) to develop and preview the components.

## Overview

These are the most used commands:
- `yarn storybook`: starts storybook on localhost:9009 and reloads automatically.
- `yarn test`: runs tests
- `yarn yalc:publish`: publishes rombo locally to be used without publishing it to npm, great for testing changes in other apps.

There are other commands in `package.json` not used so frequently, mostly used for deploying.

## Fonts
We are removing web front from this package as they are not globally shared. They will need to be defined in the application. You can access branded webfonts `./fonts` directory and copy them (and the css) to the desired application.

## Adding new components

There are several method to add and test a new component, all of them are valid depending on the nature of the work you are doing.

### Storybook
The most common is to use storybook. Stub your component so it exists and then run `yarn storybook`. This will open storybook and you can then browse to and test your component.
### Example project
This is a good way to test in isolation how things will look once built in a separate project, you will need two terminal windows to do this.

In the first terminal window you need to build and watch the Rombo by running `yarn start` this will build and watch for changes.

In the second terminal windows you need to open `./example` and then install its dependencies with `yarn`. Once installed you can start the example project with `yarn start`. This project simulates an external project and allows you can edit any pages inside example to test your component in isolation

## Beta Testing
Beta versions are published from the developers computers. to do so you must update your package.json file so that it has a correct beta version specified.
These versions are defined using this pattern `X.X.X-beta.Y`. Once updated you can publish the beta using `npm publish --tag beta` command.
As you test your beta you may need to make multiple publish attempts. this is done by updating the `Y` value in the beta version and then running `npm publish --tag beta` again.

## NPM Access
We use a private NPM repository to store our packages. In order to access this your will need to have access. If you already have a personal npmjs.com account you can provide this email to your Lead and request access. If not please create one with your @getro.com email address and request access.

Once you create your npmjs.com account you can then setup your access token as outlined here https://docs.npmjs.com/creating-and-viewing-access-tokens.

Make sure you create either an automation token (recommended) or a publish token and record the token as a note in your LastPass vault as you will need it again.

Now that you have your token you need to set it as an environment variable in your system. Using your terminal run the following commands.

```
touch ~/.zshrc
open ~/.zshrc
```

this will open your `.zshrc` file in your text editor and you can now add your `NPM_TOKEN` to the top of the file add:
```
export NPM_TOKEN={TOKEN}
```
replace `{TOKEN}` with the generated token you have stored in your LastPass vault. Close your terminal window and re-open to insure the value is set. You can test this token by installing dependencies in your app with the `yarn` command.

## Branching
In order to work in this repo we follow a gitFlow style. You can find all about gitflow at this link: http://danielkummer.github.io/git-flow-cheatsheet/

What this means is when doing work to create a release:
* Start on `develop` branch, create a feature branch to do your work `feature/SOME_MEANINGFUL_NAME`
* once you are happy with your work, and its tested, create a Pull Request from `feature/SOME_MEANINGFUL_NAME` to `develop` making sure to update the version number in the `package.json` file
* once the pull request is reviewed and approved you can then create a new release version
* create `release/X.X.X` branch from `develop` where `X.X.X` matches the version in your `package.json` (each release MUST be a new version as you CAN NOT republish a previous version of code)
* Push the branch to publish the new version in npm
* You may now update your target repo to consume the new Rombo version

## Versioning
We follow SEMVER for our versioning system, more information can be found here: https://semver.org/

Versioning schema contains three numbers:
- major version: should be increased when an already existing component is modified and the backward compatibility is broken.
- minor version: should be increased after adding a new component to the library.
- build number: should be increased after each build.
