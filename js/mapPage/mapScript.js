const mapContainer = document.getElementById("map-container");
const searchBtn = document.getElementById("search");
const inputRangeEl = document.getElementById("dist-range");
const distValueEl = document.getElementById("dist-value");
const stockInfoEl = document.getElementById("stock-info");

const plentyBtn = document.getElementById("plenty");
const someBtn = document.getElementById("some");
const fewBtn = document.getElementById("few");
const emptyBtn = document.getElementById("empty");

localStorage.clear();

let lat = 37.5551834,
  lng = 126.9369177;
if (JSON.parse(localStorage.getItem("curLatLng"))) {
  lat = JSON.parse(localStorage.getItem("curLatLng"))[0];
  lng = JSON.parse(localStorage.getItem("curLatLng"))[1];
}

const mapOption = {
  center: new kakao.maps.LatLng(lat, lng),
  level: 4
};

let map = new kakao.maps.Map(mapContainer, mapOption);

const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

let currentMarker;
function moveCenter(lat, lng) {
  const moveLatLng = new kakao.maps.LatLng(lat, lng);

  map.setCenter(moveLatLng);

  const currentImageSrc = "images/current_marker.png";
  const currentImageSize = new kakao.maps.Size(25, 25);

  const currentMarkerImg = new kakao.maps.MarkerImage(
    currentImageSrc,
    currentImageSize
  );
  const currentMarkerPosition = new kakao.maps.LatLng(lat, lng);
  if (currentMarker) {
    currentMarker.setMap(null);
  }
  currentMarker = new kakao.maps.Marker({
    position: currentMarkerPosition,
    image: currentMarkerImg
  });

  currentMarker.setMap(map);
}

let circle;

function makeCircle(lat, lng) {
  if (circle) {
    circle.setMap(null);
  }
  const dist = inputRangeEl.value;
  circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(lat, lng),
    radius: dist,
    strokeWeight: 3,
    strokeColor: "#5b9bd5",
    strokeOpacity: 1,
    strokeStyle: "solid",
    fillColor: "#5b9bd5",
    fillOpacity: 0.2
  });

  if (window.innerWidth > 700) {
    if (dist > 700) {
      mapOption.level = 5;
    } else if (dist > 300) {
      mapOption.level = 4;
    } else {
      mapOption.level = 3;
    }
  } else if (window.innerWidth > 500) {
    if (dist > 800) {
      mapOption.level = 6;
    } else if (dist > 450) {
      mapOption.level = 5;
    } else {
      mapOption.level = 4;
    }
  } else if (window.innerWidth > 400) {
    if (dist > 750) {
      mapOption.level = 6;
    } else if (dist > 350) {
      mapOption.level = 5;
    } else {
      mapOption.level = 4;
    }
  } else {
    if (dist > 600) {
      mapOption.level = 6;
    } else if (dist > 300) {
      mapOption.level = 5;
    } else {
      mapOption.level = 4;
    }
  }
  map = new kakao.maps.Map(mapContainer, mapOption);

  circle.setMap(map);
}

async function storeInCircle(lat, lng) {
  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${inputRangeEl.value}`
  );
  const data = await res.json();

  return data.stores;
}

let markerArr = [];
async function showMarker(lat, lng) {
  const stores = await storeInCircle(lat, lng);

  if (stores.length == 0) {
    stockInfoEl.style.display = "none";
    return false;
  }
  const onSellStores = stores.filter(
    info => info.remain_stat !== "break" && info.remain_stat !== null
  );
  if (onSellStores.length == 0) {
    stockInfoEl.style.display = "none";
    return false;
  }
  // marker를 위에서부터 찍어줘야 아래 marker가 위에 그려진다.
  const sortedStores = onSellStores.sort((a, b) => {
    return b.lat - a.lat;
  });

  localStorage.setItem("stores", JSON.stringify(sortedStores));

  stockInfoEl.style.display = "block";

  markerArr.forEach(mark => {
    mark.setMap(null);
  });
  markerArr = [];

  sortedStores.forEach(store => {
    const stock = store.remain_stat;
    const imageSrc = `images/${stock}_marker.png`;
    const imageSize = new kakao.maps.Size(36, 56);
    const imageOption = { offset: new kakao.maps.Point(16, 53) };

    const markerImg = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    const markerPosition = new kakao.maps.LatLng(store.lat, store.lng);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImg,
      clickable: true.setVisible,
      title: store.remain_stat
    });

    var content = `<div class="customoverlay">
    <span class="title">${store.name}</span>
    </div>`;

    // Overlay (name)
    var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: markerPosition,
      content: content,
      yAnchor: 3
    });

    customOverlay.setVisible(false);

    kakao.maps.event.addListener(marker, "mouseover", () => {
      customOverlay.setVisible(true);
    });
    kakao.maps.event.addListener(marker, "mouseout", () => {
      customOverlay.setVisible(false);
    });
    kakao.maps.event.addListener(marker, "click", () => {
      customOverlay.setVisible(!customOverlay.getVisible());
    });

    markerArr.push(marker);

    marker.setMap(map);
  });
}

async function newSearch() {
  if (addressInputEl.value == "") {
    return false;
  }
  const [lat, lng] = await getLatLngFromAddress();

  makeCircle(lat, lng);
  showMarker(lat, lng);
  moveCenter(lat, lng);
}

function changeDist() {
  if (localStorage.inputLatLng) {
    const [lat, lng] = JSON.parse(localStorage.getItem("inputLatLng"));
    makeCircle(lat, lng);
    showMarker(lat, lng);
  } else {
    return false;
  }
}

function storefilter() {
  markerArr.forEach(store => {
    if (store.getTitle() == this.id) {
      store.setVisible(true)
    } else {
      store.setVisible(false)
    }
  });
}

// Event Listeners

searchBtn.addEventListener("click", newSearch);
addressInputEl.addEventListener("keypress", function(e) {
  if (e.key == "Enter") {
    searchBtn.click();
  }
});

inputRangeEl.addEventListener("input", () => {
  distValueEl.innerHTML = `${inputRangeEl.value}m`;
  changeDist();
});

plentyBtn.addEventListener("click", storefilter);
someBtn.addEventListener("click", storefilter);
fewBtn.addEventListener("click", storefilter);
emptyBtn.addEventListener("click", storefilter);
