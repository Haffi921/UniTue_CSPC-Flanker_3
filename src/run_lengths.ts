import { shuffle } from "lodash";

// Hard coded half-blocks, cuz fuck it
const run_lengths = {
	short: [
		[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 4],
		[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3],
		[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 5],
	],
	long: [
		[8, 9, 10, 11, 12],
	]
}

/**
 * Weaves together two randomly selected half-blocks of specified run length
 * @param run_length Length of chunks to select from
 * @returns A full block sequence of run lengths
 */
function weave_block(run_length: "short" | "long"): number[] {
	/**
	 * Generic function to select random element from an array
	 * @param arr Array to select out of
	 * @returns Random element from `arr`
	 */
	function get_random_arr_val(arr: any[]): any {
		const index = Math.floor(Math.random() * arr.length);
		return arr[index];
	}

	/**
	 * Selects the longer array of two, randomly selecting one if they equal in length
	 * @param arr_A First array
	 * @param arr_B Second array
	 * @returns Index of selected array
	 */
	function get_start_index(arr_A: any[], arr_B: any[]): number {
		if (arr_A.length === arr_B.length)
			return Math.round(Math.random());

		if (arr_A.length > arr_B.length)
			return 0;
		
		if (arr_A.length < arr_B.length)
			return 1;
	}

	const condition: { [key: string]: number[] } = {
		A: shuffle(get_random_arr_val(run_lengths[run_length])),
		B: shuffle(get_random_arr_val(run_lengths[run_length])),
	};

	const sequence = []; // Return sequence
	
	let index = get_start_index(condition.A, condition.B) === 0 ? "A" : "B";
	
	while (condition.A.length !== 0 || condition.B.length !== 0) {
		// Pop one to sequence
		sequence.push(condition[index].pop());
		// Continue
		index = index === "A" ? "B" : "A";
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
export function create_block(run_length: "short" | "long") {
	return fill_block(weave_block(run_length))
}