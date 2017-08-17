var SCFGen = (function () {
    function SCFGen() {
    }
    SCFGen.prototype.updateDownloadAnchor = function (anchor) {
        // Replace the current color value in the HTML content template
        var scfContents = SCFGen.fileContentsTemplate.replace(new RegExp(SCFGen.colorVar, "g"), this.color);
        // Create the HTML content blob
        var scfBlob = new Blob([scfContents], { type: 'text/html' });
        // Update the anchor's href property to the URL of the blob
        anchor.href = URL.createObjectURL(scfBlob);
        // Replace the current color value in the file name template and update the anchor's download property
        anchor.download = SCFGen.fileNameTemplate.replace(SCFGen.colorVar, this.color);
    };
    /** The color variable in the templates. */
    SCFGen.colorVar = "{color}";
    /** The default name template of the Simple Color File. */
    SCFGen.fileNameTemplate = "color-" + SCFGen.colorVar + ".html";
    /** The default HTML content template of the Simple Color File. */
    SCFGen.fileContentsTemplate = "<html>\n<head>\n    <title>Color " + SCFGen.colorVar + "</title>\n</head>\n<body style=\"background: " + SCFGen.colorVar + "\">\n</body>\n</html>";
    return SCFGen;
}());
var pocofi = new SCFGen();
var colorElement = document.getElementById("color");
var downloadAnchor = document.getElementById("download");
downloadAnchor.addEventListener("click", function (e) {
    pocofi.color = colorElement.value;
    pocofi.updateDownloadAnchor(downloadAnchor);
    return true;
});
colorElement.addEventListener("input", function (e) {
    document.body.style.backgroundColor = colorElement.value;
    console.log(document.body.style.backgroundColor);
});
//# sourceMappingURL=main.js.map