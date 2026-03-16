//retrieves all user data and if there is none it sets it to the default value
let arraykeys = ["points", "balls", "velMult"]; fixArray(arraykeys, [0, 1, 0.1]); let storedArray = retrieveArray(arraykeys);

// defines all variables globaly used
let screen = document.getElementById("screen");
let points = storedArray[0];
let balls = storedArray [1];
const fps = 60;
let velMult = (1 * fps) / 1000;
balls = 50;

const ballCeption = { };

// spawns in all of the BALLS

// the spawn function spawn(index or key #, mass) so changing the second Number
// changes the mass, try changing all of the balls' mass and the pruprle one's
// to see cool results
for (var i = 1; i < balls;) {
  i += spawn(i, 100);
}

spawn(0,  10);
let heavy = ballCeption[0];
heavy.el.style.background = "#f0f";
heavy.xVel = 5;

function spawn(i, mass = 1) {
  let vel = Math.round(Math.random() * 500) / 100;
  let dir = [(Math.random() > 0.5),(Math.random() > 0.5)];
  ballCeption[i] = {
    "el": (document.createElement("div")),
    "yPos": (Math.round(Math.random() * 90)),
    "xPos": (Math.round(Math.random() * 95)),
    "yVel": (vel * (+dir[0] * 2 - 1)),
    "xVel": ((5 - vel) * (+dir[1] * 2 - 1)),
    "mass": mass
  };
  let target = ballCeption[i].el;
  target.style.position = "absolute";
  target.style.top = ballCeption[i].yPos + "%";
  target.style.left = ballCeption[i].xPos + "%";
  target.classList.add("ball");
  screen.appendChild(target);
  return (1);
}

// physics tick
setInterval(() => {
 for (let i = 0; i < balls; i++) {
    let target = ballCeption[i];
    target.yPos += target.yVel * velMult * 2;
    bounceWall(target);
    target.xPos += target.xVel * velMult;
    bounceWall(target);
    bounceBall(ballCeption, target);
  } 
  for (let i = 0; i < balls; i++) {
    let target = ballCeption[i];
    target.el.style.top = target.yPos + "%";
    target.el.style.left = target.xPos + "%";
  }
}, 1000 / fps);

class Vector {
  
  static distCheck(range, testers, target) {
    let out = [];
    for (let testing of Object.values(testers)) {
      if ((range.x1 > testing.xPos && testing.xPos > range.x2) && (range.y1 > testing.yPos && testing.yPos > range.y2)) {
        const xDiff = (target.xPos - testing.xPos) * 2;
        const yDiff = (target.yPos - testing.yPos);
        const dist = Math.sqrt(yDiff ** 2 + xDiff ** 2);
        if(dist < 10 && (target !== testing)) { // asks if the distance is below or equal to r1 + r2
          out.push([testing, xDiff, yDiff, dist]);
        }
      }
    }
    return(out);
  }

  static changeVel(obj1, obj2, changes) {
    // obj1 vel changes
    obj1.xVel -= changes.impXV1; obj1.xPos += changes.impXP;
    obj1.yVel -= changes.impYV1; obj1.yPos += changes.impYP;
    // obj2 vel change
    obj2.xVel += changes.impXV2; obj2.xPos -= changes.impXP;
    obj2.yVel += changes.impYV2; obj2.yPos -= changes.impYP;
  }
  
  static massBounce(obj1, obj2, normal) {
    
  }
}

// checks if the ball wants to move out of bounds, then it 
function bounceWall(target) {
  switch(true) {
    case target.yPos < 0:
      target.yPos += Math.abs(target.yPos) * 2;
      target.yVel = -target.yVel;
      break;
    case target.yPos > 90:
      target.yPos += -(target.yPos - 90) * 2;
      target.yVel = -target.yVel;
      break;
    case target.xPos < 0:
      target.xPos += Math.abs(target.xPos) * 2;
      target.xVel = -target.xVel;
      break;
    case target.xPos > 95:
      target.xPos += -(target.xPos - 95) * 2;
      target.xVel = -target.xVel;
      break;
    default:
      break;
  }
}

function bounceBall(all, target) {
  let candidates = Vector.distCheck({x1: target.xPos + 5,  y1: target.yPos + 10, x2: target.xPos - 5,  y2: target.yPos - 10}, all, target);
  if (candidates.length > 0) {
    for (let test of candidates) {
      let xDiff = test[1];  let yDiff = test[2];  let dist = test[3];  test = test[0];     
      
      const normX = xDiff / dist;
      const normY = yDiff / dist;
      const overlap = (10 - dist) / 2;
  
      // dot product (plane that they are colliding on)
      const dot = ((target.xVel - test.xVel) * normX) + ((target.yVel - test.yVel) * normY);
      let j = 2 * dot;
      const invMass1 = 1 / target.mass;
      const invMass2 = 1 / test.mass;
      j = j / (invMass1 + invMass2);
      const change =  ({
      impXV1: j * normX / target.mass,
      impXV2: j * normX / test.mass,
      impYV1: j * normY / target.mass,
      impYV2: j * normY / test.mass,
      impXP: overlap * normX,
      impYP: overlap * normY
      }) ;
      
      // changing velocities
      Vector.changeVel(target, test, change);
    }
  }
}
function circleCollide(perm, temp) {
  let a = ((perm.yPos - temp.yPos)) ** 2;
  let b = ((perm.xPos - temp.xPos) * 2) ** 2;
  let c = a + b;
  if(c < 100 && (perm !== temp)) {
    return(true);
  }
  return(false);
}

function collisionParticles(x, y) {
  for (var i = 0; i < 4; i++) {
    particleSpawn(x + Math.random() * 3,y + Math.random() * 6, Math.random() + .4, Math.random() * 1000 + 50);
  }
}

function particleSpawn(x, y, size, time) {
  let particle = document.createElement("div");
  let pStyle = particle.style;
  pStyle.position = "absolute";
  particle.classList.add("ball");
  pStyle.width = size + "%";
  pStyle.background = "#999";
  pStyle.left = x + "%";
  pStyle.top = y + "%";
  pStyle.zIndex = "0";
  pStyle.opacity = ".8";
  pStyle.transition = "ease-out 1000ms all";
  setTimeout(function() {pStyle.opacity = "0"; pStyle.width = size / 2 + "%"}, 1);
  screen.appendChild(particle);
  particle.remove();
}










