const paisesData = []
document.getElementById('buscar').addEventListener('click', function() {
    const countryName = document.getElementById('entrada').value;


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


                
                const flag = countryInfo.flags.png; 
                const name = countryInfo.name.common; 
                const capital = countryInfo.capital ? countryInfo.capital[0] : 'No disponible'; 
                const region = countryInfo.region; 
                const subregion = countryInfo.subregion; 
                const population = countryInfo.population; 
                const area = countryInfo.area; 
                const languages = Object.values(countryInfo.languages).join(', '); 
                const currencies = Object.values(countryInfo.currencies).map(currency => currency.name).join(', '); 


                document.getElementById('paisNombre').innerText = name;
                document.getElementById('bandera').src = flag;
                document.getElementById('paisCapital').innerText = capital;
                document.getElementById('paisRegion').innerText = region;
                document.getElementById('paisSubregion').innerText = subregion;
                document.getElementById('paisPoblacion').innerText = population;
                document.getElementById('paisArea').innerText = area;
                document.getElementById('paisIdiomas').innerText = languages;
                document.getElementById('paisMonedas').innerText = currencies;
            })
            .catch(error => {
                
                document.getElementById('resultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
            });
    } else {
        document.getElementById('resultado').innerHTML = '<p style="color: red;">Por favor, ingresa un país.</p>';
    }
});



