import nav from "./nav/nav";

import header from "./home/header/header";
import AddressSelect from "./home/header/addressSelect/addressSelect";
import AddressType from "./home/header/addressType/addressType";

import main from "./home/main/main";

import OpeningModal from "./home/openModal/openModal";
import MapModal from "./home/mapModal/mapModal";

import Footer from "./home/footer/footer";

import getLocation from "./home/function/getLocation";

import "./home.css";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faMapMarkerAlt,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

require.context("../images", true);

library.add(faMapMarkerAlt, faSearch, faTimes);
dom.watch();

// nav part
nav();

// header part
header();

// select event listener
AddressSelect.selectEventListener();

// type event listener
AddressType.typeEventListener();

// main part
main();

// opening modal
OpeningModal.render();
OpeningModal.OpeningEventListener();

// map modal
MapModal.render();
MapModal.mapEventlistener();

// footer part
const footer = new Footer();
footer.render();
footer.footerEventListener();
setTimeout(() => footer.setFooterPosition(), 100);

// get current Location with gps
getLocation();
