// Tower Defense Variables
let money = 1;
let game;
let towers = [];
let base;
let locked_towers = [];
let available_towers = [];
let follow_mouse = false;
let menu = false;
let tower_list = [];

// Textbox Variables
let duration = 0;
let t_elapsed = 0;
let showText = false;
let input;

// Enemy Variables
let types = ["demonic", "physical", "bane", "magical", "angelic"];
let current_enemies = [];
let enemies = [];
const mapped_enemies = new Map();
let portals = [];
let dead_enemies = [];
let pos_enemies = [
  "Angel",
  "Distract",
  "Demon",
  "Necromancer",
  "Tyrant",
];
let pos_enemies_money = [1, 3, 3, 3, 5, 5, 7, 10];
let activated = true;

let lane1 = [];
let lane2 = [];
let lane3 = [];
let lane4 = [];
let lane5 = [];

let lane1_enemies = [];
let lane2_enemies = [];
let lane3_enemies = [];
let lane4_enemies = [];
let lane5_enemies = [];


// Special Status Effects Associated with Enemies and Towers

let slow_elapsed = 0;
let og_speed = [];
let iced = [];
let flames = [];
let flame_elapsed = 0;
let flame_time_interval = 1000;
let rage = false;
let no_rage = true;

// Minigame Variables
let souls = [];
let setTime = 400;
let timer = 400;
let lost = 0;
let lock = false;
let finished = false;
let score = 0;
let image_soul;
let test_enem;
let test_tower;

// Shop Variables

function preload() {
  image_soul = loadImage("temp_soul.webp");
  test_tower = loadImage("images/ice.png");
}

function setup() {
  createCanvas(800, 800);
  background(220);
  game = new Game(80, 80);
  game.matrix();
  base = new Base(500, 0, 500);
  test_enem = new Demon(8, 10, 1, 0, 0, true, 50);
  current_enemies.push(test_enem);
  test_ice_tower = new Ice(
    "magical",
    10,
    5,
    0,
    20,
    1,
    "ice",
    0,
    0,
    0,
    "common",
    20,
    1,
    test_tower
  );
  available_towers.push(test_ice_tower);
  available_towers.push(test_ice_tower);

  // Path creation

  for(let i = 0;i<15;i++){
    game.env[30][i] = 1;
    lane1.push(30, i)
    game.env[31][i] = 1;
    lane2.push(31, i)
    game.env[32][i] = 1;
    lane3.push(32, i)
    game.env[33][i] = 1;
    lane4.push(33, i)
    game.env[34][i] = 1;
    lane5.push(34, i)

    game.env[10][i] = 1;
    lane1.push(10, i)
    game.env[11][i] = 1;
    lane2.push(11, i)
    game.env[12][i] = 1;
    lane3.push(12, i)
    game.env[13][i] = 1
    lane4.push(13, i)
    game.env[14][i] = 1
    lane5.push(14, i)

    game.env[20][i+5] = 1
    lane1.push(20, i+5)
    game.env[21][i+5] = 1
    lane2.push(21, i+5)
    game.env[22][i+5] = 1
    lane3.push(22, i+5)
    game.env[23][i+5] = 1
    lane4.push(23, i+5)
    game.env[24][i+5] = 1
    lane5.push(24, i+5)

    game.env[20][i+10] = 1
    game.env[21][i+10] = 1
    game.env[22][i+10] = 1
    game.env[23][i+10] = 1
    game.env[24][i+10] = 1

    game.env[1][i+20] = 1
    game.env[2][i+20] = 1
    game.env[3][i+20] = 1
    game.env[4][i+20] = 1
    game.env[5][i+20] = 1
  }
  for(let j=30; j>=10;j--){
    game.env[j][14] = 1
    game.env[j][13] = 1
    game.env[j][12] = 1
    game.env[j][11] = 1
    game.env[j][10] = 1
  }
  for(let k=15; k<25;k++){
    game.env[k][0] = 1
    game.env[k][1] = 1
    game.env[k][2] = 1
    game.env[k][3] = 1
    game.env[k][4] = 1

    game.env[k][20] = 1
    game.env[k][21] = 1
    game.env[k][22] = 1
    game.env[k][23] = 1
    game.env[k][24] = 1

    game.env[k-5][20] = 1
    game.env[k-5][21] = 1
    game.env[k-5][22] = 1
    game.env[k-5][23] = 1
    game.env[k-5][24] = 1

    game.env[k-15][20] = 1
    game.env[k-15][21] = 1
    game.env[k-15][22] = 1
    game.env[k-15][23] = 1
    game.env[k-15][24] = 1



  }
}

