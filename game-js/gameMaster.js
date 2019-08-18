window.ondragstart = function() { return false; }

let killS,
    lockSet = false,
    killSerchForZ,
    LockPriceCannon = false,
    LockPriceNUke = false,
    LockPriceTimeFrezz = false,
    stop2Shoot = false,
    freeActive = false;



function dificulty(get) {
  console.log(get)
  if (lockSet == true) {
    return;
  }else {
  switch (get) {
    case 1:
      creationSpeed = 600;
      moneySystemTrack = 999999;
      ammo = 9999;
      break;
      case 2:
        creationSpeed = 600;
        difficultyChanges(0,5);
        break;
        case 3:
          creationSpeed = 500;
          zombieLiveCount = 20;
          difficultyChanges(10,10);
          break;
          case 4:
            creationSpeed = 400;
            zombieLiveCount = 30;
            difficultyChanges(20,20);
            break;
              case 5:
                creationSpeed = 300;
                zombieLiveCount = 50;
                difficultyChanges(30,20);
                break;
    default:

  }
    pointsNextLevel.innerHTML = zombieLiveCount;
   settings();
 }
}

function difficultyChanges(speedRedux,moneyIncrease) {
  for (var i = 0; i < npc.length; i++) {
     npc[i].speed -= speedRedux;
     npc[i].moneyValue += moneyIncrease;
  }
};


/////////////////////////////////////////////////////
      ////
/////////////////////////////////////////////////////


function settings() {
  if (lockSet == true) {
    return;
  }else {
    lockSet = true;
    let backCount = 4;
    killS = setInterval(() => {
      if (backCount <= 0) {
        // countDownClock();
        startZcreation();
        clearInterval(killS);
        announcementsFun("");
        lockSet = false;
        startInterVal();
        checkForNewZ();
      }else {
        announcementsFun(backCount--)
        startClocksound();
        close2Menu();
        if (lockStuff == false) {
          ambiancEAudio();
          closeStartMenu();
          lockStuff = true;
          pauseVid();
        }
      }
    },1000);
  }
}

function createZombies() {// NOTE: create new zombies
  // NOTE: create zombie wrap
  this.wrap = document.createElement("DIV");
       let zombieObj = zombiRGet[getRandomZ()];
       wrap.className = "zWrap";
       wrap.id = specialId();
       wrap.style.animationDuration = npc[zombieObj].speed+"s";
       wrap.setAttribute('onmouseover','ZigZag(event)');
       wrap.style.animationTimingFunction = "ease";
       wrap.style.top = getRandomYpots()+"px";
       road.appendChild(wrap);
          // NOTE: create zombie
          this.z = document.createElement("IMG");
               z.className = "zombie";
               z.src = npc[zombieObj].npc;
               z.id = npc[zombieObj].killHit;
               z.setAttribute('onclick','createLoot(event), attackZombie(event,'+npc[zombieObj].value+','+npc[zombieObj].moneyValue+');');
               z.setAttribute('ondblclick','createLoot(event), attackZombie(event,'+npc[zombieObj].value+','+npc[zombieObj].moneyValue+');');
               z.setAttribute('onmouseover','target(true)');
               z.setAttribute('onmouseout','target(false)');
               wrap.appendChild(z);
}

function specialId() {
  let code = [
    "A","X","Z"
  ]
  let x = Math.floor(Math.random() * code.length);
  let mix = Math.floor(Math.random() * 1000);
  return code[x] + mix;
}

function startZcreation() {// NOTE: create number of zombies
  let tick = 0;
  killZombieInterval = setInterval( () => {
    if (tick >= zombieLiveCount) {
      clearInterval(killZombieInterval);
      trackZombies();
      checkForEmpty();
    }else {
      createZombies();
      tick++;
    }
  },creationSpeed);
}

function ZigZag(e) {
  if (freeActive == true || levelTrack < 10) {// NOTE: do not activate till level 10
    return
  }else {
    let getID = e.target.parentNode.id;
    let zWrap = document.querySelectorAll(".zWrap");
    for (var i = 0; i < zWrap.length; i++) {
      if (zWrap[i].id == getID) {
        zWrap[i].style.transition = "ease 3s";
        zWrap[i].style.top = getRandomYpots()+"px";
      }
    }
  }
}

