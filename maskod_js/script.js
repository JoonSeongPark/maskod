document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "safeCookie3=foo; SameSite=None; Secure";

const addressInputEl = document.getElementById("address");
const selectSearchBtn = document.getElementById("select-search");
const typingSearchBtn = document.getElementById("typing-search");
// listContainer in footer.js
const navLogoEl = document.getElementById("nav-left");

// stockInfoEl in footer.js
const allMask = document.getElementById("all");
const plentyMask = document.getElementById("plenty");
const someMask = document.getElementById("some");
const fewMask = document.getElementById("few");
const emptyMask = document.getElementById("empty");
const sortMask = document.getElementById("sort");

const topAreaEl = document.getElementById("top-area");
const secondAreaEl = document.getElementById("second-area");
const thirdAreaEl = document.getElementById("third-area");
const fourthAreaEl = document.getElementById("fourth-area");

localStorage.clear();

// topArea setting
setTopArea();
function setTopArea() {
  topAreaEl.innerHTML = "<option value=''>주소선택</option>";
  for (let tArea in adArea) {
    topAreaEl.innerHTML += `<option value="${tArea}" >${tArea}</option>`;
  }
}

// secondArea setting
function setSecondArea(e) {
  thirdAreaEl.value = "";
  fourthAreaEl.value = "";

  thirdAreaEl.style.display = "none";
  fourthAreaEl.style.display = "none";

  if (e.target.value == "") {
    secondAreaEl.value = "";
    secondAreaEl.style.display = "none";
    return false;
  }

  const secondArea = adArea[e.target.value];
  if (Array.isArray(secondArea.subArea)) {
    secondAreaEl.innerHTML = "<option value='' >전체검색</option>";
    secondArea.subArea.forEach(item => {
      secondAreaEl.innerHTML += `<option value="${item}" >${item}</option>`;
    });
  } else {
    secondAreaEl.innerHTML = "<option value=''>주소선택</option>";
    for (let sArea in secondArea) {
      secondAreaEl.innerHTML += `<option value="${sArea}" >${sArea}</option>`;
    }
  }
  secondAreaEl.style.display = "block";
}
// thirdArea setting
function setThirdArea(e) {
  fourthAreaEl.value = "";

  fourthAreaEl.style.display = "none";

  if (e.target.value == "") {
    thirdAreaEl.value = "";
    thirdAreaEl.style.display = "none";
    return false;
  }
  let arrCheck = adArea[topAreaEl.value];
  if (Array.isArray(arrCheck.subArea)) {
    return false;
  }

  const thirdArea = adArea[topAreaEl.value][e.target.value];
  if (Array.isArray(thirdArea.subArea)) {
    thirdAreaEl.innerHTML = "<option value='' >전체검색</option>";
    thirdArea.subArea.forEach(item => {
      thirdAreaEl.innerHTML += `<option value="${item}" >${item}</option>`;
    });
  } else {
    thirdAreaEl.innerHTML = "<option value=''>주소선택</option>";
    for (let tArea in thirdArea) {
      thirdAreaEl.innerHTML += `<option value="${tArea}" >${tArea}</option>`;
    }
  }
  thirdAreaEl.style.display = "block";
}
// fourthArea setting
function setFourthArea(e) {
  let arrCheck = adArea[topAreaEl.value][secondAreaEl.value].subArea;
  if (Array.isArray(arrCheck)) {
    return false;
  } else {
    const fourthArea =
      adArea[topAreaEl.value][secondAreaEl.value][e.target.value].subArea;
    fourthAreaEl.innerHTML = "<option value=''>전체검색</option>";
    fourthArea.forEach(item => {
      fourthAreaEl.innerHTML += `<option value="${item}" >${item}</option>`;
    });
  }
  fourthAreaEl.style.display = "block";
}

// Category part setting
function setInfoCategory() {
  listContainer.innerHTML += `
  <div class="info-category">
  <div class="info-name">
      <p>이름</p>
    </div>
    <div class="info-address">
      <p>주소</p>
      </div>
    <div class="info-stockat">
    <p>입고시간</p>
    </div>
    <div class="info-createdat">
    <p>갱신시간</p>
    </div>
    </div>
    `;
}

