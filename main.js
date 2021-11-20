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

// Helper function that lets us exit menu by using a callback function
const exitCallback = (id) => {
  if (id) {
    document.getElementById(id).remove();
  }
  getValues(new Date(STORED_DATE.year, STORED_DATE.month, STORED_DATE.day));
};

// Helper function that lets us submit date input on change
const triggerDate = () => {
  if (document.getElementById("selectedDate").value) {
    STORED_DATE = new dateValues(
      new Date(document.getElementById("selectedDate").value)
    );
    getValues(new Date(document.getElementById("selectedDate").value));
  }
};

// If no input is given by user, we display the current date
getValues(INPUT_DATE);
