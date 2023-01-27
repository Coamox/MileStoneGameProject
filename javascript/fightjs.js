//Basic combat code to allow the player to either attack, defend or flee; notify them they are victorious or
//have been defeated; now gold and xp have been included; Armor and a function to calculate damage has been added; HTML elements now
//update to show changes of battle events

//arrays contents are listed in order of placement
//array storing player name and class
let player = JSON.parse(localStorage.getItem('player'));
//array storing level-0, hp-1, xp-2, gold-3, minAttack-4, maxAttack-5, defense-6
let stats = JSON.parse(localStorage.getItem('stats'));

//Player variables 
let hp = stats[1];
let exp = 0;
let gold = 0;
let playerAttack = 0;
let combatStart = false;
let playerDebuff = "None";
//Enemy default variables which later will be altered when more enemies are introduced
let enemyMaxHP = 20;
let enemyHP = enemyMaxHP;
let enemyMaxATK = 5;
let monsterName = "";
let enemyATK = 0;
let enemyArmor = 0;
let attackTimer = 0;
let enemyDebuff = "None"

//Random number generation, icludes min and max arguements in generation
function getRndInteger(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Disables buttons and changes flee to return to town, also updates gold and xp values
function combatDone()
{
    stats[2] = stats[2] + exp;
    stats[3] = stats[3] + gold;
    localStorage.setItem("stats", JSON.stringify(stats));
    
    document.getElementById('attack').disabled = true;
    document.getElementById('defend').disabled = true;
    document.getElementById("back").innerText = "Town";
} 

//Randomly Selects enemy to fight, updates text on screen
function enemyToFight(choice)
{
    if(monsterName != "")
    {
        document.getElementById("playerInfo").innerHTML = "Player Name: " + player[0] + "<br><br>HP: " + hp + "/" + stats[1] + "<br><br>Debuffs: " + playerDebuff;
        document.getElementById("enemyInfo").innerHTML = "Enemy: " + monsterName + "<br><br>HP: " + enemyHP + "/" + enemyMaxHP + "<br><br>Debuffs: " + enemyDebuff;
        return;
    }

    combatStart = true;
    document.getElementById("enemyImg").style.visibility= "visible";
    document.getElementById("playerImg").style.visibility= "visible";

    switch(choice)
    {
        case 1:
            monsterName = "goblin";
            enemyMaxHP = 15 + ((stats[0]) * 5);
            enemyHP = enemyMaxHP;
            enemyMaxATK = 5 + ((stats[0]) * 2);
            gold = 5 + ((stats[0]) * 5);
            exp = 10 + ((stats[0]) * 5);
            document.getElementById("enemyImg").src="assets/images/goblinIdling.gif";
        break;

        case 2:
            monsterName = "skeleton";
            enemyMaxHP = 25 + ((stats[0]) * 5);
            enemyHP = enemyMaxHP;
            enemyMaxATK = 5 + ((stats[0]) * 2);
            gold = 20 + ((stats[0]) * 5);
            exp = 20 + ((stats[0]) * 10);
            document.getElementById("enemyImg").src="assets/images/skeleIdling.gif";
    }

    document.getElementById("playerInfo").innerHTML = "Player Name: " + player[0] + "<br><br>HP: " + hp + "/" + stats[1] + "<br><br>Debuffs: none";
    document.getElementById("enemyInfo").innerHTML = "Enemy: " + monsterName + "<br><br>HP: " + enemyHP + "/" + enemyMaxHP + "<br><br>Debuffs: none";
    document.getElementById("event").innerHTML = "A " + monsterName + " crosses your path, prepare to fight!<br>";

}

//Calculates damage with attack and armor arguements
function takeDamage(attack, armor, entity)
{
    let damage = 0;

    if((attack - armor) <= 0)
    {
       damage = 1;
    }
    else
    {
        damage = (attack - armor);
    }

    if(entity === "player")
    {
        hp = hp - damage;
        return damage;
    }
    else
    {
        enemyHP = enemyHP - damage;
        return damage;
    }
}

//This dictates what chunk of enemy ai logic will be used based on the enemy you're fighting
function monsterMove(name)
{
    switch(name)
    {
        case 'goblin':
            if(attackTimer === 3)
            {
                enemyATK = 0;
                attackTimer++;

                document.getElementById("event").innerHTML += "The " + monsterName + " prepares his next attack!<br>";
            }
            else if(attackTimer === 4)
            {
                enemyATK = (getRndInteger(1, enemyMaxATK) + 5);
                attackTimer = 0;

                document.getElementById("event").innerHTML += "The " + monsterName + " critically hits you for " + playerDamage + "!<br>";
            }
            else
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer = attackTimer + (getRndInteger(0, 1));

                document.getElementById("event").innerHTML += "The " + monsterName + " strikes you for " + playerDamage + "!<br>";
            }
        break;

        case 'skeleton':
            if(attackTimer === 5)
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer = 0;
                playerDebuff = "None";
                document.getElementById("event").innerHTML += "The shielf bash wears off!<br>"
                document.getElementById("event").innerHTML += "The " + monsterName + " strikes you for " + playerDamage + "!<br>";
                
            }
            else if(attackTimer === 3)
            {
                enemyATK = (getRndInteger(1, enemyMaxATK) + 5);
                attackTimer++;
                playerAttack = playerAttack / 2;
                playerDebuff = "Staggered! (Damage cut in half!)"

                document.getElementById("enemyEvent").innerHTML = "The " + monsterName + " bashes you with his shield for " + playerDamage + " damage!<br>";
            }
            else if (attackTimer === 4)
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer++;
                playerAttack = playerAttack / 2;

                document.getElementById("event").innerHTML += "The " + monsterName + " strikes you for " + playerDamage + "!<br>";
            }
            else
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer = attackTimer + (getRndInteger(0, 1));

                document.getElementById("event").innerHTML += "The " + monsterName + " strikes you for " + playerDamage + "!<br>";
            }
    }
}

