export class DateUtil{
  dateNow= new Date();
  getTimeLapsed(dateFrom: Date){
    var minutes = 1000*60;
    var hours = minutes * 60;
    var day = hours * 24;
    var month = day * 31;
    var year = month * 12;

    var timeLapsedInMillis = this.dateNow.getTime() - dateFrom.getTime();

    if(Math.floor(timeLapsedInMillis/year) > 0){
      return Math.floor(timeLapsedInMillis/year) + (Math.floor(timeLapsedInMillis/year) == 1 ? " year " : " years ") + "ago."
    }
    if(Math.floor(timeLapsedInMillis/month) > 0){
      return Math.floor(timeLapsedInMillis/month) + (Math.floor(timeLapsedInMillis/month) == 1 ? " month " : " months ") + "ago."
    }
    if(Math.floor(timeLapsedInMillis/day) > 0){
      return Math.floor(timeLapsedInMillis/day) + (Math.floor(timeLapsedInMillis/day) == 1 ? " day " : " days ") + "ago."
    }
    if(Math.floor(timeLapsedInMillis/hours) > 0){
      return Math.floor(timeLapsedInMillis/hours) + (Math.floor(timeLapsedInMillis/hours) == 1 ? " hour " : " hours ") + "ago."
    }
    if(Math.floor(timeLapsedInMillis/minutes) > 0){
      return Math.floor(timeLapsedInMillis/minutes) + (Math.floor(timeLapsedInMillis/minutes) == 1 ? " minute " : " minutes ") + "ago."
    }
    return Math.floor (timeLapsedInMillis/1000) + (Math.floor(timeLapsedInMillis/1000) == 1 ? " second " : " seconds ") + "ago."
  }
}
