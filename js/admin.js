import {
  checkAuthorization,
  adminFetch,
  switchTaps,
  reportShow,
} from "./functions.js";

$(function () {
  checkAuthorization("admin");
  adminFetch();
  switchTaps();
  reportShow();
});
