console.log(localStorage.getItem("class"));
console.log(localStorage.getItem("health"));
console.log(localStorage.getItem("attack"));

let hp = parseInt(localStorage.getItem("health"));
let attack = parseInt(localStorage.getItem("attack"));

let gobboHP = 50;
let gobboATK = 1;

console.log(hp - gobboATK);

for (let i = 0; i < 10; i++ )
{
    gobboHP -= attack;
    hp -= gobboATK;
    console.log("Player HP: " + hp);
    console.log("Goblin HP: " + gobboHP);
}



document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "maingame.html";
})