let url = "http://todo.reworkstaging.name.ng/v1";

$(document).ready(function () {
  $("#create").click(function (e) {
    e.preventDefault();
    let name = $("#name"),
      email = $("#email"),
      password = $("#password");

    $(".message").text("");

    let isValid = true;

    if (name.val() == "") {
      $("#fullName").text("Full Name is required").css("color", "red");
      isValid = false;
    }

    if (email.val() == "") {
      $("#emailAddress").text("Email Address is required").css("color", "red");
      isValid = false;
    }

    if (password.val() == "") {
      $("#passwordMessage").text("Password is required").css("color", "red");
      isValid = false;
    }

    if (isValid) {
      let userObj = { name: name.val(), email: email.val(), password: password.val() };
      $.ajax({
        method: "POST",
        url: `${url}/users`,
        data: userObj,
        success: function () {
          alert("User Successfully Created");
          window.location.href = "login.html";
        },
        error: function (err) {
          alert("Sorry, registration could not be completed");
          console.log(err);
        },
      });
    } else {
      console.log(err);
    }
  });
});
