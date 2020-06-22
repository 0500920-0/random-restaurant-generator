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
  /** @type {RandomItem[]} */
  #initialList = [];

  /** @type {RandomItem[]} */
  #randomList = [];

  /** @type {RandomItem[]} */
  #pickedList = [];

  // /** @type {string} */
  // #weightName;

  /** @type {number} */
  #totalWeight = 0;

  /** 
   *
   * @param {RandomItem[]} initialList
   */
  constructor(initialList) {
    this.reset(initialList);
  }

  /**
   * Using a new list for the Random Generator.
   * @param {RandomItem[]=} newList
   */
  reset(newList = this.#initialList) {
    this.#totalWeight = 0;
    for (let item of newList) {
      // if property 'weight' does not exist
      if (item.weight == null) {
        item.weight = item.defaultWeight;
      }
      this.#totalWeight += item.weight;
    }
    this.#initialList = [...newList];
    this.#randomList = [...newList];
    this.#pickedList = [];

  }

  /**
   * 
   * @returns {RandomItem}
   */
  pick() {
    if (this.#randomList.length === 0) throw new RangeError('↙請重置生成器');
    const totalWeight = this.#totalWeight;
    let randomNumber = Math.random() * totalWeight;
    let pickedItem;
    for (let item of this.#randomList) {
      randomNumber -= item.weight;
      if (randomNumber < 0) {
        pickedItem = item;
        break;
      }
    }
    this.#randomList.splice(this.#randomList.findIndex(findItem => findItem === pickedItem), 1);
    this.#pickedList.push(pickedItem);
    this.#totalWeight -= pickedItem.weight;
    return pickedItem;
  }

  /**
   * @returns {RandomProbabilityItem[]}
   */
  getProbabilityList() {
    return this.#randomList.map((item) => ({
      name: item.name,
      alias: item.alias ?? undefined,
      weight: item.weight,
      probability: item.weight / this.#totalWeight,
    }));
  }

}