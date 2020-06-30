// @ts-check

// @ts-ignore
import $ from 'https://jspm.dev/jquery@3.5.1/dist/jquery.slim.min.js';

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
            let $tr = $('<tr>');
            let $name = $('<td>');
            $name.addClass('name');
            if (item.alias == null) { // || item.alias.length > 8
                $name.append(item.name);
            } else {
                $name.append(`${item.name}（${item.alias}）`);
            }

            let $prob = $('<td>');
            $prob.addClass('probability');
            if (isUserDefinable) {
                let $input = $('<input>');
                $input.addClass('userDefined');
                $input.attr('name', item.name);
                $input.attr('type', 'number');
                $input.attr('min', '0');
                $input.attr('step', 'any');
                $input.attr('value', item.weight.toString());
                $input.attr('placeholder', item.weight.toString());
                $prob.append($input);
            } else {
                $prob.append(`${(item.probability * 100).toFixed(2)} %`);
            }

            $tr.append($name, $prob);
            return $tr
        });

    let $tbody = $('<tbody>');
    $tbody.append(...randomTrArray);

    let $thead = $('<thead>');
    let $tr = $('<tr>');

    let $name = $('<th>');
    $name.attr('id', 'nameTitle');
    $name.addClass('name');
    $name.attr('colSpan', 2);
    $name.append('地點');

    if (isUserDefinable) {
        let $btn = $('<button>');
        $btn.attr('id', 'submitBtn');
        $btn.append('權重設定完畢');
        $btn.addClass('btn');

        $name.append($btn);
    } else if ($('#submitBtn') != null) {
        $('#submitBtn').remove();
    }

    $tr.append($name);
    $thead.append($tr);

    let $oldTable = $('#probabilityList');

    let $newTable = $('<table>');
    $newTable.attr('id', 'probabilityList');
    $newTable.addClass('probabilityList');
    $newTable.append($thead, $tbody);

    $oldTable.replaceWith($newTable);
}

/**
 * Replace the text of #randomResult to the new string.
 * @param {string} name
 * @param {string=} alias
 */
export const replaceRandomResultText = (name, alias) => {
    let $oldRandomResult = $('#randomResult');

    let $newRandomResult = $('<header>');
    $newRandomResult.attr('id', 'randomResult');

    if (alias == null) {
        $newRandomResult.append(name);
    } else {
        // $newRandomResult.append(`${name}（${alias}）`);
        $newRandomResult.append(name, $('<br>'), `（${alias}）`);
    }

    $oldRandomResult.replaceWith($newRandomResult);
}