import "./addressType.css";

class AddressType {
  render() {
    const body = document.querySelector("body");
    const header = document.querySelector("header");

    // type search part
    const addressType = document.createElement("div");
    addressType.classList.add("address-type");

    const typeHead = document.createElement("div");

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

    typeHead.innerHTML = `
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
    addressType.appendChild(typeHead);

    const searchContent = document.createElement("div");
    searchContent.classList.add("search-content");
    searchContent.innerHTML = `
      <input type="text" id="address" class="address" placeholder="도로명 또는 번지 주소를 입력하세요."/>
      <button id="typing-search"><i class="fa fa-search"></i></button>
    `;
    addressType.appendChild(searchContent);
    header.appendChild(addressType);

    body.appendChild(header);
  }
}

export default AddressType;
