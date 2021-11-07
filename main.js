let INPUT_DATE = new Date();
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
  };

  const firstDayMonth = new Date(
    date.year + "-" + (date.month + 1) + "-01"
  ).getDay();
  drawMonthCalendar(date.totalMonthDays, firstDayMonth, date.day);
  document.getElementById("displayed-date-text").innerHTML = `${
    WEEKDAYS[date.weekday]
  }, ${date.day} ${MONTHS[date.month]} ${date.year}`;
};

const drawMonthCalendar = (monthDays, startingDay, selectedDay) => {
  document.getElementById("month-calendar").innerHTML = "";
  const lastDay = startingDay + monthDays;
  const table = document.getElementById("month-calendar");
  for (j = 1; j < startingDay; j++) {
    const prevDay = document.createElement("div");
    prevDay.setAttribute("class", "extra-day");
    prevDay.innerHTML = `${j}`;
    table.appendChild(prevDay);
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
};

const displayMenu = (e) => {
  console.log(e);
};

const getMonthDays = (month, year) => {
  const number = new Date(year, month + 1, 0);
  return number.getDate();
};

getValues(INPUT_DATE);
