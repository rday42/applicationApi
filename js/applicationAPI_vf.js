function pays(){
	// Rendre les sous-divs (de la class="infoPays") visibles :
    const sousDivs = document.querySelectorAll('.infoPays');
    sousDivs.forEach(div => {
        div.style.display = 'block';
    });
    
    // Nom de pays saisi :
    let paysSaisi = document.getElementById("pays").value;
    //console.log(`Nom pays saisi : ${paysSaisi}`);

    // Utilisation de l'API :
    fetch('https://restcountries.com/v3.1/all')     // l'adresse de l'API (l'url) à interroger
        .then(response => {           	            // Première 'then' (étape 1) on gère les erreurs + on perse les données en json
            if (!response.ok) {
                throw new Error('Probleme API (fetch)');
            }
            return response.json();     // Convertir la réponse en JSON 
        })
        .then(countries => { 			// Deuxième 'then' (étape 2) on exploite les données
            // Boucle pour comparer le nom de pays saisi (converti en minuscule) avec les noms des pays de l'API (converti en minuscule aussi)
            for (country in countries){
                if((paysSaisi.toLowerCase() == countries[country].name.common.toLowerCase()) || (paysSaisi.toLowerCase() == countries[country].translations.fra.common.toLowerCase())){
                    document.getElementById("paysId").innerHTML = `<p style="color: #c0392b;">Pays</p>
                                                                   <p>${countries[country].name.common} / ${countries[country].name.official} / ${countries[country].translations.ara.official} </p>`;
                    document.getElementById("continent").innerHTML = `<p style="color: #c0392b;">Continent</p>
                                                                      <p>${countries[country].continents}</p>`;
                    document.getElementById("capital").innerHTML = `<p style="color: #c0392b;">Capital</p>
                                                                    <p>${countries[country].capital}</p>`;
                    document.getElementById("drapeau").innerHTML = `<p style="color: #c0392b;">Drapeau</p>
                                                                    <img src="${countries[country].flags.png}" />`;

                    for (money in countries[country].currencies){
                        document.getElementById("monnaie").innerHTML = `<p style="color: #c0392b;">Monnaie</p>
                                                                        <p>${countries[country].currencies[money].name}</p>`; 
                    }      
                    
                    let sousLangue = '';
                    for (const langue in countries[country].languages){                                                                    
                        sousLangue += `<p>${countries[country].languages[langue]}</p>`;
                    }
                    document.getElementById("langages").innerHTML = `<p style="color: #c0392b;">Langues officielles</p>                                                                    
                                                                    ${sousLangue}`;
                    
                    document.getElementById("population").innerHTML = `<p style="color: #c0392b;">Population</p>
                                                                       <p>${countries[country].population}</p>`;
                    document.getElementById("carteMaps").innerHTML = `<p style="color: #c0392b;">Carte Maps</p>
                                                                      <a href=${countries[country].maps.googleMaps} target="_blank">${countries[country].maps.googleMaps}</a>`;
                    document.getElementById("carteOpenStreetMaps").innerHTML = `<p style="color: #c0392b;">Carte Open Street Maps</p>
                                                                                <a href=${countries[country].maps.openStreetMaps} target="_blank">${countries[country].maps.openStreetMaps}</a>`;
                    
                    // Débogage 
                    console.log(`paysId : ${countries[country].name.common} / ${countries[country].name.official} / ${countries[country].translations.ara.official}`);
                    console.log(`continent : ${countries[country].continents}`);
                    console.log(`capital : ${countries[country].capital}`);
                    console.log(`drapeau : ${countries[country].flags.png}`);                
                    console.log(`monnaie : ${countries[country].currencies[money].name}`);                    
                    console.log(`langages : ${sousLangue}`);                     
                    console.log(`population : ${countries[country].population}`);
                    console.log(`carteMaps : ${countries[country].maps.googleMaps}`);
                    console.log(`carteOpenStreetMaps : ${countries[country].maps.openStreetMaps}`);
                }
            }	
        })
        .catch(error => {           // 'catch' pour gèrer l'échec de 'fetch'
            console.error('Il y a eu un problème avec la requête fetch :', error);
        })
        .finally(() => {		
            console.log('Opération terminée');
        });

}