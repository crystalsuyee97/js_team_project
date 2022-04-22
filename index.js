window.onload = function() {
  var currentDate = new Date();
  var quote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";
  document.getElementById("date").innerHTML = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
  document.getElementById("quote").innerHTML = quote;
}

// const alpha = Array.from(Array(26)).map((e, i) => i + 65);
// const alphabet = alpha.map((x) => String.fromCharCode(x).toLocaleLowerCase());
// const stringArray = (inputText.toLowerCase()).split("")
// console.log(stringArray)
// console.log(inputText.charCodeAt())
var newInput = document.getElementById("textInput");
newInput.addEventListener('input', function handleChange(event) {
  newInput = event.target.value;
  caesarCipher(newInput, 2);
});

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
  var newString = tempArray.join("")
  console.log(newString)
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
      <span id ="quote">Hello</span>
    </footer>  
    `;
  }
}

class Column extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="cipherColumn">
      <textarea type="text"></textarea>
    </div>   
    `;
  }
}

customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('cipher-column', Column);