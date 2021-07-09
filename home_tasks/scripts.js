async function getData() {
    const mainPage = document.querySelector(".mainPage");
    mainPage.innerHTML = ''
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    if (response.ok) {
        return response.json()
    }
}

async function fillData() {
    getData().then(data => {
            data.forEach(post => {
                const {userId, id, title, body} = post;

                document.querySelector(".mainPage").innerHTML +=
                    `<div class="mainPage_post">
                            <img src="./assets/user.svg" alt="User">
                            <div class="post-content">
                                <p class="idUser">User ID: ${userId}</p>
                                <p class="title">${title}</p>
                                <p class="completeButton">Читать дальше</p>
                                <p class="infoPost">${body}</p>
                                <p class="checkComment">Показать ответ</p>
                            </div>
                        </div>`;
            })

            document.querySelectorAll(".completeButton").forEach(elem => {
                elem.addEventListener("click", (event) => {
                    event.path[0].style.display = "none";
                    event.path[1].children[3].style.display = "block";
                })
            })
        }
    )
}

const checkInfoPost = (event, idPost, body) => {
    console.log(event, idPost, body)
}


fillData();