const apiInputList = [
  "서울특별시 강남구",
  "서울특별시 강동구",
  "서울특별시 강북구",
  "서울특별시 강서구",
  "서울특별시 관악구",
  "서울특별시 광진구",
  "서울특별시 구로구",
  "서울특별시 금천구",
  "서울특별시 노원구",
  "서울특별시 도봉구",
  "서울특별시 동대문구",
  "서울특별시 동작구",
  "서울특별시 마포구",
  "서울특별시 서대문구",
  "서울특별시 서초구",
  "서울특별시 성동구",
  "서울특별시 성북구",
  "서울특별시 송파구",
  "서울특별시 양천구",
  "서울특별시 영등포구",
  "서울특별시 용산구",
  "서울특별시 은평구",
  "서울특별시 종로구",
  "서울특별시 중구",
  "서울특별시 중랑구",
  "부산광역시 강서구",
  "부산광역시 금정구",
  "부산광역시 기장군",
  "부산광역시 남구",
  "부산광역시 동구",
  "부산광역시 동래구",
  "부산광역시 부산진구",
  "부산광역시 북구",
  "부산광역시 사상구",
  "부산광역시 사하구",
  "부산광역시 서구",
  "부산광역시 수영구",
  "부산광역시 연제구",
  "부산광역시 영도구",
  "부산광역시 중구",
  "부산광역시 해운대구",
  "대구광역시 남구",
  "대구광역시 달서구",
  "대구광역시 달성군",
  "대구광역시 동구",
  "대구광역시 북구",
  "대구광역시 서구",
  "대구광역시 수성구",
  "대구광역시 중구",
  "인천광역시 강화군",
  "인천광역시 계양구",
  "인천광역시 남동구",
  "인천광역시 동구",
  "인천광역시 미추홀구",
  "인천광역시 부평구",
  "인천광역시 서구",
  "인천광역시 연수구",
  "인천광역시 중구",
  "광주광역시 광산구",
  "광주광역시 남구",
  "광주광역시 동구",
  "광주광역시 북구",
  "광주광역시 서구",
  "대전광역시 동구",
  "대전광역시 대덕구",
  "대전광역시 서구",
  "대전광역시 유성구",
  "대전광역시 중구",
  "울산광역시 남구",
  "울산광역시 동구",
  "울산광역시 북구",
  "울산광역시 울주군",
  "울산광역시 중구",
  "세종특별자치시",
  "경기도 고양시 덕양구",
  "경기도 고양시 일산동구",
  "경기도 고양시 일산서구",
  "경기도 광명시",
  "경기도 과천시",
  "경기도 광주시",
  "경기도 구리시",
  "경기도 군포시",
  "경기도 김포시",
  "경기도 남양주시",
  "경기도 동두천시",
  "경기도 부천시",
  "경기도 성남시 분당구",
  "경기도 성남시 수정구",
  "경기도 성남시 중원구",
  "경기도 수원시 권선구",
  "경기도 수원시 영통구",
  "경기도 수원시 장안구",
  "경기도 수원시 팔달구",
  "경기도 시흥시",
  "경기도 안산시 단원구",
  "경기도 안산시 상록구",
  "경기도 안성시",
  "경기도 안양시 동안구",
  "경기도 안양시 만안구",
  "경기도 양주시",
  "경기도 여주시",
  "경기도 오산시",
  "경기도 용인시 기흥구",
  "경기도 용인시 수지구",
  "경기도 용인시 처인구",
  "경기도 의왕시",
  "경기도 의정부시",
  "경기도 이천시",
  "경기도 파주시",
  "경기도 평택시",
  "경기도 포천시",
  "경기도 하남시",
  "경기도 화성시",
  "강원도 강릉시",
  "강원도 고성군",
  "강원도 동해시",
  "강원도 삼척시",
  "강원도 속초시",
  "강원도 양구군",
  "강원도 양양군",
  "강원도 영월군",
  "강원도 원주시",
  "강원도 인제군",
  "강원도 정선군",
  "강원도 철원군",
  "강원도 춘천시",
  "강원도 태백시",
  "강원도 평창군",
  "강원도 홍천군",
  "강원도 화천군",
  "강원도 횡성군",
  "충청북도 괴산군",
  "충청북도 단양군",
  "충청북도 보은군",
  "충청북도 영동군",
  "충청북도 옥천군",
  "충청북도 음성군",
  "충청북도 제천시",
  "충청북도 증평군",
  "충청북도 진천군",
  "충청북도 청주시 상당구",
  "충청북도 청주시 서원구",
  "충청북도 청주시 청원구",
  "충청북도 청주시 흥덕구",
  "충청북도 충주시",
  "충청남도 계룡시",
  "충청남도 공주시",
  "충청남도 금산군",
  "충청남도 논산시",
  "충청남도 당진시",
  "충청남도 보령시",
  "충청남도 부여군",
  "충청남도 서산시",
  "충청남도 서천군",
  "충청남도 아산시",
  "충청남도 천안시 동남구",
  "충청남도 천안시 서북구",
  "충청남도 예산군",
  "충청남도 청양군",
  "충청남도 태안군",
  "충청남도 홍성군",
  "전라북도 고창군",
  "전라북도 군산시",
  "전라북도 김제시",
  "전라북도 남원시",
  "전라북도 무주군",
  "전라북도 부안군",
  "전라북도 순창군",
  "전라북도 완주군",
  "전라북도 익산시",
  "전라북도 임실군",
  "전라북도 장수군",
  "전라북도 전주시 덕진구",
  "전라북도 전주시 완산구",
  "전라북도 정읍시",
  "전라북도 진안군",
  "전라남도 강진군",
  "전라남도 고흥군",
  "전라남도 곡성군",
  "전라남도 광양시",
  "전라남도 구례군",
  "전라남도 나주시",
  "전라남도 담양군",
  "전라남도 목포시",
  "전라남도 무안군",
  "전라남도 보성군",
  "전라남도 순천시",
  "전라남도 신안군",
  "전라남도 여수시",
  "전라남도 영광군",
  "전라남도 영암군",
  "전라남도 완도군",
  "전라남도 장성군",
  "전라남도 장흥군",
  "전라남도 진도군",
  "전라남도 함평군",
  "전라남도 해남군",
  "전라남도 화순군",
  "경상북도 경산시",
  "경상북도 경주시",
  "경상북도 고령군",
  "경상북도 구미시",
  "경상북도 군위군",
  "경상북도 김천시",
  "경상북도 문경시",
  "경상북도 봉화군",
  "경상북도 상주시",
  "경상북도 성주군",
  "경상북도 안동시",
  "경상북도 영덕군",
  "경상북도 영양군",
  "경상북도 영주시",
  "경상북도 영천시",
  "경상북도 예천군",
  "경상북도 울릉군",
  "경상북도 울진군",
  "경상북도 의성군",
  "경상북도 청도군",
  "경상북도 청송군",
  "경상북도 칠곡군",
  "경상북도 포항시 남구",
  "경상북도 포항시 북구",
  "경상남도 거제시",
  "경상남도 거창군",
  "경상남도 고성군",
  "경상남도 김해시",
  "경상남도 남해군",
  "경상남도 밀양시",
  "경상남도 사천시",
  "경상남도 산청군",
  "경상남도 양산시",
  "경상남도 의령군",
  "경상남도 진주시",
  "경상남도 창녕군",
  "경상남도 창원시 마산합포구",
  "경상남도 창원시 마산회원구",
  "경상남도 창원시 성산구",
  "경상남도 창원시 의창구",
  "경상남도 창원시 진해구",
  "경상남도 통영시",
  "경상남도 하동군",
  "경상남도 함안군",
  "경상남도 함양군",
  "경상남도 합천군",
  "제주특별자치도 서귀포시",
  "제주특별자치도 제주시"
];

