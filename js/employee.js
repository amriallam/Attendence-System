import { checkAuthorization, employeeFetch } from "./functions.js";

$(function () {
  checkAuthorization("employee");
  employeeFetch();
});
