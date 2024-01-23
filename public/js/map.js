let dresden = [51.050407, 13.737262]
let markers = new Array();

// map setup
var map = L.map('map', {attributionControl: false, popupMovable: true, zoomControl: false} ).setView(dresden, 15);
var myAttrControl = L.control.attribution().addTo(map);

myAttrControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | <a href="https://github.com/CartoDB/cartodb/">CartoDB</a>');

// create layers
const attribution = 'Groupe B: Prototype'

var normal = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
subdomains: 'abcd',
	maxZoom: 19,
    attribution: attribution
}).addTo(map);

var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
subdomains: 'abcd',
	maxZoom: 19,
    attribution: attribution
});

var white = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: attribution
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
   maxZoom: 19,
   subdomains:['mt0','mt1','mt2','mt3'],
   attribution: attribution
});

var baseMaps = {
    "White": white,
    "Normal": normal,
    "Dark": dark,
    "Satellit": googleSat 
};

L.control.layers(baseMaps).addTo(map);
L.control.zoom({position: 'bottomright'}).addTo(map);
var markersLayer = new L.LayerGroup();	//layer contain searched elements

//get data from server
$.ajax({
    url: 'http://localhost:3000/data',
    contentType: 'application/json',
    success: function setIcons(res) {
        res.forEach(function (dataitem) {
        let marker = L.marker(dataitem.coordinate).addTo(map)
        .bindPopup("<a class='buttom_about_sport' title='read more'> "+dataitem.name + "</a><hr>"+ printPhoto(dataitem.photo_of_location, dataitem.location_name) +"Groups: <br>"+ printAllgroups(dataitem.groups), {closeOnClick: false, autoClose: false});
        var newIcon = new L.Icon({
            iconUrl: dataitem.icon,
            iconSize: [30, 50],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        marker.setIcon(newIcon);
        markers.push(marker);
        });
    }   
});


//search part
map.addLayer(markersLayer);
var controlSearch = new L.Control.Search({
    position:'topleft',		
    layer: markersLayer,
    initial: false,
    zoom: 12,
    marker: false,
});
map.addControl(controlSearch);

//asking location
map.locate({setView: true, maxZoom: 16});
map.on('locationfound', e => {
    //var radius = e.accuracy;
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are here!!!",{
            popupmovable:false}).setIcon(
            new L.Icon({
            iconUrl: "img/you.svg",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })).openPopup();
    //L.circle(e.latlng, radius).addTo(map).setStyle({color: 'black'});;
});


// other functions
function printAllgroups(groups) {
    let end_groups_text = "";
    groups.forEach((group) => {
        let buttom_enroll = "<a class='buttom_e'> enroll </a>";
        let buttom_read_more = "<a class='buttom_rm'> read more </a>";
        end_groups_text = end_groups_text+ "<br><strong>" + group.group_name + "</strong><br>" + group.day+ " " + group.time  + "<br>  cost: " + group.cost + " by " + group.tranier_name + 
        "<br>" + buttom_read_more + buttom_enroll + "<br>"; 
        })
    return end_groups_text;
}

function printPhoto(photoURL, location_name){
    if (photoURL.length === 0) {
        return "<h2>"+location_name+'</h2>';
    } else {
        return "<h2>"+location_name+'</h2><img loading="lazy" src='+ photoURL+ ' alt="photo of location" width="200px"> <hr>'
    }
}