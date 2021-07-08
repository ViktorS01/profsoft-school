async function getUsers (){
    const response = await fetch("http://localhost:3000", {
        method: 'GET'
    });
    
    if (response.ok){
        response.json().then(data => {
            data.forEach(user => {
                const {id, name, role, status, email} = user;
                const tr = document.createElement('tr');
                const emailElement = document.createElement('td');
                const nameElement = document.createElement('td');
                const roleElement = document.createElement('td');
                const statusElement = document.createElement('td');
                const actionElement = document.createElement('td');

                tr.append(emailElement, nameElement, roleElement, statusElement, actionElement);
                document.getElementById('tbody').append(tr);

                emailElement.innerText = email;
                nameElement.innerText = name;
                roleElement.innerText = role;
                statusElement.innerText = status === 1 ? 'Активен' : 'Заблокирован';
                actionElement.addEventListener('click', () => {
                    blockUser(id);
                });
                actionElement.innerHTML = status === 1 ? `<div class="blockButton"><p>Блокировать</p></div>` :
                    `<div class="unblockButton"><p>Восстановить</p></div>`;
            });
        });
    }
}

async function blockUser (idUser){
    const response = await fetch(`http://localhost:3000/${idUser}`, {
        method: 'DELETE'
    });

    clearData();
    getUsers();
}

const clearData = () => {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
}

const closeModal = () => {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('role').value = '';
}


const addEventListeners = () => {
    document.querySelector('.openModalButton').addEventListener('click', () => {
        document.getElementById('myModal').style.display = 'block';
    });
    document.querySelector('.close').addEventListener('click', () => {
        closeModal();
    });
}

async function add(){
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value
    };
    const response = await fetch('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok){
        clearData();
        closeModal();
        getUsers();
    }
}

addEventListeners();
getUsers();