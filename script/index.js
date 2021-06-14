"use strict";
/*<--------global section-------->*/
var tDetails = [];

function getWeekDay(weekDayNum) {
  let weekDay;
  switch (weekDayNum) {
    case 0:
      weekDay = "Sunday";
      break;
    case 1:
      weekDay = "Monday";
      break;
    case 2:
      weekDay = "Tuesday";
      break;
    case 3:
      weekDay = "Wednesday";
      break;
    case 4:
      weekDay = "Thursday";
      break;
    case 5:
      weekDay = "Friday";
      break;
    case 6:
      weekDay = "Saturday";
      break;
    default:
      break;
  }
  return weekDay;
}

function getCurrMonth(currMonthNum) {
  let currMonth;
  switch (currMonthNum) {
    case 0:
      currMonth = "January";
      break;
    case 1:
      currMonth = "February";
      break;
    case 2:
      currMonth = "March";
      break;
    case 3:
      currMonth = "April";
      break;
    case 4:
      currMonth = "May";
      break;
    case 5:
      currMonth = "June";
      break;
    case 6:
      currMonth = "July";
      break;
    case 7:
      currMonth = "August";
      break;
    case 8:
      currMonth = "September";
      break;
    case 9:
      currMonth = "October";
      break;
    case 10:
      currMonth = "November";
      break;
    case 11:
      currMonth = "December";
      break;
    default:
      break;
  }
  return currMonth;
}

function getFormattedDate() {
  let dateObject = new Date();
  let weekDay = getWeekDay(dateObject.getDay());
  let currDate = dateObject.getDate();
  let currMonth = getCurrMonth(dateObject.getMonth());
  return [weekDay, currDate, currMonth];
}

/*<--------global section-------->*/

/*<---------header data handler----------->*/
const dateDisplayHandler = () => {
  let dateArray = getFormattedDate();
  let dateHolder = document.getElementById("dateSection");
  let monthHolder = document.getElementById("month");
  dateHolder.innerHTML = `${dateArray[0]}, <span id="date">${dateArray[1]}</span>`;
  monthHolder.innerHTML = `${dateArray[2]}`;
};

const getTaskCountHandler = () => {
  let taskCountHolder = document.getElementById("taskCount");
  taskCountHolder.innerHTML =
    tDetails.length === 0 ? "No Task" : `${tDetails.length} tasks are pending`;
};
/*<---------header data handler----------->*/

//will be called on DOM content load
const initHandler = () => {
  dateDisplayHandler();
  getTaskCountHandler();
  fetchTaskData();
};

/*<-----task display handler------->*/
function fetchTaskData() {
  let taskList = document.getElementById("pendingTaskList");
  if (tDetails.length) {
    tDetails.forEach((task, id) => {
      let taskLi = document.createElement("li");
      let leftDiv = document.createElement("div");
      leftDiv.setAttribute("class", "leftSection");
      let checkInput = document.createElement("input");
      checkInput.setAttribute("type", "checkbox");
      checkInput.setAttribute("class", "selectTask");
      let taskDescSpan = document.createElement("span");
      taskDescSpan.setAttribute("class", "taskDescription");
      taskDescSpan.innerHTML = task["desc"]; //add the task description

      leftDiv.appendChild(checkInput);
      leftDiv.appendChild(taskDescSpan);
      let timeSpan = document.createElement("span");
      timeSpan.setAttribute("class", "taskTime");
      let deleteImage = document.createElement("img");
      deleteImage.setAttribute("src", "image/delete.svg");
      deleteImage.setAttribute("class", "deleteTask");
      deleteImage.setAttribute("id", id);
      deleteImage.setAttribute("alt", "delte this task");
      taskLi.appendChild(leftDiv);
      taskLi.appendChild(timeSpan);
      taskLi.appendChild(deleteImage);
      taskList.prepend(taskLi);
    });
  } else {
    let noTaskNode = document.createElement("h3");
    noTaskNode.innerHTML = "NO Task 🎉";
    taskList.appendChild(noTaskNode);
  }
}
/*<-----task display handler------->*/
document.addEventListener("DOMContentLoaded", initHandler);
