const center = { lat: -6.727427043380443, lng: -38.449082137663765 };

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center,
        zoom: 16,
        minZoom: 14,
        maxZoom: 18,
        disableDefaultUI: true,
    });

    const marker = new google.maps.Marker({
        position: center,
        map,
        title: "Hello World!",
    });

    const infowindow = new google.maps.InfoWindow({
        content: marker.title,
    });

    marker.addListener("dblclick", () =>{
       infowindow.open({
        anchor: marker,
        map,
       });
    });

}

window.initMap = initMap;