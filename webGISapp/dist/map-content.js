 
   // 1. Adding OSM Base Map to Map > Div
   var map = L.map('map').setView([20.5937, 78.9629], 5);

   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   L.marker([20.5937, 78.9629]).addTo(map)
       .bindPopup('A pretty CSS popup.<br> Easily customizable.')
       .openPopup();


// --------------------------------------------------------------------------------------------------------------------------------------------------------------
   // 2. Adding Scale to the Base Map
   L.control.scale({maxWidth : 200} ).addTo(map);

   // 3. Function for full screen map view
   var mapId = document.getElementById('map');
   function fullScreenMap(){
       mapId.requestFullscreen();
   };


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
   // 4. Function using jQuery to display Mouse Coordinate 
$(document).ready(function() {
   map.on("mousemove", function (e){
           
       var latlng = e.latlng ;
       var lat = latlng.lat.toFixed(7);
       var lng = latlng.lng.toFixed(7);

       $('#mouseCoordinate').html('Decimal Degrees: '+ lat + ' , '+ lng);
   });
   
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
   // 5. Function using jQuery to display Zoom Level
   var zoomLevelDiv = $('#zoomLevel');

   map.on('zoomend', function() {
     var zoomLevel = map.getZoom();
     zoomLevelDiv.text('Zoom Level: ' + zoomLevel);
   });
 
   map.on('zoomin zoomout', function() {
     var zoomLevel = map.getZoom();
     zoomLevelDiv.text('Zoom Level: ' + zoomLevel);
   });   


// -------------------------------------------------------------------------------------------------------------------------------------------------------------   
   // 6. Function using jQuery to display geocoding search & Reasult
   var searchInput = $('#searchInput');
   var clearButton = $('#clearButton');
   var suggestionContainer = $('#suggestionContainer');
   var suggestionList = $('#suggestionList');
   var searchButton = $('#searchButton');
   var selectedLocation = null;
 
   searchInput.on('input', function() {
     var query = searchInput.val().trim();
     if (query) {
       getSuggestions(query);
       clearButton.show();
     } else {
       suggestionContainer.hide();
       clearButton.hide();
     }
   });
 
   clearButton.on('click', function() {
     searchInput.val('');
     clearButton.hide();
     suggestionContainer.hide();
   });
 
   suggestionList.on('click', 'li', function() {
     var location = $(this).text();
     searchInput.val(location);
     selectedLocation = location;
     suggestionContainer.hide();
   });
 
   searchButton.on('click', function() {
     var query = searchInput.val().trim();
     if (query) {
       if (selectedLocation) {
         query = selectedLocation;
       }
       searchLocation(query);
     }
   });
 
   searchInput.on('keydown', function(e) {
     if (e.keyCode === 13) {
       searchButton.trigger('click');
     }
   });
 
   function getSuggestions(query) {
     var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(query);
 
     $.getJSON(url, function(data) {
       suggestionList.empty();
       if (data.length > 0) {
         var results = data.slice(0, 5);
         results.forEach(function(result) {
           var location = result.display_name;
           var li = $('<li></li>').text(location);
           suggestionList.append(li);
         });
         suggestionContainer.show();
       } else {
         suggestionContainer.hide();
       }
     });
   }
 
   function searchLocation(query) {
     var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(query);
 
     $.getJSON(url, function(data) {
       if (data.length > 0) {
         var lat = parseFloat(data[0].lat);
         var lon = parseFloat(data[0].lon);
         zoomToLocation(lat, lon);
       } else {
         alert('Location not found.');
       }
     });
   }
 
   function zoomToLocation(lat, lon) {
     map.setView([lat, lon], 13);
   }










// -------------------------------------------------------------------------------------------------------------------------------------------------------------   
   // 7. Function using jQuery to display Polyline Measurement draw Control & Reasult   



});
// Document.ready closed
//