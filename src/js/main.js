
/*global window, require */

require.config({

    enforceDefine : false,

    baseUrl: 'js/',

    paths: {
        // vendor: 'vendor/',
        // jquery: 'jquery/',
        test: 'module/testData'
    },
    
    
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {

        slick: {
            deps: ['jquery'],
            exports: 'slick' 
        }
    }
});


// // Start the main app logic.
require(['test'], function (Test) {
        'use strict';


        console.log("main.js loaded", Tes)

        // var t = new Test;
        // t();

});