//First checks if you're dead then acts accordingly
//Fighting state function is called on combat button clicks or presses, this calculates the combat damage
function fighting(state)
{
    switch(state)
    {
        case 'attack':            
            playerDamage = takeDamage(enemyATK, stats[6], "player");
            monsterMove(monsterName);
            playerAttack = takeDamage(getRndInteger(stats[4],stats[5]), 0, "enemy");

            document.getElementById("event").innerHTML += "You deal " + playerAttack + " damage!<br>";
            enemyToFight();
        break;

        case 'defend':
            playerDamage = takeDamage((enemyATK/2), stats[6], "player");
            monsterMove(monsterName);
            playerAttack = 0;

            document.getElementById("event").innerHTML += "You block and reduce damage taken by half!<br>";
            enemyToFight();
    }

    //Checks to see if the player or monster is dead then acts accordingly       
    if(hp <= 0)
    {
        combatDone();

        document.getElementById("event").innerHTML += "YOU HAVE BEEN DEFEATED!";
        return;
    }
    else if(enemyHP <= 0)
    {

        combatDone();

        document.getElementById("event").innerHTML += "You have slain the " + monsterName + "!<br>" + "You earn " + exp + " xp and " + gold + " gold!";
        return;    
    }

    document.getElementById("health").innerHTML = "HP: " + hp + "/" + stats[1];
    document.getElementById("enemyHealth").innerHTML = "HP: " + enemyHP + "/" + enemyMaxHP;
}

//Buttons that recieve user input to give player control over combat
document.getElementById('attack').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
        if(combatStart != true)
        {
            document.getElementById('attack').innerText = "Attack!";
            document.getElementById('defend').innerText = "Defend!";
            document.getElementById("back").innerText = "Flee!";
            enemyToFight(1);
        }
        else
        {
            fighting('attack');
        }
    }
)

document.getElementById('defend').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
        if(combatStart != true)
        {
            document.getElementById('attack').innerText = "Attack!";
            document.getElementById('defend').innerText = "Defend!";
            document.getElementById("back").innerText = "Flee!";
            enemyToFight(2);
        }
        else
        {
            fighting('defend');
        }
    }
)

document.getElementById('back').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
	    window.location.href = "maingame.html";
    }
)

