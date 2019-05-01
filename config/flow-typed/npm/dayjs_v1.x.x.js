
declare type dayjs = (date?: ConfigType, option?: OptionType, locale?: string) => Dayjs

declare type ConfigType = string | number | Date | Dayjs

declare type OptionType = { locale?: string, format?: string, utc?: boolean } | string

declare type UnitTypeShort = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'
declare type UnitType = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'date' | UnitTypeShort;

declare type OpUnitType = UnitType | "week" | 'w';
declare type QUnitType = UnitType | "quarter" | 'Q';

type dayjs$yearfunction = () => number | (value: number) => Dayjs;
type dayjs$monthfunction = () => number | (value: number) => Dayjs;
type dayjs$datefunction = () => number | (value: number) => Dayjs;
type dayjs$dayfunction = () => number | (value: number) => Dayjs;
type dayjs$hourfunction = () => number | (value: number) => Dayjs;
type dayjs$minutefunction = () => number | (value: number) => Dayjs;
type dayjs$secondfunction = () => number | (value: number) => Dayjs;
type dayjs$millisecondfunction = () => number | (value: number) => Dayjs;
type dayjs$localefunction = () => string | (preset: string | { name: string, [key: string]: any }, object?: { [key: string]: any }) => Dayjs;

declare class Dayjs {
  constructor(config?: ConfigType): Dayjs;

  clone(): Dayjs;

  isValid(): boolean;

  year:dayjs$yearfunction;

  month:dayjs$monthfunction;

  date:dayjs$datefunction;

  day:dayjs$dayfunction;

  hour:dayjs$hourfunction;

  minute:dayjs$minutefunction;

  second:dayjs$secondfunction;

  millisecond:dayjs$millisecondfunction;

  set(unit: UnitType, value: number): Dayjs;

  add(value: number, unit: OpUnitType): Dayjs;

  subtract(value: number, unit: OpUnitType): Dayjs;

  startOf(unit: OpUnitType): Dayjs;

  endOf(unit: OpUnitType): Dayjs;

  format(template?: string): string;

  diff(date: ConfigType, unit: QUnitType, float?: boolean): number;

  valueOf(): number;

  unix(): number;

  daysInMonth(): number;

  toDate(): Date;

  toJSON(): string;

  toISOString(): string;

  toString(): string;

  utcOffset(): number;

  isBefore(date: ConfigType, unit?: OpUnitType): boolean;

  isSame(date: ConfigType, unit?: OpUnitType): boolean;

  isAfter(date: ConfigType, unit?: OpUnitType): boolean;

  utc(date?: any): Dayjs;

  locale:dayjs$localefunction;
}

declare type PluginFunc = (option: any, c: Dayjs, d: dayjs) => void;

declare type extend = (plugin: PluginFunc, option?: any) => Dayjs;

declare type locale = (preset: string | { name: string, [key: string]: any }, object?: { [key: string]: any }, isLocal?: boolean) => string;

declare type isDayjs = (d: any) => boolean;

declare type unix = (t: number) => Dayjs;

declare type utc = (d: any) => Dayjs;

declare module 'dayjs' {
  declare module.exports: dayjs;
}