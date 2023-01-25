
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

document.getElementById('start').addEventListener('mouseover', (event) => 
{
	document.getElementById("savedata").innerHTML = "Let's Start A New Adventure!";
});

document.getElementById('continue').addEventListener('mouseover', (event) => 
{
	if(localStorage.getItem("name") != null)
	{
		let name = localStorage.getItem("name");
		let playerClass = localStorage.getItem("class");
		document.getElementById("savedata").innerHTML = "Continue " + playerClass + " " + name + "'s adventure!";
	}
	else
	{
		document.getElementById("savedata").innerHTML = "You haven't started questing yet!";
	}
	
});