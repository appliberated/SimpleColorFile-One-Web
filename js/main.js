/**
 * @license
 * Copyright 2017 Appliberated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** The Simple Color File Generator class. */
var SCFGenerator = (function () {
    function SCFGenerator() {
    }
    SCFGenerator.prototype.updateDownloadAnchor = function (anchor) {
        // Replace the current color value in the HTML content template
        var scfContents = SCFGenerator.fileContentsTemplate.replace(new RegExp(SCFGenerator.colorVar, "g"), this.color);
        // Create the HTML content blob
        var scfBlob = new Blob([scfContents], { type: 'text/html' });
        // Update the anchor's href property to the URL of the blob
        anchor.href = URL.createObjectURL(scfBlob);
        // Replace the current color value in the file name template and update the anchor's download property
        anchor.download = SCFGenerator.fileNameTemplate.replace(SCFGenerator.colorVar, this.color);
    };
    /** The color variable in the templates. */
    SCFGenerator.colorVar = "{color}";
    /** The default name template of the Simple Color File. */
    SCFGenerator.fileNameTemplate = "color-" + SCFGenerator.colorVar + ".html";
    /** The default HTML content template of the Simple Color File. */
    SCFGenerator.fileContentsTemplate = "<html>\n<head>\n    <title>Color " + SCFGenerator.colorVar + "</title>\n</head>\n<body style=\"background: " + SCFGenerator.colorVar + "\">\n</body>\n</html>";
    return SCFGenerator;
}());
/** The Simple Color File Application class. */
var SCFApp = (function () {
    function SCFApp() {
        var _this = this;
        /** Check for a valid color and update the color when the user changes the content of the Color input. */
        this.onColorInputInput = function (event) {
            document.body.style.backgroundColor = "";
            document.body.style.backgroundColor = _this.colorInput.value;
            if (document.body.style.backgroundColor != "") {
                // The body has accepted the color input, we have a valid color, show the download anchor
                _this.color = _this.colorInput.value;
                _this.downloadAnchor.classList.remove("hidden");
            }
            else {
                // Hide the download anchor if color input is invalid
                _this.downloadAnchor.classList.add("hidden");
            }
        };
        /**
         * Generate the Simple Color File and update the download anchor when the user clicks it, before the browser
         * starts the download.
         */
        this.onDownloadAnchorClick = function (event) {
            _this.scfGen.color = _this.color;
            _this.scfGen.updateDownloadAnchor(_this.downloadAnchor);
            return true;
        };
    }
    /** Initialize the app and add the event handlers. */
    SCFApp.prototype.init = function () {
        // Create the SCF generator
        this.scfGen = new SCFGenerator();
        this.colorInput = document.getElementById("color");
        this.colorInput.addEventListener("input", this.onColorInputInput);
        this.downloadAnchor = document.getElementById("download");
        this.downloadAnchor.addEventListener("click", this.onDownloadAnchorClick);
        // Init startup color
        this.onColorInputInput(null);
    };
    return SCFApp;
}());
// Initialize the application
var scfApp = new SCFApp();
scfApp.init();
//# sourceMappingURL=main.js.map