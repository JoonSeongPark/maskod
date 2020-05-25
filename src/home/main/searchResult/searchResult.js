import getSelectMaskInfo from "../../function/getSelectMaskInfo";
import getTypeMaskInfo from "../../function/getTypeMaskInfo";
import euclideanDist from "../../function/euclideanDist";
import timeDiff from "../../function/timeDiff";

import mapModal from "../../mapModal/mapModal";

import { setFooterPosition } from "../../footer/footer";

import "./searchResult.css";

class SearchResult {
  static async render(e) {
    let dataObj;
    let lat, lng;
    const clickedBtn = e.target.closest("button");

    switch (clickedBtn.id) {
      case "select-search":
        dataObj = await getSelectMaskInfo();
        break;
      case "type-search":
        dataObj = await getTypeMaskInfo();
        if (!dataObj) return;
        console.log("else");
        break;
    }
    console.log(dataObj);

    // if (JSON.parse(localStorage.getItem("curLatLng"))) {
    //   lat = JSON.parse(localStorage.getItem("curLatLng"))[0];
    //   lng = JSON.parse(localStorage.getItem("curLatLng"))[1];
    // } else {
    //   let pos = await getLatLngFromAddress();
    //   lat = pos[0];
    //   lng = pos[1];
    // }
    // } else if (clickedBtn.id == "typing-search" || clickedBtn.id == "address") {
    //   dataArr = await getMaskTypeInfo();

    //   if (dataArr == "") {
    //     return false;
    //   } else {
    //     lat = JSON.parse(localStorage.getItem("inputLatLng"))[0];
    //     lng = JSON.parse(localStorage.getItem("inputLatLng"))[1];
    //   }

    const dataArr = dataObj.stores;
    const stockFilter = document.getElementById("stock-filter");
    const container = document.getElementById("container");

    const sellDataArr = dataArr.filter(
      (info) => info.remain_stat !== "break" && info.remain_stat !== null
    );

    if (dataObj.count === 0 || sellDataArr.length === 0) {
      stockFilter.className = "stock-filter";
      container.innerHTML = "<h2>검색결과가 없습니다.</h2>";
      setFooterPosition();
      return false;
    } else {
    }

    // sorted by distance
    sellDataArr.sort((a, b) => {
      return (
        euclideanDist(a.lat, a.lng, lat, lng) -
        euclideanDist(b.lat, b.lng, lat, lng)
      );
    });

    // localStorage.setItem("searchedInfos", JSON.stringify(sellDataArr));

    // search result render part
    stockFilter.className = "stock-filter active";
    container.innerHTML = `<h2 class='search-result'><span>${sellDataArr.length}</span> 개의 장소가 검색되었습니다.</h2>`;

    new this.renderCategory(container);

    const infoLists = document.createElement("div");
    infoLists.id = "info-lists";
    infoLists.addEventListener("click", (e) => mapModal.mapRender(e));
    
    sellDataArr.forEach((info) => {
      new this.resultList(info, infoLists);
    });

    container.appendChild(infoLists);

    setFooterPosition();

    // if (maskInfos != null) {
    //   openMap();
    // }
  }

  // list category render
  static renderCategory(container) {
    container.innerHTML += `
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

  // list element html part
  static resultList(info, infoLists) {
    const infoEl = document.createElement("div");
    infoEl.classList.add(`info-list`,`${info.remain_stat}`);
    infoEl.id = "info-list";

    infoEl.innerHTML = `
      <div class="info-name">
        <p>${info.name}</p>
      </div>
      <div class="info-address">
        <p>${info.addr}</p>
      </div>
      <div class="info-stockat">
        <p>${timeDiff(info.stock_at)}</p>
      </div>
      <div class="info-createdat">
        <p>${timeDiff(info.created_at)}</p>
      </div>
  
      <div class="go-map" id="${info.code}" name="${info.name}"
        searchtext="${info.addr}, ${info.name}"
        lat="${info.lat}" lng="${info.lng}" remainstat="${info.remain_stat}">
        <h3>지도에서 위치보기</h3>
      </div>
      `;

    infoLists.appendChild(infoEl);
    
  }
}

export default SearchResult;
