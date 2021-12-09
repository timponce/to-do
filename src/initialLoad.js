const { format, parseISO, isToday, isThisWeek } = require('date-fns');

const content = document.getElementById('content');

let tasks = [{title: 'Hover over the \'Check\' icon next to ToDo', notes: '', date: '', priority: 'Low', status: 'incomplete', taskKey: '1'} , {title: 'Click the icon to collapse the sidebar!', notes: '', date: '', priority: 'Low', status: 'incomplete', taskKey: '2'}];
let completedTasks = [];
let todaysTasks = [];
let thisWeeksTasks = [];
let usedKeys = [];

let data = {tasks, completedTasks, usedKeys};

function updateLocalStorage() {
    localStorage.setItem('data', JSON.stringify(data));
    getLocalStorage();
};

export function getLocalStorage() {
    if (localStorage.getItem('data')) {
        let unstringifiedData = localStorage.getItem('data');
        data = JSON.parse(unstringifiedData)
        return data;
    };
};

export function loadHeader() {

    const header = document.createElement('header');
    content.appendChild(header);

    const headerLeft = document.createElement('div');
    headerLeft.id = 'header-left';
    header.appendChild(headerLeft);

    const headerRight = document.createElement('div');
    headerRight.id = 'header-right';
    header.appendChild(headerRight);

    const titleIconFrame = document.createElement('div');
    titleIconFrame.id = 'title-icon-frame';
    headerLeft.appendChild(titleIconFrame)

    const titleIcon = document.createElement('div');
    titleIcon.id = 'title-icon';
    titleIconFrame.appendChild(titleIcon);

    const titleIconLine1 = document.createElement('i');
    titleIconLine1.id = 'title-icon-line-1';
    titleIcon.appendChild(titleIconLine1);

    const titleIconLine2 = document.createElement('i');
    titleIconLine2.id = 'title-icon-line-2';
    titleIcon.appendChild(titleIconLine2);

    const titleIconLine3 = document.createElement('i');
    titleIconLine3.id = 'title-icon-line-3';
    titleIconLine3.classList.add('hidden');
    titleIcon.appendChild(titleIconLine3);

    const title = document.createElement('div');
    title.id = 'title';
    title.innerText = 'ToDo';
    headerLeft.appendChild(title);

    const addTaskBtn = document.createElement('button');
    addTaskBtn.id = 'add-task-btn';
    headerRight.appendChild(addTaskBtn);

    const addTaskIcon = document.createElement('i');
    addTaskIcon.classList.add('fas');
    addTaskIcon.classList.add('fa-plus-square');
    addTaskBtn.appendChild(addTaskIcon);

    addTaskBtn.addEventListener('click', e => {
        showTaskModal(e);
        addTask();
    });
};

export function loadSidebar() {

    const sidebar = document.createElement('ul');
    sidebar.id = 'sidebar';

    const sidebarArray = [
        ['Inbox', 'inbox'],
        ['Today', 'today'],
        ['This Week', 'this-week'],
        ['Calendar', 'calendar'],
        ['Projects', 'projects'],
        ['Archive', 'archive']
    ]

    for (let i = 0; i < sidebarArray.length; i++) {
        let newElement = document.createElement('li');
        newElement.classList.add('sidebar-element');
        newElement.id = sidebarArray[i][1];
        newElement.innerText = sidebarArray[i][0];
        sidebar.appendChild(newElement);
        i === 0 ? newElement.classList.add('sidebar-selected') : '';
    };

    content.appendChild(sidebar);
};

export function loadFooter() {

    const footer = document.createElement('footer');
    
    const footerContent = document.createElement('a');
    footerContent.id = 'footer-content';
    footerContent.href = 'https://github.com/timponce';
    footer.appendChild(footerContent);

    const footerText = document.createElement('span');
    footerText.id = 'footer-text';
    footerText.innerText = 'By Tim Ponce';
    footerContent.appendChild(footerText);

    const footerIcon = document.createElement('i');
    footerIcon.id = 'footer-icon';
    footerIcon.classList.add('fa');
    footerIcon.classList.add('fa-github');
    footerContent.appendChild(footerIcon);

    content.appendChild(footer);
};

export function loadMain() {
    const main = document.createElement('div');
    main.id = 'main';
    content.insertBefore(main, document.querySelector('footer'));
    loadInbox(data.tasks);
};

export function headerController() {
    const titleIconFrame = document.querySelector('#title-icon-frame');
    const line1 = document.querySelector('#title-icon-line-1');
    const line2 = document.querySelector('#title-icon-line-2');
    const line3 = document.querySelector('#title-icon-line-3');
    titleIconFrame.addEventListener('mouseenter', e => {
            line1.classList.add('end');
            line2.classList.add('end');
            line3.classList.remove('hidden');
    });
    titleIconFrame.addEventListener('mouseleave', e => {
        line1.classList.remove('end');
        line2.classList.remove('end');
        line3.classList.add('hidden');
    });
    titleIconFrame.addEventListener('click', e => {
        sidebarController.hideSidebar();
    });
};

