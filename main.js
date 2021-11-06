const CALENDAR = document.getElementById("calendar");
const FORM = document.getElementById("input-date");
let selectedDate;
// const today = new Date();
// console.log(today);
// const currentMonth = today.getMonth();
// console.log(currentMonth);
// const currentYear = today.getFullYear();
// console.log(currentYear);

FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  selectedDate = new Date(`${document.getElementById("selectedDate").value}`);
  getValues(selectedDate);
});

const getValues = (date) => {
  const unix = date.getTime();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const currentDayofWeek = date.getDay();
  const currentDay = date.getDate();
  const totalMonthDays = getMonthDays(currentMonth, currentYear);
  const lastDay = currentDayofWeek + (totalMonthDays - 1);
  console.log(
    unix,
    currentMonth,
    currentYear,
    currentDayofWeek,
    currentDay,
    totalMonthDays,
    lastDay
  );
  drawTableTest(totalMonthDays, currentDayofWeek, lastDay);
};

const drawTableTest = (monthDays, startingDay, lastDay) => {
  const table = document.getElementById("test-table");
  console.log(monthDays);
  for (j = 1; j < startingDay; j++) {
    const prevDay = document.createElement("div");
    prevDay.setAttribute("class", "prev-test-day");
    prevDay.innerHTML = `${j}`;
    table.appendChild(prevDay);
  }
  for (i = 1; i <= monthDays; i++) {
    const day = document.createElement("div");
    day.setAttribute("class", "test-day");
    day.innerHTML = `${i}`;
    table.appendChild(day);
  }
  const remainingDays = 42 - lastDay;
  for (k = 1; k <= remainingDays; k++) {
    const prevDay = document.createElement("div");
    prevDay.setAttribute("class", "prev-test-day");
    prevDay.innerHTML = `${k}`;
    table.appendChild(prevDay);
  }
};

const getMonthDays = (month, year) => {
  const number = new Date(year, month + 1, 0);
  return number.getDate();
};

const nameTitle = () => {
  document.getElementById("month-day-1").innerHTML = "Monday";
  document.getElementById("month-day-2").innerHTML = "Tuesday";
  document.getElementById("month-day-3").innerHTML = "Wednesday";
  document.getElementById("month-day-4").innerHTML = "Thursday";
  document.getElementById("month-day-5").innerHTML = "Friday";
  document.getElementById("month-day-6").innerHTML = "Saturday";
  document.getElementById("month-day-7").innerHTML = "Sunday";
};

const drawTable = () => {
  for (i = 1; i <= 49; i++) {
    const day = document.createElement("div");
    day.setAttribute("id", `month-day-${i}`);
    if (i >= 1 && i <= 7) {
      day.setAttribute("class", "weekday");
      day.innerHTML = "title";
    } else {
      day.setAttribute("class", "month-day");
      day.innerHTML = i - 7;
    }
    CALENDAR.appendChild(day);
  }

  nameTitle();
};

drawTable();
