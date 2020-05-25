import "./stockFilter.css";
import { setFooterPosition } from "../../footer/footer";

class StockFilter {
  render() {
    const main = document.querySelector("main");

    const stockFilter = document.createElement("div");
    stockFilter.classList.add("stock-filter");
    stockFilter.id = "stock-filter";

    // list element
    const stockListElements = [
      ["all", "전체보기"],
      ["plenty", "100개 이상"],
      ["some", "30~99개"],
      ["few", "2~29개"],
      ["empty", "0~1개"],
    ]
      .map(
        (arr) => `
          <li id="${arr[0]}">
            <div class="stock-box">
              ${arr[1]}
            </div>
          </li>`
      )
      .join("");

    stockFilter.innerHTML = `
    <p>마스크 개수 기준 정렬</p>
    <ul id="stock-lists">${stockListElements}</ul>
    `;

    main.appendChild(stockFilter);
  }

  // filter depends on stock
  filterMask(e) {
    if (e.target.id !== "stock-lists") {
      const clickedBtn = e.target.closest("li");

      const infoLists = document.getElementById("info-lists");

      // to check active list after filtering
      let activeCount = infoLists.childNodes.length;

      infoLists.childNodes.forEach((list) => {
        if (list.classList.contains(clickedBtn.id)) {
          list.classList.remove("deactive");
        } else {
          list.classList.add("deactive");
          activeCount -= 1;
        }
      });

      // show the result of filtering with text
      const searchResult = document.querySelector('.search-result')
      searchResult.innerHTML = `<span>${activeCount}</span> 개의 장소가 정렬되었습니다.`

      setFooterPosition();
    }
  }

  // filter event listener
  filterEventListener() {
    const stockLists = document.getElementById("stock-lists");
    stockLists.addEventListener("click", this.filterMask);
  }
}

export default StockFilter;
