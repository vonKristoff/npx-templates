import { glob } from "node:fs/promises";
import { processTemplate } from "./prompt.js";
import path from "path";
import fs from "fs/promises";
import { ensureDir, copy } from "fs-extra";

export async function install(options) {
  const templateDirectory = path.join(import.meta.dirname, "../templates");

  // Get all template files
  const templateFiles = glob("**/*", {
    cwd: templateDirectory,
  });

  for await (const file of templateFiles) {
    const srcPath = path.join(templateDirectory, file);
    const destPath = path.join(options.cwd, file);
    // Handle template processing
    if (file.endsWith(".template")) {
      const content = await fs.readFile(srcPath, "utf8");
      const processed = processTemplate(content, options);
      const finalPath = destPath.replace(".template", "");
      await ensureDir(path.dirname(finalPath));
      await fs.writeFile(finalPath, processed);
    } else {
      if (file.includes(".")) await copy(srcPath, destPath);
    }
  }
}
