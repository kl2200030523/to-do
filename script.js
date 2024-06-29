document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const highPriorityList = document.getElementById('highPriorityList');
    const mediumPriorityList = document.getElementById('mediumPriorityList');
    const lowPriorityList = document.getElementById('lowPriorityList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskPriority = priorityInput.value;
        const taskDueDate = dueDateInput.value;

        if (taskText && taskPriority && taskDueDate) {
            const task = {
                text: taskText,
                priority: taskPriority,
                dueDate: taskDueDate,
                completed: false
            };
            tasks.push(task);
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
            priorityInput.value = 'low';
            dueDateInput.value = '';
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text} (${task.dueDate})</span>
            <button>Delete</button>
        `;
        li.classList.add(`priority-${task.priority}`);
        if (task.completed) {
            li.classList.add('completed');
        }

        if (task.priority === 'high') {
            highPriorityList.appendChild(li);
        } else if (task.priority === 'medium') {
            mediumPriorityList.appendChild(li);
        } else {
            lowPriorityList.appendChild(li);
        }

        li.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
            task.completed = e.target.checked;
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('button').addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            li.remove();
            saveTasks();
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
