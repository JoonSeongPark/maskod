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


    const targetImageSrc = "images/general_marker.png";
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
      image: targetMarkerImg
    });

    const currentImageSrc = "images/current_marker.png";
    const currentImageSize = new kakao.maps.Size(17, 17);

    const currentMarkerImg = new kakao.maps.MarkerImage(
      currentImageSrc,
      currentImageSize
    );
    const curr_pos = JSON.parse(localStorage.getItem("inputLatLng"))

    const currentMarkerPosition = new kakao.maps.LatLng(curr_pos[0], curr_pos[1]);

    const currentMarker = new kakao.maps.Marker({
      position: currentMarkerPosition,
      image: currentMarkerImg
    });

    targetMarker.setMap(map);
    currentMarker.setMap(map);

    setTimeout(() => {
      map.relayout();
    }, 0);
  });
};

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
