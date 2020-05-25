const getAddressfromLatLng = async (lat, lng) => {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
    {
      method: "GET",
      headers: {
        Authorization: "KakaoAK " + "f965a322d95b3d29f27e28b80af51c51",
      },
    }
  );
  const data = await res.json();
  return data.documents[0].address.address_name;
};

export default getAddressfromLatLng;