export function sidebarController() {
    const sidebar = document.querySelector('#sidebar');
    const main = document.querySelector('#main');

    function removeSidebarHighlight() {
        const sidebarElements = document.querySelectorAll('.sidebar-element');
        for (let i = 0; i < sidebarElements.length; i++) {
            sidebarElements[i].classList.remove('sidebar-selected');
        };
    };

    function addSidebarHighlight(e) {
        e ? e.target.classList.add('sidebar-selected') : document.querySelector('#inbox').classList.add('sidebar-selected');
    }

    sidebar.addEventListener('click', e => {
        if (e.target.localName === 'li') {
            loadPage(e.target.id);
            removeSidebarHighlight();
            addSidebarHighlight(e);
        };
    });

    function hideSidebar() {
        sidebar.classList.toggle('hidden');
        main.classList.toggle('sidebar-hidden');
    };

    sidebarController.removeSidebarHighlight = removeSidebarHighlight;
    sidebarController.addSidebarHighlight = addSidebarHighlight;
    sidebarController.hideSidebar = hideSidebar;

};

function loadPage(e) {
    switch (e) {
        case 'inbox':
            loadInbox(data.tasks);
            break;
        case 'today':
            getTodaysTasks();
            loadInbox(todaysTasks);
            break;
        case 'this-week':
            getThisWeeksTasks();
            loadInbox(thisWeeksTasks);
            break;
        case 'calendar':
            break;
        case 'projects':
            break;
        case 'archive':
            loadInbox(data.completedTasks);
            break;
        default:
            alert('Something went wrong')
    };
}

export function addTask() {
    window.addEventListener('click', e => {

        const taskTitle = document.querySelector('#new-task-title-input');
        const taskNotes = document.querySelector('#new-task-notes-input');
        const taskDate = document.querySelector('#new-task-date-input');
        const taskPriority = document.querySelector('#new-task-priority-input');
        function randCharString() {
            let randString = Math.random().toString(36).slice(2);
            if (data.usedKeys.includes(randString)) {
                randCharString();
            } else {
                return randString;
            }
        }
        const taskKey = randCharString();
        const status = 'incomplete';
        
        if ((e.target.id === 'new-task-background' || 
        e.target.id === 'cancel-btn') && 
        (document.querySelector('#new-task-viewport'))) {
            document.querySelector('#new-task-viewport').remove();
        } else if (e.target.id === 'save-btn' && 
        document.querySelector('#new-task-viewport')) {
            let task = createTask(taskTitle.value, taskNotes.value, taskDate.value, taskPriority.value, status, taskKey);
            data.usedKeys.push(taskKey);
            const modalHeader = document.querySelector('#new-task-modal-header');
            if (modalHeader) {
                if (modalHeader.innerText.includes('Create')) {
                    data.tasks.push(task);
                } else if (modalHeader.innerText.includes('Edit')) {
                    let taskIndex = getTaskIndexViaTodoElement.taskIndex;
                    data.tasks.splice(taskIndex, 1, task)
                }
            }
            updateLocalStorage();
            loadInbox(data.tasks);
            sidebarController.removeSidebarHighlight();
            sidebarController.addSidebarHighlight();
            document.querySelector('#new-task-viewport').remove();
        } else {
            return;
        }
    });
};

function createTask(title, notes, date, priority, status, taskKey) {
    return {
        title: title,
        notes: notes,
        date: date,
        priority: priority,
        status: status,
        taskKey: taskKey,
    };
};