const now = Date.now();
const nowString = new Date(now);
const nowTime = new Date(nowString.toString());

const year = nowTime.getFullYear();
let month = nowTime.getMonth() + 1;
if (month < 10) {
  month = `0${month}`;
}
let day = nowTime.getDate();
if (day < 10) {
  day = `0${day}`;
}
let hour = nowTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = nowTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

const fetch = require("node-fetch");


const dir = `C:/Users/User/Desktop/연세대학교/YBIGTA/maskod/data_collect/data/${year}${month}${day}.json`
const fs = require("fs");

let dict;
try {
  if (fs.existsSync(dir)) {
    dict = require(dir);
  } else {
    dict = {}
  }
} catch (err) {
  console.error(err);
}

async function getMaskSelectInfo(inputVal) {
  const res = await fetch(
    `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${encodeURI(
      inputVal
    )}`
  );
  const data = await res.json();

  return data.stores;
}


var count =1
async function loop(inputlist) {
  for (const element of inputlist) {
    console.log(count)
    const dataList = await getMaskSelectInfo(element);
    loop2(dataList);
    count++
  }
  let size = 0;
  for (key in dict) {
    size++;
  }
  console.log(size);

  // save as .json
   fs.writeFile(
    dir,
    JSON.stringify(dict),
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
}

async function loop2(datalist) {
  for (const data of datalist) {
    if (data.code in dict) {
      dict[data.code]["remain_stat"][`${hour}${minute}`] = data.remain_stat
    } else {
      dict[data.code] = {};
      dict[data.code]["name"] = data.name
      dict[data.code]["addr"] = data.addr
      dict[data.code]["lat"] = data.lat
      dict[data.code]["lng"] = data.lng
      dict[data.code]["created_at"] = data.created_at
      dict[data.code]["stock_at"] = data.stock_at
      dict[data.code]["type"] = data.type
      dict[data.code]["remain_stat"] = {}
      dict[data.code]["remain_stat"][`${hour}${minute}`] = data.remain_stat

    }
    
  }
}

loop(apiInputList);