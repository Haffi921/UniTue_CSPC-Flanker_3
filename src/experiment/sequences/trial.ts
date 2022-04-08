import { JsPsych } from "../../../node_modules/jspsych/dist/JsPsych";
import HtmlKeyboardResponsePlugin from "../../../node_modules/@jspsych/plugin-html-keyboard-response/dist/index";

import {
  display,
  box_text,
  center_text,
  context_boxes,
} from "./util/html_components";

export function trial(jsPsych: JsPsych) {
  function removeStim() {
    const stim = document.getElementsByClassName("target")[0];
    if (stim !== undefined) {
      stim.removeChild(stim.firstChild);
    }
  }

  function getFeedbackText() {
    const data = jsPsych.data.getLastTrialData().trials[0];
    const feedback_text =
      data.response === null ? "Too late" : data.correct ? "" : "Wrong";
    const feedback_class = data.correct ? "" : "error";
    return box_text(feedback_text, [
      "feedback",
      jsPsych.timelineVariable("position"),
      feedback_class,
    ]);
  }

  const fixation = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: () => display(context_boxes, center_text("+")),
    choices: "NO_KEYS",
    trial_duration: 500,
  };

  const context = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: () => display(context_boxes),
    choices: "NO_KEYS",
    trial_duration: 1000,
  };

  const distractor = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: () =>
      display(
        context_boxes,
        box_text(jsPsych.timelineVariable("distractor"), [
          jsPsych.timelineVariable("position"),
        ])
      ),
    choices: "NO_KEYS",
    trial_duration: 140,
  };

  const target = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: () =>
      display(
        context_boxes,
        box_text(jsPsych.timelineVariable("target"), [
          "target",
          jsPsych.timelineVariable("position"),
        ])
      ),
    choices: ["d", "l"],
    trial_duration: 1990,
    data: () => ({
      ...jsPsych.getAllTimelineVariables(),
    }),
    on_load: function () {
      this.removeID = setTimeout(removeStim, 590);
    },
    on_finish: function (data) {
      data.correct = jsPsych.pluginAPI.compareKeys(
        data.response,
        data.correct_key
      );

      clearTimeout(this.removeID);
    },
  };

  const feedback = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: () => display(context_boxes, getFeedbackText()),
    choices: "NO_KEYS",
    trial_duration: 1500,
  };

  return [fixation, context, distractor, target, feedback];
}
