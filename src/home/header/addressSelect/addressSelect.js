import SearchResult from "../../main/searchResult/searchResult";
import "./addressSelect.css";

import { adArea } from "../../constants";

class AddressSelect {
  render() {
    const header = document.querySelector("header");

    const addressSelect = document.createElement("div");
    addressSelect.classList.add("address-select");

    const selectHead = document.createElement("div");
    selectHead.innerHTML = `
          <h3><i class="fa fa-map-marker-alt fa-sm"></i>&nbsp주소 선택하여 마스크 찾기</h3>
          <p>: 선택한 행정구역을 현재 위치 기준으로 가까운 순 정보 제공.</p>
        `;
    addressSelect.appendChild(selectHead);

    const selectContent = document.createElement("div");
    selectContent.classList.add("select-content");

    // [area select] array to string
    const selectArr = ["top-area", "second-area", "third-area", "fourth-area"]
      .map((v) =>
        v === "top-area"
          ? `<select class="area active-area" id="${v}"> </select>`
          : `<select class="area" id="${v}"> </select>`
      )
      .join("");

    selectContent.innerHTML = `
          ${selectArr}
          <button id="select-search"><i class="fa fa-search"></i></button>
        `;
    addressSelect.appendChild(selectContent);
    header.appendChild(addressSelect);
  }

  // select option filled
  setTopArea() {
    const topAreaEl = document.getElementById("top-area");
    topAreaEl.innerHTML = "<option value=''>주소선택</option>";
    for (let topArea in adArea) {
      topAreaEl.innerHTML += `<option value="${topArea}" >${topArea}</option>`;
    }
  }

  // select button render setting
  static setSelectArea(e) {
    const topAreaEl = document.getElementById("top-area");
    const secondAreaEl = document.getElementById("second-area");
    const thirdAreaEl = document.getElementById("third-area");
    const fourthAreaEl = document.getElementById("fourth-area");

    let arrCheck;
    let nthArea;
    let nthAreaEl;

    if (this.id === "top-area") {
      arrCheck = adArea;
      nthArea = adArea[e.target.value];
      nthAreaEl = secondAreaEl;

      thirdAreaEl.value = "";
      fourthAreaEl.value = "";
      thirdAreaEl.className = "area";
      fourthAreaEl.className = "area";
    } else if (this.id === "second-area") {
      arrCheck = adArea[topAreaEl.value];
      nthArea = adArea[topAreaEl.value][e.target.value];
      nthAreaEl = thirdAreaEl;

      fourthAreaEl.value = "";
      fourthAreaEl.className = "area";
    } else if (this.id === "third-area") {
      arrCheck = adArea[topAreaEl.value][secondAreaEl.value];
      nthArea = adArea[topAreaEl.value][secondAreaEl.value][e.target.value];
      nthAreaEl = fourthAreaEl;
    }

    if (e.target.value == "") {
      nthAreaEl.value = "";

      nthAreaEl.className = "area";
      return false;
    }

    if (Array.isArray(arrCheck.subArea)) {
      return false;
    }

    if (Array.isArray(nthArea.subArea)) {
      nthAreaEl.innerHTML = "<option value=''>전체검색</option>";
      nthArea.subArea.forEach((item) => {
        nthAreaEl.innerHTML += `<option value="${item}">${item}</option>`;
      });
    } else {
      nthAreaEl.innerHTML = "<option value=''>주소선택</option>";
      for (let sArea in nthArea) {
        nthAreaEl.innerHTML += `<option value="${sArea}">${sArea}</option>`;
      }
    }
    nthAreaEl.className = "area active-area";
  }

  // address select event listener
  static selectEventListener() {
    const topAreaEl = document.getElementById("top-area");
    const secondAreaEl = document.getElementById("second-area");
    const thirdAreaEl = document.getElementById("third-area");

    topAreaEl.addEventListener("change", this.setSelectArea);
    secondAreaEl.addEventListener("change", this.setSelectArea);
    thirdAreaEl.addEventListener("change", this.setSelectArea);

    const searchBtn = document.getElementById("select-search");
    searchBtn.addEventListener("click", (e) => SearchResult.render(e));
  }
}

export default AddressSelect;
