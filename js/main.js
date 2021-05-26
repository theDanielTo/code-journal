/* global data */
/* exported data */

const $headerContainer = document.querySelector('.header-tabs');
const $pages = document.querySelectorAll('.page');

const $entryForm = document.querySelector('form');
const $formImg = document.querySelector('#form-image');
const $titleInput = document.querySelector('#title-input');
const $photoUrlInput = document.querySelector('#entry-photo-url');
const $notesTextArea = document.querySelector('#new-entry-notes');
const $saveBtn = document.querySelector('.save-btn');

const $greyedBg = document.querySelector('.modal-bg');
const $deleteBtn = document.querySelector('.delete-btn');
const $deleteModal = document.querySelector('.delete-verify-modal');
const $cancelBtn = document.querySelector('.cancel-btn');
const $confirmBtn = document.querySelector('.confirm-btn');

const $entriesList = document.querySelector('ol');
const $newEntryBtn = document.querySelector('#new-btn');
const $noEntriesP = document.querySelector('#no-entries-p');

window.addEventListener('load', function (event) {
  if (data.view === 'entry-form') {
    $entryForm.parentElement.classList.remove('hidden');
    $entriesList.parentElement.classList.add('hidden');
  } else {
    $entryForm.parentElement.classList.add('hidden');
    $entriesList.parentElement.classList.remove('hidden');
  }
});

$headerContainer.addEventListener('click', function () {
  if (event.target.parentNode.className === 'header-tab') {
    const tabDataViewAttr = event.target.parentNode.getAttribute('data-view');
    for (const page of $pages) {
      if (page.getAttribute('data-view') === tabDataViewAttr) {
        page.classList.remove('hidden');
        data.view = tabDataViewAttr;
      } else {
        page.classList.add('hidden');
      }
    }
  }
});

$newEntryBtn.addEventListener('click', function () {
  document.getElementById('form-header').textContent = 'New Entry';
  $deleteBtn.classList.add('hidden');
  $saveBtn.parentElement.className = 'row flex-end';
  $entryForm.parentElement.classList.remove('hidden');
  $entriesList.parentElement.classList.add('hidden');
  data.view = 'entry-form';
});

$photoUrlInput.addEventListener('input', function (event) {
  $formImg.src = event.target.value;
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (data.editing !== null) {

    data.editing.title = $titleInput.value;
    data.editing.imgUrl = $photoUrlInput.value;
    data.editing.notes = $notesTextArea.value;
    const dataEntriesIndexChange = data.entries.length - data.editing.id;
    data.entries[dataEntriesIndexChange] = data.editing;

    for (const $entry of $entriesList.childNodes) {
      if ($entry.className === 'row') {
        const entryIdNum = parseInt($entry.getAttribute('data-entry-id'));
        if (entryIdNum === data.editing.id) {
          $entriesList.replaceChild(renderEntry(data.editing), $entry);
        }
      }
    }

  } else {
    const newEntry = {
      title: '',
      imgUrl: '',
      notes: '',
      id: 0
    };

    newEntry.title = $titleInput.value;
    newEntry.imgUrl = $photoUrlInput.value;
    newEntry.notes = $notesTextArea.value;
    newEntry.id = data.nextEntryId;

    data.nextEntryId++;
    data.entries.unshift(newEntry);

    $entriesList.prepend(renderEntry(newEntry));
    if ($entriesList.childElementCount > 1) {
      document.querySelector('#no-entries-p').classList.add('hidden');
    }
    $notesTextArea.value = '';
  }
  $formImg.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();

  $entryForm.parentElement.classList.add('hidden');
  $entriesList.parentElement.classList.remove('hidden');
  $headerContainer.lastElementChild.classList.remove('hidden');
  data.view = 'entries';
  data.editing = null;
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (const entry of data.entries) {
    $entriesList.appendChild(renderEntry(entry));
  }
  if ($entriesList.childElementCount > 1) {
    $noEntriesP.className = 'hidden';
  }
});

function renderEntry(entry) {
  const $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $divRow.setAttribute('data-entry-id', entry.id);
  const $imgCol = document.createElement('div');
  $imgCol.setAttribute('class', 'column-half');
  const $img = document.createElement('img');
  const $textCol = document.createElement('div');
  $textCol.setAttribute('class', 'column-half');
  const $titleRow = document.createElement('div');
  $titleRow.setAttribute('class', 'row space-between');
  const $title = document.createElement('h3');
  const $editIcon = document.createElement('img');
  $editIcon.src = 'images/editicon.svg';
  $editIcon.id = 'edit-icon';
  const $notes = document.createElement('p');

  $divRow.appendChild($imgCol);
  $imgCol.appendChild($img);
  $divRow.appendChild($textCol);
  $textCol.appendChild($titleRow);
  $titleRow.appendChild($title);
  $titleRow.appendChild($editIcon);
  $textCol.appendChild($notes);

  $divRow.addEventListener('click', function (event) {
    if (event.target.id === 'edit-icon') {
      $saveBtn.parentElement.className = 'row space-between';
      $entryForm.parentElement.classList.remove('hidden');
      $entriesList.parentElement.classList.add('hidden');
      data.view = 'entry-form';
      for (const entry of data.entries) {
        if (entry.id === parseInt($divRow.getAttribute('data-entry-id'))) {
          $deleteBtn.classList.remove('hidden');
          data.editing = entry;
          $formImg.setAttribute('src', entry.imgUrl);
          $titleInput.value = entry.title;
          $photoUrlInput.value = entry.imgUrl;
          $notesTextArea.textContent = entry.notes;

          document.getElementById('form-header').textContent = 'Edit Entry';
          $headerContainer.lastElementChild.classList.add('hidden');
        }
      }
    }
  });

  $img.setAttribute('src', entry.imgUrl);
  $title.textContent = entry.title;
  $notes.textContent = entry.notes;

  return $divRow;
}

$deleteBtn.addEventListener('click', function (event) {
  $deleteModal.classList.remove('hidden');
  $greyedBg.className = 'modal-bg greyed-bg';
});

$cancelBtn.addEventListener('click', function (event) {
  $deleteModal.classList.add('hidden');
  $greyedBg.classList.add('hidden');
});

$confirmBtn.addEventListener('click', function (event) {
  for (const entry of $entriesList.childNodes) {
    if (entry.className === 'row') {
      const entryIdNum = parseInt(entry.getAttribute('data-entry-id'));
      if (entryIdNum === data.editing.id) {
        $entriesList.removeChild(entry);
        for (let i = 0; i < data.entries.length; i++) {
          if (data.entries[i].id === entryIdNum) {
            data.entries.splice(i, 1);
            break;
          }
        }
      }
    }
  }
  if ($entriesList.childElementCount === 0) {
    $noEntriesP.classList.remove('hidden');
  }
  $formImg.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
  $notesTextArea.textContent = '';
  data.editing = null;
  $entryForm.parentElement.classList.add('hidden');
  $entriesList.parentElement.classList.remove('hidden');
  $headerContainer.lastElementChild.classList.remove('hidden');
  $deleteBtn.classList.remove('hidden');
  $deleteModal.classList.add('hidden');
  $greyedBg.classList.add('hidden');
  data.view = 'entries';
});
