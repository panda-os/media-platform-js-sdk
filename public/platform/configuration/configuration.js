/**
 * @param {string} domain
 * @param {string} authenticationUrl
 * @constructor
 */
function Configuration(domain, authenticationUrl) {

    /**
     * @type {string}
     */
    this.host = domain;

    /**
     * @type {string}
     */
    this.authenticationUrl = authenticationUrl;
}

/**
 * @type {Configuration}
 */
module.exports = Configuration;