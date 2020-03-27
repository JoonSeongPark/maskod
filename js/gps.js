const addressInputEl = document.getElementById("address");
const inputDataListEl = document.getElementById('duplicate-addr')

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
  
  if (data.documents.length >1) {
    inputDataListEl.innerHTML = ''
    data.documents.forEach(info => {
      inputDataListEl.innerHTML += `<option value="${info.address_name}"></option>`
    })
    // addressInputEl.addEventListener('input', renderList)
    return [-1,-1]
  }

  inputDataListEl.innerHTML = ''
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
        localStorage.setItem("curLatLng", JSON.stringify([position.coords.latitude, position.coords.longitude]));
        const addr = await getAddressFromLatLng(position.coords.latitude, position.coords.longitude);
        addressInputEl.value = addr
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

async function autoComplete() {
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
  if (data.documents.length == 1) {
    inputDataListEl.innerHTML ==''
    return false
  }
  inputDataListEl.innerHTML = "";
  data.documents.forEach(info => {
    inputDataListEl.innerHTML += `<option value="${info.address_name}"></option>`;
  });
}