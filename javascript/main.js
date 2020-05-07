let player;
let enemy;

function Player(classType, health, mana, strength, agility, speed) {
  this.classType = classType;
  this.health = health;
  this.mana = mana;
  this.strength = strength;
  this.agility = agility;
  this.speed = speed;
}

let PlayerMoves = {
    calcAttack: function() {
      //who attacks first
      let getPlayerSpeed = player.speed;
      let getEnemySpeed = enemy.speed;
      //player attacks
      let playerAttack = function() {
        let calcBaseDamage;
        if (player.mana > 0) {
          calcBaseDamage = player.strength * player.mana / 1000;
        } else {
          calcBaseDamage = player.strength * player.agility / 1000;
        }
        let offsetDamage = Math.floor(Math.random() * Math.floor(10));
        let calcOutputDamage = calcBaseDamage + offsetDamage;
        //number of hits
        let numberOfHits = Math.floor(Math.random() * Math.floor(player.agility / 10) / 2) + 1;
        let attackValues = [calcOutputDamage, numberOfHits];
        return attackValues;
      }
      let enemyAttack = function() {
        let calcBaseDamage;
        if (enemy.mana > 0) {
          calcBaseDamage = enemy.strength * enemy.mana / 1000;
        } else {
          calcBaseDamage = enemy.strength * enemy.agility / 1000;
        }
        let offsetDamage = Math.floor(Math.random() * Math.floor(10));
        let calcOutputDamage = calcBaseDamage + offsetDamage;
        //number of hits
        let numberOfHits = Math.floor(Math.random() * Math.floor(enemy.agility / 10) / 2) + 1;
        let attackValues = [calcOutputDamage, numberOfHits];
        return attackValues;
      }
      //get player health to change later
      getPlayerHealth = document.querySelector(".health-player");
      getEnemyHealth = document.querySelector(".health-enemy");
      //initiate attacks!
      if(enemy.health<=0 || player.health<=0)
      {
        alert("The game is over. Please refresh your browser to play again.");
        return;
      }
      if (getPlayerSpeed >= getEnemySpeed) {
        let playerAttackValues = playerAttack();
        let totalDamage = playerAttackValues[0] * playerAttackValues[1];
        enemy.health = enemy.health - totalDamage;
        alert("You hit " + playerAttackValues[0] + " damage " + playerAttackValues[1] + " times.");
        if (enemy.health <= 0) {
          alert("You win! Refresh the browser to play again.");
          getPlayerHealth.innerHTML = 'Health: ' + player.health;
          getEnemyHealth.innerHTML = 'Health: 0';
        } else {
          getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
          //enemy attacks
          let enemyAttackValues = enemyAttack();
          let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
          player.health = player.health - totalDamage;
          alert("Enemy hit " + enemyAttackValues[0] + " damage " + enemyAttackValues[1] + " times.");

          if (player.health <= 0) {
            alert("You lose! Refresh the browser to play again.");
            getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
            getPlayerHealth.innerHTML = 'Health: 0';
          } else {
            getPlayerHealth.innerHTML = 'Health: ' + player.health;
          }
        }
      } else {
        let enemyAttackValues = enemyAttack();
        let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
        player.health = player.health - totalDamage;
        alert("Enemy hit " + enemyAttackValues[0] + " damage " + enemyAttackValues[1] + " times.");
        if (player.health <= 0) {
          alert("You lose! Refresh the browser to play again.");
          getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
          getPlayerHealth.innerHTML = 'Health: 0';
        } else {
          getPlayerHealth.innerHTML = 'Health: ' + player.health;
          let playerAttackValues = playerAttack();
          let totalDamage = playerAttackValues[0] * playerAttackValues[1];
          enemy.health = enemy.health - totalDamage;
          alert("You hit " + playerAttackValues[0] + " damage " + playerAttackValues[1] + " times.");
          if (enemy.health <= 0) {
            alert("You win! Refresh the browser to play again.");
            getPlayerHealth.innerHTML = 'Health: ' + player.health;
            getEnemyHealth.innerHTML = 'Health: 0';
          } else {
            getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
          }
        }

      }
    }
  }

    function Enemy(enemyType, health, mana, strength, agility, speed) {
      this.enemyType = enemyType;
      this.health = health;
      this.mana = mana;
      this.strength = strength;
      this.agility = agility;
      this.speed = speed;
    }

    let GameManager = {
      setGameStart: function(classType) {
        this.resetPlayer(classType);
        this.setPreFight();
      },
      resetPlayer: function(classType) {
        switch (classType) {
          case 'Knight':
            player = new Player(classType, 200, 0, 200, 100, 50);
            break;
          case 'Rogue':
            player = new Player(classType, 100, 0, 100, 150, 200);
            break;
          case 'Wizard':
            player = new Player(classType, 80, 0, 50, 200, 50);
            break;
          case 'Hunter':
            player = new Player(classType, 200, 0, 50, 200, 100);
            break;
        }
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="gameAssets/Player/' + classType + '.png" class="img-avatar"><div><h3>' + classType + '</h3><p class="health-player">Health: ' + player.health + '</p><p>Mana: ' + player.mana + '</p><p>Strength: ' + player.strength + '</p><p>Agility: ' + player.agility + '</p><p>Speed: ' + player.speed + '</p></div>';
      },
      setPreFight: function() {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        getHeader.innerHTML = '<p>Task: Find An Enemy!</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="GameManager.setFight()">Search for enemy!</a>';
        getArena.style.visibility = "visible";
      },
      setFight: function() {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getEnemy = document.querySelector(".enemy");
        // create an enemy
        let enemy00 = new Enemy('Archer', 100, 0, 50, 100, 100);
        let enemy01 = new Enemy('Squire', 200, 0, 150, 80, 150);
        let enemy02 = new Enemy('Raider', 200, 0, 150, 80, 150);
        let enemy03 = new Enemy('Enchantress', 200, 0, 150, 80, 150);
        let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(4));
        switch (chooseRandomEnemy) {
          case 0:
            enemy = enemy00;
            break;
          case 1:
            enemy = enemy01;
            break;
          case 2:
            enemy = enemy02;
            break;
          case 3:
            enemy = enemy03;
            break;
        }
        getHeader.innerHTML = '<p>Task: Choose your move!</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="PlayerMoves.calcAttack()">Attack!</a>';
        getEnemy.innerHTML = '<img src="gameAssets/Enemy/' + enemy.enemyType + '.png" alt="' + enemy.enemyType.toLowerCase() + '" class="img-avatar"</a><div><h3>' + enemy.enemyType + '</h3><p class="health-enemy">Health: ' + enemy.health + '</p><p>Mana: ' + enemy.mana + '</p><p>Strength: ' + enemy.strength + '</p><p>Agility: ' + enemy.agility + '</p><p>Speed: ' + enemy.speed + '</p></div>';

      }
    }
