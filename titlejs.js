// document.getElementById('start').addEventListener('click', moveToCharacter);

// function moveToCharacter()
// {
//     window.location.href = "character.html";
// }

document.getElementById('start').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "character.html";
})