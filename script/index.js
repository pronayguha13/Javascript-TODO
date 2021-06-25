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
const formatDate = (inputDate) => {
  const dates = inputDate.split("-");
  dates.reverse();
  let formattedDate = dates.join("-");
  return formattedDate;
};

const formatTime = (inputTime) => {
  let times = inputTime.split(":");
  let hour = parseInt(times[0]);
  if (hour >= 12) {
    hour -= 12;
    return `${hour}:${times[1]} PM`;
  } else {
    return `${hour}:${times[1]} AM`;
  }
  return times.join(":");
};

function getFormattedDate() {
  let dateObject = new Date();
  let weekDay = getWeekDay(dateObject.getDay());
  let currDate = dateObject.getDate();
  let currMonth = getCurrMonth(dateObject.getMonth());
  return [weekDay, currDate, currMonth];
}

function openInputModalHandler() {
  let inputModal = document.getElementById("taskInputContainer");
  inputModal.setAttribute("class", "show");
  let container = document.getElementById("container");
  container.style.opacity = "0.3";
}

function closeInputModalHandler() {
  let inputModal = document.getElementById("taskInputContainer");
  inputModal.setAttribute("class", "hide");
  let container = document.getElementById("container");
  container.style.opacity = "1";
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
  let activeTask = 0;
  tDetails.forEach((task) => {
    if (!task.isCompleted) {
      activeTask += 1;
    }
  });
  taskCountHolder.innerHTML =
    activeTask === 0
      ? "No Pending Task"
      : `${tDetails.length} tasks are pending`;
};
/*<---------header data handler----------->*/

/*<---global controller-----> */
function globalControlHandler() {
  let selectAllBtn = document.getElementById("selectAll");
  let deleteAllBtn = document.getElementById("deleteAll");
  if (!tDetails.length) {
    selectAllBtn.disabled = true;
    deleteAllBtn.disabled = true;
    selectAllBtn.style["cursor"] = "not-allowed";
    deleteAllBtn.style["cursor"] = "not-allowed";
  } else {
    selectAllBtn.disabled = false;
    deleteAllBtn.disabled = false;
    selectAllBtn.style["cursor"] = "pointer";
    deleteAllBtn.style["cursor"] = "pointer";
  }
}
function completeAllTaskHandler(e) {
  let taskLis = document.getElementById("pendingTaskList").childNodes;
  Object.values(taskLis).forEach((taskLi) => {
    if (!taskLi.firstChild.childNodes[0].checked) {
      taskLi.firstChild.childNodes[0].checked = true;
      taskLi.firstChild.childNodes[1].classList.add("completedTask");
    }
  });
  getTaskCountHandler();
}

function deleteAllTaskHandler() {
  let shouldDelete = confirm("Do you want to delete all the tasks?");
  if (shouldDelete) {
    let taskLis = document.getElementById("pendingTaskList");
    while (taskLis.hasChildNodes()) {
      taskLis.removeChild(taskLis.firstChild);
    }
    //set task array length =0
    tDetails.length = 0;
    fetchTaskData();
  }
}

let selectAllBtn = document.getElementById("selectAll");
selectAllBtn.addEventListener("click", completeAllTaskHandler);
let deleteAllBtn = document.getElementById("deleteAll");
deleteAllBtn.addEventListener("click", deleteAllTaskHandler);
/*<---global controller-----> */

//will be called on DOM content load
const initHandler = () => {
  dateDisplayHandler();
  getTaskCountHandler();
  fetchTaskData();
  globalControlHandler();
};

