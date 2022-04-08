export const context_boxes = `<div class='upper'></div><div class='lower'></div>`;

export function display(...args: string[]) {
  return "<div class='display'>" + Array.from(args).join("") + "</div>";
}

export function paragraphs(...args: string[]) {
  return `<p>${Array.from(args).join("</p><p>")}</p>`;
}

export function center_text(...args: string[]) {
  return `<div class='center-text'><p>${Array.from(args).join(
    "</p><p>"
  )}</p></div>`;
}

export function center_error(...args: string[]) {
  return `<div class='center-text error'><p>${Array.from(args).join(
    "</p><p>"
  )}</p></div>`;
}

export const box_text = (text: string, classes: string[] | undefined) => {
  if (classes === undefined) {
    classes = [];
  }
  return `<div class='${classes.join(" ")}'><p>${text}</p></div>`;
};
