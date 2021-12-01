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

    const titleIcon = document.createElement('i');
    titleIcon.classList.add('fas');
    titleIcon.classList.add('fa-check');
    headerLeft.appendChild(titleIcon);

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
    };

    content.appendChild(sidebar);
};

export function loadFooter() {

    const footer = document.createElement('footer');
    
    const footerContent = document.createElement('div');
    footerContent.id = 'footer-content';
    footer.appendChild(footerContent);

    const footerText = document.createElement('span');
    footerText.id = 'footer-text';
    footerText.innerText = 'Made by Tim Ponce';
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

export function sidebarController() {

    function removeSidebarHighlight() {
        const sidebarElements = document.querySelectorAll('.sidebar-element');
        for (let i = 0; i < sidebarElements.length; i++) {
            sidebarElements[i].classList.remove('sidebar-selected');
        };
    };

    const sidebar = document.querySelector('#sidebar')
    sidebar.addEventListener('click', e => {
        if (e.target.localName === 'li') {
            removeSidebarHighlight();
            e.target.classList.add('sidebar-selected');
        };
    });

};

export function loadInbox() {

    const inboxList = document.createElement('ul');
    inboxList.id = 'inbox-list';
    main.appendChild(inboxList);

    let todos = ['New To-Do', 'Another To-Do']

    for (let i = 0; i < todos.length; i++) {
        let newTodo = document.createElement('li');
        newTodo.classList.add('todo');
        let newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        let newText = document.createElement('span');
        newText.innerText = todos[i];
        newTodo.appendChild(newCheckbox);
        newTodo.appendChild(newText);
        inboxList.appendChild(newTodo);
    }

}

export function addTask() {
    const addTaskBtn = document.querySelector('#add-task-btn');
    addTaskBtn.addEventListener('click', e => {
        showNewTaskModal();
        window.addEventListener('click', e => {
            if (e.target.id === 'new-task-background' && document.querySelector('#new-task-viewport')) {
                document.querySelector('#new-task-viewport').remove();
            } else {
                return;
            }
        });
    });
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
                newTaskFormOption.value = priorities[0];
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
}