let INPUT_DATE = new Date();
let CURRENT_VIEW = [];
document
  .getElementById("selectedDate")
  .setAttribute("value", `${INPUT_DATE.toISOString().split("T")[0]}`);
document.getElementById("input-date").addEventListener("submit", (e) => {
  e.preventDefault();
  INPUT_DATE = new Date(`${document.getElementById("selectedDate").value}`);
  getValues(INPUT_DATE);
});
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
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getValues = (input) => {
  const date = {
    year: input.getFullYear(),
    month: input.getMonth(),
    day: input.getDate(),
    unix: input.getTime(),
    weekday: input.getDay(),
    totalMonthDays: getMonthDays(input.getMonth(), input.getFullYear()),
    previousMonthDays: getPreviousMonthDays(
      input.getMonth(),
      input.getFullYear()
    ),
  };
  const firstDayMonth = new Date(
    date.year + "-" + (date.month + 1) + "-01"
  ).getDay();
  drawMonthCalendar(
    date.totalMonthDays,
    firstDayMonth,
    date.day,
    date.month,
    date.year,
    date.previousMonthDays
  );
  document.getElementById("displayed-date-text").innerHTML = `${
    WEEKDAYS[date.weekday]
  }, ${date.day} ${MONTHS[date.month]} ${date.year}`;
};

const drawMonthCalendar = (
  monthDays,
  startingDay,
  selectedDay,
  selectedMonth,
  selectedYear,
  previousMonthDays
) => {
  const emptySpots = startingDay - 1;
  console.log(startingDay);
  document.getElementById("month-calendar").innerHTML = "";
  const prevStartingDay = previousMonthDays - emptySpots;
  const lastDay = startingDay + monthDays;
  const table = document.getElementById("month-calendar");
  if (emptySpots) {
    for (j = prevStartingDay + 1; j <= previousMonthDays; j++) {
      const prevDay = document.createElement("div");
      prevDay.setAttribute("class", "extra-day");
      prevDay.innerHTML = `${j}`;
      table.appendChild(prevDay);
      // CURRENT_VIEW.push(`${j}`);
    }
  }
  for (i = 1; i <= monthDays; i++) {
    const day = document.createElement("div");
    i === selectedDay
      ? day.setAttribute("class", "chosen-day")
      : day.setAttribute("class", "day");
    day.innerHTML = `${i}`;
    table.appendChild(day);
  }
  const remainingDays = 43 - lastDay;
  for (k = 1; k <= remainingDays; k++) {
    const nextDay = document.createElement("div");
    nextDay.setAttribute("class", "extra-day");
    nextDay.innerHTML = `${k}`;
    nextDay.addEventListener("mousedown", (e) => {
      displayMenu(e);
    });
    table.appendChild(nextDay);
  }
  // console.log(CURRENT_VIEW);
};

// const displayMenu = (e, day, month, year) => {
//   console.log(e, day, month, year);
// };

const getMonthDays = (month, year) => {
  const number = new Date(year, month + 1, 0);
  return number.getDate();
};

const getPreviousMonthDays = (month, year) => {
  if (month === 0) {
    year = year - 1;
    month = 12;
  }
  const number = new Date(year, month, 0);
  return number.getDate();
};

getValues(INPUT_DATE);
