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
var SCFApp = (function () {
    function SCFApp() {
        var _this = this;
        this.onColorInputInput = function (event) {
            document.body.style.backgroundColor = "";
            document.body.style.backgroundColor = _this.colorInput.value;
            if (document.body.style.backgroundColor != "") {
                _this.color = _this.colorInput.value;
                _this.downloadAnchor.classList.remove("hidden");
            }
            else {
                _this.downloadAnchor.classList.add("hidden");
            }
        };
        this.onDownloadAnchorClick = function (event) {
            _this.scfGen.color = _this.color;
            _this.scfGen.updateDownloadAnchor(_this.downloadAnchor);
            return true;
        };
    }
    SCFApp.prototype.attachEvents = function () {
        this.scfGen = new SCFGen();
        this.colorInput = document.getElementById("color");
        this.colorInput.addEventListener("input", this.onColorInputInput);
        this.downloadAnchor = document.getElementById("download");
        this.downloadAnchor.addEventListener("click", this.onDownloadAnchorClick);
    };
    return SCFApp;
}());
var scfApp = new SCFApp();
scfApp.attachEvents();
//# sourceMappingURL=main.js.map