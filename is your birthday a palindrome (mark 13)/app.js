'use strict';

const inputDateEl = document.querySelector("#input_date");
const btnEl = document.querySelector(".btn");
const outputEl = document.querySelector(".output");
// console.log(getAllDateFormats(date));

const reversingStr = function (str) {
  const splitStr = str.split('');
  const reverseStr = splitStr.reverse();
  const combinedReversedStr = reverseStr.join('');
  return combinedReversedStr;
};
// console.log(reversingStr('Mathaji'));

const isStrPalidrome = function (str) {
  const reverse = reversingStr(str);

  //if string that we provided is equal to reversed string, then it should say a boolean value either true or false
  return str === reverse;
};

const convertDateToString = function (date) {
  const dateStr = {
    day: '',
    month: '',
    year: '',
  };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
};

// console.log(convertDateToString(date));

//this function is to get all the date formats and checking if it's a palindrome or not
const getAllDateFormats = function (date) {
  const dateStr = convertDateToString(date);
  const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  const yymmdd = dateStr.year + dateStr.month + dateStr.day.slice(-2);

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

// console.log(getAllDateFormats(date));

//checking palidrome for all date formats

const checkPalindromeForAllDateFormats = function (date) {
  const listOfPalindrome = getAllDateFormats(date);
  let statement = false;

  for (let i = 0; i < listOfPalindrome.length; i++) {
    if (isStrPalidrome(listOfPalindrome[i])) {
      statement = true;
      break;
    }
  }
  return statement;
};

//checking if the year is leap year or not

const checkLeapYear = function(year){
if(year % 400 === 0){
  return true
}
if(year % 100 === 0){
  return false
}
if(year % 4 ===0){
  return true
}
return false
}

// console.log(checkLeapYear(2021))
//function to increment date

function getNextDate(date){
  let day = date.day + 1;
  let month =date.month;
  let year = date.year;

  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

//if month is february so we need to validate it, if it's a leap year or not.
  if(month === 2){
    if(checkLeapYear(year)){
      if (day > 29){
        day =1 ;
        month++
      }
    }else{
      if (day > 28){
        day =1 ;
        month++
      }
    }

  }else{

    //if day is greater than days in month then it should start with 1st day of next month
    if(day > daysInMonth[month-1])
    day =1 ;
    month++
  }

  if(month >12){
    month = 1;
    year++
  }

  return{
    day:day,
    month:month,
    year:year
  }

}

function findNextPalindromeDate (date){

  var counter = 0;
  var nextDate = getNextDate(date);

  while(1){
    counter++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);

    if(isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [counter, nextDate];

}

const date = {
  day: 8,
  month: 8,
  year: 2021,
};

// console.log(findNextPalindromeDate(date));
// console.log(getNextDate(date));

const clickHandler = function(a){

  const inputDate = inputDateEl.value;

if(inputDate !== ""){
  const listOfDates = inputDate.split('-');
  const date = {
    day:Number(listOfDates[2]),
    month:Number(listOfDates[1]),
    year:Number(listOfDates[0]),
  }
  const isPalindrome = checkPalindromeForAllDateFormats(date);

  if(isPalindrome){
    outputEl.textContent="Awesome! your birthday is a palindrome 😉😉😉😉😉"
  }else{
    const [counter, nextDate] =findNextPalindromeDate(date);
    outputEl.textContent=`The next palindrome date is ${nextDate.day}/${nextDate.month}/${nextDate.year} and you missed it by ${counter} days 😒😒😒😒😒!`

  }
  console.log(isPalindrome);
}

}


btnEl.addEventListener("click", clickHandler);
