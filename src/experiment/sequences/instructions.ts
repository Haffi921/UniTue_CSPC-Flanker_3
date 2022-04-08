import InstructionsPlugin from "../../../node_modules/@jspsych/plugin-instructions/dist/index";

import {
  display,
  center_text,
  box_text,
  context_boxes,
} from "./util/html_components";

export function instructions() {
  const continue_hint = "Please press the right arrow key to continue &#x27A1";
  const backtrack_hint = "&#x2B05 Left arrow key to go back";

  function hint(backtrack = true) {
    if (backtrack) {
      return box_text(continue_hint + "</p><p>" + backtrack_hint, ["hint"]);
    } else {
      return box_text(continue_hint, ["hint"]);
    }
  }

  const instructions_text = [
    display(center_text("Welcome!"), hint(false)),
    display(
      center_text(
        "Please move your mouse to the edge of your screen, so that is no longer visible."
      ),
      hint()
    ),
    display(
      center_text(
        "In this experiment you will see a box surrounding a sequence of five letters like this:"
      ),
      box_text("AAFAA", ["lower"]),
      hint()
    ),
    display(
      center_text(
        "There are four possible letters you can encounter: <br>'A' or 'F', and 'S' or 'H'"
      ),
      hint()
    ),
    display(
      center_text(
        "The four outermost letters will always be the same while the center letter can be different, like this:"
      ),
      box_text("FFAFF", ["lower"]),
      hint()
    ),
    display(
      center_text(
        "You should respond to the middle letter, in this case to the letter 'A'"
      ),
      box_text(
        "<span class='gray'>FF</span><b>A</b><span class='gray'>FF</span>",
        ["lower"]
      ),
      hint()
    ),

    // Response keys
    display(
      center_text(
        "You respond using keys 'D' and 'L'." +
          "<br><br>'D' is for letters 'A' and 'S'" +
          "<br><br>'L' is for letters 'F' and 'H'"
      ),
      hint()
    ),

    // Show-case
    display(
      center_text(
        "You will now see all the possible combinations of letters and responses."
      ),
      hint()
    ),
    display(
      center_text("Here you should respond with the 'D' key"),
      box_text("AAAAA", ["lower"]),
      hint()
    ),
    display(
      center_text("Here you should also respond with the 'D' key"),
      box_text("FFAFF", ["lower"]),
      hint()
    ),
    display(
      center_text("Here you should respond with the 'L' key"),
      box_text("FFFFF", ["lower"]),
      hint()
    ),
    display(
      center_text("Here you should also respond with the 'L' key"),
      box_text("AAFAA", ["lower"]),
      hint()
    ),
    display(
      center_text("Here you should respond with the 'D' key"),
      box_text("SSSSS", ["lower"]),
      hint()
    ),
    display(
      center_text("Here you should also respond with the 'D' key"),
      box_text("HHSHH", ["lower"]),
      hint()
    ),
    display(
      center_text("Here you should respond with the 'L' key"),
      box_text("HHHHH", ["lower"]),
      hint()
    ),
    display(
      center_text("Here you should also respond with the 'L' key"),
      box_text("SSHSS", ["lower"]),
      hint()
    ),

    // Context show-case
    display(
      center_text(
        "There are two boxes in which these letters will be shown. <br> Only one letter sequence will be shown at each time."
      ),
      context_boxes,
      hint()
    ),
    display(
      center_text(
        "Before each trial, a '+' will be displayed here in the center. Please center your eyes on this area before each trial."
      ),
      context_boxes,
      hint()
    ),
    display(center_text("+"), context_boxes, hint()),
    display(box_text("HHSHH", ["upper"]), box_text("", ["lower"]), hint()),
    display(
      center_text("Here you should respond with the 'D' key"),
      box_text("HHSHH", ["upper"]),
      box_text("", ["lower"]),
      hint()
    ),
    display(
      center_text("+"),
      box_text("", ["upper"]),
      box_text("", ["lower"]),
      hint()
    ),
    display(box_text("", ["upper"]), box_text("FFFFF", ["lower"]), hint()),
    display(
      center_text("Here you should respond with the 'L' key"),
      box_text("", ["upper"]),
      box_text("FFFFF", ["lower"]),
      hint()
    ),

    // Last slide
    display(
      center_text(
        "You will begin with a practice round and then there will be 4 blocks of 200 trials." +
          "<br><br><br><br>When you are ready to <b>start</b> press the right arrow key &#x27A1"
      ),
      box_text(backtrack_hint, ["hint"])
    ),
  ];

  return {
    type: InstructionsPlugin,
    pages: instructions_text,
    post_trial_gap: 1000,
  };
}
