class TextInputBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <label for="textInput" class="textBoxInput">Please enter the text you would like to encode or decode below:</label>
    <textarea type="text" id="textInput" class="textInput" placeholder="Enter encoded/decoded text here!"></textarea>
    `
  }
}

class Columns extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <span class="cipherColumn">
      <p class="columnTitle">Caesar Cipher</p>
      <div class="columnTitle">
        <p style="display:inline-block">Encode/Decode</p>
        <label class="switch">
          <input type="checkbox" id="caesarSwitch" name="caesarSwitch"></input>
          <span class="slider round"></span>
        </label>
      </div>
      <div class="columnTitle">Rotation setting: 
        <input type="number" min=0 id="caesarSetting" value="1" style="width:45px"></input>
      </div>
      <textarea type="text" id="caesarText"></textarea> 
    </span>
    <span class="cipherColumn">
      <p class="columnTitle">ROT13 Cipher</p>
      <div class="columnTitle">
        <p style="display:inline-block">Encode/Decode</p>
        <label class="switch">
          <input type="checkbox" id="rotSwitch" name="rotSwitch"></input>
          <span class="slider round"></span>
        </label>
      </div>
      <textarea type="text" id="rot13Text"></textarea> 
    </span> 
    <span class="cipherColumn">
      <p class="columnTitle">Vigenère Cipher</p>
      <div class="columnTitle">
        <p style="display:inline-block">Encode/Decode</p>
        <label class="switch">
          <input type="checkbox" id="vigSwitch" name="vigSwitch"></input>
          <span class="slider round"></span>
        </label>
      </div>
      <div class="columnTitle">Key: 
        <input type="text" id="keyWord" value="LEMON" oninput="this.value = this.value.toUpperCase()"></input>
      </div>
      <textarea type="text" id="vigText"></textarea> 
    </span> 
    `;
  }
}

customElements.define('cipher-columns', Columns);
customElements.define('text-input-box', TextInputBox);