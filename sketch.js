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
let current_wave = 0;
let wave_activated = true;
let cur_tower;
let rage_elapsed = 0;
let action_time_elapsed = 0;
let slowed_screen = false;
let slowed_screen_elapsed = 0;

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
let angel_lock = false;
let locked_angel_towers = [];
let angel_elapsed = 0;

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

let enemy1;
let enemy2;
let enemy3;
let enemy4;
let enemy5;
let enemy; 
let enemys;
let cur_enemy;


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

// Images
let ice_tower;
let fire_tower;
let rage_tower;
let retro_font;

let demon_img;
let portal_img;
let angel_img;
let chain_img;
let tyrant_img;
let distract_img;
let necro_img;
let huge_portal;

let test_ice_tower;
let test_fire_tower;
let test_rage_tower;
let test_bomb_tower;



// Shop Variables

function preload() {
  // towers and minigames
  image_soul = loadImage("images/spirit.png");
  ice_tower = loadImage("images/ice.png");
  fire_tower = loadImage("images/fire.png");
  bomb_tower = loadImage("images/bomb.png");
  rage_tower = loadImage("images/rage.png");
  retro_font = loadFont("fonts/PressStart2P-Regular.ttf")

  // enemies
  demon_img = loadImage("images/demon.png");
  portal_img = loadImage("images/portal.png");
  angel_img = loadImage("images/angel.png");
  chain_img = loadImage("images/chain.png");
  tyrant_img = loadImage("images/tyrant.png");
  distract_img = loadImage("images/distract.png");
  necro_img = loadImage("images/necro.png");
  huge_portal = loadImage("images/huge_portal.png")
  base_img = loadImage("images/base.png")
  background_img = loadImage("images/background.png")
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
  test_ice_tower = new Ice(
    "magical",
    2,
    310,
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
    3,
    310,
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
    5,
    250,
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
    3,
    410,
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

  // Path creation

  for(let i = 0;i<5;i++){
    lane1.push([0, 0])
    lane2.push([0, 0])
    lane3.push([0, 0])
    lane4.push([0, 0])
    lane5.push([0, 0])
  }

  
  for(let i = 1; i<41;i++){
    game.env[i][3] = 1;
    lane1.push([i, 3])
    game.env[i][4] = 1;
    lane2.push([i, 4])
    game.env[i][5] = 1;
    lane3.push([i, 5])
    game.env[i][6] = 1;
    lane4.push([i, 6])
    game.env[i][7] = 1;
    lane5.push([i, 7])

  }

  for(let i = 40; i>=0;i--){
    game.env[i][13] = 1;
    lane1.push([i, 13])
    game.env[i][14] = 1;
    lane2.push([i, 14])
    game.env[i][15] = 1;
    lane3.push([i, 15])
    game.env[i][16] = 1;
    lane4.push([i, 16])
    game.env[i][17] = 1;
    lane5.push([i, 17])

  }

   for(let i = 1; i<41;i++){
    game.env[i][23] = 1;
    lane1.push([i, 23])
    game.env[i][24] = 1;
    lane2.push([i, 24])
    game.env[i][25] = 1;
    lane3.push([i, 25])
    game.env[i][26] = 1;
    lane4.push([i, 26])
    game.env[i][27] = 1;
    lane5.push([i, 27])

  }

  for(let i = 40; i>=0;i--){
    game.env[i][33] = 1;
    lane1.push([i, 33])
    game.env[i][34] = 1;
    lane2.push([i, 34])
    game.env[i][35] = 1;
    lane3.push([i, 35])
    game.env[i][36] = 1;
    lane4.push([i, 36])
    game.env[i][37] = 1;
    lane5.push([i, 37])

  }
  
  for(let i = 10; i<40;i+=10){
    
    game.env[11][i] =6;
    game.env[16][i] = 6;
    game.env[21][i] = 6;
    game.env[26][i] = 6;
    game.env[31][i] = 6;

  }


}

function draw() {
  background(background_img);
  push();
  imageMode(CENTER);
  image(huge_portal, 780, 90, 100, 100)
  image(huge_portal, 20, 290, 100, 100)
  image(huge_portal, 780, 490, 100, 100)

  pop();
  // In-between rounds

  if(starting_screen){
    push();
    background(0)
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
    wave_activated = false
    lane1_enemies = [];
    lane2_enemies = [];
    lane3_enemies = [];
    lane4_enemies = [];
    lane5_enemies = [];
    portals = [];
    towers = [];
    tower_list = [];
    available_towers = [];
    let towers_to_push = 2 + current_wave*2;
    for(let i = 0;i<towers_to_push;i++){
      available_towers.push(random([test_fire_tower, test_ice_tower, test_rage_tower, test_bomb_tower]))
    }
    WaveProgression(current_wave)
    current_enemies = [...current_enemies, ...lane1_enemies, ...lane2_enemies, ...lane3_enemies, ...lane4_enemies, ...lane5_enemies]
    for(var enemy of current_enemies){
      enemy.position = random([0, 1, 2, 3, 4, 5])
    }
  }
  
  
 

  
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
      game.env[w][h] = 6 
      game.show_matrix();
      tower.place();
      tower.clearTint();
      tower.x = (w * width) / 40 - width / 80;
      tower.y = (h * width) / 40 - width / 40;
      tower_list[i][1]-=1
  
      if (tower_list[i][1] == 0){
        tower_list.splice(i, 1)
      }
      towers.push(tower);

      pressed = false;
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

    if(placed_tower instanceof Rage){
      if(random(0, 4000) <= 1 && no_rage && !angel_lock){
        placed_tower.rage()
      }
    }

    
    if (
      mouseIsPressed &&
      dist(mouseX, mouseY, placed_tower.x, placed_tower.y) < 20 &&
      locked
    ) {
      push();
      fill(255, 0, 0, 50);
      circle(placed_tower.x, placed_tower.y, placed_tower.range);
      locked = locked == true ? false : true;
      if(placed_tower.AOE>0){
        if(detection(current_enemies, placed_tower.x, placed_tower.y, placed_tower.range/2)){
          near = detection(current_enemies, placed_tower.x, placed_tower.y, placed_tower.range/2)
          circle(near.lane[near.position][0]*20, near.lane[near.position][1]*20, placed_tower.AOE)
        }else{
          fill(0, 0, 0, 100);
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

  // Enemy Logic During Waves

  current_enemies.forEach((enem) => {

    if (enem.health <= 0) {
      activated = true
      if(enem instanceof Demon){
        if(enem.active_portal!=null){
          destroyPortal(enem.active_portal[0], enem.active_portal[1])
        }
      }
      money += pos_enemies_money[pos_enemies.indexOf(enem)];
      current_enemies.splice(current_enemies.indexOf(enem), 1);
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

    let x_cur = enem.lane[enem.position][0]
    let y_cur = enem.lane[enem.position][1]
    if(enem.position > 4){
      enem.display(x_cur, y_cur)
    }
    

    if(enem instanceof Distract){
      if(random(0, 2000) < 1){
        enem.minigame()
      }
    }
    if(enem instanceof Necromancer){
      if(random(0, 5000) < 1){
        if(dead_enemies.length >1){
          enem.revive(dead_enemies)
        }
      }
    }
    if(enem instanceof Demon && enem.position > 4){
      if (random(0, 3000) <= 1 && enem.active_portal == null){
        enem.portal(enem.lane[enem.position][0], enem.lane[enem.position][1])
        enem.active_portal = [enem.lane[enem.position][0], enem.lane[enem.position][1]]
        print("Portals")
        print(portals)
        print("Initialized active portal")
        print(enem.active_portal)
      }
    }
    if(enem instanceof Tyrant){
      enem.taunt(current_enemies)
    }
    if(enem instanceof Angel){
      if(random(0,2000) <= 1 && !rage){
        let restricted_tower = enem.restrict();
        if(restricted_tower){
          angel_lock = true;
          locked_angel_towers.push([restricted_tower, 0, 0])
        }
        
      }
    }
  });

  if(angel_lock){
    if(angel_elapsed >=1000){
      for(let i = 0; i<locked_angel_towers.length;i++){
        locked = locked_angel_towers[i]
        if(locked[2]==0){
          locked[1] = locked[0].range
          locked[0].range = 0
        }
        locked[2]+=1
        if(locked[2] >= 5){
          locked[0].range = locked[1]
          locked_angel_towers.splice(i, 1)
        }
      }
      angel_elapsed = 0
    }else{
        angel_elapsed+=deltaTime
        
          
      }
    for(let i = 0; i<locked_angel_towers.length;i++){
          locked = locked_angel_towers[i]
          push()
          imageMode(CENTER)
          image(chain_img, locked[0].x, locked[0].y, 120, 120)
          // fill(0)
          // circle(locked.x, locked.y, 120)
          pop()
        }
    
    if(locked_angel_towers.length == 0){
      angel_lock = false;
    }
  }
  

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
        iced[i][0].speed =0;
        iced[i][0].health-=1
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
  
  
  

  // Enemy Logic and Tower Logic happening every second (actual walking etc)
  
  if(action_time_elapsed >=1000){
    for(var enemy of current_enemies){
      base.attack(enemy)
      if(enemy.position >= enemy.lane.length-9-enemy.speed){
        enemy.attack(base)
        x = enemy.lane[enemy.position][0]
        y = enemy.lane[enemy.position][1]
        if(enemy.position>4){
          enemy.display(x, y)
        }
      }else{
        x_pos = enemy.lane[enemy.position][0]
        y_pos = enemy.lane[enemy.position][1]
        if(game.env[x_pos][y_pos]==2){
          enemy.position += constrain(enemy.lane.length-10 - enemy.position, 0, 10)
        }else{
          enemy.position += enemy.speed
          enemy.position = constrain(0, enemy.position, enemy.lane.length-10 - enemy.position)
        }
        x = enemy.lane[enemy.position][0]
        y = enemy.lane[enemy.position][1]
        
        if(enemy.position>4){
          enemy.display(x, y)
        }
      }
    }

        
    for(var placed_tower of towers){
      enemy_to_attack = detection(current_enemies,
      placed_tower.x,
      placed_tower.y,
      placed_tower.range/2
      )
      if(enemy_to_attack){
        placed_tower.attack(enemy_to_attack, current_enemies);
      }
      
      if(placed_tower instanceof Ice){
          if(random(0, 100) <= 1 && iced.length < 1){
            for(var enemy of current_enemies){
              slow(enemy);
              slowed_screen = true;
            }
          }
        }
    }
    action_time_elapsed = 0
  }else{
    action_time_elapsed+=deltaTime
  }

  // Wave Advancer
  if(base.health <= 0 ){
    background(0);
    current_enemies = [];
    towers = [];
    if(mouseIsPressed){
      base = new Base(500, 0, 500);
      current_wave = 0;
      wave_activated=true;
    }else{
      return;
    }
    
  }else{
    push()
    imageMode(CENTER)
    image(base_img, 100, 650, 200, 200)
    pop()
  }
  

  if(current_enemies.length == 0 && !wave_activated){
    current_wave += 1
    wave_activated = true
  }
  for(var portal of portals){
    push()
    imageMode(CENTER)
    image(portal_img, portal[0]*20, portal[1]*20, 60, 60);
    pop();
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
  if(slowed_screen){
    if(slowed_screen_elapsed < 1000){
      background(0);
      push();
      fill(214, 255, 250);
      background(0);
      textSize(20);
      textFont(retro_font);
      textAlign(CENTER, CENTER)
      text("ICE, ICE, BABY", width/2, height/2)
      pop();
      slowed_screen_elapsed+=deltaTime
    }else{
      slowed_screen = false;
      slowed_screen_elapsed = 0;
    }
  }
  // how rage boosts other towers
  if(rage && !angel_lock){
    
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
        if(tower.range > 410){
          tower.damage /=2
          tower.range /=2
        } 
        
      }
      rage = false;
      no_rage=true;
    }
    rage_elapsed+=deltaTime
  }else{
    rage_elapsed = 0;
  }

  

  // Distract minigame logic
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

function placePortal(x, y) {
  portals.push(
    [x, y]);
  game.env[x][y] = 2;
}

function destroyPortal(x, y) {
  for (let i = 0; i < portals.length; i++) {
    if (x == portals[i][0] && y == portals[i][1]) {
      portals.splice(i, 1);
      game.env[x][y] = 1;
    }
    
  }
}

class Enemy {
  constructor(health, damage, speed, position, visibility, maxH, img, lane=null, type=null) {
    this.health = health;
    this.damage = damage;
    this.speed = speed;
    this.position = position;
    this.type = type;
    this.visibility = visibility;
    this.maxH = maxH;
    this.lane = lane;
    this.img = img;
  }
  attack(base) {
    base.health -= this.damage;
  }
  display(x, y){
    push()
    imageMode(CENTER);
    image(this.img, x*20, y*20, 30, 30)
    pop()
  }

}

class Demon extends Enemy {
  constructor(health, damage, speed, position, visibility, maxH, img, lane=null, active_portal = null, type = "demonic") {
    super(health, damage, speed, position, visibility, maxH, img, lane, type);
    this.active_portal = active_portal;
  }
  attack(base) {
    super.attack(base);
  }
  display(x, y){
    super.display(x, y)
  }

  portal(x, y) {
    if (this.health <= 0) {
      destroyPortal(x, y);
    } else {
      placePortal(x, y);
    }
    return x, y
  }
}



class Angel extends Enemy {
  constructor(health, damage, speed, position, visibility, maxH, img, lane=null, type = "angelic") {
    super(health, damage, speed, position, visibility, maxH, img, lane, type);
  }
  attack(base) {
    super.attack(base);
  }
  display(x, y){
    super.display(x, y)
  }

  restrict() {
    if(towers.length - locked_angel_towers.length > 2){
      return random(towers)
    }else{
      return null
    }
    
  }
}

class Necromancer extends Enemy {
  constructor(health, damage, speed, position, visibility, maxH, img, lane=null,type = "magical") {
    super(health, damage, speed, position, visibility, maxH, img, lane, type);
  }
  attack(base) {
    super.attack(base);
  }
  display(x, y){
    super.display(x, y)
  }

  revive(dead) {
    if (dead.length > 1) {
      let revived = dead.splice(0, 2);
      dead.splice(0, 2);
      for (var enem of revived) {
        enem.health = 0.3 * enem.maxH;
        enem.maxH = 0.3 * enem.maxH;
        enem.damage = 0.3 * enem.damage;
        enem.type = "undead";
        current_enemies.push(enem)
      }
    }
  }
}

class Distract extends Enemy {
  constructor(health, damage, speed, position, visibility, maxH, img, lane=null, type = "bane") {
    super(health, damage, speed, position, visibility, maxH, img, lane, type);
  }
  attack(base) {
    super.attack(base);
  }
  display(x, y){
    super.display(x, y)
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
    position,
    visibility,
    maxH,
    img,
    lane,
    type = "physical"
  ) {
    super(health, damage, speed, position, visibility, maxH, img, lane=null, type);
  }
  attack(base) {
    super.attack(base);
  }
  display(x, y){
    super.display(x, y)
  }

  taunt(enemies) {
    push();
    fill(244, 241, 134, 100)
    circle(this.lane[this.position][0]*20, this.lane[this.position][1]*20, 100)
    pop();
    for (var enemy of enemies) {
      if (dist(enemy.lane[enemy.position][0], enemy.lane[enemy.position][0], this.lane[this.position][0], this.lane[this.position][1]) < 100 && !enemy instanceof Tyrant) {
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
      enemys = 10
      for(let i =0;i<enemys;i++){
        lane_choice = random([1, 2, 3, 4, 5]);
        switch(lane_choice){
          case 1:
            enemy = new Demon(50, 10, 1, 0, true, 50, demon_img)
            lane1_enemies.push(enemy)
            enemy.lane = lane1
            break;
          case 2:
            enemy = new Demon(50, 10, 1, 0, true, 50, demon_img)
            lane2_enemies.push(enemy)
            enemy.lane = lane2
            break;
          case 3:
            enemy = new Demon(50, 10, 1, 0, true, 50, demon_img)
            lane3_enemies.push(enemy)
            enemy.lane = lane3
            break;
          case 4:
            enemy = new Demon(50, 10, 1, 0, true, 50, demon_img)
            lane4_enemies.push(enemy)
            enemy.lane = lane4
            break;
          case 5:
            enemy = new Demon(50, 10, 1, 0, true, 50, demon_img)
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
            enemy1 = new Demon(60, 10, 1, 0, true, 60, demon_img)
            enemy2 = new Angel(30, 5, 1, 0, true, 30, angel_img)
            cur_enemy = random([enemy1, enemy2])
            cur_enemy.lane = lane1
            lane1_enemies.push(cur_enemy)
            break;
          case 2:
            enemy1 = new Demon(60, 10, 1, 0, true, 60, demon_img)
            enemy2 = new Angel(30, 5, 1, 0, true, 30, angel_img)
            cur_enemy = random([enemy1, enemy2])
            cur_enemy.lane = lane2
            lane2_enemies.push(cur_enemy)
            break;
          case 3:
            enemy1 = new Demon(60, 10, 1, 0, true, 60, demon_img)
            enemy2 = new Angel(30, 5, 1, 0, true, 30, angel_img)
            cur_enemy = random([enemy1, enemy2])
            cur_enemy.lane = lane3
            lane3_enemies.push(cur_enemy)
            break;
          case 4:
            enemy1 = new Demon(60, 10, 1, 0, true, 60, demon_img)
            enemy2 = new Angel(30, 5, 1, 0, true, 30, angel_img)
            cur_enemy = random([enemy1, enemy2])
            cur_enemy.lane = lane4
            lane4_enemies.push(cur_enemy)
            break;
          case 5:
            enemy1 = new Demon(60, 10, 1, 0, true, 60, demon_img)
            enemy2 = new Angel(30, 5, 1, 0, true, 30, angel_img)
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
            enemy1 = new Demon(70, 10, 1, 0, true, 70, demon_img)
            enemy2 = new Angel(40, 5, 1, 0, true, 40, angel_img)
            enemy3 = new Tyrant(100, 8, 1, 0, true, 100, tyrant_img)            
            cur_enemy = random([enemy1, enemy2, enemy3])
            cur_enemy.lane = lane1
            lane1_enemies.push(cur_enemy)
            break;
          case 2:
            enemy1 = new Demon(70, 10, 1, 0, true, 70, demon_img)
            enemy2 = new Angel(40, 5, 1, 0, true, 40, angel_img)
            enemy3 = new Tyrant(100, 8, 1, 0, true, 100, tyrant_img) 
            cur_enemy = random([enemy1, enemy2, enemy3])
            cur_enemy.lane = lane2
            lane2_enemies.push(cur_enemy)
            break;
          case 3:
            enemy1 = new Demon(70, 10, 1, 0, true, 70, demon_img)
            enemy2 = new Angel(40, 5, 1, 0, true, 40, angel_img)
            enemy3 = new Tyrant(100, 8, 1, 0, true, 100, tyrant_img) 
            cur_enemy = random([enemy1, enemy2, enemy3])
            cur_enemy.lane = lane3
            lane3_enemies.push(cur_enemy)
            break;
          case 4:
            enemy1 = new Demon(70, 10, 1, 0, true, 70, demon_img)
            enemy2 = new Angel(40, 5, 1, 0, true, 40, angel_img)
            enemy3 = new Tyrant(100, 8, 1, 0, true, 100, tyrant_img) 
            cur_enemy = random([enemy1, enemy2, enemy3])
            cur_enemy.lane = lane4
            lane4_enemies.push(cur_enemy)
            break;
          case 5:
            enemy1 = new Demon(70, 10, 1, 0, true, 70, demon_img)
            enemy2 = new Angel(40, 5, 1, 0, true, 40, angel_img)
            enemy3 = new Tyrant(100, 8, 1, 0, true, 100, tyrant_img) 
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
            enemy1 = new Demon(80, 10, 1, 0, true, 80, demon_img)
            enemy2 = new Angel(50, 5, 1, 0, true, 50, angel_img)
            enemy3 = new Tyrant(125, 8, 1, 0, true, 125, tyrant_img)
            enemy4 = new Distract(50, 4, 1, 0, true, 50, distract_img)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4])
            cur_enemy.lane = lane1
            lane1_enemies.push(cur_enemy)
            break;
          case 2:
            enemy1 = new Demon(80, 10, 1, 0, true, 80, demon_img)
            enemy2 = new Angel(50, 5, 1, 0, true, 50, angel_img)
            enemy3 = new Tyrant(125, 8, 1, 0, true, 125, tyrant_img)
            enemy4 = new Distract(50, 4, 1, 0, true, 50, distract_img)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4])
            cur_enemy.lane = lane2
            lane2_enemies.push(cur_enemy)
            break;
          case 3:
            enemy1 = new Demon(80, 10, 1, 0, true, 80, demon_img)
            enemy2 = new Angel(50, 5, 1, 0, true, 50, angel_img)
            enemy3 = new Tyrant(125, 8, 1, 0, true, 125, tyrant_img)
            enemy4 = new Distract(50, 4, 1, 0, true, 50, distract_img)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4])
            cur_enemy.lane = lane3
            lane3_enemies.push(cur_enemy)
            break;
          case 4:
            enemy1 = new Demon(80, 10, 1, 0, true, 80, demon_img)
            enemy2 = new Angel(50, 5, 1, 0, true, 50, angel_img)
            enemy3 = new Tyrant(125, 8, 1, 0, true, 125, tyrant_img)
            enemy4 = new Distract(50, 4, 1, 0, true, 50, distract_img)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4])
            cur_enemy.lane = lane4
            lane4_enemies.push(cur_enemy)
            break;
          case 5:
            enemy1 = new Demon(80, 10, 1, 0, true, 80, demon_img)
            enemy2 = new Angel(50, 5, 1, 0, true, 50, angel_img)
            enemy3 = new Tyrant(125, 8, 1, 0, true, 125, tyrant_img)
            enemy4 = new Distract(50, 4, 1, 0, true, 50, distract_img)
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
            enemy1 = new Demon(90, 10, 1, 0, true, 90, demon_img)
            enemy2 = new Angel(60, 5, 1, 0, true, 60, angel_img)
            enemy3 = new Tyrant(150, 8, 1, 0, true, 150, tyrant_img)
            enemy4 = new Distract(80, 4, 1, 0, true, 80, distract_img)
            enemy5 = new Necromancer(200, 1, 1, 0, true, 200, necro_img)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4, enemy5])
            cur_enemy.lane = lane1
            lane1_enemies.push(cur_enemy)
            break;
          case 2:
            enemy1 = new Demon(90, 10, 1, 0, true, 90, demon_img)
            enemy2 = new Angel(60, 5, 1, 0, true, 60, angel_img)
            enemy3 = new Tyrant(150, 8, 1, 0, true, 150, tyrant_img)
            enemy4 = new Distract(80, 4, 1, 0, true, 80, distract_img)
            enemy5 = new Necromancer(200, 1, 1, 0, true, 200, necro_img)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4, enemy5])
            cur_enemy.lane = lane2
            lane2_enemies.push(cur_enemy)
            break;
          case 3:
            enemy1 = new Demon(90, 10, 1, 0, true, 90, demon_img)
            enemy2 = new Angel(60, 5, 1, 0, true, 60, angel_img)
            enemy3 = new Tyrant(150, 8, 1, 0, true, 150, tyrant_img)
            enemy4 = new Distract(80, 4, 1, 0, true, 80, distract_img)
            enemy5 = new Necromancer(200, 1, 1, 0, true, 200, necro_img)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4, enemy5])
            cur_enemy.lane = lane3
            lane3_enemies.push(cur_enemy)
            break;
          case 4:
            enemy1 = new Demon(90, 10, 1, 0, true, 90, demon_img)
            enemy2 = new Angel(60, 5, 1, 0, true, 60, angel_img)
            enemy3 = new Tyrant(150, 8, 1, 0, true, 150, tyrant_img)
            enemy4 = new Distract(80, 4, 1, 0, true, 80, distract_img)
            enemy5 = new Necromancer(200, 1, 1, 0, true, 200, necro_img)
            cur_enemy = random([enemy1, enemy2, enemy3, enemy4, enemy5])
            cur_enemy.lane = lane4
            lane4_enemies.push(cur_enemy)
            break;
          case 5:
            enemy1 = new Demon(90, 10, 1, 0, true, 90, demon_img)
            enemy2 = new Angel(60, 5, 1, 0, true, 60, angel_img)
            enemy3 = new Tyrant(150, 8, 1, 0, true, 150, tyrant_img)
            enemy4 = new Distract(80, 4, 1, 0, true, 80, distract_img)
            enemy5 = new Necromancer(200, 1, 1, 0, true, 200, necro_img)
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
  constructor(health, saveState, maxH, damage=2, x = 100, y=650) {
    this.health = health;
    this.saved = saveState;
    this.maxH = maxH;
    this.dmg = damage;
    this.x = x
    this.y = y
  }
  detect(enemy) {
    if(dist(enemy.lane[enemy.position][0]*20, enemy.lane[enemy.position][1]*20, this.x, this.y) < 100 && enemy.visibility) {
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
    return 1;
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
  attack(enemy, enemies=null, damage) {
    if (this.AOE > 0) {
      for (var enem of enemies) {
        let enem_x = enem.lane[enem.position][0]
        let enem_y = enem.lane[enem.position][1]
        let og_x = enemy.lane[enemy.position][0]
        let og_y = enemy.lane[enemy.position][1]
        
        if (dist(og_x*20, og_y*20, enem_x*20, enem_y*20) < this.AOE && enem.visibility) {
          enem.health = enem.health - this.damage/2;
        }
        
      }
      enemy.health = enemy.health-this.damage/2;
    }else{
      enemy.health = enemy.health - this.damage;
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

  attack(enemy, enemies, damage=this.damage) {
    flame(enemy);
    super.attack(enemy, enemies, damage);
  }
  clone(){
    const new_tower = new Flame(this.type,this.damage, this.range,
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

  attack(enemy, enemies, damage=this.damage) {
    super.attack(enemy, enemies, damage);
  }
  clone(){
    const new_tower = new Ice(this.type,this.damage, this.range,
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

  attack(enemy, enemies, damage=this.damage) {
    super.attack(enemy, enemies), damage;
  }
  rage(){
    rage=true
  }
  clone(){
    const new_tower = new Rage(this.type,this.damage, this.range,
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

  attack(enemy, enemies, damage=this.damage) {
    super.attack(enemy, enemies, damage);
  }
  clone(){
    const new_tower = new Bomb(this.type,this.damage, this.range,
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
  let min_enemy_range = -1
  let min_enemy = null
  for(var enemy of enemies){
    x1 = enemy.lane[enemy.position][0]
    y1 = enemy.lane[enemy.position][1]
    if(dist(x, y, x1*20, y1*20) < range && enemy.visibility != false){
      if(enemy.position > min_enemy_range){
        min_enemy_range = enemy.position
        min_enemy = enemy
      }
    }
  }
  return min_enemy
}

