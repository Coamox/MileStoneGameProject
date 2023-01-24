

document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "title.html";
})

document.getElementById('next').addEventListener('click', async (event) => 
{
	event.preventDefault()
    window.localStorage.setItem("1","One");
	window.location.href = "maingame.html";
})