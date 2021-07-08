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

                });
                actionElement.innerHTML = status === 1 ? `<div class="blockButton"><p>Блокировать</p></div>` :
                    `<div class="unblockButton"><p>Восстановить</p></div>`;
            });
        });
    }
}

getUsers();