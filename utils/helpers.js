// realtime clock
function refreshRate() {
  var refresh = 1000;
  setTimeout('dateTime()', refresh);
}
function dateTime() {
  var currentDate = new Date();
  document.getElementById("date").innerHTML = currentDate.toUTCString();
  refreshRate();
}