function draw() {
  background(0);
  // In-between rounds
  game.env[20][20] = 6;
  game.env[19][20] = 5;
  game.env[19][21] = 5;
  game.env[19][19] = 5;
  game.env[20][21] = 5;
  game.env[20][19] = 5;
  game.env[21][20] = 5;
  game.env[21][19] = 5;
  game.env[21][21] = 5;
 

  game.show_matrix();

  if(menu){
    print(tower_list.length)
    for (let i = 0;i<tower_list.length;i++) {
    new_tower = tower_list[i]
    tower = new_tower[0].clone()
    tower.clearTint();
    let w = constrain(ceil(mouseX / 20), 0, 79);
    let h = constrain(ceil(mouseY / 20), 0, 79);
    if (mouseIsPressed) {
      tower.x = mouseX;
      tower.y = mouseY;
      tower.display()

      if ((game.env[h][w] == 6) && mouseIsPressed) {
        tower.x = (w * width) / 40 - width / 80;
        tower.y = (h * width) / 40 - width / 40;
        tower.tintImageGreen();
          
      }else if (game.env[h][w] == 6) {
      game.env[h][w] = 7
      game.show_matrix();
      tower.place();
      tower.clearTint();
      tower.x = (w * width) / 40 - width / 80;
      tower.y = (h * width) / 40 - width / 40;
      tower_list[i][1]-=.1
      print(tower_list[i])
      if (tower_list[i][1] == 0){
        tower_list.splice(i)
      }
      towers.push(tower);
      print("towers")
      print(towers);
    } else {
      tower = null
    }
    } 
    if(tower){
      tower.display();
      tower.clearTint();
    }
      
  }
  }
  
  // Analyzing towers by clicking on them when placed

  for (var placed_tower of towers) {
    let locked = true;
    if (
      mouseIsPressed &&
      dist(mouseX, mouseY, placed_tower.x, placed_tower.y) < 20 &&
      locked
    ) {
      push();
      fill(0, 255, 0, .5);
      circle(placed_tower.x, placed_tower.y, placed_tower.range * 30);
      locked = locked == true ? false : true;
      pop();
    } else if (
      mouseIsPressed &&
      dist(mouseX, mouseY, placed_tower.x, placed_tower.y) < 20
    ) {
      locked = locked == true ? false : true;
    }
    placed_tower.display();
  }

  if(rage){
    
    if(rage_elapsed < 10000 && no_rage){
      for (var tower of towers){
        tower.attack += 5
        tower.range +=5
      }
      no_rage = false
    }else if (rage_elapsed >= 10000){
      for (var tower of towers){
        tower.attack -= 5
        tower.range -=5
      }
      rage = false;
      no_rage=true;
    }
    rage_elapsed+=deltaTime
  }else{
    rage_elapsed = 0;
  }

  // Enemy Logic During Waves

  current_enemies.forEach((enem) => {
    if (enem.health <= 0) {
      activated = True
      money += pos_enemies_money[pos_enemies.indexOf(enem)];
      current_enemies.splice(enemies.indexOf(enem), 1);
      const pos_dead = flames.map((inner) => inner[0]);
      if (pos_dead.includes(enem)) {
        flames.splice(flames.indexOf(enem), 1);
      }
      dead_enemies.push(enem);
    }
  });

  if (millis() - flame_elapsed >= flame_time_interval) {
    for (let i = flames.length - 1; i >= 0; i--) {
      if (flames[i][1] < 5) {
        flames[i][0].health -= flames[i][0].maxH * 0.05;
        flames[i][1] += 1;
      } else {
        flames.splice(i, 1);
      }
    }
    flame_elapsed = millis();
  }
  if (millis() - slow_elapsed >= 1000) {
    for (let i = iced.length - 1; i >= 0; i--) {
      if (iced[i][1] < 5) {
        iced[i][0].speed = og_speed[i] * 0.5;
        iced[i][1] += 1;
      } else {
        iced[i][0].speed = og_speed[i];
        iced.splice(i, 1);
        og_speed.splice(i, 1);
      }
    }
    slow_elapsed = millis();
  }

  t_elapsed = millis() - duration;
  if (t_elapsed >= 2000) {
    duration = millis();
  }else{
    if(showText){
      textbox()
    }
  }
  
  
  if(menu){
    for(let i = 0;i<200;i++){
      setTimeout(menuCreation(i), 500)
      
    }
    circle(720, height/2, 30)
    if (dist(mouseX, mouseY, 720, height/2) < 10 && mouseIsPressed){
      menu = false;
  }
  }else{
    showMenu(mouseX, mouseY)
  }
  if (lock) {
    background(0);
    minigame();
    if (finished && lost < 1) {
      lock = false;
      finished = false;
      souls = [];
      lost = 0;
      score = 0;
      timer = 400;
      print("won");
    } else if (lost >= 1) {
      current_enemies.forEach((enem) => {
        enem.speed *= 2;
        enem.damage *= 2;
      });
      lock = false;
      finished = false;
      souls = [];
      lost = 0;
      score = 0;
      timer = 400;
      print("lost");
    }
  }
}

