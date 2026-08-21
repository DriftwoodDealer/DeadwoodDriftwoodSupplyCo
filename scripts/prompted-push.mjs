import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { appendIdea } from "./idea-utils.mjs";

function run(command, args) {
  return spawnSync(command, args, {
    encoding: "utf8"
  });
}

function getStdout(command, args) {
  const result = run(command, args);
  return result.status === 0 ? result.stdout.trim() : "";
}

function findGh() {
  const fromPath = getStdout("zsh", ["-lc", "command -v gh"]);

  if (fromPath) {
    return fromPath;
  }

  for (const candidate of ["/opt/homebrew/bin/gh", "/usr/local/bin/gh"]) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return "";
}

function getRemoteSummary() {
  const remote = getStdout("git", ["remote", "get-url", "origin"]);
  const match = remote.match(/github\.com[:/](.+?)(?:\.git)?$/);

  return {
    remote,
    repo: match?.[1] ?? remote
  };
}

function getActiveGithubUser(ghPath) {
  if (ghPath) {
    const status = run(ghPath, ["auth", "status"]);
    const combined = `${status.stdout}\n${status.stderr}`;
    const activeMatch = combined.match(/Logged in to github\.com account (\S+)[\s\S]*?Active account: true/);

    if (activeMatch?.[1]) {
      return activeMatch[1];
    }
  }

  const fallbackPath = `${process.env.HOME}/.config/gh/hosts.yml`;

  if (existsSync(fallbackPath)) {
    const hosts = readFileSync(fallbackPath, "utf8");
    const userMatch = hosts.match(/^\s*user:\s*(\S+)/m);

    if (userMatch?.[1]) {
      return userMatch[1];
    }
  }

  return "unknown";
}

async function confirmPushAccount(rl) {
  const ghPath = findGh();
  const activeUser = getActiveGithubUser(ghPath);
  const { repo, remote } = getRemoteSummary();
  const localName = getStdout("git", ["config", "user.name"]) || "unknown";
  const localEmail = getStdout("git", ["config", "user.email"]) || "unknown";
  const expectedOwner = repo.includes("/") ? repo.split("/")[0] : "";

  console.log(`Remote: ${repo}`);
  console.log(`Git user: ${localName} <${localEmail}>`);
  console.log(`GitHub auth: ${activeUser}`);

  if (expectedOwner && activeUser !== "unknown" && activeUser !== expectedOwner) {
    console.log(`Warning: remote owner is ${expectedOwner}, but active GitHub auth is ${activeUser}.`);

    if (ghPath) {
      const switchAnswer = (
        await rl.question(`Switch active GitHub auth to ${expectedOwner} before pushing? [y/N] `)
      )
        .trim()
        .toLowerCase();

      if (switchAnswer === "y" || switchAnswer === "yes") {
        const switchResult = spawnSync(ghPath, ["auth", "switch", "--hostname", "github.com", "--user", expectedOwner], {
          stdio: "inherit"
        });

        if (switchResult.status !== 0) {
          throw new Error(`Could not switch GitHub auth to ${expectedOwner}. Push aborted.`);
        }

        console.log(`Switched GitHub auth to ${expectedOwner}.`);
      } else {
        throw new Error("Push aborted by account guard.");
      }
    } else {
      throw new Error("Push aborted by account guard.");
    }
  }

  const confirm = (await rl.question(`Push to ${remote} as ${getActiveGithubUser(ghPath)}? [y/N] `))
    .trim()
    .toLowerCase();

  if (confirm !== "y" && confirm !== "yes") {
    throw new Error("Push aborted by account guard.");
  }
}

async function main() {
  const rl = readline.createInterface({ input, output });
  const hasIdea = (await rl.question("Any new ideas to save before push? [y/N] ")).trim().toLowerCase();

  if (hasIdea === "y" || hasIdea === "yes") {
    const idea = (await rl.question("Idea: ")).trim();

    if (idea) {
      appendIdea(idea);
      console.log("Saved to BrainDump.md");
    } else {
      console.log("No idea saved.");
    }
  }

  await confirmPushAccount(rl);
  rl.close();

  const result = spawnSync("git", ["push"], {
    stdio: "inherit"
  });

  process.exit(result.status ?? 1);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
