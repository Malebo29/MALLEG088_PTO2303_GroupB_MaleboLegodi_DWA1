import { LitElement, html, css } from './libs/lit-html';

class TallyCounter extends LitElement {
  static styles = css`
    :host {
      --color-green: #31c48d;
      --color-red-light: #f2dede;
      --color-red-dark: #a94442;
      --color-black: #000000;
      --color-white: #ffffff;
      --color-dark-grey: #33333d;
      --color-medium-grey: #424250;
      --color-light-grey: #9ca3ae;
      box-sizing: border-box;
      height: 100vh;
      margin: 0;
      background: var(--color-medium-grey);
      color: var(--color-white);
      font-family: 'Roboto', Arial, Helvetica, sans-serif;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  .counter {
    padding: 20px;
  }
  .counter__value {
    font-size: 2em;
    margin-bottom: 20px;
  }
  .counter__actions {
    display: flex;
    justify-content: space-between;
  }
  .counter__button {
    font-size: 2em;
    padding: 10px;
  }
  `;

  static properties = {
    count: { type: Number },
    state: { type: String },
    resetDisabled: { type: Boolean },
  };

  constructor() {
    super();
    this.count = 0;
    this.state = 'normal';
    this.resetDisabled = true;
    this.MAX_COUNT = 15;
    this.MIN_COUNT = -5;
  }

  render() {
    return html`
      <main class="counter">
        <input class="counter__value" readonly value="${this.count}">
        <div class="counter__actions">
          <sl-button variant="primary" @click="${this.decrement}" ?disabled="${this.state === 'minReached'}">-</sl-button>
          <sl-button variant="danger" @click="${this.reset}" ?disabled="${this.resetDisabled}">Reset</sl-button>
          <sl-button variant="success" @click="${this.increment}" ?disabled="${this.state === 'maxReached'}">+</sl-button>
        </div>
      </main>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('count')) {
      if (this.count >= this.MAX_COUNT) {
        this.state = 'maxReached';
      } else if (this.count <= this.MIN_COUNT) {
        this.state = 'minReached';
      } else {
        this.state = 'normal';
      }
      this.resetDisabled = this.count === 0;
    }
  }

  increment() {
    if (this.state !== 'maxReached') {
      this.count += 1;
    }
  }

  decrement() {
    if (this.state !== 'minReached') {
      this.count -= 1;
    }
  }

  reset() {
    this.count = 0;
  }
}

customElements.define('tally-counter', TallyCounter);