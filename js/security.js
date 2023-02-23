import {
  checkAuthorization,
  securityUpdateData,
  securityFetch,
  checkTime,
} from "./functions.js";

$(function () {
  checkAuthorization("security");
  checkTime();
  securityUpdateData();
  securityFetch();
});
