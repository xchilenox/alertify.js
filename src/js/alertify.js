(function() {

    "use strict";

    var TRANSITION_FALLBACK_DURATION = 1000;
    var hideElement = function(el) {

        if(!el) {
            return;
        }

        var removeThis = function() {
            if(el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };

        el.classList.remove("alertify-show");
        el.classList.add("alertify-hide");
        el.addEventListener("transitionend", removeThis);

        // Fallback for no transitions.
        setTimeout(removeThis, TRANSITION_FALLBACK_DURATION);

    };

    function Alertify() {

        /**
         * Alertify private object
         * @type {Object}
         */
        var _alertify = {
            parent: document.body,
            version: "1.0.11",
            defaultOkLabel: "Ok",
            okLabel: "Ok",
            defaultCancelLabel: "Cancel",
            cancelLabel: "Cancel",
            defaultMaxToastItems: 2,
            maxToastItems: 2,
            title: "",
            promptValue: "",
            promptPlaceholder: "",
            closeToastOnClick: false,
            closeToastOnClickDefault: false,
            delay: 5000,
            defaultDelay: 5000,
            toastContainerClass: "alertify-toast",
            toastContainerDefaultClass: "alertify-toast",
            dialogs: {
                buttons: {
                    holder: "<div class='alertify-footer'>{{buttons}}</div>",
                    ok: "<button class='btn btn-primary btn-ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='btn btn-default btn-cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<div class='form-group'><input type='text' class='form-control' /></div>",
                message: "<p>{{message}}</p>",
                toast: "<div class='{{class}}'>{{message}}</div>"
            },

            defaultDialogs: {
                buttons: {
                    holder: "<div class='alertify-footer'>{{buttons}}</div>",
                    ok: "<button class='btn btn-primary btn-ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='btn btn-default btn-cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<div class='form-group'><input type='text' class='form-control' /></div>",
                message: "<p>{{message}}</p>",
                toast: "<div class='{{class}}'>{{message}}</div>"
            },

            /**
             * Build the proper message box
             *
             * @param  {Object} item    Current object in the queue
             *
             * @return {String}         An HTML string of the message box
             */
            build: function(item) {

                var btnTxt = this.dialogs.buttons.ok;
                var title = (this.title != "") ? "<h3 class='alertify-title'>" + this.title + "</h3>" : "";
                var html = "<div class='alertify-main'><div class='alertify-content'>" + title + this.dialogs.message.replace("{{message}}", item.message);

                if(item.type === "confirm" || item.type === "prompt") {
                    btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
                }

                if(item.type === "prompt") {
                    html += this.dialogs.input;
                }

                html = (html + "</div>" + this.dialogs.buttons.holder + "</div>")
                  .replace("{{buttons}}", btnTxt)
                  .replace("{{ok}}", this.okLabel)
                  .replace("{{cancel}}", this.cancelLabel);

                return html;
            },

            setCloseToastOnClick: function(bool) {
                this.closeToastOnClick = !! bool;
            },

            /**
             * Close the toast messages
             *
             * @param  {Object} elem    HTML Element of toast message to close
             * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
             *
             * @return {undefined}
             */
            close: function(elem, wait) {

                if(this.closeToastOnClick) {
                    elem.addEventListener("click", function() {
                        hideElement(elem);
                    });
                }

                wait = wait && !isNaN(+wait) ? +wait : this.delay;

                if(wait < 0) {
                    hideElement(elem);
                } else if(wait > 0) {
                    setTimeout(function() {
                        hideElement(elem);
                    }, wait);
                }

            },

            /**
             * Create a dialog box
             *
             * @param  {String}   message      The message passed from the callee
             * @param  {String}   type         Type of dialog to create
             * @param  {Function} onOkay       [Optional] Callback function when clicked okay.
             * @param  {Function} onCancel     [Optional] Callback function when cancelled.
             *
             * @return {Object}
             */
            dialog: function(message, type, onOkay, onCancel) {
                return this.setup({
                    type: type,
                    message: message,
                    onOkay: onOkay,
                    onCancel: onCancel
                });
            },

            /**
             * Show a new toast message box
             *
             * @param  {String} message    The message passed from the callee
             * @param  {String} type       [Optional] Optional type of toast message
             * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the toast
             *
             * @return {Object}
             */
            toast: function(message, type, click) {

                var existing = document.querySelectorAll(".alertify-toast > div");
                if(existing) {
                    var diff = existing.length - this.maxToastItems;
                    if(diff >= 0) {
                        for(var i = 0, _i = diff + 1; i < _i; i++) {
                            this.close(existing[i], -1);
                        }
                    }
                }

                this.notify(message, type, click);
            },

            setToastPosition: function(str) {
                this.toastContainerClass = "alertify-toast " + str;
            },

            setupToastContainer: function() {

                var elToast = document.querySelector(".alertify-toast");
                var className = this.toastContainerClass;
                if(!elToast) {
                    elToast = document.createElement("div");
                    elToast.className = className;
                    this.parent.appendChild(elToast);
                }

                // Make sure it's positioned properly.
                if(elToast.className !== className) {
                    elToast.className = className;
                }

                return elToast;

            },

            /**
             * Add new toast message
             * If a type is passed, a class name "{type}" will get added.
             * This allows for custom look and feel for various types of notifications.
             *
             * @param  {String} message    The message passed from the callee
             * @param  {String} type       [Optional] Type of toast message
             * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding
             *
             * @return {undefined}
             */
            notify: function(message, type, click) {

                var elToast = this.setupToastContainer();
                var toast = document.createElement("div");

                toast.className = (type || "default");
                if(_alertify.toastTemplateMethod) {
                    toast.innerHTML = _alertify.toastTemplateMethod(message);
                } else {
                    toast.innerHTML = message;
                }

                // Add the click handler, if specified.
                if("function" === typeof click) {
                    toast.addEventListener("click", click);
                }

                elToast.appendChild(toast);
                setTimeout(function() {
                    toast.className += " alertify-show";
                }, 10);

                this.close(toast, this.delay);

            },

            /**
             * Initiate all the required pieces for the dialog box
             *
             * @return {undefined}
             */
            setup: function(item) {

                var el = document.createElement("div");
                el.className = "alertify alertify-hide";
                el.innerHTML = this.build(item);

                var btnOK = el.querySelector(".btn-ok");
                var btnCancel = el.querySelector(".btn-cancel");
                var input = el.querySelector("input");
                var label = el.querySelector("label");

                // Set default value/placeholder of input
                if(input) {
                    if(typeof this.promptPlaceholder === "string") {
                        // Set the label, if available, for MDL, etc.
                        if(label) {
                            label.textContent = this.promptPlaceholder;
                        } else {
                            input.placeholder = this.promptPlaceholder;
                        }
                    }
                    if(typeof this.promptValue === "string") {
                        input.value = this.promptValue;
                    }
                }

                function setupHandlers(resolve) {
                    if("function" !== typeof resolve) {
                        // promises are not available so resolve is a no-op
                        resolve = function () {};
                    }

                    if(btnOK) {
                        btnOK.addEventListener("click", function(ev) {
                            if(item.onOkay && "function" === typeof item.onOkay) {
                                if(input) {
                                    item.onOkay(input.value, ev);
                                } else {
                                    item.onOkay(ev);
                                }
                            }

                            if(input) {
                                resolve({
                                    buttonClicked: "ok",
                                    inputValue: input.value,
                                    event: ev
                                });
                            } else {
                                resolve({
                                    buttonClicked: "ok",
                                    event: ev
                                });
                            }

                            hideElement(el);
                        });
                    }

                    if(btnCancel) {
                        btnCancel.addEventListener("click", function(ev) {
                            if(item.onCancel && "function" === typeof item.onCancel) {
                                item.onCancel(ev);
                            }

                            resolve({
                                buttonClicked: "cancel",
                                event: ev
                            });

                            hideElement(el);
                        });
                    }

                    if(input) {
                        input.addEventListener("keyup", function(ev) {
                            if(ev.which === 13) {
                                btnOK.click();
                            }
                        });
                    }
                }

                var promise;

                if(typeof Promise === "function") {
                    promise = new Promise(setupHandlers);
                } else {
                    setupHandlers();
                }

                this.parent.appendChild(el);
                setTimeout(function() {
                    el.classList.remove("alertify-hide");
                    if(input && item.type && item.type === "prompt") {
                        input.select();
                        input.focus();
                    } else {
                        if(btnOK) {
                            btnOK.focus();
                        }
                    }
                }, 100);

                return promise;
            },

            okBtn: function(label) {
                this.okLabel = label;
                return this;
            },

            setDelay: function(time) {
                time = time || 0;
                this.delay = isNaN(time) ? this.defaultDelay : parseInt(time, 10);
                return this;
            },

            cancelBtn: function(str) {
                this.cancelLabel = str;
                return this;
            },

            setMaxToastItems: function(num) {
                this.maxToastItems = parseInt(num || this.defaultMaxToastItems);
            },

            reset: function() {
                this.parent = document.body;
                this.okBtn(this.defaultOkLabel);
                this.cancelBtn(this.defaultCancelLabel);
                this.title("");
                this.setMaxToastItems();
                this.promptValue = "";
                this.promptPlaceholder = "";
                this.delay = this.defaultDelay;
                this.setCloseToastOnClick(this.closeToastOnClickDefault);
                this.setToastPosition("bottom left");
                this.toastTemplateMethod = null;
            }

        };

        return {
            _$$alertify: _alertify,
            parent: function(elem) {
                _alertify.parent = elem;
            },
            reset: function() {
                _alertify.reset();
                return this;
            },
            alert: function(message, onOkay, onCancel) {
                return _alertify.dialog(message, "alert", onOkay, onCancel) || this;
            },
            confirm: function(message, onOkay, onCancel) {
                return _alertify.dialog(message, "confirm", onOkay, onCancel) || this;
            },
            prompt: function(message, onOkay, onCancel) {
                return _alertify.dialog(message, "prompt", onOkay, onCancel) || this;
            },
            toast: function(message, click) {
                _alertify.toast(message, "default", click);
                return this;
            },
            success: function(message, click) {
                _alertify.toast(message, "success", click);
                return this;
            },
            error: function(message, click) {
                _alertify.toast(message, "error", click);
                return this;
            },
            cancelBtn: function(label) {
                _alertify.cancelBtn(label);
                return this;
            },
            okBtn: function(label) {
                _alertify.okBtn(label);
                return this;
            },
            title: function(label) {
                _alertify.title = label;
                return this;
            },
            delay: function(time) {
                _alertify.setDelay(time);
                return this;
            },
            placeholder: function(str) {
                _alertify.promptPlaceholder = str;
                return this;
            },
            defaultValue: function(str) {
                _alertify.promptValue = str;
                return this;
            },
            maxToastItems: function(num) {
                _alertify.setMaxToastItems(num);
                return this;
            },
            closeToastOnClick: function(bool) {
                _alertify.setCloseToastOnClick(!! bool);
                return this;
            },
            toastPosition: function(str) {
                _alertify.setToastPosition(str || "");
                return this;
            },
            setToastTemplate: function(templateMethod) {
                _alertify.toastTemplateMethod = templateMethod;
                return this;
            },
            clearToast: function() {
                _alertify.setupToastContainer().innerHTML = "";
                return this;
            },
            version: _alertify.version
        };
    }

    // AMD, window, and NPM support
    if("undefined" !== typeof module && !! module && !! module.exports) {
        // Preserve backwards compatibility
        module.exports = function() {
            return new Alertify();
        };
        var obj = new Alertify();
        for(var key in obj) {
            module.exports[key] = obj[key];
        }
    } else if(typeof define === "function" && define.amd) {
        define(function() {
            return new Alertify();
        });
    } else {
        window.alertify = new Alertify();
    }

}());
