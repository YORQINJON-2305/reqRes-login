let loginToken = JSON.parse(localStorage.getItem("token"));

if(loginToken){
    window.location.href = "/index.html";
}

const elForm = document.querySelector(".login-form");
const elInputEmail = elForm.querySelector(".input-email");
const elInputPassword = elForm.querySelector(".input-password");
const elShowPasswordBtn = elForm.querySelector(".show-password-btn");


elShowPasswordBtn.addEventListener("mousedown", () =>{
    elInputPassword.type = "text";
    elShowPasswordBtn.style.backgroundImage = "url('./images/eye.svg')";
});

elShowPasswordBtn.addEventListener("mouseup", () =>{
    elInputPassword.type = "password";
    elShowPasswordBtn.style.backgroundImage = "url('./images/eye-hide.svg')";
});

elShowPasswordBtn.addEventListener("mouseout", () => {
    elInputPassword.type = "password";
    elShowPasswordBtn.style.backgroundImage = "url('./images/eye-hide.svg')";
});

async function postLogin(){

    const passwordInputValue = elInputPassword.value.trim();

    try {
        const res = await fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify(
                {
                    email: "eve.holt@reqres.in",
                    password: passwordInputValue
                }
            )
        });

        const data = await res.json();
        if(data.token){
            localStorage.setItem("token", JSON.stringify(data.token));
            window.location.href = "/index.html"
        }
    } catch (err){
        console.log(err)
    }
}

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    postLogin();
});
