/* ==========================================================================
   Startkit
   ========================================================================== */

var signingUp = signingUp || {};

signingUp.app = function(undefined) {

    var initSubscribeForm = function() {
        var form = document.getElementById('mc-subscribe'),
            emailInput = document.getElementById('mce-email'),
            submitBtn = document.getElementById('mc-subscribe-btn');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Loading btn
            submitBtn.classList.add('main-form__btn--fetching');

            // Ajax Request (not working :()
            var request = new XMLHttpRequest();

            request.open('GET', 'http://anatacreative.us11.list-manage.com/subscribe/post-json?u=5b006fabb177ac7cf7d2a67d5&amp;id=187f8b9c68&amp;c=?', true);

            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    var ChimpResponse = JSON.parse(this.response);

                    console.log(ChimpResponse);

                    if(ChimpResponse.result === "success") {
                        console.log('success');
                        form.classList.add('form--success');
                    } else {
                        console.log(':(');
                    }

                } else {
                    submitBtn.classList.remove('main-form__btn--fetching');
                    submitBtn.classList.add('main-form__btn--error');

                    setTimeout(function() {
                        submitBtn.classList.remove('main-form__btn--error');
                    }, 500);
                }
            };
            request.onerror = function() {

            };

            request.send("EMAIL=" + emailInput.value);
        });
    };


    // Init
    var init = function() {
        initSubscribeForm();
    }();
};

var ready = function(fn) {
    // Sanity check
    if (typeof(fn) !== 'function') return;

    // If document is already loaded, run method
    if (document.readyState === 'complete') {
        return fn();
    }

    // Otherwise, wait until document is loaded
    document.addEventListener('DOMContentLoaded', fn, false);
};

ready(function() {
    signingUp.app();
});
