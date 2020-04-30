$("#loginForm").submit(function (event) {
    event.preventDefault();
    console.log($("#loginEmail").val());
    console.log($("#loginPassword").val());
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