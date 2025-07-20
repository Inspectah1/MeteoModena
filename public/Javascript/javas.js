const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5750af74a1msh9003e89777ddb18p156747jsn6eb5dacc3443',  //rubala pure tanto è piano free
		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
	}
};

const city = "Modena";

async function caricaMeteo() {
	const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3&lang=it`;

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log("Dati Meteo:", data);
		aggiornaPagina(data);
	} catch (error) {
		console.error("Errore fetch meteo:", error);
	}
}

function aggiornaPagina(data) {
	// esempio semplice per mostrare dati giorno 0
	const giorno0 = data.forecast.forecastday[0];

	for (let i = 0; i < 24; i++) {
		const ora = giorno0.hour[i];
		document.getElementById("fotoMeteo" + i).src = "https:" + ora.condition.icon;
		document.getElementById("ore" + i + "stato").textContent = ora.condition.text;
		document.getElementById("ore" + i + "temperatura").textContent = "Temperatura: " + ora.temp_c + " °C";
		document.getElementById("ore" + i + "umidità").textContent = ora.humidity + " %";
		document.getElementById("ore" + i + "pioggia").textContent = ora.precip_mm + " mm";
	}
}

document.getElementById('oggi').addEventListener('click', () => mostraGiorno(0));
document.getElementById('domani').addEventListener('click', () => mostraGiorno(1));
document.getElementById('dopodomani').addEventListener('click', () => mostraGiorno(2));

let datiMeteo = null;

async function caricaDati() {
	const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3&lang=it`;
	try {
		const response = await fetch(url, options);
		datiMeteo = await response.json();
		mostraGiorno(0);
	} catch (err) {
		console.error(err);
	}
}

function mostraGiorno(giorno) {
	if (!datiMeteo) {
		console.error("Dati meteo non caricati");
		return;
	}
	if (!datiMeteo.forecast.forecastday[giorno]) {
		console.error("Giorno fuori range");
		return;
	}

	const giornoData = datiMeteo.forecast.forecastday[giorno];
	for (let i = 0; i < 24; i++) {
		const ora = giornoData.hour[i];
		document.getElementById("fotoMeteo" + i).src = "https:" + ora.condition.icon;
		document.getElementById("ore" + i + "stato").textContent = ora.condition.text;
		document.getElementById("ore" + i + "temperatura").textContent = ora.temp_c + " °C";
		document.getElementById("ore" + i + "umidità").textContent = "Umidità " + ora.humidity + " %";
		document.getElementById("ore" + i + "pioggia").textContent = "Precipitazioni " + ora.precip_mm + " mm";
	}
}


// Al caricamento pagina
caricaDati();
