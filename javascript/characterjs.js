//Stores all the basic info into local storage and checks if there is a name typed in
function classPick(className, hp, attack)
{
    if(document.getElementById("name").value === "")
    {
        console.log("Gotta name your hero!")
        return;
    }

    window.localStorage.setItem("name", (document.getElementById("textname").value))
    window.localStorage.setItem("class",className);
    window.localStorage.setItem("exp", 0);
    window.localStorage.setItem("level", 1);
    window.localStorage.setItem("gold", 50);
    window.localStorage.setItem("health", hp);
    window.localStorage.setItem("maxAttack", attack);
    window.localStorage.setItem("minAttack", 1);
    window.localStorage.setItem("defense", 0);
    window.localStorage.setItem("weapontype", "Fist");
    window.localStorage.setItem("armortype", "Shirt");
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
