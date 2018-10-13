/**
 * merge()
 *
 * helper function
 *
 * Merges two arrays together, removing duplicates.
 *
 * @param {Array} a - First array.
 * @param {Array} b - Second array.
 * @param {String} p - A parameter to filter for to find uniqueness.
 */
const merge = (a, b, p) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);

export default merge;
