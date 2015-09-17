interface Labels {
    okay: string;
    cancel: string;
    message: string;
    placeholder: string;
}

interface Options {
    closeOnClick: boolean;
    delay: number;
    maxLogItems: number;
    template: string;
    theme: string;
}

interface Template {
    alert: string;
    dialog: string;
    prompt: string;
    log: string;
    error: string;
    info: string;
    success: string;
}

class Templates
{
    standard: Template;
    bootstrap: Template;
    set(key: string, template: Template) {
        this[key] = template;
    }
}

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
    error:"",
    info:"",
    success:""
});

class Promise {
    pending: boolean;
    done: boolean;
    resolved: boolean;
    rejected: boolean;
    payload: any;
}

class Alertify {

    container: Element;
    element: Element;
    options: Options;
    type: string;
    labels: Labels;
    templates: Templates;

    private _resolved: boolean;
    private _promise: Promise;

    constructor() {

        // Set up the outer container.
        var container = document.querySelector(".alertify");
        if (! container) {
            container = document.createElement("div");
            container.className = "alertify";
            document.body.appendChild(container);
        }

        this.container = container;
        this.templates = templates;
        this.options.delay = 5;

    }

    public setTheme(theme: string) : Alertify {
        this.options.theme = theme;
        return this;
    }

    public okBtn(text: string) : Alertify {
        this.labels.okay = text;
        return this;
    }

    public cancelBtn(text: string) : Alertify {
        this.labels.cancel = text;
        return this;
    }

    public closeOnClick(close: boolean) : Alertify {
        this.options.closeOnClick = close;
        return this;
    }

    public template(html: string) : Alertify {
        this.options.template = html;
        return this;
    }

    public delay(duration: number) : Alertify {
        this.options.delay = duration;
        return this;
    }

    public maxLogItems(count: number) : Alertify {
        this.options.maxLogItems = count;
        return this;
    }

    public log(text: string) : Alertify {
        this._setup("log", text);
        return this;
    }

    public success(text: string) : Alertify {
        this._setup("success", text);
        return this;
    }

    public error(text: string) : Alertify {
        this._setup("error", text);
        return this;
    }

    public alert(text: string) : Alertify {
        this._setup("alert", text);
        return this;
    }

    public dialog(text: string) : Alertify {
        this._setup("dialog", text);
        return this;
    }

    public prompt(text: string) : Alertify {
        this._setup("prompt", text);
        return this;
    }

    private _setup(type: string, message: string) {
        this.type = type;
        this.labels.message = message;
    }

    private _getTemplate() : string {
        return this.options.template || this.templates[this.options.theme || "standard"][this.type];
    }

    private _createElement() : HTMLElement {
        var element = document.createElement("div");
        element.className = "alertify";
        element.innerHTML = this._getTemplate();
        return element;
    }

    private _isLogMessage() : boolean {
        return this.type === "log" || this.type === "success" || this.type === "error";
    }

    private _isDialog() : boolean {
        return this.type === "dialog" || this.type === "prompt";
    }

    private _setListeners() {
        this._setLogListeners();
    }

    private _setLogListeners() {
        if (this._isLogMessage()) {
            if (this.options.closeOnClick) {
                this.element.addEventListener("click", this.hide);
            }
            if (this.options.delay) {
                setTimeout(this.hide, this.options.delay);
            }
        }
    }

    private _setAlertListeners() {
        if (this.type === "alert") {
            this.element.querySelector(".okay").addEventListener("click", this.hide);
        }
    }

    private _setDialogListeners() {
        if (this._isDialog()) {

            var okay = this.element.querySelector(".okay");
            var cancel = this.element.querySelector(".cancel");

            if (okay) {
                // Expecting a value if a dialog.
                if(this.type === "dialog") {
                    var input = this.element.querySelector("input");
                    this._promise.payload = input && input["value"] ? input["value"] : "";
                } else {
                    this._promise.payload = true;
                    okay.addEventListener("click", this._resolveDialogWithSuccess);
                }
            }

            if(cancel) {
                cancel.addEventListener("click", this._resolveDialogWithFailure);
            }

        }
    }

    private _resolveDialogWithSuccess(Event) {
        this._promise.pending = false;
        this._promise.resolved = true;
    }

    private _resolveDialogWithFailure(Event) {
        this._promise.pending = false;
        this._promise.resolved = true;
    }

    then(success: Function, cancel?: Function) {

        var self = this;

        if (! this._promise.done) {
            window.requestAnimationFrame(function() {
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

    }

    show() : void {
        this._promise.pending = true;
    }

    hide() : void {

    }

}
