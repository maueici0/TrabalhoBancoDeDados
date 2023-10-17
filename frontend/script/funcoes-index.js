const center = { lat: -6.727427043380443, lng: -38.449082137663765 };
let map;
let pontos = [];

async function obterPontos() {
    try {
        const response = await fetch('http://localhost:3000/ocorrencias');
        const data = await response.json();
        pontos = data.map(function (elemento) {
            console.log(elemento);
            return {
                id: elemento.id,
                titulo: elemento.titulo,
                tipo: elemento.tipo,
                data: elemento.data,
                hora: elemento.hora,
                localizacao: {
                    lat: elemento.localizacao.coordinates[0],
                    lng: elemento.localizacao.coordinates[1],
                },
            };
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function criarElementos() {
    const blocoConteudo = document.getElementsByClassName('bloco-conteudo');

    Array.from(blocoConteudo).forEach((blocoConteudo) => {
        pontos.forEach(element => {

            let data = new Date(element.data);
            data.setDate(data.getDate() + 1);

            const divOcorrencia = document.createElement('div');
            divOcorrencia.classList.add('ocorrencia');

            const blocoInfo = document.createElement('div');
            blocoInfo.classList.add('bloco');
            blocoInfo.classList.add('info');

            const tituloOcorrencia = document.createElement('p');
            tituloOcorrencia.classList.add('titulo-ocorrencia');
            tituloOcorrencia.textContent = element.titulo;

            const tipoOcorrencia = document.createElement('p');
            tipoOcorrencia.classList.add('tipo-ocorrencia');
            tipoOcorrencia.textContent = element.tipo;

            const blocoData = document.createElement('div');
            blocoData.classList.add('bloco');
            blocoData.classList.add('data');

            const dataOcorrencia = document.createElement('p');
            dataOcorrencia.classList.add('data-ocorrencia');
            dataOcorrencia.textContent = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();;

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
    });
}

function listarPontos() {
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
    });

    pontos.forEach(element => {
        var marker = new google.maps.Marker({
            title: element.titulo,
            position: new google.maps.LatLng(element.localizacao.lat, element.localizacao.lng),
            map: map
        });

        (function () {

            let contentString = '<div class="infoWindow">' +
                '<h1 id="firstHeading" class="infoWindow-Titulo">'+ element.titulo+ '</h1>' +
                '<div class="infoWindow-body">' +
                '<p>'+element.tipo+ ', <span class="infoWindow-data">'
                + element.data + ' ' + element.hora+'</span></p>' +
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        })();
    });
}

window.addEventListener('load', async () => {
    await obterPontos();
    criarElementos();
    listarPontos();
});

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center,
        zoom: 16,
        minZoom: 14,
        maxZoom: 18,
        disableDefaultUI: true,
    });
}

window.initMap = initMap;