function loadInbox(array) {

    if (document.querySelector('#inbox-list')) {
        document.querySelector('#inbox-list').remove();
    };

    const inboxList = document.createElement('ul');
    inboxList.id = 'inbox-list';
    main.appendChild(inboxList);

    for (let i = 0; i < array.length; i++) {
        let Todo = document.createElement('li');
        Todo.classList.add('todo');
        Todo.classList.add(array[i].status);
        Todo.dataset.key = array[i].taskKey;
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        array[i].status === 'complete' ? checkbox.checked = true : checkbox.checked = false;
        let taskTitle = document.createElement('span');
        taskTitle.innerText = array[i].title;
        let taskDate = document.createElement('span');
        taskDate.classList.add('todo-date');
        if (array[i].date != '') {
            console.log(array[i].date);
            let date = parseISO(array[i].date);
            console.log(date);
            let formattedDate = format(new Date(array[i].date), 'MMM d, yy');
            console.log(formattedDate);
            taskDate.innerText = formattedDate;
        };
        let priorityIcon = document.createElement('i');
        priorityIcon.classList.add('fas');
        priorityIcon.classList.add('fa-flag');
        priorityIcon.classList.add(array[i].priority);
        let moveIcon = document.createElement('i');
        moveIcon.classList.add('fas');
        moveIcon.classList.add('fa-arrow-alt-circle-right');
        let editIcon = document.createElement('i');
        editIcon.classList.add('fas');
        editIcon.classList.add('fa-edit');
        let trashIcon = document.createElement('i');
        trashIcon.classList.add('fas');
        trashIcon.classList.add('fa-trash-alt');
        let extraTodo = document.createElement('div');
        extraTodo.classList.add('extra-todo');
        extraTodo.classList.add('hidden');
        let notesTag = document.createElement('span');
        notesTag.innerHTML = '<strong>Notes:</strong><br>';
        let notes = document.createElement('span');
        notes.innerText = array[i].notes;
        Todo.appendChild(extraTodo);
        Todo.appendChild(checkbox);
        Todo.appendChild(taskTitle);
        Todo.appendChild(taskDate);
        Todo.appendChild(priorityIcon);
        Todo.appendChild(moveIcon);
        Todo.appendChild(editIcon);
        Todo.appendChild(trashIcon);
        extraTodo.appendChild(notesTag);
        extraTodo.appendChild(notes);
        Todo.appendChild(extraTodo);
        inboxList.appendChild(Todo);

        Todo.addEventListener('click', e => {
            if (e.target.localName === 'span' || e.target.classList.contains('todo')) {
                expandTask(extraTodo);
            } else if (e.target.type === 'checkbox') {
                completeTask(e);
            } else if (e.target.classList.contains('fa-flag')) {
                console.log(tasks);
                console.log(data.tasks);
                console.log(data);
                // promptChangePriority(e);
            } else if (e.target.classList.contains('fa-arrow-alt-circle-right')) {
                // promptAssignToProject(e);
            } else if (e.target.classList.contains('fa-edit')) {
                showTaskModal(e);
            } else if (e.target.classList.contains('fa-trash-alt')) {
                deleteTask(e);
            }
        });
    };
};

function expandTask(extraTodo) {
    extraTodo.classList.toggle('hidden');
}

function completeTask(e) {
    const todoKey = e.target.parentNode.dataset.key;
    markComplete(e);
    if (e.target.checked === true) {
        for (let i = 0; i < data.tasks.length; i++) {
            if (data.tasks[i].taskKey === todoKey) {
                data.tasks[i].status = 'complete';
                let completedTask = data.tasks.splice(i, 1);
                data.completedTasks.push(completedTask[0]);
            };
        };
    } else if (e.target.checked === false) {
        for (let i = 0; i < data.completedTasks.length; i++) {
            if (data.completedTasks[i].taskKey === todoKey) {
                data.completedTasks[i].status = 'incomplete';
                let uncompletedTask = data.completedTasks.splice(i, 1);
                data.tasks.push(uncompletedTask[0]);
            };
        };
    };
    updateLocalStorage();
};

function markComplete(e) {
    e.target.parentNode.classList.toggle('complete');
};

function deleteTask(e) {
    const sidebar = document.querySelector('#sidebar');
    const todoKey = e.target.parentNode.dataset.key;
    if (e.target.parentNode.classList.contains('complete')) {
        for (let i = 0; i < data.completedTasks.length; i++) {
            if (data.completedTasks[i].taskKey === todoKey) {
                data.completedTasks.splice(i, 1);
            };
        };
    } else {
        for (let i = 0; i < data.tasks.length; i++) {
            if (data.tasks[i].taskKey === todoKey) {
                data.tasks.splice(i, 1);
            };
        };
    };
    updateLocalStorage();

    for (let i = 0; i < sidebar.childNodes.length; i++) {
        if (sidebar.childNodes[i].classList.contains('sidebar-selected')) {
            let sidebarEl = sidebar.childNodes[i].id;
            loadPage(sidebarEl);
        };
    };

};

