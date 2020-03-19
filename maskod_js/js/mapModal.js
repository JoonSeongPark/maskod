const mapModalEl = document.getElementById("map-modal-container");
const mapHeader = document.getElementById("map-header");
const mapCloseBtn = document.getElementById("map-close-btn");

// See on a map
function openMap() {
  let targetEl;
  listContainer.addEventListener("click", e => {
    if (e.target.tagName == "H3") {
      targetEl = e.target.parentElement;
    } else if (e.target.className == "go-map") {
      targetEl = e.target;
    }

    const lat = targetEl.getAttribute("lat");
    const lng = targetEl.getAttribute("lng");
    const name = targetEl.getAttribute("name");

    const position = new kakao.maps.LatLng(lat, lng);

    const mapOptions = {
      center: position,
      level: 3
    };

    const mapDiv = document.getElementById("map-body");
    mapDiv.innerHTML = "";
    const map = new kakao.maps.Map(mapDiv, mapOptions);

    mapHeader.innerHTML = `<h3>${name}</h3>`;
    mapModalEl.classList.add("show-map-modal");
  });
}

// map modal event Listener
window.addEventListener("click", e =>
  e.target == mapModalEl ? mapModalEl.classList.remove("show-map-modal") : false
);
mapCloseBtn.addEventListener("click", () => {
  mapModalEl.classList.remove("show-map-modal");
});
