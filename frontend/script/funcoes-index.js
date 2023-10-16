const center = { lat: -6.727427043380443, lng: -38.449082137663765 };

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center,
        zoom: 16,
        minZoom: 14,
        maxZoom: 18,
        disableDefaultUI: true,
    });

}

let pontos;

async function obterPontos() {
    fetch('http://localhost:3000/ocorrencias')
        .then((res) => res.json())
        .then((res) => {
            pontos = res.map(function (elemento) {
                return {
                    id: elemento.id,
                    titulo: elemento.titulo,
                    tipo: elemento.tipo,
                    data: elemento.data,
                    hora: elemento.hora,
                    localizacao: {
                        lat: elemento.localizacaoGeografica.coordinates[0],
                        lng: elemento.localizacaoGeografica.coordinates[1],
                    },
                }
            })
        });
}

function criarElementos() {

    const blocoConteudo = document.getElementsByClassName('bloco-conteudo');

    pontos.forEach(element => {
        const divOcorrencia = document.createElement('div');
        divOcorrencia.classList.add('ocorrencia');

        const blocoInfo = document.createElement('div');
        blocoInfo.classList.add('bloco');
        blocoInfo.classList.add('info');

        const tituloOcorrencia = document.createElement('p');
        tituloOcorrencia.classList.add('titulo-ocorrencia');
        tituloOcorrencia.textContent = element.titulo;

        const tipoOcorrencia = document.createElement('p');
        tituloOcorrencia.classList.add('tipo-ocorrencia');
        tipoOcorrencia.textContent = element.tipo;

        const blocoData = document.createElement('div');
        blocoData.classList.add('bloco');
        blocoData.classList.add('data');

        const dataOcorrencia = document.createElement('p');
        dataOcorrencia.classList.add('data-ocorrencia');
        dataOcorrencia.textContent = element.data;

        const horaOcorrencia = document.createElement('p');
        horaOcorrencia.classList.add('hora-ocorrencia');
        horaOcorrencia.textContent = element.hora;

        blocoData.appendChild(dataOcorrencia);
        blocoData.appendChild(horaOcorrencia);

        blocoInfo.appendChild(tituloOcorrencia);
        blocoInfo.appendChild(tipoOcorrencia);

        divOcorrencia.appendChild(blocoInfo);
        divOcorrencia.appendChild(blocoData);

        blocoConteudo.appendChild(divOcorrencia);

    });

}

function listarPontos() {
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        icon : icon
    });

    pontos.forEach(element => {
        
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(element.localizacao.lat, element.localizacao.lng),
            map: map,
            icon : icon
        });
})}

window.addEventListener('load', async () =>{
    await obterPontos();
    criarElementos();
    listarPontos();
});

window.initMap = initMap;