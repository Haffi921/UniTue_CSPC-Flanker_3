import { initJsPsych } from "../../node_modules/jspsych/dist/index";
import FullscreenPlugin from "../../node_modules/@jspsych/plugin-fullscreen/dist/index";
import BrowserCheckPlugin from "../../node_modules/@jspsych/plugin-browser-check/dist/index";

import { between_trials } from "./sequences/between_block";
import { instructions } from "./sequences/instructions";
import { post_trial } from "./sequences/post_trial";
import { trial } from "./sequences/trial";
import { create_trial_block } from "./trial_data/create_block";
import { groups } from "./trial_data/groups";

function record_group(group: number) {
  const counter = jatos.batchSession.get("condition-counter");
  ++counter[group];
  jatos.batchSession.set("condition-counter", counter).catch(record_group);
}

async function run() {
  const group_nr = Math.floor(Math.random() * groups.length);

  const jsPsych = initJsPsych({
    on_finish() {
      jatos
        .submitResultData(jsPsych.data.get().csv())
        .then(record_group(group_nr))
        .then(() => jatos.endStudy());
    },
  });

  jsPsych.data.addProperties({
    subject: jatos.studyResultId,
    workerID: jatos.workerId,
    prolificPID: jatos.urlQueryParameters.PROLIFIC_PID,
    prolificSID: jatos.urlQueryParameters.STUDY_ID,
    prolificSEID: jatos.urlQueryParameters.SESSION_ID,
  });

  const number_of_blocks = 4;
  const group = groups[group_nr];

  const timeline = [];

  // Switch to fullscreen
  timeline.push({
    type: FullscreenPlugin,
    fullscreen_mode: true,
  });

  timeline.push({
    type: BrowserCheckPlugin,
    minimum_height: 625,
    minimum_width: 625,
  });

  timeline.push(instructions());

  for (let block = 0; block <= number_of_blocks; ++block) {
    if (block) {
      timeline.push({
        timeline: trial(jsPsych),
        timeline_variables: create_trial_block(
          group,
          block < number_of_blocks / 2 ? 0 : 1
        ),
      });
    } else {
      timeline.push({
        timeline: trial(jsPsych),
        timeline_variables: create_trial_block(group, 0).slice(0, 20),
      });
    }
    timeline.push(between_trials(jsPsych));
  }

  timeline.push(post_trial(jsPsych));

  jsPsych.run(timeline);
}

jatos.onLoad(run);
