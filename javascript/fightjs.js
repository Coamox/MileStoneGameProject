//Basic combat code to allow the player to either attack, defend or flee; notify them they are victorious or
//have been defeated; now gold and xp have been included; Armor and a function to calculate damage has been added; HTML elements now
//update to show changes of battle events

//Player variables pulled from local storage
let hp = parseInt(localStorage.getItem("health"));
let maxHP = hp;
let maxAttack = parseInt(localStorage.getItem("maxAttack"));
let exp = parseInt(localStorage.getItem("exp"));
let gold = parseInt(localStorage.getItem("gold"))
let armor = localStorage.getItem("defense");
let minAttack = parseInt(localStorage.getItem("minAttack"))
let attack = 0;
let playerName = localStorage.getItem('name');
//Enemy default variables which later will be altered when more enemies are introduced
let enemyMaxHP = 20;
let enemyHP = enemyMaxHP;
let enemyMaxATK = 5;
let monsterName = "";
let enemyATK = 0;
let enemyArmor = 0;
let attackTimer = 0;

//Random number generation, icludes min and max arguements in generation
function getRndInteger(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Disables buttons and changes flee to return to town, also updates gold and xp values
function combatDone()
{
    window.localStorage.setItem("exp", exp);
    window.localStorage.setItem("gold", gold);
    document.getElementById('attack').disabled = true;
    document.getElementById('defend').disabled = true;
    document.getElementById("back").innerText = "Town";
} 

//Randomly Selects enemy to fight, updates text on screen
function enemyToFight()
{

    if(monsterName != "")
    {
        return;
    }

    let choice = getRndInteger(1,2);
    
    switch(choice)
    {
        case 1:
            monsterName = "goblin";
            enemyMaxHP = 20;
            enemyHP = enemyMaxHP;
            enemyMaxATK = 5;
            document.getElementById("enemyImg").src="assets/images/goblinIdling.gif";
        break;

        case 2:
            monsterName = "skeleton";
            enemyMaxHP = 50;
            enemyHP = enemyMaxHP;
            enemyMaxATK = 3;
            document.getElementById("enemyImg").src="assets/images/skeleIdling.gif";
    }

    document.getElementById("name").innerHTML = "Player Name: " + playerName;
    document.getElementById("health").innerHTML = "HP: " + hp + "/" + maxHP;
    document.getElementById("enemyName").innerHTML = "Enemy: " + monsterName;
    document.getElementById("enemyHealth").innerHTML = "HP: " + enemyHP + "/" + enemyMaxHP;
    document.getElementById("playerEvent").innerHTML = "A " + monsterName + " crosses your path, prepare to fight!";
}



//Could be placed much better but still annoyed at the dumb reason why I broke it in the first place
enemyToFight();

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

                document.getElementById("enemyEvent").innerHTML = "The " + monsterName + " prepares his next attack!";
            }
            else if(attackTimer === 4)
            {
                enemyATK = (getRndInteger(1, enemyMaxATK) + 5);
                attackTimer = 0;

                document.getElementById("enemyEvent").innerHTML = "The " + monsterName + " critically hits you!";
            }
            else
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer = attackTimer + (getRndInteger(0, 1));

                document.getElementById("enemyEvent").innerHTML = "The " + monsterName + " strikes you!";
            }
        break;

        case 'skeleton':
            if(attackTimer === 5)
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer = 0;

                document.getElementById("enemyEvent").innerHTML = "The shield bash wore off and the " + monsterName + " strikes you!";
                document.getElementById("debuff").innerHTML = "Debuffs: none";
            }
            else if(attackTimer === 3)
            {
                enemyATK = (getRndInteger(1, enemyMaxATK) + 5);
                attackTimer++;
                attack = attack / 2;

                document.getElementById("enemyEvent").innerHTML = "The " + monsterName + " bashes you with his shield, your attack damage is halved!";
                document.getElementById("debuff").innerHTML = "Debuffs: Staggered(Damage cut in half)";
            }
            else if (attackTimer === 4)
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer++;
                attack = attack / 2;

                document.getElementById("enemyEvent").innerHTML = "The " + monsterName + " swings at you while you're staggered!";
            }
            else
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer = attackTimer + (getRndInteger(0, 1));

                document.getElementById("enemyEvent").innerHTML = "The " + monsterName + " swings at you!";
            }
    }
}

//Calculates damage with attack and armor arguements
function takeDamage(attack, armor)
{
    if((attack - armor) <= 0)
    {
        return 1;
    }
    else
    {
        return (attack - armor);
    }
}

//First checks if you're dead then acts accordingly
//Fighting state function is called on combat button clicks or presses, this calculates the combat damage
function fighting(state)
{

    attack = getRndInteger(minAttack, maxAttack);

    switch(state)
    {
        case 'attack':
            monsterMove(monsterName);
            enemyHP -= attack;
            hp -= takeDamage(enemyATK, armor);

            document.getElementById("enemyDamage").innerHTML = "The " + monsterName + " hits you for " + takeDamage(enemyATK, armor) + " damage!";
            document.getElementById("playerDamage").innerHTML = "You hit for " + attack + " damage!";
            document.getElementById("playerEvent").innerHTML = "You swing at the " + monsterName + "!";
            
        break;

        case 'defend':
            monsterMove(monsterName);
            hp -= (takeDamage(enemyATK, armor)) / 2;

            document.getElementById("enemyDamage").innerHTML = "The " + monsterName + " hits you for " + takeDamage(enemyATK, armor) + " damage!";
            document.getElementById("playerDamage").innerHTML = "You hit for " + 0 + " damage!";  
            document.getElementById("playerEvent").innerHTML = "You block and reduce damage taken by half!";
    }

    //Checks to see if the player or monster is dead then acts accordingly       
    if(hp <= 0)
    {
        combatDone();

        document.getElementById("health").innerHTML = "HP: " + hp + "/" + maxHP;
        document.getElementById("enemyHealth").innerHTML = "HP: " + enemyHP + "/" + enemyMaxHP;
        document.getElementById("playerEvent").innerHTML = "YOU HAVE BEEN DEFEATED!";
        document.getElementById("debuff").innerHTML = "Debuffs: Dead";
        return;
    }
    else if(enemyHP <= 0)
    {
        exp = exp + 100;
        gold = gold + 5;
        combatDone();

        document.getElementById("health").innerHTML = "HP: " + hp + "/" + maxHP;
        document.getElementById("enemyHealth").innerHTML = "HP: " + enemyHP + "/" + enemyMaxHP;
        document.getElementById("playerEvent").innerHTML = "You slay the " + monsterName + " with a blow of " + attack + " damage and have earned " + 100 + " xp and " + 5 + " gold!";
        return;    
    }

    document.getElementById("health").innerHTML = "HP: " + hp + "/" + maxHP;
    document.getElementById("enemyHealth").innerHTML = "HP: " + enemyHP + "/" + enemyMaxHP;
}

//Buttons that recieve user input to give player control over combat
document.getElementById('attack').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
        fighting('attack');
    }
)

document.getElementById('defend').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
        fighting('defend');
    }
)

document.getElementById('back').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
	    window.location.href = "maingame.html";
    }
)

