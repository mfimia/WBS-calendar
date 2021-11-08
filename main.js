// Create new date everytime the code runs
let INPUT_DATE = new Date();
// Array to store event data
let EVENTS = [];
// Setting up the value attribute of <input> type date to display today's date on default
document
  .getElementById("selectedDate")
  .setAttribute("value", `${INPUT_DATE.toISOString().split("T")[0]}`);
// Adding event listener to form to change the date and trigger display function
document.getElementById("input-date").addEventListener("submit", (e) => {
  e.preventDefault();
  INPUT_DATE = new Date(`${document.getElementById("selectedDate").value}`);
  // This function gets the display process started
  getValues(INPUT_DATE);
});
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

// When a date is selected, all relevant values are collected in date object
const getValues = (input) => {
  const date = {
    year: input.getFullYear(),
    month: input.getMonth(),
    day: input.getDate(),
    unix: input.getTime(),
    weekday: input.getDay(),
    // The last two values are generated with functions "getMonthDays" and "getPreviousMonthDays", declared further in document.
    // They store information about how many days in total the chosen month and previous month have
    totalMonthDays: getMonthDays(input.getMonth(), input.getFullYear()),
    previousMonthDays: getPreviousMonthDays(
      input.getMonth(),
      input.getFullYear()
    ),
  };
  // This function tells us what is the first weekday of a given month in a given year
  const firstDayMonth = new Date(
    date.year + "-" + (date.month + 1) + "-01"
  ).getDay();
  // This is the actual display function, we pass it all relevant values to draw calendar
  drawMonthCalendar(
    date.totalMonthDays,
    firstDayMonth,
    date.day,
    date.month,
    date.year,
    date.previousMonthDays
  );
  // This template literal controls the text that is displayed on top of the calendar
  document.getElementById("displayed-date-text").innerHTML = `${
    WEEKDAYS[date.weekday]
  }, ${date.day} ${MONTHS[date.month]} ${date.year}`;
};

// Function to draw calendar is declared here, taking all relevant parameters
const drawMonthCalendar = (
  monthDays,
  startingDay,
  selectedDay,
  selectedMonth,
  selectedYear,
  previousMonthDays
) => {
  // Based on the starting day of the week, we calculate all "empty spots" that will be filled with previous month days
  const emptySpots = startingDay - 1;
  // Before displaying anything on the screen, we remove everything that was there already
  document.getElementById("month-calendar").innerHTML = "";
  // prevStartingDay stores the value on which the previous month starts to be drawn
  const prevStartingDay = previousMonthDays - emptySpots;
  // lastDay calculates at which cell the current month ends
  const lastDay = startingDay + monthDays;
  const table = document.getElementById("month-calendar");
  // If there are empty spots, we draw the previous month
  if (emptySpots) {
    // The previous month starts to be drawn from previousstarting day + 1 and runs until it reaches its last day
    for (j = prevStartingDay + 1; j <= previousMonthDays; j++) {
      const prevDay = document.createElement("div");
      // Days generated in this way are classified as "extra-days"
      prevDay.setAttribute("class", "extra-day");
      prevDay.innerHTML = `${j}`;
      table.appendChild(prevDay);
      // CURRENT_VIEW.push(`${j}`);
    }
  }
  // This for loop generates the chosen month days. It just runs from 1 until the last day of the month
  for (i = 1; i <= monthDays; i++) {
    const day = document.createElement("div");
    // This ternary operator highlights the day chosen by user
    i === selectedDay
      ? day.setAttribute("class", "chosen-day")
      : day.setAttribute("class", "day");
    day.innerHTML = `${i}`;
    table.appendChild(day);
  }
  // Last, we draw the days of the next month.
  // We calculate the empty spots with the variable remainingDays
  const remainingDays = 43 - lastDay;
  // The for loop just runs from 1 until there are no more empty spots
  for (k = 1; k <= remainingDays; k++) {
    const nextDay = document.createElement("div");
    nextDay.setAttribute("class", "extra-day");
    nextDay.innerHTML = `${k}`;
    // Adding event listener to display options menu on click. Naming the function so it can be removed
    nextDay.addEventListener("mousedown", function eventHandler(event) {
      // Removing event handler when it is used to avoid unwanted extra menus
      event.target.removeEventListener("mousedown", eventHandler);
      // Converting event target into a number
      const targetDay = Number(event.target.innerHTML);
      // Adding 2 to selected month (0-11) to convert it into normal format of next month
      let nextMonth = selectedMonth + 2;
      let nextYear = selectedYear;
      // Adding logic to correctly display month and year if selected next month is in the next year
      if (nextMonth === 13) {
        nextMonth = 1;
        nextYear = nextYear + 1;
      }
      // Display the menu passing the information about the selected event, day, month, and year
      displayMenu(event, targetDay, nextMonth, nextYear);
    });
    table.appendChild(nextDay);
  }
};

const displayMenu = (event, day, month, year) => {
  const menu = document.createElement("div");
  menu.setAttribute("class", "displayed-menu");
  menu.innerHTML = `${day}.${month}.${year}
  <button id="add-event" onmousedown="addEvent()">Add event</button>`;
  event.target.appendChild(menu);

  // if (menu) {

  // }
};

const addEvent = () => {
  console.log("hi!");
};

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

// If no input is given by user, we display the current date
getValues(INPUT_DATE);
