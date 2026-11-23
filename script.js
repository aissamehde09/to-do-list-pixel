const formulaire = document.querySelector("#taskForm");
const champ = document.querySelector("#taskInput");
const liste = document.querySelector("#taskList");
const message = document.querySelector("#storageMessage");
const cleStockage = "todo-arcade.quetes";

// Chaque quête contient son texte et un booléen qui indique si elle est terminée.
function chargerQuetes() {
  try {
    const donnees = localStorage.getItem(cleStockage);
    if (donnees === null) return [];
    const sauvegarde = JSON.parse(donnees);
    return sauvegarde.filter(quete =>
      quete && typeof quete.texte === "string" && typeof quete.terminee === "boolean"
    );
  } catch {
    message.textContent = "Impossible de lire les quêtes sauvegardées.";
    return [];
  }
}

const quetes = chargerQuetes();

function sauvegarder() {
  try {
    // localStorage conserve du texte : JSON.stringify y convertit notre tableau.
    localStorage.setItem(cleStockage, JSON.stringify(quetes));
    message.textContent = "";
  } catch {
    message.textContent = "Sauvegarde indisponible. Tes changements restent dans cette page.";
  }
}

function afficherQuete(quete) {
  const ligne = document.createElement("li");
  ligne.className = "quete";
  const etiquette = document.createElement("label");
  const caseTerminee = document.createElement("input");
  caseTerminee.type = "checkbox";
  caseTerminee.checked = quete.terminee;
  const titre = document.createElement("span");
  // textContent affiche la saisie telle quelle, même si elle contient du HTML.
  titre.textContent = quete.texte;
  etiquette.append(caseTerminee, titre);

  caseTerminee.addEventListener("change", () => {
    quete.terminee = caseTerminee.checked;
    sauvegarder();
  });

  const supprimer = document.createElement("button");
  supprimer.type = "button";
  supprimer.textContent = "Supprimer";
  supprimer.setAttribute("aria-label", "Supprimer la quête " + quete.texte);
  supprimer.addEventListener("click", () => {
    // On retire cet objet précis, même si deux quêtes ont le même titre.
    quetes.splice(quetes.indexOf(quete), 1);
    ligne.remove();
    sauvegarder();
    champ.focus();
  });

  ligne.append(etiquette, supprimer);
  liste.append(ligne);
}

formulaire.addEventListener("submit", evenement => {
  evenement.preventDefault(); // Garde la page ouverte pendant l'ajout.
  const texte = champ.value.trim();
  champ.focus();
  if (!texte) return;

  const quete = { texte, terminee: false };
  quetes.push(quete);
  afficherQuete(quete);
  sauvegarder();
  champ.value = "";
});

// Au démarrage, recrée une ligne pour chaque quête déjà enregistrée.
quetes.forEach(afficherQuete);
