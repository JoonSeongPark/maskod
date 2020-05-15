import "./stockFilter.css";

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
    ].map(
      (arr) => `
    <li id="${arr[0]}">
      <div class="stock-box">
        ${arr[1]}
      </div>
    </li>`
    ).join('');

    stockFilter.innerHTML = `
    <p>마스크 개수 기준 정렬</p>
    <ul>${stockListElements}</ul>
    `;

    main.appendChild(stockFilter)
  }
}

export default StockFilter;
