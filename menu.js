// Menu takes all info about the day and displays an box in the location where event took place
const displayMenu = (id, day, month, year, dayEvents, backside = false) => {
  if (!id) return;
  console.log("trying to display the menu");
  let eventCounter = 0;
  let menu =
    document.getElementById(`add-events-menu`) || document.createElement("div");
  menu.setAttribute("class", "displayed-menu");
  menu.setAttribute("id", `add-events-menu`);
  if (menu && !backside) {
    let addButton = document.createElement("button");
    addButton.setAttribute("id", "add-event");
    addButton.innerHTML = "Add event";
    addButton.addEventListener("click", () => {
      menu.remove();
      displayMenu(id, day, month, year, dayEvents, true);
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
          eventCounter++;
          eventsSection.innerHTML += `
              <div
              class="month-event"
              id="month-event-${eventCounter}"
              Event: ${element.title}<br>
              Event: ${element.title}<br>
              Start: ${element.startTime}<br>
              End: ${element.endTime}<br>
              Duration: ${element.durationMinutes} minutes<br>
              <button
              class="month-remove-button"
              id="month-remove-button-${eventCounter}"
              onclick="removeMonthEvent(${id}, ${element.unixID}, ${element.day}, ${element.numMonth}, ${element.year}, ${dayEvents})">
              Remove event
              </button>
              `;
        }
      });
      menu.appendChild(eventsSection);
    }
  } else if (menu && backside) {
    let backButton = document.createElement("button");
    backButton.setAttribute("id", "back-button");
    backButton.innerHTML = "Back";

    backButton.addEventListener("click", (e) => {
      menu.remove();
      displayMenu(id, day, month, year, dayEvents);
    });
    menu.innerHTML = "";
    menu.appendChild(backButton);
    const eventForm = generateForm(day, month, year);
    menu.appendChild(eventForm);
  }

  if (document.getElementById(`${id}`)) {
    document.getElementById(`${id}`).appendChild(menu);
  }
  // Ternary operator to check which side of the menu is being displayed
  let form = backside
    ? document.getElementById(`form-month-day}-${month}-${year}`)
    : menu;
  // Adding event listener to close menu when clicking outside of it
  // This toggler checks if the event already exists, in which case it doesn't create a new one
  if (!TOGGLERS.click) {
    document.addEventListener("mousedown", function exitMenu(e) {
      // Storing events to loop over them eventually and check if they are click targeted
      events = document.querySelectorAll(".month-event");
      // Conditions below include all elements that won't trigger menu closing
      if (
        e.target != menu &&
        !menu.contains(e.target) &&
        !form.contains(e.target) &&
        e.target != form &&
        e.target !=
          document.getElementById(`input-month-${day}-${month}-${year}`) &&
        e.target !=
          document.getElementById(
            `submit-event-month-${day}-${month}-${year}`
          ) &&
        e.target !=
          document.getElementById(`start-time-month-${day}-${month}-${year}`) &&
        e.target !=
          document.getElementById(`end-time-month-${day}-${month}-${year}`) &&
        e.target !=
          document.getElementById(`form-month-${day}-${month}-${year}`) &&
        e.target !=
          document.getElementById(`color-month-${day}-${month}-${year}`) &&
        e.target !=
          document.getElementById(`month-event-${day}-${month}-${year}`) &&
        e.target != document.querySelector(".month-remove-button") &&
        e.target != document.querySelector(".month-event") &&
        e.target != document.querySelector("#back-button") &&
        e.target != document.querySelector(".displayed-menu") &&
        e.target != document.querySelector("#add-event")
      ) {
        // If there are day events, we check them all before decidding if the click was outside or inside
        if (dayEvents) {
          let clickedOutside = [];
          for (i = 1; i <= eventCounter; i++) {
            if (
              e.target != document.getElementById(`month-event-${i}`) &&
              e.target != document.getElementById(`month-remove-button-${i}`)
            ) {
              // If click didn't happen in this foor loop iteration location, we push true
              clickedOutside.push(true);
            } else {
              // Otherwise, pushing false
              clickedOutside.push(false);
            }
            // This variable checks if the click happened outside of all iterations
            let checker = clickedOutside.every((item) => item === true);
            // If all clicks happened outside, and all iterations are run, then we run the logic
            if (checker && clickedOutside.length === eventCounter) {
              e.stopPropagation();
              menu.remove();
              getValues(
                new Date(STORED_DATE.year, STORED_DATE.month, STORED_DATE.day)
              );
              document.removeEventListener("mousedown", exitMenu);
              TOGGLERS.click = false;
            }
          }
        } else {
          e.stopPropagation();
          menu.remove();
          getValues(
            new Date(STORED_DATE.year, STORED_DATE.month, STORED_DATE.day)
          );
          document.removeEventListener("mousedown", exitMenu);
          TOGGLERS.click = false;
        }
        // When event handler is triggered, it removes menu, displays new calendar and removes itself
      }
      document.removeEventListener("mousedown", exitMenu);
      TOGGLERS.click = false;
    });
    TOGGLERS.click = true;
  }
};
