import { Group } from "./groups";

export function create_trial_block(
  group: Group,
  half: number = 0
): TrialData[] {
  const mostly_congruent = create_context_block(
    ProportionCongruency.mostly_congruent
  );
  const mostly_incongruent = create_context_block(
    ProportionCongruency.mostly_incongruent
  );
  const context_switcher = create_block(group.run_length_order[half]);

  const sequence: TrialData[] = [];

  for (const trial of mostly_congruent) {
    trial.position = group.mostly_congruent;
    trial.proportion_congruency = ProportionCongruency.mostly_congruent;
    trial.run_length_type = group.run_length_order[half];
  }

  for (const trial of mostly_incongruent) {
    trial.position = group.mostly_incongruent;
    trial.proportion_congruency = ProportionCongruency.mostly_incongruent;
    trial.run_length_type = group.run_length_order[half];
  }

  for (const context of context_switcher) {
    switch (context) {
      case 0:
        sequence.push(mostly_congruent.pop());
        break;
      case 1:
        sequence.push(mostly_incongruent.pop());
        break;
    }
  }

  return sequence;
}
