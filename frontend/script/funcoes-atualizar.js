const center = { lat: 0, lng: 0 };
let map;
let marker;
let lat;
let markerLat;
let lng;
let markerLng;
let ponto;

const urlCompleta = window.location.href;
const partes = urlCompleta.split("=");
const id = partes[1];

async function obterPontos() {
    try {
        const response = await fetch(`http://localhost:3000/ocorrencias/${id}`);
        ponto = await response.json();
        lat = ponto.localizacao.coordinates[0];
        lng = ponto.localizacao.coordinates[1];
        const novoCentro = new google.maps.LatLng(lng, lat);
        map.setCenter(novoCentro);
        marker.setPosition(novoCentro);

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

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
    markerLat = marker.getPosition().lat();
    markerLng = marker.getPosition().lng();
}



async function atualizar() {

    let dataLocal = new Date(document.getElementById('data-ocorrencia').value);
    const dataUTC = new Date(dataLocal.getTime() - dataLocal.getTimezoneOffset() * 60000);

    const obj = {
        titulo: document.getElementById('titulo-ocorrencia').value,
        tipo: document.getElementById('tipo-ocorrencia').value,
        data: dataUTC,
        localizacao: {
            type: "Point",
            coordinates: [
                markerLng,
                markerLat
            ]
        }
    };
    fetch(`http://localhost:3000/ocorrencias/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(response => {
        alert('Atualizado com sucesso');
        const botaoCancelar = document.getElementById("botao-pagina");
        botaoCancelar.textContent = "Voltar";
    })
        .catch(error => alert('Falha ao atualizar!'));

}

const formulario = document.querySelector('.formulario-ocorrencia');
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    await atualizar();
});


window.addEventListener('load', async () => {
    await obterPontos();

    const tituloOcorrencia = document.getElementById("titulo-ocorrencia");
    tituloOcorrencia.value = ponto.titulo;

    const tipoOcorrencia = document.getElementById("tipo-ocorrencia");
    tipoOcorrencia.value = ponto.tipo;

    const dataOcorrencia = document.getElementById("data-ocorrencia");
    const data = new Date(ponto.data).toISOString().slice(0, 16)
    dataOcorrencia.setAttribute('value', data);

});

window.initMap = initMap;