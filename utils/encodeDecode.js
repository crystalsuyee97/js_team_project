const checkUppercase = (characterCode) => characterCode > 64 && characterCode < 91;

const checkLowercase = (characterCode) => characterCode > 96 && characterCode < 123;

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

// caesar cipher
export function caesarCipher(value, n) {
  var tempValue = "";
  if (document.getElementById("caesarSwitch").checked) {
    tempValue = caesarDecode(value, n)
  }
  if (!document.getElementById("caesarSwitch").checked) {
    tempValue = caesarEncode(value, n)
  }
  document.getElementById("caesarText").innerHTML = tempValue;
}
function caesarEncode(value, n) {
  let tempArray = [];
  for (let i = 0; i < value.length; i++) {
    var characterCode = value.charCodeAt(i);
    if (checkUppercase(characterCode)) {
      tempArray.push(String.fromCharCode(((characterCode - 65 + n) % 26) + 65));
    } else if (checkLowercase(characterCode)) {
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
    if (checkUppercase(characterCode)) {
      tempArray.push(String.fromCharCode(((characterCode - 90 - n) % 26) + 90));
    } else if (checkLowercase(characterCode)) {
      tempArray.push(String.fromCharCode(((characterCode - 122 - n) % 26) + 122));
    } else {
      tempArray.push(String.fromCharCode(characterCode));
    }
  }
  return tempArray.join("");
}

//rot13 cipher
export function rot13cipher(value) {
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
export function vigenereCipher(value, code) {
  var tempValue = "";
  if (document.getElementById("vigSwitch").checked) {
    tempValue = vigenereDecoder(value.toUpperCase().replace(/\s/g, ''), code);
  }
  if (!document.getElementById("vigSwitch").checked) {
    tempValue = vigenereEncoder(value.toUpperCase().replace(/\s/g, ''), code);
  }
  document.getElementById("vigText").innerHTML = tempValue;
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