window.onload = init;

function init() {
    // Set P/U date's min date to today
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("dateField").setAttribute("min", today);

    // Initialize Calculate Button's Onclick
    const calculateCostBtn = document.getElementById("calculateCostBtn");
    calculateCostBtn.onclick = validateFields; // When Button is clicked run calculateCost function

}

function validateFields() {
    const dateInput = document.getElementById("dateField");
    let numOfDaysInput = document.getElementById("numberOfDays");
    let numOfDays = numOfDaysInput.value;
    // Makes sure a date has been picked
    if(!dateInput.value) {
        console.log('Input type date is empty');
        alert('No date was selected. Please select a pickup date.');
    } else {
        console.log('Date has been selected.');
        console.log(dateInput.value);
    }
    // Checks if number of days has been inputed
    if(!numOfDaysInput.value) {
        console.log('Number of days field is empty.');
        alert("Number of days field is empty. Input days you'd like to rent.");
    } else {
        console.log(`# of days has been inputed: ${numOfDays}`);
    }
    // If both dateInput & numOfDaysInput have a value then FINALLY CALCULATE COST
    if(dateInput.value && numOfDaysInput.value){
        calculateTotalCost();
    }
}

function calculateTotalCost() {
    let numOfDays = document.getElementById("numberOfDays").value;
    let tollTag = document.getElementById("tollTag").checked;
    let gps = document.getElementById("gps").checked;
    let roadside = document.getElementById("roadside").checked;
    let roadsideCost = 0;
    let gpsCost = 0;
    let tollTagCost = 0;
    let surcharge;

    let carRentalCost = 29.99;
    let carRentalTotal = carRentalCost * numOfDays;
    let optionsTotal;

    // Assign Variables to something
    

    // Under 25 Surcharge Stuff
    if (document.getElementById("noRadio").checked) {
        surcharge = 0;
    } else if (document.getElementById("yesRadio").checked) {
        surcharge = (carRentalTotal * .30).toFixed(2);
    }
    // Options Total Stuff
    if (tollTag) {
        tollTagCost += 3.95;
    }
    if (gps) {
        gpsCost += 2.95;
    }
    if (roadside) {
        roadsideCost += 2.95;
    }
    
    optionsTotal = (roadsideCost + gpsCost + tollTagCost) * numOfDays;
    totalCost = optionsTotal + carRentalTotal + surcharge; 

    // Display Totals
    document.getElementById("carRentalTotal").innerHTML = `Car rental: ${carRentalTotal}`;
    alert(`Car rental total is: ${carRentalTotal}`);

    document.getElementById("optionsTotal").innerHTML = `Add-ons: ${optionsTotal.toFixed(2)}`;
    alert(`Add-ons total is: ${optionsTotal}`);
    
    document.getElementById("surchargeTotal").innerHTML = `Under 25 surcharge: ${surcharge}`;
    alert(`Under 25 Surcharge is : ${surcharge}`);
    document.getElementById("totalDue").innerHTML = `Total due: ${totalCost.toFixed(2)}`;
    alert(`Total due is ${totalCost}`);
}