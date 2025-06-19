// Prepare the following
//  1) Required variables that will be used across the application
var allBookmark = [];
var bookmarkName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("siteURL");
var bookmarkId = Number(localStorage.getItem("id"));
var bookmarkRecord = document.getElementById("bookmarkTable");
var addBookmarkButton = document.getElementById("addBookmark");
var searchedBookmark = [];
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
  reArrangeArrayIndex(allBookmark);
  displayAllBookmark();
  updateSavedBookmark();
  clearForm();
}

// Display Bookmark in table , and for each record , we will add index property to its array
function displayAllBookmark() {
  var bookmarkTableRecords = "";

  for (var i = 0; i < allBookmark.length; i++) {
    bookmarkTableRecords += printedHTML(
      i,
      allBookmark[i].name,
      allBookmark[i].url
    );
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
  reArrangeArrayIndex(allBookmark);
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

function searchBookmark(searchTerm) {
  var printedSearch = "";
  searchedBookmark = [];
  for (var i = 0; i < allBookmark.length; i++) {
    if (allBookmark[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      searchedBookmark.push(allBookmark[i]);
    }
  }
  for (var i = 0; i < searchedBookmark.length; i++) {
    printedSearch += printedHTML(
      searchedBookmark[i].index,
      searchedBookmark[i].name,
      searchedBookmark[i].url
    );
  }
  bookmarkRecord.innerHTML = printedSearch;
}

function reArrangeArrayIndex(sourceArray) {
  for (var i = 0; i < sourceArray.length; i++) {
    sourceArray[i].index = i;
  }
  return sourceArray;
}

function printedHTML(index, name, url) {
  return `<tr class="border border-bottom border-1">
            <td>${index + 1}</td>
            <td>${name}</td>
            <td>
              <div class="btn btn-success">   
                <a
                  class="text-white text-decoration-none"
                  href="${url}"
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
              <a onclick="deleteBookmark(${index})" class="text-white text-decoration-none">
                <i class="fa-solid fa-trash"></i>
                <span>Delete</span>
                </a>
              </div>
            </td>
            <td>
              <div class="btn btn-primary">
              <a onclick="editBookmark(${index})" class="text-white text-decoration-none">
                <i class="fa-solid fa-save"></i>
                <span>Edit</span>
                </a>
              </div>
            </td>
          </tr>`;
}
