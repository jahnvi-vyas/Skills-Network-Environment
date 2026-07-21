const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById("btnSearch");

let patients = [];

// Add Patient
addPatientButton.addEventListener("click", function () {

    const name = document.getElementById("name").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (!name || !gender || !age || !condition) {
        alert("Please fill all fields.");
        return;
    }

    patients.push({
        name,
        gender: gender.value,
        age,
        condition
    });

    resetForm();
    generateReport();
});

// Reset Form
function resetForm(){

    document.getElementById("name").value="";
    document.getElementById("age").value="";
    document.getElementById("condition").value="";
    document.querySelectorAll('input[name="gender"]').forEach(r=>r.checked=false);

}

// Generate Report
function generateReport(){

    let diabetes=0;
    let thyroid=0;
    let bp=0;

    let male=0;
    let female=0;

    patients.forEach(patient=>{

        if(patient.gender==="Male")
            male++;
        else
            female++;

        if(patient.condition==="Diabetes")
            diabetes++;

        if(patient.condition==="Thyroid")
            thyroid++;

        if(patient.condition==="High Blood Pressure")
            bp++;

    });

    report.innerHTML=`
    <h3>Total Patients : ${patients.length}</h3>

    <p>👨 Male : ${male}</p>
    <p>👩 Female : ${female}</p>

    <hr>

    <p>Diabetes : ${diabetes}</p>
    <p>Thyroid : ${thyroid}</p>
    <p>High Blood Pressure : ${bp}</p>
    `;

}

// Search Condition

btnSearch.addEventListener("click",function(){

    const input=document.getElementById("conditionInput").value.trim().toLowerCase();

    if(input===""){
        alert("Enter condition.");
        return;
    }

    fetch("health_analysis.json")

    .then(response=>response.json())

    .then(data=>{

        const condition=data.conditions.find(c=>c.name.toLowerCase()===input);

        const result=document.getElementById("result");

        if(condition){

            result.innerHTML=`

            <h2>${condition.name}</h2>

            <img src="${condition.imagesrc}">

            <p><b>Symptoms:</b> ${condition.symptoms.join(", ")}</p>

            <p><b>Prevention:</b> ${condition.prevention.join(", ")}</p>

            <p><b>Treatment:</b> ${condition.treatment}</p>

            `;

        }
        else{

            result.innerHTML="<h2>Condition not found.</h2>";

        }

    });

});