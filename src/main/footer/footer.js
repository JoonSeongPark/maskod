import "./footer.css";

class Footer {
  render() {
    const body = document.querySelector('body')

    const footer = document.createElement("footer");
    footer.id = "footer";
    const innerFoot = document.createElement("div");
    innerFoot.classList.add("inner-foot");
    const footerTitle = document.createElement("div");
    footerTitle.classList.add("footer-title");
    footerTitle.innerHTML = "<span>2020 MASK OD</span>";
    innerFoot.appendChild(footerTitle);

    const footerContents = document.createElement("div");
    footerContents.classList.add("footer-contents");
    footerContents.innerHTML = `<p>Built by. <span>JoonSeong Park</span></p>
      <p>e-mail : rytt@yonsei.ac.kr</p>
      <p>github :
        <a href='https://github.com/joonseongpark' target='_blank'>
        https://github.com/joonseongpark</a>
      </p>`;
    innerFoot.appendChild(footerContents);
    footer.appendChild(innerFoot);
    body.appendChild(footer)
  }

  // setFooterPosition() {
  //   const listContainer = document.getElementById("list-container");
  //   const stockInfoEl = document.getElementById("stock-info");
  //   const headerEl = document.getElementById("header");
  //   const footerEl = document.getElementById("footer");

  //   const windowHeight = window.innerHeight;
  //   const navHeight = 60;
  //   const headerHeight = headerEl.offsetHeight;
  //   const hrHeight = 10;
  //   const stockInfoHeight = stockInfoEl.offsetHeight;
  //   const footerHeight = footerEl.offsetHeight;
  //   const listHeight = listContainer.offsetHeight;
  //   const heightSum =
  //     navHeight +
  //     headerHeight +
  //     footerHeight +
  //     hrHeight +
  //     stockInfoHeight +
  //     listHeight;

  //   if (windowHeight <= heightSum) {
  //     footerEl.style.position = "relative";
  //   } else {
  //     footerEl.style.position = "fixed";
  //   }
  // }
}

export default Footer