class Soul {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.xSpeed = direction * random(5, 12);
    this.radius = random(20, 30);
    this.direction = direction;
  }
  update() {
    noStroke();
    imageMode(CENTER);
    image(image_soul, this.x, this.y, this.radius * 2, this.radius * 2);
    this.x += this.xSpeed;
  }
  checkPop() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.radius * 2) {
      return true;
    } else {
      return false;
    }
  }
}

function minigame() {
  if (timer <= 0) {
    timer = setTime;
    let direction = random([-1, 1]);
    let x = direction == 1 ? -30 : width + 30;
    souls.push(new Soul(x, random(50, 350), direction));
  } else {
    timer -= deltaTime;
  }
  for (let i = 0; i < souls.length; i++) {
    souls[i].update();
    if (
      (souls[i].x > width + 30 && souls[i].direction == 1) ||
      (souls[i].x < -30 && souls[i].direction == -1)
    ) {
      lost += 1;
      souls.splice(i, 1);
    }
  }
}

function textBox(texts, x, y, w, h) {
  textAlign(CENTER, CENTER);
  {
    push();
    fill(0);
    stroke("purple");
    strokeWeight(5);
    rect(x, y, w, h);
    fill("purple");
    text(texts, x, y, w, h);
    pop();
  }
}

function placePortal(x, y, x1, y1) {
  portals.push([
    [x, y],
    [x1, y1],
  ]);
  game.env[y][x] = 2;
  game.env[y1][x1] = 3;
}

function destroyPortal(x, y, x1, y1) {
  for (let i = 0; i < portals.length; i++) {
    if (x == portals[i][0][0] && y == portals[i][0][0]) {
      portals.splice(portals.indexOf(portals[i]), 1);
      break;
    }
    game.env[y][x] = 0;
    game.env[y1][x1] = 0;
  }
}

class Enemy {
  constructor(health, damage, speed, x, y, visibility, maxH, type) {
    this.health = health;
    this.damage = damage;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.type = type;
    this.visibility = visibility;
    this.maxH = maxH;
  }
  attack(base) {
    base.health -= this.damage;
  }

