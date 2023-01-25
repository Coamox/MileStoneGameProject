console.log(localStorage.getItem("class"));
console.log(localStorage.getItem("health"));
console.log(localStorage.getItem("attack"));

//Basic combat code to allow the player to either attack, defend or flee; notify them they are victorious or
//have been defeated;

//Player variables pulled from local storage
let hp = parseInt(localStorage.getItem("health"));
let maxAttack = parseInt(localStorage.getItem("attack"));
let exp = parseInt(localStorage.getItem("exp"));
let gold = parseInt(localStorage.getItem("gold"))
let attack = 0;

//Enemy default variables which later will be altered when more enemies are introduced
let enemyMaxHP = 20;
let enemyHP = enemyMaxHP;
let enemyMaxATK = 5;
let monsterName = "goblin";
let enemyATK = 0;
let attackTimer = 0;

function getRndInteger(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Disables buttons and changes flee to return to town
function combatDone()
{
    document.getElementById('attack').disabled = true;
    document.getElementById('defend').disabled = true;
    document.getElementById("back").innerText = "Return to Town";
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
                console.log(monsterName + " prepares his next attack!")
            }
            else if(attackTimer === 4)
            {
                enemyATK = (getRndInteger(1, enemyMaxATK) + 5);
                console.log(monsterName + " critically hits you for " + enemyATK + " damage!")
                attackTimer = 0;
            }
            else
            {
                enemyATK = getRndInteger(1, enemyMaxATK);
                attackTimer = attackTimer + (getRndInteger(0, 1));
                console.log(monsterName + " hits you for " + enemyATK + " damage!")
                console.log(attackTimer);
            }
    }
}

//Fighting state function is called on combat button clicks or presses, this calculates the combat damage
function fighting(state)
{
    
    if(hp <= 0 || enemyHP <= 0)
    {
        return;
    }

    attack = getRndInteger(1, maxAttack);
    // enemyATK = getRndInteger(1, enemyMaxATK);

    switch(state)
    {
        case 'attack':
            monsterMove(monsterName);
            enemyHP -= attack;
            hp -= enemyATK;
            console.log("You hit for " + attack + " damage!")
            console.log("Player HP: " + hp);
            console.log("Goblin HP: " + enemyHP);
            
        break;

        case 'defend':
            monsterMove(monsterName);
            hp -= (enemyATK/2);
            console.log("You blocked and reduced the damage in half!")
            console.log("Player HP: " + hp);
            console.log("Goblin HP: " + enemyHP);
               
    }
}

//Buttons that recieve user input to give player control over combat
document.getElementById('attack').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
        fighting('attack');
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
)

document.getElementById('defend').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
        fighting('defend');
        if(hp <= 0)
        {
            console.log("YOU HAVE FALLEN");
            return;
        }
        else if(enemyHP <= 0)
        {
            console.log("YOU HAVE SLAIN THE " + monsterName + "!")
            return;    
        }
    }
)


document.getElementById('back').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
        window.localStorage.setItem("exp", exp);
        window.localStorage.setItem("gold", gold);
	    window.location.href = "maingame.html";
    }
)