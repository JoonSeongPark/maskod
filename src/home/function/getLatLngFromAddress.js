const getLatLngFromAddress = async (addr) => {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${addr}`,
    {
      method: "GET",
      headers: {
        Authorization: "KakaoAK " + "f965a322d95b3d29f27e28b80af51c51",
      },
    }
  );
  const data = await res.json();
  const addArr = data.documents;

  switch (addArr.length) {
    case 0:
      return "nothing";

    case 1:
      // lat, lng to localStorage
      localStorage.setItem(
        "inputLatLng",
        JSON.stringify([addArr[0].y, addArr[0].x])
      );
      return [addArr[0].y, addArr[0].x];

    // more than two
    default:
      const duplicateAddress = document.getElementById("duplicate-address");
      duplicateAddress.innerHTML = `<option>&nbsp&nbsp======&nbsp주소를 선택하세요&nbsp======&nbsp&nbsp</option>`;
      addArr.forEach((info) => {
        duplicateAddress.innerHTML += `<option value="${info.address_name}">${info.address_name}</option>`;
      });
      duplicateAddress.classList.add("active");
      duplicateAddress.focus();
      return "duplicate";
  }
};

export default getLatLngFromAddress;