  walk(pathway) {
    if (dist(x, y, path.x_boundary, path.y_boundary) < this.speed) {
    }
  }
}

class Demon extends Enemy {
  constructor(health, damage, speed, x, y, visibility, maxH, type = "demonic") {
    super(health, damage, speed, x, y, visibility, maxH, type);
  }
  attack(base) {
    super.attack(base);
  }

  portal(x, y, x1, y2) {
    if (this.health <= 0) {
      destroyPortals(x, y, x1, y2);
    } else {
      placePortal(x, y, x1, y2);
    }
  }
}



class Angel extends Enemy {
  constructor(health, damage, speed, x, y, visibility, maxH, type = "angelic") {
    super(health, damage, speed, x, y, visibility, maxH, type);
  }
  attack(base) {
    super.attack(base);
  }

  restrict() {
    if (
      locked_towers.length < 2 &&
      locked_towers.length < (1 / 4) * towers.length &&
      towers.length != 1
    ) {
      let locked = random(towers);
      towers.splice(locked.indexOf(locked), 1);
      locked_towers.push(locked);
    }
  }
}

class Necromancer extends Enemy {
  constructor(health, damage, speed, x, y, visibility, maxH, type = "magical") {
    super(health, damage, speed, x, y, visibility, maxH, type);
  }
  attack(base) {
    super.attack(base);
  }

  revive(dead) {
    if (dead.length > 1) {
      revived = dead.splice(0, 2);
      dead.splice(0, 2);
      for (var enem of revive) {
        enem.health = 0.3 * enem.maxH;
        enem.maxH = 0.3 * enem.maxH;
        enem.damage = 0.3 * enem.damage;
        enem.type = "undead";
      }
    }
  }
}

class Distract extends Enemy {
  constructor(health, damage, speed, x, y, visibility, maxH, type = "bane") {
    super(health, damage, speed, x, y, visibility, maxH, type);
  }
  attack(base) {
    super.attack(base);
  }

  minigame() {
    lock = true;
  }
}

class Tyrant extends Enemy {
  constructor(
    health,
    damage,
    speed,
    x,
    y,
    visibility,
    maxH,
    type = "physical"
  ) {
    super(health, damage, speed, x, y, visibility, maxH, type);
  }
  attack(base) {
    super.attack(base);
  }

  taunt(enemies) {
    for (var enemy of enemies) {
      if (dist(enemy.x, enemy.y, this.x, this.y) < 20) {
        enemy.visibility = false;
      }
    }
  }
}


// Shops and in-between waves

class Game {
  constructor(w, h) {
    this.wid = w;
    this.hght = h;
    this.env = [];
  }
  matrix() {
    for (let i = 0; i < this.hght; i++) {
      this.env.push([]);
      for (let j = 0; j < this.wid; j++) {
        this.env[i][j] = 0;
        square((i * width) / 40, (j * width) / 40, width / 40);
      }
    }
  }
  show_matrix() {
    for (let i = 0; i < this.hght; i++) {
      for (let j = 0; j < this.wid; j++) {
        fill(this.env[i][j] == 0 ? "white" : "red");
        rectMode(CENTER);
        square(
          (i * height) / 40 - height / 80,
          (j * width) / 40 - width / 80,
          width / 40
        );
      }
    }
  }
}

class Wave {
  constructor(enemies, difficulty) {
    this.enemies = enemies;
    this.diff = difficulty;
    this.wave;
  }
  chooseEnemies(wave) {
    WaveProgression(wave)
  }
}

