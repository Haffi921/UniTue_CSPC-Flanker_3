import { RunLength } from "./run_lengths";

enum Position {
  upper = "upper",
  lower = "lower",
}
export interface Group {
  run_length_order: [RunLength, RunLength];
  mostly_congruent: Position;
  mostly_incongruent: Position;
}

export const groups: Group[] = [
  {
    run_length_order: [RunLength.short, RunLength.long],
    mostly_congruent: Position.upper,
    mostly_incongruent: Position.lower,
  },
  {
    run_length_order: [RunLength.short, RunLength.long],
    mostly_congruent: Position.lower,
    mostly_incongruent: Position.upper,
  },
  {
    run_length_order: [RunLength.long, RunLength.short],
    mostly_congruent: Position.upper,
    mostly_incongruent: Position.lower,
  },
  {
    run_length_order: [RunLength.long, RunLength.short],
    mostly_congruent: Position.lower,
    mostly_incongruent: Position.upper,
  },
];
