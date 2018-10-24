// @flow
export default class Scheduler {
  callback: (data: any) => void
  offset: number

  constructor (baseTime: number, callback: (data: any) => void) {
    this.offset = (baseTime * 1000) - Date.now();
    this.callback = callback;
  }

  run (schedule: any) {
    const [ first ] = schedule;
    setTimeout(() => {
      this.exicute(first, schedule.slice(1));
    }, this.getTime(first.timestamp));
  }

  exicute (now: any, schedule: any) {
    const data = (typeof now.data === 'string') ?
      JSON.parse(now.data) :
      now.data;
    this.callback(data);

    const [ next ] = schedule;
    const scheduleTail = schedule.slice(1);
    if (next) {
      setTimeout(() => {
        this.exicute(next, scheduleTail);
      }, this.getTime(next.timestamp));
    }
  }

  getTime (time: number) {
    return ((time * 1000) + this.offset) - Date.now();
  }
}
