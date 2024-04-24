import { hamburger, menu, users } from "./variables.js";

import { menuShow } from "./variables.js";
menuShow();
// console.log(bookmarks);
const span = document.querySelector(".result");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confpass = document.querySelector("#confirm-password");
const signUp = document.querySelector(".agree");
class User {
  constructor(name, password, id, books) {
    this.name = name;
    this.password = password;
    this.id = id;
    this.books = books;
    // new
    localStorage.setItem(`userLibrary${id}`, JSON.stringify(this.books));
  }
}
// console.log(Date.now())
signUp.addEventListener("click", () => {
  span.style.color = "red";
  const usernameValue = username.value;
  const passVlaue = password.value;
  const confpassVal = confpass.value;
  span.textContent = "";
  password.style.border = "";
  const pattern = /(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])/;
  if (!usernameValue || !passVlaue || !confpassVal) {
    span.textContent = "giiirl, com'n, fill in all filds";
  } else if (!pattern.test(passVlaue)) {
    password.style.border = "2px solid red";
  } else if (passVlaue !== confpassVal) {
    span.textContent = "passwords don't match";
  } else if (users.some((user) => user.name === usernameValue)) {
    span.textContent = "Username taken";
  } else {
    const user = new User(usernameValue, passVlaue, Date.now(), []);
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    span.textContent =
      "With this, You solemnly swear that You are up to no good";
    span.style.color = "green";
    username.value = "";
    password.value = "";
    confpass.value = "";
  }
});
console.log(users);
//   span.textContent ="you are not that guy pal, trust me, you are not that guy";
