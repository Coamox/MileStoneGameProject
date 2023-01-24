
document.getElementById('start').addEventListener('click', async (event) => 
{
	event.preventDefault()
	localStorage.clear();
	window.location.href = "character.html";
})

document.getElementById('continue').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "maingame.html";
})