function trackZombies() {// NOTE: track where zombies are
   setInterval( () => {
    let zWrap = document.querySelectorAll(".zWrap");
    for (var i = 0; i < zWrap.length; i++) {
      let ClientRect = zWrap[i].getBoundingClientRect();
      let width = window.innerWidth;
       if (ClientRect.x >= width - 100) {
          road.removeChild(zWrap[i]);
          trackZkilled++;
          goForLife(true);
          looseSettings();
          playAudioVoice(soundS.looseSounds);
       }
    }
  },10);
}

function checkForEmpty() {
    let zWrap = document.querySelectorAll(".zWrap");
    killSerchForZ = setInterval(function () {
      if (trackZkilled >= zWrap.length) {
        levelSettings();
      }
    },100);
};

function getRandomZ() {// NOTE: get a random zombie from npc array
 return Math.floor(Math.random() * zombiRGet.length);
}

function checkForNewZ() {
  switch (levelTrack) {
    case 4:
      pushNewZ(3,10);
      break;
      case 8:
        pushNewZ(4,6);
        break;
        case 10:
          pushNewZ(5,5);
          break;
          case 15:
            pushNewZ(6,4);
            break;
            case 20:
              pushNewZ(7,3);
              break;
    default:

  }
};

function pushNewZ(x,y) {
  let g = 0;
  while (g < y) {
    zombiRGet.push(x)
    g++;
  }
};

function getRandomYpots() {// NOTE: get random Ypost position
   let roadHeight = road.offsetHeight ;
   let x = Math.floor(Math.random() * roadHeight);
   if (x >= roadHeight - 150) {
      return roadHeight - 150;
   }else {
     return x;
   }
};

function attackZombie(e,value,money) {
  if (ammo <= 0) {
     ammo = 0;
     ammoEle.innerHTML = ammo;
     noMoreAmmo()
  }else {
    let zombieEle = e.target,
        zombieValue = value,
        zombieHelth = e.target.id;
        stop2Shoot = true;
        zombieDead(zombieEle,zombieHelth,zombieValue,money);
        removeEmmo(false);
  }
};

let zC = 0;
function zombieDead(zombie,health,value,money) {
  if (health > 1) {
    health -= 1;
    zombie.id = health;
    zombieDieSound();
  }else {
    if (zombie.parentNode) {
      road.removeChild(zombie.parentNode);
      zombieDieSound();
      zombieDeadPay(money);
      givePoints(value);
      trackZkilled++;
      trackKilledThisLevel = trackZkilled;
      killed.innerHTML = trackZkilled;
      trackZempty--;
    }
  }
};
/////////////////////////////////////////////////////
      ////     health
/////////////////////////////////////////////////////

function goForLife(y) {
  if (y == true) {
    userLives--;
  }else {
    moneySystemTrack -= lifeValue;
    userLives++;
    writeMoney();
  }
  lifeText.innerHTML = userLives+" &hearts;";
}


/////////////////////////////////////////////////////
      ////     health
/////////////////////////////////////////////////////
function startCannon() {

  moneySystemTrack -= 1000;
  LockPriceCannon = true;
  writeMoney();
  canonMoviendoSe();

  cannonWrap.style.WebkitAnimationName = "moveCannon";
  cannonWrap.style.animationName = "moveCannon";
  cannonWrap.style.animationDuration = 8+"s";
  cannonWrap.style.animationTimingFunction = "ease";
  cannonWrap.style.animationFillMode = "forwards";

  // cannonWrap.addEventListener("animationend", fireBallStart,false);

  setTimeout(() =>{
    fireBallStart();
  },8000);
}

function fireBallStart() {
  canonDisparando();

  cannonFireBallWarp.style.display ="block";
  cannonFireBallWarp.style.WebkitAnimationName = "moveFireball";
  cannonFireBallWarp.style.animationName = "moveFireball";
  cannonFireBallWarp.style.animationDuration = 1+"s";
  cannonFireBallWarp.style.animationTimingFunction = "ease";
  cannonFireBallWarp.style.animationFillMode = "forwards";

  fireBallKillCheck();

  setTimeout(() =>{
    returnGun();
  },1000);

}

function returnGun() {
  cannonFireBallWarp.style.WebkitAnimationName = "moveFireballBack";
  cannonFireBallWarp.style.animationName = "moveFireballBack";
  cannonFireBallWarp.style.animationDuration = 1+"s";
  cannonFireBallWarp.style.animationTimingFunction = "ease";
  // NOTE:
  canonMoviendoSe();
  cannonWrap.style.WebkitAnimationName = "moveBackCannon";
  cannonWrap.style.animationName = "moveBackCannon";
  cannonWrap.style.animationDuration = 8+"s";
  cannonWrap.style.animationTimingFunction = "ease";

  setTimeout(() =>{
    LockPriceCannon = false;
  },9000);

}

