let url = "http://todo.reworkstaging.name.ng/v1";

$(document).ready(function () {
  $("#create").click(function (e) {
    e.preventDefault();
    let email = $("#email"),
      password = $("#password");

    $(".message").text("");

    let isValid = true;

    if (email.val() == "") {
      $("#emailAddress").text("Email Address is required").css("color", "red");
      isValid = false;
    }

    if (password.val() == "") {
      $("#passwordMessage").text("Password is required").css("color", "red");
      isValid = false;
    } else {
        let userObj = { email: email.val(), password: password.val() };
        $.ajax({
          method: "POST",
          url: `${url}/users/login`,
          data: userObj,
          success: function (resp) {
            if (resp.code == 404) {
              alert(resp.msg);
            } else {
              alert("Login Successful");
              localStorage.Task_Manager_User = JSON.stringify(resp);
              window.location.href = "todo-task.html";
            }
          },
          error: function (err) {
            alert("Error: Could not Login");
            console.log(err);
          },
        });
      }
})
});

