import "./header.css";

import { adArea } from "../../constants";

class Header {
  render() {
    const body = document.querySelector("body");

    // web name part
    const header = document.createElement("header");
    header.id = "header";
    header.innerHTML = "<h1>마스크 어디?</h1>";
    header.innerHTML +=
      "<p>< <strong>Mask O</strong>r <strong>D</strong>isease ></p>";

    // select search part
    const addressSelect = document.createElement("div");
    addressSelect.classList.add("address-select");

    const selectHead = document.createElement("div");
    selectHead.classList.add("select-head");
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

    // type search part
    const addressType = document.createElement("div");
    addressType.classList.add("search-box");

    const searchHead = document.createElement("div");
    searchHead.classList.add("search-head");

    // [100~1000] array to option string
    const options = new Array(10)
      .fill(100)
      .map((v, i) => {
        return i === 9
          ? `<option value="1000">1km</option>`
          : i === 4
          ? `<option value="500" selected>500m</option>`
          : `<option value="${v * (i + 1)}">${v * (i + 1)}m</option>`;
      })
      .join("");

    searchHead.innerHTML = `
      <h3><i class="fa fa-map-marker-alt fa-sm"></i>&nbsp주변에서 마스크 찾기</h3>
      <p>: 현재 위치를 기준으로 검색합니다.<br/>
          원하는 주소 입력도 가능합니다.<br/>
          해당주소를 기준으로
          <select class="circle-distance" id="circle-distance" dir="auto">
            ${options}
          </select>
          이내의 가까운 순 정보 제공.
      </p>
    `;
    addressType.appendChild(searchHead);

    const searchContent = document.createElement("div");
    searchContent.classList.add("search-content");
    searchContent.innerHTML = `
      <input type="text" id="address" class="address" placeholder="도로명 또는 번지 주소를 입력하세요."/>
      <button id="typing-search"><i class="fa fa-search"></i></button>
    `;
    addressType.appendChild(searchContent);
    header.appendChild(addressType);

    body.appendChild(header);

    // split line
    body.innerHTML += `
    <hr style="width: 90vw; max-width: 1200px;" />
    `;
  }

  // select option filled
  setTopArea() {
    const topAreaEl = document.getElementById("top-area");
    topAreaEl.innerHTML = "<option value=''>주소선택</option>";
    for (let tArea in adArea) {
      topAreaEl.innerHTML += `<option value="${tArea}" >${tArea}</option>`;
    }
  }

  // select button render setting
  setSelectArea(e) {
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
      thirdAreaEl.className = "area"
      fourthAreaEl.className = "area"
    } else if (this.id === "second-area") {
      arrCheck = adArea[topAreaEl.value];
      nthArea = adArea[topAreaEl.value][e.target.value];
      nthAreaEl = thirdAreaEl;

      fourthAreaEl.value = "";
      fourthAreaEl.className = "area"

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
  eventListener() {
    const topAreaEl = document.getElementById("top-area");
    const secondAreaEl = document.getElementById("second-area");
    const thirdAreaEl = document.getElementById("third-area");

    topAreaEl.addEventListener("change", this.setSelectArea);
    secondAreaEl.addEventListener("change", this.setSelectArea);
    thirdAreaEl.addEventListener("change", this.setSelectArea);
  }
}

export default Header;
