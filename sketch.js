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
let pressed = false;
let starting_screen = true;
let current_wave = 1;
let wave_activated = true;
let cur_tower;
let rage_elapsed = 0;

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
let pos_enemies_money = [1, 3, 5, 7, 10];
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
let ice_tower;

// Shop Variables

function preload() {
  image_soul = loadImage("images/spirit.png");
  ice_tower = loadImage("images/ice.png");
  fire_tower = loadImage("images/fire.png");
  bomb_tower = loadImage("images/bomb.png");
  rage_tower = loadImage("images/rage.png");
  retro_font = loadFont("fonts/PressStart2P-Regular.ttf")
}

function setup() {
  createCanvas(800, 800);
  background(220);
  game = new Game(80, 80);
  game.matrix();
  base = new Base(500, 0, 500);
  cur_tower = new Tower(
    "magical",
    20,
    210,
    0,
    20,
    1,
    "none",
    0,
    0,
    0,
    "common",
    20,
    1,
    null
  );
  test_enem = new Distract(8, 10, 1, 0, 0, true, 50);
  current_enemies.push(test_enem);
  test_ice_tower = new Ice(
    "magical",
    5,
    210,
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
    ice_tower
  );
  test_fire_tower = new Flame(
    "magical",
    20,
    210,
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
    fire_tower
  );
  test_bomb_tower = new Bomb(
    "physical",
    20,
    210,
    40,
    20,
    1,
    "bomb",
    0,
    0,
    0,
    "common",
    20,
    1,
    bomb_tower
  );
  test_rage_tower = new Rage(
    "bane",
    10,
    510,
    0,
    20,
    1,
    "bomb",
    0,
    0,
    0,
    "common",
    20,
    1,
    rage_tower
  );
  available_towers.push(test_ice_tower);
  available_towers.push(test_ice_tower);
  available_towers.push(test_fire_tower);
  available_towers.push(test_fire_tower);
  available_towers.push(test_bomb_tower);
  available_towers.push(test_bomb_tower);
  available_towers.push(test_bomb_tower);
  available_towers.push(test_bomb_tower);
  available_towers.push(test_rage_tower);
  available_towers.push(test_rage_tower);


  // Path creation

  for(let i = 0;i<15;i++){
    game.env[30][i] = 1;
    lane1.push([30, i])
    game.env[31][i] = 1;
    lane2.push([31, i])
    game.env[32][i] = 1;
    lane3.push([32, i])
    game.env[33][i] = 1;
    lane4.push([33, i])
    game.env[34][i] = 1;
    lane5.push([34, i])

    game.env[10][i] = 1;
    lane1.push([10, i])
    game.env[11][i] = 1;
    lane2.push([11, i])
    game.env[12][i] = 1;
    lane3.push([12, i])
    game.env[13][i] = 1
    lane4.push([13, i])
    game.env[14][i] = 1
    lane5.push([14, i])

    game.env[20][i+5] = 1
    lane1.push([20, i+5])
    game.env[21][i+5] = 1
    lane2.push([21, i+5])
    game.env[22][i+5] = 1
    lane3.push([22, i+5])
    game.env[23][i+5] = 1
    lane4.push([23, i+5])
    game.env[24][i+5] = 1
    lane5.push([24, i+5])

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
  game.env[17][17] = 6;
  game.env[16][17] = 5;
  game.env[16][18] = 5;
  game.env[16][16] = 5;
  game.env[17][18] = 5;
  game.env[17][16] = 5;
  game.env[18][17] = 5;
  game.env[18][16] = 5;
  game.env[18][18] = 5;

  game.env[12][17] = 6;
  game.env[11][17] = 5;
  game.env[11][18] = 5;
  game.env[11][16] = 5;
  game.env[12][18] = 5;
  game.env[12][16] = 5;
  game.env[13][17] = 5;
  game.env[13][16] = 5;
  game.env[13][18] = 5;

  game.env[7][17] = 6;
  game.env[6][17] = 5;
  game.env[6][18] = 5;
  game.env[6][16] = 5;
  game.env[7][18] = 5;
  game.env[7][16] = 5;
  game.env[8][17] = 5;
  game.env[8][16] = 5;
  game.env[8][18] = 5;

  game.env[8][27] = 6;
  game.env[7][27] = 5;
  game.env[7][28] = 5;
  game.env[7][26] = 5;
  game.env[8][28] = 5;
  game.env[8][26] = 5;
  game.env[9][27] = 5;
  game.env[9][26] = 5;
  game.env[9][28] = 5;

  game.env[17][7] = 6;
  game.env[16][7] = 5;
  game.env[16][8] = 5;
  game.env[16][6] = 5;
  game.env[17][8] = 5;
  game.env[17][6] = 5;
  game.env[18][7] = 5;
  game.env[18][6] = 5;
  game.env[18][8] = 5;

  game.env[27][7] = 6;
  game.env[26][7] = 5;
  game.env[26][8] = 5;
  game.env[26][6] = 5;
  game.env[27][8] = 5;
  game.env[27][6] = 5;
  game.env[28][7] = 5;
  game.env[28][6] = 5;
  game.env[28][8] = 5;

  game.env[27][17] = 6;
  game.env[26][17] = 5;
  game.env[26][18] = 5;
  game.env[26][16] = 5;
  game.env[27][18] = 5;
  game.env[27][16] = 5;
  game.env[28][17] = 5;
  game.env[28][16] = 5;
  game.env[28][18] = 5;


  print(lane1[0])
  print(lane1[0][0])
}

function draw() {
  background(0);
  // In-between rounds

  if(starting_screen){
    push();
    textAlign(CENTER, CENTER)
    fill(203, 195, 227)
    textFont(retro_font)
    textSize(25)
    text("Click to start...", width/2, height/2)
    pop();

    if(mouseIsPressed && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= 800){
      starting_screen=false;
    }
    return;
  }
  if(wave_activated){
    WaveProgression(current_wave)
    current_enemies.push(lane1_enemies, lane2_enemies, lane3_enemies, lane4_enemies, lane5_enemies)
    wave_activated = false
  }
  
  
 

  game.show_matrix();
  // Controls how to place down towers (don't ask how long it took to implement this...)
  if(menu){
    for (let i = 0;i<tower_list.length;i++) {
    new_tower = tower_list[i]
    tower = new_tower[0].clone()
    tower.clearTint();
    let w = constrain(ceil(mouseX / 20), 0, 79);
    let h = constrain(ceil(mouseY / 20), 0, 79);
    if(dist(mouseX, mouseY, new_tower[0].x, new_tower[0].y) < 50 && mouseIsPressed){
      pressed = true
      cur_tower = tower
    }
    if (pressed && mouseIsPressed && cur_tower.constructor == tower.constructor && game.env[w][h] != 6) {
      tower.x = mouseX;
      tower.y = mouseY;   
      tower.display();
      
      
    }
    if ((game.env[w][h] == 6) && mouseIsPressed && cur_tower.constructor == tower.constructor) {
        tower.x = (w * width) / 40 - width / 80;
        tower.y = (h * width) / 40 - width / 40;
        tower.tintImageGreen();
        tower.display();
    }else if (game.env[w][h] == 6 && !mouseIsPressed && cur_tower.constructor == tower.constructor) {
      game.env[w][h] = 7
      game.show_matrix();
      tower.place();
      tower.clearTint();
      tower.x = (w * width) / 40 - width / 80;
      tower.y = (h * width) / 40 - width / 40;
      tower_list[i][1]-=1
      print(tower_list[i])
      if (tower_list[i][1] == 0){
        tower_list.splice(i, 1)
      }
      towers.push(tower);
      print("towers")
      print(towers);
      pressed = false;
    } else if(!mouseIsPressed){
      tower = null
    }
    } 
    if(tower){
      tower.display();
      tower.clearTint();
    }
      
  }
  
  // Analyzing towers by clicking on them when placed, shows range, etc.

  for (var placed_tower of towers) {
    let locked = true;
    // enemy_to_attack = detection(current_enemies,
    //   placed_tower.x,
    //   placed_tower.y,
    //   placed_tower.range
    // )
    // if(enemy_to_attack){
    //   placed_tower.attack(enemy_to_attack)
    // }

    if(placed_tower instanceof Rage){
      if(random(0, 1000) <= 1 && no_rage){
        placed_tower.rage()
      }
    }
    if (
      mouseIsPressed &&
      dist(mouseX, mouseY, placed_tower.x, placed_tower.y) < 20 &&
      locked
    ) {
      push();
      fill(0, 255, 0, .5);
      circle(placed_tower.x, placed_tower.y, placed_tower.range);
      locked = locked == true ? false : true;
      if(placed_tower.AOE>0){
        if(detection(current_enemies, placed_tower.x, placed_tower.y, placed_tower.range)){
          near = detection(current_enemies, placed_tower.x, placed_tower.y, placed_tower.range)
          circle(near.x, near.y, placed_tower.AOE)
        }else{
          circle(placed_tower.x + placed_tower.range/4,
      placed_tower.y- placed_tower.range/4, placed_tower.AOE)
      }
        }
        
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
        tower.damage *= 2
        tower.range *= 2
      }
      no_rage = false
    }else if(rage_elapsed <= 1000){
      push();
      fill("red")
      background(0);
      textSize(20);
      textFont(retro_font);
      textAlign(CENTER, CENTER)
      text("I MISS THE RAGE", width/2, height/2)
      pop();
    }else if (rage_elapsed >= 10000){
      for (var tower of towers){
        tower.damage /=2
        tower.range /=2
      }
      rage = false;
      no_rage=true;
    }
    rage_elapsed+=deltaTime
    print(rage_elapsed)
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
      const pos_slow = iced.map((inner) => inner[0]);
      if (pos_dead.includes(enem)) {
        flames.splice(flames.indexOf(enem), 1);
      }
      if(pos_slow.includes(enem)){
        iced.splice(iced.indexOf(enem), 1)
      }
      dead_enemies.push(enem);
    }

    if(enem instanceof Distract){
      if(random(0, 10000) < 1){
        enem.minigame()
      }
    }
    if(enem instanceof Necromancer){
      if(random(0, 10000) < 1){
        if(dead_enemies.length >1){
          enem.revive(dead_enemies)
        }
      }
    }
    if(enem instanceof Demon){

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
        enem.health += (enem.maxH-enem.health)/2
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
    this.xSpeed = direction * random(8, 14);
    this.radius = random(20, 50);
    this.direction = direction;
  }
  update() {
    push();
    noStroke();
    imageMode(CENTER);
    if(this.direction == -1){
      push();
      translate(this.x + this.radius, this.y + this.radius); 
      scale(-1, 1)
      image(image_soul, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
      pop();
    }else{
       image(image_soul, this.x, this.y, this.radius * 2, this.radius * 2);
    }
   
    this.x += this.xSpeed;
    pop();
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

function textbox(x, y, w, h, message){
  fill("black")
  rectMode(CENTER)
  noStroke()
  rect(x, y, w+50, h+50)
  stroke("black")
  rect(x, y, w+25, h+25)
  strokeWeight(0.75)
  textFont(pixelFont)
  textSize(11)
  textAlign(CENTER, CENTER)
  drawingContext.setLineDash([5, 15]);
  stroke("black")
  rect(x, y, w, h)
  drawingContext.setLineDash([]);
  fill("purple")
  //noStroke()
  text(message, x, y, w,h)
}

function placePortal(x, y, x1, y1) {
  portals.push([
    [x, y],
    [x1, y1],
  ]);
  game.env[x][y] = 2;
  game.env[x1][y1] = 3;
}

function destroyPortal(x, y, x1, y1) {
  for (let i = 0; i < portals.length; i++) {
    if (x == portals[i][0][0] && y == portals[i][0][0]) {
      portals.splice(portals.indexOf(portals[i]), 1);
      break;
    }
    game.env[x][y] = 0;
    game.env[x1][y1] = 0;
  }
}

class Enemy {
  constructor(health, damage, speed, x, y, visibility, maxH, lane=null, type) {
    this.health = health;
    this.damage = damage;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.type = type;
    this.visibility = visibility;
    this.maxH = maxH;
    this.lane = lane;
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
  constructor(health, damage, speed, x, y, visibility, maxH, lane=null, type = "demonic") {
    super(health, damage, speed, x, y, visibility, maxH, lane, type);
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
  constructor(health, damage, speed, x, y, visibility, maxH, lane=null, type = "angelic") {
    super(health, damage, speed, x, y, visibility, maxH, lane, type);
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
  constructor(health, damage, speed, x, y, visibility, maxH, lane=null,type = "magical") {
    super(health, damage, speed, x, y, visibility, maxH, lane, type);
  }
  attack(base) {
    super.attack(base);
  }

  revive(dead) {
    if (dead.length > 1) {
      revived = dead.splice(0, 2);
      dead.splice(0, 2);
      for (var enem of revived) {
        enem.health = 0.3 * enem.maxH;
        enem.maxH = 0.3 * enem.maxH;
        enem.damage = 0.3 * enem.damage;
        enem.type = "undead";
      }
    }
  }
}

class Distract extends Enemy {
  constructor(health, damage, speed, x, y, visibility, maxH, lane=null, type = "bane") {
    super(health, damage, speed, x, y, visibility, maxH, lane, type);
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
    lane,
    type = "physical"
  ) {
    super(health, damage, speed, x, y, visibility, maxH, lane=null, type);
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
      let enemy1;
      let enemy2;
      let enemy3;
      let enemy4;
      let enemy5;
      let enemy; 
      let enemys = 10
      let cur_enemy;
      for(let i =0;i<enemys;i++){
        lane_choice = random([1, 2, 3, 4, 5]);
        switch(lane_choice){
          case 1:
            enemy = new Demon(50, 10, 1, 0, 0, true, 50)
            lane1_enemies.push(enemy)
            enemy.lane = lane1
            break;
          case 2:
            enemy = new Demon(50, 10, 1, 0, 0, true, 50)
            lane2_enemies.push(enemy)
            enemy.lane = lane2
            break;
          case 3:
            enemy = new Demon(50, 10, 1, 0, 0, true, 50)
            lane3_enemies.push(enemy)
            enemy.lane = lane3
            break;
          case 4:
            enemy = new Demon(50, 10, 1, 0, 0, true, 50)
            lane4_enemies.push(enemy)
            enemy.lane = lane4
            break;
          case 5:
            enemy = new Demon(50, 10, 1, 0, 0, true, 50)
            lane5_enemies.push(enemy)
            enemy.lane = lane5
            break;
        }

      }
      break;
    case 2:
      enemys = 12;
      for(let i =0;i<enemys;i++){
        lane_choice = random([1, 2, 3, 4, 5]);
        switch(lane_choice){
          case 1:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            cur_enemy = random([enemy1, enemy2])
            cur_enemy.lane = lane1
            lane1_enemies.push(cur_enemy)
            break;
          case 2:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            cur_enemy = random([enemy1, enemy2])
            cur_enemy.lane = lane2
            lane2_enemies.push(cur_enemy)
            break;
          case 3:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            cur_enemy = random([enemy1, enemy2])
            cur_enemy.lane = lane3
            lane3_enemies.push(cur_enemy)
            break;
          case 4:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            cur_enemy = random([enemy1, enemy2])
            cur_enemy.lane = lane4
            lane4_enemies.push(cur_enemy)
            break;
          case 5:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            cur_enemy = random([enemy1, enemy2])
            cur_enemy.lane = lane5
            lane5_enemies.push(cur_enemy)
            break;
        }
      }
      break;

    case 3:
      enemys = 15;
      for(let i =0;i<enemys;i++){
        lane_choice = random([1, 2, 3, 4, 5]);
        switch(lane_choice){
          case 1:
            enemy1 = new Demon(70, 10, 1, 0, 0, true, 70)
            enemy2 = new Angel(40, 5, 1, 0, 0, true, 40)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)            
            cur_enemy = random([enemy1, enemy2, enemy3])
            cur_enemy.lane = lane1
            lane1_enemies.push(cur_enemy)
            break;
          case 2:
            enemy1 = new Demon(70, 10, 1, 0, 0, true, 70)
            enemy2 = new Angel(40, 5, 1, 0, 0, true, 40)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)
            cur_enemy = random([enemy1, enemy2, enemy3])
            cur_enemy.lane = lane2
            lane2_enemies.push(cur_enemy)
            break;
          case 3:
            enemy1 = new Demon(70, 10, 1, 0, 0, true, 70)
            enemy2 = new Angel(40, 5, 1, 0, 0, true, 40)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)
            cur_enemy = random([enemy1, enemy2, enemy3])
            cur_enemy.lane = lane3
            lane3_enemies.push(cur_enemy)
            break;
          case 4:
            enemy1 = new Demon(70, 10, 1, 0, 0, true, 70)
            enemy2 = new Angel(40, 5, 1, 0, 0, true, 40)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)
            cur_enemy = random([enemy1, enemy2, enemy3])
            cur_enemy.lane = lane4
            lane4_enemies.push(cur_enemy)
            break;
          case 5:
            enemy1 = new Demon(70, 10, 1, 0, 0, true, 70)
            enemy2 = new Angel(40, 5, 1, 0, 0, true, 40)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)
            cur_enemy = random([enemy1, enemy2, enemy3])
            cur_enemy.lane = lane5
            lane5_enemies.push(cur_enemy)
            break;
        }
      }
      break;

    case 4:
      enemys = 20;
      for(let i =0;i<enemys;i++){
        lane_choice = random([1, 2, 3, 4, 5]);
        switch(lane_choice){
          case 1:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)
            enemy4 = new Distract(50, 4, 1, 0, 0, true, 50)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4])
            cur_enemy.lane = lane1
            lane1_enemies.push(cur_enemy)
            break;
          case 2:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)
            enemy4 = new Distract(50, 4, 1, 0, 0, true, 50)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4])
            cur_enemy.lane = lane2
            lane2_enemies.push(cur_enemy)
            break;
          case 3:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)
            enemy4 = new Distract(50, 4, 1, 0, 0, true, 50)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4])
            cur_enemy.lane = lane3
            lane3_enemies.push(cur_enemy)
            break;
          case 4:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)
            enemy4 = new Distract(50, 4, 1, 0, 0, true, 50)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4])
            cur_enemy.lane = lane4
            lane4_enemies.push(cur_enemy)
            break;
          case 5:
            enemy1 = new Demon(60, 10, 1, 0, 0, true, 60)
            enemy2 = new Angel(30, 5, 1, 0, 0, true, 30)
            enemy3 = new Tyrant(100, 8, 1, 0, 0, true, 100)
            enemy4 = new Distract(50, 4, 1, 0, 0, true, 50)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4])
            cur_enemy.lane = lane5
            lane5_enemies.push(cur_enemy)
            break;
        }
      }
      break;

    case 5:
      enemys = 20;
      for(let i =0;i<enemys;i++){
        lane_choice = random([1, 2, 3, 4, 5]);
        switch(lane_choice){
          case 1:
            enemy1 = new Demon(90, 10, 1, 0, 0, true, 90)
            enemy2 = new Angel(60, 5, 1, 0, 0, true, 60)
            enemy3 = new Tyrant(150, 8, 1, 0, 0, true, 150)
            enemy4 = new Distract(80, 4, 1, 0, 0, true, 80)
            enemy5 = new Necromancer(200, 1, 1, 0, 0, true, 200)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4, enemy5])
            cur_enemy.lane = lane1
            lane1_enemies.push(cur_enemy)
            break;
          case 2:
            enemy1 = new Demon(90, 10, 1, 0, 0, true, 90)
            enemy2 = new Angel(60, 5, 1, 0, 0, true, 60)
            enemy3 = new Tyrant(150, 8, 1, 0, 0, true, 150)
            enemy4 = new Distract(80, 4, 1, 0, 0, true, 80)
            enemy5 = new Necromancer(200, 1, 1, 0, 0, true, 200)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4, enemy5])
            cur_enemy.lane = lane2
            lane2_enemies.push(cur_enemy)
            break;
          case 3:
            enemy1 = new Demon(90, 10, 1, 0, 0, true, 90)
            enemy2 = new Angel(60, 5, 1, 0, 0, true, 60)
            enemy3 = new Tyrant(150, 8, 1, 0, 0, true, 150)
            enemy4 = new Distract(80, 4, 1, 0, 0, true, 80)
            enemy5 = new Necromancer(200, 1, 1, 0, 0, true, 200)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4, enemy5])
            cur_enemy.lane = lane3
            lane3_enemies.push(cur_enemy)
            break;
          case 4:
            enemy1 = new Demon(90, 10, 1, 0, 0, true, 90)
            enemy2 = new Angel(60, 5, 1, 0, 0, true, 60)
            enemy3 = new Tyrant(150, 8, 1, 0, 0, true, 150)
            enemy4 = new Distract(80, 4, 1, 0, 0, true, 80)
            enemy5 = new Necromancer(200, 1, 1, 0, 0, true, 200)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4, enemy5])
            cur_enemy.lane = lane4
            lane4_enemies.push(cur_enemy)
            break;
          case 5:
            enemy1 = new Demon(90, 10, 1, 0, 0, true, 90)
            enemy2 = new Angel(60, 5, 1, 0, 0, true, 60)
            enemy3 = new Tyrant(150, 8, 1, 0, 0, true, 150)
            enemy4 = new Distract(80, 4, 1, 0, 0, true, 80)
            enemy5 = new Necromancer(200, 1, 1, 0, 0, true, 200)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4, enemy5])
            cur_enemy.lane = lane5
            lane5_enemies.push(cur_enemy)
            break;
        }
      }
      break;
  }
}

