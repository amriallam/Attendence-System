import {
  clearRegisterInputs,
  displaySwapStatus,
  checkData,
  validateData,
  homepageSignup,
  homepageLogin,
} from "./functions.js";

$(function () {
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
      let emailAlreadyInUseFlag = false;
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
