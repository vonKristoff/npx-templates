#!/usr/bin/env node
import packageJson from "../package.json" with { type: "json" };
import inquirer from "inquirer";
import { install } from "../lib/index.js";
import { rules } from "../lib/prompt.js";

async function run(options) {
  try {
    await install(options);
    console.log("✅ Project setup complete!");
  } catch (error) {
    console.error("❌ Installation failed:", error.message);
    process.exit(1);
  }
}

async function getInstallOptions() {
  return await inquirer.prompt(rules);
}

/**
 * Create custom external variables to be consumed by content processing
 * pass Options object - the response from inquirer prompt
 * @returns Object
 */
function bindCustomOptions(options) {
  return {
    ...options,
    cwd: process.cwd(),
    version: packageJson.version,
  };
}

run(bindCustomOptions(await getInstallOptions()));