class Base {
  constructor(health, saveState, maxH, damage, x = 0, y=750) {
    this.health = health;
    this.saved = saveState;
    this.maxH = maxH;
    this.dmg = damage;
    this.x = x
    this.y = y
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


class Shop {
  constructor(inventory, special, anger, discount=1) {
    this.inventory = inventory;
    this.discount = discount;
    this.special = special;
    this.anger = anger;
  }

  steal() {
    let success = random(0, 1);
    if (success >= 0.6) {
      return true;
    } else {
      this.anger += 1;
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
    if (this.anger < 1) {
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
    tower_list[i][0].y = 100 + i * 200 
    tower_list[i][0].display();
    pop();

    push();
    fill("black")
    rectMode(CENTER)
    rect(tower_list[i][0].x,
       tower_list[i][0].y+70,
      20,
       20)
    fill("white")
    textAlign(CENTER, CENTER)
    textFont(retro_font)
    text(tower_list[i][1], tower_list[i][0].x,
       tower_list[i][0].y+70)
    pop();
  }
  
  
  pop();
}

// Towers

class Tower {
  constructor(
    type,
    damage,
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
    this.damage = damage;
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
    push()
    imageMode(CENTER);
    image(this.img, this.x, this.y, 90, 90);
    pop()
  }
  clearTint() {
    noTint();
  }
  attack(enemy, enemies=null) {
    if (this.AOE > 0) {
      for (var enem of enemies) {
        if (dist(enem.x, enem.y, enemy.x, enemy.y) < AOE) {
          enem.health -= this.damage * this.typing(enemy);
        }
      }
    }else{
      enemy.health -= this.damage * this.typing(enemy);
    }
  }
  
}

class Flame extends Tower {
  constructor(
    type,
    damage,
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
      damage,
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
    damage,
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
      damage,
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
    damage,
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
      damage,
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
    damage,
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
      damage,
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

function detection(enemies, x, y, range){
  let min_enemy_range = 1000
  let min_enemy = null
  for(var enemy of enemies){
    if(dist(x, y, enemy.x, enemy.y) < range && enemy.visibility){
      if(dist(x, y, enemy.x, enemy.y) < min_enemy_range){
        min_enemy_range = dist(x, y, enemy.x, enemy.y)
        min_enemy = enemy
      }
    }
  }
  return min_enemy
}

