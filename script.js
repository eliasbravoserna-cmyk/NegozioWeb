/**
 * Progetto finale JS - Prodotti Negozio Online
 * Crea una pagina che mostra una lista di prodotti recuperati da un'API (es. http://192.168.1.102:5000/api/products)
 * Ogni prodotto ha: id, nome, descrizione, categoria, prezzo, immagine, disponibilità
 * 
 * 
 * Suggerimenti per l'implementazione:
 * - Crea una funzione che genera una riga di un singolo prodotto
 * - Crea una funzione che visualizza l'intera tabella dei prodotti (che richiama la funzione precedente per ogni prodotto)
 * - Crea una funzione che fa mostra la sezione dei dettagli con le info del prodotto passato per parametro
 * - Aggiungi un event listener a ogni riga della tabella per mostrare i dettagli del prodotto cliccato (usa la funzione di visualizzazione dei dettagli)
 * - Aggiungi un event listener al pulsante "Chiudi" per nascondere la sezione dei dettagli
 * 
 * Bonus:
 * - Aggiungi una barra di ricerca per filtrare i prodotti per nome (filtro testuale)
 * - Aggiungi un filtro per categoria (dropdown) per mostrare solo i prodotti di una certa categoria
 * Nota: i filtri devono lavorare insieme e sui dati già recuperati, senza fare nuove richieste all'API
 * 
 * 
 * 
 * FUNZIONALITÀ:
 * 1. Recupera i prodotti da API (fetch GET)
 * 2. Mostra i prodotti in una tabella con immagine, nome, prezzo e disponibilità
 * 3. Quando l'utente clicca su un prodotto, mostra i dettagli in una sezione a parte (usa le classi "modal" e "nascosto" nella sezione)
 * 4. Nella sezione dei dettagli, mostra TUTTE le info del prodotto e un pulsante "Chiudi" per nascondere la sezione
*/

const URLBASE = "http://192.168.1.102:5000/api/products";
const tBody = document.querySelector("#tabellaProdotti");

let H2 = document.querySelector("#prodottoNome");
let imag = document.querySelector("#prodottoImmagine");
let primoP = document.querySelector("#prodottoDescrizione");
let secondoP = document.querySelector("#prodottoPrezzo");
let terzoP = document.querySelector("#prodottoDisponibilita");

let divInfo = document.querySelector("#modale");


async function prendiProdotti() {
    const ris = await fetch(URLBASE);
    const prodotti = await ris.json();


    //METODO 1: 
    //     prodotti.forEach(prod => {
    //         const riga = creaRigaProdotto(prod);

    //         riga.addEventListener("click", () => {
    //             toggleModal();
    //             descrizioneProdotto(prod);
    //         })

    //         tBody.append(riga);
    //     });
    // }



    //METODO 2: 
    let rigue = prodotti.map(prod => creaRigaProdotto(prod)).join("");
    tBody.innerHTML = rigue;

    const tutti_tr = document.querySelectorAll("tr");


    tutti_tr.forEach((tdata, i) => {
        tdata.addEventListener("click", () => {
            toggleModal();

            descrizioneProdotto(prodotti[i - 1]);
        })

    });



}


function creaRigaProdotto(product) {
    return `
    <tr>
        <td><img src="${product.immagine}"></td>
        <td>${product.nome}</td>
        <td>${product.prezzo}</td>
        <td>${product.disponibilita}</td>
        
    </tr>`

}

prendiProdotti();



const divNascosto = document.querySelector("#modale");

async function toggleModal() {
    divNascosto.classList.toggle("nascosto");

}

const nascBtn = document.querySelector("#toggleNasc");

nascBtn.addEventListener("click", () => {
    toggleModal()
})



const equis = document.querySelector("#chiudi");

equis.addEventListener("click", () => {
    toggleModal()
})





function descrizioneProdotto(producto) {
    console.log(producto);

    H2.textContent = producto.nome;
    imag.src = producto.immagine;
    primoP.textContent = producto.descrizione;
    secondoP.textContent = producto.prezzo;
    terzoP.textContent = producto.disponibilita;

}