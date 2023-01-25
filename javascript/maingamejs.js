
let level = parseInt(localStorage.getItem("level"));
let exp = parseInt(localStorage.getItem("exp"));
let playerClass = localStorage.getItem("class");
let hp = parseInt(localStorage.getItem("health"));
let maxAttack = parseInt(localStorage.getItem("maxAttack"));
let gold = parseInt(localStorage.getItem("gold"))
let name = localStorage.getItem("name");
let minAttack = parseInt(localStorage.getItem("minAttack"))
let defense = parseInt(localStorage.getItem("defense"))

//Checks XP to see if the player is ready to level up and updates values
if(exp >= (100 * level))
{
    level = level + 1;
    exp = exp - 100;
    maxAttack = maxAttack + 1;
    minAttack = minAttack + 1;
    hp = hp + 5;
    window.localStorage.setItem("exp", exp);
    window.localStorage.setItem("level", level);
    console.log("You leveled up!")
    localStorage.setItem("health", hp);
    localStorage.setItem("maxAttack", maxAttack);
    localStorage.setItem("minAttack", minAttack);
}

console.log(name);
console.log("Class: " + playerClass);
console.log("Level: " + level);
console.log("Health: " + hp);
console.log("Defense: " + defense);
console.log("Max hit: " + maxAttack);
console.log("Min hit: " + minAttack);
console.log("Experience: " + exp + "/" + (level*100));
console.log("Gold: " + gold); 

document.getElementById("name").innerHTML = "Player Name: " + name;
document.getElementById("class").innerHTML = "Player Class: " + "Lvl " + level + " " + playerClass;
document.getElementById("health").innerHTML = "Max Health: " + hp;
document.getElementById("damage").innerHTML = "Damage Range: " + minAttack + "-" + maxAttack;
document.getElementById("defense").innerHTML = "Defense: " + defense;
document.getElementById("exp").innerHTML = "EXP: " + exp + "/" + (level*100);
document.getElementById("gold").innerHTML = "Gold: " + gold;

//Button and their effects
document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "title.html";
})

document.getElementById('shop').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "shop.html";
})

document.getElementById('fight').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "fight.html";
})