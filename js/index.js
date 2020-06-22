// @ts-check

import RandomGenerator from './RandomizerGenerator.js';
import { locate, getDistance } from './useGeolocation.js'
import { initMap, addPin, removePin } from './OLMap.js';
import { refreshProbabilityList, replaceRandomResultText } from './view.js';

// Main function, called immediately.
(async () => {
  /**
   * @typedef {Object} jsonList
   * @property {string} version
   * @property {import('./RandomizerGenerator.js').RandomItem[]} list
   */

  /**
   * @type {jsonList}
   */
  const json = await fetch('./data/randomList.json').then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).catch((err) => {
    console.error(err);
  });
  console.log(`Random List Data Version: ${json.version}`);

  let randomObject = new RandomGenerator(json.list);

  refreshProbabilityList(randomObject.getProbabilityList());

  let olMap = initMap();

  let currentLocationLayer;

  document.querySelector('form.randomTypeRadio').addEventListener('input', async (evt) => {
    const randomType = /** @type {HTMLInputElement} */(evt.target).value;
    if (randomType === 'nearest') {
      try {
        const currentLocation = await locate();
        for (let item of json.list) {
          const itemLocation = { latitude: item.latitude, longitude: item.longitude };
          const distance = getDistance(currentLocation, itemLocation);
          if (distance < 500) {
            item.weight = item.defaultWeight * 4;
          } else if (distance < 1000) {
            item.weight = item.defaultWeight * 3;
          } else if (distance < 2000) {
            item.weight = item.defaultWeight * 2;
          } else {
            item.weight = item.defaultWeight;
          }
        }
        randomObject.reset(json.list);
        currentLocationLayer = addPin(currentLocation, olMap, { isCurrent: true });
      } catch (err) {
        if (err instanceof ReferenceError || err instanceof GeolocationPositionError) { // if Geolocation API is not supported
          /** @type {HTMLInputElement} */(document.getElementById('randomDefault')).value = 'default';
        } else { // rethrow XD
          throw err;
        }
      }
    } else { // if randomType === 'default'
      for (let item of json.list) {
        delete item.weight;
      }
      randomObject.reset(json.list);
      removePin(currentLocationLayer, olMap);
    }

    replaceRandomResultText('📍 請按右下角');

    for (const item of json.list) {
      if (item.pinLayer != null) {
        removePin(item.pinLayer, olMap);
      }
    }

    refreshProbabilityList(randomObject.getProbabilityList());

  });

  document.getElementById('fab').addEventListener('click', () => {

    try {
      const randomItem = randomObject.pick();

      if (randomItem.alias == null) {
        replaceRandomResultText(randomItem.name);
      } else {
        replaceRandomResultText(randomItem.name, randomItem.alias);
      }
      randomItem.pinLayer = addPin({ latitude: randomItem.latitude, longitude: randomItem.longitude }, olMap);

      refreshProbabilityList(randomObject.getProbabilityList());
    } catch (err) {
      if (err instanceof RangeError) { // if all places are used
        replaceRandomResultText(err.message);
      } else { // rethrow XD
        throw err;
      }
    }
  });

  document.getElementById('reset').addEventListener('click', () => {
    randomObject.reset();

    replaceRandomResultText('📍 請按右下角');

    for (const item of json.list) {
      removePin(item.pinLayer, olMap);
    }

    refreshProbabilityList(randomObject.getProbabilityList());
  });

  // @ts-ignore for debug only
  window.random = randomObject;
})();
