var validator = require('../validation/validator');

/**
 * @param image
 * @constructor
 */
function Contrast(image) {
    
    this.image = image;

    /**
     * @type {string|null}
     */
    this.error = null;

    this.settings = {
        /**
         * @type {number|null}
         */
        contrast: null
    };

    this.contrast = this.contrast.bind(this);
}

/**
 * @summary contrast of the image.
 * @description supports a numeric value between `-100` and `100`
 * @param {string|number} contrast a number between `-100` and `100`
 * @returns {*} the operation
 */
Contrast.prototype.contrast = function (contrast) {

    this.error = validator.numberNotInRange('contrast', contrast, -100, 100);
    if (this.error) {
        return this.image;
    }

    this.settings.contrast = contrast === void 0 ? null : contrast;
    return this.image;
};

/**
 * @returns {string}
 */
Contrast.prototype.serialize = function () {

    var out = '';

    if (this.settings.contrast) {
        out += 'con_' + this.settings.contrast;
    }

    return {
        params: out,
        error: this.error
    };
};

/**
 * @type {Contrast}
 */
module.exports = Contrast;