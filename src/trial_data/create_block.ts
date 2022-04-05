import { Group } from "./groups";
import { create_context_switcher } from "./run_lengths";
import {
  complete_trial_data,
  create_context_block,
  ProportionCongruency,
  TrialData,
} from "./trials_data";

export function create_trial_block(
  group: Group,
  half: number = 0
): TrialData[] {
  const context_sequences = [
    create_context_block(ProportionCongruency.mostly_congruent).map((trial) =>
      complete_trial_data(
        trial,
        group.mostly_congruent_pos,
        ProportionCongruency.mostly_congruent,
        group.run_length_order[half]
      )
    ),
    create_context_block(ProportionCongruency.mostly_incongruent).map((trial) =>
      complete_trial_data(
        trial,
        group.mostly_incongruent_pos,
        ProportionCongruency.mostly_incongruent,
        group.run_length_order[half]
      )
    ),
  ];

  const context_switcher = create_context_switcher(
    group.run_length_order[half]
  );

  const sequence: TrialData[] = [];

  for (const context of context_switcher)
    sequence.push(context_sequences[context].pop());

  return sequence;
}
