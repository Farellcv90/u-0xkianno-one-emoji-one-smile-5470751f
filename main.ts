// One Emoji, One Smile — make.fun entry
// Writes exactly one emoji to /output/entry.txt (UTF-8, no newline).
// Node 22+, stdlib only, no network, deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// --- Named constants (authorship / gate) ---
const EMOJI = "🤗"; // U+1F917 HUGGING FACE
const OUTPUT_PATH = "/output/entry.txt";
const ENCODING = "utf8" as const;
const MIN_CHARS = 1;
const MAX_CHARS = 8;

// Gate: exactly 1–8 characters, never whitespace-only.
function assertValidEntry(value: string): void {
  const charCount = [...value].length;
  if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
    throw new Error(
      `Invalid entry: expected ${MIN_CHARS}–${MAX_CHARS} characters, got ${charCount}`,
    );
  }
  if (value.trim().length === 0) {
    throw new Error("Invalid entry: whitespace-only content is not allowed");
  }
}

// Deterministic write: same input always yields the same bytes.
// We write the raw string with ENCODING and never append a newline,
// so the file content is byte-for-byte identical on every run.
function writeEntry(value: string): void {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline, no extra spaces, no other text.
  writeFileSync(OUTPUT_PATH, value, { encoding: ENCODING });
}

function main(): void {
  assertValidEntry(EMOJI);
  writeEntry(EMOJI);
}

main();
