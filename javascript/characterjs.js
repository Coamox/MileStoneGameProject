//Stores all the basic info into local storage and checks if there is a name typed in
function classPick(className, hp, attack)
{
    if(document.getElementById("name").value === "")
    {
        console.log("Gotta name your hero!")
        return;
    }
    let name = document.getElementById("textname").value;
    //arrays contents are listed in order of placement
    //array storing player name and class
    let player = [name, className]
    //array storing weapon, armor,
    let equipment = ["Fist", "Shirt"]
    //array storing level-0, hp-1, xp-2, gold-3, minAttack-4, maxAttack-5, defense-6
    let stats = [1,hp,0,50,1,attack,0]
    
    window.localStorage.setItem("player", JSON.stringify(player));
    window.localStorage.setItem("equipment", JSON.stringify(equipment));
    window.localStorage.setItem("stats", JSON.stringify(stats));

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
    classPick("Warrior", 50, 10);
})

document.getElementById('mage').addEventListener('click', async (event) => 
{
	event.preventDefault()
    classPick("Mage", 30, 5);
})

document.getElementById('rogue').addEventListener('click', async (event) => 
{
	event.preventDefault()
    classPick("Rogue", 40, 15);
})
