import {
  caesarCipher,
  rot13cipher,
  vigenereCipher
} from "./utils/encodeDecode";
import { dateTime } from "./utils/helpers";
// changing quote in footer
var quotes = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
],
index=-1;
function getQuote(){
  index = (index + 1) % quotes.length;
  document.getElementById("quote").innerHTML = quotes[index];
  setTimeout(getQuote, 5000);
}

// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//     document.getElementById("header").style.fontSize = "30px";
//   } else {
//     document.getElementById("header").style.fontSize = "50px";
//   }
// }

dateTime();
getQuote();

window.addEventListener('input', function handleChange(event) {
  let input = document.getElementById("textInput").value;
  let rotationSetting = Number(document.getElementById("caesarSetting").value);
  let code = this.document.getElementById("keyWord").value;
  caesarCipher(input, rotationSetting);
  rot13cipher(input);
  vigenereCipher(input, code);
})
