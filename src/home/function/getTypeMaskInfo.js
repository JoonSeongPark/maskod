import getLatLngFromAddress from "./getLatLngFromAddress";

const getTypeMaskInfo = async () => {
  const addr = document.getElementById("address-input").value.trim();

  if (addr === "") return false;

  const coordinate = await getLatLngFromAddress(addr);

  switch (coordinate) {
    case "nothing":
      listContainer.innerHTML = "<h2>주소를 다시 입력하세요.</h2>";
      setFooterPosition();
      return false;
    case "duplicate":
      return false;
  }

  const [lat, lng] = coordinate;
  const circleDist = document.getElementById("circle-distance").value;

  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${circleDist}`
  );
  const data = await res.json();

  return data.stores;
};

export default getTypeMaskInfo;
