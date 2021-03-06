var validator = require('../validation/validator');

/**
 * @description Crops the image starting at the x, y pixel coordinates, along with the width and height options. The image is scaled according to the scale factor parameter before crop.
 * @param width
 * @param height
 * @param x
 * @param y
 * @param scale
 * @constructor Crop
 */
function Crop(width, height, x, y, scale) {

    this.name = 'crop';

    /**
     * @type {number}
     */
    this.x = null;

    /**
     * @type {number}
     */
    this.y = null;

    /**
     * @type {number}
     */
    this.width = Math.round(width);

    /**
     * @type {number}
     */
    this.height = Math.round(height);
    
    /**
     * @type {number|null}
     */
    this.scale = scale || null;

    this.coordinates(x, y, scale);
}


/**
 * @param {number?} x the x value
 * @param {number?} y the y value
 * @param {number?} scale The Scale factor. Valid values: (0:100].
 * @returns {*} the operation
 */
Crop.prototype.coordinates = function (x, y, scale) {
    if (arguments.length === 0) {
        this.x = null;
        this.y = null;
        this.scale = null;
        this.error = null;
        return this;
    }

    this.x = Math.round(x);
    this.y = Math.round(y);
    this.scale = (!scale || scale == 1) ? null : scale;
    return this;
};


/**
 * @summary The width constraint
 * @param {number} width a number greater than `0`
 * @param {number} height a number greater than `0`
 * @returns {*} the operation
 */
Crop.prototype.size = function (width, height) {
    this.width = Math.round(width);
    this.height = Math.round(height);
    return this;
};

/**
 * @returns {{params: string, error: *}}
 */
Crop.prototype.serialize = function () {

    var badScale = validator.numberNotInRange('crop scale factor', this.scale, 0, 100);
    var badX = validator.numberIsNotGreaterThan('crop x', this.x, 0);
    var badY = validator.numberIsNotGreaterThan('crop y', this.y, 0);
    var badWidth = validator.numberIsNotGreaterThan('width', this.width, 1);
    var badHeight = validator.numberIsNotGreaterThan('height', this.height, 1);

    if (badScale || badX || badY || badWidth || badHeight) {
        return {
            params: null,
            error: new Error([badScale, badX, badY, badWidth, badHeight])
        };
    }

    var out = this.name + '/' + 'w_' + this.width + ',h_' + this.height;

    out += ',x_' + (this.x || 0);

    if (out.length > 0) {
        out += ',';
    }

    out += 'y_' + (this.y || 0);

    if (this.scale && this.scale != 1) {
        if (out.length > 0) {
            out += ',';
        }

        out += 'scl_' + this.scale;
    }

    return {
        params: out,
        error: null
    };
};

/**
 * @type {Crop}
 */
module.exports = Crop;