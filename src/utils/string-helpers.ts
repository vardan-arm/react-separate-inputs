/**
 * @description Replace a character in the string at a given position
 *
 * @param {string} str
 * @param {number} index Index of the character to be replaced
 * @param {string} replacement Character to put into string instead of old one at a corresponding position
 *
 * @returns {string} Returns updated string
 */
export const replaceAt = (str: string, index: number, replacement: string) => {
  if (index < 0 || index >= str.length) {
    return str;
  }
  return str.slice(0, index) + replacement + str.slice(index + 1);
};

/**
 * @description Checks whether argument passed is a number
 *
 * @param {string} str
 *
 * @returns {boolean} Returns TRUE if `str` is a number, otherwise returns FALSE
 */
export const isInputNumber = (str: string) => (+str).toString() === str;
