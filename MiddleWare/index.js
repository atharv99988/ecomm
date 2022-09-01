const CategoryValidator = require('./requestValidator').categoryCreateValidator
const ProductValidator = require('./requestValidator').productCheck
const userValidator = require('./userValidator')
const tokenValidator = require('./tokenValidator')

module.exports = {CategoryValidator,ProductValidator,userValidator,tokenValidator}