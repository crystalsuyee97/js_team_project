class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>        
        <h1 class="headerText">Welcome to DPT Vanilla Cipher Decoder/Encoder</h1>    
      </header>   
    `;
  }
}

customElements.define('main-header', Header);