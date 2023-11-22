let pontos = [];
const center = { lat: -6.727427043380443, lng: -38.449082137663765 };

async function obterPontos() {
    try {
        const response = await fetch('http://localhost:3000/ocorrencias');
        const data = await response.json();
        pontos = data.map(function (elemento) {
            const dataHora = new Date(elemento.data);
            const data = dataHora.toISOString().split('T')[0];
            const hora = dataHora.toISOString().split('T')[1].split('.')[0].substring(0, 5);
            return {
                id: elemento._id,
                titulo: elemento.titulo,
                tipo: elemento.tipo,
                data: data,
                hora: hora,
                localizacao: {
                    lat: elemento.localizacao.coordinates[1],
                    lng: elemento.localizacao.coordinates[0],
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
            dataOcorrencia.textContent = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();;

            const horaOcorrencia = document.createElement('p');
            horaOcorrencia.classList.add('hora-ocorrencia');
            horaOcorrencia.textContent = element.hora;

            const blocoBotoes = document.createElement('div');
            blocoBotoes.classList.add('bloco');
            blocoBotoes.classList.add('botoes');

            const botaoAtualizarOcorrencia = document.createElement('button');
            botaoAtualizarOcorrencia.classList.add('botao-ocorrencia');
            botaoAtualizarOcorrencia.textContent = "Atualizar";

            const linkAtualizar = document.createElement('a');
            linkAtualizar.href = `http://127.0.0.1:5500/frontend/html/atualizar.html?id=${element.id}`;

            const botaoExcluirOcorrencia = document.createElement('button');
            botaoExcluirOcorrencia.classList.add('botao-ocorrencia');
            botaoExcluirOcorrencia.textContent = "Excluir";

            linkAtualizar.appendChild(botaoAtualizarOcorrencia);

            blocoBotoes.appendChild(linkAtualizar);
            blocoBotoes.appendChild(botaoExcluirOcorrencia);

            blocoData.appendChild(dataOcorrencia);
            blocoData.appendChild(horaOcorrencia);

            blocoInfo.appendChild(tituloOcorrencia);
            blocoInfo.appendChild(tipoOcorrencia);

            divOcorrencia.appendChild(blocoInfo);
            divOcorrencia.appendChild(blocoData);
            divOcorrencia.appendChild(blocoBotoes);

            blocoConteudo.appendChild(divOcorrencia);



            botaoExcluirOcorrencia.addEventListener("click", () => {

                const id = element.id;
                const url = `http://localhost:3000/ocorrencias/${id}`;

                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(response => {
                    alert('Excluido com sucesso');
                    location.reload()
                })
                    .catch(error => alert('Falha ao excluir!'));

            });
        });
    });
}

const mapaNormal = document.getElementById("map-normal");
const mapaCalor = document.getElementById("map-calor");
const mapaMaps = document.getElementById("map");
const botaoMudar = document.getElementById("botao-mudar");

let controller = 0;
botaoMudar.addEventListener("click", () => {
    controller +=1;
    switch (controller) {
        case 1:
            mapaCalor.style.display = "inline";
            mapaNormal.style.display = "none";
            mapaMaps.style.display = "none";
            break;
        case 2:
            mapaCalor.style.display = "none";
            mapaNormal.style.display = "none";
            mapaMaps.style.display = "block";
            break;
        default:
            mapaCalor.style.display = "none";
            mapaNormal.style.display = "inline";
            mapaMaps.style.display = "none";
            break;
    }
    if (controller === 3) {
        controller = 0;
    }
});

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

function listarPontos() {

    pontos.forEach(element => {
        let marker = new google.maps.Marker({
            title: element.titulo,
            position: new google.maps.LatLng(element.localizacao.lat, element.localizacao.lng),
            map: map
        });

        (function () {

            let contentString = '<div class="infoWindow">' +
                '<h1 id="firstHeading" class="infoWindow-Titulo">' + element.titulo + '</h1>' +
                '<div class="infoWindow-body">' +
                '<p>' + element.tipo + ', <span class="infoWindow-data">'
                + element.data + ' ' + element.hora + '</span></p>' +
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
    mapaCalor.style.display = "none";
    mapaMaps.style.display = "none";
});

window.initMap = initMap;