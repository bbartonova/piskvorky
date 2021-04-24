'use strict';
//Vytvoř si proměnnou, ve které bude uloženo kdo je na tahu. Začíná vždy kolečko, tak rovnou do proměnné přiřaď řetězec 'circle'.
let kdoHraje = 'circle';
const hrajeElement = document.querySelector('.hraje');
const fields = document.querySelectorAll('.policko'); // Do proměnné fields jsou vybráhna všechna políčka.
const boardSize = 10; // 10x10

const hrajeme = (event) => {
  if (kdoHraje === 'circle') {
    event.target.classList.add('board__field--circle'); // Přidej políčku příslušnout třídu podle toho, kdo je zrovna na tahu. Například board__field--circle, resp. board__field--cross. - viz CSS
    event.target.disabled = true; //Bonus: Zamez, aby se na již vyplněná políčka nešlo dostat klávesou tab přidáním atributu disabled.
    hrajeElement.src = 'cross.svg'; // Uprav v levém horním rohu výpis, kdo je na tahu.
    kdoHraje = 'cross'; //začínají vždy kolečka, jakmile odehrají, tak křížky

    // Výchozí rámeček, který se objevuje po kliknutí na tlačítko, není potřeba stylovat.
    // Může se uživateli hodit pro snazší ovládání z klávesnice.

    // Změň hodnotu proměnné z 'circle' na 'cross', případně z 'cross' na 'circle'.
  } else if (kdoHraje === 'cross') {
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
    hrajeElement.src = 'circle.svg';
    kdoHraje = 'circle'; // po křížcích vždy hrají kolečka
  }
};

// Pátá část úkolu
// S použitím nachystaných funkcí zjisti při každém tahu, jestli se nejedná o výherní.
// Nový kód navaž na event listener ze čtvrtého úkolu.
// pocet symbolu v souvisle rade pro vyhru
// Vytvoř funkci isWinningMove(field), která se podívá na symbol políčka a zjistí,
// jestli jich je v řádku nebo ve sloupci sousedících pět. Podle toho vrátí true nebo false.
// Funkci isWinningMove pusť s každým nově přidaným symbolem.
// Pokud vrátí true, zobraz alert s hláškou, který hráč vyhrál.
const symbolsToWin = 5;
const isWinningMove = (field) => {
  // zjisti umisteni (row, column)
  const origin = getPosition(field);
  // zjisti symbol (cross, circle)
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;

  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};

// Všem políčkům (viz promenna fields) se nastavuje listener na událost "click", který volá funkci hrajeme.
for (let i = 0; i < fields.length; i++) {
  fields[i].addEventListener('click', (event) => {
    hrajeme(event);

    // zjisti, zda se jedná o vítězný tah
    if (isWinningMove(event.target)) {
      const winner = confirm(
        `Vyhrál hráč se symbolem ${
          getSymbol(event.target) === 'circle' ? ' kolečko' : ' křížek' // podle symbolu posledniho policka definuj vítězného hráče (kolečko/křížek)
        }`,
      );
      if (winner === true) {
        window.location.reload(); // Obnovení stránky.
      }
    }
  });
}

// Pokračování páté části úkolu
// Napiš funkci getPosition(field), která pro dané políčko vrátí objekt s číslem řádku a sloupce.
// Pro levé horní políčko vrať {row: 0, column: 0}, pro pravé dolní {row: 9, column: 9},
// pro levé dolní {row: 9, column: 0}, …
// parametr field je DOM element (nejake policko)
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    // testuje se shoda vybraneho policka field se vsemi existujici policky fields
    // pokud shoda nastane, while skonci a ziskame index vybraneho policka (fieldIndex)
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize), // Math.floor zakrouhlí na celá čísla(menší/rovno vloženému číslu)
    column: fieldIndex % boardSize, // modulo (vrací zbytek)
  };
};

// Napiš funkci getField(row, column), která naopak pro číslo řádku a sloupce vrátí příslušný prvek.
const getField = (row, column) => fields[row * boardSize + column];

// Přichystej si funkci, getSymbol(field), která pro políčko s křížkem vrátí řetězec 'cross',
// pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined.
const getSymbol = (field) => {
  // metoda classList se dotazuje na css třídy daného elementu
  // metoda contains se dotazuje, zda string obsauje hledaný řetězec
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};
