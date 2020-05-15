import "./fifthDay.css";

class FifthDay {
  render() {
    const container = document.getElementById("container");

    const listElements = [
      ["월", "mon"],
      ["화", "tue"],
      ["수", "wed"],
      ["목", "thu"],
      ["금", "fri"],
      ["토·일", "sat-sun"],
    ]
      .map((arr, i) => {
        return i === 5
          ? `<li class="days">
          <div class="days-header" id="weekend">
            <p>${arr[0]}</p>
          </div>
          <div class="days-content" id="${arr[1]}">
            <h4>주간</h4>
            <h4>미구매자</h4>
          </div>
        </li>`
          : ` <li class="days">
            <div class="days-header">
              <p>${arr[0]}</p>
            </div>
            <div class="days-content" id="${arr[1]}">
              <h4>${i + 1}·${i + 6}</h4>
            </div>
          </li>`;
      })
      .join("");

    container.innerHTML = `
  <h1>마스크 5부제</h1>
  <ul class="fifth-day-mask">
    ${listElements}
  </ul>
  <div class="fifth-explain">
    <p>※출생연도 끝자리 기준, 신분증 지참 필수</p>
    <p>모든 영업소에서 요일별로 1주일에 1인당 3매씩 마스크 구입을 제한</p>
  </div>
  `;
  }

  // mask selling day animation
  todayAnimation() {
    const today = new Date();
    const day = today.getDay();
    let dayEl;
    switch (day) {
      case 0 || 6 :
        dayEl = document.getElementById("sat-sun")
        break
      case 1:
        dayEl = document.getElementById("mon")
        break
      case 2:
        dayEl = document.getElementById("tue")
        break
      case 3:
        dayEl = document.getElementById("wed")
        break
      case 4:
        dayEl = document.getElementById("thu")
        break
      case 5:
        dayEl = document.getElementById("fri")
        break
    }
    dayEl.classList.add('content-active')
    dayEl.parentElement.classList.add('days-active')
  }
}

export default FifthDay;
