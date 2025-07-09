# NPX Template starter

_What does this template do?_

When you need boilerplate which isnt just a single file creation.
We use `npx` plus `inquierer` to deliver a prompt in order to describe a few choices to configure your boilerplate.

It is a starting point waiting for you to:

1. define promp - options
2. design your templates
3. publish to npx

## Do you have any examples?

- Svelte/SvelteKit gated page logic
- in-house base CSS starter - or adding theme structure
- Classic component structure, something more than a snippet

## Ok, So what is it doing?

Allowing for a CLI installation of some templates for your App which after configuration will be copied into your current working directory.

Take the Svelte example - installing a component cannot work logic into mutliple file types.
We can predefine some templates for a **gated route** with a PIN lock.

- `mkdir` route name ie: `locked/secret-page`
- `+page.svelte`
- `+layout.server.ts`
- `api/server.ts`

All the above can be added to current Svelte app using the `npx` command, then following a cli prompt to configure the specifics.

### 🌈 is it making sense now?

- Try out the example
- use this template
- goto another directory
- `node ~/npx-templates/bin/cli.js`

```
✔ Project Name banana
✔ Include README? No
✔ Choose framework: red
✅ Project setup complete!
```

The `/templates/**` will be added to relative paths of the cwd

### What Do I do then to configure my own?

**Define the prompt rules** in the `lib/prompt.js`

```javascript
export const rules = [
  {
    type: "input",
    name: "name",
    message: "Project Name",
    default: "banana",
  },
  {
    type: "confirm",
    name: "README",
    message: "Include README?",
    default: false,
  },
  {
    type: "list",
    name: "colour",
    message: "Choose framework:",
    choices: ["red", "orange", "blue"],
  },
];
```

Then consider your template replacements based upon the cli choices by updating the respective `processTemplate` method in `lib/prompt.js`

```js
/**
 * (content: the template file string)
 * (options: passed in by the prompts name field response object)
 **/
export function processTemplate(content, { name, colour, cwd, version }) {
  return content
    .replace(/\{\{PROJECT_NAME\}\}/g, name)
    .replace(/\{\{CWD\}\}/g, cwd)
    .replace(/\{\{DARKMODE\}\}/g, colour)
    .replace(/\{\{VERSION\}\}/g, version);
}
```

> You can add extra external options by updating the method `bindCustomOptions` in `bin/cli.js`

## TODO

- make use of new `package.json` template
