/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const prevDataJson = window.localStorage.getItem('journal-local-storage');
if (prevDataJson !== null) data = JSON.parse(prevDataJson);

window.addEventListener('beforeunload', function (event) {
  const dataJson = JSON.stringify(data);
  window.localStorage.setItem('journal-local-storage', dataJson);
});
