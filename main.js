//        bg                 bc               bb             hb               ab                 cool         font
let cpreset = [
  ["rgb(60,100,120)", "rgb(5,15,20)", "rgb(20,30,40)", "rgb(40,50,60)", "rgb(50,70,90)", "rgb(50,60,70)", "#fff"],
  ["rgb(120,100,60)", "rgb(60,40,30)", "rgb(40,30,20)", "rgb(60,50,40)", "rgb(90,70,50)", "rgb(50,40,30)", "#fff"],
  ["rgb(40,150,120)", "rgb(15,45,35)", "rgb(40,70,60)", "rgb(50,80,70)", "rgb(50,90,70)", "rgb(50,70,60)", "#fff"],
  ["#fff", "rgb(0,0,0)", "rgb(255,255,255)", "rgb(200,200,200)", "rgb(150,150,150)", "rgb(0,0,0)", "#000"],
  ["#111111", "rgb(50,50,50)", "rgb(75,75,75)", "rgb(70,70,70)", "rgb(65,65,65)", "rgb(80,80,80)", "#ffbf22"]
];

function c_change(style, load = false) {
  let target = document.documentElement.style;
  if (!load) {
    target.setProperty("--tran", "ease-in-out 500ms");
  }
  let s = +style;
  target.setProperty("--bg", cpreset[s][0]);
  target.setProperty("--bc", cpreset[s][1]);
  target.setProperty("--bb", cpreset[s][2]);
  target.setProperty("--hb", cpreset[s][3]);
  target.setProperty("--ab", cpreset[s][4]);
  target.setProperty("--cool", cpreset[s][5]);
  target.setProperty("--fontc", cpreset[s][6]);

  setTimeout(function() {
    target.setProperty("--tran", "ease-in-out 500ms");
  }, 500);
  
  localStorage.setItem("colorStyle", s);
}

window.onload = function() {
  document.getElementById("jserr").textContent = "";
  c_change(localStorage.getItem("colorStyle"), true);
};

// hides or unhides the target
function hide(target) {
  target = document.getElementById(target);
  if(target.hidden) {
    target.hidden = false;
  } else {
    target.hidden = true;
}}

// These retrieve localy stored items or set them based on
// input keys and values or fixes the array
function retrieveArray(items) {
  let output = [];
  for (let i = 0; i < items.length; i++) {
    output[i] = +localStorage.getItem(items[i]);
  }
  return (output);
}
function storeArray(items, values) {
  for (let i = 0; i < items.length; i++) {
    if (isNaN(values[i])) {
      values[i] = 1;
    }
    localStorage.setItem(items[i], values[i]);
  }
}
function fixArray(items, fixValue) {
  for (var i = 0; i < items.length; i++) {
    if (isNaN(+localStorage.getItem(items[i]))) {
      console.log(items[i] + " failed test with value: " + localStorage.getItem(items[i]));
      localStorage.setItem(items[i], fixValue[i] + "");
    }
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function isColliding(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}














