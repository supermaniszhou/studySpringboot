var loginModule = (function () {
    function login() {
        var form = $("#loginForm").serialize();
        $.post("/index/login", form, function (data) {
            if (data.code == 0) {
                window.location.href = "../index/home";
            } else {
                $("#errorInfo").html(data.msg);
            }
        });
    }
    return {
        login: login
    }
})();