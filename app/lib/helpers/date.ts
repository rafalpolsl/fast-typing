/**
 * Format given number to two integer digits
 *
 * @param {number} number - number to format
 * @return {string} - return number with minimum two integer digits
 * @example
 * const a = 2;
 *
 * const result = formatNumber(a);
 * console.log(result);
 * // Logs: '02'
 *
 */
export const formatNumber = (number: number) =>
  number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

/**
 * Get date
 *
 * @param {string} date - string with givin date
 * @return {Object} - return day, month, and year based on provided date prop
 */
export const getDate = (date: string) => {
  const localDate = new Date(date);

  const day = formatNumber(localDate.getDate());
  const month = formatNumber(localDate.getMonth() + 1);
  const year = formatNumber(localDate.getFullYear());

  return { day, month, year };
};

/**
 * Transform date to desired type
 *
 * @param {string} date - string with givin date
 * @param {string} format - date format
 * @return {Object} - return transformed date with chosen format
 */
export const transformDate = (date: string, format: "YYYY-MM-DD") => {
  const { day, month, year } = getDate(date);

  switch (format) {
    case "YYYY-MM-DD": {
      return `${year}-${month}-${day}`;
    }
  }
};

export const measureTime = () => new Date().getTime();
