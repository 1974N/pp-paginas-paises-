function buscarPais() {
    const countryName = document.getElementById('entrada').value.trim(); 

    if (countryName) { 
        document.getElementById('resultado').innerHTML = '<p style="color: blue;">Cargando...</p>';

        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('País no encontrado');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    throw new Error('No se encontró el país.');
                }
                const countryInfo = data[0]; 

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
                document.getElementById('paisCapital').innerText = `Capital: ${capital}`;
                document.getElementById('paisRegion').innerText = `Región: ${region}`;
                document.getElementById('paisSubregion').innerText = `Subregión: ${subregion}`;
                document.getElementById('paisPoblacion').innerText = `Población: ${population}`;
                document.getElementById('paisArea').innerText = `Área: ${area} km²`;
                document.getElementById('paisIdiomas').innerText = `Idiomas: ${languages}`;
                document.getElementById('paisMonedas').innerText = `Monedas: ${currencies}`;

                document.getElementById('resultado').innerHTML = '';

                const tarjeta = document.querySelector('.tarjeta');
                tarjeta.classList.remove('tarjetaCeleste', 'tarjetaVerde', 'tarjetaRoja', 'tarjetaAzul');

                if (name.toLowerCase() === 'argentina') {
                    tarjeta.classList.add('tarjetaCeleste');
                }
                if (name.toLowerCase() === 'brazil') {
                    tarjeta.classList.add('tarjetaVerde');
                }
                if (name.toLowerCase() === 'spain') {
                    tarjeta.classList.add('tarjetaRoja');
                }
                if (name.toLowerCase() === 'italy') {
                    tarjeta.classList.add('tarjetaAzul');
                }

            })
            .catch(error => {
                document.getElementById('resultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
            });
    } else {
        document.getElementById('resultado').innerHTML = '<p style="color: red;">Por favor, ingresa un país.</p>';
    }
}


function borrarDatos() {

    document.getElementById('paisNombre').innerText = '';
    document.getElementById('paisCapital').innerText = '';
    document.getElementById('paisRegion').innerText = '';
    document.getElementById('paisSubregion').innerText = '';
    document.getElementById('paisPoblacion').innerText = '';
    document.getElementById('paisArea').innerText = '';
    document.getElementById('paisIdiomas').innerText = '';
    document.getElementById('paisMonedas').innerText = '';
    
    document.getElementById('bandera').src = '';
    
    document.getElementById('resultado').innerHTML = '';

    const tarjeta = document.querySelector('.tarjeta');
    tarjeta.classList.remove('tarjetaCeleste', 'tarjetaVerde', 'tarjetaRoja', 'tarjetaAzul');
}


document.getElementById('buscar').addEventListener('click', buscarPais);
document.getElementById('entrada').addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        buscarPais(); 
    }
});


document.getElementById('borrar').addEventListener('click', borrarDatos);
