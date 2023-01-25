
function classPick(className, hp, attack)
{
    window.localStorage.setItem("class",className);
    window.localStorage.setItem("exp", 0);
    window.localStorage.setItem("level", 1);
    window.localStorage.setItem("gold", 10);
    localStorage.setItem("health", hp);
    localStorage.setItem("attack", attack);
    window.location.href = "maingame.html";
}

document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "title.html";
})

document.getElementById('warrior').addEventListener('click', async (event) => 
{
	event.preventDefault()
    classPick("warrior", 50, 10);
})

document.getElementById('mage').addEventListener('click', async (event) => 
{
	event.preventDefault()
    classPick("mage", 30, 5);
})

document.getElementById('rogue').addEventListener('click', async (event) => 
{
	event.preventDefault()
    classPick("rogue", 40, 15);
})
