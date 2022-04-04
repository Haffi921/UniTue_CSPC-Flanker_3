import { clone } from "lodash";
import { Group } from "./groups";

import { create_block, RunLength } from "./run_lengths";

enum ProportionCongruency {
  mostly_congruent = "mostly_congruent",
  mostly_incongruent = "mostly_incongruent",
}

enum Congruency {
  congruent = "congruent",
  incongruent = "incongruent",
}

enum TrialType {
  inducer = "inducer",
  transfer = "transfer",
}

enum ResponseKey {
  D = "d",
  L = "l",
}

export interface TrialData {
  distractor: string;
  target: string;
  type: TrialType;
  congruency: Congruency;
  correct_key: ResponseKey;

  position?: string;
  proportion_congruency?: ProportionCongruency;
  run_length_type?: RunLength;
}

const trial_groups: TrialData[] = [
  {
    distractor: "HH HH",
    target: "HHHHH",
    type: TrialType.inducer,
    congruency: Congruency.congruent,
    correct_key: ResponseKey.L,
  },
  {
    distractor: "SS SS",
    target: "SSHSS",
    type: TrialType.inducer,
    congruency: Congruency.incongruent,
    correct_key: ResponseKey.L,
  },
  {
    distractor: "SS SS",
    target: "SSSSS",
    type: TrialType.inducer,
    congruency: Congruency.congruent,
    correct_key: ResponseKey.D,
  },
  {
    distractor: "HH HH",
    target: "HHSHH",
    type: TrialType.inducer,
    congruency: Congruency.incongruent,
    correct_key: ResponseKey.D,
  },
  {
    distractor: "AA AA",
    target: "AAAAA",
    type: TrialType.transfer,
    congruency: Congruency.congruent,
    correct_key: ResponseKey.D,
  },
  {
    distractor: "FF FF",
    target: "FFAFF",
    type: TrialType.transfer,
    congruency: Congruency.incongruent,
    correct_key: ResponseKey.D,
  },
  {
    distractor: "FF FF",
    target: "FFFFF",
    type: TrialType.transfer,
    congruency: Congruency.congruent,
    correct_key: ResponseKey.L,
  },
  {
    distractor: "AA AA",
    target: "AAFAA",
    type: TrialType.transfer,
    congruency: Congruency.incongruent,
    correct_key: ResponseKey.L,
  },
];

const PC_groups = {
  mostly_congruent: [32, 8, 32, 8, 5, 5, 5, 5],
  mostly_incongruent: [8, 32, 8, 32, 5, 5, 5, 5],
};

function create_context_block(pc_group: ProportionCongruency): TrialData[] {
  function get_available_indexes(arr: number[]) {
    return arr.reduce((a, v, i) => {
      if (v > 0) a.push(i);
      return a;
    }, []);
  }

  function random_index(arr: any[]) {
    return Math.floor(Math.random() * arr.length);
  }

  const trial_counter = clone(PC_groups[pc_group]);
  let indexes = get_available_indexes(trial_counter);
  const sequence = [];

  while (indexes.length > 0) {
    const index = random_index(trial_counter);
    sequence.push(clone(trial_groups[index]));
    --trial_counter[index];
    indexes = get_available_indexes(trial_counter);
  }

  return sequence;
}

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
