const center = { lat: -6.727427043380443, lng: -38.449082137663765 };

let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center,
        zoom: 16,
        minZoom: 14,
        maxZoom: 18,
        disableDefaultUI: true,
    });

    marker = new google.maps.Marker({
        map: map,
        position: center,
        draggable: true
    });

    map.addListener("click", (evt) => {
        addMarker(evt);
    });

}

function addMarker(evt) {
    marker.setPosition(evt.latLng);
}


async function salvar() {

    const obj = {
        titulo: document.getElementById('titulo-ocorrencia').value,
        tipo: document.getElementById('tipo-ocorrencia').value,
        data: document.getElementById('data-ocorrencia').value,
        hora: document.getElementById('hora-ocorrencia').value,
        localizacao: [
            marker.getPosition().lat(),
            marker.getPosition().lng()
        ]

    };

    fetch("http://localhost:3000/ocorrencias", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(response => { alert('Salvo com sucesso') })
        .catch(error => alert('Falha ao salvar!'));

}

const formulario = document.querySelector('.formulario-ocorrencia');
formulario.addEventListener('submit', async (e) => {
    console.log("teste");
    e.preventDefault();
    await salvar();
});

window.initMap = initMap;