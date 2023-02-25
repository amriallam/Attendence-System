import { securityUpdateData, securityFetch, checkTime } from "./functions.js";

$(function () {
  checkTime();
  securityUpdateData();
  securityFetch();
});
