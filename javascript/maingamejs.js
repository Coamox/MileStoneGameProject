
//arrays contents are listed in order of placement
//array storing player name and class
let player = JSON.parse(localStorage.getItem('player'));
//array storing weapon, armor,
let equipment = JSON.parse(localStorage.getItem('equipment'));
//array storing level-0, hp-1, xp-2, gold-3, minAttack-4, maxAttack-5, defense-6
let stats = JSON.parse(localStorage.getItem('stats'));

//Checks XP to see if the player is ready to level up and updates values
if(stats[2] >= (100 * stats[0]))
{
    //level increment
    stats[0] = stats[0] + 1;
    //Health increase
    stats[1] = stats[1] + 5;
    //xp subtraction for level
    stats[2] = stats[2] - 100;
    //Min attack and Max attack increases
    stats[4] = stats[4] + 1;
    stats[5] = stats[5] + 1;

    localStorage.setItem("stats", JSON.stringify(stats));
}

//Stats info
document.getElementById("name").innerHTML = "Player Name: " + player[0];
document.getElementById("class").innerHTML = "Player Class: " + "Lvl " + stats[0] + " " + player[1];
document.getElementById("health").innerHTML = "Max Health: " + stats[1];
document.getElementById("damage").innerHTML = "Damage Range: " + stats[4] + "-" + stats[5];
document.getElementById("defense").innerHTML = "Defense: " + stats[6];
document.getElementById("exp").innerHTML = "EXP: " + stats[2] + "/" + (stats[0]*100);
document.getElementById("gold").innerHTML = "Gold: " + stats[3];

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