function WaveProgression(wave) {
  switch (wave) {
    case 1:
      let enemy = Demon(50, 10, 1, 0, 0, true, 50)
      let enemys = 10
      for(let i =0;i<enemys;i++){
        lane_choice = random([1, 2, 3, 4, 5]);
        switch(lane_choice){
          case 1:
            lane1_enemies.push()
          case 2:
            lane2_enemies.push(enemy)
          case 3:
            lane3.enemies.push(enemy)
          case 4:
            lane4.enemies.push(enemy)
          case 5:
            lane5.enemies.push(enemy)
        }

        
      }
    case 2:
      let enemy1 = Demon(60, 10, 1, 0, 0, true, 50)
      let enemy2 = Angel(30, 5, 1, 0, 0, true, 30)
      enemys = 12;
      for(let i =0;i<enemys;i++){
        lane_choice = random([1, 2, 3, 4, 5]);
        switch(lane_choice){
          case 1:
            lane1_enemies.push(random([enemy1, enemy2]))
          case 2:
            lane2_enemies.push(random([enemy1, enemy2]))
          case 3:
            lane3.enemies.push(random([enemy1, enemy2]))
          case 4:
            lane4.enemies.push(random([enemy1, enemy2]))
          case 5:
            lane5.enemies.push(random([enemy1, enemy2]))
        }
      }

    case 3:
      enemy1 = Demon(60, 10, 1, 0, 0, true, 50)
      enemy2 = Angel(30, 5, 1, 0, 0, true, 30)
      let enemy3 = Tyrant(100, 8, 1, 0, 0, true, 100)
      enemys = 15;
      for(let i =0;i<enemys;i++){
        lane_choice = random([1, 2, 3, 4, 5]);
        switch(lane_choice){
          case 1:
            lane1_enemies.push(random([enemy1, enemy2, enemy3]))
          case 2:
            lane2_enemies.push(random([enemy1, enemy2, enemy3]))
          case 3:
            lane3.enemies.push(random([enemy1, enemy2, enemy3]))
          case 4:
            lane4.enemies.push(random([enemy1, enemy2, enemy3]))
          case 5:
            lane5.enemies.push(random([enemy1, enemy2, enemy3]))
        }
      }

    case 4:

    case 5:

  }
}

class Base {
  constructor(health, saveState, maxH, damage) {
    this.health = health;
    this.saved = saveState;
    this.maxH = maxH;
    this.dmg = damage;
  }
  detect(enemy) {
    if (dist(enemy.x, enemy.y, this.x, this.y) < 3 && enemy.visibility) {
      return true;
    } else {
      return false;
    }
  }
  attack(enemy) {
    if (this.detect(enemy)) {
      enemy.health -= this.dmg;
    }
  }
}

class Menu {
  constructor(towers){
    this.towers = towers
  }
}

class Shop {
  constructor(inventory, discount, special, anger) {
    this.inventory = inventory;
    this.discount = discount;
    this.special = special;
    this.anger = anger;
  }

  steal(item) {
    let success = random(0, 1);
    if (sucess >= 0.6) {
      return true;
    } else {
      anger += 1;
      return false;
    }
  }
  search_inventory() {
    for (var product of this.inventory) {
      if (product.rarity == "Legendary") {
        product.stock = random(0, 1) <= 0.1 ? 1 : 0;
      } else if (product.rarity == "Epic") {
        product.stock = random(0, 1) <= 0.2 ? random([1, 2]) : 0;
      } else if (product.rarity == "Rare") {
        product.stock = random(0, 1) <= 0.5 ? random([1, 2]) : 0;
      } else {
        product.stock = random([1, 2, 3, 4]);
      }
    }
  }
  open_shop() {
    if (anger < 1) {
      return true;
    } else {
      return false;
    }
  }
  sale() {
    for (var product of this.inventory) {
      product.price -= this.discount * product_price;
    }
  }

  purchase(product) {
    if (product.buy() && product.stock > 0) {
      money -= product.price;
      product.stock -= 1;
    } else {
      if (ask_steal()) {
        if (random(0, 1) >= 0.8) {
          product.stock -= 1;
        } else {
          this.anger += 1;
        }
      }
    }
  }
}

function showMenu(x, y){
  circle(770, height/2, 30)
  if (dist(x, y, 770, height/2) < 10 && mouseIsPressed){
    menu = true;
  }
  

}

