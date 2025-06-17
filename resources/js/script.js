// Prepare the following
//  1) Required variables that will be used across the application
var allBookmark = [];
var bookmarkName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("siteURL");
var bookmarkId = Number(localStorage.getItem("id"));
var bookmarkRecord = document.getElementById("bookmarkTable");
var addBookmarkButton = document.getElementById("addBookmark");
var urlRegExp = /http[s]?:\/\/[a-z]{3,}\.(com|net|org)/;

// 2) Check if local storage contains stored bookmark, and if it has a value , then display it when the application run
if (localStorage.getItem("allBookmark") != null) {
  allBookmark = JSON.parse(localStorage.getItem("allBookmark"));
  displayAllBookmark();
}

// Save the new array that contain all bookmark in local storage
function updateSavedBookmark() {
  localStorage.setItem("allBookmark", JSON.stringify(allBookmark));
}

// Add bookmark to the array , then display it and update local storage
function addBookmark() {
  var bookmark = {
    name: bookmarkName.value,
    url: siteURL.value,
  };

  allBookmark.push(bookmark);
  displayAllBookmark();
  updateSavedBookmark();
  clearForm();
}

// Display Bookmark in table , and for each record , we will add index property to its array
function displayAllBookmark() {
  var bookmarkTableRecords = "";
  for (var i = 0; i < allBookmark.length; i++) {
    allBookmark[i].index = i;
    bookmarkTableRecords += `<tr class="border border-bottom border-1">
            <td>${allBookmark[i].index + 1}</td>
            <td>${allBookmark[i].name}</td>
            <td>
              <div class="btn btn-success">   
                <a
                  class="text-white text-decoration-none"
                  href="${allBookmark[i].url}"
                  target="_blank"
                  >
                  <i class="fa-solid fa-eye"></i>
                  Visit
                  </a
                >
              </div>
            </td>
            <td>
              <div class="btn btn-danger">
              <a onclick="deleteBookmark(${i})" class="text-white text-decoration-none">
                <i class="fa-solid fa-trash"></i>
                <span>Delete</span>
                </a>
              </div>
            </td>
            <td>
              <div class="btn btn-primary">
              <a onclick="editBookmark(${i})" class="text-white text-decoration-none">
                <i class="fa-solid fa-save"></i>
                <span>Edit</span>
                </a>
              </div>
            </td>
          </tr>`;
  }
  bookmarkRecord.innerHTML = bookmarkTableRecords;
}

function clearAllBookmark() {
  localStorage.removeItem("allBookmark");
  allBookmark = [];
  bookmarkRecord.innerHTML = "";
}

function deleteBookmark(idx) {
  allBookmark.splice(idx, 1);
  displayAllBookmark();
  updateSavedBookmark();
}

function clearForm() {
  bookmarkName.value = "";
  siteURL.value = "";
}

function editBookmark(idx) {
  bookmarkName.value = allBookmark[idx].name;
  siteURL.value = allBookmark[idx].url;
  addBookmarkButton.innerHTML = "Update Bookmark";
  addBookmarkButton.setAttribute("onclick", `updateBookmark(${idx})`);
}

function updateBookmark(idx) {
  allBookmark[idx].name = bookmarkName.value;
  allBookmark[idx].url = bookmarkName.value;
  displayAllBookmark();
  updateSavedBookmark();
  addBookmarkButton.innerHTML = "Add Bookmark";
  addBookmarkButton.setAttribute("onclick", "addBookmark()");
  clearForm();
}

function validateBookmarkInput() {
  urlRegExp.test(siteURL.value);
}
