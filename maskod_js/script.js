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

// select button render setting
function setSelectArea(e) {
  let arrCheck;
  let nthArea;
  let nthAreaEl;

  if (this.id === "top-area") {
    arrCheck = adArea;
    nthArea = adArea[e.target.value];
    nthAreaEl = secondAreaEl;

    thirdAreaEl.value = "";
    fourthAreaEl.value = "";
    thirdAreaEl.style.display = "none";
    fourthAreaEl.style.display = "none";
  } else if (this.id === "second-area") {
    arrCheck = adArea[topAreaEl.value];
    nthArea = adArea[topAreaEl.value][e.target.value];
    nthAreaEl = thirdAreaEl;

    fourthAreaEl.value = "";
    fourthAreaEl.style.display = "none";
  } else if (this.id === "third-area") {
    arrCheck = adArea[topAreaEl.value][secondAreaEl.value];
    nthArea = adArea[topAreaEl.value][secondAreaEl.value][e.target.value];
    nthAreaEl = fourthAreaEl;
  }

  if (e.target.value == "") {
    nthAreaEl.value = "";
    nthAreaEl.style.display = "none";
    return false;
  }

  if (Array.isArray(arrCheck.subArea)) {
    return false;
  }

  if (Array.isArray(nthArea.subArea)) {
    nthAreaEl.innerHTML = "<option value='' >전체검색</option>";
    nthArea.subArea.forEach(item => {
      nthAreaEl.innerHTML += `<option value="${item}" >${item}</option>`;
    });
  } else {
    nthAreaEl.innerHTML = "<option value=''>주소선택</option>";
    for (let sArea in nthArea) {
      nthAreaEl.innerHTML += `<option value="${sArea}" >${sArea}</option>`;
    }
  }
  nthAreaEl.style.display = "block";
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

// Mask information data request (selector)
async function getMaskSelectInfo() {
  let address = `${topAreaEl.value} ${secondAreaEl.value} ${thirdAreaEl.value} ${fourthAreaEl.value}`.trim();

  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${address}`
  );
  const data = await res.json();

  return data.stores;
}
// Mask information data request (selector)
async function getMaskTypeInfo() {
  const [lat, lng] = await getLatLngFromAddress();

  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=500`
  );
  const data = await res.json();

  return data.stores;
}

async function getLatLngFromAddress() {
  const addr = addressInputEl.value;

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${addr}`,
    {
      method: "GET",
      headers: {
        Authorization: "KakaoAK " + "f965a322d95b3d29f27e28b80af51c51"
      }
    }
  );
  const data = await res.json();

  return [data.documents[0].y, data.documents[0].x];
}

// Render data list
async function renderList() {
  let maskInfos = "";

  if (this.id == "select-search") {
    maskInfos = await getMaskSelectInfo();
  } else if (this.id == "typing-search") {
    maskInfos = await getMaskTypeInfo();
  }
  if (maskInfos == "") {
    setFooterPosition();
    return false;
  }

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
    openMap()
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
    openMap();
  }
}

// EventListners

// nav
navLogoEl.addEventListener("click", () => {
  window.location.reload();
});

// search
topAreaEl.addEventListener("change", setSelectArea);
secondAreaEl.addEventListener("change", setSelectArea);
thirdAreaEl.addEventListener("change", setSelectArea);

selectSearchBtn.addEventListener("click", renderList);

typingSearchBtn.addEventListener("click", renderList);

addressInputEl.addEventListener("keypress", function(e) {
  if (e.key == "Enter") {
    typingSearchBtn.click();
  }
});

// sorting
allMask.addEventListener("click", filterMaskStock);
plentyMask.addEventListener("click", filterMaskStock);
someMask.addEventListener("click", filterMaskStock);
fewMask.addEventListener("click", filterMaskStock);
emptyMask.addEventListener("click", filterMaskStock);
