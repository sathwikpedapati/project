document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map and set its view to a specific location
    var map = L.map('map').setView(coordinates, 13);

    // Add a tile layer (OpenStreetMap as an example)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker
    var marker = L.marker(coordinates).addTo(map);
    marker.bindPopup("<h4>Hello Listings !</h4>")
    .openPopup();

    // Add a click event to the map
    map.on('click', function (e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        
        L.marker([lat, lng]).addTo(map)
            .bindPopup("You clicked at " + lat + ", " + lng)
            .openPopup();
        
    });
});