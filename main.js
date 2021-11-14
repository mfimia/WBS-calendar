// import displayMenu from "./displayMenu.js";
// Create new date everytime the code runs
let INPUT_DATE = new Date();
// Array to store event data
let EVENTS = JSON.parse(localStorage.getItem("month-events")) || [];
const TOGGLERS = {
  back: false,
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

// Setting up the value attribute of <input> type date to display today's date on default
document
  .getElementById("selectedDate")
  .setAttribute("value", `${INPUT_DATE.toISOString().split("T")[0]}`);
// Adding event listener to form to change the date and trigger display function
document.getElementById("input-date").addEventListener("submit", (e) => {
  e.preventDefault();
  INPUT_DATE = new Date(`${document.getElementById("selectedDate").value}`);
  STORED_DATE = new dateValues(
    new Date(document.getElementById("selectedDate").value)
  );
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
  console.log(input);
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
      let withEvent = false;
      const numDay = Number(j);
      const prevMonth = selectedMonth;
      const prevYear = selectedMonth ? selectedYear : selectedYear - 1;
      const midnightUnix = new Date(
        selectedMonth ? prevYear : prevYear + 1,
        prevMonth - 1,
        numDay
      ).getTime();
      const prevDay =
        document.getElementById(`${midnightUnix}`) ||
        document.createElement("div");
      // Days generated in this way are classified as "extra-days"
      const storedPreviousDay = {
        day: Number(j),
        month: prevMonth,
        year: prevYear,
        midnightUnix: midnightUnix,
      };
      EVENTS.forEach((element) => {
        if (
          storedPreviousDay.day === element.day &&
          storedPreviousDay.month === element.numMonth &&
          storedPreviousDay.year === element.year
        ) {
          prevDay.style.color = "blue";
          withEvent = true;
        }
      });

      prevDay.innerHTML = `${j}`;
      prevDay.setAttribute("id", `${midnightUnix}`);
      prevDay.setAttribute("class", "extra-day");
      prevDay.addEventListener("click", function eventHandler(event) {
        // Removing event handler when it is used to avoid unwanted extra menus
        event.target.removeEventListener("click", eventHandler);
        displayMenu(event, numDay, prevMonth, prevYear, withEvent);
      });
      table.appendChild(prevDay);
    }
  }
  // This for loop generates the chosen month days. It just runs from 1 until the last day of the month
  for (i = 1; i <= monthDays; i++) {
    let withEvent = false;
    const numDay = Number(i);
    const midnightUnix = new Date(
      selectedYear,
      selectedMonth,
      numDay
    ).getTime();
    const storedCurrentDay = {
      day: Number(i),
      month: selectedMonth + 1,
      year: selectedYear,
      midnightUnix: midnightUnix,
    };
    const day =
      document.getElementById(`${midnightUnix}`) ||
      document.createElement("div");
    // This ternary operator highlights the day chosen by user
    i === selectedDay
      ? day.setAttribute("class", "chosen-day")
      : day.setAttribute("class", "day");
    EVENTS.forEach((element) => {
      if (
        storedCurrentDay.day === element.day &&
        storedCurrentDay.month === element.numMonth &&
        storedCurrentDay.year === element.year
      ) {
        day.style.color = "blue";
        withEvent = true;
      }
    });
    day.innerHTML = `${i}`;
    day.setAttribute("id", `${midnightUnix}`);
    day.addEventListener("click", function eventHandler(event) {
      // Removing event handler when it is used to avoid unwanted extra menus
      event.target.removeEventListener("click", eventHandler);
      displayMenu(event, numDay, selectedMonth + 1, selectedYear, withEvent);
    });
    table.appendChild(day);
  }
  // Last, we draw the days of the next month.
  // We calculate the empty spots with the variable remainingDays
  const remainingDays = 43 - lastDay;
  // The for loop just runs from 1 until there are no more empty spots
  for (k = 1; k <= remainingDays; k++) {
    let withEvent = false;
    let nextMonth = selectedMonth + 2;
    let nextYear = selectedYear;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = nextYear + 1;
    }
    const midnightUnix = new Date(nextYear, nextMonth - 1, Number(k)).getTime();
    const nextDay =
      document.getElementById(`${midnightUnix}`) ||
      document.createElement("div");
    const storedNextDay = {
      day: Number(k),
      month: nextMonth,
      year: nextYear,
      midnightUnix: midnightUnix,
    };
    EVENTS.forEach((element) => {
      if (
        storedNextDay.day === element.day &&
        storedNextDay.month === element.numMonth &&
        storedNextDay.year === element.year
      ) {
        nextDay.style.color = "blue";
        withEvent = true;
      }
    });
    nextDay.setAttribute("class", "extra-day");
    nextDay.innerHTML = `${k}`;
    // Day, month and year values calculated and stored in variables
    const day = Number(nextDay.innerHTML);
    // Unique id generated based on DD-MM-YYYY format
    nextDay.setAttribute("id", `${midnightUnix}`);
    // Adding event listener to display options menu on click. Naming the function so it can be removed
    nextDay.addEventListener("click", function eventHandler(event) {
      // Removing event handler when it is used to avoid unwanted extra menus
      event.target.removeEventListener("click", eventHandler);
      displayMenu(event, day, nextMonth, nextYear, withEvent);
    });
    table.appendChild(nextDay);
  }
};

