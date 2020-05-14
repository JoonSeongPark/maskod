import "./header.css";

import { adArea } from "../../constants"

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
      <h3><i class="fa fa-map-marker-alt fa-lg"></i> &nbsp주소 선택하여 마스크찾기</h3>
      <p>: 선택한 행정구역을 현재 위치 기준으로 가까운 순 정보 제공.</p>
    `;
    addressSelect.appendChild(selectHead)

    const selectContent = document.createElement("div");
    selectContent.classList.add("select-content");
    selectContent.innerHTML = `
      <select class="top-area" id="top-area"> </select>
      <select class="second-area" id="second-area"> </select>
      <select class="third-area" id="third-area"> </select>
      <select class="fourth-area" id="fourth-area"> </select>
      <button id="select-search"><i class="fa fa-search"></i></button>
    `
    addressSelect.appendChild(selectContent)
        
    header.appendChild(addressSelect)
    body.appendChild(header);
  }

  // select option filled
  setTopArea() {
    const topAreaEl = document.getElementById('top-area')
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
    nthAreaEl.innerHTML = "<option value=''>전체검색</option>";
    nthArea.subArea.forEach(item => {
      nthAreaEl.innerHTML += `<option value="${item}">${item}</option>`;
    });
  } else {
    nthAreaEl.innerHTML = "<option value=''>주소선택</option>";
    for (let sArea in nthArea) {
      nthAreaEl.innerHTML += `<option value="${sArea}">${sArea}</option>`;
    }
  }
  nthAreaEl.style.display = "block";
}

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
