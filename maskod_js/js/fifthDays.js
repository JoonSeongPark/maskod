const mon = document.getElementById("mon");
const tue = document.getElementById("tue");
const wed = document.getElementById("wed");
const thu = document.getElementById("thu");
const fri = document.getElementById("fri");
const satSun = document.getElementById("sat-sun");

fifthdays();

// fifth days mask
function fifthdays() {
  const today = new Date();
  const day = today.getDay();
  const days = { 0: satSun, 1: mon, 2: tue, 3: wed, 4: thu, 5: fri, 6: satSun };

  const contentChange =
    "font-size:larger; color:#000; border-bottom-left-radius:4px;border-bottom-right-radius:4px;";
  const boxChange = "transform:translate(0,-10%);";
  days[day].style.cssText = contentChange;
  days[day].parentElement.style.cssText = boxChange;
}