import StockFilter from "./stockFilter/stockFilter";
import FifthDay from "./fifthDay/fifthDay";
import "./main.css";

const main = () => {
  const body = document.querySelector("body");
  const main = document.createElement("main");
  body.appendChild(main);

  const stockFilter = new StockFilter();
  stockFilter.render();
  stockFilter.filterEventListener();

  const container = document.createElement("div");
  container.classList.add("container");
  container.id = "container";

  main.appendChild(container);

  const fifthDay = new FifthDay();
  fifthDay.render();
  fifthDay.todayAnimation();
};

export default main;
