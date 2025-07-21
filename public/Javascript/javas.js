const city = "Modena";
const apiKey = "c7a12b6f2d4b4e67b4d124004252107";  // Registrati su https://www.weatherapi.com

const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&lang=it`;

let datiMeteo = null;


//scrivo la data al posto di "data di oggi"
const oggi = new Date();
const opzioni_data_completa = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dataIT = oggi.toLocaleDateString('it-IT', opzioni_data_completa);
const dataCapitalizzata = dataIT.charAt(0).toUpperCase() + dataIT.slice(1);  // Prima lettera maiuscola
document.getElementById("dataCompleta").innerText = dataCapitalizzata;

//Nei bottoni dei prossimi giorni metto la data dei prossimi giorni
document.getElementById("giorno1").innerText = new Date(oggi.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('it-IT', { month: '2-digit', day: '2-digit' });
document.getElementById("giorno2").innerText = new Date(oggi.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT', {month: '2-digit', day: '2-digit' });
document.getElementById("giorno3").innerText = new Date(oggi.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT', {month: '2-digit', day: '2-digit' });
document.getElementById("giorno4").innerText = new Date(oggi.getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT', {month: '2-digit', day: '2-digit' });





//aggiungo le 24 box orarie
// aggiungo le 24 box orarie
document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("listaOre");

  for (let ora = 0; ora < 24; ora++) {
    const li = document.createElement("li");
    li.className = "box-oraria";
    li.innerHTML = `
      <p class="orario">${ora}</p>
      <div class="dato stato" id="statoBox${ora}">
        <img class="foto-meteo" id="fotoMeteo${ora}" src="Immagini/fotoQuadrata.png" alt="Icona meteo" width="40px" />
        <p id="ore${ora}stato">--</p>
      </div>
      <p id="ore${ora}temperatura">--</p>
      <p id="ore${ora}umidità">--</p>
      <p id="ore${ora}vento">--</p>
      <p id="ore${ora}pioggia">--</p>
    `;
    lista.appendChild(li);
  }

  caricaDati();
});

async function caricaDati() {
  try {
    const response = await fetch(url);
    datiMeteo = await response.json();
    console.log("Oggetto completo API:", datiMeteo);
    mostraGiorno(0);  // dopo aver caricato dati, aggiorna la pagina
  } catch (err) {
    console.error("Errore fetch meteo:", err);
  }
}

function mostraGiorno(giorno) {
  if (!datiMeteo) return console.error("Dati meteo non caricati");
  if (!datiMeteo.forecast.forecastday[giorno]) return console.error("Giorno fuori range");

  const giornoData = datiMeteo.forecast.forecastday[giorno];

  for (let i = 0; i < 24; i++) {
    const ora = giornoData.hour[i];

    // Icona e testo dentro lo statoBox
    const img = document.getElementById("fotoMeteo" + i);
    if (img) img.src = "https:" + ora.condition.icon;

    const stato = document.getElementById("ore" + i + "stato");
    if (stato) stato.textContent = ora.condition.text;

    const temp = document.getElementById("ore" + i + "temperatura");
    if (temp) temp.textContent = ora.temp_c + " °C";

    const umidita = document.getElementById("ore" + i + "umidità");
    if (umidita) umidita.textContent = ora.humidity + " %";

    const vento = document.getElementById("ore" + i + "vento");
    if (vento) vento.textContent = ora.wind_kph + " kph";

    const pioggia = document.getElementById("ore" + i + "pioggia");
    if (pioggia) pioggia.textContent = ora.precip_mm + " mm";
  }
}


document.getElementById('giorno0')?.addEventListener('click', () => mostraGiorno(0));
document.getElementById('giorno1')?.addEventListener('click', () => mostraGiorno(1));
document.getElementById('giorno2')?.addEventListener('click', () => mostraGiorno(2));
document.getElementById('giorno3')?.addEventListener('click', () => mostraGiorno(3));
document.getElementById('giorno4')?.addEventListener('click', () => mostraGiorno(4));



