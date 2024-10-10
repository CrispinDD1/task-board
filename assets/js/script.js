// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  localStorage.setItem("nextId", nextId + 1);
  // Increment nextId and return its value
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  return `<div class = "task-card" id = "task-${task.id}" draggable = "true">
  <h3>${task.title}</h3>
  <p>${task.description}</p>
  <p>Due Date: ${task.dueDate}</p>
  <button class = "delete-task">Delete</button>
  </div>`;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const taskCont = $("#task-list");
  taskCont.empty();
  taskList.forEach (task => {
    taskCont.append(createTaskCard(task));
  });
  makeTasksDraggable();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const title = $("#task-title").val();
  const description = $("#task-description").val();
  const dueDate = $("#task-due-date").val();

  const newTask = {
    id: generateTaskId(),
    title: title,
    description: description,
    dueDate: dueDate
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  if(event.target.classList.contains("delete-task")) {
    const taskId = $(event.target).closest(".task-card").attr("id").replace("task-", "");

    taskList = taskList.filter(task => task.id != taskId);

    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
  }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});



const addRecommendationBtn = document.getElementById('add-recommendation-btn');
const recommendationModal = document.getElementById('recommendation-modal');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const backBtn = document.getElementById('back-btn');
const closeModalBtn = document.querySelector('.modal-close');

// Open the modal
addRecommendationBtn.addEventListener('click', function() {
    recommendationModal.classList.add('is-active');
});

// Close the modal when clicking the "Cancel" button or modal background
cancelModalBtn.addEventListener('click', function() {
    recommendationModal.classList.remove('is-active');
});

closeModalBtn.addEventListener('click', function() {
    recommendationModal.classList.remove('is-active');
});

// "Back" button event to return to the index.html page
backBtn.addEventListener('click', function() {
    window.location.href = 'index.html';  // Redirect to the index.html page
});

// Submit recommendation form
document.getElementById('recommendation-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect user input
    const placeName = document.getElementById('place-name').value;
    const placeAddress = document.getElementById('place-address').value;
    const placeCity = document.getElementById('place-city').value;
    const placeZip = document.getElementById('place-zip').value;

    // You can save the data in local storage or process it here
    const recommendationData = {
        name: placeName,
        address: placeAddress,
        city: placeCity,
        zip: placeZip
    };

    console.log('Recommendation Submitted:', recommendationData);

    // Close modal after submission
    recommendationModal.classList.remove('is-active');
});
