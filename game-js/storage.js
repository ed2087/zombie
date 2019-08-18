// NOTE: GLOBAL RESOURCES


// NOTE: DOM
let road = document.querySelector(".Road"),
    ammoEle = document.querySelector(".ammoEle"),
    userScore = document.querySelector(".userScore"),
    userLevel = document.querySelector(".userLevel"),
    getGameEnding = document.querySelector(".getGameEnding"),
    announcements = document.querySelector(".announcements"),
    cannonWrap = document.querySelector(".cannon_wrap"),
    cannonFireBallWarp = document.querySelector(".cannonFireBall_warp"),
    gameEndWrap = document.querySelector(".gameEndWrap"),
    lifeText = document.querySelector(".LifeText"),
    video = document.querySelector(".video"),
    startMenu = document.querySelector(".startMenu"),
    pointsNextLevel = document.querySelector(".pointsNextLevel"),
    zCreationSpeed = document.querySelector(".zCreationSpeed"),
    exploxionWrap = document.querySelector(".exploxion_wrap"),
    resetB = document.querySelector("#Reset"),
    nextB = document.querySelector("#nextB"),
    gunSound = document.querySelector("#gunSound"),
    Zlevel = document.querySelector("#Zlevel"),
    Zkilled = document.querySelector("#Zkilled"),
    Zscore = document.querySelector("#Zscore"),
    ZextraP = document.querySelector("#ZextraP"),
    boomButton = document.querySelector("#boom"),
    explosionBoom = document.querySelector("#explosionBoom"),
    timerCountDown = document.querySelector("#timerCountDown"),
    totalZscore = document.querySelector("#totalZscore"),
    TotalZkilled = document.querySelector("#TotalZkilled"),
    emptyGun = document.querySelector("#emptyGun"),
    NukeSiren = document.querySelector("#NukeSiren"),
    missBullet = document.querySelector("#missBullet"),
    CannonMoving = document.querySelector("#CannonMoving"),
    CannonFire = document.querySelector("#CannonFire"),
    moneyWrap = document.querySelector("#moneyWrap"),
    killed = document.querySelector(".killed");


// NOTE: in game settings

let creationSpeed = 500,
    userLives = 3;
    explosionP = 100;
    userScoreSave = 0,
    trackZkilled = 0,
    saveZkilledPer = 0;
    ammo = 100,
    levelTrack = 1,
    nukeKillValue = 100,
    trackSpeed = 0,
    killZombieInterval = "",
    lockStuff = false,
    clock = 1000,
    trackClock = 60,
    trackLevelSitem = 5000,
    zombieLiveCount = 10,
    trackZempty = zombieLiveCount;

let trackPointsForThisLevel = 0,
    trackKilledThisLevel = 0,
    trackAmmoThisLevel = 0;

let moneySystemTrack = 50,
    nukeValue = 2500,
    bulletsValue = 200,
    lifeValue = 2000,
    cannonPrice = 1000;
    freezT = 750;

// NOTE: npc's
let npc = [
  {
    npc : "game-images/zombies/runner1.gif",
    speed : 60,
    value : 80,
    killHit : 1,
    moneyValue : 5
  },
  {
    npc : "game-images/zombies/runner2.gif",
    speed : 60,
    value : 90,
    killHit : 1,
    moneyValue : 5
  },
  {
    npc : "game-images/zombies/runner3.gif",
    speed : 60,
    value : 90,
    killHit : 1,
    moneyValue : 5
  },
  {
    npc : "game-images/zombies/runner4.gif",
    speed : 70,
    value : 100,
    killHit : 2,
    moneyValue : 10
  },
  {
    npc : "game-images/zombies/Zstrong.gif",
    speed : 90,
    value : 150,
    killHit : 3,
    moneyValue : 50
  },
  {
    npc : "game-images/zombies/Zboss.gif",
    speed : 100,
    value : 300,
    killHit : 5,
    moneyValue : 75
  },
  {
    npc : "game-images/zombies/zboss2.gif",
    speed : 110,
    value : 500,
    killHit : 8,
    moneyValue : 100
  },
  {
    npc : "game-images/zombies/megaBoss.gif",
    speed : 130,
    value : 1000,
    killHit : 15,
    moneyValue : 200
  }
];


let zombiRGet = [// NOTE: make it less lickly that big bosses will show
    2,1,0,2,0,1,0,2,0,1,0,1,0,1,0,1,0,2,0,1,0,2,
    0,1,2,1,0,1,0,2,0,1,2,1,0,1,0,1,2,1,2,1,0,2,
    2,1,0,2,0,1,0,2,0,1,0,1,0,1,0,1,0,2,0,1,0,2,
    0,1,2,1,0,1,0,2,0,1,0,1,2,1,0,1,2,1,2,1,0,2
];


// NOTE: LOOT DROP
let lootType = [
  {
    loot : "game-images/miscellaneous/points-icon.png",
    giveLootFun : "goForPoinst(event)"
  },
  {
    loot : "game-images/miscellaneous/bullets-ammo.png",
    giveLootFun : "MakeAmmo(event)"
  }
  // {
  //   loot : "../../game-images/miscellaneous/lifeIMG.png",
  //   giveLootFun : "goForLife(event)"
  // },
  // {
  //   loot : "../../game-images/miscellaneous/clock.png",
  //   giveLootFun : "giveTime(event)"
  // },
  // {
  //   loot : "../../game-images/miscellaneous/stopClock.png",
  //   giveLootFun : "stopTime(event)"
  // },
  // {
  //   loot : "../../game-images/miscellaneous/nukeButton.png",
  //   giveLootFun : "goForNuke(event)"
  // }
];

let lootChace = [
  0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,
  0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,
  0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0
]

// NOTE: SOUND SPEC
let soundS = {
  ammoSounds : [
    "game-sounds/gamevoices/moreAmmo/better.wav",
    "game-sounds/gamevoices/moreAmmo/bitchin.wav",
    "game-sounds/gamevoices/moreAmmo/lets_rock.wav"
  ],
  looseSounds : [
    "game-sounds/gamevoices/lose/damn_it.wav",
    "game-sounds/gamevoices/lose/damn.wav",
    "game-sounds/gamevoices/lose/you_suck.wav",
    "game-sounds/gamevoices/lose/you_suck2.wav"
  ],
  winSounds : [
    "game-sounds/gamevoices/win/good.wav",
    "game-sounds/gamevoices/win/good2.wav"
  ],
  nukeSounds : [
    "game-sounds/gamevoices/nukeSounds/abort.wav",
    "game-sounds/gamevoices/nukeSounds/blow_it_x.wav",
    "game-sounds/gamevoices/nukeSounds/clean-up.wav",
    "game-sounds/gamevoices/nukeSounds/gotta_hurt.wav",
    "game-sounds/gamevoices/nukeSounds/holy_sh.wav",
    "game-sounds/gamevoices/nukeSounds/mess.wav"
  ]
};


// NOTE: END COMMENTS

let endLose = [
  "Better luck next time",
  "WOW, You suck",
  "What was that?",
  "Was you even trying?",
  "yo grandma could do better"
];

let endWin = [
  "advance to the next level",
  "What do you want a cookie",
  "What ever",
  "I'll get you next round",
  "Whoopi, no one cares"
];
