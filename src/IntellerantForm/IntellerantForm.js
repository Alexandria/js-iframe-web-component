class IntellerantForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.iframeOrigins = [
      'https://vitejsviteqpuv6pab-miyx--3001--cf284e50.local-corp.webcontainer.io',
    ];
  }
  connectedCallback() {
    this.initIframe();
  }

  initIframe() {
    const iframe = document.createElement('iframe');
    const iframeSource = this.iframeOrigins[0] + '/iframe-content-form.html';
    console.log('iframe orgines' + iframeSource);
    iframe.src = iframeSource;
    iframe.setAttribute('sandbox', 'allow-scripts allow-forms allow-popups');
    iframe.style.width = '50%';
    iframe.style.height = '500px';

    this.shadowRoot.append(iframe);
  }

  create(contianerId) {
    const container = document.getElementById(contianerId);
  }
}

customElements.define('intellerant-form', IntellerantForm);
