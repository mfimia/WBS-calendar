let INPUT_DATE = new Date();
document.getElementById('selectedDate').setAttribute('value', `${INPUT_DATE.toISOString().split('T')[0]}`);
document.getElementById("input-date").addEventListener("submit", (e) => {
  e.preventDefault();
  INPUT_DATE = new Date(`${document.getElementById("selectedDate").value}`);
  getValues(INPUT_DATE);
});

const getValues = (date) => {
  const unix = date.getTime();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const currentDayofWeek = date.getDay();
  const currentDay = date.getDate();
  const totalMonthDays = getMonthDays(currentMonth, currentYear);
  const firstDayMonth = new Date(
    currentYear + "-" + (currentMonth + 1) + "-01"
  ).getDay();
  drawMonthCalendar(totalMonthDays, firstDayMonth, currentDay);
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
    i === selectedDay ? day.setAttribute('class', 'chosen-day') : day.setAttribute("class", "day");
    day.innerHTML = `${i}`;
    table.appendChild(day);
  }
  const remainingDays = 43 - lastDay;
  for (k = 1; k <= remainingDays; k++) {
    const prevDay = document.createElement("div");
    prevDay.setAttribute("class", "extra-day");
    prevDay.innerHTML = `${k}`;
    table.appendChild(prevDay);
  }
};

const getMonthDays = (month, year) => {
  const number = new Date(year, month + 1, 0);
  return number.getDate();
};

getValues(INPUT_DATE);
