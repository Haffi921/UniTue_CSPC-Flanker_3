import { JsPsych } from "../../../node_modules/jspsych/dist/JsPsych";
import HtmlKeyboardResponsePlugin from "../../../node_modules/@jspsych/plugin-html-keyboard-response/dist/index";

export function between_trials(jsPsych: JsPsych) {
  const set_display = (time: number) =>
    (jsPsych.getDisplayElement().innerHTML = `<p>You will now have a break for ${time.toString()} seconds</p>`);

  const between_trials = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "",
    on_start(trial) {
      trial.end_time = new Date().getTime() + 60000;
      const get_time = () =>
        Math.floor((trial.end_time - new Date().getTime()) / 1000);

      const setTimer = () => {
        const time = get_time();
        set_display(get_time());
        if (time > 0) trial.timerID = setTimeout(setTimer, 200);
      };

      setTimer();
    },
    on_finish() {
      clearTimeout(this.timerID);
    },
    choice: "NO_KEYS",
    trial_duration: 60000,
    post_trial_gap: 1000,
  };

  return between_trials;
}
