function search(param) {
    const query = document.getElementById("search").value.toLowerCase();
    const travelObject = fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            const result = searchObj(data, query);
            console.log(result);
            displayResults(result);
        });
}

function searchObj(obj, query) {
    for (const key in obj) {
        if (key.toLowerCase().includes(query.toLowerCase())) {
            return [key, obj[key]];
        }
    }
    return null; // or return a default value if not found
}

function displayResults(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (results[0] == "beaches" || results[0] == "temples") {
        results[1].forEach(item => {
            resultsDiv.innerHTML += `
        <div class='card-container'>
          <h2 class='card-title'>${item.name}</h2>
          <div class='card-image'>
          <img src="${item.imageUrl}" alt="${item.name}">
          </div>
          <p class='card-detail'>${item.description}</p>
        </div>`;
        });
    } else if (results[0] == "countries") {
        const countries = results[1]; //
        countries.forEach(country => {
            country.cities.forEach(city => {
                resultsDiv.innerHTML += `
          <div class='card-container'>
            <h2 class='card-title'>${city.name}</h2>
            <div class='card-image'>
            <img  src="${city.imageUrl}" alt="${city.name}">
            </div>
            <p class='card-detail'>${city.description}</p>
          </div>`;
            });
        });
    }
}

function reset() {
    document.querySelector('input[type="text"]').value = "";
    document.getElementById("results").innerHTML = "";
}
