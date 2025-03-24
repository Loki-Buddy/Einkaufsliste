const addButton = document.getElementById("addButton");
const artikelInput = document.getElementById("artikel");
const anzahlInput = document.getElementById("anzahl");
const preisInput = document.getElementById("preis");
const liste = document.getElementById("liste");
const gesamt = document.getElementById("gesamt");
let counter;
let itemList = [];

let gesamtPreis = 0;

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
            updatePreis();
        } else{
            gesamtPreis -= anzahl * preis;
            updatePreis();
        }
    });
    // Textinhalt des Listenelements
    const text = document.createTextNode(`${anzahl} x ${artikel}: ${preis}€ p.P. ------ ${anzahl * preis}€`);

    // Füge die Checkbox und den Text zum Listenelement hinzu
    new_li.appendChild(checkbox);
    new_li.appendChild(text);

    // Füge einen Löschen Button hinzu
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.style.marginLeft = "10px"; // Abstand zwischen Text und Button
    deleteButton.addEventListener("click", () => {
        liste.removeChild(new_li);
        if(checkbox.checked){
            gesamtPreis -= anzahl * preis;
            updatePreis();
        }else {

        }
        /* gesamtPreis -= anzahl * preis;
        updatePreis(); */
    });
    new_li.appendChild(deleteButton);

    liste.appendChild(new_li);
    itemList.push(new_li);
    // Gesamtpreis aktualisieren

    // Inputfelder leeren
    artikelInput.value = "";
    anzahlInput.value = "";
    preisInput.value = "";
});

function updatePreis() {
    gesamt.textContent = `Gesamt: ${gesamtPreis}€`;
}

function deleteAll(){
    
}