const AppError = require("./appError");
const catchAsync = require("./catchAsync");
const moment = require('moment')

exports.generateSixDigitRandomNumber = () => {
    const min = 100000; // Smallest six-digit number (100,000)
    const max = 999999; // Largest six-digit number (999,999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  exports.createPagination = ({totalData,pageLimit,currentPage}) => {
    let offset =( Number(pageLimit) * (Number(currentPage) -1))
    let total = totalData;
    let page = Number(currentPage);
    let limit = Number(pageLimit);
    let totalPage = Math.ceil(totalData / Number(pageLimit))
    // console.log(offset,"offset")
    // if(offset <= 0)  new AppError("please provide page no 1 to n",400) 
    return {
      offset:offset,
      pagination:{total,page,limit,totalPage}
    }
  }
  
exports.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

exports.getArrContent = (inputString) => {
  const content = inputString.slice(1, -1);
  const arr = content.split(',');
  return arr;
}

function getChildNamesWithFallback(category) {
  if (category.child.length > 0) {
    return category.child.flatMap(child => getChildNamesWithFallback(child));
  }
  return category.categoryName;
}
exports.getNames = (jsonData) => jsonData.flatMap(category => getChildNamesWithFallback(category))


exports.findObjectByIdRecursive = (data, id) => {
  for (const obj of data) {
    if (obj.id === id) {
      return obj;
    }
    if (obj.child && obj.child.length > 0) {
      const foundInChildren = this.findObjectByIdRecursive(obj.child, id);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return null;
}

exports.getNamesArr = (data, id) => {
  let arr = this.findObjectByIdRecursive(data,id)
  if(arr.child.length){
    return this.getNames(arr.child)
  }
  return [arr.categoryName] 
}


exports.otpExpiredTime = (time=1) => { // time in minutes
  time = time * 60;
  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds
  const futureTimestamp = currentTimestamp + Number(time);
  return (futureTimestamp * 1000).toString();
}

exports.getDate = (type) => {
  const currentMonth = moment().startOf('month'); // Start of the current month
  const startOfMonth = currentMonth.clone().startOf('day'); // 00:00:00
  const endOfMonth = currentMonth.clone().endOf('month').endOf('day'); // 23:59:59.999
  
  var currentDate = moment();
  if(type === 'THIS_MONTH'){
    return {
      startOfMonth, endOfMonth
    }
  }else if( type == 'CURRENT_WEEK'){
    const  weekStart = currentDate.clone().startOf('isoWeek');
    const  weekEnd = currentDate.clone().endOf('isoWeek');
    return {
      weekStart,
      weekEnd
    }
  }else if(type === 'LAST_10_DAYS'){
    const datesArray = [];
    const currentDate = moment();
    for (let i = 0; i < 10; i++) {
      const startTime = moment(currentDate).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      const endTime = moment(currentDate).set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
    // Push the date-time range to the array
      datesArray.push({
      startDate: startTime.format('YYYY-MM-DD HH:mm:ss'),
      endDate: endTime.format('YYYY-MM-DD HH:mm:ss'),
     });
    currentDate.subtract(1, 'days');
    }
    return {
      datesArray
    }

  }

}


exports.checkKeyExistOrNot = (obj = {}, key="") => {
  try {
    return obj.hasOwnProperty(key) 
  } catch (error) {
    return false;
  }
}