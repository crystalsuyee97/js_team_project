window.onload = function() {
  dateTime();
  getQuote();

  var rotationSetting = document.getElementById("caesarSetting");
  rotationSetting.addEventListener('input', function handleChange(event) {
    rotationSetting.value = event.target.value;
    document.getElementById("caesarText").innerHTML = caesarCipher(newInput, Number(rotationSetting.value));
  })
  var newInput = document.getElementById("textInput");
  newInput.addEventListener('input', function handleChange(event) {
    newInput = event.target.value;
    document.getElementById("caesarText").innerHTML = caesarCipher(newInput, Number(rotationSetting.value));
    document.getElementById("rot13Text").innerHTML = rot13decoder(newInput);
  });
  var caesarInput = document.getElementById("caesarText");
  caesarInput.addEventListener('input', function handleChange(event) {
    caesarInput = event.target.value;
    document.getElementById("textInput").innerHTML = caesarCipher(caesarInput, Number(rotationSetting.value));
  })
}

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
function caesarCipher(value, n) {
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

// const alpha = Array.from(Array(26)).map((e, i) => i + 65);
// creates array of alphabets rearranged
// const firstUppercase = alpha.map((x) => String.fromCharCode(x));
// const secondUppercase = firstUppercase.splice(13);
// const rot13Uppercase = [...secondUppercase, ...firstUppercase];
// const firstLowercase = alpha.map((x) => String.fromCharCode(x).toLocaleLowerCase());
// const secondLowercase = firstLowercase.splice(13);
// const rot13Lowercase = [...secondLowercase, ...firstLowercase];

//rot13 decoder
function rot13decoder(value) {
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

class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>        
        <h1 class="headerText">Welcome to DPT Vanilla Cipher Decoder/Encoder</h1>    
      </header>   
    `;
  }
}

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
      <span id="date"></span>
      <span id ="quote"></span>
    </footer>  
    `;
  }
}

class Columns extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <span class="cipherColumn">
      <p class="columnTitle">Caesar Cipher</p>
      <div class="columnTitle">Rotation setting: 
        <input type="number" min=0 id="caesarSetting" value="0"></input>
      </div>
      <textarea type="text" id="caesarText"></textarea> 
    </span class="cipherColumn">
    <span class="cipherColumn">
      <p class="columnTitle">ROT13 Cipher</p>
      <textarea type="text" id="rot13Text"></textarea> 
    </span> 
    <span class="cipherColumn">
      <p class="columnTitle">Vigenere Cipher</p>
      <textarea type="text" id="vigText"></textarea> 
    </span> 
    `;
  }
}

customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('cipher-columns', Columns);