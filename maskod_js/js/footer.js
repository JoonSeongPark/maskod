const listContainer = document.getElementById("list-container");
const headerEl = document.getElementById("header");
const footerEl = document.getElementById("footer");


setFooterPosition();

// Footer position setting at rendering
function setFooterPosition() {
  const windowHeight = window.innerHeight;
  const navHeight = 60;
  const headerHeight = headerEl.offsetHeight;
  const hrHeight = 10;
  const footerHeight = footerEl.offsetHeight;
  const listHeight = listContainer.offsetHeight;
  const heightSum =
    navHeight + headerHeight + footerHeight + hrHeight + listHeight;

  if (windowHeight <= heightSum) {
    footerEl.style.position = "relative";
  } else {
    footerEl.style.position = "fixed";
  }
}

// footer
window.addEventListener("resize", setFooterPosition);