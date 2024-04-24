import {
  bookmarksDiv,
  bookmarks,
  currLibrary,
  login,
  currUser,
} from "./variables.js";
import { menuShow } from "./variables.js";
menuShow();

if (login === true) {
  currLibrary.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `    <img src="${item.img}"/>
      <div>
        <h2>${item.title} <i style="fill:none" class="fa-solid fa-bookmark"></i></h2>
        <h3>${item.author}</h3><h3 class="published">${item.year}</h3>
     
      </div>
  `;
    div.classList.add("remove");
    bookmarksDiv.appendChild(div);
  });
} else if (login === false) {
  bookmarks.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `    <img src="${item.img}"/>
    <div>
      <h2>${item.title} <i style="fill:none" class="fa-solid fa-bookmark"></i></h2>
      <h3>${item.author}</h3><h3 class="published">${item.year}</h3>
   
    </div>
`;
    div.classList.add("remove");
    bookmarksDiv.appendChild(div);
  });
}
// localStorage.clear();   <textarea cols="30" rows="10"></textarea>
// for(let i=0; i <bookmarks.lenght; i++){
//   bookmarksDiv.appendChild(bookmarks[i]);
// }

document.addEventListener("click", (event) => {
  if (event.target.matches(".fa-bookmark")) {
    const savedDiv = event.target.closest(".remove");
    const savedTitle = savedDiv.querySelector("h2").textContent.trim();
    const savedAuthor = savedDiv.querySelector("h3").textContent.trim();
    const savedYear = savedDiv.querySelector(".published").textContent.trim();

    let foundIndex = -1;

    if (login === true) {
      console.log("Current library:", currLibrary);

      for (let i = 0; i < currLibrary.length; i++) {
        const mark = currLibrary[i];
        if (
          mark.title.trim() === savedTitle &&
          mark.author.trim() === savedAuthor &&
          mark.year.trim() === savedYear
        ) {
          foundIndex = i;
          break;
        }
      }
    } else if (login === false) {
      console.log("Bookmarks:", bookmarks);

      for (let i = 0; i < bookmarks.length; i++) {
        const mark = bookmarks[i];
        if (
          mark.title.trim() === savedTitle &&
          mark.author.trim() === savedAuthor &&
          mark.year.trim() === savedYear
        ) {
          foundIndex = i;
          break;
        }
      }
    }

    console.log("Bookmark index:", foundIndex);

    if (foundIndex !== -1) {
      if (login === true) {
        currLibrary.splice(foundIndex, 1);
        localStorage.setItem(
          `userLibrary${currUser}`,
          JSON.stringify(currLibrary)
        );
      } else if (login === false) {
        bookmarks.splice(foundIndex, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      }
      savedDiv.remove();
    }
  }
});