function showTaskModal(e) {
    getTaskIndexViaTodoElement(e);
    let taskIndex = getTaskIndexViaTodoElement.taskIndex;

    const newTaskViewport = document.createElement('div');
    newTaskViewport.id = 'new-task-viewport';
    content.appendChild(newTaskViewport);

    const newTaskBackground = document.createElement('div');
    newTaskBackground.id = 'new-task-background';
    newTaskViewport.appendChild(newTaskBackground);

    const newTaskModal = document.createElement('div');
    newTaskModal.id = 'new-task-modal';
    newTaskViewport.appendChild(newTaskModal);

    const newTaskModalHeader = document.createElement('div');
    newTaskModalHeader.id = 'new-task-modal-header';
    if (e.target.classList.contains('fa-plus-square')) {
        newTaskModalHeader.innerText = 'Create New To Do';
    } else if (e.target.classList.contains('fa-edit')) {
        newTaskModalHeader.innerText = 'Edit To Do';
    }
    newTaskModal.appendChild(newTaskModalHeader);

    const newTaskForm = document.createElement('form');
    newTaskForm.id = 'new-task-form';
    newTaskModal.appendChild(newTaskForm);

    const formElements = [
        ['Title', 'new-task-title', 'new-task-title-input'],
        ['Date', 'new-task-date', 'new-task-date-input'],
        ['Notes', 'new-task-notes', 'new-task-notes-input'],
        ['Priority', 'new-task-priority', 'new-task-priority-input'],
    ]
    const priorities = ['Low', 'Medium', 'High']

    for (let i = 0; i < formElements.length; i++) {
        const newTaskFormElement = document.createElement('div')
        newTaskFormElement.classList.add('new-task-form-element');
        newTaskFormElement.id = formElements[i][1];
        newTaskForm.appendChild(newTaskFormElement);

        const newTaskFormLabel = document.createElement('label');
        newTaskFormLabel.htmlfor = formElements[i][2];
        newTaskFormLabel.innerText = formElements[i][0];
        newTaskFormElement.appendChild(newTaskFormLabel);

        if (i === 0) {
            const newTaskFormInput = document.createElement('input');
            if (taskIndex) {
                newTaskFormInput.value = data.tasks[taskIndex].title;
            }
            newTaskFormInput.required = true;
            newTaskFormInput.maxLength = '40';
            newTaskFormInput.id = formElements[i][2];
            newTaskFormElement.appendChild(newTaskFormInput);
        } else if (i === 1) {
            const newTaskFormInput = document.createElement('input');
            if (taskIndex) {
                newTaskFormInput.value = data.tasks[taskIndex].date;
            }
            newTaskFormInput.type = 'date';
            newTaskFormInput.id = formElements[i][2];
            newTaskFormElement.appendChild(newTaskFormInput);
        } else if (i === 2) {
            const newTaskFormInput = document.createElement('textarea');
            if (taskIndex) {
                newTaskFormInput.value = data.tasks[taskIndex].notes;
            }
            newTaskFormInput.maxLength = '400';
            newTaskFormInput.id = formElements[i][2];
            newTaskFormElement.appendChild(newTaskFormInput);
        } else if (i === 3) {
            const newTaskFormInput = document.createElement('select');
            newTaskFormInput.id = formElements[i][2];
            newTaskFormElement.appendChild(newTaskFormInput);
            for (let j = 0; j < priorities.length; j++) {
                const newTaskFormOption = document.createElement('option');
                newTaskFormOption.value = priorities[j];
                if (taskIndex) {
                    if (data.tasks[taskIndex].priority === priorities[j]) {
                        newTaskFormOption.selected = 'selected';
                    }
                }
                newTaskFormOption.innerText = priorities[j];
                newTaskFormInput.appendChild(newTaskFormOption);
            };
        };
    };
    
    const modalBtns = document.createElement('div');
    modalBtns.id = 'modal-btns';
    newTaskForm.appendChild(modalBtns);

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'cancel-btn';
    cancelBtn.type = 'button';
    cancelBtn.innerText = 'Cancel';
    cancelBtn.classList.add('new-task-btn');
    modalBtns.appendChild(cancelBtn);

    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-btn';
    saveBtn.type = 'button';
    saveBtn.innerText = 'Save';
    saveBtn.classList.add('new-task-btn');
    modalBtns.appendChild(saveBtn);
};

function getTodaysTasks() {
    todaysTasks = [];
    for (let i = 0; i < data.tasks.length; i++) {
        let date = parseISO(data.tasks[i].date);
        if (isToday(date)) {
            todaysTasks.push(data.tasks[i]);
        };
    };
};

function getThisWeeksTasks() {
    thisWeeksTasks = [];
    for (let i = 0; i < data.tasks.length; i++) {
        let date = parseISO(data.tasks[i].date);
        if (isThisWeek(date)) {
            thisWeeksTasks.push(data.tasks[i]);
        };
    };
};

function getTaskIndexViaTodoElement(e) {
    let thisTaskKey = e.target.parentElement.dataset.key;
    let taskIndex;
    for (let x in data.tasks) {
        if (data.tasks[x].taskKey == thisTaskKey) {
            taskIndex = x;
        };
    };
    getTaskIndexViaTodoElement.taskIndex = taskIndex; 
};