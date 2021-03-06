const Processor = require('./src/Processor')
const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')
const optionSchema = require('./src/options.json')

module.exports = async function RemarkVueLoader (source, map, meta) {
  // default loader options
  const defaultOptions = {
    context: this.rootContext,
    cache: true,
    components: [],
    transformers: [],
    watchFiles: [],
    preprocess: source => source,
    beforetransform: (ast, api) => {},
    aftertransform: (ast, api) => {},
    postprocess: sfc => sfc
  }

  const options = Object.assign({}, defaultOptions, loaderUtils.getOptions(this))

  validateOptions(optionSchema, options, {
    name: 'remark-vue-loader',
    baseDataPath: 'options'
  })

  options.cache && this.cacheable(Boolean(options.cache))

  const callback = this.async()
  const processor = new Processor({
    source,
    loader: this,
    options: options
  })

  try {
    const result = await processor.run()
    callback(null, result, map, meta)
  } catch (err) {
    const error = typeof err === 'string' ? new Error(err) : err
    callback(error, source)
  }
}
