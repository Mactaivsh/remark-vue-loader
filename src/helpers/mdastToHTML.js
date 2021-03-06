const unified = require('unified')
const HTMLStringify = require('rehype-stringify')
const mdastToHast = require('remark-rehype')

/**
 * @description transform mdast to hast and stringify to html string
 * @param {object} mdast markdown ast
 * @returns
 */
async function mdastToHTML (mdast) {
  return new Promise((resolve, reject) => {
    try {
      unified()
      .use(mdastToHast, {
        allowDangerousHTML: true
      })
      .run(mdast, (err, newAst) => {
        /* istanbul ignore next */
        if (err) reject(err)
        const html = unified()
          .use(HTMLStringify, {
            allowDangerousCharacters: true,
            allowDangerousHTML: true
          })
          .stringify(newAst)
        resolve(html)
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = mdastToHTML
