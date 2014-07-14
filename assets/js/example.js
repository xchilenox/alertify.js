function reset() {
    alertify.settings.ok = "OK";
    alertify.settings.cancel = "Cancel";
    alertify.settings.focus = "ok";
}

$(function () {

    // ==============================
    // Standard Dialogs
    $("#alert").on("click", function () {
        reset();
        var alert = alertify.alert("This is an alert dialog");
        alert.show();
        return false;
    });

    // ==============================
    // HTML5 Notification with fallback.
    $("#notification").on("click", function(e) {

        e.preventDefault();
        reset();

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

    });

    $("#confirm").on("click", function () {
        reset();
        var confirm = alertify.confirm("This is a confirm dialog");
        confirm.ok = function () {
            console.log("clicked ok");
        };
        confirm.cancel = function () {
            console.log("clicked cancel");
        };
        confirm.show();

        return false;
    });

    $("#prompt").on("click", function () {
        reset();
        var prompt = alertify.prompt("This is a prompt dialog", "Default Value");
        prompt.ok = function (value) {
            console.log("clicked ok with: " + value);
        };
        prompt.cancel = function () {
            console.log("clicked cancel");
        };
        prompt.show();

        return false;
    });

    // ==============================
    // Ajax
    $("#ajax").on("click", function () {
        reset();
        var confirm = alertify.confirm("Confirm?");
        confirm.ok = function () {
            $.get("http://google.com").complete(function () {
                var alert = alertify.alert("Successful AJAX after OK");
                alert.show();
            });
        };

        confirm.cancel = function () {
            $.get("http://google.com").complete(function () {
                var alert = alertify.alert("Successful AJAX after Cancel");
                alert.show();
            });
        };

        confirm.show();
    });

    // ==============================
    // Custom Properties
    $("#labels").on("click", function () {
        reset();
        alertify.settings.ok = "Accept";
        alertify.settings.cancel = "Deny";
        var confirm = alertify.confirm("Confirm dialog with custom button labels");
        confirm.ok = function () {
            console.log("clicked ok");
        };
        confirm.cancel = function () {
            console.log("clicked cancel");
        };
        confirm.show();
        return false;
    });

    $("#focus").on("click", function () {
        reset();
        alertify.settings.focus = "cancel";
        var confirm = alertify.confirm("Confirm dialog with cancel button focused");
        confirm.ok = function () {
            console.log("clicked ok");
        };
        confirm.cancel = function () {
            console.log("clicked cancel");
        };
        confirm.show();
        return false;
    });

});