console.log(localStorage.getItem("class"));
console.log(localStorage.getItem("health"));
console.log(localStorage.getItem("attack"));

let hp = parseInt(localStorage.getItem("health"));
let attack = parseInt(localStorage.getItem("attack"));

let gobboHP = 50;
let gobboATK = 1;

console.log(hp - gobboATK);

while(gobboHP > 0 && hp > 0)
{
    gobboHP -= attack;
    hp -= gobboATK;
    console.log("Player HP: " + hp);
    console.log("Goblin HP: " + gobboHP);
}

if(hp <= 0)
{
    console.log("You dead, try again")
}
else
{
    console.log("You won, congrats")
}

document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "maingame.html";
})