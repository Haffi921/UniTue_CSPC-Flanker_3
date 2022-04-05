import { shuffle } from "lodash";

export enum RunLength {
  short = "short",
  long = "long",
}

// Hard coded half-blocks, cuz fuck it
const run_lengths = {
  short: [
    1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,
    1, 2, 3, 4, 5, 1, 2, 3, 4,
  ],
  long: [8, 9, 10, 11, 12, 8, 9, 10, 11, 12],
};

/**
 * Weaves together two randomly selected half-blocks of specified run length
 * @param run_length Length of chunks to select from
 * @returns A full block sequence of run lengths
 */
function weave_block(run_length: RunLength): number[] {
  const condition: number[][] = [
    shuffle(run_lengths[run_length]),
    shuffle(run_lengths[run_length]),
  ];

  const sequence = []; // Return sequence

  let index = Math.round(Math.random());

  while (condition[0].length !== 0 || condition[1].length !== 0) {
    // Pop one to sequence
    sequence.push(condition[index].pop());
    // Continue
    index = index === 0 ? 1 : 0;
  }

  return sequence;
}

/**
 * Parses a run length sequence in to actual condition sequence
 * @param run_length_block Full block sequence of run lengths
 * @returns Fully fleshed out block sequence of conditions
 */
function fill_block(run_length_block: number[]): number[] {
  const sequence: number[] = [];

  let fill_value = Math.round(Math.random());

  for (const run_length of run_length_block) {
    for (let i = 0; i < run_length; ++i) sequence.push(fill_value);

    fill_value = fill_value === 0 ? 1 : 0;
  }

  return sequence;
}

/**
 * Creates a new block of trials
 * @param run_length Length of chunks to select from
 * @returns Fully fleshed out block sequence of conditions
 */
export function create_context_switcher(run_length: RunLength) {
  return fill_block(weave_block(run_length));
}
