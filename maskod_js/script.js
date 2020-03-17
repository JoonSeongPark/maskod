document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "safeCookie3=foo; SameSite=None; Secure";

const addressInputEl = document.getElementById("address");
const searchBtn = document.getElementById("search");
const listContainer = document.getElementById("list-container");
const navLogoEl = document.getElementById("nav-left");
const headerEl = document.getElementById("header");
const footerEl = document.getElementById("footer");
const mapModalEl = document.getElementById("map-modal-container");
const mapHeader = document.getElementById("map-header");
const mapCloseBtn = document.getElementById("map-close-btn");

const allMask = document.getElementById("all");
const plentyMask = document.getElementById("plenty");
const someMask = document.getElementById("some");
const fewMask = document.getElementById("few");
const emptyMask = document.getElementById("empty");
const sortMask = document.getElementById("sort");

const mon = document.getElementById("mon");
const tue = document.getElementById("tue");
const wed = document.getElementById("wed");
const thu = document.getElementById("thu");
const fri = document.getElementById("fri");
const satSun = document.getElementById("sat-sun");

const store_type = {
  "01": "pharmacy.png",
  "02": "post_office.png",
  "03": "nonghyup.png"
};
const mask_stock = {
  plenty: "100개 이상",
  some: "30개 이상",
  few: "1개 이상",
  empty: "재고 없음",
  break: "판매 중지",
  null: "정보 없음"
};

localStorage.clear();

// Category part setting
function setInfoCategory() {
  listContainer.innerHTML = `
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

renderList();

// Time expression
function setTimeDiff(time) {
  const now = Date.parse(new Date());
  const date = Date.parse(`${time}`);
  const timeDiff = (now - date) / 1000;
  const sec = 60;
  const min = sec * 60;
  const hour = min * 24;

  if (timeDiff < sec) {
    return `${timeDiff} 초 전`;
  } else if (timeDiff < min) {
    return `${Math.floor(timeDiff / sec)} 분 전`;
  } else if (timeDiff < hour) {
    return `${Math.floor(timeDiff / min)} 시간 전`;
  } else {
    return `${Math.floor(timeDiff / hour)} 일 전`;
  }
}

// See on a map
function openMap(element) {
  element.forEach(el => {
    el.addEventListener("click", e => {
      const lat = e.target.getAttribute("lat");
      const lng = e.target.getAttribute("lng");
      const name = e.target.getAttribute("name");
      const position = new naver.maps.LatLng(lat, lng);
      const mapOptions = {
        center: position.destinationPoint(270, 555),
        zoom: 16
      };

      const mapDiv = document.getElementById("map-body");
      mapDiv.innerHTML = "";
      const map = new naver.maps.Map(mapDiv, mapOptions);

      const markerOptions = {
        position: position,
        map: map,
        icon: {
          content:
            '<img src="images/map-marker.png" alt="marker" class="map-marker">',
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35)
        }
      };
      const marker = new naver.maps.Marker(markerOptions);
      mapHeader.innerHTML = `<h3>${name}</h3>`;
      mapModalEl.classList.add("show-map-modal");
    });
  });
}

fifthdays();

// fifth days mask
function fifthdays() {
  const today = new Date();
  const day = today.getDay();
  const days = { 0: satSun, 1: mon, 2: tue, 3: wed, 4: thu, 5: fri, 6: satSun };
  
  const contentChange =
    "font-size:larger; color:#000; border-bottom-left-radius:4px;border-bottom-right-radius:4px;";
  const boxChange = "transform:translate(0,-10%);"
  days[day].style.cssText = contentChange;
  days[day].parentElement.style.cssText = boxChange;
}

setFooterPosition();

// Footer position setting at rendering
function setFooterPosition() {
  const windowHeight = window.innerHeight
  const navHeight = 60;
  const headerHeight = headerEl.offsetHeight;
  const hrHeight = 10;
  const footerHeight = footerEl.offsetHeight;
  const listHeight = listContainer.offsetHeight;
  const heightSum =
    navHeight + headerHeight + footerHeight + hrHeight + listHeight;
  
  if (windowHeight <= heightSum) {
    footerEl.style.position = "relative";
  } else {
    footerEl.style.position = "fixed";
  }
}

// Mask information data request
async function getMaskInfo() {
  let address = addressInputEl.value;

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
  if (addressInputEl.value == "") {
    return false;
  }

  const maskInfos = await getMaskInfo();

  const sellMaskInfos = maskInfos.filter(
    info => info.remain_stat !== "break" && info.remain_stat !== null
  );

  localStorage.setItem("searchedInfos", JSON.stringify(sellMaskInfos));

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
    return false;
  }
  let filteredStock;
  if (this.id === "all") {
    filteredStock = totalStock;
  } else if (this.id === "sort") {
  } else {
    filteredStock = totalStock.filter(info => info.remain_stat == this.id);
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

searchBtn.addEventListener("click", renderList);
addressInputEl.addEventListener("keypress", function(e) {
  if (e.key == "Enter") {
    searchBtn.click();
  }
});


// addressInputEl.addEventListener("focus", () => {
//   setTimeout(setFooterPosition, 100);
// });
// addressInputEl.addEventListener("focusout", () => {
//   setTimeout(setFooterPosition, 100);
// });

window.addEventListener('resize', setFooterPosition)

navLogoEl.addEventListener("click", () => {
  window.location.reload();
});

allMask.addEventListener("click", filterMaskStock);
plentyMask.addEventListener("click", filterMaskStock);
someMask.addEventListener("click", filterMaskStock);
fewMask.addEventListener("click", filterMaskStock);
emptyMask.addEventListener("click", filterMaskStock);

window.addEventListener("click", e =>
  e.target == mapModalEl ? mapModalEl.classList.remove("show-map-modal") : false
);

mapCloseBtn.addEventListener("click", () => {
  mapModalEl.classList.remove("show-map-modal");
});
