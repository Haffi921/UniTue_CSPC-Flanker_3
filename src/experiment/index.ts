import { initJsPsych } from "../../node_modules/jspsych/dist/index";
import { between_trials } from "./sequences/between_block";
import { instructions } from "./sequences/instructions";
import { post_trial } from "./sequences/post_trial";
import { trial } from "./sequences/trial";
import { create_trial_block } from "./trial_data/create_block";
import { groups } from "./trial_data/groups";

async function run() {
  const jsPsych = initJsPsych({
    on_finish() {
      jsPsych.endExperiment();
    },
  });

  const number_of_blocks = 4;
  const group = groups[0];

  const timeline = [];

  timeline.push(instructions());

  for (let block = 0; block < 1; ++block) {
    timeline.push({
      timeline: trial(jsPsych),
      timeline_variables: create_trial_block(
        group,
        block < number_of_blocks / 2 ? 0 : 1
      ).slice(0, 1),
    });
    timeline.push(between_trials(jsPsych));
  }

  timeline.push(post_trial(jsPsych));

  jsPsych.run(timeline);
}

run();
