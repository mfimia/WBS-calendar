// Function to edit events. It takes in an ID finds, the item in the EVENTS array and changes its value
const editEvent = (id) => {
    EVENTS.forEach((item) => {
      if (item.unixID === id) {
        item.title = document.getElementById(id).innerHTML;
        if (!item.title) {
          EVENTS.pop(item);
        }
      }
    });
    localStorage.setItem(`month-events`, JSON.stringify(EVENTS));
    getValues(new Date(STORED_DATE.year, STORED_DATE.month, STORED_DATE.day));
  };
  
  const editGroupedEvent = (id) => {
    EVENTS.forEach((item) => {
      if (item.unixID === id) {
        item.title = document.querySelector(`#grouped-event-${id} h3`).innerHTML;
        if (!item.title) {
          EVENTS.pop(item);
        }
      }
    });
    localStorage.setItem(`month-events`, JSON.stringify(EVENTS));
  };
  
  const removeMonthEvent = (dayID, id, day, month, year, dayEvents) => {
    EVENTS.forEach((item) => {
      if (item.unixID === id) {
        const itemIndex = EVENTS.indexOf(item);
        EVENTS.splice(itemIndex, 1);
        localStorage.setItem(`month-events`, JSON.stringify(EVENTS));
      }
    });
    document.getElementById("add-events-menu").remove();
    getValues(new Date(STORED_DATE.year, STORED_DATE.month, STORED_DATE.day));
    displayMenu(dayID, day, month, year, dayEvents);
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
    const randomSeconds = Math.floor(Math.random() * 61);
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
        startTimeNum.minutes,
        randomSeconds
      ).getTime(),
    };
    // When the object is created we push it to our EVENTS array and save it in localStorage
    EVENTS.push(monthEvent);
    localStorage.setItem(`month-events`, JSON.stringify(EVENTS));
  };