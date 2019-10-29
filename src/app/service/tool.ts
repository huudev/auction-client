
export class Tool {

  static getDataDiff(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    const seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }
}
