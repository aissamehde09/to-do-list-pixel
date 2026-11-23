const paysage = document.querySelector("#paysage");
const pinceau = paysage.getContext("2d");

// Chaque lettre représente un pixel coloré. Un point laisse voir le ciel.
const couleurs = {
  v: "#585992", l: "#a9a4eb", p: "#ffc798", b: "#f4ead2",
  n: "#243341", o: "#de7846", r: "#9c5040", j: "#ffd37c"
};
const mage = [
  ".......ll.....",
  "......lv......",
  ".....lvv......",
  "....lvvvv.....",
  "...ljjjjjv....",
  "..lllllllll...",
  "....pppnp.....",
  "....bbbbb...j.",
  "....vbbbv..jjj",
  "...lvvbvv...r.",
  "..lvvvlvvvp.r.",
  "..lvvvlvv.pp.r",
  ".lvvvvlvvv..r.",
  ".llllllllll.r.",
  "...nn..nn...r."
];
const renard = [
  "..n...n........",
  "..oo.oo........",
  "..oroor........",
  ".ooooooo.....bb",
  "noponboo....bbb",
  ".bbbbbboo..oooo",
  "...bbooooooooo.",
  "....booooooor..",
  "....roorroor...",
  "....nn...nn...."
];

function dessinerPersonnage(modele, x, y) {
  modele.forEach((ligne, rang) => {
    [...ligne].forEach((lettre, colonne) => {
      if (lettre === ".") return;
      pinceau.fillStyle = couleurs[lettre];
      pinceau.fillRect(x + colonne, y + rang, 1, 1);
    });
  });
}

function dessinerPaysage() {
  // Le navigateur agrandit ce petit dessin : chaque pixel reste bien carré.
  const zoom = paysage.clientWidth < 600 ? 3 : 4;
  const largeur = paysage.width = Math.ceil(paysage.clientWidth / zoom);
  const hauteur = paysage.height = Math.ceil(paysage.clientHeight / zoom);
  const sol = hauteur - 10;

  pinceau.fillStyle = "#b6cfc4";
  for (let i = 0; i < largeur / 4; i++) {
    pinceau.fillRect((i * 127 + 9) % largeur, (i * i * 7 + 3) % Math.max(1, sol - 24), 1, 1);
  }

  // Deux rangées de collines en escalier donnent de la profondeur.
  for (let x = 0; x < largeur; x += 3) {
    const sommet = sol - 16 + Math.round(5 * Math.sin(x / 21) + 4 * Math.cos(x / 11));
    pinceau.fillStyle = "#436665";
    pinceau.fillRect(x, sommet, 3, hauteur - sommet);
    const pente = sol - 6 + Math.round(4 * Math.sin(x / 16));
    pinceau.fillStyle = "#315451";
    pinceau.fillRect(x, pente, 3, hauteur - pente);
  }
  pinceau.fillStyle = "#263d38";
  pinceau.fillRect(0, sol, largeur, 10);
  pinceau.fillStyle = "#9cad70";
  pinceau.fillRect(0, sol, largeur, 1);
  for (let x = 5; x < largeur; x += 17) {
    pinceau.fillRect(x, sol - 2, 1, 2);
    pinceau.fillRect(x + 1, sol - 1, 2, 1);
  }

  dessinerPersonnage(mage, Math.floor(largeur * 0.18), sol - mage.length);
  dessinerPersonnage(renard, Math.floor(largeur * 0.82) - 15, sol - renard.length);
}

if (pinceau) {
  dessinerPaysage();
  window.addEventListener("resize", dessinerPaysage);
}
