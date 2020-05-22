import "./openModal.css";

class OpeningModal {
  static render() {
    const body = document.querySelector("body");

    const openingModalContainer = document.createElement("div");
    openingModalContainer.classList.add("opening-modal-container", "active");
    openingModalContainer.id = "opening-modal-container";

    const openingModal = document.createElement("div");
    openingModal.classList.add("opening-modal");

    openingModal.innerHTML = `
        <h2>서비스 정보</h2>
        <p>* 판매처 앞의 대기인원은 고려되지 않습니다.</p>
        <p>* 인근 반경 거리에 오차가 발생할 수 있습니다.</p>
        <p>* 제공되는 정보는 5~10분 정도의 반영시간 차이가 있습니다.</p>
        <p>* 세종특별자치시는 주소 선택 기능에서 전체검색만 제공됩니다.</p>
        <br />
        <p>* 지도기반 검색은 우측 상단의 MAP으로 가능합니다.</p>
        <br />
        <p>정보제공: 건강보험심사평가원</p>
        <br />
        <p>
          대한민국 약국, 우체국, 농협 관계자님들께<br />
          감사의 인사를 전합니다.
        </p>

        <br />
        <p>문의사항이나 버그는 하단의 이메일로 보내주세요!</p>

        <button class="opening-close-btn" id="opening-close-btn">확인</button>
    `;

    openingModalContainer.appendChild(openingModal);
    body.appendChild(openingModalContainer);
  }

  static OpeningEventListener() {
    const openingModalContainer = document.getElementById(
      "opening-modal-container"
    );
    const openingCloseBtn = document.getElementById("opening-close-btn");

    openingCloseBtn.addEventListener("click", () =>
      openingModalContainer.classList.remove("active")
    );
  }
}

export default OpeningModal;
