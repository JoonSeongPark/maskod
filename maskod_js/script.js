document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "safeCookie3=foo; SameSite=None; Secure";

const addressInputEl = document.getElementById("address");
const searchBtn = document.getElementById("search");
const listContainer = document.getElementById("list-container");
const navLogoEl = document.getElementById("nav-left");
const headerEl = document.getElementById("header");
const footerEl = document.getElementById("footer");

const allMask = document.getElementById("all");
const plentyMask = document.getElementById("plenty");
const someMask = document.getElementById("some");
const fewMask = document.getElementById("few");
const emptyMask = document.getElementById("empty");
const sortMask = document.getElementById("sort");

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

function setTimeDiff(time) {
  const now = Date.parse(new Date());
  const date = Date.parse(`${time}`);
  const timeDiff = (now - date) / 1000;
  const sec = 60
  const min = sec*60
  const hour = min*24
  
  if (timeDiff < sec){
    return `${timeDiff} 초 전`
  } else if (timeDiff < min) {
    return `${Math.floor(timeDiff / sec)} 분 전`
  } else if (timeDiff < hour) {
    return `${Math.floor(timeDiff / min)} 시간 전`
  } else {
    return `${Math.floor(timeDiff / hour)} 일 전`
  }
}

function setInfoCategory() {
  listContainer.innerHTML = `
  <div class="info-category">
    <div id="info-name">
      <p>이름</p>
    </div>
    <div id="info-address">
      <p>주소</p>
    </div>
    <div id="info-stockat">
      <p>입고시간</p>
    </div>
    <div id="info-createdat">
      <p>갱신시간</p>
    </div>
  </div>
    `;
}

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
    <img src="/images/${store_type[`${info.type}`]}" class="store-img">
  </div>
  <div class="go-map" searchtext="${info.addr}, ${info.name}">
    <h3>지도에서 위치보기</h3>
  </div>
  </div>
  `;

  const circle = infoEl.querySelector(".store-type");
  circle.classList.add(`${info.remain_stat}`);

  listContainer.appendChild(infoEl);
}

// renderList();

function setFooterPosition() {
  const windowHeight = window.innerHeight;
  const navHeight = 60;
  const headerHeight = headerEl.offsetHeight;
  const footerHeight = footerEl.offsetHeight;
  const listHeight = listContainer.offsetHeight;

  if (windowHeight - navHeight - headerHeight - footerHeight < listHeight) {
    footerEl.style.position = "relative";
  } else {
    footerEl.style.position = "absolute";
  }
}

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

    listEl.forEach(el => {
      el.addEventListener("click", e => {
        const searchText = e.target.getAttribute("searchtext");
        window.open(`https://map.naver.com/v5/search/${searchText}`);
      });
    });
  }
}

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
}

searchBtn.addEventListener("click", renderList);
addressInputEl.addEventListener("keypress", function(e) {
  if (e.key == "Enter") {
    searchBtn.click();
  }
});

navLogoEl.addEventListener("click", () => {
  window.location.reload();
});

allMask.addEventListener("click", filterMaskStock);
plentyMask.addEventListener("click", filterMaskStock);
someMask.addEventListener("click", filterMaskStock);
fewMask.addEventListener("click", filterMaskStock);
emptyMask.addEventListener("click", filterMaskStock);
