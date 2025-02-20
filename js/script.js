let numeriEstratti = [];
let numeriEstrattiCount = 0;

const tombolaCells = function () {
  const container = document.getElementById("tombolaContainer");
  for (let i = 1; i <= 90; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cellClass");
    cell.textContent = i;
    cell.setAttribute("data-number", i);
    cell.addEventListener("click", () => {
      cell.classList.toggle("selected");
    });

    container.appendChild(cell);
  }
};

const randomNumbers = () => {
  const numeriEstrattiList = document.getElementById("numeriList");

  if (numeriEstrattiCount >= 20) {
    alert("Il gioco è terminato! Sono stati estratti 20 numeri.");
    return;
  }

  // Trova un numero casuale che non è già stato estratto
  let numeroCasuale;
  do {
    numeroCasuale = Math.floor(Math.random() * 90) + 1;
  } while (numeriEstratti.includes(numeroCasuale));

  // Aggiungi il numero estratto all'array
  numeriEstratti.push(numeroCasuale);
  numeriEstrattiCount++;

  // Aggiungi il numero estratto alla lista visibile sotto "Ecco i numeri estratti"
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = numeroCasuale;
  li.appendChild(span);
  li.style.backgroundImage = "url('assets/pizzasticker.png')";
  li.style.backgroundSize = "cover";
  li.style.backgroundPosition = "center";
  numeriEstrattiList.appendChild(li);

  // Aggiungi la X sopra la cella della tombola corrispondente
  const cellaTombola = document.querySelector(
    `.cellClass[data-number='${numeroCasuale}']`
  );
  const xMark = document.createElement("div");
  xMark.classList.add("xMark");
  xMark.textContent = "X";
  // Verifica che la cella venga trovata e che la X venga aggiunta
  if (cellaTombola) {
    cellaTombola.appendChild(xMark);
  } else {
    console.log(
      "Cella della tombola non trovata per il numero " + numeroCasuale
    );
  }

  // Controllo per ogni cartella
  const cartelle = document.querySelectorAll(".cartella");
  cartelle.forEach((cartella) => {
    const celleCartella = cartella.querySelectorAll(".cellaCartella");

    celleCartella.forEach((cellaCartella) => {
      // Verifica che il numero nella cella della cartella corrisponda al numero estratto
      const numeroCartella = parseInt(cellaCartella.textContent);
      if (numeroCartella === numeroCasuale) {
        console.log(
          `Numero estratto: ${numeroCasuale} trovato nella cartella!`
        );
        const dotCartella = document.createElement("div");
        dotCartella.classList.add("dot"); // Aggiungi la classe .dot alla cella
        // Aggiungiamo il cerchio alla cella della cartella
        cellaCartella.appendChild(dotCartella);
      }
    });

    // Verifica se tutte le celle della cartella sono spuntate
    const tutteLeCelleSpuntate = Array.from(celleCartella).every((cella) => {
      return cella.querySelector(".xMark"); // Se ogni cella ha una "X"
    });

    // Se tutte le celle sono spuntate, il giocatore ha vinto
    if (tutteLeCelleSpuntate) {
      alert(
        "COMPLIMENTI, SEI IL RE DI TUTTI I RE! (...O LA REGINA DI TUTTI I REGNI, 'NSOMMA, CI SIAMO CAPITI)"
      );
    }
  });
};

// Funzione per creare una cartella della tombola
const createCartella = () => {
  const cartellaContainer = document.getElementById("cartelleContainer");

  // Creiamo una cartella con 5 numeri
  const cartella = document.createElement("div");
  cartella.classList.add("cartella");

  let numeriCartella = [];
  while (numeriCartella.length < 5) {
    const numeroCasuale = Math.floor(Math.random() * 90) + 1;
    if (!numeriCartella.includes(numeroCasuale)) {
      numeriCartella.push(numeroCasuale);
    }
  }

  // Ordiniamo i numeri in modo crescente
  numeriCartella.sort((a, b) => a - b);

  // Creiamo le celle per i numeri della cartella
  numeriCartella.forEach((numero) => {
    const cella = document.createElement("div");
    cella.classList.add("cellaCartella");
    cella.textContent = numero;
    cella.style.backgroundImage = "url('assets/pizzasticker.png')";
    cella.style.backgroundSize = "cover";
    cella.style.backgroundPosition = "center";
    cartella.appendChild(cella);
  });

  cartellaContainer.appendChild(cartella);
};

// Creiamo 1 cartella all'inizio
for (let i = 0; i < 1; i++) {
  createCartella();
}

// Aggiungi l'evento al bottone per estrarre un numero
const estraiButton = document.getElementById("randomNumbers");
estraiButton.addEventListener("click", randomNumbers);

// Inizializza le celle della tombola
tombolaCells();
