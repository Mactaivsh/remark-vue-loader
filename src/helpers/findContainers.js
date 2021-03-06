const selectAll = require('unist-util-select').selectAll

/**
 * @description find all code block nodes with specific name (in lang property)
 * @param {string} name code block name to find
 * @param {object} tree ast
 * @returns
 */
function findCodeBlock (name, tree) {
  return selectAll(`container`, tree).filter(node => node && node.name === name)
}

module.exports = findCodeBlock
