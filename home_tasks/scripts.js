async function getDataPost() {
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
                                <img src="./assets/user.svg" alt="User">
                                <div class="post-content">
                                    <p class="idUser">User ID: ${userId}</p>
                                    <p class="title">${title}</p>
                                    <p class="completeButton">Читать дальше</p>
                                    <p class="infoPost">${body}</p>
                                    <p class="checkComment">Показать ответ</p>
                                </div>
                            </div>
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
        })
    })
}

const checkInfoPost = async (event) => {
    event.path[0].style.display = "none";
    event.path[1].children[3].style.display = "block";
}

const checkCommentPost = async (idUser) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${idUser.split("_")[1]}/comments`)
    if (response.ok) {
        response.json().then(data => {
            data.forEach(post => {
                const {postId, id, name, email, body} = post;

                document.querySelector(`#${idUser}`).innerHTML +=
                    `<div class="commentsPost">
                        <img src="./assets/user.svg" alt="User">
                        <div class="comment-content">
                            <span class="name">${name}</span>
                            <span class="email">${email}</span>
                            <p class="infoComents">${body}</p>
                        </div>
                    </div>`;
            })
        })
    }
    fillData();
}

fillData();