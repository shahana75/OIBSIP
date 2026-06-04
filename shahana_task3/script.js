// Grab the elements from the DOM using your specific IDs
const taskInput = document.querySelector('input[placeholder="Enter task - discription"]');
const addButton = document.querySelector('button'); // Targets your [Add] button
const incompleteList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completedTasks');

// Function to create and manage a new task item
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Prevent adding empty tasks
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // 1. Create the main list item wrapper
    const li = document.createElement('li');
    li.className = 'task-item';

    // 2. Create the Checkbox (Tick box)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    
    // Event listener: Moves task between containers when ticked/unticked
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            completedList.appendChild(li); // Moves to <ul id="completedTasks">
            li.classList.add('completed');
        } else {
            incompleteList.appendChild(li); // Moves back to <ul id="incompleteTasks">
            li.classList.remove('completed');
        }
    });

    // 3. Create a span element to hold the task description text
    const textSpan = document.createElement('span');
    textSpan.innerText = taskText;
    textSpan.className = 'task-text';

    // 4. Create the Delete Button (Dustbin icon)
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️'; // Clean trash bin emoji
    deleteBtn.className = 'delete-btn';
    
    // Event listener: Permanently deletes the task when clicked
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    // 5. Assemble all components inside the <li> item
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    // 6. Push the new item into the incomplete list and clear the input field
    incompleteList.appendChild(li);
    taskInput.value = "";
}

// Attach the function to your [Add] button click event
addButton.addEventListener('click', addTask);

// Optional: Allow pressing "Enter" key inside input box to add task
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});