function fireBallKillCheck() {
  killIntervalCannon = setInterval(() =>{
    let zWrap = document.querySelectorAll(".zWrap");
    for (var i = 0; i < zWrap.length; i++) {
      let fireBallPost = cannonFireBallWarp.getBoundingClientRect();
      let zPost = zWrap[i].getBoundingClientRect();
      if (parseInt(zPost.x) > parseInt(fireBallPost.x)) {
          trackZkilled++;
          road.removeChild(zWrap[i]);
          zombieDieSound();
          trackKilledThisLevel = trackZkilled;
          userScoreSave += nukeKillValue;
          killed.innerHTML = trackZkilled;
          userScore.innerHTML = userScoreSave;
          trackPointsForThisLevel = userScoreSave;// NOTE: check for points for this level
      }
    }
  },10);
}

///////////////////////////////////////////
      ////     CHECK IF CAN AFFORD WEAPON / AMMO
//////////////////////////////////////////


function startInterVal() {
  setInterval(function () { checkForMoney() },10);
}

function checkForMoney() {
    bulletCheck();
    nukeCheck();
    freeTimeCheck();
    LifeTimeCheck();
    CannonCheck();
}

function bulletCheck() {
  if (moneySystemTrack >= bulletsValue) {
    document.querySelector("#coverBullet").style.display = "none";
  }else {
    document.querySelector("#coverBullet").style.display = "flex";
  }
}

function nukeCheck() {
  if (LockPriceNUke == false) {
    if (moneySystemTrack >= nukeValue) {
      document.querySelector("#coverNuke").style.display = "none";
    }else {
      document.querySelector("#coverNuke").style.display = "flex";
    }
  }else {
    document.querySelector("#coverNuke").style.display = "flex";
  }
}

function freeTimeCheck() {
  if (LockPriceTimeFrezz == false) {
    if (moneySystemTrack >= freezT) {
      document.querySelector("#coverTimeFreez").style.display = "none";
    }else {
      document.querySelector("#coverTimeFreez").style.display = "flex";
    }
  }else {
      document.querySelector("#coverTimeFreez").style.display = "flex";
  }
}

function LifeTimeCheck() {
  if (moneySystemTrack >= lifeValue) {
    document.querySelector("#coverLife").style.display = "none";
  }else {
    document.querySelector("#coverLife").style.display = "flex";
  }
}

function CannonCheck() {
  if (LockPriceCannon == false) {
    if (moneySystemTrack >= cannonPrice) {
      document.querySelector("#coverCannon").style.display = "none";
    }else {
      document.querySelector("#coverCannon").style.display = "flex";
    }
  }else {
    document.querySelector("#coverCannon").style.display = "flex";
  }
}


///////////////////////////////////////////
      ////     SCORE SITEM
//////////////////////////////////////////

function givePoints(poinst) {
  userScoreSave += poinst;
  trackPointsForThisLevel += poinst;
  userScore.innerHTML = userScoreSave.toLocaleString('en');;
}

function levelSettings() {
  // trackLevelSitem
  if (trackZkilled >= zombieLiveCount) {
    let zWrap = document.querySelectorAll(".zWrap");
    for (var i = 0; i < zWrap.length; i++) {
      road.removeChild(zWrap[i]);
    }

    saveZkilledPer += trackZkilled;// NOTE: save z killed during the hole game

    // trackLevelSitem = parseInt(trackLevelSitem * 1.7);
    zombieLiveCount += 10;
    pointsNextLevel.innerHTML = zombieLiveCount.toLocaleString('en');;
    trackZkilled = 0;
    clearInterval(killSerchForZ);

    levelTrack++;
    userLevel.innerHTML = levelTrack;

    clearInterval(killZombieInterval);

    // addNewZ();

    // creationSpeed -= 5;
    // zCreationSpeed.innerHTML = creationSpeed+"/ms";

    // trackZspeeds();

    nextLevelEnd();

    incriseZvalue();
  }
}

// function addNewZ() {// NOTE: a change to add more bosses
//   let x = 0;
//   while (x < 2) {
//     zombiRGet.push(Math.floor(Math.random() * Math.floor(npc.length)));
//     x++;
//   }
// };

