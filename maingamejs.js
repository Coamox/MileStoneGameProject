
let level = parseInt(localStorage.getItem("level"));
let exp = parseInt(localStorage.getItem("exp"));
let playerClass = localStorage.getItem("class");
let hp = parseInt(localStorage.getItem("health"));
let attack = parseInt(localStorage.getItem("attack"));

if(exp >= 100)
{
    level = level + 1;
    console.log(exp);
    exp = exp - 100;
    attack = attack + 2;
    hp = hp + 5;
    window.localStorage.setItem("exp", exp);
    window.localStorage.setItem("level", level);
    console.log("You leveled up!")
}

console.log(playerClass);
console.log(hp);
console.log(attack);
console.log(level);
console.log(exp);

//Button and their effects
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