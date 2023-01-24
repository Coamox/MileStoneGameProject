
document.getElementById('start').addEventListener('click', async (event) => 
{
	event.preventDefault()
	localStorage.clear();
	window.location.href = "character.html";
})

document.getElementById('continue').addEventListener('click', async (event) => 
{
	event.preventDefault()
	if(localStorage.getItem("class") != null)
	{
		window.location.href = "maingame.html";
	}
	else
	{
		console.log("No save detected");
	}
	
})