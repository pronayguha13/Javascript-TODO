"use strict";
var tdeatils = new Array();

var showTaskList = document.getElementById("taskDetails");

//method to get date
let dateNow = document.getElementById("inputDate");
dateNow.addEventListener("change", () => console.log(typeof dateNow.value));

//add task
//var actionResponse = document.getElementsByClassName("btn Create createTask[0]").addEventListener("click",addTask);
var actionResponse = document
    .getElementById("addBtn")
    .addEventListener("click", addTaskPermission),
  list = document.getElementById("taskTable"),
  enterButtonHandler = document
    .getElementById("taskDetails")
    .addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        //checks whether the pressed key is "Enter"
        addTaskPermission();
      }
    });

function addTaskPermission() {
  var taskConfirmResponse = confirm("Do you want to add this task?");
  if (taskConfirmResponse) {
    addTask();
  }
}

function addTask() {
  var taskStatement = document.getElementById("taskDetails").value;
  console.log(taskStatement);
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var createdAt = h + ":" + m + ":" + s;
  console.log(createdAt);
  var isCompleted = false;
  //buttons
  var checkbox = document.createElement("input");
  var btnEdit = document.createElement("button");
  var btnDelete = document.createElement("button");

  checkbox.type = "checkbox"; // make the element a checkbox
  checkbox.class = "slct";
  checkbox.addEventListener("click", clickCheckBox);
  btnEdit.innerHTML = "Edit";
  btnEdit.id = "edit";
  btnDelete.innerHTML = "Delete";
  btnDelete.id = "delete";
  btnDelete.addEventListener("click", deleteTask);

  var taskData = new Array(
    checkbox,
    taskStatement,
    createdAt,
    isCompleted,
    btnEdit,
    btnDelete
  ); //creating the array taskData and populating it
  tdeatils.unshift(taskData);
  // console.log(tdeatils);
  var tableId = document.getElementById("taskTable"); //get the ul
  //console.log(tableId);
  var newLiElement = document.createElement("li"); //create a new li element
  newLiElement.className = "activeTask";
  //console.log(newLiElement);
  for (var i = 0; i < tdeatils[0].length; i++) {
    if (i == 2 || i == 3) {
      continue;
    } else if (i == 1) {
      var textField = document.createTextNode(tdeatils[0][1]);
      newLiElement.appendChild(textField);
      //console.log(textField.nodeValue);
    } else {
      var elem = tdeatils[0][i];
      newLiElement.append(elem);
    }
  }
  //console.log(checkboxToAppend);
  tableId.prepend(newLiElement);
}

function clickCheckBox() {
  var elementToBeDeleted = this.parentNode;
  console.log(elementToBeDeleted);
  elementToBeDeleted.style.textDecoration = "line-through";
  this.parentNode.childNodes[2].remove();
  moveCompletedTask(
    this.parentNode.childNodes[1],
    this.parentNode.childNodes[0],
    this.parentNode.childNodes[2]
  );
  elementToBeDeleted.remove();
}

function moveCompletedTask(elementToBeDeleted, checkBox, dltButton) {
  var completeTaskList = document.getElementById("completeTaskHolder");
  var newCompleteTaskElement = document.createElement("li");
  newCompleteTaskElement.id = "isCompleted";
  //newCompleteTaskElement.appendChild(checkBox);
  newCompleteTaskElement.appendChild(elementToBeDeleted);
  newCompleteTaskElement.append(dltButton);
  completeTaskList.prepend(newCompleteTaskElement);
  completeTaskList.childNodes[0].style.textDecoration = "none";
}

//function of delete button
var deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", function () {
  var activeTaskList = document.getElementById("taskTable");
  if (activeTaskList.childNodes.length > 1) {
    deleteAllActiveTask();
  } else {
    alert("Add some task first");
  }
});

function deleteTask(e) {
  e.target.parentNode.remove();
}

function deleteAllActiveTask() {
  var e = document.getElementById("taskTable");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
}
