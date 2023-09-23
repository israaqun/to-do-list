document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    const listunav = document.getElementById("listunav");
    const existingTasks = new Set();

    if (isLocalStorageAvailable()) {
        taskList.style.display = "block";
        listunav.style.display = "none";

        loadTasksFromLocalStorage();
        updateDeleteAllButtonVisibility();
    } else {
   
        taskList.style.display = "none";
        listunav.style.display = "block";
    }

    function isTaskUnique(taskText) {
        return !existingTasks.has(taskText);
    }

    function isTaskUpdatedTextUnique(taskText, updatedText) {
   
        if (taskText === updatedText) {
            return true; 
        }
        return !existingTasks.has(updatedText);
    }

  
    function updateDeleteAllButtonVisibility() {
        const deleteAllButton = document.getElementById("deleteAllButton");

        if (taskList.children.length > 0) {
            deleteAllButton.style.display = "block"; 
        } else {
            deleteAllButton.style.display = "none"; 
        }
    }

   
    updateDeleteAllButtonVisibility();

    function loadTasksFromLocalStorage() {
        const savedTasks = localStorage.getItem("taskList");

        if (savedTasks) {
         
            taskList.innerHTML = savedTasks;
       
            taskList.querySelectorAll(".task-text").forEach(function (taskTextElement) {
                existingTasks.add(taskTextElement.textContent);
            });
        }
    }

    function saveTaskListToLocalStorage() {
        const tasks = taskList.innerHTML;
        localStorage.setItem("taskList", tasks);
    }

    function isLocalStorageAvailable() {
        try {
            localStorage.setItem("test", "test");
            localStorage.removeItem("test");
            return true;
        } catch (e) {
            return false;
        }
    }

    function createTask() {
        const taskInput = document.getElementById("taskInput");
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        function slugify(text) {
            return text
                .toLowerCase()
                .replace(/ /g, "-") 
                .replace(/[^a-zA-Z0-9-]/g, ""); 
        }
        const slug = slugify(taskText);
        console.log("Task Slug:", slug);

        if (!isTaskUnique(taskText)) {
            alert("Task already exists. Please enter a different task.");
            return;
        }

        const listItem = document.createElement("li");
        listItem.classList.add("task-item");

        const taskTextElement = document.createElement("span");
        taskTextElement.classList.add("task-text");
        taskTextElement.textContent = taskText;

        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        const updateButton = document.createElement("button");
        updateButton.classList.add("update-button");
        updateButton.textContent = "Update";

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            listItem.remove();
            existingTasks.delete(taskText);
            saveTaskListToLocalStorage();
            updateDeleteAllButtonVisibility();
        });

        taskActions.appendChild(updateButton);
        taskActions.appendChild(deleteButton);

        listItem.appendChild(taskTextElement);
        listItem.appendChild(taskActions);

        taskList.appendChild(listItem);

        taskInput.value = "";
        existingTasks.add(taskText); 
        saveTaskListToLocalStorage();
        updateDeleteAllButtonVisibility();
    }

    taskList.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("delete-button")) {
            const listItem = target.closest(".task-item");
            const taskTextElement = listItem.querySelector(".task-text");

            if (taskTextElement) {
                const taskText = taskTextElement.textContent;
                listItem.remove();
                existingTasks.delete(taskText);
                updateDeleteAllButtonVisibility();
                saveTaskListToLocalStorage();
            }
        } else if (target.classList.contains("update-button")) {
            const listItem = target.closest(".task-item");
            const taskTextElement = listItem.querySelector(".task-text");

            if (taskTextElement) {
                const currentTaskText = taskTextElement.textContent;
                const taskInput = document.createElement("input");
                taskInput.classList.add("edit-input");
                taskInput.value = currentTaskText;

                const saveButton = document.createElement("button");
                saveButton.classList.add("save-button");
                saveButton.textContent = "Save";

                saveButton.addEventListener("click", function () {
                    const editedTaskText = taskInput.value;
                    if (!isTaskUpdatedTextUnique(currentTaskText, editedTaskText)) {
                        alert("Task already exists. Please enter a different task.");
                        return;
                    }
                    taskTextElement.textContent = editedTaskText;

                    const updateButton = document.createElement("button");
                    updateButton.classList.add("update-button");
                    updateButton.textContent = "Update";

                    listItem.querySelector(".task-actions").appendChild(updateButton);

                    listItem.removeChild(taskInput);
                    listItem.removeChild(saveButton);

                    saveTaskListToLocalStorage();
                    updateDeleteAllButtonVisibility();
                });

                listItem.querySelector(".task-actions").removeChild(target);

                listItem.appendChild(taskInput);
                listItem.appendChild(saveButton);

                taskInput.focus();
            }
        }
    });

    function deleteAllTasks() {
        taskList.innerHTML = ""; 
        existingTasks.clear(); 
        saveTaskListToLocalStorage(); 
        updateDeleteAllButtonVisibility();
    }
    

    const createButton = document.querySelector(".task-button");
    createButton.addEventListener("click", createTask);
});
function deleteAllTasks() {

    taskList.innerHTML = ""; 
    existingTasks.clear(); 
    saveTaskListToLocalStorage(); 
    updateDeleteAllButtonVisibility();
}