/*<-----task display handler------->*/
function fetchTaskData() {
  let taskList = document.getElementById("pendingTaskList");
  if (tDetails.length) {
    if (tDetails.length === 1) taskList.removeChild(taskList.firstChild);
    let id = tDetails.length - 1;
    let task = tDetails[0];
    let taskLi = document.createElement("li");
    let leftDiv = document.createElement("div");
    leftDiv.setAttribute("class", "leftSection");
    let checkInput = document.createElement("input");
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("class", "selectTask");
    checkInput.setAttribute("id", id);
    checkInput.addEventListener("click", completeTaskHandler);
    let taskDescSpan = document.createElement("span");
    taskDescSpan.setAttribute("class", "taskDescription");
    taskDescSpan.innerHTML = task["desc"]; //add the task description
    leftDiv.appendChild(checkInput);
    leftDiv.appendChild(taskDescSpan);
    let timeSpan = document.createElement("span");
    timeSpan.setAttribute("class", "taskTime");
    timeSpan.innerHTML = task["time"] + "\t" + task["date"];
    let deleteImage = document.createElement("img");
    deleteImage.setAttribute("src", "image/delete.svg");
    deleteImage.setAttribute("class", "deleteTask");
    deleteImage.setAttribute("id", id);
    deleteImage.setAttribute("alt", "delete this task");
    deleteImage.addEventListener("click", deleteTaskHandler);
    taskLi.appendChild(leftDiv);
    taskLi.appendChild(timeSpan);
    taskLi.appendChild(deleteImage);
    taskList.prepend(taskLi);
  } else {
    let noTaskNode = document.createElement("div");
    noTaskNode.setAttribute("id", "noTask");
    let noTaskP = document.createElement("p");
    noTaskP.setAttribute("id", "noTaskP");
    let addTaskBanner = document.createElement("h4");
    addTaskBanner.setAttribute("id", "addTaskBanner");
    addTaskBanner.innerHTML = "click + button to add task";
    noTaskNode.appendChild(noTaskP);
    noTaskNode.appendChild(addTaskBanner);
    noTaskP.innerHTML = "No Task 🎉";
    taskList.appendChild(noTaskNode);
  }
  getTaskCountHandler();
}
/*<-----task display handler------->*/
document.addEventListener("DOMContentLoaded", initHandler);

/*<---- task input modal display handler ---->*/
let openModalBtn = document.getElementById("openModalBtn");
openModalBtn.addEventListener("click", openInputModalHandler);
let closeModalBtn = document.getElementById("closeModal");
closeModalBtn.addEventListener("click", closeInputModalHandler);

/*<---task input handler----->*/
function clearInputHandler(taskDesc, dateInput, timeInput) {
  taskDesc.value = "";
  dateInput.value = "";
  timeInput.value = "";
}

let taskDescInput = document.getElementById("taskInput");

taskDescInput.addEventListener("keydown", taskDescInputHandler);
function taskDescInputHandler(e) {
  let { keyCode } = e;
  if (keyCode === 13) {
    createTaskHandler(e);
  }
}

function createTaskHandler(e) {
  let taskDescInput = document.getElementById("taskInput");
  let finishDate = document.getElementById("finishDate");
  let finishTime = document.getElementById("finishTime");
  let taskDesc = taskDescInput.value.trim();
  if (taskDesc === "") {
    alert("Please add task description");
    taskDescInput.focus();
  }
  let taskDate = formatDate(finishDate.value);
  let taskTime =
    finishTime.value === "" ? finishTime.value : formatTime(finishTime.value);

  let dateObj = getFormattedDate();
  let newTask = {
    desc: taskDesc,
    date:
      taskDate === "" || taskDate < new Date().getUTCDate()
        ? `${dateObj[1]}-${dateObj[2]}-${new Date().getFullYear()}`
        : taskDate,
    time: taskTime,
    isCompleted: false,
  };
  tDetails.unshift(newTask);
  clearInputHandler(taskDescInput, finishDate, finishTime);
  fetchTaskData();
  globalControlHandler();
  closeInputModalHandler();
}

let createTaskBtn = document.getElementById("createTaskBtn");
createTaskBtn.addEventListener("click", createTaskHandler);

/*<------task delete handler------->*/
function deleteTaskHandler(e) {
  let { id } = e.target;
  id = parseInt(id) + 1;
  let delIndex = tDetails.length - id;

  tDetails = tDetails.filter((elem, id) => id !== delIndex);
  let taskList = document.getElementById("pendingTaskList");
  taskList.removeChild(taskList.childNodes[delIndex]);
  fetchTaskData();
  globalControlHandler();
}

/*<-----task complete handler ------->*/
function completeTaskHandler(e) {
  let checkbox = e.target;
  let { id } = e.target;
  id = parseInt(id) + 1;
  let taskId = tDetails.length - id;
  let task = tDetails[taskId];
  let { isCompleted } = task;
  task.isCompleted = !isCompleted;
  !isCompleted
    ? checkbox.nextSibling.classList.add("completedTask")
    : checkbox.nextSibling.classList.remove("completedTask");
  getTaskCountHandler();
}
