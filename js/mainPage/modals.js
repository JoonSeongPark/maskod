const mainModalEl = document.getElementById("main-modal-container");
const mainCloseBtn = document.getElementById("main-close-btn");

const mapModalEl = document.getElementById("map-modal-container");
const mapHeader = document.getElementById("map-header");
const mapCloseBtn = document.getElementById("map-close-btn");

// See on a map
const openMap = () => {
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

    mapHeader.innerHTML = `<h3>${name}</h3>`;
    mapModalEl.classList.add("show-map-modal");

    const position = new kakao.maps.LatLng(lat, lng);

    const mapOptions = {
      center: position,
      level: 4
    };

    const mapDiv = document.getElementById("map-body");
    mapDiv.innerHTML = "";
    const map = new kakao.maps.Map(mapDiv, mapOptions);

    const imageSrc = "images/map-marker.png";
    const imageSize = new kakao.maps.Size(44, 49);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };

    const markerImg = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    const markerPosition = new kakao.maps.LatLng(lat, lng);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImg
    });

    marker.setMap(map);

    setTimeout(() => {
      map.relayout();
    }, 0);
  });
}

// main modal event Listener
mainCloseBtn.addEventListener("click", () => {
  mainModalEl.style.display = "none";
});

// map modal event Listener
window.addEventListener("click", e =>
  e.target == mapModalEl ? mapModalEl.classList.remove("show-map-modal") : false
);
mapCloseBtn.addEventListener("click", () => {
  mapModalEl.classList.remove("show-map-modal");
});
