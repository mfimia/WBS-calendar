
// Storing the name of months in array. The indexes match the generated value by method '.getMonth()'. (0-11)
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Same thing with weekdays (0-6)
  const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

// Create new date everytime the code runs
let INPUT_DATE = new Date();

// Array to store event data
let EVENTS = JSON.parse(localStorage.getItem("month-events")) || [];

// Object to store all togglers
const TOGGLERS = {
    back: false,
    click: false,
  };

// Creating a class that automatically takes the values of a given date
class dateValues {
    constructor(date) {
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.day = date.getDate();
    }
}
  
  
// This variable will keep track of what date has been added by user
// Initializing it with new date
let STORED_DATE = new dateValues(new Date());
