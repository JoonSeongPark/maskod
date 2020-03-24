const mainModalEl = document.getElementById("main-modal-container");
const mainCloseBtn = document.getElementById("main-close-btn");

const mapModalEl = document.getElementById("map-modal-container");
const mapHeader = document.getElementById("map-header");
const mapCloseBtn = document.getElementById("map-close-btn");

const circleDistanceEl = document.getElementById("circle-distance");

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

    let mapOptions = {
      center: position,
      level: 4
    };

    const curr_pos = JSON.parse(localStorage.getItem("inputLatLng"));
    let currentMarker;
    if (curr_pos != null) {
      const dist = euclideanDist(lat, lng, curr_pos[0], curr_pos[1]);

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

      const currentImageSrc = `images/current_marker.png`;
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
        image: currentMarkerImg
      });
    }
    const mapDiv = document.getElementById("map-body");
    mapDiv.innerHTML = "";
    const map = new kakao.maps.Map(mapDiv, mapOptions);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const stock = targetEl.getAttribute("remainstat")
    const targetImageSrc = `images/${stock}_marker.png`;
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

    targetMarker.setMap(map);
    if (currentMarker !== undefined) {
      currentMarker.setMap(map);
    }
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
