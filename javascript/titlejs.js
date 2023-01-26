
document.getElementById('start').addEventListener('click', async (event) => 
{
	event.preventDefault()
	localStorage.clear();
	window.location.href = "character.html";
})

document.getElementById('continue').addEventListener('click', async (event) => 
{
	event.preventDefault()
	if(localStorage.getItem("player") != null)
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
	if(localStorage.getItem("player") != null)
	{
		let player = JSON.parse(localStorage.getItem('player'));

		document.getElementById("savedata").innerHTML = "Continue " + player[1] + " " + player[0] + "'s adventure!";
	}
	else
	{
		document.getElementById("savedata").innerHTML = "You haven't started questing yet!";
	}
	
});