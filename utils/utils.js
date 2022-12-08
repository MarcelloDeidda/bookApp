// Swap name and surname order
function swapNames(str) {
    return (str.substring(str.indexOf(" ") + 1, str.length)) + " " + str.substring(0, str.indexOf(" "));
}

// Sort list of names by surname
function sortBySurname(list) {
    for (let i = 0; i < list.length; i++) {
        list[i] = swapNames(list[i]);
    }
    result_list = [...new Set(list.sort())];
    return result_list.map(elem => swapNames(elem));
}

module.exports.sortBySurname = sortBySurname;