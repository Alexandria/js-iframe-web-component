// Function to generate a random string/token
const generateToken = () => Math.random().toString(36).substring(2, 15);
const lexiconStyles = new CSSStyleSheet();

lexiconStyles.replaceSync(`
    :host {
      --container-background-color:aliceblue;
      --container-width:50vw;
      --container-height:

    }
    
    .main-container{
      display:flex;
      background-color:var(--container-background-color);
      width:var(--container-width);
      min-width:300px;
      align-items: stretch;
    }

    iframe{
      width:100%;
      height:280px;
      min-width:300px;
      border:0px;
    }

  `);

export class LexiconForm extends HTMLElement {
  #securityToken = generateToken();

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
  }

  #render() {
    this.shadowRoot.innerHTML = `<div id="secure-payment-form" class="main-container" ></div>`;
    this.shadowRoot.adoptedStyleSheets = [lexiconStyles];
  }
  connectedCallback() {
    this.#render();
    this.#initIframe();
    this.#initPostMessageListener();
  }

  #getIframeHost() {
    const host = this.getAttribute("iframe-host");
    if (!host) {
      console.error(
        "LexiconForm requires the 'iframe-host' attribute to load the secure iframe."
      );
      return null;
    }

    return host;
  }

  #initIframe = () => {
    const iframe = document.createElement("iframe");
    const host = this.#getIframeHost();
    if (!host) return;

    const iframeSource = host + "/?token=" + this.#securityToken;
    iframe.src = iframeSource;
    iframe.setAttribute("sandbox", "allow-scripts allow-forms allow-popups");

    this.shadowRoot.getElementById("secure-payment-form").append(iframe);
  };

  // Custom event helper
  #dispatchStatusEvent = (type, detail = {}) => {
    console.log("dispatchStatusEvent");
    const event = new CustomEvent(`lexicon-${type}`, {
      detail: detail,
      composed: true,
      bubbles: true,
    });
    this.dispatchEvent(event);
  };

  #handlePostmessage = async (event) => {
    const { cardNumber, cvv, action, validationToken } = event.data;
    if (action !== "form-submit") return;

    if (validationToken !== this.#securityToken) {
      console.error("Unauthorized action");
      return;
    }

    this.#dispatchStatusEvent("processing", {
      message: "Submission started.",
    });

    try {
      const response = await fetch("http://localhost:4000/api/v1/submit", {
        method: "POST",
        body: JSON.stringify({ cardNumber, cvv }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        this.dispatchEvent("failure", {
          message: "Failed to process payments",
        });
      }

      const result = await response.json();
      if (result.status == "success") {
        this.#dispatchStatusEvent("success", {
          message: "Successfully processed payment",
          token: result.data.paymentToken,
          maskedCard: result.data.maskedCard,
        });
      } else {
        throw new Error("Submission failed due to server error");
      }
    } catch (error) {
      this.#dispatchStatusEvent(this, "failure", {
        message: "Network or processing error",
        error: error.message,
      });
    }
  };

  #initPostMessageListener = () => {
    window.addEventListener("message", this.#handlePostmessage, false);
  };
}

customElements.define("lexicon-form", LexiconForm);
