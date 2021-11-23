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

    const titleImg = document.createElement('img');
    titleImg.src = '/img/tick-square-svgrepo-com.svg';
    headerLeft.appendChild(titleImg);

    const title = document.createElement('div');
    title.id = 'title';
    title.innerText = 'ToDo';
    headerLeft.appendChild(title);

    const signIn = document.createElement('div');
    signIn.id = 'sign-in';
    signIn.innerText = 'Sign in';
    headerRight.appendChild(signIn);

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
    
    const footerText = document.createElement('span');
    footerText.id = 'footer-text';
    footerText.innerText = 'Made by Tim Ponce';
    footer.appendChild(footerText);

    const footerImg = document.createElement('img');
    footerImg.id = 'footer-img';
    footerImg.src = '';
    footer.appendChild(footerImg);

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