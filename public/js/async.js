/**
 * Created by SDH on 2017/8/10.
 */
const phantom = require('phantom');
var async = require('async');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url)
    });

    const status = await page.open(process.argv[2]);
    const content = await page.property('content');
    console.log(content);

    await instance.exit();
}());