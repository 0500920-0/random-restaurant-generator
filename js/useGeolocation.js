// @ts-check

/**
 * @typedef {Object} Location
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * Get recent location by Geolocation API.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 * @return {Promise<Location>}
 */
export const locate = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            });
        }
        else {
            reject(ReferenceError('瀏覽器不支援 Geolocation 功能！'));
        }
    }).then((value) => value.coords);
};

/**
 * Get the distance between two location.
 * Ref: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 * @param {Location} point1
 * @param {Location} point2
 * @param {number} radius radius of the Earth
 */
export const getDistance = (point1, point2, radius = 6371000) => {
    /**
     * Convert degrees to radian.
     * @param {number} deg 
     */
    const toRad = (deg) => Math.PI * deg / 180;
    const [lat1, lat2, long1, long2] = [point1.latitude, point2.latitude, point1.longitude, point2.longitude].map(toRad);
    const delta_lat = lat2 - lat1;
    const delta_long = long2 - long1;

    const a = Math.sin(delta_lat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(delta_long / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
};