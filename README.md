# 💳 LexiconForm:

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/Alexandria/js-iframe-web-component)

### Demo Here: https://jf-iframe-web-component.netlify.app

#### 🚀 Getting Started

This component is provided as a JavaScript module that defines the custom
element <lexicon-form>.

1. Installation You can include the `LexiconForm.js` in your main applications
   HTML page

```<!DOCTYPE html>
<html lang="en">
<head>
    <title>Parent Application</title>
</head>
<body>
    <h1>Payment Integration</h1>

    <div id="payment-container">
        <lexicon-form iframe-host="https://lexicon-iframe.netlify.app"></lexicon-form>
    </div>

    <script type="module" src="path/to/LexiconForm.js"></script>
</body>
</html>
```

#### 👀Events

- **lexicon-processing** Fired when the form is submitted and the tokenization
  process begins.,{ message: string }
- **lexicon-success** Fired upon successful API tokenization.,"{ token: string,
  maskedCard: string, ... }"
- **lexicon-failure** Fired if the API request fails or returns a submission
  error.,"{ message: string, error: string }"

#### 🔧 Component Customization

The component exposes CSS Custom Properties that can be overridden by the host
application to match its styling.

- **--container-background-color** : Background color of the main
  container/wrapper.
- **--container-width**: Maximum width of the component

##### css example

```
lexicon-form {
    /* Override the background and set a fixed max-width */
    --container-background-color: #f7f7f7;
    --container-width: 400px;
    /* You can also add standard CSS */
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
}

```
