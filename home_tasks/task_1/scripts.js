async function getDataPost() {
    const mainPage = document.querySelector('.mainPage');
    mainPage.innerHTML = '';

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (response.ok) {
        return response.json();
    }
}

async function fillData() {
    getDataPost().then(data => {
            data.forEach(post => {
                const {userId, id, title, body} = post;

                document.querySelector(".mainPage").innerHTML +=
                        `<div class="wrapperPost" id="post_${id}">
                            <div class="mainPage_post">
                                <img class="userImg" src="assets/user.svg" alt="User">
                                <div class="post-content">
                                    <p class="idUser">User ID: ${userId}<img class="closeButton" src="assets/close.svg" alt="Close"></p>
                                    <p class="title">${title}</p>
                                    <p class="completeButton">Читать дальше</p>
                                    <p class="infoPost">${body}</p>
                                    <p class="checkComment">Показать ответ</p>
                                </div>
                            </div>
                            <div class="comments"></div>
                        </div>`;
            })
            addEventListeners();
        }
    )
}

const addEventListeners = () => {
    document.querySelectorAll(".completeButton").forEach(elem => {
        elem.addEventListener("click", (event) => {
            checkInfoPost(event);
        })
    })

    document.querySelectorAll(".checkComment").forEach(elem => {
        elem.addEventListener("click", event => {
            checkCommentPost(event.target.parentNode.parentNode.parentNode.id);
            event.target.style.display = "none";
        })
    })

    document.querySelectorAll(".closeButton").forEach(elem => {
        elem.addEventListener("click", event => {
            deletePost(event.target.parentNode.parentNode.parentNode.parentNode.id);
        })
    })

    document.querySelectorAll(".openModalButton").forEach(elem => {
        elem.addEventListener("click", () => {
            document.getElementById('myModal').style.display = 'block';
        })
    })

    document.querySelector('.close').addEventListener('click', () => {
        closeModal()
    })
}

const checkInfoPost = async (event) => {
    event.target.style.display = "none";
    event.target.nextElementSibling.style.display = "block";
}

const checkCommentPost = async (idUser) => {

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${idUser.split("_")[1]}/comments`)
    if (response.ok) {
        response.json().then(data => {
            data.forEach(post => {
                const {postId, id, name, email, body} = post;

                document.querySelector(`#${idUser}`).children[1].innerHTML +=
                    `<div class="commentsPost">
                        <img src="assets/user.svg" alt="User">
                        <div class="comment-content">
                            <span class="name">${name}</span>
                            <span class="email">${email}</span>
                            <p class="infoComents">${body}</p>
                        </div>
                    </div>`;
            })
        })

    }
}

const deletePost = async (idPost) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${idPost.split("_"[1])}`, {
        method: "DELETE"
    })
    if (response.ok) {
        await fillData();
    }
}

async function add(){
    const data = {
        idUser: document.getElementById('idUser').value,
        title: document.getElementById('title').value,
        body: document.getElementById('body').value
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    if (response.ok){
        closeModal();
        fillData();
    }
}

const closeModal = () => {
    document.getElementById('myModal').style.display = 'none'
    document.getElementById('idUser').value = ''
    document.getElementById('title').value = ''
    document.getElementById('body').value = ''
}

fillData();