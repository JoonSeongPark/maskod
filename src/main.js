import Nav from './nav/nav'
import Header from './main/header/header'
import Footer from './main/footer/footer'
import './main.css'

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faMapMarkerAlt, faSearch);
dom.watch();

const nav = new Nav()
nav.render()

const header = new Header()
header.render()
header.setTopArea()
header.eventListener()

const footer = new Footer()
footer.render()
// footer.setFooterPosition()



// footer
// window.addEventListener("resize", footer.setFooterPosition);