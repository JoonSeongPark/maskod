document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "safeCookie3=foo; SameSite=None; Secure";

const addressInputEl = document.getElementById("address");
const searchBtn = document.getElementById("search");
const listContainer = document.getElementById("list-container");

const allMask = document.getElementById("all");
const plentyMask = document.getElementById("plenty");
const someMask = document.getElementById("some");
const fewMask = document.getElementById("few");
const emptyMask = document.getElementById("empty");
const sortMask = document.getElementById("sort");

const store_type = { "01": "약국", "02": "우체국", "03": "농협" };
const mask_stock = {
  plenty: "100개 이상",
  some: "30개 이상",
  few: "1개 이상",
  empty: "재고 없음",
  break: "판매 중지",
  null: "정보 없음"
};

async function getMaskInfo() {
  let address = addressInputEl.value;

  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json`
  );
  // const res = await fetch(
  //   `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${address}`
  // );
  const data = await res.json();

  return data.stores;
}

async function renderList() {
  const maskInfos = await getMaskInfo();

  const sellMaskInfos = maskInfos.filter(info => info.remain_stat !== "break");

  localStorage.setItem("searchedInfos", JSON.stringify(sellMaskInfos));

  sellMaskInfos.forEach(info => {
    const infoEl = document.createElement("div");
    infoEl.classList.add(`search-list`);
    infoEl.classList.add(`${info.remain_stat}`);

    infoEl.innerHTML = `
    <div class="first-line">
      <p class="name">${info.name}</p>
      <p class="type">${store_type[`${info.type}`]}</p>
    </div>
    <div class="second-line">
      <p><strong>주소</strong>: ${info.addr}</p>
    </div>
    <div class="third-line">
      <p class="category"><strong>재고량</strong></p>
      <p class="content">${mask_stock[`${info.remain_stat}`]}</p>

      <p class="category"><strong>입고시간</strong></p>
      <p class="content">${info.stock_at}</p>

      <p class="category"><strong>정보갱신</strong></p>
      <p class="content">${info.created_at}</p>
    </div>
  </div>
    `;

    listContainer.appendChild(infoEl);
  });
}

function filterMaskStock() {
  console.log(this.id);

  const totalStock = JSON.parse(localStorage.getItem("searchedInfos"));
  let filteredStock;
  if (this.id === "all") {
    filteredStock = totalStock;
  } else if (this.id === 'sort') {

  } else {
    filteredStock = totalStock.filter(info => info.remain_stat == this.id);
  }

  // let filteredStock;

  // if (this.id === "all") {
  //   filteredStock = totalStock;
  // } else if (this.id === "sort") {
  //   // 수정 필요
  //   filteredStock = totalStock;
  // } else {
  //   filteredStock = totalStock.filter(info => {
  //     info.remain_stat == this.id;
  //   });
  // }
  console.log(filteredStock);

  // if (filteredStock == undefined) {
  //   return false;
  // }

  listContainer.innerHTML = "";
  filteredStock.forEach(info => {
    const infoEl = document.createElement("div");
    infoEl.classList.add(`search-list`);
    infoEl.classList.add(`${info.remain_stat}`);

    infoEl.innerHTML = `
    <div class="first-line">
      <p class="name">${info.name}</p>
      <p class="type">${store_type[`${info.type}`]}</p>
    </div>
    <div class="second-line">
      <p><strong>주소</strong>: ${info.addr}</p>
    </div>
    <div class="third-line">
      <p class="category"><strong>재고량</strong></p>
      <p class="content">${mask_stock[`${info.remain_stat}`]}</p>

      <p class="category"><strong>입고시간</strong></p>
      <p class="content">${info.stock_at}</p>

      <p class="category"><strong>정보갱신</strong></p>
      <p class="content">${info.created_at}</p>
    </div>
  </div>
    `;

    listContainer.appendChild(infoEl);
  });
}

renderList();

searchBtn.addEventListener("click", renderList);

allMask.addEventListener("click", filterMaskStock);
plentyMask.addEventListener("click", filterMaskStock);
someMask.addEventListener("click", filterMaskStock);
fewMask.addEventListener("click", filterMaskStock);
emptyMask.addEventListener("click", filterMaskStock);
// sortMask.addEventListener('click',sortMaskStock)
