import Logger from "logplease";
const logger = Logger.create("config");

/**
 * Class representing configuration options.
 */
export default class Config {
  /**
   * Configuration options.
   * @type {Object}
   * @private
   * @property {Object} bindAddress - Configuration for bind address.
   * @property {string} bindAddress.desc - Description of the option.
   * @property {string} bindAddress.default - Default value of the option.
   * @property {Function[]} bindAddress.validators - Array of functions for validating the option.
   * @property {Object} logLevel - Configuration for log level.
   * @property {string} logLevel.desc - Description of the option.
   * @property {string} logLevel.default - Default value of the option.
   * @property {Function[]} logLevel.validators - Array of functions for validating the option.
   */
  #options = {
    bindAddress: {
      desc: "Address to bind the REST API on",
      default: `0.0.0.0:${process.env["PORT"] || 2000}`,
      validators: [],
    },
    logLevel: {
      desc: "Log level",
      default: "INFO",
      validators: [
        (value) =>
          Object.values(Logger.logLevels).includes(value) ||
          `Log level ${value} does not exist`,
      ],
    },
  };

  /**
   * Get the configuration options.
   * @returns {Object} The configuration options with validated values.
   */
  static getConfig() {
    const config = {};

    for (const [key, option] of Object.entries(this.prototype.#options)) {
      const envValue = process.env[key.toUpperCase()];
      const value = envValue !== undefined ? envValue : option.default;

      this.#validateOption(key, value, option.validators);

      config[key] = value;
    }

    Object.freeze(config);
    return config;
  }

  /**
   * Validate a configuration option.
   * @param {string} key - The option key.
   * @param {*} value - The option value to validate.
   * @param {Function[]} validators - Array of validator functions.
   * @private
   */
  static #validateOption(key, value, validators) {
    for (const validator of validators) {
      const result = validator(value);
      if (result !== true) {
        logger.error(result);
        process.exit(1);
      }
    }
  }
}
