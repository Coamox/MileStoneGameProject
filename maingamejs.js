
let hp = 10;
let attack = 5;
let level = 1;
let playerClass = localStorage.getItem("class");

if(playerClass === "warrior")
{
    hp = 20;
    attack = 10;
}
else if(playerClass === "mage")
{
    hp = 10;
    attack = 5;
}
else if(playerClass === "rogue")
{
    hp = 15;
    attack = 15;
}

console.log(playerClass);
console.log(hp);
console.log(attack);

document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "title.html";
})

document.getElementById('fight').addEventListener('click', async (event) => 
{
	event.preventDefault()
    localStorage.setItem("health", hp);
    localStorage.setItem("attack", attack);
	window.location.href = "fight.html";
})