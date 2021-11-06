const CALENDAR = document.getElementById("calendar");
const FORM = document.getElementById("input-date");
let selectedDate;
// const today = new Date();
// console.log(today);
// const currentMonth = today.getMonth();
// console.log(currentMonth);
// const currentYear = today.getFullYear();
// console.log(currentYear);

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

FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  selectedDate = document.getElementById("selectedDate").value;
  console.log(selectedDate);
});

console.log(selectedDate);

drawTable();
