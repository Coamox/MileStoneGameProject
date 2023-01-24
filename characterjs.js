

document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "title.html";
})

document.getElementById('warrior').addEventListener('click', async (event) => 
{
	event.preventDefault()
    window.localStorage.setItem("class","warrior");
	window.location.href = "maingame.html";
})

document.getElementById('mage').addEventListener('click', async (event) => 
{
	event.preventDefault()
    window.localStorage.setItem("class","mage");
	window.location.href = "maingame.html";
})

document.getElementById('rogue').addEventListener('click', async (event) => 
{
	event.preventDefault()
    window.localStorage.setItem("class","rogue");
	window.location.href = "maingame.html";
})