/*jslint indent: 2 */
/*global window, jQuery, Handlebars, i18n, moment, document, Sanitize */

(function ($, Handlebars, i18n, moment) {
  "use strict";

  var util = {};


  /**
   * Update a <select> element's selected option,
   * then activates the jquery mobile event to refresh UI
   */
  util.jqmSetSelected = function (el, value) {
    var $select = $(el);

    /*jslint unparam: true*/
    $select.children().each(function (i, op) {
      if (op.getAttribute('value') === value) {
        op.setAttribute('selected', 'selected');
      }
    });
    /*jslint unparam: false*/

    $select.selectmenu('refresh');
  };


  /**
   * Create a 36 digit random ID.
   *
   * @return {String} the UUID.
   */
  util.createUUID = function () {
    var S4 = function () {
      return ('0000' + Math.floor(Math.random() * 0x10000).toString(16)).slice(-4);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  };


  util.registerHandlebarsHelpers = function () {

    /**
     * Clean up HTML before display for security reasons
     * (see https://github.com/gbirke/Sanitize.js)
     * Also, truncates the resulting string if it's too long.
     * This may leave bad formatting in 'relaxed' mode,
     * but we are using the strictest mode, which only
     * preserves the text content.
     *
     * @param {String} html The insecure string to sanitize.
     * @param {String} maxsize The length to trim the string at.
     * @return {String} The safe (will not be escaped) string to render in HTML.
     */
    Handlebars.registerHelper('sanitize', function (html, maxsize) {
      // The Sanitize module only works on DOM nodes, so we create one from the string...
      var node = $('<div>' + html + '</div>'),
        s = new Sanitize(),
        clean_fragment = s.clean_node(node[0]),
        // ...take the resulting fragment...
        tmpdiv = document.createElement('div'),
        text = '';

      // ...and wrap the fragment around a node...
      tmpdiv.appendChild(clean_fragment);
      // ...only to access its innerHTML property.
      // It would be simpler if Sanitize took a string.

      text = tmpdiv.innerHTML;

      if (maxsize && text.length > maxsize) {
        // truncate string to word boundary
        text = text.substr(0, maxsize - 1);
        text = text.substr(0, text.lastIndexOf(' '));
        text = text + '&hellip;';
      }

      return new Handlebars.SafeString(text);
    });


    /**
     * Display date strings or objects as yyyy-mm-dd
     * (takes timezone into account)
     *
     * @param {String} date The date string (or Date object) to display.
     * @return {String} The safe (will not be escaped) string to render in HTML.
     * Escaped or not, it doesn't make a real difference here.
     */
    Handlebars.registerHelper('asYMD', function (date) {
      if (date) {
        return new Handlebars.SafeString(moment(date).format('YYYY-MM-DD'));
      }
      return '';
    });


    /**
     * Make translations accessible from within Handlebars templates
     */
    Handlebars.registerHelper('t', function (i18n_key) {
      return new Handlebars.SafeString(i18n.t(i18n_key));
    });


    /**
     * Add value comparisions, see also
     * http://github.com/assemble/handlebars-helpers/blob/master/lib/helpers/helpers-comparisons.js
     * The operator must be quoted:
     *
     * {{#ifCond v1 '===' v2}}
     * ...
     * {{/ifCond}}
     */
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
      switch (operator) {
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
      }
    });

  };


  /**
   * Remove accents and convert to lower case
   *
   * @param {String} s the string to convert.
   * @return {String} the converted string.
   */
  util.accentFoldLC = function (s) {
    var map = [
        [new RegExp('[àáâãäå]', 'gi'), 'a'],
        [new RegExp('æ', 'gi'), 'ae'],
        [new RegExp('ç', 'gi'), 'c'],
        [new RegExp('[èéêë]', 'gi'), 'e'],
        [new RegExp('[ìíîï]', 'gi'), 'i'],
        [new RegExp('ñ', 'gi'), 'n'],
        [new RegExp('[òóôõö]', 'gi'), 'o'],
        [new RegExp('œ', 'gi'), 'oe'],
        [new RegExp('[ùúûü]', 'gi'), 'u'],
        [new RegExp('[ýÿ]', 'gi'), 'y']
      ];

    if (!s) {
      return s;
    }

    map.forEach(function (o) {
      var rep = function (match) {
        if (match.toUpperCase() === match) {
          return o[1].toUpperCase();
        }
        return o[1];
      };
      s = s.replace(o[0], rep);
    });
    return s.toLowerCase();
  };


  window.task_util = util;
}(jQuery, Handlebars, i18n, moment));

