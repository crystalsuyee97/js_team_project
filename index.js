// import { checkLowercase } from "./utils/helpers";
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

// caesar cipher
function caesarEncode(value, n) {
  let tempArray = [];
  for (let i = 0; i < value.length; i++) {
    var characterCode = value.charCodeAt(i);
    if (characterCode > 64 && characterCode < 91) {
      tempArray.push(String.fromCharCode(((characterCode - 65 + n) % 26) + 65));
    } else if (characterCode > 96 && characterCode < 123) {
      tempArray.push(String.fromCharCode(((characterCode - 97 + n) % 26) + 97));
    } else {
      tempArray.push(String.fromCharCode(characterCode));
    }
  }
  return tempArray.join("");
}

function caesarDecode(value, n) {
  let tempArray = [];
  for (let i = 0; i < value.length; i++) {
    var characterCode = value.charCodeAt(i);
    if (characterCode > 64 && characterCode < 91) {
      tempArray.push(String.fromCharCode(((characterCode - 90 - n) % 26) + 90));
    } else if (characterCode > 96 && characterCode < 123) {
      tempArray.push(String.fromCharCode(((characterCode - 122 - n) % 26) + 122));
    } else {
      tempArray.push(String.fromCharCode(characterCode));
    }
  }
  return tempArray.join("");
}

function caesarCipher(value, n) {
  var tempValue = "";
  if (document.getElementById("caesarSwitch").checked) {
    tempValue = caesarDecode(value, n)
  }
  if (!document.getElementById("caesarSwitch").checked) {
    tempValue = caesarEncode(value, n)
  }
  document.getElementById("caesarText").innerHTML = tempValue;
}

//rot13 cipher
function rot13cipher(value) {
  let tempArray = [];
  for (let i = 0; i < value.length; i++) {
    var characterCode = value.charCodeAt(i);
    if ((characterCode >=65 && characterCode <= 77) || (characterCode >=97 && characterCode <= 109)) {
      tempArray.push(String.fromCharCode(characterCode + 13));
    } else if ((characterCode >=78 && characterCode <= 90) || (characterCode >=110 && characterCode <= 122)) {
      tempArray.push(String.fromCharCode(characterCode - 13));
    } else {
      tempArray.push(String.fromCharCode(characterCode));
    }
  }
  document.getElementById("rot13Text").innerHTML = tempArray.join("");
}

// vigenere cipher
function vigenereCipher(value, code) {
  var tempValue = "";
  if (document.getElementById("vigSwitch").checked) {
    tempValue = vigenereDecoder(value.toUpperCase().replace(/\s/g, ''), code);
  }
  if (!document.getElementById("vigSwitch").checked) {
    tempValue = vigenereEncoder(value.toUpperCase().replace(/\s/g, ''), code);
  }
  console.log(tempValue)
  document.getElementById("vigText").innerHTML = tempValue;
}

function generateKeyCode(value, code) {
  if (code.length < value.length) {
    const addKeyNum = value.length - code.length;
    for (let i = 0; i < addKeyNum; i++) {
      code = code.concat(code[i])
    }
  } else if (code.length > value.length) {
    code = code.slice(0, value.length);
  }
  return code;
}

function vigenereEncoder(value, code) {
  code = generateKeyCode(value, code);
  let tempArray = [];
  var offset;
  for (let i = 0; i < code.length; i++) {
    offset = code.charCodeAt(i) - "A".charCodeAt(0);
    var characterCode = value.charCodeAt(i);
    if (characterCode > 64 && characterCode < 91) {
      tempArray.push(String.fromCharCode(((characterCode - 65 + offset) % 26) + 65));
    }
  }
  return tempArray.join("");
}

function vigenereDecoder(value, code) {
  code = generateKeyCode(value, code);
  let tempArray = [];
  var offset;
  for (let i = 0; i < code.length; i++) {
    offset = code.charCodeAt(i) - "A".charCodeAt(0);
    var characterCode = value.charCodeAt(i);
    if (characterCode > 64 && characterCode < 91) {
      tempArray.push(String.fromCharCode(((characterCode - 90 - offset) % 26) + 90));
    }
  }
  return tempArray.join("");
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
  console.log(event.target.id)
  let input = document.getElementById("textInput").value;
  let rotationSetting = Number(document.getElementById("caesarSetting").value);
  let code = this.document.getElementById("keyWord").value;
  caesarCipher(input, rotationSetting);
  rot13cipher(input);
  vigenereCipher(input, code);
})
