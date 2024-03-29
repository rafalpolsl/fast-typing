export enum TEXT_OPTIONS {
  BRIEF = "brief",
  NORMAL = "normal",
  LONG = "long",
}

export const ALLOWED_KEYS = [
  "KeyA",
  "KeyB",
  "KeyC",
  "KeyD",
  "KeyE",
  "KeyF",
  "KeyG",
  "KeyH",
  "KeyI",
  "KeyJ",
  "KeyK",
  "KeyL",
  "KeyM",
  "KeyN",
  "KeyO",
  "KeyP",
  "KeyQ",
  "KeyR",
  "KeyS",
  "KeyT",
  "KeyU",
  "KeyV",
  "KeyW",
  "KeyX",
  "KeyY",
  "KeyZ",
  "Space",
  "Comma",
  "Period",
  "Slash",
  "Semicolon",
  "Quote",
  "Backquote",
  "Minus",
  "Equal",
  "Digit0",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
];

/**
 * Scroll to the element that you want to be followed if offsetTop won't be matched.
 *
 * @param {Element} observedElement - Element that will be followed.
 * @param {Element} rootElement - Element that is going to be compared with observedElement to find differences.
 * @returns {void} - If elements will be at different positions the page will be scrolled to the position of observedElement.
 */
export const scrollToActiveElement = (
  observedElement?: Element,
  rootElement?: Element
) => {
  if (
    (observedElement as HTMLElement)?.offsetTop !==
    (rootElement as HTMLElement)?.offsetTop
  ) {
    return observedElement?.scrollIntoView();
  }
};
