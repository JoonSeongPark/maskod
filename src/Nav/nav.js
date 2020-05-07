import LogoImg from "../../images/maskod_logo.png"
import './nav.css'

class Nav {
  render() {
    const body = document.querySelector('body')
    
    const nav = document.createElement('nav');
    const logoATag = document.createElement('a');
    logoATag.setAttribute('href', 'main.html')
    const leftDiv = document.createElement('div')
    leftDiv.classList.add('nav-left')
    leftDiv.id = 'nav-left'
    const logoImg = document.createElement('img');
    logoImg.src = LogoImg;
    logoImg.alt = "Logo"
    logoImg.classList.add('nav-logo')
    const p = document.createElement('p')
    p.innerHTML = "Mask OD"

    const rightDiv = document.createElement('div')
    rightDiv.classList.add('nav-right')
    const ul = document.createElement('ul')
    ul.innerHTML = "<li><a href='main.html'><p>HOME</p></a></li>"
    ul.innerHTML += "<li><a href='map.html'><p>MAP</p></a></li>"

    leftDiv.appendChild(logoImg)
    leftDiv.appendChild(p)
    
    logoATag.appendChild(leftDiv)
    
    rightDiv.appendChild(ul)
    
    nav.appendChild(logoATag)
    nav.appendChild(rightDiv)

    body.appendChild(nav)
  }
}

export default Nav