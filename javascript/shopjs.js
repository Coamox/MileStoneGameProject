//arrays contents are listed in order of placement
//array storing weapon, armor,
let equipment = JSON.parse(localStorage.getItem('equipment'));
//array storing level-0, hp-1, xp-2, gold-3, minAttack-4, maxAttack-5, defense-6
let stats = JSON.parse(localStorage.getItem('stats'));

//updates info on screen
function updateInfo(type, cost)
{

    document.getElementById("damage").innerHTML = equipment[0] + " Damage Boost: " + checkWeapon();
    document.getElementById("defense").innerHTML = equipment[1] + " Defense Boost: " + checkArmor();
    document.getElementById("gold").innerHTML = "Gold: " + stats[3];

    if(type === "wep")
    {
        document.getElementById("event").innerHTML = "You bought a " + equipment[0] + " for " + cost + "g!";
    }
    else if(type === "arm")
    {
        document.getElementById("event").innerHTML = "You bought a " + equipment[1] + " for " + cost + "g!";
    }
    else
    {
        document.getElementById("event").innerHTML = "Time for some upgrades!";
    }
}

updateInfo();

//Buttons that call the respective functions
document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
    localStorage.setItem("stats", JSON.stringify(stats));
    localStorage.setItem("equipment", JSON.stringify(equipment));
	window.location.href = "maingame.html";
})

document.getElementById('weapon').addEventListener('click', async (event) => 
{
	event.preventDefault()
	buyWeapon();
})

document.getElementById('armor').addEventListener('click', async (event) => 
{
	event.preventDefault()
    buyArmor();
	
})

//Checks current weapon and required gold to upgrade
function buyWeapon()
{
    switch(equipment[0])
    {
        case 'Fist':
            if(stats[3] >= 50)
            {
                equipment[0] = "Dagger";
                //Min attack and Max attack increases
                stats[4] = stats[4] + 1;
                stats[5] = stats[5] + 1;
                stats[3] = stats[3] - 50;
                
                updateInfo("wep", 50);

            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
    }       
}

//Checks current armor and gold required for upgrade
function buyArmor()
{
    switch(equipment[1])
    {
        case 'Shirt':
            if(stats[3] >= 50)
            {
                equipment[1] = "A Clean Shirt";
                stats[6] = stats[6] + 1;
                stats[3] = stats[3] - 50;

                updateInfo("arm", 50);

            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
    }       
}

//Checks what the current damage weapon bonus is and updates the shop
function checkWeapon()
{
    switch(equipment[0])
    {
        case 'Fist':
            document.getElementById("weaponType").innerHTML = "Dagger";
            document.getElementById("weaponCost").innerHTML = "Cost: " + 50;
            return 0;
        break;

        case 'Dagger':
            document.getElementById("weaponType").innerHTML = "No upgrades left!";
            document.getElementById("weaponCost").innerHTML = "Nothing left to buy!";
            return 1;
    }       
}

//Checks what the current armor defense bonus is and updates the shop
function checkArmor()
{
    switch(equipment[1])
    {
        case 'Shirt':
            document.getElementById("armorType").innerHTML = "A Clean Shirt!";
            document.getElementById("armorCost").innerHTML = "Cost: " + 50;
            return 0;
        break;

        case 'A Clean Shirt':
            document.getElementById("armorType").innerHTML = "No upgrades left!";
            document.getElementById("armorCost").innerHTML = "Nothing left to buy!";
            return 1;
    }       
}