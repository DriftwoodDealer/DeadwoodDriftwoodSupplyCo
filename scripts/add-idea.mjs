import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { appendIdea } from "./idea-utils.mjs";

async function main() {
  let idea = process.argv.slice(2).join(" ").trim();

  if (!idea) {
    const rl = readline.createInterface({ input, output });
    idea = (await rl.question("Idea: ")).trim();
    rl.close();
  }

  appendIdea(idea);
  console.log("Saved to BrainDump.md");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
