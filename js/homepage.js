import {
  clearRegisterInputs,
  displaySwapStatus,
  checkData,
  validateData,
  homepageSignup,
  homepageLogin,
} from "./functions.js";

$(function () {
  //------------------Auto-Redirect---------------//

  if (localStorage.getItem("userInfo")) {
    switch (
      JSON.parse(
        CryptoJS.AES.decrypt(localStorage.userInfo, "AmrAllam").toString(
          CryptoJS.enc.Utf8
        )
      )["type"]
    ) {
      case "employee": {
        window.location.assign("employee.html");
        break;
      }
      case "admin": {
        window.location.assign("admin.html");
        break;
      }
      case "security": {
        window.location.assign("security.html");
        break;
      }
    }
  }

  //------------------HomePage---------------//

  $("#home_signUpButton").on("click", function () {
    $("#HomeWrapper").toggleClass("d-none");
    $("#SignUpWrapper").toggleClass("d-none");
  });
  $("#home_logInButton").on("click", function () {
    $("#HomeWrapper").toggleClass("d-none");
    $("#LogInWrapper").toggleClass("d-none");
  });

  //---------------SignUpWrapper----------------//

  $("#signup_signUp").on("click", function () {
    displaySwapStatus($("#alreadyInUse"), "notexist");
    displaySwapStatus($("#successRegisterMsg"), "notexist");
    displaySwapStatus($("#alreadyPending"), "notexist");
    validateData();
    if (checkData()) {
      homepageSignup();
    }
  });
  $("#signup_clearButton").on("click", function () {
    clearRegisterInputs();
  });
  $("#signup_backButton").on("click", function () {
    clearRegisterInputs();
    $("#HomeWrapper").toggleClass("d-none");
    $("#SignUpWrapper").toggleClass("d-none");
  });

  //---------------LogInWrapper----------------//

  $("#login_login").on("click", function () {
    displaySwapStatus($("#errorMsg"), "notexist");
    homepageLogin();
  });
  $("#login_backButton").on("click", function () {
    displaySwapStatus($("#errorMsg"), "notexist");
    $("#HomeWrapper").toggleClass("d-none");
    $("#LogInWrapper").toggleClass("d-none");
  });
});
