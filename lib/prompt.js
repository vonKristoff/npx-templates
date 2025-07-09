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

export function processTemplate(content, { name, colour, cwd, version }) {
  console.log(version);
  return content
    .replace(/\{\{PROJECT_NAME\}\}/g, name)
    .replace(/\{\{CWD\}\}/g, cwd)
    .replace(/\{\{DARKMODE\}\}/g, colour)
    .replace(/\{\{VERSION\}\}/g, version);
}
