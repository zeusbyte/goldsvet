var valid = false;

$("#login-form").submit(function (e) {
    var $form = $(this);

    if (! $form.valid()) {
        return false;
    }

    as.btn.loading($("#btn-login"));

    return true;
});