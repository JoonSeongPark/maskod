import "./footer.css";

class Footer {
  render() {
    const body = document.querySelector("body");

    const footer = document.createElement("footer");

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
    body.appendChild(footer);
  }

  // footer position function
  setFooterPosition() {
    const footerEl = document.querySelector("footer");

    const windowHeight = window.innerHeight;

    const navHeight = document.querySelector("nav").offsetHeight;
    const headerHeight = document.querySelector("header").offsetHeight;
    const mainHeight = document.querySelector("main").offsetHeight;
    const footerHeight = document.querySelector("footer").offsetHeight;

    const heightSum = navHeight + headerHeight + footerHeight + mainHeight;

    if (windowHeight <= heightSum) {
      footerEl.className = "";
    } else {
      footerEl.className = "footer-fixed";
    }
  }

  eventListener() {
    this.setFooterPosition();
    window.addEventListener("resize", this.setFooterPosition);
  }
}

export default Footer;
export const { setFooterPosition } = new Footer()