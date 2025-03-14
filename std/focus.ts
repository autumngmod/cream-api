import { call } from "..";

/**
 * Focuses the panel. Makes the cursor visible, and makes it possible to click on panel content
 */
export async function setFocus(focused: boolean = true) {
  return call("setFocus", focused);
};