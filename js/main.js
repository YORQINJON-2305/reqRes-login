const loginToken = JSON.parse(localStorage.getItem("token"));
console.log(loginToken)
if(!loginToken){
    window.location.href = "/login.html"
}

const elList = document.querySelector(".users-list");
const elUsersTemplate = document.querySelector(".users-template").content;

const globalFragment = new DocumentFragment();

function renderUsers(arr, node){
    arr.forEach(item => {
        const templateClone = elUsersTemplate.cloneNode(true);

        templateClone.querySelector(".user-img").src = item.avatar;
        templateClone.querySelector(".user-img").alt = item.first_name;
        templateClone.querySelector(".user-name").textContent = item.first_name + " " + item.last_name;
        templateClone.querySelector(".user-link").textContent = item.email;
        templateClone.querySelector(".user-link").href = `mailto:${item.email}`;

        globalFragment.appendChild(templateClone);
    });

    node.appendChild(globalFragment);
}


async function getUsers(){
    try {
        const res = await fetch("https://reqres.in/api/users?page=1");
        const data = await res.json();

        renderUsers(data.data, elList);
    } catch (error) {
        console.log(err);
    }
}

getUsers()