/**
 * RegExp to check if a string is an ISO 8601 string date.
 * source: https://stackoverflow.com/questions/14488745/javascript-json-date-deserialization#comment69468928_23691273
 */
const DATE_ISO_8601_REGEX = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3]):[0-5]\d|24:00)(:[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?$/

export function isIsoDateString(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false
  }
  return DATE_ISO_8601_REGEX.test(value)
}

export function parseIsoDate(isoDateString: string): Date {
  return new Date(isoDateString)
}
