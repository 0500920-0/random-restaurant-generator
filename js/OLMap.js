import Feature from 'https://jspm.dev/ol/Feature?module';
import OLMap from 'https://jspm.dev/ol/Map?module';
import View from 'https://jspm.dev/ol/View?module';
import Point from 'https://jspm.dev/ol/geom/Point?module';
// import { Tile as TileLayer, Vector as VectorLayer } from 'https://jspm.dev/ol/layer.js?module';
import TileLayer from 'https://jspm.dev/ol/layer/Tile?module';
import VectorLayer from 'https://jspm.dev/ol/layer/Vector?module';
import { fromLonLat } from 'https://jspm.dev/ol/proj?module';
import OSM from 'https://jspm.dev/ol/source/OSM?module';
import VectorSource from 'https://jspm.dev/ol/source/Vector?module';
// import { Circle as CircleStyle, Fill, Stroke, Style } from 'https://jspm.dev/ol/style.js?module';
import CircleStyle from 'https://jspm.dev/ol/style/Circle?module';
import Fill from 'https://jspm.dev/ol/style/Fill?module';
import Stroke from 'https://jspm.dev/ol/style/Stroke?module';
import Style from 'https://jspm.dev/ol/style/Style?module';

/**
 * Pin the map by the given location.
 * Using Open Layers, Open Street Map.
 * Ref: https://openlayers.org/en/latest/examples/icon-color.html
 * Ref: https://openlayers.org/en/latest/examples/geolocation.html
 * @param {import('./useGeolocation.js').Location} location
 * @param {OLMap} olMap the initiated OLMap
 * @param {Object} option
 * @param {boolean=} option.isCurrent if it is the current location, the pin is red, else it is blue
 * @returns {VectorLayer} layer that can be removed
 */
export const addPin = (location, olMap, { isCurrent = false } = { isCurrent: false }) => {
    const point = fromLonLat([location.longitude, location.latitude]);

    let locationPin = new Feature({
        geometry: new Point(point),
    });

    locationPin.setStyle(new Style({
        image: new CircleStyle({
            radius: 6,
            fill: new Fill({
                color: isCurrent ? '#FF0000' : '#0000FF',
            }),
            stroke: new Stroke({
                color: '#000000',
                width: 2,
            }),
        }),
    }));

    const vectorSource = new VectorSource({
        features: [locationPin],
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    olMap.addLayer(vectorLayer);

    return vectorLayer;
}

/**
 * Initialize a map.
 * Using Open Layers, Open Street Map.
 * Ref: https://openlayers.org/en/latest/examples/icon-color.html
 * Ref: https://openlayers.org/en/latest/examples/geolocation.html
 * @param {import('./useGeolocation.js').Location=} center center of the map
 * @return {OLMap}
 */
export const initMap = (center = { latitude: 25.0180, longitude: 121.5384 }) => {
    const point = fromLonLat([center.longitude, center.latitude]);

    const osmLayer = new TileLayer({
        source: new OSM(),
    });

    return new OLMap({
        layers: [osmLayer],
        target: document.getElementById('olmap'),
        view: new View({
            center: point,
            zoom: 14,
        }),
    });
}

/**
 * Remove the pin.
 * Using Open Layers, Open Street Map.
 * Ref: https://openlayers.org/en/latest/apidoc/module-ol_PluggableMap-PluggableMap.html#removeLayer
 * @param {VectorLayer} layer
 * @param {OLMap} olMap the initiated OLMap
 */
export const removePin = (layer, olMap) => {
    olMap.removeLayer(layer);
}