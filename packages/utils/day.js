export const getDates = (d, t = 0) => {
    var curDate = new Date(d.replace(/-/g, "/"));
    var curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + t + 1);
    curDate.setDate(0);
    var curDates = new Array(curDate.getDate()).fill(0).map((item, key) => {
      return key + 1;
    });
    return curDates;
  };
  
  export const getWeek = (d) => {
    var curDate = new Date(d.replace(/-/g, "/"));
    return curDate.getDay();
  };
  
  export const getChunkDates = (d) => {
    var curDates = getDates(d);
    var preDates = getDates(d, -1);
    var nexDates = getDates(d, 1);
    var curWeek = getWeek(d);
    curDates = curDates.map((i, k) => {
      return {
        num: i,
        fullDate: /(^\d{4})-(\d{1,2})-/.exec(d)[0] + i,
        show: 1,
      };
    });
    preDates = preDates.map((i) => {
      return {
        num: i,
        show: 0,
      };
    });
    nexDates = nexDates.map((i) => {
      return {
        num: i,
        show: 0,
      };
    });
    var preCurDates = preDates
      .slice(preDates.length - (curWeek === 0 ? 6 : curWeek - 1), preDates.length)
      .concat(curDates);
    return preCurDates.concat(nexDates.slice(0, 42 - preCurDates.length));
  };
  