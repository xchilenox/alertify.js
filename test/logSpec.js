/* eslint-env karma, jasmine */
/* eslint strict: [2, false] */
describe("Dialog Unit Tests:", function () {
    var $alertify;

    beforeEach(function() {
        alertify.reset();
        alertify.clearToast();
        $alertify = alertify._$$alertify;
    });

    describe("Creating toasts", function() {

        it("should create elements", function(done) {
            alertify.toast('rolls down stairs');
            alertify.error('all over in pairs');
            setTimeout(function() {
                expect(document.querySelector(".alertify-toast .default").innerHTML).toBe("rolls down stairs");
                expect(document.querySelector(".alertify-toast .error").innerHTML).toBe("all over in pairs");
                done();
            }, 100);
        });

        it("should use a templating method", function(done) {
            alertify.setToastTemplate(function (input) {
                return input + ' sang kowalski';
            });
            alertify.toast("it rolls over your neighbor's dog");
            alertify.error("it's great for a snack");
            
            setTimeout(function() {
                expect(document.querySelector(".alertify-toast .default").innerHTML).toBe("it rolls over your neighbor's dog sang kowalski");
                expect(document.querySelector(".alertify-toast .error").innerHTML).toBe("it's great for a snack sang kowalski");
                done();
            }, 100);
        });

        it("should reset", function () {
            alertify.setToastTemplate(function (input) {
                return input + ' sang kowalski';
            });
            alertify.reset();
            expect(alertify._$$alertify.toastTemplateMethod).toBe(null);

        });

    });

});