// function trackZspeeds() {
//   trackSpeed += 5;
//   for (var i = 0; i < npc.length; i++) {
//     if (trackSpeed >= 80) {
//        break;
//     }else {
//       npc[i].speed -= 2;
//     }
//   }
// };

function trackCreationSpeeds() {
  if (creationSpeed <= 200) {
    creationSpeed = 200;
  }else {
    creationSpeed -= 200;
  }
  zCreationSpeed.innerHTML = creationSpeed+"/ms";
}

function incriseZvalue() {
  for (var i = 0; i < npc.length; i++) {
    npc[i].value += 10;
  }
}
///////////////////////////////////////////
      ////     LOOSE SISTEM
//////////////////////////////////////////

function looseSettings() {
   if (userLives <= 0) {
     EndGame();
     resetB.style.display = "inline-block";
   }
}

///////////////////////////////////////////
      ////     announcements
//////////////////////////////////////////

function announcementsFun(text) {
  announcements.innerHTML = text;
}

function EndAnnouncementsFun(text) {
  let x = Math.floor(Math.random() * Math.floor(text.length));
  getGameEnding.innerHTML = text[x];
}

function writeMoney() {
  zCreationSpeed.innerHTML = "&dollar;"+moneySystemTrack.toLocaleString('en');;
}

///////////////////////////////////////////
        ////     stop time
//////////////////////////////////////////

function freezeTime() {
  let zWrap = document.querySelectorAll(".zWrap");
  for (var i = 0; i < zWrap.length; i++) {
    zWrap[i].style.WebkitAnimationPlayState  = "paused";
    zWrap[i].style.animationPlayState  = "paused";
  }
  moneySystemTrack -= freezT;
  writeMoney();
  freeActive = true;
  unFreeze();
  LockPriceTimeFrezz = true;
}

function unFreeze() {
  setTimeout(function () {
    let zWrap = document.querySelectorAll(".zWrap");
    for (var i = 0; i < zWrap.length; i++) {
      zWrap[i].style.WebkitAnimationPlayState  = "running";
      zWrap[i].style.animationPlayState  = "running";
    }
    freeActive = false;
    LockPriceTimeFrezz = false;
  },10000);
}

///////////////////////////////////////////
      ////     GAME MENUS
//////////////////////////////////////////

function closeStartMenu() {
  startMenu.style.display = "none";
}

function nextLevelEnd() {
      gameEndWrap.style.display = "flex";
      nextB.style.display = "inline-block";
      resetB.style.display = "none";
      finalUserInfo();
      addNewLoot();
      EndAnnouncementsFun(endWin);
      trackKilledThisLevel = 0;
      trackPointsForThisLevel = 0;
      trackAmmoThisLevel = 0;
}

function close2Menu() {
  gameEndWrap.style.display = "none";
}

function EndGame() {
  gameEndWrap.style.display = "flex";
  nextB.style.display = "none";
  resetB.style.display = "inline-block";
  road.innerHTML = "";
  finalUserInfo();
  clearInterval(killZombieInterval);
  EndAnnouncementsFun(endLose);
}
///////////////////////////////////////////
        ////     AMMO
//////////////////////////////////////////

road.addEventListener("click", ()=>{roadClickCheck()},false);

road.addEventListener("dblclick", ()=>{roadClickCheck()},false);

function roadClickCheck() {
  if (ammo <= 0) {
     ammo = 0;
     ammoEle.innerHTML = ammo.toLocaleString('en');;
     noMoreAmmo()
  }else {
    if (stop2Shoot == true) {
      stop2Shoot = false;
      return
    }else {
      removeEmmo(true);
    }
  }
}


function makeAmmoFijo() { // NOTE: ccrear 100 ballas fijo cuando compras ballas
   let tick = 0;
   while (tick < 100) {
     ammo++;
     tick++;
     ammoEle.innerHTML = ammo.toLocaleString('en');;
   }
   moneySystemTrack -= bulletsValue;
   writeMoney();
   trackAmmoThisLevel += tick;
   playAudioVoice(soundS.ammoSounds);
   fillCrosshair();
}

function MakeAmmo(e) {
   let tick = 0;
   while (tick < giveChanceBullets()) {
     ammo++;
     tick++;
     ammoEle.innerHTML = ammo.toLocaleString('en');;
   }
   trackAmmoThisLevel += tick;
   playAudioVoice(soundS.ammoSounds);
   road.removeChild(e.target.parentNode);
   fillCrosshair();
}

