/* global data */
/* exported data */

const $headerContainer = document.querySelector('.header-tabs');
const $pages = document.querySelectorAll('.page');

const $entryForm = document.querySelector('form');
const $formImg = document.querySelector('#form-image');
const $titleInput = document.querySelector('#title-input');
const $photoUrlInput = document.querySelector('#entry-photo-url');
const $notesTextArea = document.querySelector('#new-entry-notes');

const $entriesList = document.querySelector('ol');
const $newEntryBtn = document.querySelector('#new-btn');

window.addEventListener('load', function (event) {
  if (data.view === 'entry-form') {
    $entryForm.parentElement.className = 'container page';
    $entriesList.parentElement.className = 'container page hidden';
  } else {
    $entryForm.parentElement.className = 'container page hidden';
    $entriesList.parentElement.className = 'container page';
  }
});

$headerContainer.addEventListener('click', function () {
  if (event.target.parentNode.className === 'header-tab') {
    const tabDataViewAttr = event.target.parentNode.getAttribute('data-view');
    for (const page of $pages) {
      if (page.getAttribute('data-view') === tabDataViewAttr) {
        page.className = 'container page';
        data.view = tabDataViewAttr;
      } else {
        page.className = 'container page hidden';
      }
    }
  }
});

$newEntryBtn.addEventListener('click', function () {
  $entryForm.parentElement.className = 'container page';
  $entriesList.parentElement.className = 'container page hidden';
  data.view = 'entry-form';
});

$photoUrlInput.addEventListener('input', function (event) {
  $formImg.src = event.target.value;
});

$entryForm.addEventListener('submit', function (event) {
  const newEntry = {
    title: '',
    imgUrl: '',
    notes: '',
    id: 0
  };

  event.preventDefault();
  newEntry.title = $titleInput.value;
  newEntry.imgUrl = $photoUrlInput.value;
  newEntry.notes = $notesTextArea.value;
  newEntry.id = data.nextEntryId;

  data.nextEntryId++;
  data.entries.unshift(newEntry);

  $formImg.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();

  $entriesList.prepend(renderEntry(newEntry));
  if ($entriesList.childElementCount > 1) {
    document.querySelector('#no-entries-p').className = 'hidden';
  }
  $entryForm.parentElement.className = 'container page hidden';
  $entriesList.parentElement.className = 'container page';
  data.view = 'entries';
});

window.addEventListener('DOMContentLoaded', function (event) {
  for (const entry of data.entries) {
    $entriesList.appendChild(renderEntry(entry));
  }
  if ($entriesList.childElementCount > 1) {
    document.querySelector('#no-entries-p').className = 'hidden';
  }
});

function renderEntry(entry) {
  const $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  const $imgCol = document.createElement('div');
  $imgCol.setAttribute('class', 'column-half');
  const $img = document.createElement('img');
  const $textCol = document.createElement('div');
  $textCol.setAttribute('class', 'column-half');
  const $title = document.createElement('h3');
  const $notes = document.createElement('p');

  $divRow.appendChild($imgCol);
  $imgCol.appendChild($img);
  $divRow.appendChild($textCol);
  $textCol.appendChild($title);
  $textCol.appendChild($notes);

  $img.setAttribute('src', entry.imgUrl);
  $title.textContent = entry.title;
  $notes.textContent = entry.notes;

  return $divRow;
}
