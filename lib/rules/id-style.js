var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'id-style',
    on: ['attr'],
    filter: ['id']
};

module.exports.lint = function (attr, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    var v = attr.value;

    var ignore = opts['id-class-ignore-regex'];
    if ((new RegExp(ignore)).test(v)) { return []; }

    var verify = knife.getFormatTest(format);
    if (verify(v)) { return []; }

    return new Issue('E011', attr.valueLineCol, { format: format, id: v });
};