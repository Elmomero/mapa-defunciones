import statesData from '../data/EcuadorStates.js';
import features from './featuresEc.js';

const map = L.map("mapid").setView([-0.914187, -85.69714], 6);
let geojson;
let info = L.control();
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    minZoom: 6,
    maxZoom: 7,
  }
).addTo(map);
statesData.features = features;
L.geoJson(statesData).addTo(map);
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
//////////////////////////////////////////////////
function style({properties}) {
    return {
        fillColor: getColor(properties.anios.A2020),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);

///////////////////////////////////////////////////////
function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);

}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();

}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer) {
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);



info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
let año = 2020;
let posicion = 12;
info.update = function (props) {
    this._div.innerHTML = `<h4>Muertes de niños año ${año}</h4>` +  (props ?
        '<b>' + props.nombre + '</b><br />' + Object.values(props.anios)[posicion] + ' personas '
        : 'Pasa el raton por encima');
};
document.body.addEventListener('click',(e)=>{
    if(e.target.matches('.nav__link--inside')){
        
        function estilo({properties}){
            let muertesAño = Object.values(properties.anios)[posicion];
            return {
                fillColor: getColor(muertesAño),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }
        L.geoJson(statesData, {
            style: estilo,
            onEachFeature: onEachFeature
        }).addTo(map);
        año = e.target.dataset.year;
        posicion = e.target.dataset.pos;
        info.update = function (props) {
            this._div.innerHTML = `<h4>Muertes de niños año ${año}</h4>` +  (props ?
                '<b>' + props.nombre + '</b><br />' + Object.values(props.anios)[posicion] + ' personas '
                : 'Pasa el raton por encima');
        };
        info.addTo(map);
        
    }
})
info.addTo(map);
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);