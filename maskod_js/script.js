document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "safeCookie3=foo; SameSite=None; Secure";

const addressInputEl = document.getElementById("address");
const searchBtn = document.getElementById("search");
const listContainer = document.getElementById("list-container");

const store_type = { "01": "약국", "02": "우체국", "03": "농협" };
const mask_stock = {
  plenty: "100개 이상",
  some: "30개 이상",
  few: "1개 이상",
  empty: "재고 없음"
};

async function getMaskInfo() {
  let address = addressInputEl.value;

  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${address}`
  );
  const data = await res.json();

  return data.stores;
}

async function renderList() {
  const maskInfos = await getMaskInfo();
  
  maskInfos.forEach(info => {
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
searchBtn.addEventListener("click", renderList);