let counter = 0;
// Menu takes all info about the day and displays an box in the location where event took place
const displayMenu = (event, day, month, year, dayEvents, backside = false) => {
  event.stopPropagation();
  counter++;
  console.log(`menu displayed: ${counter}`);
  let menu =
    document.getElementById(`add-events-menu-${counter}`) ||
    document.createElement("div");
  menu.setAttribute("class", "displayed-menu");
  menu.setAttribute("id", `add-events-menu-${counter}`);
  // menu.innerHTML = TOGGLERS.back ? "" : `${day}.${month}.${year}`;
  // TOGGLERS.back ? menu.appendChild(backButton) : menu.appendChild(addButton);
  if (!backside) {
    let addButton =
      document.getElementById("add-button") || document.createElement("button");
    addButton.setAttribute("id", "add-event");
    addButton.innerHTML = "Add event";
    addButton.addEventListener("mousedown", (e) => {
      menu.remove();
      displayMenu(event, day, month, year, dayEvents, true);
    });
    menu.innerHTML = `${day}.${month}.${year}`;
    menu.appendChild(addButton);
    if (dayEvents) {
      const eventsSection = document.createElement("div");
      eventsSection.setAttribute("id", `month-event-${day}-${month}-${year}`);
      EVENTS.forEach((element) => {
        if (
          day === element.day &&
          month === element.numMonth &&
          year === element.year
        ) {
          eventsSection.innerHTML += `
            <div
            class="month-event"
            id="${element.unixID}"
            Event: ${element.title}<br>
            Start: ${element.startTime}<br>
            End: ${element.endTime}<br>
            Duration: ${element.durationMinutes} minutes<br>
            <button 
            class="month-remove-button" 
            onclick="removeMonthEvent(${element.unixID}, ${element.day}, ${element.numMonth}, ${element.year})">
            Remove event
            </button>
            `;
        }
      });
      menu.appendChild(eventsSection);
    }
  } else if (backside) {
    let backButton =
      document.getElementById("back-button") ||
      document.createElement("button");
    backButton.setAttribute("id", "back-button");
    backButton.innerHTML = "Back";

    backButton.addEventListener("mousedown", (e) => {
      menu.remove();
      displayMenu(event, day, month, year, dayEvents);
    });
    menu.innerHTML = "";
    menu.appendChild(backButton);
    const eventForm = generateForm(day, month, year);
    menu.appendChild(eventForm);
  }

  document.addEventListener("click", function exitMenu(e) {
    const form = document.getElementById(`form-month-${day}-${month}-${year}`);
    if (
      e.target != menu &&
      !menu.contains(e.target) &&
      !form.contains(e.target)
    ) {
      console.log(menu);
      console.log(e.target);
      e.stopPropagation();
      menu.remove();
      getValues(new Date(STORED_DATE.year, STORED_DATE.month, STORED_DATE.day));
      document.removeEventListener("click", exitMenu);
    }
  });

  event.target.appendChild(menu);
  // addButton.addEventListener("mousedown", (e) => {
  //   e.stopPropagation();
  //   TOGGLERS.back = !TOGGLERS.back;
  //   menu.innerHTML = "";
  //   displayMenu(event, day, month, year, dayEvents);
  // });
  // backButton.addEventListener("mousedown", (e) => {
  //   e.stopPropagation();
  //   TOGGLERS.back = !TOGGLERS.back;
  //   displayMenu(event, day, month, year, dayEvents);
  // });
};

