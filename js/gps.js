const addressInputEl = document.getElementById("address");
const duplicateSelectEl = document.getElementById("duplicate-address");

getLocation();

async function getLatLngFromAddress() {
  const addr = addressInputEl.value;
  if (addr == "") {
    return [-1, -1];
  }
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${addr}`,
    {
      method: "GET",
      headers: {
        Authorization: "KakaoAK " + "f965a322d95b3d29f27e28b80af51c51"
      }
    }
  );
  const data = await res.json();
  duplicateSelectEl.style.display = "none";
  duplicateSelectEl.innerHTML = `<option value="title">&nbsp&nbsp======&nbsp주소를 선택하세요&nbsp======&nbsp&nbsp</option>`;
  if (data.documents.length > 1) {
    data.documents.forEach(info => {
      duplicateSelectEl.innerHTML += `<option value="${info.address_name}">${info.address_name}</option>`;
    });
    duplicateSelectEl.style.display = "inline-block";

    addressInputEl.focus();
    return [-1, -1];
  }
  // 존재하지않음.
  if (data.documents.length== 0) {
    return [-2,-2]
  }

  localStorage.setItem(
    "inputLatLng",
    JSON.stringify([data.documents[0].y, data.documents[0].x])
  );
  if (data.meta.total_count != 0) {
    return [data.documents[0].y, data.documents[0].x];
  } else {
    return [-1, -1];
  }
}

async function getAddressFromLatLng(lat, lng) {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
    {
      method: "GET",
      headers: {
        Authorization: "KakaoAK " + "f965a322d95b3d29f27e28b80af51c51"
      }
    }
  );
  const data = await res.json();
  return data.documents[0].address.address_name;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function(position) {
        localStorage.setItem(
          "curLatLng",
          JSON.stringify([position.coords.latitude, position.coords.longitude])
        );
        const addr = await getAddressFromLatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        addressInputEl.value = addr;
      },
      function(error) {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity
      }
    );
  } else {
    alert("위치정보를 제공하지 않습니다.");
  }
}

async function getJson(id){
  const res = await fetch("https://maskod-7513f.firebaseio.com/mon.json", {
    method: "GET"
  });
  const data = await res.json()
  const resetTimes = []
  if (data[id].start === null){
    return "정보 없음"
  }
  data[id].start.map(time => {
    resetTimes.push(time.slice(0,2)+':'+time.slice(2))
  })
  const times = resetTimes.join('/')
  return times
}