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
  static mapRender = (e) => {
    console.log('act')
    // const container = document.getElementById("container");
    const clickedList = e.target.closest("div");

    const lat = clickedList.getAttribute("lat");
    const lng = clickedList.getAttribute("lng");
    const name = clickedList.getAttribute("name");
    const id = clickedList.getAttribute("id");

    // firbase import part
    // const startTime = await getJson(id)
    const startTime = "sample hour";

    const mapHeader = document.getElementById("map-header");
    const mapModalContainer = document.getElementById("map-modal-container");
    mapHeader.innerHTML = `<h4>${name} <span>(판매시작 - ${startTime})</span></h4>`;
    mapModalContainer.classList.add("active");
    
    const position = new kakao.maps.LatLng(lat, lng);

    let mapOptions = {
      center: position,
      level: 4,
    };

    const mapDiv = document.getElementById("map-body");
    mapDiv.innerHTML = "";
    const map = new kakao.maps.Map(mapDiv, mapOptions);

    setTimeout(() => {
      map.relayout();
    }, 0);
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
