console.log(localStorage.getItem("class"));
console.log(localStorage.getItem("health"));
console.log(localStorage.getItem("maxAttack"));

//Basic combat code to allow the player to either attack, defend or flee; notify them they are victorious or
//have been defeated; now gold and xp have been included; Armor and a function to calculate damage has been added;

//Player variables pulled from local storage
let hp = parseInt(localStorage.getItem("health"));
let maxAttack = parseInt(localStorage.getItem("maxAttack"));
let exp = parseInt(localStorage.getItem("exp"));
let gold = parseInt(localStorage.getItem("gold"))
let armor = localStorage.getItem("defense");
let minAttack = parseInt(localStorage.getItem("minAttack"))
let attack = 0;

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

//Disables buttons and changes flee to return to town
function combatDone()
{
    window.localStorage.setItem("exp", exp);
    window.localStorage.setItem("gold", gold);
    document.getElementById('attack').disabled = true;
    document.getElementById('defend').disabled = true;
    document.getElementById("back").innerText = "Return to Town";
} 

//Randomly Selects enemy to fight
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
        break;

        case 2:
            monsterName = "skeleton";
            enemyMaxHP = 50;
            enemyHP = enemyMaxHP;
            enemyMaxATK = 3;
    }

    console.log("A " + monsterName + " crosses your path, prepare to fight!");
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
                console.log("The " + monsterName + " prepares his next attack!")
            }
            else if(attackTimer === 4)
            {
                enemyATK = (getRndInteger(1, enemyMaxATK) + 5);
                console.log("The " + monsterName + " critically hits you for " + takeDamage(enemyATK, armor) + " damage!")
                attackTimer = 0;
            }
            else
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer = attackTimer + (getRndInteger(0, 1));
                console.log("The " + monsterName + " hits you for " + takeDamage(enemyATK, armor) + " damage!")
            }
        break;

        case 'skeleton':
            if(attackTimer === 5)
            {
                enemyATK = (getRndInteger(1, enemyMaxATK) + 5);
                console.log("You've recovered from the shield bash!")
                console.log("The " + monsterName + " hits you for " + takeDamage(enemyATK, armor) + " damage!")
                attackTimer = 0;
            }
            else if(attackTimer === 3)
            {
                enemyATK = 0;
                attackTimer++;
                console.log("The " + monsterName + " bashes you with his shield, your attack damage is halved!")
                attack = attack / 2;
            }
            else if (attackTimer === 4)
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer++;
                console.log("You're still staggered, your damage is cut in half!")
                console.log("The " + monsterName + " hits you for " + takeDamage(enemyATK, armor) + " damage!")
                attack = attack / 2;
            }
            else
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer = attackTimer + (getRndInteger(0, 1));
                console.log("The " + monsterName + " hits you for " + takeDamage(enemyATK, armor) + " damage!")
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
            enemyHP -= takeDamage(attack, enemyArmor);
            hp -= takeDamage(enemyATK, armor);
            console.log("You hit for " + attack + " damage!")
            console.log("Player HP: " + hp);
            console.log(monsterName + " HP: " + enemyHP);
            
        break;

        case 'defend':
            monsterMove(monsterName);
            hp -= (takeDamage(enemyATK, armor)) / 2;
            console.log("You blocked and reduced the damage in half!")
            console.log("Player HP: " + hp);
            console.log(monsterName + " HP: " + enemyHP);
               
    }

           
    if(hp <= 0)
    {
        console.log("YOU HAVE FALLEN");
        combatDone();
        return;
    }
    else if(enemyHP <= 0)
    {
        console.log("You have slain the " + monsterName + "!");
        console.log("You gain 100 XP and 5 gold!");
        exp = exp + 100;
        gold = gold + 5;
        combatDone();
        return;    
    }

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

