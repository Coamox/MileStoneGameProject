
function transition(page)
{
	document.getElementById("transition").src="assets/images/screenExit.gif";
	setTimeout(() => {window.location.href = page;}, 600);
}


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

    //array storing weapon and armor arrays,
    //array storing weapons, weapon-0,weapon min damage bonus-1,weapon max damage bonus-2
    //array storing armor, armor-0,armor defense-1,armor bonus hp-2
    let equipment = 
    [
        ["Fist", 0, 0],
        ["Shirt", 0, 0]
    ]
    //array storing level-0, hp-1, xp-2, gold-3, minAttack-4, maxAttack-5, defense-6
    let stats = [1,hp,0,50,1,attack,0]
    
    window.localStorage.setItem("player", JSON.stringify(player));
    window.localStorage.setItem("equipment", JSON.stringify(equipment));
    window.localStorage.setItem("stats", JSON.stringify(stats));
    window.localStorage.setItem("boss", "false");

    transition("maingame.html");

}

document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
    transition("index.html");
})

document.getElementById('warrior').addEventListener('click', async (event) => 
{
	event.preventDefault()
    classPick("Warrior", 50, 10);
})

// document.getElementById('mage').addEventListener('click', async (event) => 
// {
// 	event.preventDefault()
//     classPick("Mage", 30, 5);
// })

// document.getElementById('rogue').addEventListener('click', async (event) => 
// {
// 	event.preventDefault()
//     classPick("Rogue", 40, 15);
// })
