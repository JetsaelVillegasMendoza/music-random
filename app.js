let listaArtistas = JSON.parse(localStorage.getItem('listaArtistas')) || [];  // Carga los datos del localStorage, o un array vacío si no hay nada
let nuevosArtistas = [];  // Solo almacena los nombres nuevos agregados después del reinicio

console.log("Todos los artistas: " + listaArtistas);
console.log("Nuevos artistas: " + nuevosArtistas);

let listaArtistasMostrados = document.getElementById("listaArtistas");
let listaArtistasSorteados = [];
let artistaMostrado = document.getElementById("resultado");

function agregarArtista() {
    let nombreArtista = document.getElementById("artista").value.trim(); 
    // Expresión regular modificada para aceptar letras, números y algunos caracteres especiales
    let regex = /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s\.,-]+$/; 
    
    if (nombreArtista === "") {
        alert("Por favor, inserte un nombre.");
        
    } else if (!regex.test(nombreArtista)) {
        alert("El nombre solo puede contener letras, números y algunos caracteres especiales (como . , -).");
        document.getElementById("artista").value = "";
        
    } else if (listaArtistas.includes(nombreArtista.toLowerCase())) {  // Verifica si el nombre ya existe en la lista (sin distinguir entre mayúsculas y minúsculas)
        alert("Este nombre ya ha sido registrado.");
        document.getElementById("artista").value = "";
        
    } else {
        nombreArtista = nombreArtista.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

        listaArtistas.push(nombreArtista);  // Guarda en el array global de todos los artistas
        nuevosArtistas.push(nombreArtista); // Guarda solo los nuevos agregados en la lista visible

        console.log("Todos los artistas: " + listaArtistas);
        console.log("Nuevos artistas: " + nuevosArtistas);

        document.getElementById("artista").value = "";
        actualizarLista(); // Actualiza solo los nombres nuevos en pantalla
        guardarEnLocalStorage(); // Guarda la lista en el localStorage
    }
}

function actualizarLista() {
    listaArtistasMostrados.innerHTML = ""; // Limpia la lista visible

    // Muestra solo los nuevos artistas agregados después del reinicio
    for (let artista of nuevosArtistas) {
        let listaNombre = document.createElement("li");
        listaNombre.textContent = artista;           
        listaArtistasMostrados.appendChild(listaNombre);
    }
}

function sortearArtista() {
    if (listaArtistas.length === 0) {
        alert("No hay ningún nombre disponible.");
        return;
    }

    if (listaArtistasSorteados.length === listaArtistas.length) {
        alert("Todos los nombres han sido sorteados.");
        reiniciarPrograma(); 
        return;
    }

    let artistaSorteado = "";

    while (artistaSorteado === "" || listaArtistasSorteados.includes(artistaSorteado)) {
        let indiceSorteado = Math.floor(Math.random() * listaArtistas.length);                
        artistaSorteado = listaArtistas[indiceSorteado];
    }

    listaArtistasSorteados.push(artistaSorteado); 
    artistaMostrado.innerHTML = artistaSorteado; // Muestra el artista sorteado
    listaArtistasMostrados.innerHTML = "";
}

function reiniciarPrograma(){
    artistaMostrado.innerHTML = ""; // Borra el nombre sorteado en pantalla
    listaArtistasMostrados.innerHTML = ""; // Borra la lista visible
    listaArtistasSorteados = []; // Reinicia la lista de sorteados
    nuevosArtistas = []; // Vacía la lista de nuevos artistas visibles, pero NO la de memoria
    guardarEnLocalStorage(); // Guarda la lista actualizada en el localStorage
}

function guardarEnLocalStorage() {
    localStorage.setItem('listaArtistas', JSON.stringify(listaArtistas)); // Guarda la lista completa en el localStorage
}