function giveChanceBullets() {// NOTE: give randome bullet prices
  let y = [
    1,4,8,80,12,16,18,20,1,4,8,100,12,16,18,20,1,4,80,10,12,16,18,20,
    1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,
    1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,40,4,8,120,12,16,18,20,
    1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,1,4,40,10,12,16,80,20,
    40,4,8,120,12,16,18,20,1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,
    1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,
    1,4,8,10,12,100,18,20,1,4,8,500,12,16,18,20,1,4,8,10,12,16,100,20,
    1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,
    1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,
    80,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,
    1,4,8,10,12,16,18,20,1,4,8,10,12,16,18,20,40,4,8,10,12,80,18,20,
    40,4,8,10,12,120,18,20,1,4,8,10,100,16,18,20,1,4,8,10,12,16,18,20,
  ]
  let x = Math.floor(Math.random() * Math.floor(y.length));
  return y[x];
}

function removeEmmo(x) {
  ammo--;
  ammoEle.innerHTML = ammo;
  fillCrosshair();
  if (x == true) {
    MissB();
  }else {
    gunSoundFun();
  }
}

///////////////////////////////////////////
        ////  GET FINAL INFO
//////////////////////////////////////////

function finalUserInfo() {
  Zlevel.innerHTML = levelTrack - 1;
  Zkilled.innerHTML = trackKilledThisLevel.toLocaleString('en');
  Zscore.innerHTML = trackPointsForThisLevel.toLocaleString('en');
  ZextraP.innerHTML = trackAmmoThisLevel.toLocaleString('en');
  totalZscore.innerHTML = userScoreSave.toLocaleString('en');
  TotalZkilled.innerHTML = saveZkilledPer.toLocaleString('en');
}

///////////////////////////////////////////
      ////     SPECIAL WEAPONS
//////////////////////////////////////////

let lockNuke = false;
function goForNuke(e) {
   // road.removeChild(e.target.parentNode);
   moneySystemTrack -= 1000;
   LockPriceNUke = true;
   nukeSiren();
   zCreationSpeed.innerHTML = moneySystemTrack;
   if (lockNuke == true) {
       return;// NOTE: lock to unable user to press multiple times
   }else {
     nukeTimer = 10;
     let killK = setInterval(() =>{
       if (nukeTimer <= 0) {
         let zWrap = document.querySelectorAll(".zWrap");
         for (var i = 0; i < zWrap.length; i++) {
           road.removeChild(zWrap[i]);
           trackZkilled += 1;
           trackKilledThisLevel = trackZkilled;
           userScoreSave += nukeKillValue;
           killed.innerHTML = trackZkilled;
           userScore.innerHTML = userScoreSave;
           trackPointsForThisLevel = userScoreSave;// NOTE: check for points for this level
           LockPriceNUke = false;
         }
         addNukeIMG();
         announcementsFun("");
         nukeSoundFun();
         clearInterval(killK);
         // NOTE: other upgrades
         nukeKillValue += 10;
         explosionP += 50;
         lockNuke = false;
         playAudioVoice(soundS.nukeSounds);
         NukeSiren.pause();
       }else {
         nukeTimer--;
         announcementsFun(nukeTimer);
         startClocksound();
         lockNuke = true;
       }
     },1000);
   }
}

function addNukeIMG() {
  exploxionWrap.style.display = "block";
  setTimeout(() =>{
    exploxionWrap.style.display = "none";
  },4000);
}

///////////////////////////////////////////
        ////  drop loot
//////////////////////////////////////////
function createLoot(z) {
  if (ammo <= 0) {
    return;
  }else {
    let luckDrop = Math.floor(Math.random() * Math.floor(100));
    // NOTE: create loot wrap
    let lx1 = LuckyNum(),
        lx2 = LuckyNum(),
        lx3 = LuckyNum(),
        lx4 = LuckyNum(),
        lx5 = LuckyNum(),
        lx6 = LuckyNum(),
        lx7 = LuckyNum(),
        lx8 = LuckyNum(),
        lx9 = LuckyNum();

    if (luckDrop == lx1 // NOTE: 9 chances to get some loot
       || luckDrop == lx2
        || luckDrop == lx3
         || luckDrop == lx4
          || luckDrop == lx5
           || luckDrop == lx6
            || luckDrop == lx7
             || luckDrop == lx8
              || luckDrop == lx9) {
      let clientRec = z.target.getBoundingClientRect();
      let getLoot = Math.floor(Math.random() * Math.floor(lootChace.length));
      let loot = document.createElement("div")
          loot.className = "lootDrop_wrap";
          loot.style.top = clientRec.top - 100+"px";
          loot.style.left = clientRec.left+"px";
          road.appendChild(loot);
          let lootImg = document.createElement("IMG");
              lootImg.className = "lootIMG";
              lootImg.src = lootType[lootChace[getLoot]].loot;
              lootImg.setAttribute('onclick', lootType[lootChace[getLoot]].giveLootFun);
              loot.appendChild(lootImg);
    }else {
      return;
    }
  }
};

