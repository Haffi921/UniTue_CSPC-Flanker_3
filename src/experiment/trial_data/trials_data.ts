import { clone } from "lodash";
import { Position } from "./groups";

import { RunLength } from "./run_lengths";

export enum ProportionCongruency {
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

  position?: Position;
  proportion_congruency?: ProportionCongruency;
  run_length?: number;
  run_length_current?: number;
  run_length_type?: RunLength;

  block_type?: string;
  block_nr?: number;
  trial_nr?: number;
}

export function complete_trial_data(
  trial_data: TrialData,
  position: Position,
  pc: ProportionCongruency,
  run_length: RunLength
): TrialData {
  trial_data.position = position;
  trial_data.proportion_congruency = pc;
  trial_data.run_length_type = run_length;

  return trial_data;
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

export function create_context_block(
  pc_group: ProportionCongruency
): TrialData[] {
  function get_available_indexes(arr: number[]) {
    return arr.reduce((a, v, i) => {
      if (v > 0) a.push(i);
      return a;
    }, []);
  }

  function random_item(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const trial_counter = clone(PC_groups[pc_group]);
  let indexes = get_available_indexes(trial_counter);
  const sequence = [];

  while (indexes.length > 0) {
    const index = random_item(indexes);
    sequence.push(clone(trial_groups[index]));
    --trial_counter[index];
    indexes = get_available_indexes(trial_counter);
  }

  return sequence;
}
