import { readFileSync, writeFileSync } from "node:fs";

const brainDumpPath = new URL("../BrainDump.md", import.meta.url);

export function appendIdea(rawIdea) {
  const idea = rawIdea.trim();

  if (!idea) {
    throw new Error("No idea text provided.");
  }

  const date = new Date().toISOString().slice(0, 10);
  const entry = `* ${date} - ${idea}\n`;
  const current = readFileSync(brainDumpPath, "utf8");
  const inboxHeading = "## Inbox";
  const inboxIndex = current.indexOf(inboxHeading);

  if (inboxIndex === -1) {
    writeFileSync(brainDumpPath, `${current.trimEnd()}\n\n## Inbox\n${entry}`, "utf8");
    return;
  }

  const afterHeadingIndex = current.indexOf("\n", inboxIndex);
  const descriptionEnd = current.indexOf("\n\n", afterHeadingIndex);
  const insertAt = descriptionEnd === -1 ? afterHeadingIndex + 1 : descriptionEnd + 2;
  const next = `${current.slice(0, insertAt)}${entry}${current.slice(insertAt)}`;

  writeFileSync(brainDumpPath, next, "utf8");
}
