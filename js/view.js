// @ts-check

/**
 * 
 * @param {import('./RandomizerGenerator.js').RandomProbabilityItem[]} randomProbabilityList
 * @param {Object} option
 * @param {boolean=} option.isUserDefinable
 */
export const refreshProbabilityList = (randomProbabilityList, { isUserDefinable = false } = { isUserDefinable: false }) => {
    const randomTrArray = randomProbabilityList
        .sort((first, second) => second.probability - first.probability)
        .map((item) => {
            let $tr = document.createElement('tr');
            let $name = document.createElement('td');
            $name.classList.add('name');
            if (item.alias == null) { // || item.alias.length > 8
                $name.append(item.name);
            } else {
                $name.append(`${item.name}（${item.alias}）`);
            }

            let $prob = document.createElement('td');
            $prob.classList.add('probability');
            if (isUserDefinable) {
                let $input = document.createElement('input');
                $input.classList.add('userDefined');
                $input.name = item.name;
                $input.type = 'number';
                $input.value = item.weight.toString();
                $input.placeholder = item.weight.toString();
                $prob.append($input);
            } else {
                $prob.append(`${(item.probability * 100).toFixed(2)} %`);
            }

            $tr.append($name, $prob);
            return $tr
        });

    let $tbody = document.createElement('tbody');
    $tbody.append(...randomTrArray);

    let $thead = document.createElement('thead');
    let $tr = document.createElement('tr');

    let $name = document.createElement('th');
    $name.id = 'nameTitle';
    $name.classList.add('name');
    $name.colSpan = 2;
    $name.append('地點');

    if (isUserDefinable) {
        let $btn = document.createElement('button');
        $btn.id = 'submitBtn';
        $btn.append('權重設定完畢');
        $btn.classList.add('btn');

        $name.append($btn);
    } else if (document.getElementById('submitBtn') != null) {
        document.getElementById('submitBtn').remove();
    }

    $tr.append($name);
    $thead.append($tr);

    let $oldTable = document.getElementById('probabilityList');

    let $newTable = document.createElement('table');
    $newTable.id = 'probabilityList'
    $newTable.classList.add('probabilityList');
    $newTable.append($thead, $tbody);

    $oldTable.replaceWith($newTable);
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