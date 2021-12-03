const content = document.getElementById('content');

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

    sidebar.addEventListener('click', e => {
        if (e.target.localName === 'li') {
            removeSidebarHighlight();
            e.target.classList.add('sidebar-selected');
        };
    });

    function hideSidebar() {
        sidebar.classList.toggle('hidden');
        main.classList.toggle('sidebar-hidden');
    };

    sidebarController.hideSidebar = hideSidebar;

};

let tasks = [{title: 'Hover over the \'Check\' icon next to ToDo', notes: '', date: '', priority: 'Low', taskId: '1'} , {title: 'Click the icon to collapse the sidebar!', notes: '', date: '', priority: 'Low', taskId: '2'}];
let compltetedTasks = [];

export function addTask() {
    const addTaskBtn = document.querySelector('#add-task-btn');
    loadInbox(tasks);
    addTaskBtn.addEventListener('click', e => {
        showNewTaskModal();
        window.addEventListener('click', e => {

            const taskTitle = document.querySelector('#new-task-title-input');
            const taskNotes = document.querySelector('#new-task-notes-input');
            const taskDate = document.querySelector('#new-task-date-input');
            const taskPriority = document.querySelector('#new-task-priority-input');
            let usedIds = [];
            function randCharString() {
                let randString = Math.random().toString(36).slice(2);
                if (usedIds.includes(randString)) {
                    randCharString();
                } else {
                    return randString;
                }
            }
            const taskId = randCharString();
            
            if (e.target.id === 'new-task-background' || 
            e.target.id === 'cancel-btn' && 
            document.querySelector('#new-task-viewport')) {
                document.querySelector('#new-task-viewport').remove();
            } else if (e.target.id === 'save-btn' && 
            document.querySelector('#new-task-viewport')) {
                let task = createTask(taskTitle.value, taskNotes.value, taskDate.value, taskPriority.value, taskId);
                usedIds.push(taskId);
                tasks.push(task);
                loadInbox(tasks);
                document.querySelector('#new-task-viewport').remove();
            } else {
                return;
            }
        });
    });
};

function createTask(title, notes, date, priority, taskId) {
    return {
        title: title,
        notes: notes,
        date: date,
        priority: priority,
        taskId: taskId,
    };
};

function loadInbox(tasks) {

    if (document.querySelector('#inbox-list')) {
        document.querySelector('#inbox-list').remove();
    };

    const inboxList = document.createElement('ul');
    inboxList.id = 'inbox-list';
    main.appendChild(inboxList);

    for (let i = 0; i < tasks.length; i++) {
        let Todo = document.createElement('li');
        Todo.classList.add('todo');
        Todo.id = tasks[i].taskId;
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        let taskTitle = document.createElement('span');
        taskTitle.innerText = tasks[i].title;
        // let taskNotes = document.createElement('span');
        // taskNotes.innerText = tasks[i].notes;
        let taskDate = document.createElement('span');
        taskDate.innerText = tasks[i].date;
        let priorityIcon = document.createElement('i');
        priorityIcon.classList.add('fas');
        priorityIcon.classList.add('fa-flag');
        priorityIcon.classList.add(tasks[i].priority);
        let moveIcon = document.createElement('i');
        moveIcon.classList.add('fas');
        moveIcon.classList.add('fa-arrow-alt-circle-right');
        let editIcon = document.createElement('i');
        editIcon.classList.add('fas');
        editIcon.classList.add('fa-edit');
        let trashIcon = document.createElement('i');
        trashIcon.classList.add('fas');
        trashIcon.classList.add('fa-trash-alt');
        Todo.appendChild(checkbox);
        Todo.appendChild(taskTitle);
        // Todo.appendChild(taskNotes);
        Todo.appendChild(taskDate);
        Todo.appendChild(priorityIcon);
        Todo.appendChild(moveIcon);
        Todo.appendChild(editIcon);
        Todo.appendChild(trashIcon);
        inboxList.appendChild(Todo);

        Todo.addEventListener('click', e => {
            if (e.target.localName === 'span' || e.target.classList.contains('todo')) {
                // expandTask(e);
            } else if (e.target.type === 'checkbox') {
                completeTask(e);
            } else if (e.target.classList.contains('fa-flag')) {
                // promptChangePriority(e);
            } else if (e.target.classList.contains('fa-arrow-alt-circle-right')) {
                // promptAssignToProject(e);
            } else if (e.target.classList.contains('fa-edit')) {
                // editTask(e);
            } else if (e.target.classList.contains('fa-trash-alt')) {
                deleteTask(e);
            }
        });
    };
};

function completeTask(e) {
    e.target.parentNode.classList.toggle('completed');
    const todoId = e.target.parentNode.id;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].tasksId === todoId) {
            let completedTask = tasks.splice(i, 1);
            compltetedTasks.push(completedTask[0]);
        };
    };
    // loadInbox(tasks);
};

function deleteTask(e) {
    const todoId = e.target.parentNode.id;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskId === todoId) {
            tasks.splice(i, 1);
        };
    };
    loadInbox(tasks);
};

function showNewTaskModal() {
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
    newTaskModalHeader.innerText = 'Create New To Do'
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
            newTaskFormInput.required = true;
            newTaskFormInput.maxLength = '40';
            newTaskFormInput.id = formElements[i][2];
            newTaskFormElement.appendChild(newTaskFormInput);
        } else if (i === 1) {
            const newTaskFormInput = document.createElement('input');
            newTaskFormInput.type = 'date';
            newTaskFormInput.id = formElements[i][2];
            newTaskFormElement.appendChild(newTaskFormInput);
        } else if (i === 2) {
            const newTaskFormInput = document.createElement('textarea');
            newTaskFormInput.id = formElements[i][2];
            newTaskFormElement.appendChild(newTaskFormInput);
        } else if (i === 3) {
            const newTaskFormInput = document.createElement('select');
            newTaskFormInput.id = formElements[i][2];
            newTaskFormElement.appendChild(newTaskFormInput);
            for (let j = 0; j < priorities.length; j++) {
                const newTaskFormOption = document.createElement('option');
                newTaskFormOption.value = priorities[j];
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