const hamburger = document.querySelector(".fa-bars");
const defaultdiv = document.querySelector(".default");
const tranding = document.querySelector(".tranding");
const clasicss = document.querySelector(".classics");
const novels = document.querySelector(".novels");
const main = document.querySelector("main");
const header = document.querySelector("header");
const search = document.querySelector(".search");
const filterBtn = document.querySelector(".filter-btn");
const filter = document.querySelector(".filter");
const menu = document.querySelector(".menu");
// is this bird? is this plane? or is this search input on index.html
const input = document.querySelector("input");
const results = document.querySelector(".results");
const books = document.querySelector(".books");
const movies = document.querySelector(".movies");
const booksDropDown = document.querySelector(".booksDropDown");
const moviesDropDown = document.querySelector(".moviesDropDown");
// bookmark button in header
const bookmarkButton = document.querySelector(".bookmarks");

const bookmarksDiv = document.querySelector(".bookmarksDiv");
const searchResults = document.querySelector(".search-results");
const filters = document.querySelectorAll('input[type="checkbox"]');
const placeholderImageURL =
  "https://goelastic.com/wp-content/uploads/2022/06/ELA_Headshots_Placeholder_4.jpg";

const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];
const login = JSON.parse(localStorage.getItem("login")) || false;
const currUser = JSON.parse(localStorage.getItem("currUser")) || false;
// console.log(currUser);
const currUserObj = users.find((user) => user.id === currUser);
const currLibrary = currUserObj
  ? JSON.parse(localStorage.getItem(`userLibrary${currUser}`)) || []
  : [];
// console.log(currLibrary);
// console.log(currUserObj);
if (login === true && window.location.pathname !=="index.html") {
 
}
export {
  currLibrary,
  currUser,
  login,
  main,
  header,
  filters,
  filter,
  filterBtn,
  hamburger,
  defaultdiv,
  tranding,
  clasicss,
  novels,
  search,
  menu,
  input,
  results,
  books,
  movies,
  booksDropDown,
  moviesDropDown,
  bookmarksDiv,
  searchResults,
  placeholderImageURL,
  bookmarks,
  users,
  bookmarkButton,
};
export let loggedin;

export function menuShow() {
  let clicked = false;
  hamburger.addEventListener("click", () => {
    if (!clicked) {
      menu.style.visibility = "initial";
      clicked = true;
    } else if (clicked) {
      menu.style.visibility = "hidden";
      clicked = false;
    }
    const screenWidth = window.innerWidth;
    const maxWidth = 700;
    if (screenWidth > maxWidth) {
      return (menu.style.visibility = "initial");
    }
  });
}
export function appendMovie(title, year, poster, imdb) {
  fetch(`http://www.omdbapi.com/?i=${imdb}&apikey=fc1fef96`)
    .then((response) => response.json())
    .then((resp) => {
      const rating = resp.Rated;
      const Genre = resp.Genre;
      const plot = resp.Plot;
      const div = document.createElement("div");
      if (!poster || poster === "N/A") {
        poster = placeholderImageURL;
      }
      div.innerHTML = `
  <div>
    <img src="${poster}"/>
  
</div>
    <div">
      <h2>${title}</h2>
      <h3>${Genre}</h3><h3>Released: ${year}</h3> 
       <p class="rating">${rating}</p>
      <p class="plot">${plot}</p>
    </div>
  `;
      div.classList.add("book");
      movies.appendChild(div);
    })
    .catch((error) => {
      console.log("error fetching and displaying details:", error);
    });
}
export function appendBook(imgSrc, title, author, published, where) {
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${imgSrc}"/>
    <div>
      <h2>${title} <i style="fill:none" class="fa-solid fa-bookmark"></i></h2>
      <h3>${author}</h3><h3 class="published">Published: ${published}</h3>
    </div>
  `;
  div.classList.add("add");
  where.appendChild(div);
}
export function createBooks(title, author, published, isbn) {
  const imgSrc = isbn
    ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
    : placeholderImageURL;
  const img = new Image();
  img.src = imgSrc;
  img.onload = function () {
    if (img.naturalWidth > 150 && img.naturalHeight > 150) {
      appendBook(imgSrc, title, author, published, books);
    } else {
      appendBook(placeholderImageURL, title, author, published, books);
    }
  };
  img.onerror = function () {
    appendBook(placeholderImageURL, title, author, published, books);
  };
}
