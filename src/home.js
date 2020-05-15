import nav from './nav/nav';
import header from './main/header/header'
import AddressSelect from './main/header/addressSelect/addressSelect'
import Footer from './main/footer/footer'
import './home.css'

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faMapMarkerAlt, faSearch);
dom.watch();

// nav part
nav()

// header part
header()

// select event listener
const addressSelect = new AddressSelect()
addressSelect.eventListener()

const footer = new Footer()
footer.render()
// footer.setFooterPosition()



// footer
// window.addEventListener("resize", footer.setFooterPosition);