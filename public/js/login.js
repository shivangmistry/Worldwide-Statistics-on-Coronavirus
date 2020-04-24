$("#loginForm").submit(function (event) {
    event.preventDefault();
    $.post("/login",
        {
            username: $("#loginEmail").val(),
            password: $("#loginPassword").val()
        },
        function (data) {
            if(data==="error") {
                alert("Invalid email or password.")
            } else {
                document.cookie = "username=" + $("#loginEmail").val();
                window.location = "/";
            }
        });
});