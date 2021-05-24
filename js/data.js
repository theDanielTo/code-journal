/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const prevDataJSON = window.localStorage.getItem('journal-local-storage');
if (prevDataJSON !== null) data = JSON.parse(prevDataJSON);

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  window.localStorage.setItem('journal-local-storage', dataJSON);
});
