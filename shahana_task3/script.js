const taskInput = document.querySelector('input[placeholder="Enter task - discription"]');
const addButton = document.querySelector('button'); 
const incompleteList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completedTasks');

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    li.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            completedList.appendChild(li); 
            li.classList.add('completed');
        } else {
            incompleteList.appendChild(li); 
            li.classList.remove('completed');
        }
    });

    const textSpan = document.createElement('span');
    textSpan.innerText = taskText;
    textSpan.className = 'task-text';

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️'; 
    deleteBtn.className = 'delete-btn';
    
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    incompleteList.appendChild(li);
    taskInput.value = "";
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
