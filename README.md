[![Build status](https://secure.travis-ci.org/alertifyjs/alertify.js.png)](http://travis-ci.org/alertifyjs/alertify.js)

Alertify is an unobtrusive customizable JavaScript notification system. It supports
various dialogs including alert, confirm, prompt and HTML5 notifications. It's easy to
configure custom labels and callbacks, too.

It's extremely lightweight - ~1.4 kB gzip'd JavaScript and less than 1 kB of gzip'd CSS. 
Written in pure JavaScript - so it has no external dependencies like jQuery, etc. 
It can be loaded asynchronously with no special configuration.

## Browser Support

Modern browsers are supported (IE 9 and greater, most mobile browsers, etc.)

## Loading

### Insert into HTML

    <!-- ideally at the bottom of the page -->
    <!-- also works in the <head> -->
    <script src="PATH_TO_FILE/alertify.min.js"></script>
        
### Include the CSS (default theme)

    <!-- include the default theme -->
    <link rel="stylesheet" href="PATH_TO_FILE/alertify.css" />
        


### Using RequireJS
If you're using [RequireJS](//requirejs.org) you use `require()`

    var alertify = require("alertify");


### CDN
You can easily load it via the [jsDelivr CDN](http://www.jsdelivr.com/#!alertify.js).

### Via Bower
Just run `bower install alertifyjs` or add to your `bower.json` file:

    {
        "dependencies": {
            "alertifyjs": "~0.5"
        }
    }



## Usage

For more details, see the `index.html` file and the `assets/js/example.js` file.

### HTML Markup
Example HTML markup looks like this.

    <div id="alertifyCover" class="alertify-cover alertify-hidden"></div>
    <section id="alertifyDialog" class="alertify alertify-close" aria-labelledby="alertifyTitle" aria-hidden="true">
        <div class="alertify-body">
            <p id="alertifyTitle" class="alertify-title"></p>
            <input type="text" id="alertifyInput" class="alertify-input" aria-hidden="true">
            <nav id="alertifyButtons" class="alertify-buttons">
                <button id="alertifyButtonCancel" class="alertify-button alertify-button-cancel"
                        aria-hidden="true"></button>
                <button id="alertifyButtonOk" class="alertify-button alertify-button-ok" aria-hidden="true"></button>
            </nav>
            <a id="alertifyFocusReset" class="alertify-focus-reset" href="#" aria-hidden="true"></a>
        </div>
    </section>
    

### JavaScript

#### Alert Dialog

    var alert = alertify.alert("This is an alert dialog");
    alert.show();
        
#### Confirm Dialog

    var confirm = alertify.confirm("This is a confirm dialog");
    confirm.ok = function () {
        console.log("clicked ok");
    };
    confirm.cancel = function () {
        console.log("clicked cancel");
    };
    confirm.show();
        
#### Confirm dialog with custom labels

    var confirm = alertify.confirm("Confirm dialog with custom button labels");
    confirm.ok = function () {
        console.log("clicked ok");
    };
    confirm.cancel = function () {
        console.log("clicked cancel");
    };
    confirm.show();
        
#### Prompt dialog

    var prompt = alertify.prompt("This is a prompt dialog", "Default Value");
    prompt.ok = function (value) {
        console.log("clicked ok with: " + value);
    };
    prompt.cancel = function () {
        console.log("clicked cancel");
    };
    prompt.show();

#### HTML5 Notification

*When HTML5 notifications are not supported in the browser, it falls back
to a simple alert dialog, with only the title (the first parameter) being displayed.*

    
    var notification = alertify.notification(
        "This is a HTML5 notification (with fallback support).",
        {
            dir: "ltr",
            lang: "en-us",
            body: "It can have body text and an icon, too!",
            id: "html5notification",
            icon: "https://lorempixel.com/64/64"
        },
        {
            onclick: function() {
                alert("You clicked the HTML5 notification!");
            }
        }
    );

    notification.show();
        


## Development

### Setting Up the Dev Environment

Alertify uses Bower, NPM, and GruntJS.

To get started, clone the repo. Then run:

    npm update
    bower update

The development environment is set up with a static file server and LiveReload.
To view and test in your browser, run:

    gulp watch
        
Any changes made to the core files will automatically reload the page if you have a LiveReload plugin
installed in your browser. The default test page will be at
[http://localhost:9000/index.html](http://localhost:9000/index.html)

### Tests

The test runner is at `test/runner.html`. 

Alternately, you can view the tests at 
[http://localhost:9000/tests/runner.html](http://localhost:9000/tests/runner.html)
if you're using the built-in static web server. When combined with gulp watch and a browser tab open to
[http://localhost:9000/tests/runner.html](http://localhost:9000/tests/runner.html) you'll get real-time test
output with every change.

Please run `gulp test` to make sure any changes are passing all tests and submit tests for
all new functionality in any PR.

## License

Alertify is licensed under MIT http://www.opensource.org/licenses/MIT

### Copyright

Copyright (c) 2012, Fabien Doiron  
<fabien.doiron@gmail.com>, [@fabien_doiron](http://twitter.com/fabien_doiron)

Copyright (c) 2014, Brad Berger
<brad@bradb.net>, [@berger_brad](https://twitter.com/berger_brad)
