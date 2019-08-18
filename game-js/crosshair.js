let crosshairWrapper = document.querySelector(".crosshair-wrapper");

road.addEventListener("mousemove", (e) =>{ getMouseMoves(e)});


// function target(targetC) {
//   if (targetC == true) {
//     console.log("1")
//     document.querySelector("#aimHelp").style.bakground = "red";
//   }else {
//     console.log("2")
//     document.querySelector("#aimHelp").style.bakground = "blue";
//   }
// }

function getMouseMoves(e) {
  let xP = e.pageX - 65;
  let yP = e.pageY - 225;
  crosshairWrapper.style.left = xP+"px";
  crosshairWrapper.style.top = yP+"px";
}


function fillCrosshair() {

  var body = document.getElementsByTagName('html')[0];
  var progress = document.getElementsByClassName('progress')[0];
  var progressValue = document.getElementsByClassName('progress-value')[0];
  var value = ammo;

  progressValue.innerHTML = ammo;

    if (value > 0) {
      value -= 1;
    }
    progressValue.innerHTML = value;

    if (value > 100) {
      progress.style.width = 100 + '%';
    }else {
      progress.style.width = value + '%';
    }
}
