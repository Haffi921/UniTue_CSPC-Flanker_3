enum WithinRange {
  Lower = -1,
  Within = 0,
  Greater = 1,
}

class RunLength {
  start: number;
  end: number;
  length: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.length = end - start;
  }

  random() {
    return Math.round(Math.random() * this.length + this.start);
  }

  within_range(num: number): number {
    if (num > this.end) return WithinRange.Greater;
    if (num < this.start) return WithinRange.Lower;
    return WithinRange.Within;
  }
}

function create_block_runs(block_length: number, start: number, end: number) {
  const runs = [];
  const run_length = new RunLength(start, end);
  let trials_left = block_length;

  while (run_length.within_range(trials_left) === WithinRange.Greater) {
    const new_number = run_length.random();
    runs.push(new_number);
    trials_left -= new_number;
  }

  if (run_length.within_range(trials_left) === WithinRange.Within) {
    const new_number = trials_left;
    runs.push(new_number);
    trials_left -= new_number;
  } else {
    function get_random_index(arr: number[]) {
      return Math.round(Math.random() * arr.length);
    }
    while (trials_left > 0) {
      const i = get_random_index(runs);
      if (runs[i] < run_length.end) {
        ++runs[i];
        trials_left -= 1;
      }
    }
  }

  return runs;
}

function split_block(block: number[]) {
  function arr_sum(arr: number[]) {
    return arr.reduce((curr_sum: number, value: number) => curr_sum + value);
  }

  if (arr_sum(block) % 2 !== 0)
    throw Error("Block length must be an even number");

  const half = arr_sum(block) / 2;

  function find_half(block: number[], initial = 0) {}

  for (let i = 0; i < block.length; ++i) {}
}

const runs = create_block_runs(100, 7, 12);
