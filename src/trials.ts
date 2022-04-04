import { clone } from "lodash";
import { Group } from "./groups";

import { create_block, RunLength } from "./run_lengths";

enum ProportionCongruency {
	mostly_congruent = "mostly_congruent",
	mostly_incongruent = "mostly_incongruent"
}

enum Congruency {
	congruent = "congruent",
	incongruent = "incongruent"
}

enum TrialType {
	inducer = "inducer",
	transfer = "transfer",
}

export interface TrialData {
	target: string,
	type: TrialType,
	congruency: Congruency,

	proportion_congruency?: ProportionCongruency,
	position?: string,
	run_length_type?: RunLength,
};

const trial_groups: TrialData[] = [
	{
		target: "HHHHH",
		type: TrialType.inducer,
		congruency: Congruency.congruent
	},
	{
		target: "SSHSS",
		type: TrialType.inducer,
		congruency: Congruency.incongruent
	},
	{
		target: "SSSSS",
		type: TrialType.inducer,
		congruency: Congruency.congruent
	},
	{
		target: "HHSHH",
		type: TrialType.inducer,
		congruency: Congruency.incongruent
	},
	{
		target: "AAAAA",
		type: TrialType.transfer,
		congruency: Congruency.congruent
	},
	{
		target: "FFAFF",
		type: TrialType.transfer,
		congruency: Congruency.incongruent
	},
	{
		target: "FFFFF",
		type: TrialType.transfer,
		congruency: Congruency.congruent
	},
	{
		target: "AAFAA",
		type: TrialType.transfer,
		congruency: Congruency.incongruent
	},
];

const PC_groups = {
	mostly_congruent: [32, 8, 32, 8, 5, 5, 5, 5],
	mostly_incongruent: [8, 32, 8, 32, 5, 5, 5, 5],
};

function create_context_block(pc_group: ProportionCongruency): TrialData[] {
	function get_available_indexes(arr: number[]){
		return arr.reduce((a, v, i) => {if (v > 0) a.push(i); return a}, []);
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

export function create_trial_block(group: Group, run_length: RunLength): TrialData[] {
	const mostly_congruent = create_context_block(ProportionCongruency.mostly_congruent);
	const mostly_incongruent = create_context_block(ProportionCongruency.mostly_incongruent);
	const context_switcher = create_block(run_length);

	const sequence: TrialData[] = [];

	for(const trial of mostly_congruent) {
		trial.position = group.mostly_congruent.position;
		trial.proportion_congruency = ProportionCongruency.mostly_congruent;
		trial.run_length_type = run_length;
	}

	for(const trial of mostly_incongruent) {
		trial.position = group.mostly_incongruent.position;
		trial.proportion_congruency = ProportionCongruency.mostly_incongruent;
		trial.run_length_type = run_length;
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