function menuCreation(i){
  push();
  fill(150, 75, 0)
  rectMode(CENTER);
  square(1300-i, height/2, 800);

  for(let i =0; i<available_towers.length; i++){
    print("available_towers")
    print(available_towers.length)
    tower = available_towers[i]
    let tower_type = tower.constructor
    const existing = tower_list.findIndex(item=> {
      return item[0] instanceof tower_type
    });
    if(existing !== -1){
      tower_list[existing][1]+=1
    }else{
      tower_list.push([tower, 1])

    }
  }
  available_towers = [];
  
  for(let i =0; i<tower_list.length;i++){
    push();
    fill("green")
    tower_list[i][0].x = 750
    tower_list[i][0].y = 100 + i * 150 
    tower_list[i][0].display();
    text(tower_list[i][1], 750, 150+i*150);
    pop();
  }
  
  
  pop();
}

// Towers

class Tower {
  constructor(
    type,
    attack,
    range,
    AOE,
    price,
    cooldown,
    special,
    x,
    y,
    level,
    rarity,
    ogPrice,
    stock,
    img
  ) {
    this.type = type;
    this.attack = attack;
    this.range = range;
    this.AOE = AOE;
    this.price = price;
    this.cd = cooldown;
    this.special = special;
    this.x = x;
    this.y = y;
    this.level = level;
    this.rarity = rarity;
    this.og = ogPrice;
    this.stock = stock;
    this.img = img;
  }
  buy(money) {
    if (money >= this.price) {
      return true;
    }
  }
  detect(enemy) {
    if (
      dist(enemy.x, enemy.y, this.x, this.y) < this.range &&
      enemy.visibility
    ) {
      return true;
    } else {
      return false;
    }
  }

  place(x, y) {
    this.x = x;
    this.y = y;
  }
  typing(enemy) {
    if (enemy.type == this.type) {
      return 0.8;
    } else if (enemy.type == "angelic" && this.type == "demonic") {
      return 0.5;
    } else if (enemy.type == "demonic" && this.type == "angelic") {
      return 1.5;
    } else if (enemy.type == types[types.indexOf(this.type) + 1]) {
      return 1.5;
    } else if (this.type == types[type.indexOf(enemy.type) + 1]) {
      return 0.5;
    } else {
      return 1;
    }
  }

  tintImageGreen() {
    tint("green");
  }
  display() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, 60, 60);
  }
  clearTint() {
    noTint();
  }
  attack(enemy, enemies) {
    enemy.health -= this.attack * this.typing(enemy);
    if (this.AOE > 0) {
      for (var enem of enemies) {
        if (dist(enem.x, enem.y, enemy.x, enemy.y) < AOE) {
          enem.health -= this.attack * this.typing(enemy);
        }
      }
    }
  }
  
}

class Flame extends Tower {
  constructor(
    type,
    attack,
    range,
    AOE,
    price,
    cooldown,
    special,
    x,
    y,
    level,
    rarity,
    ogPrice,
    stock,
    img
  ) {
    super(
      type,
      attack,
      range,
      AOE,
      price,
      cooldown,
      special,
      x,
      y,
      level,
      rarity,
      ogPrice,
      stock,
      img
    );
  }

  buy(money) {
    super.buy(money);
  }

  detect(enemy) {
    super.detect(enemy);
  }

  typing(enemy) {
    super.typing(enemy);
  }

  place(x, y) {
    this.x = x;
    this.y = y;
  }

  tintImageGreen() {
    tint("green");
  }
  clearTint() {
    noTint();
  }

  attack(enemy, enemies) {
    flame(enemy);
    super.attack(enemy, enemies);
  }
  clone(){
    const new_tower = new Flame(this.type,this.attack, this.range,
      this.AOE,this.price,this.cooldown,this.special,this.x,this.y,this.level,
      this.rarity,this.ogPrice,this.stock,this.img
    )
    return new_tower
  }
}

