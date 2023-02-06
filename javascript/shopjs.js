//arrays contents are listed in order of placement
//array storing arrays of weapon, armor,
//array storing weapons, weapon-0,weapon min damage bonus-1,weapon max damage bonus-2
//array storing armor, armor-0,armor defense-1,armor bonus hp-2
let equipment = JSON.parse(localStorage.getItem('equipment'));
//array storing level-0, hp-1, xp-2, gold-3, minAttack-4, maxAttack-5, defense-6
let stats = JSON.parse(localStorage.getItem('stats'));

function transition(page)
{
	document.getElementById("transition").src="assets/images/screenExit.gif";
	setTimeout(() => {window.location.href = page;}, 600);
}

//updates info on screen
function updateInfo(type, cost)
{

    document.getElementById("damage").innerHTML = equipment[0][0] + " Damage Boost: +" + equipment[0][1] + "/" + equipment[0][2];
    document.getElementById("defense").innerHTML = equipment[1][0] + " Defense Boost: " + equipment[1][1];
    document.getElementById("gold").innerHTML = "Gold: " + stats[3];

    if(type === "wep")
    {
        document.getElementById("event").innerHTML = "You bought a " + equipment[0][0] + " for " + cost + "g!";
    }
    else if(type === "arm")
    {
        document.getElementById("event").innerHTML = "You bought a " + equipment[1][0] + " for " + cost + "g!";
    }
    else
    {
        document.getElementById("event").innerHTML = "Time for some upgrades!";
    }

    checkArmor();
    checkWeapon();
}

updateInfo();

//Buttons that call the respective functions
document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
    localStorage.setItem("stats", JSON.stringify(stats));
    localStorage.setItem("equipment", JSON.stringify(equipment));
	transition("maingame.html");
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
    switch(equipment[0][0])
    {
        case 'Fist':
            if(stats[3] >= 50)
            {
                equipment[0][0] = "Dagger";
                //Min attack and Max attack increases
                equipment[0][1] = 1;
                equipment[0][2] = 1;
                stats[3] = stats[3] - 50;
                
                updateInfo("wep", 50);
            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
        break;
        
        case 'Dagger':
            if(stats[3] >= 100)
            {
                equipment[0][0] = "Rusty Shortsword";
                //Min attack and Max attack increases
                equipment[0][1] = 2;
                equipment[0][2] = 2;
                stats[3] = stats[3] - 100;
                
                updateInfo("wep", 100);
            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
        break;

        case 'Rusty Shortsword':
            if(stats[3] >= 200)
            {
                equipment[0][0] = "Iron Shortsword";
                //Min attack and Max attack increases
                equipment[0][1] = 3;
                equipment[0][2] = 4;
                stats[3] = stats[3] - 200;
                
                updateInfo("wep", 200);
            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
        break;

        case 'Iron Shortsword':
            if(stats[3] >= 350)
            {
                equipment[0][0] = "Bronze Longsword";
                //Min attack and Max attack increases
                equipment[0][1] = 3;
                equipment[0][2] = 5;
                stats[3] = stats[3] - 350;
                
                updateInfo("wep", 350);
            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
        break;
    }       
}

//Checks current armor and gold required for upgrade
function buyArmor()
{
    switch(equipment[1][0])
    {
        case 'Shirt':
            if(stats[3] >= 50)
            {
                equipment[1][0] = "A Clean Shirt";
                equipment[1][1] = 1;
                stats[3] = stats[3] - 50;

                updateInfo("arm", 50);
            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
        break;

        case 'A Clean Shirt':
            if(stats[3] >= 150)
            {
                equipment[1][0] = "Dusty Tunic";
                equipment[1][1] = 3;
                equipment[1][2] = 5;
                stats[3] = stats[3] - 150;

                updateInfo("arm", 150);
            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
        break;

        case 'Dusty Tunic':
            if(stats[3] >= 250)
            {
                equipment[1][0] = "A Clean Tunic";
                equipment[1][1] = 3;
                equipment[1][2] = 10;
                stats[3] = stats[3] - 250;

                updateInfo("arm", 250);
            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
        break;

        case 'A Clean Tunic':
            if(stats[3] >= 350)
            {
                equipment[1][0] = "Chainmail";
                equipment[1][1] = 5;
                equipment[1][2] = 25;
                stats[3] = stats[3] - 350;

                updateInfo("arm", 350);
            }
            else
            {
                document.getElementById("event").innerHTML = "Not enough gold!";
            }
        break;
    }       
}

//Checks what the current damage weapon bonus is and updates the shop
function checkWeapon()
{
    switch(equipment[0][0])
    {
        case 'Fist':
            document.getElementById("weaponType").innerHTML = "Dagger!";
            document.getElementById("weaponCost").innerHTML = "Cost: " + 50;
            return 0;
        break;

        case 'Dagger':
            document.getElementById("weaponType").innerHTML = "Rusty Shortsword!";
            document.getElementById("weaponCost").innerHTML = "Cost: " + 100;
            return 1;
        break;

        case 'Rusty Shortsword':
            document.getElementById("weaponType").innerHTML = "Iron Shortsword!";
            document.getElementById("weaponCost").innerHTML = "Cost: " + 200;
            return 1;
        break;

        case 'Iron Shortsword':
            document.getElementById("weaponType").innerHTML = "Bronze Longsword!";
            document.getElementById("weaponCost").innerHTML = "Cost: " + 350;
            return 1;
        break;

        case 'Bronze Longsword':
            document.getElementById("weaponType").innerHTML = "No upgrades left!";
            document.getElementById("weaponCost").innerHTML = "Nothing left to buy!";
            return 1;
        break;
        
    }       
}

//Checks what the current armor defense bonus is and updates the shop
function checkArmor()
{

    switch(equipment[1][0])
    {
        case 'Shirt':
            document.getElementById("armorType").innerHTML = "A Clean Shirt!";
            document.getElementById("armorCost").innerHTML = "Cost: " + 50;
            return 0;
        break;

        case 'A Clean Shirt':
            document.getElementById("armorType").innerHTML = "Dusty Tunic!";
            document.getElementById("armorCost").innerHTML = "Cost: " + 150;
            return 1;
        break;

        case 'Dusty Tunic':
            document.getElementById("armorType").innerHTML = "A Clean Tunic!";
            document.getElementById("armorCost").innerHTML = "Cost: " + 250;
            return 0;
        break;

        case 'A Clean Tunic':
            document.getElementById("armorType").innerHTML = "Chainmail!";
            document.getElementById("armorCost").innerHTML = "Cost: " + 350;
            return 0;
        break;

        case 'Chainmail':
            document.getElementById("armorType").innerHTML = "No upgrades left!";
            document.getElementById("armorCost").innerHTML = "Nothing left to buy!";
            return 1;
        break;
    }       
}