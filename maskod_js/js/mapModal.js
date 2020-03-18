const mapModalEl = document.getElementById("map-modal-container");
const mapHeader = document.getElementById("map-header");
const mapCloseBtn = document.getElementById("map-close-btn");

// See on a map
function openMap(element) {
  element.forEach(el => {
    el.addEventListener("click", e => {
      const lat = e.target.getAttribute("lat");
      const lng = e.target.getAttribute("lng");
      const name = e.target.getAttribute("name");
      const position = new naver.maps.LatLng(lat, lng);
      const mapOptions = {
        center: position.destinationPoint(270, 555),
        zoom: 16
      };

      const mapDiv = document.getElementById("map-body");
      mapDiv.innerHTML = "";
      const map = new naver.maps.Map(mapDiv, mapOptions);

      const markerOptions = {
        position: position,
        map: map,
        icon: {
          content:
            '<img src="images/map-marker.png" alt="marker" class="map-marker">',
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35)
        }
      };
      const marker = new naver.maps.Marker(markerOptions);
      mapHeader.innerHTML = `<h3>${name}</h3>`;
      mapModalEl.classList.add("show-map-modal");
    });
  });
}

// map modal event Listener
window.addEventListener("click", e =>
  e.target == mapModalEl ? mapModalEl.classList.remove("show-map-modal") : false
);
mapCloseBtn.addEventListener("click", () => {
  mapModalEl.classList.remove("show-map-modal");
});
