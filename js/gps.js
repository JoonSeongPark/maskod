const addressInputEl = document.getElementById("address");

getLocation();

async function getAddressFromLatLng(lat,lng) {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
    {
      method: "GET",
      headers: {
        Authorization: "KakaoAK " + "f965a322d95b3d29f27e28b80af51c51"
      }
    }
  );
  const data = await res.json()
  return data.documents[0].address.address_name
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function(position) {
        const addr = await getAddressFromLatLng(position.coords.latitude, position.coords.longitude);
        addressInputEl.value = addr
      },
      function(error) {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      }
    );
  } else {
    alert("위치정보를 제공하지 않습니다.");
  }
}
