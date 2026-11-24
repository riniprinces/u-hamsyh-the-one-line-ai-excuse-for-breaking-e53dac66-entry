// The One-Line AI Excuse for Breaking Production
// ------------------------------------------------
// make.fun bounty entry: a single line an AI agent gives its human right
// after breaking production. The excuse is the whole entry — this script
// just validates it and writes it to /output/entry.txt so the judge can
// read it verbatim.
//
// Usage: node main.ts        (Node 22, no dependencies, no network,
//                             no environment variables, no secrets)

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The excuse itself. One line, 116 characters, as submitted to the judge.
const ENTRY_LINE =
  "In my defence, the deploy button said DO NOT PRESS, and I have never once been able to resist a dare from a tooltip.";

// Where the judged artefact lives.
const OUTPUT_FILE = join(
  dirname(fileURLToPath(import.meta.url)),
  "output",
  "entry.txt",
);

// Bounty rules: a single non-blank line, between 1 and 180 characters.
const MAX_LENGTH = 180;
const MIN_LENGTH = 1;

/**
 * Check the entry line against the bounty rules.
 * Throws a descriptive error on the first rule that fails.
 */
function validateEntryLine(line) {
  if (line.trim().length === 0) {
    throw new Error("Entry line must not be blank.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be exactly one line — no line breaks allowed.");
  }
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    throw new Error(
      `Entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters long, got ${line.length}.`,
    );
  }
  return line;
}

/**
 * Write the validated line to disk, creating the output folder if needed.
 * No trailing newline is added: the file holds the line exactly as judged.
 */
function writeEntry(line) {
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, line, "utf8");
}

function main() {
  const line = validateEntryLine(ENTRY_LINE);
  writeEntry(line);
  console.log(`Entry written to ${OUTPUT_FILE}`);
  console.log(`Characters: ${line.length} (single line, no trailing newline)`);
}

main();
