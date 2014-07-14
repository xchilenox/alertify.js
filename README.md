[![Build status](https://secure.travis-ci.org/alertifyjs/alertify.js.png)](http://travis-ci.org/alertifyjs/alertify.js)

Alertify is an unobtrusive customizable JavaScript notification system.

## Usage

Need to add this.

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

The test runner is at `test/runner.html`. Please run `gulp test` to make sure any changes are passing all tests.

Alternately, you can view the tests at 
[http://localhost:9000/tests/runner.html](http://localhost:9000/tests/runner.html)
if you're using the built-in static web server. When combined with gulp watch and a browser tab open to
[http://localhost:9000/tests/runner.html](http://localhost:9000/tests/runner.html) you'll get real-time test
output with every change.

## License

Alertify is licensed under MIT http://www.opensource.org/licenses/MIT

### Copyright

Copyright (c) 2012, Fabien Doiron  
<fabien.doiron@gmail.com>, [@fabien_doiron](http://twitter.com/fabien_doiron)

Copyright (c) 2014, Brad Berger
<brad@bradb.net>, [@berger_brad](https://twitter.com/berger_brad)
