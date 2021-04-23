'use strict';
//Vytvoř si proměnnou, ve které bude uloženo kdo je na tahu. Začíná vždy kolečko, tak rovnou do proměnné přiřaď řetězec 'circle'.

let kdoHraje = 'circle';

const hrajeElement = document.querySelector('.hraje');

const hrajeme = (event) => {
  if (kdoHraje === 'circle') {
    event.target.classList.add('board__field--circle'); // Přidej políčku příslušnout třídu podle toho, kdo je zrovna na tahu. Například board__field--circle, resp. board__field--cross. - viz CSS
    event.target.disabled = true; //Bonus: Zamez, aby se na již vyplněná políčka nešlo dostat klávesou tab přidáním atributu disabled.
    hrajeElement.src = 'cross.svg'; // Uprav v levém horním rohu výpis, kdo je na tahu.
    kdoHraje = 'cross'; //začínají vždy kolečka, jakmile odehrají, tak křížky

    // Výchozí rámeček, který se objevuje po kliknutí na tlačítko, není potřeba stylovat. Může se uživateli hodit pro snazší ovládání z klávesnice.

    // Změň hodnotu proměnné z 'circle' na 'cross', případně z 'cross' na 'circle'.
  } else if (kdoHraje === 'cross') {
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
    hrajeElement.src = 'circle.svg';
    kdoHraje = 'circle'; // po křížcích vždy hrají kolečka
  }
};

const field = document.querySelectorAll('.policko'); //vybrána všechna políčka do const field proměnné
for (let i = 0; i < field.length; i++) {
  // cyklus for
  field[i].addEventListener('click', hrajeme); // Kliknutím se zavolá funkce hrajeme.
}

// Pátá část úkolu
// Napiš funkci getPosition(field), která pro dané políčko vrátí objekt s číslem řádku a sloupce. Pro levé horní políčko vrať {row: 0, column: 0}, pro pravé dolní {row: 9, column: 9}, pro levé dolní {row: 9, column: 0}, …

const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.policko');

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

// Napiš funkci getField(row, column), která naopak pro číslo řádku a sloupce vrátí příslušný prvek.
const getField = (row, column) => fields[row * boardSize + column];

// Přichystej si funkci, getSymbol(field), která pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined.

const getSymbol = (field) => {
  // Název třídy přizpůsob tvému kódu.
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

// S použitím nachystaných funkcí zjisti při každém tahu, jestli se nejedná o výherní. Nový kód navaž na event listener ze čtvrtého úkolu.

// Vytvoř funkci isWinningMove(field), která se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět. Podle toho vrátí true nebo false.

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
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
