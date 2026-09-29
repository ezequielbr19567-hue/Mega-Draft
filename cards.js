// Classic data snapshot: RoyaleAPI, 2023-10-18. Roles/vers are teaching heuristics.
const CARDS = [
 {
  "name": "Tronco",
  "e": 2,
  "roles": [
   "smallSpell"
  ],
  "targets": [
   "swarm",
   "bait"
  ],
  "vers": 9,
  "key": "the-log",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Flechas",
  "e": 3,
  "roles": [
   "smallSpell",
   "antiAir"
  ],
  "targets": [
   "swarm",
   "air"
  ],
  "vers": 8,
  "key": "arrows",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Zap",
  "e": 2,
  "roles": [
   "smallSpell",
   "reset"
  ],
  "targets": [
   "swarm",
   "inferno"
  ],
  "vers": 8,
  "key": "zap",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Bola de Fogo",
  "e": 4,
  "roles": [
   "bigSpell"
  ],
  "targets": [
   "support",
   "medium"
  ],
  "vers": 9,
  "key": "fireball",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Veneno",
  "e": 4,
  "roles": [
   "bigSpell"
  ],
  "targets": [
   "support",
   "graveyard"
  ],
  "vers": 9,
  "key": "poison",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Relâmpago",
  "e": 6,
  "roles": [
   "bigSpell",
   "reset"
  ],
  "targets": [
   "support",
   "building"
  ],
  "vers": 7,
  "key": "lightning",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Valquíria",
  "e": 4,
  "roles": [
   "miniTank",
   "splash",
   "ground"
  ],
  "targets": [
   "swarm",
   "ground"
  ],
  "vers": 9,
  "key": "valkyrie",
  "draftGroups": [
   "TankUnit",
   "MiniTank"
  ]
 },
 {
  "name": "Cavaleiro",
  "e": 3,
  "roles": [
   "miniTank",
   "ground"
  ],
  "targets": [
   "ground"
  ],
  "vers": 9,
  "key": "knight",
  "draftGroups": [
   "TankUnit",
   "MiniTank"
  ]
 },
 {
  "name": "Mini P.E.K.K.A",
  "e": 4,
  "roles": [
   "tankKiller",
   "ground"
  ],
  "targets": [
   "tank",
   "hog"
  ],
  "vers": 8,
  "key": "mini-pekka",
  "draftGroups": [
   "MiniTank",
   "AntiTank"
  ]
 },
 {
  "name": "P.E.K.K.A",
  "e": 7,
  "roles": [
   "tankKiller",
   "tank",
   "ground"
  ],
  "targets": [
   "tank",
   "bridge"
  ],
  "vers": 7,
  "key": "pekka",
  "draftGroups": [
   "AntiTank"
  ]
 },
 {
  "name": "Caçador",
  "e": 4,
  "roles": [
   "antiAir",
   "tankKiller",
   "support"
  ],
  "targets": [
   "air",
   "tank",
   "balloon"
  ],
  "vers": 9,
  "key": "hunter",
  "draftGroups": [
   "AntiAir",
   "AntiTank"
  ]
 },
 {
  "name": "Mosqueteira",
  "e": 4,
  "roles": [
   "antiAir",
   "support"
  ],
  "targets": [
   "air",
   "support"
  ],
  "vers": 9,
  "key": "musketeer",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Arqueiras",
  "e": 3,
  "roles": [
   "antiAir",
   "support"
  ],
  "targets": [
   "air"
  ],
  "vers": 8,
  "key": "archers",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Mago Elétrico",
  "e": 4,
  "roles": [
   "antiAir",
   "reset",
   "support"
  ],
  "targets": [
   "inferno",
   "air"
  ],
  "vers": 9,
  "key": "electro-wizard",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Bebê Dragão",
  "e": 4,
  "roles": [
   "antiAir",
   "splash",
   "support",
   "air"
  ],
  "targets": [
   "swarm",
   "air"
  ],
  "vers": 9,
  "key": "baby-dragon",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Executor",
  "e": 5,
  "roles": [
   "antiAir",
   "splash",
   "support"
  ],
  "targets": [
   "swarm",
   "air"
  ],
  "vers": 7,
  "key": "executioner",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Bombardeiro",
  "e": 2,
  "roles": [
   "splash",
   "ground"
  ],
  "targets": [
   "swarm",
   "ground"
  ],
  "vers": 7,
  "key": "bomber",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Príncipe",
  "e": 5,
  "roles": [
   "ground",
   "pressure"
  ],
  "targets": [
   "medium",
   "tank"
  ],
  "vers": 7,
  "key": "prince",
  "draftGroups": [
   "MiniTank"
  ]
 },
 {
  "name": "Príncipe das Trevas",
  "e": 4,
  "roles": [
   "splash",
   "miniTank",
   "pressure"
  ],
  "targets": [
   "swarm",
   "ground"
  ],
  "vers": 8,
  "key": "dark-prince",
  "draftGroups": [
   "MiniTank"
  ]
 },
 {
  "name": "Fantasma Real",
  "e": 3,
  "roles": [
   "pressure",
   "splash"
  ],
  "targets": [
   "swarm",
   "support"
  ],
  "vers": 8,
  "key": "royal-ghost",
  "draftGroups": [
   "MiniTank"
  ]
 },
 {
  "name": "Mega Servo",
  "e": 3,
  "roles": [
   "antiAir",
   "support",
   "air"
  ],
  "targets": [
   "air",
   "medium"
  ],
  "vers": 8,
  "key": "mega-minion",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Servos",
  "e": 3,
  "roles": [
   "antiAir",
   "swarm",
   "air"
  ],
  "targets": [
   "tank",
   "air"
  ],
  "vers": 7,
  "key": "minions",
  "draftGroups": [
   "AntiAir",
   "Distractions"
  ]
 },
 {
  "name": "Horda de Servos",
  "e": 5,
  "roles": [
   "antiAir",
   "swarm",
   "air"
  ],
  "targets": [
   "tank",
   "air"
  ],
  "vers": 5,
  "key": "minion-horde",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Gangue de Goblins",
  "e": 3,
  "roles": [
   "swarm",
   "bait"
  ],
  "targets": [
   "tank",
   "ground"
  ],
  "vers": 7,
  "key": "goblin-gang",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Guardas",
  "e": 3,
  "roles": [
   "swarm",
   "ground"
  ],
  "targets": [
   "tank",
   "ground"
  ],
  "vers": 8,
  "key": "guards",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Exército de Esqueletos",
  "e": 3,
  "roles": [
   "swarm"
  ],
  "targets": [
   "tank",
   "ground"
  ],
  "vers": 6,
  "key": "skeleton-army",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Espírito de Gelo",
  "e": 1,
  "roles": [
   "cycle"
  ],
  "targets": [
   "swarm"
  ],
  "vers": 7,
  "key": "ice-spirit",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Esqueletos",
  "e": 1,
  "roles": [
   "cycle"
  ],
  "targets": [
   "ground"
  ],
  "vers": 7,
  "key": "skeletons",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Torre Bomba",
  "e": 4,
  "roles": [
   "building",
   "splash"
  ],
  "targets": [
   "hog",
   "ground"
  ],
  "vers": 8,
  "key": "bomb-tower",
  "draftGroups": [
   "AntiTank"
  ]
 },
 {
  "name": "Tesla",
  "e": 4,
  "roles": [
   "building",
   "antiAir"
  ],
  "targets": [
   "hog",
   "air",
   "tank"
  ],
  "vers": 9,
  "key": "tesla",
  "draftGroups": [
   "AntiTank"
  ]
 },
 {
  "name": "Torre Inferno",
  "e": 5,
  "roles": [
   "building",
   "tankKiller"
  ],
  "targets": [
   "tank",
   "giant",
   "rg"
  ],
  "vers": 8,
  "key": "inferno-tower",
  "draftGroups": [
   "AntiTank"
  ]
 },
 {
  "name": "Canhão",
  "e": 3,
  "roles": [
   "building"
  ],
  "targets": [
   "hog",
   "ground"
  ],
  "vers": 8,
  "key": "cannon",
  "draftGroups": [
   "AntiTank"
  ]
 },
 {
  "name": "Jaula de Goblin",
  "e": 4,
  "roles": [
   "building",
   "miniTank"
  ],
  "targets": [
   "hog",
   "tank"
  ],
  "vers": 9,
  "key": "goblin-cage",
  "draftGroups": [
   "MiniTank",
   "AntiTank",
   "Investment"
  ]
 },
 {
  "name": "Corredor",
  "e": 4,
  "roles": [
   "wincon",
   "hog"
  ],
  "targets": [],
  "vers": 8,
  "key": "hog-rider",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Balão",
  "e": 5,
  "roles": [
   "wincon",
   "air",
   "balloon"
  ],
  "targets": [],
  "vers": 7,
  "key": "balloon",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Cemitério",
  "e": 5,
  "roles": [
   "wincon",
   "graveyard"
  ],
  "targets": [],
  "vers": 8,
  "key": "graveyard",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Gigante Real",
  "e": 6,
  "roles": [
   "wincon",
   "rg"
  ],
  "targets": [],
  "vers": 8,
  "key": "royal-giant",
  "draftGroups": [
   "TankUnit",
   "WinCons"
  ]
 },
 {
  "name": "Gigante",
  "e": 5,
  "roles": [
   "wincon",
   "tank",
   "giant"
  ],
  "targets": [],
  "vers": 7,
  "key": "giant",
  "draftGroups": [
   "TankUnit",
   "WinCons"
  ]
 },
 {
  "name": "Golem",
  "e": 8,
  "roles": [
   "wincon",
   "tank"
  ],
  "targets": [],
  "vers": 5,
  "key": "golem",
  "draftGroups": [
   "TankUnit"
  ]
 },
 {
  "name": "Mineiro",
  "e": 3,
  "roles": [
   "wincon",
   "miniTank"
  ],
  "targets": [],
  "vers": 9,
  "key": "miner",
  "draftGroups": [
   "TankUnit",
   "WinCons",
   "MiniTank"
  ]
 },
 {
  "name": "Barril de Goblins",
  "e": 3,
  "roles": [
   "wincon",
   "bait"
  ],
  "targets": [],
  "vers": 7,
  "key": "goblin-barrel",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Ariete de Batalha",
  "e": 4,
  "roles": [
   "wincon",
   "bridge"
  ],
  "targets": [],
  "vers": 7,
  "key": "battle-ram",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Porcos Reais",
  "e": 5,
  "roles": [
   "wincon",
   "hog"
  ],
  "targets": [],
  "vers": 8,
  "key": "royal-hogs",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Lava Hound",
  "e": 7,
  "roles": [
   "wincon",
   "tank",
   "air"
  ],
  "targets": [],
  "vers": 6,
  "key": "lava-hound",
  "draftGroups": [
   "TankUnit"
  ]
 },
 {
  "name": "Morteiro",
  "e": 4,
  "roles": [
   "wincon",
   "building"
  ],
  "targets": [],
  "vers": 8,
  "key": "mortar",
  "draftGroups": [
   "Investment"
  ]
 },
 {
  "name": "X-Besta",
  "e": 6,
  "roles": [
   "wincon",
   "building"
  ],
  "targets": [],
  "vers": 6,
  "key": "x-bow",
  "draftGroups": [
   "Investment"
  ]
 },
 {
  "name": "Pescador",
  "e": 3,
  "roles": [
   "control",
   "ground"
  ],
  "targets": [
   "hog",
   "tank"
  ],
  "vers": 9,
  "key": "fisherman",
  "draftGroups": [
   "MiniTank"
  ]
 },
 {
  "name": "Tornado",
  "e": 3,
  "roles": [
   "control",
   "smallSpell"
  ],
  "targets": [
   "hog",
   "swarm"
  ],
  "vers": 9,
  "key": "tornado",
  "draftGroups": [
   "2ndSpell"
  ]
 },
 {
  "name": "Mago",
  "e": 5,
  "roles": [
   "antiAir",
   "splash",
   "support"
  ],
  "targets": [
   "swarm",
   "air"
  ],
  "vers": 6,
  "key": "wizard",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Bruxa",
  "e": 5,
  "roles": [
   "support",
   "swarm",
   "antiAir"
  ],
  "targets": [
   "ground"
  ],
  "vers": 6,
  "key": "witch",
  "draftGroups": [
   "AntiAir",
   "AntiTank"
  ]
 },
 {
  "name": "Dragão Infernal",
  "e": 4,
  "roles": [
   "antiAir",
   "tankKiller",
   "air"
  ],
  "targets": [
   "tank",
   "air"
  ],
  "vers": 8,
  "key": "inferno-dragon",
  "draftGroups": [
   "AntiAir",
   "AntiTank"
  ]
 },
 {
  "name": "Morcegos",
  "e": 2,
  "roles": [
   "antiAir",
   "swarm",
   "air"
  ],
  "targets": [
   "tank",
   "air"
  ],
  "vers": 7,
  "key": "bats",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Máquina Voadora",
  "e": 4,
  "roles": [
   "antiAir",
   "support",
   "air"
  ],
  "targets": [
   "air",
   "support"
  ],
  "vers": 7,
  "key": "flying-machine",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Arqueiro Mágico",
  "e": 4,
  "roles": [
   "antiAir",
   "support",
   "pressure"
  ],
  "targets": [
   "swarm",
   "support"
  ],
  "vers": 8,
  "key": "magic-archer",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Lançador",
  "e": 5,
  "roles": [
   "splash",
   "support"
  ],
  "targets": [
   "ground",
   "swarm"
  ],
  "vers": 7,
  "key": "bowler",
  "draftGroups": [
   "TankUnit"
  ]
 },
 {
  "name": "Goblins",
  "e": 2,
  "roles": [
   "swarm",
   "cycle"
  ],
  "targets": [
   "ground"
  ],
  "vers": 7,
  "key": "goblins",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Espírito Elétrico",
  "e": 1,
  "roles": [
   "cycle",
   "reset"
  ],
  "targets": [
   "swarm",
   "inferno"
  ],
  "vers": 8,
  "key": "electro-spirit",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Barril de Bárbaro",
  "e": 2,
  "roles": [
   "smallSpell",
   "ground"
  ],
  "targets": [
   "swarm",
   "bait"
  ],
  "vers": 8,
  "key": "barbarian-barrel",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Foguete",
  "e": 6,
  "roles": [
   "bigSpell"
  ],
  "targets": [
   "support",
   "building"
  ],
  "vers": 6,
  "key": "rocket",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Bárbaros",
  "e": 5,
  "roles": [
   "swarm",
   "tankKiller",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "barbarians",
  "draftGroups": [
   "AntiTank"
  ]
 },
 {
  "name": "Goblins Lanceiros",
  "e": 2,
  "roles": [
   "antiAir",
   "swarm",
   "cycle"
  ],
  "targets": [],
  "vers": 7,
  "key": "spear-goblins",
  "draftGroups": [
   "AntiAir",
   "Distractions"
  ]
 },
 {
  "name": "Esqueleto Gigante",
  "e": 6,
  "roles": [
   "tank",
   "splash",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "giant-skeleton",
  "draftGroups": [
   "TankUnit"
  ]
 },
 {
  "name": "Mago de Gelo",
  "e": 3,
  "roles": [
   "antiAir",
   "splash",
   "support",
   "control"
  ],
  "targets": [],
  "vers": 7,
  "key": "ice-wizard",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Princesa",
  "e": 3,
  "roles": [
   "antiAir",
   "splash",
   "bait",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "princess",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Três Mosqueteiras",
  "e": 9,
  "roles": [
   "wincon",
   "antiAir",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "three-musketeers",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Espírito de Fogo",
  "e": 1,
  "roles": [
   "cycle",
   "splash"
  ],
  "targets": [],
  "vers": 7,
  "key": "fire-spirit",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Sparky",
  "e": 6,
  "roles": [
   "tankKiller",
   "splash",
   "support",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "sparky",
  "draftGroups": [
   "AntiTank"
  ]
 },
 {
  "name": "Lenhador",
  "e": 4,
  "roles": [
   "tankKiller",
   "miniTank",
   "support",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "lumberjack",
  "draftGroups": [
   "AntiTank"
  ]
 },
 {
  "name": "Golem de Gelo",
  "e": 2,
  "roles": [
   "miniTank",
   "cycle",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "ice-golem",
  "draftGroups": [
   "TankUnit",
   "Distractions"
  ]
 },
 {
  "name": "Goblin com Dardo",
  "e": 3,
  "roles": [
   "antiAir",
   "support",
   "bait"
  ],
  "targets": [],
  "vers": 7,
  "key": "dart-goblin",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Bárbaros de Elite",
  "e": 6,
  "roles": [
   "tankKiller",
   "pressure",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "elite-barbarians",
  "draftGroups": [
   "AntiTank"
  ]
 },
 {
  "name": "Bandida",
  "e": 3,
  "roles": [
   "miniTank",
   "pressure",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "bandit",
  "draftGroups": [
   "MiniTank"
  ]
 },
 {
  "name": "Recrutas Reais",
  "e": 7,
  "roles": [
   "swarm",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "royal-recruits",
  "draftGroups": [
   "TankUnit"
  ]
 },
 {
  "name": "Bruxa Sombria",
  "e": 4,
  "roles": [
   "support",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "night-witch",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Domadora de Carneiro",
  "e": 5,
  "roles": [
   "wincon",
   "bridge",
   "control"
  ],
  "targets": [],
  "vers": 7,
  "key": "ram-rider",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Eletrocutadores",
  "e": 4,
  "roles": [
   "antiAir",
   "reset",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "zappies",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Patifes",
  "e": 5,
  "roles": [
   "miniTank",
   "antiAir",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "rascals",
  "draftGroups": [
   "TankUnit",
   "MiniTank",
   "AntiTank"
  ]
 },
 {
  "name": "Carrinho de Canhão",
  "e": 5,
  "roles": [
   "tankKiller",
   "pressure",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "cannon-cart",
  "draftGroups": [
   "MiniTank",
   "AntiTank"
  ]
 },
 {
  "name": "Megacavaleiro",
  "e": 7,
  "roles": [
   "tank",
   "splash",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "mega-knight",
  "draftGroups": [
   "TankUnit"
  ]
 },
 {
  "name": "Barril de Esqueletos",
  "e": 3,
  "roles": [
   "wincon",
   "air",
   "bait"
  ],
  "targets": [],
  "vers": 7,
  "key": "skeleton-barrel",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Destruidores de Muros",
  "e": 2,
  "roles": [
   "wincon",
   "pressure"
  ],
  "targets": [],
  "vers": 7,
  "key": "wall-breakers",
  "draftGroups": [
   "WinCons"
  ]
 },
 {
  "name": "Goblin Gigante",
  "e": 6,
  "roles": [
   "wincon",
   "tank"
  ],
  "targets": [],
  "vers": 7,
  "key": "goblin-giant",
  "draftGroups": [
   "TankUnit",
   "WinCons"
  ]
 },
 {
  "name": "Dragão Elétrico",
  "e": 5,
  "roles": [
   "antiAir",
   "air",
   "reset",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "electro-dragon",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Pirotécnica",
  "e": 3,
  "roles": [
   "antiAir",
   "splash",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "firecracker",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Mineiro Bombado",
  "e": 4,
  "roles": [
   "champion",
   "tankKiller",
   "miniTank",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "mighty-miner",
  "draftGroups": [
   "Champions"
  ]
 },
 {
  "name": "Golem de Elixir",
  "e": 3,
  "roles": [
   "wincon",
   "tank"
  ],
  "targets": [],
  "vers": 7,
  "key": "elixir-golem",
  "draftGroups": [
   "TankUnit",
   "WinCons"
  ]
 },
 {
  "name": "Curadora Guerreira",
  "e": 4,
  "roles": [
   "miniTank",
   "support",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "battle-healer",
  "draftGroups": [
   "MiniTank"
  ]
 },
 {
  "name": "Rei Esqueleto",
  "e": 4,
  "roles": [
   "champion",
   "miniTank",
   "splash",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "skeleton-king",
  "draftGroups": [
   "Champions"
  ]
 },
 {
  "name": "Rainha Arqueira",
  "e": 5,
  "roles": [
   "champion",
   "antiAir",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "archer-queen",
  "draftGroups": [
   "Champions"
  ]
 },
 {
  "name": "Cavaleiro Dourado",
  "e": 4,
  "roles": [
   "champion",
   "miniTank",
   "pressure",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "golden-knight",
  "draftGroups": [
   "Champions"
  ]
 },
 {
  "name": "Monge",
  "e": 5,
  "roles": [
   "champion",
   "miniTank",
   "control",
   "ground"
  ],
  "targets": [],
  "vers": 7,
  "key": "monk",
  "draftGroups": [
   "Champions"
  ]
 },
 {
  "name": "Dragões Esqueleto",
  "e": 4,
  "roles": [
   "antiAir",
   "air",
   "splash",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "skeleton-dragons",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Bruxa Mãe",
  "e": 4,
  "roles": [
   "antiAir",
   "support",
   "control"
  ],
  "targets": [],
  "vers": 7,
  "key": "mother-witch",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Gigante Elétrico",
  "e": 7,
  "roles": [
   "wincon",
   "tank"
  ],
  "targets": [],
  "vers": 7,
  "key": "electro-giant",
  "draftGroups": [
   "TankUnit"
  ]
 },
 {
  "name": "Fênix",
  "e": 4,
  "roles": [
   "antiAir",
   "air",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "phoenix",
  "draftGroups": [
   "AntiAir"
  ]
 },
 {
  "name": "Cabana de Goblins",
  "e": 5,
  "roles": [
   "building",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "goblin-hut",
  "draftGroups": [
   "Investment"
  ]
 },
 {
  "name": "Cabana de Bárbaros",
  "e": 6,
  "roles": [
   "building",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "barbarian-hut",
  "draftGroups": [
   "Investment"
  ]
 },
 {
  "name": "Coletor de Elixir",
  "e": 6,
  "roles": [
   "economy"
  ],
  "targets": [],
  "vers": 7,
  "key": "elixir-collector",
  "draftGroups": [
   "Investment"
  ]
 },
 {
  "name": "Lápide",
  "e": 3,
  "roles": [
   "building",
   "swarm"
  ],
  "targets": [],
  "vers": 7,
  "key": "tombstone",
  "draftGroups": [
   "Investment"
  ]
 },
 {
  "name": "Fornalha",
  "e": 4,
  "roles": [
   "building",
   "splash"
  ],
  "targets": [],
  "vers": 7,
  "key": "furnace",
  "draftGroups": [
   "Investment"
  ]
 },
 {
  "name": "Escavadeira de Goblins",
  "e": 4,
  "roles": [
   "wincon",
   "building"
  ],
  "targets": [],
  "vers": 7,
  "key": "goblin-drill",
  "draftGroups": [
   "TankUnit",
   "WinCons"
  ]
 },
 {
  "name": "Fúria",
  "e": 2,
  "roles": [
   "control"
  ],
  "targets": [],
  "vers": 7,
  "key": "rage",
  "draftGroups": [
   "DirectDamage"
  ]
 },
 {
  "name": "Gelo",
  "e": 4,
  "roles": [
   "control"
  ],
  "targets": [],
  "vers": 7,
  "key": "freeze",
  "draftGroups": [
   "2ndSpell"
  ]
 },
 {
  "name": "Terremoto",
  "e": 3,
  "roles": [
   "bigSpell"
  ],
  "targets": [],
  "vers": 7,
  "key": "earthquake",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Espírito Curador",
  "e": 1,
  "roles": [
   "cycle",
   "support"
  ],
  "targets": [],
  "vers": 7,
  "key": "heal-spirit",
  "draftGroups": [
   "Distractions"
  ]
 },
 {
  "name": "Bola de Neve",
  "e": 2,
  "roles": [
   "smallSpell",
   "control"
  ],
  "targets": [],
  "vers": 7,
  "key": "giant-snowball",
  "draftGroups": [
   "DirectDamage",
   "2ndSpell"
  ]
 },
 {
  "name": "Encomenda Real",
  "e": 3,
  "roles": [
   "smallSpell",
   "splash"
  ],
  "targets": [],
  "vers": 7,
  "key": "royal-delivery",
  "draftGroups": [
   "DirectDamage"
  ]
 }
];
const DRAFT_GROUPS = [
 {
  "key": "TankUnit",
  "label": "Tanques",
  "count": 4,
  "cards": [
   "rascals",
   "giant",
   "golem",
   "knight",
   "lava-hound",
   "ice-golem",
   "miner",
   "royal-giant",
   "valkyrie",
   "royal-recruits",
   "goblin-giant",
   "elixir-golem",
   "electro-giant",
   "goblin-drill",
   "giant-skeleton",
   "bowler",
   "mega-knight"
  ]
 },
 {
  "key": "AntiAir",
  "label": "Defesa aérea",
  "count": 4,
  "cards": [
   "archers",
   "executioner",
   "bats",
   "baby-dragon",
   "dart-goblin",
   "electro-wizard",
   "flying-machine",
   "hunter",
   "ice-wizard",
   "inferno-dragon",
   "magic-archer",
   "mega-minion",
   "minion-horde",
   "minions",
   "musketeer",
   "princess",
   "spear-goblins",
   "witch",
   "wizard",
   "zappies",
   "electro-dragon",
   "firecracker",
   "skeleton-dragons",
   "phoenix",
   "night-witch",
   "mother-witch"
  ]
 },
 {
  "key": "Distractions",
  "label": "Distrações",
  "count": 4,
  "cards": [
   "fire-spirit",
   "goblin-gang",
   "goblins",
   "ice-golem",
   "ice-spirit",
   "minions",
   "skeleton-army",
   "skeletons",
   "guards",
   "spear-goblins",
   "electro-spirit",
   "bomber",
   "heal-spirit"
  ]
 },
 {
  "key": "DirectDamage",
  "label": "Feitiços 1",
  "count": 4,
  "cards": [
   "arrows",
   "fireball",
   "lightning",
   "the-log",
   "poison",
   "rocket",
   "zap",
   "giant-snowball",
   "barbarian-barrel",
   "earthquake",
   "royal-delivery",
   "rage"
  ]
 },
 {
  "key": "WinCons",
  "label": "Ataque",
  "count": 6,
  "cards": [
   "graveyard",
   "giant",
   "balloon",
   "battle-ram",
   "hog-rider",
   "goblin-giant",
   "goblin-barrel",
   "miner",
   "royal-hogs",
   "royal-giant",
   "skeleton-barrel",
   "ram-rider",
   "wall-breakers",
   "elixir-golem",
   "goblin-drill",
   "three-musketeers"
  ]
 },
 {
  "key": "2ndSpell",
  "label": "Feitiços 2",
  "count": 2,
  "cards": [
   "arrows",
   "fireball",
   "lightning",
   "the-log",
   "poison",
   "rocket",
   "zap",
   "giant-snowball",
   "barbarian-barrel",
   "tornado",
   "earthquake",
   "freeze"
  ]
 },
 {
  "key": "MiniTank",
  "label": "Defensores",
  "count": 3,
  "cards": [
   "knight",
   "valkyrie",
   "mini-pekka",
   "miner",
   "dark-prince",
   "rascals",
   "prince",
   "cannon-cart",
   "goblin-cage",
   "fisherman",
   "battle-healer",
   "royal-ghost",
   "bandit"
  ]
 },
 {
  "key": "AntiTank",
  "label": "Antitanques",
  "count": 3,
  "cards": [
   "elite-barbarians",
   "cannon-cart",
   "barbarians",
   "bomb-tower",
   "cannon",
   "witch",
   "inferno-dragon",
   "inferno-tower",
   "mini-pekka",
   "tesla",
   "hunter",
   "rascals",
   "lumberjack",
   "pekka",
   "goblin-cage",
   "sparky"
  ]
 },
 {
  "key": "Champions",
  "label": "Campeões",
  "count": 3,
  "cards": [
   "golden-knight",
   "archer-queen",
   "skeleton-king",
   "mighty-miner",
   "monk"
  ]
 },
 {
  "key": "Investment",
  "label": "Construções",
  "count": 3,
  "cards": [
   "barbarian-hut",
   "elixir-collector",
   "furnace",
   "goblin-hut",
   "mortar",
   "tombstone",
   "x-bow",
   "goblin-cage"
  ]
 }
];
