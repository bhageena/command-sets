// jshint esversion: 9

const source = 'https://verse.pawelad.xyz/projects/';
/**
 * @description Translates text to a given language
 * @param {ParamsType} params list of command parameters
 * @param {?string} commandText text message
 * @param {!object} [secrets = {}] list of secrets
 * @return {Promise<SlackBodyType>} Response body
 */
async function _command(params, commandText, secrets = {}) {

  const axios = require('axios');
  const {
    project = 'mysql',
  } = params;
  let result = '';
  try {
    const url = `${source}${project}/?format=json`;
    response = await axios.get(url);
    if (response.status !== 200) {
      result = `Couldn't get result`;
    }
    result = response.data.latest;
  } catch (err) {
    result = `Couldn't get result`;
  }


  return {
    response_type: 'in_channel', // or `ephemeral` for private response
    text: result
  };
}


/**
 * @typedef {object} SlackBodyType
 * @property {string} text
 * @property {'in_channel'|'ephemeral'} [response_type]
 */

const main = async ({
  __secrets = {},
  commandText,
  ...params
}) => ({
  body: await _command(params, commandText, __secrets)
});
module.exports = main;