/* PHEDEX.Configuration
* This is Phedex configuration component for static information. The configuration file has uri 
* of local and web HTML source files that has static information about Phedex.
*/
PHEDEX.namespace('Configuration');
PHEDEX.Configuration = (function() {
    var _categories = {};

    /**
    * @method _addCategory
    * @description This adds new category (similar to widget) within static information option. Each category 
    * has html source information along with div ids from which information has to be fetched and shown on UI
    * @param {String} unique id to identify the category internally
    * @param {String} displayname of the category to be used for UI
    */
    var _addCategory = function(id, displayname) {
        if (!_categories[id]) {
            var category = {};
            category['id'] = id;
            category['name'] = displayname;
            category['sources'] = {};
            _categories[id] = category;
            YAHOO.log('Category ' + displayname + ' added', 'info', 'Phedex.Configuration');
        }
    };

    /**
    * @method _addSource
    * @description This adds source information for the given category. The source includes URI of source file, 
    * source type (local file or web file) ,div ids within source file from which information has to be fetched
    * @param {String} catid is the id of the category to which source information has to be added
    * @param {String} sourcename is unique name to identify source within a category
    * @param {String} type is type of source file (local or web)
    * @param {String} path is the URI of the source HTML file
    * @param {Array} divids is array of unique divids of elements within source file
    */
    var _addSource = function(catid, sourcename, sourcecfg) {
        var category = _categories[catid];
        if (category) {
            if (!category.sources[sourcename]) {
                var source = {};
                source['name'] = sourcename;
                for (var key in sourcecfg) {
                    source[key] = sourcecfg[key];
                }
                category.sources[sourcename] = source;
                YAHOO.log('Source ' + sourcename + ' added to Category ' + catid, 'info', 'Phedex.Configuration');
            }
        }
    };

    //Add and register category # 1 (local type)
    _addCategory('aboutphedex1', 'Phedex Local');
    _addSource('aboutphedex1', 'source1', { type: 'local', path: '/html/AboutPhedex.html', divids: ['phedex-about1', 'phedex-about2', 'phedex-about3'] });
    _addSource('aboutphedex1', 'source2', { type: 'local', path: '/html/PhedexInfo.html', divids: ['phedex-about1', 'phedex-about3'] });
    PHEDEX.Core.Widget.Registry.add('aboutphedex1', 'static', 'Phedex Local', PHEDEX.Static);

    //Add and register category # 2 (iframe type)
    _addCategory('aboutphedex2', 'Phedex Iframe');
    _addSource('aboutphedex2', 'source1', { type: 'iframe', path: 'https://twiki.cern.ch/twiki/bin/viewauth/CMS/PhedexDraftDocumentation'});
    PHEDEX.Core.Widget.Registry.add('aboutphedex2', 'static', 'Phedex Iframe', PHEDEX.Static);

    //Add and register category # 3 (out link type)
    _addCategory('aboutphedex3', 'Phedex Extra'); //displaytext
    _addSource('aboutphedex3', 'source1', { type: 'extra', path: 'https://twiki.cern.ch/twiki/bin/viewauth/CMS/PhEDEx', displaytext: 'Phedex main information: ' });
    _addSource('aboutphedex3', 'source2', { type: 'extra', path: 'https://twiki.cern.ch/twiki/bin/viewauth/CMS/PhedexDraftDocumentation', displaytext: 'Phedex Documentation: ' });
    _addSource('aboutphedex3', 'source3', { type: 'extra', displaytext: '<i>This is testing for displaying direct text in Phedex static component</i>' });
    PHEDEX.Core.Widget.Registry.add('aboutphedex3', 'static', 'Phedex Extra', PHEDEX.Static);

    return {
        /**
        * @method categories
        * @description This returns the available configured categories
        */
        categories: function() {
            return _categories;
        },

        /**
        * @method getCategory
        * @description This returns the available configured categories
        */
        getCategory: function(catname) {
            return _categories[catname];
        }
    };
})();
YAHOO.log('loaded...','info','Phedex.Configuration');