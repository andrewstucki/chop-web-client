// @flow
export default class Scheduler {
  callback: (data: any) => void
  offset: number

  constructor (baseTime: number, callback: (data: any) => void) {
    this.offset = baseTime - Date.now();
    this.callback = callback;
  }

  run (schedule: any) {
    const [ first ] = schedule;
    setTimeout(() => {
      this.exicute(first, schedule.slice(1));
    }, this.getTime(first.time));
  }

  exicute (now: any, schedule: any) {
    this.callback(now.data);

    const [ next ] = schedule;
    const scheduleTail = schedule.slice(1);
    if (next) {
      setTimeout(() => {
        this.exicute(next, scheduleTail);
      }, this.getTime(next.time));
    }
  }

  getTime (time: number) {
    return (time + this.offset) - Date.now();
  }
}
