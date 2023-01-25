let gold = parseInt(localStorage.getItem("gold"));
let weapon = localStorage.getItem("weapontype", "fist");
let armor = localStorage.getItem("armortype", "shirt");
let minAttack = parseInt(localStorage.getItem("minAttack"));
let maxAttack = parseInt(localStorage.getItem("maxAttack"));
let defense = parseInt(localStorage.getItem("defense"));

//Buttons that call the respective functions
document.getElementById('back').addEventListener('click', async (event) => 
{
	event.preventDefault()
	window.location.href = "maingame.html";
})

document.getElementById('weapon').addEventListener('click', async (event) => 
{
	event.preventDefault()
	checkWeapon();
})

document.getElementById('armor').addEventListener('click', async (event) => 
{
	event.preventDefault()
    checkArmor();
	
})

//Checks current weapon and required gold to upgrade
function checkWeapon()
{
    switch(weapon)
    {
        case 'fist':
            if(gold >= 50)
            {
                weapon = "Dagger";
                minAttack++;
                maxAttack++;
                window.localStorage.setItem("attack", maxAttack);
                window.localStorage.setItem("minAttack", minAttack);
                window.localStorage.setItem("weapontype", weapon);
                console.log("A dagger has been purchased!");
            }
            else
            {
                console.log("Come back when you got the 50g for this upgrade!")
            }
    }       
}

//Checks current armor and gold required for upgrade
function checkArmor()
{
    switch(armor)
    {
        case 'shirt':
            if(gold >= 50)
            {
                armor = "A clean shirt";
                defense++;
                window.localStorage.setItem("armortype", armor);
                window.localStorage.setItem("defense", defense);
                console.log("A clean shirt purchased!");
            }
            else
            {
                console.log("Come back when you got the 50g for this upgrade!")
            }
    }       
}