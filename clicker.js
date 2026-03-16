// id's
const score = document.getElementById("score");

// holds all localStorage names, fixes any NaN's, then puts the values in storedArray
let arraykeys = ["points", "clickMod", "cps", "percent", "universal", "prestiege","maxP", "clickModb1", "cpsb1", "percentb1", "universalb1"]; fixArray(arraykeys, [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0]); let storedArray = retrieveArray(arraykeys);

// setup for variables
let bought = [0, 0, 0, 0];
let points = storedArray[0];
let clickMod = storedArray[1];
let cps = storedArray[2];
let percent = storedArray[3];
let universal = storedArray[4];
let prestiege = storedArray[5];
let maxP = storedArray[6];
id = "meh";
for (var i = 0; i < bought.length; i++) {
  bought[i] = storedArray[i + storedArray.length - bought.length];
}

// checks for everything needed for players that have already played for a bit
update(); unlock('0'); unlock('1'); unlock('2'); unlock('3');

// adds cps every second
const clickadder = setInterval(() => {
  points += ((cps + universal) ** prestiege) * percent;
  update(true);
}, 1000);

// adds points on button press
function press(){
  points += ((clickMod + universal) ** prestiege) * percent;
  score.textContent =  "You have: " + Math.round(points) + " points";
  localStorage.setItem("points", points);
}

// handles buying shop items
function buy(ind) {
  switch (ind) {
    case '0':
      cost = costScale("clickMod");
      if (cost <= points){
        points += -cost;
        clickMod += 1;
        bought[0]++;
      }
      break;
    case '1':
      cost = costScale("cps");
      if (cost <= points){
        points += -cost;
        cps += 1;
        bought[1]++;
    }
      break;
    case '2':
      cost = costScale("percent");
      if (cost <= points) {
        points += -cost;
        percent += 0.1;
        bought[2]++;
      }
      break;
    case '3':
      cost = costScale("universal")
      if (cost <= points) {
        points += -(200 + bought[3]);
        universal++
        bought[3]++
      }
      break;
    case '4':
      maxP = points
      prestiege = costScale('prestiege')
      pReset();
      break;
  }
  unlock(ind);
  update(true);
}

// formulas for the cost of shop items
function costScale(z) {
  switch(z) {
    case "clickMod":
      return Math.round(1.3 ** bought[0]) + (5 * bought[0]) + 9;
    case "cps":
      return Math.round((1.3 ** bought[1]) + 10 * bought[1]) + 99;
    case "percent":
      return Math.round((1.3 ** ( 3 * bought[2])) + 100 * bought[2]) + 999;
    case "universal":
      return 200 + bought[3];
    case "prestiege":
      return Math.round((3 + (Math.log(points) / 50) ** .6) * 100 / 3) / 100;
    default:
      return (NaN);
  }
}

// sets to unlock shop items and stats
function unlock(check) {
  let state = true;
  switch(+check) {
    case 0:
      state = (bought[0] >= 1);
      document.getElementById("i2").hidden = !state;
      document.getElementById("s2").hidden = !state;
      break;
    case 1:
      state = (bought[1] >= 5);
      document.getElementById("i3").hidden = !state;
      document.getElementById("s3").hidden = !state;
      break;
    case 2:
      state = (bought[2] >= 8);
      document.getElementById("i4").hidden = !state;
      document.getElementById("s4").hidden = !state;
      break;
    case 3:
      state = (bought[3] >= 100);
      document.getElementById("i5").hidden = !state;
      document.getElementById("s0").hidden = !state;
      break;
  }
}

// resets the players progress
function reset() {
  document.getElementById("i2").hidden = true;
  document.getElementById("i3").hidden = true;
  document.getElementById("i4").hidden = true;
  points = 0; clickMod = 1; cps = 0; percent = 1; universal = 0; prestiege = 1;
  bought = [0, 0, 0, 0];
  unlock('0'); unlock('1'); unlock('2'); unlock('3');
  update(true);
}

// Like reset but lighter
function pReset() {
  prestiege = costScale("prestiege");
  document.getElementById("i2").hidden = true;
  document.getElementById("i3").hidden = true;
  document.getElementById("i4").hidden = true;
  points = 0; clickMod = 1; cps = 0; percent = 1; universal = 0;
  bought = [0, 0, 0, 0];
  unlock('0'); unlock('1'); unlock('2'); unlock('3');
  update(true);
}
// updates every element's content and if told to store will do so
function update(store = false) {
  document.getElementById("i1").textContent = ("+1 Click Power (costs: " + costScale("clickMod") + ")");
  document.getElementById("i2").textContent = ("+1 cps (costs: " + costScale("cps") + ")");
  document.getElementById("i3").textContent = ("+10% Point Gen (costs: " + costScale("percent") + ")");
  document.getElementById("i4").textContent = ("+1 Universal Income Bonus (costs: " + costScale("universal") + ")");
  document.getElementById("i5").textContent = ("prestiege gain ^" + costScale("prestiege"));
  document.getElementById("s0").textContent = ("Exponent: " + prestiege);
  document.getElementById("s1").textContent = ("Click Power: " + clickMod);
  document.getElementById("s2").textContent = ("Clicks Per second: " + cps);
  document.getElementById("s3").textContent = ("Percent Bonus: " + Math.round((percent - 1) * 100) + "%");
  document.getElementById("s4").textContent = ("Universal Bonus: " + universal);
  score.textContent =  "You have: " + Math.round(points) + " points";
  if (store) {
    storeArray(arraykeys, [points, clickMod, cps, percent, universal, prestiege, maxP, bought[0], bought[1], bought[2], bought[3]]);
  }
}