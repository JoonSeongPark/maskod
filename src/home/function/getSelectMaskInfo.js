const getSelectMaskInfo = async () => {
  const topAreaEl = document.getElementById("top-area");
  const secondAreaEl = document.getElementById("second-area");
  const thirdAreaEl = document.getElementById("third-area");
  const fourthAreaEl = document.getElementById("fourth-area");

  const address = `${topAreaEl.value} ${secondAreaEl.value} ${thirdAreaEl.value} ${fourthAreaEl.value}`.trim();

  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${address}`
  );
  const data = await res.json();

  return data;
};

export default getSelectMaskInfo;
