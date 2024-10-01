/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

const stringifyPretty = <T>(item: T) => JSON.stringify(item, null, 4);

const isEmpty = (obj: any) => [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

const getStrikePriceFromSymbol = (symbol: string): number => {
    const parts = symbol.split('-');

    return Number(parts[2]);
};

const getSettlementTimeFromSymbol = (input: string) => {
    // Split the input string by the hyphen separator
    const parts = input.split('-');

    // Extract the date part from the last element
    const datePart = parts[parts.length - 1];

    // Convert the date part to a Date object
    const day = parseInt(datePart.slice(0, 2), 10);
    const month = parseInt(datePart.slice(2, 4), 10) - 1; // Months are zero-based
    const year = parseInt(`20${datePart.slice(4, 6)}`, 10);

    const date = new Date(year, month, day, 12, 0, 0, 0);

    // Format the date in the desired format
    const settlementTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T12:00:00Z`;

    return settlementTime;
  };

  type DateType = Date | Dayjs | string | number;

  function dateFormat(dateToFormat: DateType, formatString = 'DD MMM'): string {
    let date = dateToFormat;
    if (!dateToFormat) {
        date = dayjs();
    }
    return dayjs(date).format(formatString);
  }

  /**
 * Crop unnecessary zeros after decimal. By default 2 decimals
 *
 * @example
 * ```typescript
 * cropAfterDecimals(0.010000000000000000)
 * -> Returns 0.01
 * ```
 */
function cropAfterDecimals(num: number | null | undefined | string, digits = 2): number {
    if (num === null || num === undefined || Number.isNaN(num)) {
      return 0;
    }

    const numS = num.toString();
    const decPos = numS.indexOf('.');
    const substrLength = decPos === -1 ? numS.length : 1 + decPos + digits;
    const trimmedResult = numS.substring(0, substrLength);
    const finalResult = parseFloat(trimmedResult);

    return Number.isNaN(finalResult) ? 0 : finalResult;
  }

  const shortenOptionSymbol = (symbol: string) => {
    const lastIdx = symbol.lastIndexOf('-');
    return symbol.substring(0, lastIdx);
  };

export { stringifyPretty, isEmpty, getStrikePriceFromSymbol, getSettlementTimeFromSymbol, dateFormat, cropAfterDecimals, shortenOptionSymbol };
