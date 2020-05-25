import getAddressFromLatLng from "./getAddressfromLatLng";

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
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
      function (error) {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  } else {
    alert("위치정보를 제공하지 않습니다.");
  }
};

export default getLocation;
