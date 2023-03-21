// Get elements from HTML
const clockElement = document.getElementById("clock")
const alarmHourElement = document.getElementById("alarm-hour")
const alarmMinuteElement = document.getElementById("alarm-minute")
const alarmSecondElement = document.getElementById("alarm-second")
const alarmPeriodElement = document.getElementById("alarm-period")
const setAlarm = document.getElementById("set-alarm")
const alarmList = document.getElementById("alarms-list")

// Update clock every second
setInterval(() => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const seconds = now.getSeconds().toString().padStart(2, "0")
    const period = now.getHours() < 12 ? "AM" : "PM"
    clockElement.textContent = `${hours}:${minutes}:${seconds} ${period}`;
}, 1000);

// Store alarms in an array
let alarms = [];

// Function to add alarm to alarms array and alarms list
const addAlarm = () => {
    // Get values from inputs
    const hour = parseInt(alarmHourElement.value)
    const minute = parseInt(alarmMinuteElement.value)
    const second = parseInt(alarmSecondElement.value)
    const period = alarmPeriodElement.value

    // Validate inputs
    if (isNaN(hour) || hour < 1 || hour > 12) {
        alert("Please enter a valid hour between 1 and 12.")
        return
    }
    if (isNaN(minute) || minute < 0 || minute > 59) {
        alert("Please enter a valid minute between 0 and 59.")
        return
    }
    if (isNaN(second) || second < 0 || second > 59) {
        alert("Please enter a valid second between 0 and 59.")
        return
    }

    // Create a new Date object for the alarm time
    const alarmTime = new Date();
    alarmTime.setHours(hour + (period === 'PM' && hour !== 12 ? 12 : 0))
    alarmTime.setMinutes(minute)
    alarmTime.setSeconds(second)

    // Add the alarm to the alarms array
    alarms.push(alarmTime)

    // Add the alarm to the alarms list
    const alarmIndex = alarms.length - 1;

    const alarmElement = document.createElement("li");
    alarmElement.classList.add('list-group-item')

    const deleteButton = document.createElement("button");
    deleteButton.classList.add('btn')
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        alarms.splice(alarmIndex, 1);
        alarmList.removeChild(alarmElement);
    });
    alarmElement.textContent = `${hour}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")} ${period}`;
    alarmElement.appendChild(deleteButton);
    alarmList.appendChild(alarmElement);
}


// Add click event listener to set alarm button
setAlarm.addEventListener("click", addAlarm);

// Check for alarm every second
setInterval(function() {
    const now = new Date();
    alarms.forEach(function(alarm, index) {
      if (now.getHours() === alarm.getHours() && now.getMinutes() === alarm.getMinutes() && now.getSeconds() === alarm.getSeconds()) {
        alert("Alarm!");
        alarms.splice(index, 1);
        alarmList.removeChild(alarmList.childNodes[index]);
      }
    });
  }, 1000);
