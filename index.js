'use strict';
//Vytvoř si proměnnou, ve které bude uloženo kdo je na tahu. Začíná vždy kolečko, tak rovnou do proměnné přiřaď řetězec 'circle'.

let kdoHraje = 'circle';

// pracujeme se všemi políčky
const fieldButton = document.querySelector('.policko');

const hrajeme = (event) => {
  if (kdoHraje === 'circle') {
    event.target.classList.add('board__field--circle'); // Přidej políčku příslušnout třídu podle toho, kdo je zrovna na tahu. Například board__field--circle, resp. board__field--cross. - viz CSS
    event.target.disabled = true; //Bonus: Zamez, aby se na již vyplněná políčka nešlo dostat klávesou tab přidáním atributu disabled.
    document.querySelector('.hraje').src = 'cross.svg'; // Uprav v levém horním rohu výpis, kdo je na tahu.
    kdoHraje = 'cross'; //začínají vždy kolečka, jakmile odehrají, tak křížky

    // Výchozí rámeček, který se objevuje po kliknutí na tlačítko, není potřeba stylovat. Může se uživateli hodit pro snazší ovládání z klávesnice.

    // Změň hodnotu proměnné z 'circle' na 'cross', případně z 'cross' na 'circle'.
  } else if (kdoHraje === 'cross') {
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
    document.querySelector('.hraje').src = 'circle.svg';
    kdoHraje = 'circle'; // po křížcích vždy hrají kolečka
  }
};

const field = document.querySelectorAll('.policko'); //vybrána všechna políčka do const field proměnné
for (let i = 0; i < field.length; i++) {
  // cyklus for
  field[i].addEventListener('click', hrajeme); // Kliknutím se zavolá funkce hrajeme.
}
