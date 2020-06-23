// @ts-check

/**
 * @typedef {Object} RandomItem
 * @property {string} name
 * @property {string=} alias
 * @property {number} defaultWeight
 * @property {number=} weight
 * @property {number} latitude
 * @property {number} longitude
 * @property {number=} distance
 * @property {any=} pinLayer
 */
/**
 * @typedef {Object} RandomProbabilityItem
 * @property {string} name
 * @property {string=} alias
 * @property {number} probability
 * @property {number} weight
 */

/** Make a new Random Generator with weights 1. */
export default class RandomizerGenerator {
  /** 
   *
   * @param {RandomItem[]} initialList
   */
  constructor(initialList) {

    /** @type {RandomItem[]} */
    this._initialList = [];

    /** @type {RandomItem[]} */
    this._randomList = [];

    /** @type {RandomItem[]} */
    this._pickedList = [];

    // /** @type {string} */
    // this._weightName;

    /** @type {number} */
    this._totalWeight = 0;
    this.reset(initialList);
  }

  /**
   * Using a new list for the Random Generator.
   * @param {RandomItem[]=} newList
   */
  reset(newList = this._initialList) {
    this._totalWeight = 0;
    for (let item of newList) {
      // if property 'weight' does not exist
      if (item.weight == null) {
        item.weight = item.defaultWeight;
      }
      this._totalWeight += item.weight;
    }
    this._initialList = [...newList];
    this._randomList = [...newList];
    this._pickedList = [];

  }

  /**
   * 
   * @returns {RandomItem}
   */
  pick() {
    if (this._randomList.length === 0) throw new RangeError('↙請重置生成器');
    const totalWeight = this._totalWeight;
    let randomNumber = Math.random() * totalWeight;
    let pickedItem;
    for (let item of this._randomList) {
      randomNumber -= item.weight;
      if (randomNumber < 0) {
        pickedItem = item;
        break;
      }
    }
    this._randomList.splice(this._randomList.findIndex(findItem => findItem === pickedItem), 1);
    this._pickedList.push(pickedItem);
    this._totalWeight -= pickedItem.weight;
    return pickedItem;
  }

  /**
   * @returns {RandomProbabilityItem[]}
   */
  getProbabilityList() {
    return this._randomList.map((item) => ({
      name: item.name,
      alias: item.alias ?? undefined,
      weight: item.weight,
      probability: item.weight / this._totalWeight,
    }));
  }

}