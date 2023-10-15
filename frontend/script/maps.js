const center = { lat: -6.727427043380443, lng: -38.449082137663765 };

export let map;

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