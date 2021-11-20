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
      const monthDayNumber = document.createElement("div");
      monthDayNumber.setAttribute("class", "extra-month-day-number");
      monthDayNumber.innerHTML = `${j}`;

      const eventsList = document.createElement("ul");
      eventsList.setAttribute("class", "events-headline-list");
      prevDay.appendChild(monthDayNumber);
      let counter = 0;
      EVENTS.forEach((element) => {
        if (
          storedPreviousDay.day === element.day &&
          storedPreviousDay.month === element.numMonth &&
          storedPreviousDay.year === element.year
        ) {
          withEvent = true;
          eventsList.innerHTML += `
              <li
              id="${element.unixID}"
              contentEditable="true" 
              onfocusout="editEvent(${element.unixID})"
              style="background-color: ${element.colorHex}" 
              class="event-headline">${element.title}
              </li>`;
          counter++;
        }
      });
      if (counter >= 3) {
        eventsList.innerHTML = `${counter} events`;
        eventsList.setAttribute("class", "month-events-group hover-color");
        eventsList.setAttribute("id", `group-events-${midnightUnix}`);
      }
      if (withEvent) prevDay.appendChild(eventsList);

      prevDay.setAttribute("id", `${midnightUnix}`);
      prevDay.setAttribute("class", "extra-day");
      prevDay.addEventListener("click", function eventHandler(event) {
        // Removing event handler when it is used to avoid unwanted extra menus
        event.target.removeEventListener("click", eventHandler);
        if (event.target.className != "event-headline") {
          event.target.className === "month-events-group hover-color"
            ? displayGroupMenu(
                midnightUnix,
                storedPreviousDay.day,
                storedPreviousDay.month,
                storedPreviousDay.year
              )
            : displayMenu(
                event.target.id,
                numDay,
                prevMonth,
                prevYear,
                withEvent
              );
        }
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
    const monthDayNumber = document.createElement("div");
    monthDayNumber.setAttribute("class", "month-day-number");
    monthDayNumber.innerHTML = `${i}`;
    const eventsList = document.createElement("ul");
    eventsList.setAttribute("class", "events-headline-list");
    day.appendChild(monthDayNumber);
    // This ternary operator highlights the day chosen by user
    i === selectedDay
      ? day.setAttribute("class", "chosen-day")
      : day.setAttribute("class", "day");
    let counter = 0;
    EVENTS.forEach((element) => {
      if (
        storedCurrentDay.day === element.day &&
        storedCurrentDay.month === element.numMonth &&
        storedCurrentDay.year === element.year
      ) {
        withEvent = true;
        eventsList.innerHTML += `
          <li
          id="${element.unixID}"
          contentEditable="true" 
          onfocusout="editEvent(${element.unixID})"
          style="background-color: ${element.colorHex}" 
          class="event-headline">${element.title}
          </li>`;
        counter++;
      }
    });
    if (counter >= 3) {
      eventsList.innerHTML = `${counter} events`;
      eventsList.setAttribute("class", "month-events-group hover-color");
      eventsList.setAttribute("id", `group-events-${midnightUnix}`);
    }
    if (withEvent) day.appendChild(eventsList);
    day.setAttribute("id", `${midnightUnix}`);
    day.addEventListener("click", function eventHandler(event) {
      // Removing event handler when it is used to avoid unwanted extra menus
      event.target.removeEventListener("click", eventHandler);
      if (event.target.className != "event-headline") {
        event.target.className === "month-events-group hover-color"
          ? displayGroupMenu(
              midnightUnix,
              storedCurrentDay.day,
              selectedMonth + 1,
              selectedYear
            )
          : displayMenu(
              midnightUnix,
              numDay,
              selectedMonth + 1,
              selectedYear,
              withEvent
            );
      }
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
    const monthDayNumber = document.createElement("div");
    monthDayNumber.setAttribute("class", "extra-month-day-number");
    monthDayNumber.innerHTML = `${k}`;
    const eventsList = document.createElement("ul");
    eventsList.setAttribute("class", "events-headline-list");
    nextDay.appendChild(monthDayNumber);
    let counter = 0;
    EVENTS.forEach((element) => {
      if (
        storedNextDay.day === element.day &&
        storedNextDay.month === element.numMonth &&
        storedNextDay.year === element.year
      ) {
        withEvent = true;
        eventsList.innerHTML += `
              <li
              id="${element.unixID}"
              contentEditable="true" 
              onfocusout="editEvent(${element.unixID})"
              style="background-color: ${element.colorHex}" 
              class="event-headline">${element.title}
              </li>`;
        counter++;
      }
    });
    if (counter >= 3) {
      eventsList.innerHTML = `${counter} events`;
      eventsList.setAttribute("class", "month-events-group hover-color");
      eventsList.setAttribute("id", `group-events-${midnightUnix}`);
    }
    if (withEvent) nextDay.appendChild(eventsList);
    nextDay.setAttribute("class", "extra-day");

    // Day, month and year values calculated and stored in variables
    const day = Number(monthDayNumber.innerHTML);
    // Unique id generated based on DD-MM-YYYY format
    nextDay.setAttribute("id", `${midnightUnix}`);
    // Adding event listener to display options menu on click. Naming the function so it can be removed
    nextDay.addEventListener("click", function eventHandler(event) {
      // Removing event handler when it is used to avoid unwanted extra menus
      event.target.removeEventListener("click", eventHandler);
      if (event.target.className != "event-headline") {
        event.target.className === "month-events-group hover-color"
          ? displayGroupMenu(
              midnightUnix,
              storedNextDay.day,
              storedNextDay.month,
              storedNextDay.year
            )
          : displayMenu(event.target.id, day, nextMonth, nextYear, withEvent);
      }
    });
    table.appendChild(nextDay);
  }
};
