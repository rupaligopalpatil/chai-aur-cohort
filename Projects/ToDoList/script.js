const InputText = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const listTask = document.getElementById('taskList');
const totalTask = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');


function updateTaskCounts() {
    const totalTasksNumber = document.querySelectorAll(".task-item").length;
    const completedTaskNumber = document.querySelectorAll(".task-item input:checked").length;
    totalTask.textContent = totalTasksNumber;
    completedTasks.textContent = completedTaskNumber;
}


addTaskBtn.addEventListener('click', function(){
    const taskText = InputText.value.trim();
    if(taskText === ""){
        return
    }

    const listItem = document.createElement("li");
    listItem.classList.add("task-item");

    listItem.innerHTML = 
            `<div>
            <input type="checkbox">
            <span>${taskText}</span>
            </div>
            <button class="delete-btn">Delete</button>`;

    listTask.appendChild(listItem);
    InputText.value = "";

    updateTaskCounts();

    listItem.querySelector("input").addEventListener("change", updateTaskCounts);
    listItem.querySelector(".delete-btn").addEventListener("click", function () {
        listItem.remove();
        updateTaskCounts();
    });

})
