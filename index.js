window.onload = function() {
  var currentDate = new Date();
  var quote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  document.getElementById("date").innerHTML = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
  document.getElementById("quote").innerHTML = quote;

  var rotationSetting = document.getElementById("caesarSetting");
  rotationSetting.addEventListener('input', function handleChange(event) {
    rotationSetting.value = event.target.value;
    document.getElementById("caesarText").innerHTML = caesarCipher(newInput, Number(rotationSetting.value));
  })
  var newInput = document.getElementById("textInput");
  newInput.addEventListener('input', function handleChange(event) {
    newInput = event.target.value;
    document.getElementById("caesarText").innerHTML = caesarCipher(newInput, Number(rotationSetting.value));
  });
}

// const alpha = Array.from(Array(26)).map((e, i) => i + 65);
// const alphabet = alpha.map((x) => String.fromCharCode(x).toLocaleLowerCase());
// const stringArray = (inputText.toLowerCase()).split("")
// console.log(stringArray)
// console.log(inputText.charCodeAt())

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
    <div class="cipherColumn">
      <span>
        <p class="columnTitle">ROT13 Cipher</p>
        <textarea type="text"></textarea> 
      </span> 
    </div> 
    <div class="cipherColumn">
      <span>
        <p class="columnTitle">Vigenere Cipher</p>
        <textarea type="text"></textarea> 
      </span> 
    </div>
    `;
  }
}

customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('cipher-columns', Columns);