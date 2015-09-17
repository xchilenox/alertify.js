var Templates = (function () {
    function Templates() {
    }
    Templates.prototype.set = function (key, template) {
        this[key] = template;
    };
    return Templates;
})();
var templates = new Templates();
templates.set("standard", {
    alert: "<div class='dialog'><div><p class='message'></p><nav><button class='ok'></button></nav></div></div>",
    dialog: "<div class='dialog'><div><p class='message'></p><nav><button class='cancel'></button><button class='okay'></button></div></div>",
    prompt: "<div class='dialog'></div>",
    log: "<div class='log'></div>",
    error: "<div class='log error'></div>",
    info: "<div class='log info'></div>",
    success: "<div class='log success'></div>",
});
templates.set("bootstrap", {
    alert: "",
    dialog: "",
    prompt: "",
    log: "",
    error: "",
    info: "",
    success: ""
});
var Promise = (function () {
    function Promise() {
    }
    return Promise;
})();
var Alertify = (function () {
    function Alertify() {
        var container = document.querySelector(".alertify");
        if (!container) {
            container = document.createElement("div");
            container.className = "alertify";
            document.body.appendChild(container);
        }
        this.container = container;
        this.templates = templates;
        this.options.delay = 5;
    }
    Alertify.prototype.setTheme = function (theme) {
        this.options.theme = theme;
        return this;
    };
    Alertify.prototype.okBtn = function (text) {
        this.labels.okay = text;
        return this;
    };
    Alertify.prototype.cancelBtn = function (text) {
        this.labels.cancel = text;
        return this;
    };
    Alertify.prototype.closeOnClick = function (close) {
        this.options.closeOnClick = close;
        return this;
    };
    Alertify.prototype.template = function (html) {
        this.options.template = html;
        return this;
    };
    Alertify.prototype.delay = function (duration) {
        this.options.delay = duration;
        return this;
    };
    Alertify.prototype.maxLogItems = function (count) {
        this.options.maxLogItems = count;
        return this;
    };
    Alertify.prototype.log = function (text) {
        this._setup("log", text);
        return this;
    };
    Alertify.prototype.success = function (text) {
        this._setup("success", text);
        return this;
    };
    Alertify.prototype.error = function (text) {
        this._setup("error", text);
        return this;
    };
    Alertify.prototype.alert = function (text) {
        this._setup("alert", text);
        return this;
    };
    Alertify.prototype.dialog = function (text) {
        this._setup("dialog", text);
        return this;
    };
    Alertify.prototype.prompt = function (text) {
        this._setup("prompt", text);
        return this;
    };
    Alertify.prototype._setup = function (type, message) {
        this.type = type;
        this.labels.message = message;
    };
    Alertify.prototype._getTemplate = function () {
        return this.options.template || this.templates[this.options.theme || "standard"][this.type];
    };
    Alertify.prototype._createElement = function () {
        var element = document.createElement("div");
        element.className = "alertify";
        element.innerHTML = this._getTemplate();
        return element;
    };
    Alertify.prototype._isLogMessage = function () {
        return this.type === "log" || this.type === "success" || this.type === "error";
    };
    Alertify.prototype._isDialog = function () {
        return this.type === "dialog" || this.type === "prompt";
    };
    Alertify.prototype._setListeners = function () {
        this._setLogListeners();
    };
    Alertify.prototype._setLogListeners = function () {
        if (this._isLogMessage()) {
            if (this.options.closeOnClick) {
                this.element.addEventListener("click", this.hide);
            }
            if (this.options.delay) {
                setTimeout(this.hide, this.options.delay);
            }
        }
    };
    Alertify.prototype._setAlertListeners = function () {
        if (this.type === "alert") {
            this.element.querySelector(".okay").addEventListener("click", this.hide);
        }
    };
    Alertify.prototype._setDialogListeners = function () {
        if (this._isDialog()) {
            var okay = this.element.querySelector(".okay");
            var cancel = this.element.querySelector(".cancel");
            if (okay) {
                if (this.type === "dialog") {
                    var input = this.element.querySelector("input");
                    this._promise.payload = input && input["value"] ? input["value"] : "";
                }
                else {
                    this._promise.payload = true;
                    okay.addEventListener("click", this._resolveDialogWithSuccess);
                }
            }
            if (cancel) {
                cancel.addEventListener("click", this._resolveDialogWithFailure);
            }
        }
    };
    Alertify.prototype._resolveDialogWithSuccess = function (Event) {
        this._promise.pending = false;
        this._promise.resolved = true;
    };
    Alertify.prototype._resolveDialogWithFailure = function (Event) {
        this._promise.pending = false;
        this._promise.resolved = true;
    };
    Alertify.prototype.then = function (success, cancel) {
        var self = this;
        if (!this._promise.done) {
            window.requestAnimationFrame(function () {
                self.then(success, cancel);
            });
            return;
        }
        if (this._promise.resolved) {
            success(this._promise.payload);
            return;
        }
        if (cancel) {
            cancel();
        }
    };
    Alertify.prototype.show = function () {
        this._promise.pending = true;
    };
    Alertify.prototype.hide = function () {
    };
    return Alertify;
})();