class Ice extends Tower {
  constructor(
    type,
    attack,
    range,
    AOE,
    price,
    cooldown,
    special,
    x,
    y,
    level,
    rarity,
    ogPrice,
    stock,
    img
  ) {
    super(
      type,
      attack,
      range,
      AOE,
      price,
      cooldown,
      special,
      x,
      y,
      level,
      rarity,
      ogPrice,
      stock,
      img
    );
  }

  buy(money) {
    super.buy(money);
  }

  detect(enemy) {
    super.detect(enemy);
  }

  typing(enemy) {
    super.typing(enemy);
  }

  tintImageGreen() {
    tint("green");
  }
  clearTint() {
    noTint();
  }

  attack(enemy, enemies) {
    slow(enemy);
    super.attack(enemy, enemies);
  }
  clone(){
    const new_tower = new Ice(this.type,this.attack, this.range,
      this.AOE,this.price,this.cooldown,this.special,this.x,this.y,this.level,
      this.rarity,this.ogPrice,this.stock,this.img
    )
    return new_tower
  }
}

class Rage extends Tower {
  constructor(
    type,
    attack,
    range,
    AOE,
    price,
    cooldown,
    special,
    x,
    y,
    level,
    rarity,
    ogPrice,
    stock,
    img
  ) {
    super(
      type,
      attack,
      range,
      AOE,
      price,
      cooldown,
      special,
      x,
      y,
      level,
      rarity,
      ogPrice,
      stock,
      img
    );
  }

  buy(money) {
    super.buy(money);
  }

  detect(enemy) {
    super.detect(enemy);
  }

  typing(enemy) {
    super.typing(enemy);
  }

  tintImageGreen() {
    tint("green");
  }
  clearTint() {
    noTint();
  }

  attack(enemy, enemies) {
    super.attack(enemy, enemies);
  }
  rage(){
    rage=true
  }
  clone(){
    const new_tower = new Rage(this.type,this.attack, this.range,
      this.AOE,this.price,this.cooldown,this.special,this.x,this.y,this.level,
      this.rarity,this.ogPrice,this.stock,this.img
    )
    return new_tower
  }
}

class Bomb extends Tower {
  constructor(
    type,
    attack,
    range,
    AOE,
    price,
    cooldown,
    special,
    x,
    y,
    level,
    rarity,
    ogPrice,
    stock,
    img
  ) {
    super(
      type,
      attack,
      range,
      AOE,
      price,
      cooldown,
      special,
      x,
      y,
      level,
      rarity,
      ogPrice,
      stock,
      img
    );
  }

  buy(money) {
    super.buy(money);
  }

  detect(enemy) {
    super.detect(enemy);
  }

  typing(enemy) {
    super.typing(enemy);
  }

  tintImageGreen() {
    tint("green");
  }
  clearTint() {
    noTint();
  }

  attack(enemy, enemies) {
    super.attack(enemy, enemies);
  }
  clone(){
    const new_tower = new Bomb(this.type,this.attack, this.range,
      this.AOE,this.price,this.cooldown,this.special,this.x,this.y,this.level,
      this.rarity,this.ogPrice,this.stock,this.img
    )
    return new_tower
  }
}



function flame(enemy) {
  for (var flame of flames) {
    if (flame[0] == enemy) {
      flame[1] = 0;
      return;
    }
  }
  flames.push([enemy, 0]);
}

function slow(enemy) {
  for (var ice of iced) {
    if (ice[0] == enemy) {
      ice[1] = 0;
      return;
    }
  }
  iced.push([enemy, 0]);
  og_speed.push(enemy.speed);
}



function mousePressed() {
  if (lock) {
    for (let i = 0; i < souls.length; i++) {
      if (souls[i].checkPop()) {
        souls.splice(i, 1);
        score += 1;
      }
    }
    if (score >= 3) {
      finished = true;
    }
  }
}

