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

const store_type = { "01": "pharmacy.png", "02": "post_office.png", "03": "nonghyup.png" };
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

  // const res = await fetch(
  //   `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json`
  // );
  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${address}`
  );
  const data = await res.json();

  return data.stores;
}
renderList()
async function renderList() {
  const maskInfos = await getMaskInfo();

  const sellMaskInfos = maskInfos.filter(info => (info.remain_stat !== "break") && (info.remain_stat !== null));
  
  localStorage.setItem("searchedInfos", JSON.stringify(sellMaskInfos));

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

  sellMaskInfos.forEach(info => {
    const infoEl = document.createElement("div");
    infoEl.classList.add(`info-list`);

    infoEl.innerHTML = `
        <div class="info-name">
          <p>${info.name}</p>
        </div>
        <div class="info-address">
          <p>${info.addr}</p>
        </div>
        <div class="info-stockat">
          <p>${info.stock_at}</p>
        </div>
        <div class="info-createdat">
          <p>${info.created_at}</p>
        </div>
        <div class="store-type">
          <img src="/images/${store_type[`${info.type}`]}" class="store-img">
        </div>
    `;
    const circle = infoEl.querySelector('.store-type')
    circle.classList.add(`${info.remain_stat}`)
    
    listContainer.appendChild(infoEl);
  });
  // const circle = document.querySelectorAll('.store-type')
  // console.log(circle)
  // circle.forEach(item => item.classList.add(`${item.innerText}`))
}

function filterMaskStock() {
  const totalStock = JSON.parse(localStorage.getItem("searchedInfos"));
  let filteredStock;
  if (this.id === "all") {
    filteredStock = totalStock;
  } else if (this.id === "sort") {
  } else {
    filteredStock = totalStock.filter(info => info.remain_stat == this.id);
  }

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
  filteredStock.forEach(info => {
    const infoEl = document.createElement("div");
    infoEl.classList.add(`info-list`);
    
    // ${store_type[`${info.type}`]}
    infoEl.innerHTML = `
      <div class="info-name">
        <p>${info.name}</p>
      </div>
      <div class="info-address">
        <p>${info.addr}</p>
      </div>
      <div class="info-stockat">
        <p>${info.stock_at}</p>
      </div>
      <div class="info-createdat">
        <p>${info.created_at}</p>
      </div>
      <div class="store-type">
        ${info.remain_stat}
      </div>
    `;
    
    const circle = infoEl.querySelector('.store-type')
    circle.classList.add(`${info.remain_stat}`)

    listContainer.appendChild(infoEl);
  });
}

// renderList();

searchBtn.addEventListener("click", renderList);
addressInputEl.addEventListener("keypress", function(e) {
  if (e.key == "Enter") {
    searchBtn.click();
  }
});

allMask.addEventListener("click", filterMaskStock);
plentyMask.addEventListener("click", filterMaskStock);
someMask.addEventListener("click", filterMaskStock);
fewMask.addEventListener("click", filterMaskStock);
emptyMask.addEventListener("click", filterMaskStock);
// sortMask.addEventListener('click',sortMaskStock)
