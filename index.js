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

// NOT working quite right. reevaluate the math
function caesarDecode(value, n) {
  let tempArray = [];
  for (let i = 0; i < value.length; i++) {
    var characterCode = value.charCodeAt(i);
    if (characterCode > 64 && characterCode < 91) {
      tempArray.push(String.fromCharCode(((characterCode - 65 - n) % 26) + 64));
    } else if (characterCode > 96 && characterCode < 123) {
      tempArray.push(String.fromCharCode(((characterCode - 97 - n) % 26) + 97));
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
  return tempValue;
}

// const alpha = Array.from(Array(26)).map((e, i) => i + 65);
// creates array of alphabets rearranged
// const firstUppercase = alpha.map((x) => String.fromCharCode(x));
// const secondUppercase = firstUppercase.splice(13);
// const rot13Uppercase = [...secondUppercase, ...firstUppercase];
// const firstLowercase = alpha.map((x) => String.fromCharCode(x).toLocaleLowerCase());
// const secondLowercase = firstLowercase.splice(13);
// const rot13Lowercase = [...secondLowercase, ...firstLowercase];

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
  return tempArray.join("");
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
  return tempValue;
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

// decode func not working quite right
function vigenereDecoder(value, code) {
  code = generateKeyCode(value, code);
  let tempArray = [];
  var offset;
  for (let i = 0; i < code.length; i++) {
    offset = code.charCodeAt(i) - "A".charCodeAt(0);
    var characterCode = value.charCodeAt(i);
    if (characterCode > 64 && characterCode < 91) {
      tempArray.push(String.fromCharCode(((characterCode - 65 - offset) % 26) + 65));
    }
  }
  return tempArray.join("");
}

window.onload = function() {
  dateTime();
  getQuote();

  var rotationSetting = document.getElementById("caesarSetting");
  rotationSetting.addEventListener('input', function handleChange(event) {
    rotationSetting.value = event.target.value;
    document.getElementById("caesarText").innerHTML = caesarCipher(newInput, Number(rotationSetting.value));
  })
  var newInput = document.getElementById("textInput");
  var keyWord = document.getElementById("keyWord").value;
  newInput.addEventListener('input', function handleChange(event) {
    newInput = event.target.value;
    document.getElementById("caesarText").innerHTML = caesarCipher(newInput, Number(rotationSetting.value));
    document.getElementById("rot13Text").innerHTML = rot13cipher(newInput);
    document.getElementById("vigText").innerHTML = vigenereCipher(newInput, keyWord);
  });
  document.getElementById("caesarSwitch").addEventListener('input', function handleChange() {
    document.getElementById("caesarText").innerHTML = caesarCipher(newInput, Number(rotationSetting.value));
  })
  document.getElementById("vigSwitch").addEventListener('input', function handleChange() {
    document.getElementById("vigText").innerHTML = vigenereCipher(newInput, keyWord);
  })
  document.getElementById("keyWord").addEventListener('input', function handleChange(event) {
    keyWord = event.target.value;
    document.getElementById("vigText").innerHTML = vigenereCipher(newInput, keyWord);
  })
}