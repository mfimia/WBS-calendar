
// This function takes chosen month and year as parameters and returns the total days the month has
// Returns a number
const getMonthDays = (month, year) => {
  const number = new Date(year, month + 1, 0);
  return number.getDate();
};

// Same as above but with previous month
const getPreviousMonthDays = (month, year) => {
  if (month === 0) {
    year = year - 1;
    month = 12;
  }
  const number = new Date(year, month, 0);
  return number.getDate();
};


// Convert a given time into hours and minutes (number)
const convertToNumber = (time) => {
  const array = time.split(":");
  const hours = parseInt(array[0]);
  const minutes = parseInt(array[1]);
  const number = {
    hours: hours,
    minutes: minutes,
  };
  return number;
};

// Receives a new date and returns hh:mm
// Second argument toggles +1 h
const convertToTimeFormat = (time, plusOne = false) => {
  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };
  if (plusOne) {
    let unix = time.getTime();
    time = new Date(unix + 3600000);
  }
  let h = addZero(time.getHours());
  const m = addZero(time.getMinutes());
  const returnedTime = h + ":" + m;
  return returnedTime;
};
// Helper functions below to manipulate time values
// Convert a given time into seconds
const convertToSeconds = (time) => {
  const array = time.split(":");
  const seconds =
    parseInt(array[0], 10) * 60 * 60 + parseInt(array[1], 10) * 60;
  return seconds;
};