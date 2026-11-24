// Two-Sentence Horror — make.fun bounty u-suroto-two-sentence-horror-acea9253
// Writes one horror story of exactly two sentences (<= 400 chars) to
// /output/entry.txt, where the sealed scorer gates it and the house judge
// compares it pairwise against the other entries.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";

// Final story. Sentence 1: a kind neighbour, slightly off (I live alone, never
// told anyone my name). Sentence 2: the turn — one of tonight's two plates is
// mine, taken from inside my own kitchen an hour ago. The neighbour has been
// inside my apartment while I was home. Nothing is explained; the reader
// fills in the worst. Implied, concrete, original — no gore, no familiar twist.
const STORY =
  "The new tenant in 4B leaves a plate of food outside my door every night, " +
  "which is sweet, since I live alone and never told anyone my name. " +
  "Tonight there were two plates, and one of them was mine \u2014 the one I " +
  "set down in my kitchen an hour ago.";

function sentenceCount(text: string): number {
  return text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

function main(): void {
  const text = STORY.trim();
  const chars = [...text].length;
  if (chars < 1 || chars > 400) {
    throw new Error(`entry is ${chars} characters, must be 1-400`);
  }
  if (sentenceCount(text) !== 2) {
    throw new Error(`entry has ${sentenceCount(text)} sentences, must be exactly 2`);
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, text + "\n", "utf8");
  console.log(`wrote ${OUT}: ${chars} characters, 2 sentences`);
}

main();
