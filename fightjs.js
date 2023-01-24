console.log(localStorage.getItem("class"));
console.log(localStorage.getItem("health"));
console.log(localStorage.getItem("attack"));

//Basic combat code to allow the player to either attack, defend or flee; notify them they are victorious or
//have been defeated;

let hp = parseInt(localStorage.getItem("health"));
let maxAttack = parseInt(localStorage.getItem("attack"));
let attack = 0;

let enemyHP = 10;
let enemyMaxATK = 5;
let monsterName = "goblin";
let enemyATK = 0;

function fighting(state)
{
    
    if(hp <= 0 || enemyHP <= 0)
    {
        return;
    }

    attack = (Math.floor(Math.random() * maxAttack) + 1);
    enemyATK = (Math.floor(Math.random() * enemyMaxATK) + 1);

    switch(state)
    {
        case 'attack':
            enemyHP -= attack;
            hp -= enemyATK;
            console.log("Player HP: " + hp);
            console.log("You hit for " + attack + " damage!")
            console.log("Goblin HP: " + enemyHP);
            console.log(monsterName + " hit you for " + enemyATK + " damage!")
        break;

        case 'defend':
            hp -= enemyATK;
            console.log("Player HP: " + hp);
            console.log("You blocked and reduced the damage in half!")
            console.log("Goblin HP: " + enemyHP);
            console.log(monsterName + " hit you for " + enemyATK + " damage!")   
    }
}

document.getElementById('attack').addEventListener('click', async (event) => 
    {
	    event.preventDefault()
        fighting('attack');
        if(hp <= 0)
        {
            console.log("YOU HAVE FALLEN");
            return;
        }
        else if(enemyHP <= 0)
        {
            console.log("You have slain the " + monsterName + "!")
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
	    window.location.href = "maingame.html";
    }
)