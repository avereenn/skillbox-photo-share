import constants from './constants.js';

export function getISOString(date) {
  const formatter = new Intl.DateTimeFormat(`ru`, {
    year: `numeric`,
    month: `2-digit`,
    day: `2-digit`,
    hour: `2-digit`,
    minute: `2-digit`,
    second: `2-digit`
  }),
    parts = formatter.formatToParts();

  const partsObj = {};

  for (const part of parts) {
    if (part.type === `literal`) continue;
    partsObj[part.type] = part.value;
  }

  const { year, month, day, hour, minute, second } = partsObj;

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}

export class LocalStorageApi {
  constructor(key, value) {
    this.key = key;
    if(!localStorage.getItem(this.key)) this.set(value);
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  set(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}
