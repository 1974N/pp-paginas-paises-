const paisesData = [];

// Función para buscar el país
function buscarPais() {
    const countryName = document.getElementById('entrada').value.trim(); // Elimina espacios innecesarios

    if (countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('País no encontrado');
                }
                return response.json();
            })
            .then(data => {
                const countryInfo = data[0];

                if (countryInfo) {
                    const flag = countryInfo.flags.png; 
                    const name = countryInfo.name.common; 
                    const capital = countryInfo.capital ? countryInfo.capital[0] : 'No disponible'; 
                    const region = countryInfo.region; 
                    const subregion = countryInfo.subregion; 
                    const population = countryInfo.population; 
                    const area = countryInfo.area; 
                    const languages = countryInfo.languages ? Object.values(countryInfo.languages).join(', ') : 'No disponible'; 
                    const currencies = countryInfo.currencies ? Object.values(countryInfo.currencies).map(currency => currency.name).join(', ') : 'No disponible'; 

                    document.getElementById('paisNombre').innerText = name;
                    document.getElementById('bandera').src = flag;
                    document.getElementById('paisCapital').innerText = capital;
                    document.getElementById('paisRegion').innerText = region;
                    document.getElementById('paisSubregion').innerText = subregion;
                    document.getElementById('paisPoblacion').innerText = population;
                    document.getElementById('paisArea').innerText = area;
                    document.getElementById('paisIdiomas').innerText = languages;
                    document.getElementById('paisMonedas').innerText = currencies;
                    document.getElementById('resultado').innerHTML = ''; // Limpiar resultados anteriores
                }
            })
            .catch(error => {
                document.getElementById('resultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
            });
    } else {
        document.getElementById('resultado').innerHTML = '<p style="color: red;">Por favor, ingresa un país.</p>';
    }
}
function borrarPais(){
    document.getElementById('paisNombre').innerText = '';
    document.getElementById('bandera').src = '';
    document.getElementById('paisCapital').innerText = '';
    document.getElementById('paisRegion').innerText = '';
    document.getElementById('paisSubregion').innerText = '';
    document.getElementById('paisPoblacion').innerText = '';
    document.getElementById('paisArea').innerText = '';
    document.getElementById('paisIdiomas').innerText = '';
    document.getElementById('paisMonedas').innerText = '';
    document.getElementById('resultado').innerHTML = ''
}

// Asociar el evento de clic del botón
document.getElementById('buscar').addEventListener('click', buscarPais);

// Asociar el evento de teclado para el campo de entrada
document.getElementById('entrada').addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        buscarPais(); // Llamar a la función de búsqueda
    }
});

document.getElementById('borrar').addEventListener('click', borrarPais);


