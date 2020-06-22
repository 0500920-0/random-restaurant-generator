// @ts-check

/**
 * 
 * @param {import('./RandomizerGenerator.js').RandomProbabilityItem[]} randomProbabilityList
 */
export const refreshProbabilityList = (randomProbabilityList) => {
    const randomTrArray = randomProbabilityList
        .sort((first, second) => second.probability - first.probability)
        .map((item) => {
            let $tr = document.createElement('tr');
            let $name = document.createElement('td');
            $name.classList.add('name');
            if (item.alias == null) {
                $name.append(item.name);
            } else {
                $name.append(`${item.name}（${item.alias}）`);
            }

            let $prob = document.createElement('td');
            $prob.classList.add('probability');
            $prob.append(`${(item.probability * 100).toFixed(2)} %`);

            $tr.append($name, $prob);
            return $tr
        });

    let $oldTbody = document.getElementById('probabilityList');

    let $newTbody = document.createElement('tbody');
    $newTbody.id = 'probabilityList'
    $newTbody.append(...randomTrArray);

    $oldTbody.replaceWith($newTbody);
}

/**
 * Replace the text of #randomResult to the new string.
 * @param {string} name
 * @param {string=} alias
 */
export const replaceRandomResultText = (name, alias) => {
    let $oldRandomResult = document.getElementById('randomResult');

    let $newRandomResult = document.createElement('header');
    $newRandomResult.id = 'randomResult';

    if (alias == null) {
        $newRandomResult.append(name);
    } else {
        // $newRandomResult.append(`${name}（${alias}）`);
        $newRandomResult.append(name, document.createElement('br'), `（${alias}）`);
    }

    $oldRandomResult.replaceWith($newRandomResult);
}