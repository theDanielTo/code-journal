/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// parse local storage JSON & save into 'data' object
const prevDataJson = window.localStorage.getItem('journal-local-storage');
if (prevDataJson !== null) data = JSON.parse(prevDataJson);

// beforeunload => set local storage to 'data' JSON
window.addEventListener('beforeunload', function (event) {
  const dataJson = JSON.stringify(data);
  window.localStorage.setItem('journal-local-storage', dataJson);
});
