import {
  currLibrary,
  currUser,
  login,
  filters,
  filter,
  filterBtn,
  hamburger,
  search,
  defaultdiv,
  tranding,
  clasicss,
  novels,
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
} from "./variables.js";

import { menuShow, appendMovie, appendBook, createBooks } from "./variables.js";
menuShow();
let subjects = [];
filterBtn.addEventListener("click", () => {
  filter.innerHTML = "";
  const joinedSubjects = subjects.join("+");
  console.log(joinedSubjects);
  if (joinedSubjects === "") {
    const h1 = document.createElement("h1");
    h1.textContent = "no filter was choosen";
    h1.style.textWrap = "nowrap";
    filter.append(h1);
    console.log("no filter was choosen");
  } else {
    fetch(
      `https://openlibrary.org/search.json?subject=${joinedSubjects}&fields=key,author_name,first_publish_year,title,cover_i,subject&limit=40`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not 'ok'");
        }
        return response.json();
      })
      .then((resp) => {
        console.log(resp.docs);
        const data = resp.docs;
        for (let i = 0; i < data.length; i++) {
          const title = data[i].title;
          // const isbn = data[i].isbn;
          const cover_i = data[i].cover_i;
          const author = data[i].author_name;
          const published = data[i].first_publish_year;
          const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;

          appendBook(imgSrc, title, author, published, filter);
        }
        subjects = [];
        filters.forEach((checkbox) => {
          checkbox.checked = false;
        });
      });
  }
});
filters.forEach((box) => {
  box.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value;

    if (isChecked) {
      subjects.push(value);
    } else {
      const index = subjects.indexOf(value);
      if (index !== -1) {
        subjects.splice(index, 1);
      }
    }
    console.log(subjects);
  });
});

console.log(filters);

fetch(`https://openlibrary.org/trending/daily.json?&fields=isbn&limit=10`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((resp) => {
      console.log(resp.works);
      const data = resp.works;
      for (let i = 0; i < data.length; i++) {
        const title = data[i].title;
        const cover_i = data[i].cover_i;
        const author = data[i].author_name;
        const published = data[i].first_publish_year;
        const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`

          appendBook(imgSrc, title, author, published, tranding)
      }

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

fetch(`https://openlibrary.org/subjects/classic_literature.json?&limit=10`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((resp) => {
      console.log(resp);
      const data = resp.works;
      for (let i = 0; i < data.length; i++) {
        const title = data[i].title;
        const cover_i = data[i].cover_id;
        const author = data[i].authors[0].name;
        const published = data[i].first_publish_year;
        const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`

          appendBook(imgSrc, title, author, published, clasicss)
      }

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

//
fetch(`https://openlibrary.org/subjects/novels.json?`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not 'ok'");
    }
    return response.json();
  })
  .then((resp) => {
    console.log(resp.works);
    const data = resp.works;
      for (let i = 0; i < data.length; i++) {
        const title = data[i].title;
        const cover_i = data[i].cover_id;
        const author = data[i].authors[0].name;
        const published = data[i].first_publish_year;
        const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`

          appendBook(imgSrc, title, author, published, novels)
      }
  });

const subject = "fiction drama romance";
const encodedSubject = encodeURIComponent(subject);
const url = `https://openlibrary.org/search.json?subject=${encodedSubject}&limit=10`;

search.addEventListener("click", () => {
  defaultdiv.style.display = "none";
  books.innerHTML = "";
  movies.innerHTML = "";
  filter.innerHTML = "";
  movies.style.display = "initial";
  books.style.display = "initial";
  movies.classList.remove("dropDown");
  books.classList.remove("dropDown");
  let value = input.value;

  fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      value
    )}&fields=key,title,author_name,isbn,first_publish_year,availability&limit=9`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not 'ok'");
      }
      // console.log(response);
      return response.json();
    })
    .then((resp) => {
      console.log(resp.docs);
      if (resp.docs.length === 0) {
        results.textContent = "Try different spelling";
        return;
      } else if (resp.docs.length > 0) {
        const data = resp.docs;
        for (let i = 0; i < data.length; i++) {
          const title = data[i].title;
          const isbn = data[i].isbn;
          const author = data[i].author_name;
          const published = data[i].first_publish_year;
          if (!title.toLowerCase().includes(value.toLowerCase())) {
            continue;
          }

          if (isbn && isbn.length > 0) {
            createBooks(title, author, published, isbn[0]);
          } else {
            createBooks(title, author, published, null);
          }
        }
      }

      booksDropDown.style.visibility = "visible";
      booksDropDown.addEventListener("click", () => {
        books.style.display = "initial";
        movies.classList.remove("dropDown");
        books.classList.add("dropDown");
        movies.style.display = "none";
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  fetch(`http://www.omdbapi.com/?s=${value}&page=1&apikey=d2e02990`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not 'ok'");
      }
      return response.json();
    })
    .then((resp) => {
      if (resp.Response === "False") {
        results.textContent = "Try different spelling";
        return;
      }
      const data = resp.Search;
      for (let i = 0; i < data.length; i++) {
        const title = data[i].Title;
        const year = data[i].Year;
        const imdb = data[i].imdbID;

        const poster = data[i].Poster;
        appendMovie(title, year, poster, imdb);
      }

      moviesDropDown.style.visibility = "visible";
      moviesDropDown.addEventListener("click", () => {
        movies.style.display = "initial";
        books.classList.remove("dropDown");
        movies.classList.add("dropDown");
        books.style.display = "none";
      });
      results.textContent = `Results for: "${value}"`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// localStorage.clear();

document.addEventListener("click", (event) => {
  if (event.target.matches(".search-results")) {
    movies.classList.remove("dropDown");
    books.classList.remove("dropDown");
    movies.style.display = "initial";
    books.style.display = "initial";
  } else if (event.target.matches(".fa-bookmark")) {
    const savedDiv = event.target.closest(".add");
    const savedtitle = savedDiv.querySelector("h2");
    const title = savedtitle.textContent;
    const savedauthor = savedDiv.querySelector("h3");
    const author = savedauthor.textContent;
    const savedyear = savedDiv.querySelector(".published");
    const year = savedyear.textContent;
    const savedimg = savedDiv.querySelector("img");
    const img = savedimg.src;

    event.target.style.color = "green";

    if (login === true) {
      const bookmarkIndex = currLibrary.findIndex(
        (mark) =>
          mark.title === title && mark.author === author && mark.year === year
      );
      if (bookmarkIndex === -1) {
        currLibrary.push({ title, author, year, img });
        localStorage.setItem(
          `userLibrary${currUser}`,
          JSON.stringify(currLibrary)
        );
        event.target.style.color = "green";
      } else {
        currLibrary.splice(bookmarkIndex, 1);
        localStorage.setItem(
          `userLibrary${currUser}`,
          JSON.stringify(currLibrary)
        );
        event.target.style.color = "";
      }
      console.log(currLibrary);
    } else {
      const bookmarkIndex = bookmarks.findIndex(
        (mark) =>
          mark.title === title && mark.author === author && mark.year === year
      );
      if (bookmarkIndex === -1) {
        bookmarks.push({ title, author, year, img });
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      } else {
        bookmarks.splice(bookmarkIndex, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        event.target.style.color = "";
      }
      console.log(bookmarks);
    }
  }
});