function addNewLoot() {// NOTE: a change to get more loot
  let x = 0;
  while (x < 5) {
    let p = Math.floor(Math.random() * Math.floor(2));
    lootChace.push(lootChace[p]);
    x++;
  }
};

function LuckyNum() {// NOTE: a change to get more loot
  return Math.floor(Math.random() * Math.floor(100));
};

///////////////////////////////////////////
      ////     EXTRA POINTS
//////////////////////////////////////////

function zombieDeadPay(money) {
  moneySystemTrack += money;
  writeMoney();
  showMoneyAdded();
}

function goForPoinst(e) {
  moneySystemTrack += giveChancePoints();
  writeMoney();
  moneyChing();
  showMoneyAdded();
  road.removeChild(e.target.parentNode);
}

function showMoneyAdded() {
  moneyWrap.style.border = "solid 5px lightGreen";
  setTimeout(() =>{
    moneyWrap.style.border = "solid 5px rgb(162, 163, 159)";
  },500);
}

function giveChancePoints() {// NOTE: give randome bullet prices
  let y = [
    100,20,20,20,20,20,20,100,20,20,20,60,60,20,20,100,
    20,20,20,20,20,20,20,20,60,20,20,20,20,20,20,20,
    60,20,60,20,20,20,20,20,20,20,20,20,20,60,20,20,
    60,20,60,20,20,20,20,20,20,20,20,20,20,20,20,20,
    20,20,20,20,20,20,20,20,20,20,20,20,20,20,60,60,
    20,20,20,20,20,20,20,20,20,20,20,20,20,60,20,20,
    100,20,20,20,20,20,100,20,20,20,20,20,20,20,20,60,
    20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,
    20,60,20,20,20,20,20,20,20,20,20,20,20,20,20,20,
    20,60,20,20,20,20,20,20,20,20,20,60,20,20,100,20,
    20,20,100,20,20,20,20,20,20,20,20,20,20,20,20,20,
    20,20,20,20,20,20,20,20,20,20,20,20,60,20,100,20,
    20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,
    100,20,20,60,20,20,20,20,60,20,20,20,20,100,1000,20
  ]
  let x = Math.floor(Math.random() * Math.floor(y.length));
  return y[x];
}
///////////////////////////////////////////
      ////     SOUNDS
//////////////////////////////////////////


function zombieDieSound() {
  zombieDie.preload = 'auto';
     zombieDie.load();
        zombieDie.play();
};

function startClocksound() {
  startClockSound.preload = 'auto';
     startClockSound.load();
        startClockSound.play();
};

function ambiancEAudio() {
  ambianceAudio.preload = 'auto';
     ambianceAudio.load();
      ambianceAudio.loop = true;
        ambianceAudio.play();
};

function gunSoundFun() {
  gunSound.preload = 'auto';
    gunSound.load();
        gunSound.play();
}

function nukeSoundFun() {
  explosionBoom.preload = 'auto';
    explosionBoom.load();
        explosionBoom.play();
}

function moneyChing() {
  ChingChing.preload = 'auto';
    ChingChing.load();
        ChingChing.play();
}

function noMoreAmmo() {
  emptyGun.preload = 'auto';
    emptyGun.load();
        emptyGun.play();
}

function nukeSiren() {
  NukeSiren.preload = 'auto';
    NukeSiren.load();
        NukeSiren.play();
}

function MissB() {
  missBullet.preload = 'auto';
    missBullet.load();
        missBullet.play();
}

function canonMoviendoSe() {
  CannonMoving.preload = 'auto';
    CannonMoving.load();
        CannonMoving.play();
}

function canonDisparando() {
  CannonFire.preload = 'auto';
    CannonFire.load();
        CannonFire.play();
}

function playAudioVoice(sound) {
  let x = Math.floor(Math.random() * Math.floor(sound.length));
  let a = new Audio(sound[x]);
  a.play();
}

function pauseVid() {
  video.pause();
}
