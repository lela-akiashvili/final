import { users, login } from "./variables.js";

import { menuShow } from "./variables.js";
menuShow();
console.log(users);
// localStorage.clear();
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const signIn = document.querySelector(".agree");
const span = document.querySelector(".result");
signIn.addEventListener("click", () => {
  span.style.color = "red";
  const usernameValue = username.value;
  const passValue = password.value;
  if (!usernameValue || !passValue) {
    span.textContent = "fill in all fields bro";
    password.style.border = "2px solid red";
    username.style.border = "2px solid red";
  } else {
    const user = users.find((user) => user.name === usernameValue);

    if (!user) {
      span.textContent = "User doesn't exist.";
      username.style.border = "2px solid red";
      password.style.border = "";
      password.textContent = "";
    } else if (user.password !== passValue) {
      console.log(user.password);
      span.textContent = `"you aren't that guy pal, trust me, you are not that guy"`;
      username.style.border = "";
      password.style.border = "2px solid red";
    } else {
      localStorage.setItem("login", true);
      const currUserId = user.id;
      localStorage.setItem("currUser", JSON.stringify(currUserId));
      console.log(currUserId);
      password.style.border = "";
      username.style.border = "";
      span.style.color = "green";
      span.textContent = "hah! guess who's back";
      console.log(usernameValue);
    }
  }
});
console.log(login);
