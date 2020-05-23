import curMarker from "../../../images/current_marker.png";

import "./mapModal.css";

class MapModal {
  static render() {
    const body = document.querySelector("body");

    const mapModalContainer = document.createElement("div");
    mapModalContainer.classList.add("map-modal-container");
    mapModalContainer.id = "map-modal-container";

    const mapModal = document.createElement("div");
    mapModal.classList.add("map-modal");
    mapModal.innerHTML = `
      <button class="map-close-btn" id="map-close-btn">
        <i class="fa fa-times"></i>
      </button>
      <div class="map-header" id="map-header"></div>
      <div class="map-body" id="map-body"></div>
    `;

    mapModalContainer.appendChild(mapModal);

    body.appendChild(mapModalContainer);
  }

  // mapRendering
  static async mapRender(e) {
    // event target check because of event delegation
    if (e.target.id === "info-lists" || e.target.id === "info-lists")
      return false;

    // take 'go-map' div from "that div" or "h3 tag(지도에서 위치보기)"
    const clickedList = e.target.closest("div");

    const lat = clickedList.getAttribute("lat");
    const lng = clickedList.getAttribute("lng");
    const name = clickedList.getAttribute("name");
    const id = clickedList.getAttribute("id");

    // firbase import part
    const mapHeader = document.getElementById("map-header");
    mapHeader.innerHTML = `<h4>${name} <span>(판매시작 - <span id="sell-time">Loading...</span>)</span></h4>`;

    const mapModalContainer = document.getElementById("map-modal-container");
    mapModalContainer.classList.add("active");

    const position = new kakao.maps.LatLng(lat, lng);

    let mapOptions = {
      center: position,
      level: 4,
    };

    // get current position from gps
    const curr_pos = JSON.parse(localStorage.getItem("inputLatLng"));

    let currentMarker;

    // current location known case
    if (curr_pos !== null) {
      const dist = euclideanDist(lat, lng, curr_pos[0], curr_pos[1]);

      // map level depends on screen and distance
      if (window.innerWidth > 700) {
        if (dist > 400) {
          mapOptions.level = 5;
        }
      } else {
        if (dist > 700) {
          mapOptions.level = 6;
        } else if (dist > 300) {
          mapOptions.level = 5;
        }
      }

      // current location marker
      const currentImageSrc = curMarker;
      const currentImageSize = new kakao.maps.Size(17, 17);

      const currentMarkerImg = new kakao.maps.MarkerImage(
        currentImageSrc,
        currentImageSize
      );

      const currentMarkerPosition = new kakao.maps.LatLng(
        curr_pos[0],
        curr_pos[1]
      );

      currentMarker = new kakao.maps.Marker({
        position: currentMarkerPosition,
        image: currentMarkerImg,
      });
    }

    // create & insert map in the map-body div
    const mapDiv = document.getElementById("map-body");
    mapDiv.innerHTML = "";
    const map = new kakao.maps.Map(mapDiv, mapOptions);

    // zoom controller
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // marker images depends on stock
    const stock = clickedList.getAttribute("remainstat");

    const targetImageSrc = `./${stock}_marker.png`;
    const targetImageSize = new kakao.maps.Size(36, 56);
    const targetImageOption = { offset: new kakao.maps.Point(16, 53) };

    const targetMarkerImg = new kakao.maps.MarkerImage(
      targetImageSrc,
      targetImageSize,
      targetImageOption
    );
    const targetMarkerPosition = new kakao.maps.LatLng(lat, lng);

    const targetMarker = new kakao.maps.Marker({
      position: targetMarkerPosition,
      image: targetMarkerImg,
    });

    targetMarker.setMap(map);
    if (currentMarker !== undefined) {
      currentMarker.setMap(map);
    }

    // relayout needed whenever map size/position change (loading)
    setTimeout(() => {
      map.relayout();
    }, 0);

    // import firebase data
    const startTime = await new this.getJson(id);
    const sellTime = document.getElementById("sell-time");
    sellTime.innerHTML = startTime;
  }

  // get data from firebase
  static async getJson(id) {
    const res = await fetch(
      `https://maskod-7513f.firebaseio.com/mon/${id}.json`,
      {
        method: "GET",
      }
    );
    const data = await res.json();

    if (data === null || data.start === null || data.start === undefined)
      return "정보 없음";

    const resetTimes = [];
    data.start.map((time) => {
      resetTimes.push(`${time.slice(0, 2)}:${time.slice(2)}`);
    });
    const times = resetTimes.join("/");

    return times;
  }

  // eventlistener
  static mapEventlistener() {
    const mapModalContainer = document.getElementById("map-modal-container");
    window.addEventListener("click", (e) =>
      e.target == mapModalContainer
        ? mapModalContainer.classList.remove("active")
        : false
    );

    const mapCloseBtn = document.getElementById("map-close-btn");
    mapCloseBtn.addEventListener("click", () => {
      mapModalContainer.classList.remove("active");
    });
  }
}

export default MapModal;
