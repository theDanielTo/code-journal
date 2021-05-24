/* global data */
/* exported data */

const entryForm = document.querySelector('form');
const formImg = document.querySelector('#form-image');
const titleInput = document.querySelector('#title-input');
const photoUrlInput = document.querySelector('#entry-photo-url');
const notesTextArea = document.querySelector('#new-entry-notes');

photoUrlInput.addEventListener('input', function (event) {
  formImg.src = event.target.value;
});

entryForm.addEventListener('submit', function (event) {
  const newEntry = {
    title: '',
    imgUrl: '',
    notes: '',
    id: 0
  };

  newEntry.title = titleInput.value;
  newEntry.imgUrl = photoUrlInput.value;
  newEntry.notes = notesTextArea.value;
  newEntry.id = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  event.preventDefault();
  formImg.src = 'images/placeholder-image-square.jpg';
  titleInput.value = '';
  photoUrlInput.value = '';
  notesTextArea.value = '';
});
