const mapContainer = document.getElementById("map-container");
const searchBtn = document.getElementById("search");

let lat = 33.450701,
  lng = 126.570667;
if (JSON.parse(localStorage.getItem("curLatLng"))) {
  lat = JSON.parse(localStorage.getItem("curLatLng"))[0];
  lng = JSON.parse(localStorage.getItem("curLatLng"))[1];
}

const mapOption = {
  center: new kakao.maps.LatLng(lat, lng),
  level: 3
};

const map = new kakao.maps.Map(mapContainer, mapOption);

function setCenter(lat, lng) {
  const moveLatLng = new kakao.maps.LatLng(lat, lng);

  map.setCenter(moveLatLng);
}

async function newSearch() {
  let pos = await getLatLngFromAddress();

  setCenter(pos[0], pos[1]);
}

searchBtn.addEventListener("click", newSearch);
addressInputEl.addEventListener("keypress", function(e) {
  if (e.key == "Enter") {
    searchBtn.click();
  }
});
