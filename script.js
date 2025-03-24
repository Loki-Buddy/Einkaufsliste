const addButton = document.getElementById("addButton");
const artikelInput = document.getElementById("artikel");
const anzahlInput = document.getElementById("anzahl");
const preisInput = document.getElementById("preis");
const liste = document.getElementById("liste");
const gesamt = document.getElementById("gesamt");
const budget = document.getElementById("budget");
const budgetInput = document.getElementById("budgetInput");



let itemList = [];
let budgetUserInput

let gesamtPreis = 0;
let budgetGesamt= 0;

const dropdown = document.getElementById("choiceKatDropdown");
const kategorien = ["","Obst", "Gemüse", "Getränke", "Snacks"]; // Beispielkategorien

function budgetSpeichern() {
    budgetUserInput = document.getElementById("budgetUserInput").value;
    if(budgetUserInput > 0){
        budgetGesamt = budgetUserInput;
    }
    
    updatePreis();
}

function updatePreis() {
    gesamt.textContent = `Gesamt: ${gesamtPreis}€`;
    budget.textContent = `Budget: ${budgetGesamt}€`;

    if(budgetGesamt<0){
        budget.style.color="red";
        alert("Ohne Moos nix Los!");
    }else if(budgetGesamt===0){
        budget.style.color = "black";
    }else{
        budget.style.color="green";
    }
}

function deleteAll(){
    liste.remove();
    gesamtPreis = 0;
    budgetGesamt= 0;
    document.getElementById("budgetUserInput").value = "";
    updatePreis();
    dropdown.selectedIndex = 0;
}

function dropdownItemsHinzufuegen() {
    updatePreis();
    /* const dropdown = document.getElementById("choiceKatDropdown");

    const kategorien = ["Obst", "Gemüse", "Getränke", "Snacks"]; // Beispielkategorien */

    kategorien.forEach(kategorie => {
        const option = document.createElement("option");
        option.value = kategorie.toLowerCase(); // Wert der Option
        option.textContent = kategorie; // Sichtbarer Text
        dropdown.appendChild(option);
    });
}

addButton.addEventListener("click", () => {
    
    const artikel = artikelInput.value;
    const anzahl = anzahlInput.value;
    const preis = preisInput.value;

    // Neues Element erstellen und in die Liste einfügen
    const new_li = document.createElement("li");

    // Checkbox erstellen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "10px"; // Abstand zwischen Checkbox und Text

    checkbox.addEventListener("change", () => {
        if (checkbox.checked ) {
            gesamtPreis += anzahl * preis;
            budgetGesamt -= anzahl * preis;
            updatePreis();
        } else{
            gesamtPreis -= anzahl * preis;
            budgetGesamt += anzahl * preis;
            updatePreis();
        }
    });
    const text = document.createTextNode(`${kategorien.at(dropdown.selectedIndex)}  //  ${anzahl} x ${artikel}: ${preis}€ p.P. ------ ${anzahl * preis}€`);

    new_li.appendChild(checkbox);
    new_li.appendChild(text);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", () => {
        liste.removeChild(new_li);
        if(checkbox.checked){
            gesamtPreis -= anzahl * preis;
            updatePreis();
        }
    });
    new_li.appendChild(deleteButton);

    liste.appendChild(new_li);
    itemList.push(new_li);

    // Inputfelder leeren
    artikelInput.value = "";
    anzahlInput.value = "";
    preisInput.value = "";
});

document.addEventListener("DOMContentLoaded", dropdownItemsHinzufuegen);