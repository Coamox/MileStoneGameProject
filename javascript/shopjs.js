let gold = parseInt(localStorage.getItem("gold"));
let weapon = localStorage.getItem("weapontype", "fist");
let armor = localStorage.getItem("armortype", "shirt");
let minAttack = parseInt(localStorage.getItem("minAttack"));
let maxAttack = parseInt(localStorage.getItem("maxAttack"));
let defense = parseInt(localStorage.getItem("defense"));

document.getElementById("event").innerHTML = "Time for some upgrades!";
document.getElementById("damage").innerHTML = weapon + " Damage Boost: " + checkWeapon();
document.getElementById("defense").innerHTML = armor + " Defense Boost: " + checkArmor();
document.getElementById("gold").innerHTML = "Gold: " + gold;

//Buttons that call the respective functions
document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
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
    switch(weapon)
    {
        case 'Fist':
            if(gold >= 50)
            {
                weapon = "Dagger";
                minAttack++;
                maxAttack++;
                gold = gold - 50;
                window.localStorage.setItem("maxAttack", maxAttack);
                window.localStorage.setItem("minAttack", minAttack);
                window.localStorage.setItem("weapontype", weapon);
                window.localStorage.setItem("gold", gold);

                document.getElementById("damage").innerHTML = weapon + " Damage Boost: " + checkWeapon();
                document.getElementById("event").innerHTML = "You bought a dagger for 50g!";
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
    switch(armor)
    {
        case 'Shirt':
            if(gold >= 50)
            {
                armor = "A Clean Shirt";
                defense++;
                gold = gold - 50;
                window.localStorage.setItem("armortype", armor);
                window.localStorage.setItem("defense", defense);
                window.localStorage.setItem("gold", gold);

                document.getElementById("defense").innerHTML = armor + " Defense Boost: " + checkArmor();
                document.getElementById("event").innerHTML = "You bought a clean shirt for 50g!";
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
    switch(weapon)
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
    switch(armor)
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