// list form setting
function getInfoElinnerHTML(info) {
  const infoEl = document.createElement("div");
  infoEl.classList.add(`info-list`);
  infoEl.setAttribute("id", "info-list");

  infoEl.innerHTML = `
  <div class="info-name">
    <p>${info.name}</p>
  </div>
  <div class="info-address">
    <p>${info.addr}</p>
  </div>
  <div class="info-stockat">
    <p>${setTimeDiff(info.stock_at)}</p>
  </div>
  <div class="info-createdat">
    <p>${setTimeDiff(info.created_at)}</p>
  </div>
  <div class="store-type">
    <img src="images/${store_type[`${info.type}`]}" class="store-img">
  </div>
  <div class="go-map" name="${info.name}" searchtext="${info.addr}, ${
    info.name
  }" lat="${info.lat}" lng="${info.lng}">
    <h3>지도에서 위치보기</h3>
  </div>
    `;

  const circle = infoEl.querySelector(".store-type");
  circle.classList.add(`${info.remain_stat}`);

  listContainer.appendChild(infoEl);
}

// Mask information data request
async function getMaskInfo(addinput) {
  let address = addinput;

  // const res = await fetch(
  //   `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json`
  // );
  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${address}`
  );
  const data = await res.json();

  return data.stores;
}

// Render data list
async function renderList() {
  let addressInput;
  if (this.id == "select-search") {
    addressInput = `${topAreaEl.value} ${secondAreaEl.value} ${thirdAreaEl.value} ${fourthAreaEl.value}`.trim();
  } else if (this.id == "typing-search") {
    addressInput = addressInputEl.value;
  }
  if (addressInput == "") {
    setFooterPosition();
    return false;
  }
  console.log(addressInput);

  const maskInfos = await getMaskInfo(addressInput);

  const sellMaskInfos = maskInfos.filter(
    info => info.remain_stat !== "break" && info.remain_stat !== null
  );
  if (sellMaskInfos == "") {
    stockInfoEl.style.display = "none";
    listContainer.innerHTML = "<h2>검색결과가 없습니다.</h2>";
    setFooterPosition();
    return false;
  }
  localStorage.setItem("searchedInfos", JSON.stringify(sellMaskInfos));

  stockInfoEl.style.display = "block";
  listContainer.innerHTML = `<h2 class='search-result'><span>${sellMaskInfos.length}</span> 개의 장소가 검색되었습니다.</h2>`;
  setInfoCategory();

  sellMaskInfos.forEach(info => {
    getInfoElinnerHTML(info);
  });

  setFooterPosition();

  if (maskInfos != null) {
    const listEl = document.querySelectorAll(".go-map");

    openMap(listEl);
  }
}

// Filter mask list
function filterMaskStock() {
  const totalStock = JSON.parse(localStorage.getItem("searchedInfos"));
  if (totalStock == null) {
    setFooterPosition();
    return false;
  }
  let filteredStock;
  if (this.id === "all") {
    filteredStock = totalStock;
  } else if (this.id === "sort") {
  } else {
    filteredStock = totalStock.filter(info => info.remain_stat == this.id);
  }

  if (filteredStock.length == 0) {
    listContainer.innerHTML = `<h2 class='search-result'>정렬 결과가 존재하지 않습니다.</h2>`;
    setFooterPosition();
    return false;
  } else {
    listContainer.innerHTML = `<h2 class='search-result'><span>${filteredStock.length}</span> 개의 장소가 정렬되었습니다.</h2>`;
  }

  setInfoCategory();

  filteredStock.forEach(info => {
    getInfoElinnerHTML(info);
  });

  setFooterPosition();

  if (filteredStock != null) {
    const listEl = document.querySelectorAll(".go-map");

    openMap(listEl);
  }
}

// EventListners

// nav
navLogoEl.addEventListener("click", () => {
  window.location.reload();
});

// search
topAreaEl.addEventListener("change", setSecondArea);
secondAreaEl.addEventListener("change", setThirdArea);
thirdAreaEl.addEventListener("change", setFourthArea);

selectSearchBtn.addEventListener("click", renderList);

// typingSearchBtn.addEventListener("click", renderList);

// addressInputEl.addEventListener("keypress", function(e) {
//   if (e.key == "Enter") {
//     typingSearchBtn.click();
//   }
// });

// sorting
allMask.addEventListener("click", filterMaskStock);
plentyMask.addEventListener("click", filterMaskStock);
someMask.addEventListener("click", filterMaskStock);
fewMask.addEventListener("click", filterMaskStock);
emptyMask.addEventListener("click", filterMaskStock);
