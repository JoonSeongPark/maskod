import Nav from './nav/nav'
import HeaderTitle from './main/header/headerTitle'
import Footer from './main/footer/footer'
import './main.css'

const nav = new Nav()
nav.render()

const headerTitle = new HeaderTitle()
headerTitle.render()

const footer = new Footer()
footer.render()
// footer.setFooterPosition()



// footer
// window.addEventListener("resize", footer.setFooterPosition);