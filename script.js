const addButton = document.getElementById("addButton");
const artikelInput = document.getElementById("artikel");
const anzahlInput = document.getElementById("anzahl");
const preisInput = document.getElementById("preis");
const liste = document.getElementById("liste");
const gesamt = document.getElementById("gesamt");
const budget = document.getElementById("budget");
const dropdown = document.getElementById("choiceKatDropdown");
const kategorien = ["--kK--", "Obst", "Gemüse", "Getränke", "Snacks"]; // Beispielkategorien

let gesamtPreis = 0;
let budgetGesamt = 0;

// Dropdown-Optionen hinzufügen
function dropdownItemsHinzufuegen() {
    kategorien.forEach(kategorie => {
        const option = document.createElement("option");
        option.value = kategorie.toLowerCase();
        option.textContent = kategorie;
        dropdown.appendChild(option);
    });
}

// Budget speichern
function budgetSpeichern() {
    const budgetUserInput = document.getElementById("budgetUserInput").value;
    if (budgetUserInput > 0) {
        budgetGesamt = parseFloat(budgetUserInput);
        updatePreis();
    } else {
        alert("Bitte ein gültiges Budget eingeben!");
    }
}

// Preise aktualisieren
function updatePreis() {
    gesamt.textContent = `Gesamt: ${gesamtPreis}€`;
    budget.textContent = `Budget: ${budgetGesamt}€`;

    if (budgetGesamt < 0) {
        budget.style.color = "red";
        alert("Ohne Moos nix Los!");
    } else if (budgetGesamt === 0) {
        budget.style.color = "black";
    } else {
        budget.style.color = "green";
    }
}

// Alles löschen
function deleteAll() {
    liste.innerHTML = ""; // Liste leeren
    gesamtPreis = 0;
    budgetGesamt = 0;
    document.getElementById("budgetUserInput").value = ""; // Budget-Eingabefeld leeren
    dropdown.selectedIndex = 0; // Dropdown zurücksetzen
    updatePreis();
}

// Event Listener hinzufügen
document.addEventListener("DOMContentLoaded", () => {
    dropdownItemsHinzufuegen();

    // Enter-Taste im Budget-Eingabefeld
    const budgetUserInputEvent = document.getElementById("budgetUserInput");
    budgetUserInputEvent.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            budgetSpeichern();
        }
    });

    // Speichern-Button
    const budgetSaveButton = document.getElementById("budgetSaveButton");
    budgetSaveButton.addEventListener("click", budgetSpeichern);

    // Alles Löschen-Button
    const deleteAllButton = document.getElementById("deleteAllButton");
    deleteAllButton.addEventListener("click", deleteAll);

    // Hinzufügen-Button
    addButton.addEventListener("click", () => {
        const artikel = artikelInput.value;
        const anzahl = parseInt(anzahlInput.value);
        const preis = parseFloat(preisInput.value);

        if (!artikel || isNaN(anzahl) || isNaN(preis)) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        // Neues Listenelement erstellen
        const new_li = document.createElement("li");

        // Checkbox erstellen
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.marginRight = "10px";

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                gesamtPreis += anzahl * preis;
                budgetGesamt -= anzahl * preis;
            } else {
                gesamtPreis -= anzahl * preis;
                budgetGesamt += anzahl * preis;
            }
            updatePreis();
        });

        const text = document.createTextNode(
            `${dropdown.options[dropdown.selectedIndex].text} // ${anzahl} x ${artikel}: ${preis}€ p.P. ------ ${anzahl * preis}€`
        );

        new_li.appendChild(checkbox);
        new_li.appendChild(text);

        // Löschen-Button für das Listenelement
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.style.marginLeft = "10px";
        deleteButton.addEventListener("click", () => {
            liste.removeChild(new_li);
            if (checkbox.checked) {
                gesamtPreis -= anzahl * preis;
                budgetGesamt += anzahl * preis;
                updatePreis();
            }
        });

        new_li.appendChild(deleteButton);
        liste.appendChild(new_li);

        // Eingabefelder leeren
        artikelInput.value = "";
        anzahlInput.value = "";
        preisInput.value = "";
    });
});