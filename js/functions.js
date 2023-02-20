function checkName(text) {
  return /^[a-zA-z]{3,10}$/.test(text);
}
function checkEmail(text) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text);
}
function checkAddress(text) {
  return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(text);
}
function checkAge(text) {
  return text >= 18 && text <= 40;
}
function checkPersonType() {
  return $("input[name=personType]:checked").length != 0;
}
export function validateElement(element, checkFunction) {
  if (!checkFunction($.trim(element.val()))) {
    if (element.hasClass("rightData")) element.toggleClass("rightData");
    if (!element.hasClass("wrongeData")) element.toggleClass("wrongeData");
    element.tooltip("enable");
  } else {
    if (element.hasClass("wrongeData")) element.toggleClass("wrongeData");
    if (!element.hasClass("rightData")) element.toggleClass("rightData");
    element.tooltip("disable");
  }
}
export function clearRegisterInputs() {
  $('[data-toggle="tooltip"]').tooltip("disable");
  $("input:gt(1)").val("");
  $("input:gt(1)").removeClass("rightData");
  $("input:gt(1)").removeClass("wrongeData");
  $("input:gt(6)").prop("checked", false);
  $("#checkBoxDiv").removeClass("wrongeData");
  $("#checkBoxDiv").removeClass("rightData");
  displaySwapStatus($("#alreadyInUse"), "notexist");
  displaySwapStatus($("#successRegisterMsg"), "notexist");
  displaySwapStatus($("#alreadyPending"), "notexist");
}
export function displaySwapStatus(element, defaultType) {
  if (defaultType == "exist") {
    if (element.hasClass("d-none")) element.removeClass("d-none");
  } else if (defaultType == "notexist") {
    if (!element.hasClass("d-none")) element.addClass("d-none");
  }
}
function generateUsername(firstName, lastName) {
  var returnedName = firstName + lastName;
  for (var i = 0; i < 4; i++) {
    returnedName += Math.floor(Math.random() * 10);
  }
  return returnedName;
}
function generatePassword() {
  var possibleChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var password = "";
  for (var i = 0; i < 10; i++) {
    var randomNum = Math.floor(Math.random() * possibleChars.length);
    var randomChar = possibleChars.charAt(randomNum);
    password += randomChar;
  }
  return password;
}
export function checkData() {
  return (
    checkName($("input:eq(2)").val()) &&
    checkName($("input:eq(3)").val()) &&
    checkAge($("input:eq(4)").val()) &&
    checkEmail($("input:eq(5)").val()) &&
    checkAddress($("input:eq(6)").val()) &&
    checkPersonType()
  );
}
export function validateData() {
  validateElement($("input:eq(2)"), checkName);
  validateElement($("input:eq(3)"), checkName);
  validateElement($("input:eq(4)"), checkAge);
  validateElement($("input:eq(5)"), checkEmail);
  validateElement($("input:eq(6)"), checkAddress);
  validateElement($("#checkBoxDiv"), checkPersonType);
}
function getAttendenceStatus() {
  var today = new Date();
  if (today.getHours() - 8 > 0) {
    return "Late";
  } else if (today.getHours() == new 8()) {
    if (today.getMinutes() - 30 > 0) {
      return "Late";
    }
  } else return "On Time";
}
function logoutButtonAddEvent() {
  logoutButton.addEventListener("click", function () {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userInfo");
        location.replace("../hompage.html");
      }
    });
  });
}
function addSearchBox(tableID, stats = true) {
  if (stats) {
    $(`#${tableID} tfoot th`).each(function () {
      if ($(this).index() != $(`#${tableID} thead th`).length - 1) {
        var title = $(`#${tableID} thead th`).eq($(this).index()).text();
        $(this).html(
          `<input type="text" class="searchStyle" placeholder="Search by ${title}">`
        );
      }
    });
  } else {
    $(`#${tableID} tfoot th`).each(function () {
      var title = $(`#${tableID} thead th`).eq($(this).index()).text();
      $(this).html(
        `<input type="text" class="searchStyle" placeholder="Search by ${title}">`
      );
    });
  }
}
function tableStyleFunction(tableID) {
  let table = [];
  let i = 0;
  table[i] = $(`#${tableID}`).DataTable();
  $(`#${tableID}_filter`).detach();
  table[i].columns().every(function () {
    var dataTableCol = this;
    $(this.footer())
      .find("input")
      .on("keyup", function () {
        dataTableCol.search(this.value).draw();
      });
  });
  i++;
}
export function checkAuthorization(privilege) {
  if (
    !localStorage.getItem("userInfo") ||
    JSON.parse(
      CryptoJS.AES.decrypt(localStorage.userInfo, "AmrAllam").toString(
        CryptoJS.enc.Utf8
      )
    )["type"] != privilege
  ) {
    alert("You have no access");
    location.assign("http://127.0.0.1:5500/hompage.html");
  }
}
function removeSortingFromLast(tableID) {
  $(`#${tableID} thead th`)
    .eq($(`#${tableID} thead th`).length - 1)
    .toggleClass("sorting")
    .off("click");
}
export function switchTaps() {
  $("li").on("click", (caller) => {
    $("li a")
      .removeClass("active")
      .removeClass("text-primary")
      .addClass("text-dark");
    $(caller.target).addClass("active");
    $(caller.target).removeClass("text-dark").addClass("text-primary");
    switch ($(caller.target).attr("id")) {
      case "fullreport-tab": {
        $(".tab-pane").removeClass("active");
        $("#fullreport").addClass("active");
        break;
      }
      case "latereport-tab": {
        $(".tab-pane").removeClass("active");
        $("#latereport").addClass("active");
        break;
      }
      case "absencereport-tab": {
        $(".tab-pane").removeClass("active");
        $("#absencereport").addClass("active");
        break;
      }
      case "pendingpersons-tab": {
        $(".tab-pane").removeClass("active");
        $("#admittable").addClass("active");
        break;
      }
      case "employeesdata-tab": {
        $(".tab-pane").removeClass("active");
        $("#employeesdata").addClass("active");
        break;
      }
      case "report-tab": {
        $(".tab-pane").removeClass("active");
        $("#reportdata").addClass("active");
        break;
      }
    }
  });
}
function addName() {
  userName.innerText = JSON.parse(
    CryptoJS.AES.decrypt(localStorage.userInfo, "AmrAllam").toString(
      CryptoJS.enc.Utf8
    )
  )["firstName"];
  switch (
  JSON.parse(
    CryptoJS.AES.decrypt(localStorage.userInfo, "AmrAllam").toString(
      CryptoJS.enc.Utf8
    )
  )["type"]
  ) {
    case "admin": {
      document.title = "Admin | " + userName.innerText;
      break;
    }
    case "security": {
      document.title = "Security | " + userName.innerText;
      break;
    }
    case "employee": {
      document.title = "Employee | " + userName.innerText;
      break;
    }
  }
}
export function securityUpdateData() {
  let today = new Date().toLocaleDateString().replaceAll("/", "-");
  fetch("http://localhost:3000/persons?type=employee")
    .then((data) => data.json())
    .then((jsonData) => {
      jsonData.forEach((element) => {
        if (
          new Date(element["lastAttended"]).getTime() !=
          new Date(today).getTime()
        ) {
          {
            if (
              (new Date(element["lastAttended"]).getTime() -
                new Date(today).getTime()) /
              (1000 * 60 * 60 * 24) !=
              -1
            ) {
              fetch(`http://localhost:3000/attendence`, {
                method: "POST",
                body: JSON.stringify({
                  id: "",
                  userId: element["id"],
                  date: increaseDate(element["lastAttended"]),
                  inDate: "NONE",
                  attendState: "Abscent",
                  outDate: "NONE",
                }),
                headers: { "Content-Type": "application/json" },
              }).then(() => {
                fetch(`http://localhost:3000/persons/${element["id"]}`, {
                  method: "PATCH",
                  body: JSON.stringify({
                    lastAttended: increaseDate(element["lastAttended"]),
                    employeeStatus: false,
                  }),
                  headers: { "Content-Type": "application/json" },
                });
              });
            }
          }
        }
      });
    });
}
export function securityFetch() {
  fetch("http://localhost:3000/persons?type=employee")
    .then((respone) => respone.json())
    .then((successData) => {
      {
        if (successData.length != 0) {
          successData.forEach((element) => {
            let tr = document.createElement("tr");
            let td0 = document.createElement("td");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            td0.innerText = element["id"];
            td1.innerText = element["firstName"];
            td2.innerText = element["lastName"];
            td3.innerText = element["age"];
            td3.innerHTML =
              '<button class="d-none btn-primary rounded-1">Attend</button><button class="d-none btn-primary rounded-1">Logout</button><span class="d-none text-dark fs-6">Already Attended today</span>';
            if (
              element["lastAttended"] !=
              new Date().toLocaleDateString().replaceAll("/", "-") &&
              element["employeeStatus"] == false
            )
              td3.children[0].classList.remove("d-none");
            else if (
              element["lastAttended"] ==
              new Date().toLocaleDateString().replaceAll("/", "-") &&
              element["employeeStatus"] == true
            )
              td3.children[1].classList.remove("d-none");
            else if (
              element["lastAttended"] ==
              new Date().toLocaleDateString().replaceAll("/", "-") &&
              element["employeeStatus"] == false
            )
              td3.children[2].classList.remove("d-none");
            td3.children[0].addEventListener("click", function (caller) {
              Swal.fire({
                title: "Are you sure?",
                text: `Attend ${caller.target.parentElement.parentElement.children[1].innerText} ${caller.target.parentElement.parentElement.children[2].innerText}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Attend!",
              }).then((result) => {
                if (result.isConfirmed) {
                  fetch(
                    `http://localhost:3000/persons/${caller.target.parentElement.parentElement.children[0].innerText}`,
                    {
                      method: "PATCH",
                      body: JSON.stringify({
                        lastAttended: new Date()
                          .toLocaleDateString()
                          .replaceAll("/", "-"),
                        employeeStatus: true,
                      }),
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                      },
                    }
                  ).then(() => {
                    fetch(`http://localhost:3000/attendence`, {
                      method: "POST",
                      body: JSON.stringify({
                        id: "",
                        userId:
                          caller.target.parentElement.parentElement.children[0]
                            .innerText,
                        date: new Date()
                          .toLocaleDateString()
                          .replaceAll("/", "-"),
                        inDate: new Date().toLocaleTimeString(),
                        attendState: getAttendenceStatus(),
                        outDate: new Date(
                          "2022-09-20T15:30:00.000"
                        ).toLocaleTimeString(),
                      }),
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                      },
                    });
                  });
                }
              });
            });
            td3.children[1].addEventListener("click", function (caller) {
              Swal.fire({
                title: "Are you sure?",
                text: `Sign Out ${caller.target.parentElement.parentElement.children[1].innerText} ${caller.target.parentElement.parentElement.children[2].innerText}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Sign Out!",
              }).then((result) => {
                if (result.isConfirmed) {
                  fetch(
                    `http://localhost:3000/persons/${caller.target.parentElement.parentElement.children[0].innerText}`,
                    {
                      method: "PATCH",
                      body: JSON.stringify({
                        employeeStatus: false,
                        lastAttended: new Date()
                          .toLocaleDateString()
                          .replaceAll("/", "-"),
                      }),
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                      },
                    }
                  ).then(() => {
                    fetch(
                      `http://localhost:3000/attendence?date=${new Date()
                        .toLocaleDateString()
                        .replaceAll("/", "-")}&userId=${caller.target.parentElement.parentElement.children[0]
                        .innerText
                      }`
                    )
                      .then((data) => data.json())
                      .then((foundObject) => {
                        fetch(
                          `http://localhost:3000/attendence/${foundObject[0]["id"]}`,
                          {
                            method: "PATCH",
                            headers: {
                              "Content-type": "application/json; charset=UTF-8",
                            },
                            body: JSON.stringify({
                              outDate: new Date().toLocaleTimeString(),
                            }),
                          }
                        );
                      });
                  });
                }
              });
            });
            document.getElementsByTagName("tbody")[0].appendChild(tr);
          });
        }
        tableFinalization("tableJqueryID");
      }
      addName();
      logoutButtonAddEvent();
    });
}
function increaseDate(dayString) {
  let currentDay = new Date(dayString);
  return new Date(currentDay.setDate(currentDay.getDate() + 1))
    .toLocaleDateString()
    .replaceAll("/", "-");
}
export function adminFetch() {
  fetch("http://localhost:3000/persons")
    .then((data) => data.json())
    .then((successData) => {
      localStorage.setItem(
        "mappedData",
        CryptoJS.AES.encrypt(
          JSON.stringify(
            successData.map(
              (person) =>
                new Object({
                  id: person["id"],
                  firstName: person["firstName"],
                  lastName: person["lastName"],
                })
            )
          ),
          "AmrAllam"
        )
      );
      successData.forEach((element) => {
        if (element.type == "employee") {
          let tr = document.createElement("tr");
          let td0 = document.createElement("td");
          let td1 = document.createElement("td");
          let td2 = document.createElement("td");
          let td3 = document.createElement("td");
          let td4 = document.createElement("td");
          let td5 = document.createElement("td");
          let td6 = document.createElement("td");
          tr.appendChild(td0);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tr.appendChild(td6);
          td0.innerText = element["id"];
          td1.innerText = element["firstName"];
          td2.innerText = element["lastName"];
          td3.innerText = element["age"];
          td4.innerText = element["email"];
          td5.innerText = element["address"];
          td6.innerText = element["lastAttended"];
          document.getElementsByTagName("tbody")[4].appendChild(tr);
        }
      });
    })
    .then(() => {
      fetch("http://localhost:3000/pending")
        .then((respone) => respone.json())
        .then((successData) => {
          if (successData.length != 0) {
            successData.forEach((element) => {
              let tr = document.createElement("tr");
              let td0 = document.createElement("td");
              let td1 = document.createElement("td");
              let td2 = document.createElement("td");
              let td3 = document.createElement("td");
              let td4 = document.createElement("td");
              let td5 = document.createElement("td");
              let td6 = document.createElement("td");
              let td7 = document.createElement("td");
              tr.appendChild(td0);
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);
              tr.appendChild(td4);
              tr.appendChild(td5);
              tr.appendChild(td6);
              tr.appendChild(td7);
              td0.innerText = element["id"];
              td1.innerText = element["firstName"];
              td2.innerText = element["lastName"];
              td3.innerText = element["age"];
              td4.innerText = element["email"];
              td5.innerText = element["address"];
              td6.innerText = element["type"].replace(
                element["type"][0],
                element["type"][0].toUpperCase()
              );
              td7.innerHTML =
                '<i class="bi bi-check-square-fill text-success fs-5"></i><i class="bi bi-x-square-fill text-danger fs-5"></i>';
              td7.children[0].addEventListener("click", function (caller) {
                Swal.fire({
                  title: `Are you sure you want to admit ${caller.target.parentElement.parentElement.children[1].innerText} ${caller.target.parentElement.parentElement.children[2].innerText}`,
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Admit!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      title: "Sending E-Mail...",
                      timer: 10000,
                      didOpen: () => {
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector("b");
                        timerInterval = setInterval(() => {
                          b.textContent = Swal.getTimerLeft();
                        }, 100);
                      },
                    });
                    let objSent = {
                      id: "",
                      userName: generateUsername(
                        caller.target.parentElement.parentElement.children[1]
                          .innerText,
                        caller.target.parentElement.parentElement.children[2]
                          .innerText
                      ),
                      password: generatePassword(),
                      firstName:
                        caller.target.parentElement.parentElement.children[1]
                          .innerText,
                      lastName:
                        caller.target.parentElement.parentElement.children[2]
                          .innerText,
                      age: caller.target.parentElement.parentElement.children[3]
                        .innerText,
                      email:
                        caller.target.parentElement.parentElement.children[4]
                          .innerText,
                      address:
                        caller.target.parentElement.parentElement.children[5]
                          .innerText,
                      type: caller.target.parentElement.parentElement.children[6].innerText.toLowerCase(),
                      lastAttended: new Date()
                        .toLocaleDateString()
                        .replaceAll("/", "-"),
                      employeeStatus: false,
                    };
                    let idOfPerson =
                      caller.target.parentElement.parentElement.children[0]
                        .innerText;
                    SendEmail(objSent).then(() => {
                      AppendToPersons(objSent).then(() => {
                        DeleteFromPending(idOfPerson).then(() => {
                          console.log("Done");
                        });
                      });
                    });
                  }
                });
              });
              td7.children[1].addEventListener("click", function (caller) {
                Swal.fire({
                  title: `Are you sure you want to delete ${caller.target.parentElement.parentElement.children[1].innerText} ${caller.target.parentElement.parentElement.children[2].innerText}`,
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Delete!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    fetch(
                      `http://localhost:3000/pending/${caller.target.parentElement.parentElement.children[0].innerText}`,
                      {
                        method: "DELETE",
                      }
                    );
                  }
                });
              });
              document.getElementsByTagName("tbody")[0].appendChild(tr);
            });
          }
        })
        .then(() => {
          fetch("http://localhost:3000/attendence")
            .then((respone) => respone.json())
            .then((successData) => {
              {
                if (successData.length != 0) {
                  let mappedData = JSON.parse(
                    CryptoJS.AES.decrypt(
                      localStorage.getItem("mappedData"),
                      "AmrAllam"
                    ).toString(CryptoJS.enc.Utf8)
                  );
                  successData.forEach((element) => {
                    let tr = document.createElement("tr");
                    let td0 = document.createElement("td");
                    let td1 = document.createElement("td");
                    let td2 = document.createElement("td");
                    let td3 = document.createElement("td");
                    let td4 = document.createElement("td");
                    let td5 = document.createElement("td");
                    let td6 = document.createElement("td");
                    tr.appendChild(td0);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    td0.innerText = element["userId"];
                    td1.innerText = mappedData.find(
                      (mapped) => mapped["id"] == element["userId"]
                    )["firstName"];
                    td2.innerText = mappedData.find(
                      (mapped) => mapped["id"] == element["userId"]
                    )["lastName"];
                    td3.innerText = element["date"];
                    td4.innerText = element["inDate"];
                    td5.innerText = element["outDate"];
                    switch (element["attendState"]) {
                      case "On Time": {
                        td6.innerHTML = `<button class="badge bg-success" disabled>${element["attendState"]}</button>`;
                        break;
                      }
                      case "Late": {
                        td6.innerHTML = `<button class="badge bg-danger" disabled>${element["attendState"]}</button>`;
                        break;
                      }
                      case "Abscent": {
                        td6.innerHTML = `<button class="badge bg-warning" disabled>${element["attendState"]}</button>`;
                        break;
                      }
                    }
                    let cloned = tr.cloneNode(true);
                    if (element["attendState"] == "Late") {
                      document
                        .getElementsByTagName("tbody")[1]
                        .appendChild(cloned);
                    }
                    if (element["attendState"] == "Abscent") {
                      document
                        .getElementsByTagName("tbody")[2]
                        .appendChild(cloned);
                    }
                    document.getElementsByTagName("tbody")[3].appendChild(tr);
                  });
                }
              }
              tableFinalization("ReportTable");
              tableFinalization("lateReport");
              tableFinalization("absenceReport");
              tableFinalization("admitTable");
              tableFinalization("employeesData", false);
              forLoopRange(1, 3, successData);
            });
        });
      addName();
      logoutButtonAddEvent();
    });
}
function tableFinalization(tableID, stats = true) {
  addSearchBox(tableID, stats);
  tableStyleFunction(tableID);
  if (stats) {
    removeSortingFromLast(tableID);
  }
}
export function employeeFetch() {
  let currentUser = JSON.parse(
    CryptoJS.AES.decrypt(localStorage.userInfo, "AmrAllam").toString(
      CryptoJS.enc.Utf8
    )
  )["id"];
  fetch(`http://localhost:3000/attendence?userId=${currentUser}`)
    .then((respone) => respone.json())
    .then((successData) => {
      {
        if (successData.length != 0) {
          let mappedData = JSON.parse(
            CryptoJS.AES.decrypt(
              localStorage.getItem("mappedData"),
              "AmrAllam"
            ).toString(CryptoJS.enc.Utf8)
          );
          successData.forEach((element) => {
            let tr = document.createElement("tr");
            let td0 = document.createElement("td");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            td0.innerText = element["date"];
            td1.innerText = element["inDate"];
            td2.innerText = element["outDate"];
            switch (element["attendState"]) {
              case "On Time": {
                td3.innerHTML = `<button class="badge bg-success" disabled>${element["attendState"]}</button>`;
                break;
              }
              case "Late": {
                td3.innerHTML = `<button class="badge bg-danger" disabled>${element["attendState"]}</button>`;
                break;
              }
            }
            let cloned = tr.cloneNode(true);
            document.getElementsByTagName("tbody")[0].appendChild(tr);
          });
        }
        tableFinalization("tableJqueryID");
        logoutButtonAddEvent();
        addName();
      }
    });
}
function addRangeButtons(i) {
  $(`.right.aligned.eight.wide.column:eq(${i})`).append(
    `<button id="dateRangePicker${i}" class="btn-primary rounded-1 p-2 mt-1">Date Range Filter</button>`
  );
}
function rangerFilterApply(tableNumber, successData) {
  let mappedData = JSON.parse(
    CryptoJS.AES.decrypt(
      localStorage.getItem("mappedData"),
      "AmrAllam"
    ).toString(CryptoJS.enc.Utf8)
  );
  new Litepicker({
    element: document.getElementById(`dateRangePicker${tableNumber}`),
    format: "M-D-YYYY",
    singleMode: false,
    resetButton: true,
    allowRepick: true,
    setup: (picker) => {
      let days = [];
      picker.on("before:click", function (target) {
        let targetDay = new Date(+target.getAttribute("data-time")).getTime();
        days.push(targetDay);
        if (days.length == 2) {
          let foundObjects = [];
          $(`table:eq(${tableNumber})`).DataTable().destroy();
          $(`tbody:eq(${tableNumber})`).html("");
          let StartingDateOfRange = new Date(days[0]);
          let EndingDateOfRange = new Date(days[1]);
          successData.forEach((elementInSuccessData) => {
            switch (tableNumber) {
              case 1: {
                if (elementInSuccessData.attendState == "Late") {
                  let currentDate = new Date(
                    elementInSuccessData.date
                  ).getTime();
                  if (
                    currentDate >= StartingDateOfRange &&
                    currentDate <= EndingDateOfRange
                  ) {
                    foundObjects.push(elementInSuccessData);
                  }
                }
                break;
              }
              case 2: {
                if (elementInSuccessData.attendState == "Abscent") {
                  let currentDate = new Date(
                    elementInSuccessData.date
                  ).getTime();
                  if (
                    currentDate >= StartingDateOfRange &&
                    currentDate <= EndingDateOfRange
                  ) {
                    foundObjects.push(elementInSuccessData);
                  }
                }
                break;
              }
              case 3: {
                let currentDate = new Date(elementInSuccessData.date).getTime();
                if (
                  currentDate >= StartingDateOfRange &&
                  currentDate <= EndingDateOfRange
                ) {
                  foundObjects.push(elementInSuccessData);
                }
                break;
              }
            }
          });
          foundObjects.forEach((element) => {
            let tr = document.createElement("tr");
            let td0 = document.createElement("td");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");
            let td6 = document.createElement("td");
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            td0.innerText = element["userId"];
            td1.innerText = mappedData.find(
              (mapped) => mapped["id"] == element["userId"]
            )["firstName"];
            td2.innerText = mappedData.find(
              (mapped) => mapped["id"] == element["userId"]
            )["lastName"];
            td3.innerText = element["date"];
            td4.innerText = element["inDate"];
            td5.innerText = element["outDate"];
            switch (element["attendState"]) {
              case "On Time": {
                td6.innerHTML = `<button class="badge bg-success" disabled>${element["attendState"]}</button>`;
                break;
              }
              case "Late": {
                td6.innerHTML = `<button class="badge bg-danger" disabled>${element["attendState"]}</button>`;
                break;
              }
              case "Abscent": {
                td6.innerHTML = `<button class="badge bg-warning" disabled>${element["attendState"]}</button>`;
                break;
              }
            }
            document.getElementsByTagName("tbody")[tableNumber].appendChild(tr);
          });
          tableFinalization(
            document
              .getElementsByTagName("table")
            [tableNumber].getAttribute("id")
          );
          addRangeButtons(tableNumber);
          rangerFilterApply(tableNumber, successData);
          days = [];
        }
        // if (picker.datePicked.length == 0) {
        //   $(`table:eq(${tableNumber})`).DataTable().destroy();
        //   $(`tbody:eq(${tableNumber})`).html("");
        //   successData.forEach((element) => {
        //     switch (tableNumber) {
        //       case 1: {
        //         if (element.attendState == "Late") {
        //           let tr = document.createElement("tr");
        //           let td0 = document.createElement("td");
        //           let td1 = document.createElement("td");
        //           let td2 = document.createElement("td");
        //           let td3 = document.createElement("td");
        //           let td4 = document.createElement("td");
        //           let td5 = document.createElement("td");
        //           let td6 = document.createElement("td");
        //           tr.appendChild(td0);
        //           tr.appendChild(td1);
        //           tr.appendChild(td2);
        //           tr.appendChild(td3);
        //           tr.appendChild(td4);
        //           tr.appendChild(td5);
        //           tr.appendChild(td6);
        //           td0.innerText = element["userId"];
        //           td1.innerText = mappedData.find(
        //             (mapped) => mapped["id"] == element["userId"]
        //           )["firstName"];
        //           td2.innerText = mappedData.find(
        //             (mapped) => mapped["id"] == element["userId"]
        //           )["lastName"];
        //           td3.innerText = element["date"];
        //           td4.innerText = element["inDate"];
        //           td5.innerText = element["outDate"];
        //           switch (element["attendState"]) {
        //             case "On Time": {
        //               td6.innerHTML = `<button class="badge bg-success" disabled>${element["attendState"]}</button>`;
        //               break;
        //             }
        //             case "Late": {
        //               td6.innerHTML = `<button class="badge bg-danger" disabled>${element["attendState"]}</button>`;
        //               break;
        //             }
        //             case "Abscent": {
        //               td6.innerHTML = `<button class="badge bg-warning" disabled>${element["attendState"]}</button>`;
        //               break;
        //             }
        //           }
        //           document
        //             .getElementsByTagName("tbody")
        //             [tableNumber].appendChild(tr);
        //         }
        //       }
        //       case 2: {
        //         if (element.attendState == "Abscent") {
        //           let tr = document.createElement("tr");
        //           let td0 = document.createElement("td");
        //           let td1 = document.createElement("td");
        //           let td2 = document.createElement("td");
        //           let td3 = document.createElement("td");
        //           let td4 = document.createElement("td");
        //           let td5 = document.createElement("td");
        //           let td6 = document.createElement("td");
        //           tr.appendChild(td0);
        //           tr.appendChild(td1);
        //           tr.appendChild(td2);
        //           tr.appendChild(td3);
        //           tr.appendChild(td4);
        //           tr.appendChild(td5);
        //           tr.appendChild(td6);
        //           td0.innerText = element["userId"];
        //           td1.innerText = mappedData.find(
        //             (mapped) => mapped["id"] == element["userId"]
        //           )["firstName"];
        //           td2.innerText = mappedData.find(
        //             (mapped) => mapped["id"] == element["userId"]
        //           )["lastName"];
        //           td3.innerText = element["date"];
        //           td4.innerText = element["inDate"];
        //           td5.innerText = element["outDate"];
        //           switch (element["attendState"]) {
        //             case "On Time": {
        //               td6.innerHTML = `<button class="badge bg-success" disabled>${element["attendState"]}</button>`;
        //               break;
        //             }
        //             case "Late": {
        //               td6.innerHTML = `<button class="badge bg-danger" disabled>${element["attendState"]}</button>`;
        //               break;
        //             }
        //             case "Abscent": {
        //               td6.innerHTML = `<button class="badge bg-warning" disabled>${element["attendState"]}</button>`;
        //               break;
        //             }
        //           }
        //           document
        //             .getElementsByTagName("tbody")
        //             [tableNumber].appendChild(tr);
        //         }
        //       }
        //       case 3: {
        //         let tr = document.createElement("tr");
        //         let td0 = document.createElement("td");
        //         let td1 = document.createElement("td");
        //         let td2 = document.createElement("td");
        //         let td3 = document.createElement("td");
        //         let td4 = document.createElement("td");
        //         let td5 = document.createElement("td");
        //         let td6 = document.createElement("td");
        //         tr.appendChild(td0);
        //         tr.appendChild(td1);
        //         tr.appendChild(td2);
        //         tr.appendChild(td3);
        //         tr.appendChild(td4);
        //         tr.appendChild(td5);
        //         tr.appendChild(td6);
        //         td0.innerText = element["userId"];
        //         td1.innerText = mappedData.find(
        //           (mapped) => mapped["id"] == element["userId"]
        //         )["firstName"];
        //         td2.innerText = mappedData.find(
        //           (mapped) => mapped["id"] == element["userId"]
        //         )["lastName"];
        //         td3.innerText = element["date"];
        //         td4.innerText = element["inDate"];
        //         td5.innerText = element["outDate"];
        //         switch (element["attendState"]) {
        //           case "On Time": {
        //             td6.innerHTML = `<button class="badge bg-success" disabled>${element["attendState"]}</button>`;
        //             break;
        //           }
        //           case "Late": {
        //             td6.innerHTML = `<button class="badge bg-danger" disabled>${element["attendState"]}</button>`;
        //             break;
        //           }
        //           case "Abscent": {
        //             td6.innerHTML = `<button class="badge bg-warning" disabled>${element["attendState"]}</button>`;
        //             break;
        //           }
        //         }
        //         document
        //           .getElementsByTagName("tbody")
        //           [tableNumber].appendChild(tr);
        //       }
        //     }
        //   });
        //   tableFinalization(
        //     document
        //       .getElementsByTagName("table")
        //       [tableNumber].getAttribute("id")
        //   );
        //   addRangeButtons(tableNumber);
        //   rangerFilterApply(tableNumber, successData);
        //   days = [];
        // }
      });
    },
  });
}
export function checkTime() {
  let currentHour = new Date().getHours();
  if (currentHour < 8 || currentHour > 16) {
    Swal.fire({
      title: "Out of work Hours",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.assign("http://127.0.0.1:5500/hompage.html");
      }
    });
  }
}
export function homepageSignup() {
  fetch(`http://localhost:3000/persons?email=${$.trim($("input:eq(5)").val())}`)
    .then((data) => data.json())
    .then((successData) => {
      if (!successData.length) {
        {
          fetch(
            `http://localhost:3000/pending?email=${$.trim(
              $("input:eq(5)").val()
            )}`
          )
            .then((data) => data.json())
            .then((innerdata) => {
              {
                if (!innerdata.length) {
                  let objSent = {
                    id: "",
                    firstName: $.trim($("input:eq(2)").val()),
                    lastName: $.trim($("input:eq(3)").val()),
                    age: $.trim($("input:eq(4)").val()),
                    email: $.trim($("input:eq(5)").val()),
                    address: $.trim($("input:eq(6)").val()),
                    type: $("input[name=personType]:checked").val(),
                  };
                  fetch("http://localhost:3000/pending", {
                    method: "POST",
                    body: JSON.stringify(objSent),
                    headers: { "Content-Type": "application/json" },
                  })
                    .then(() => $("#successRegisterMsg").removeClass("d-none"))
                    .catch((error) => console.log("Error" + error));
                } else {
                  $("#alreadyPending").removeClass("d-none");
                }
              }
            });
        }
      } else {
        $("#alreadyInUse").removeClass("d-none");
      }
    })
    .catch((error) => console.log("Error" + error));
}
export function homepageLogin() {
  fetch(
    `http://localhost:3000/persons?userName=${$.trim(
      $("input:eq(0)").val()
    )}&password=${$.trim($("input:eq(1)").val())}`
  )
    .then((data) => data.json())
    .then((successData) => {
      let logged = false;
      if (successData.length) {
        logged = true;
        $("#errorMsg").addClass("d-none");
        $("#successMsg").removeClass("d-none");

        localStorage.setItem(
          "userInfo",
          CryptoJS.AES.encrypt(JSON.stringify(successData[0]), "AmrAllam")
        );
        switch (successData[0]["type"]) {
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
      if (!logged) {
        displaySwapStatus($("#errorMsg"), "exist");
      }
    })
    .catch((error) => console.log("Error:" + error));
}
function SendEmail(objSent) {
  return emailjs.send("service_9ngcw51", "template_q8x8wzr", {
    to_name: objSent.firstName + " " + objSent.lastName,
    message: `Username: ${objSent.userName}`,
    massage2: `Password: ${objSent.password}`,
    email_id: objSent.email,
    subject: "ITI Login Information",
  });
}
function AppendToPersons(objSent) {
  return fetch("http://localhost:3000/persons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objSent),
  });
}
function DeleteFromPending(id) {
  return fetch(`http://localhost:3000/pending/${id}`, { method: "DELETE" });
}
export function reportShow() {
  $("#IdOfReportData").on("click", () => {
    displaySwapStatus($("#errorOfReport"), "notexist");
    displaySwapStatus($("#notFoundOfReport"), "notexist");
    displaySwapStatus($("#reportSideSection"), "notexist");
    displaySwapStatus($("#secondInReport"), "notexist");
    let trimmedValue = $.trim($("#textOfReportData").val());
    if (checkEmail(trimmedValue)) {
      //by Email
      fetch(`http://localhost:3000/persons?email=${trimmedValue}`)
        .then((data) => data.json())
        .then((successData) => {
          if (!successData.length) {
            displaySwapStatus($("#notFoundOfReport"), "notexist");
          } else {
            let currentPerson = successData[0];
            reportFirstName.value = currentPerson.firstName;
            reportLastName.value = currentPerson.lastName;
            reportID.value = currentPerson.id;
            reportEmail.value = currentPerson.email;
            reportAge.value = currentPerson.age;
            reportAddress.value = currentPerson.address;
            countDaysForEmployee(currentPerson.id);
            displaySwapStatus($("#reportSideSection"), "exist");
            displaySwapStatus($("#secondInReport"), "exist");
          }
        });
    } else {
      //Not Email
      if (
        !trimmedValue.length || //Empty
        isNaN(trimmedValue) //Not a Number
      ) {
        displaySwapStatus($("#errorOfReport"), "exist");
      } else {
        //Is Id
        fetch(`http://localhost:3000/persons/${trimmedValue}`)
          .then((data) => data.json())
          .then((successData) => {
            if (successData.length == 0) {
              displaySwapStatus($("#notFoundOfReport"), "exist");
            } else {
              let currentPerson = successData;
              reportFirstName.value = currentPerson.firstName;
              reportLastName.value = currentPerson.lastName;
              reportID.value = currentPerson.id;
              reportEmail.value = currentPerson.email;
              reportAge.value = currentPerson.age;
              reportAddress.value = currentPerson.address;
              countDaysForEmployee(
                currentPerson.id,
                currentPerson.firstName,
                currentPerson.lastName
              );
              displaySwapStatus($("#reportSideSection"), "exist");
              displaySwapStatus($("#secondInReport"), "exist");
            }
          });
      }
    }
  });
}
async function countDaysForEmployee(Id, firstName, lastName) {
  let TotalCounter = 0;
  let LateCounter = 0;
  let AbscentCounter = 0;
  let OnTimeCounter = 0;
  await fetch(`http://localhost:3000/attendence?userId=${Id}`)
    .then((data) => data.json())
    .then((successData) => {
      successData.forEach((attendenceDay) => {
        TotalCounter++;
        switch (attendenceDay.attendState) {
          case "Abscent": {
            AbscentCounter++;
            break;
          }
          case "Late": {
            LateCounter++;
            break;
          }
          case "On Time": {
            OnTimeCounter++;
            break;
          }
        }
      });
      reportTotal.value = TotalCounter;
      reportOnTime.value = OnTimeCounter;
      reportLate.value = LateCounter;
      reportAbscent.value = AbscentCounter;
    });
}
function forLoopRange(tableStart, tableEnd, successData) {
  for (var i = tableStart; i <= tableEnd; i++) {
    addRangeButtons(i);
    rangerFilterApply(i, successData);
  }
}
