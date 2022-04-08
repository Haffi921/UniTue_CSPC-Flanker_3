import { RunLength } from "./run_lengths";

export enum Position {
  upper = "upper",
  lower = "lower",
}
export interface Group {
  run_length_order: [RunLength, RunLength];
  mostly_congruent_pos: Position;
  mostly_incongruent_pos: Position;
}

export const groups: Group[] = [
  {
    run_length_order: [RunLength.short, RunLength.long],
    mostly_congruent_pos: Position.upper,
    mostly_incongruent_pos: Position.lower,
  },
  {
    run_length_order: [RunLength.short, RunLength.long],
    mostly_congruent_pos: Position.lower,
    mostly_incongruent_pos: Position.upper,
  },
  {
    run_length_order: [RunLength.long, RunLength.short],
    mostly_congruent_pos: Position.upper,
    mostly_incongruent_pos: Position.lower,
  },
  {
    run_length_order: [RunLength.long, RunLength.short],
    mostly_congruent_pos: Position.lower,
    mostly_incongruent_pos: Position.upper,
  },
];
