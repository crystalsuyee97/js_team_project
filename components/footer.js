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

customElements.define('main-footer', Footer);