// This is just very repetite code that generates a form inside the display menu
const generateForm = (day, month, year) => {
  const eventForm = document.createElement("form");
  eventForm.setAttribute("id", `form-month-${day}-${month}-${year}`);
  const eventInput = document.createElement("input");
  eventInput.setAttribute("type", "text");
  eventInput.setAttribute("placeholder", "What's coming up?");
  eventInput.setAttribute("id", `input-month-${day}-${month}-${year}`);
  eventInput.setAttribute("class", "input-event-month");
  eventInput.setAttribute("autocomplete", "off");
  eventInput.setAttribute("required", "true");
  const eventStartDate = document.createElement("input");
  eventStartDate.setAttribute("type", "time");
  // eventStartDate.setAttribute("step", "900");
  eventStartDate.setAttribute("id", `start-time-month-${day}-${month}-${year}`);
  eventStartDate.defaultValue = convertToTimeFormat(new Date());
  const eventEndDate = document.createElement("input");
  eventEndDate.setAttribute("type", "time");
  // eventEndDate.setAttribute("step", "900");
  eventEndDate.setAttribute("id", `end-time-month-${day}-${month}-${year}`);
  eventEndDate.defaultValue = convertToTimeFormat(new Date(), true);
  const submitEvent = document.createElement("input");
  submitEvent.setAttribute("type", "submit");
  submitEvent.setAttribute("id", `submit-event-month-${day}-${month}-${year}`);
  const colorTag = document.createElement("input");
  colorTag.setAttribute("type", "color");
  colorTag.setAttribute("id", `color-month-${day}-${month}-${year}`);
  eventForm.appendChild(eventInput);
  eventForm.appendChild(eventStartDate);
  eventForm.appendChild(eventEndDate);
  eventForm.appendChild(colorTag);
  eventForm.appendChild(submitEvent);
  // Adding event listener to the form that will call the createEvent function, reset input and draw calendar on submit
  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const eventText = document.getElementById(
      `input-month-${day}-${month}-${year}`
    ).value;
    createEvent(event, eventText, day, month, year);
    document.getElementById(`input-month-${day}-${month}-${year}`).value = "";
    getValues(new Date(STORED_DATE.year, STORED_DATE.month, STORED_DATE.day));
  });
  return eventForm;
};

// Function to add events
// It takes the day, month and year. Creates an object with all the values and pushes it to the EVENTS array
const createEvent = (event, text, day, month, year) => {
  // Below we select all values coming from the form and store them in variables
  const startTime = document.getElementById(
    `start-time-month-${day}-${month}-${year}`
  ).value;
  const endTime = document.getElementById(
    `end-time-month-${day}-${month}-${year}`
  ).value;
  const colorTag = document.getElementById(
    `color-month-${day}-${month}-${year}`
  ).value;
  // To calculate the duration we call these helper functions declared below
  const durationMinutes =
    (convertToSeconds(endTime) - convertToSeconds(startTime)) / 60;
  const startTimeNum = convertToNumber(startTime);
  // Here is where we create the object with all the values from the form
  const monthEvent = {
    title: text,
    numWeekday: new Date(`${year}-${month}-${day}`).getDay(),
    stringWeekday: WEEKDAYS[new Date(`${year}-${month}-${day}`).getDay()],
    day: day,
    numMonth: month,
    stringMonth: MONTHS[month - 1],
    year: year,
    colorHex: colorTag,
    startTime: startTime,
    endTime: endTime,
    durationMinutes: durationMinutes,
    // Generating unique unix ID using start time
    unixID: new Date(
      year,
      month - 1,
      day,
      startTimeNum.hours,
      startTimeNum.minutes
    ).getTime(),
  };
  // When the object is created we push it to our EVENTS array and save it in localStorage
  EVENTS.push(monthEvent);
  localStorage.setItem(`month-events`, JSON.stringify(EVENTS));
};

const removeMonthEvent = (id, day, month, year) => {
  console.log("hi!");
  console.log(id, day, month, year);
};

// Helper functions below to manipulate time values
// Convert a given time into seconds
const convertToSeconds = (time) => {
  const array = time.split(":");
  const seconds =
    parseInt(array[0], 10) * 60 * 60 + parseInt(array[1], 10) * 60;
  return seconds;
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

// Listener event. User clicks outside the menu and whole calendar gets drawn again
// document.body.addEventListener("mouseup", function exitMenu(event) {
//   // Adding conditions to the event listener that exits the menu
//   // It will only trigger when user doesnt click in any of these places below (all menu related)
//   // console.log(menu.childNodes, event.target);
//   // menu.children.forEach((child) => {
//   //   childNodes.push(child);
//   // });
//   event.stopPropagation();
//   console.log(`triggered document body event listener: ${counter}`);
//   if (
//     // &&
//     event.target != menu

//     // event.target != menu &&
//     // event.target !=
//     //   document.getElementById(`input-month-${day}-${month}-${year}`) &&
//     // event.target !=
//     //   document.getElementById(`submit-event-month-${day}-${month}-${year}`) &&
//     // event.target !=
//     //   document.getElementById(`start-time-month-${day}-${month}-${year}`) &&
//     // event.target !=
//     //   document.getElementById(`end-time-month-${day}-${month}-${year}`) &&
//     // event.target !=
//     //   document.getElementById(`form-month-${day}-${month}-${year}`) &&
//     // event.target !=
//     //   document.getElementById(`color-month-${day}-${month}-${year}`) &&
//     // event.target !=
//     //   document.getElementById(`month-event-${day}-${month}-${year}`) &&
//     // event.target != document.querySelector(".month-remove-button")
//     // event.target != document.querySelector(".month-event").childNodes
//   ) {
//     // INPUT_DATE = new Date(`${document.getElementById("selectedDate").value}`);
//     TOGGLERS.back = false;

//     // This function gets the display process started
//     document.body.removeEventListener("mouseup", exitMenu);
//     menu.remove();
//     getValues(new Date(STORED_DATE.year, STORED_DATE.month, STORED_DATE.day));
//   }
// });
