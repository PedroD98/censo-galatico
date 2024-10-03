async function displayPlanets(url = 'https://swapi.dev/api/planets/') {

    await fetchApiData(url);

    planets.innerHTML = '';
    planetDetails.innerHTML = '';
    residentDetails.innerHTML = ''

    planetsArray.forEach((planet, index) => {

        let planetButton = document.createElement('button');

        planetButton.innerHTML = `${planet.name}`;
        planetButton.setAttribute('onclick', `displayPlanetDetails(${index})`);
        planetButton.setAttribute('style', 'margin: 3px;');

        planets.appendChild(planetButton);

    });

    previousPageButton.disabled = !previousPageUrl;
    nextPageButton.disabled = !nextPageUrl;
}

async function displaySearchedPlanet() {

    let planetSearched = document.getElementById('searchField').value;

    let currentUrl = 'https://swapi.dev/api/planets/'

    while (currentUrl) {

        await fetchApiData(currentUrl);
    
        for (i = 0; i < planetsArray.length; i++){

            if (planetSearched == planetsArray[i].name){
                displayPlanetDetails(i);
                return;
            }
        }

        currentUrl = nextPageUrl;
    }

    alert('Planeta não encontrado.');
    
}

async function displayPlanetDetails(index) {

    // let planetDetails = document.getElementById('planetDetails'); 
    planetDetails.innerHTML = '';
    
    let planet = planetsArray[index]; 

    planetDetails.innerHTML = `
                <p><h2>${planet.name}</h2></p>
                <p><strong>Clima:</strong> ${planet.climate}</p>
                <p><strong>População:</strong> ${planet.population}</p>
                <p><strong>Tipo de terreno:</strong> ${planet.terrain}</p>
                <p><strong>Residentes populares:</strong></p>
    `;

    displayResidentsDetails(planet.residents)

    
}


async function displayResidentsDetails(residentsArray) {

    residentDetails.innerHTML = '';

    if (residentsArray.length == 0) {

        residentDetails.innerHTML = '<p>Não há residentes populares neste planeta.</p>';
        return;
    }

    let residentsTable = document.createElement('table');
    residentsTable.setAttribute('border', '1');
    residentsTable.innerHTML = `
            <tr> 
                <th>Nome</th>
                <th>Data de nascimento</th>
            <tr>           
    `;

    for (let residentUrl of residentsArray){

        let residentRes = await fetch(residentUrl);
        let residentData = await residentRes.json();

        let row = document.createElement('tr');
        row.innerHTML = `
                    <td>${residentData.name}</td>
                    <td>${residentData.birth_year}</td>
        `;

        residentsTable.appendChild(row);
    }

    residentDetails.appendChild(residentsTable);
}