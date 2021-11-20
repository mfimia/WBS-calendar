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

// Displays all items grouped in a day on click
// Takes the unixID of the day and day month and year and changes the HTML and CSS of the element
const displayGroupMenu = (unix, day, month, year) => {
  const dayEvents = EVENTS.filter((event) => {
    return event.day === day && event.numMonth === month && event.year === year;
  });
  const groupMenu = document.getElementById(`group-events-${unix}`);
  groupMenu.classList.remove("hover-color");
  groupMenu.style.height = "30vmin";
  groupMenu.style.width = "30vmin";
  groupMenu.innerHTML = "";
  groupMenu.style.overflow = "auto";
  groupMenu.style.textAlign = "center";
  groupMenu.style.position = "absolute";
  groupMenu.style.transform = "translate(-20%, -20%)";
  dayEvents.forEach((event) => {
    groupMenu.innerHTML += `
      <div 
      class="grouped-event"
      id="grouped-event-${event.unixID}"
      style="color:${event.colorHex}">
      <h3 onfocusout="editGroupedEvent(${event.unixID})" contentEditable="true">${event.title}</h3>
      <p>${event.startTime} - ${event.endTime}</p> 
      <p>${event.durationMinutes} mins</p>
      </div>
      `;
  });
  groupMenu.innerHTML += `
    <button 
    onclick="exitCallback()"
    class="exit-group">&#x2715
    </button>`;
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
  eventStartDate.setAttribute("id", `start-time-month-${day}-${month}-${year}`);
  eventStartDate.defaultValue = convertToTimeFormat(new Date());
  const eventEndDate = document.createElement("input");
  eventEndDate.setAttribute("type", "time");
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
