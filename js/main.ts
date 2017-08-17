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
class SCFGenerator {

    /** The color variable in the templates. */
    private static readonly colorVar: string = "{color}";

    /** The default name template of the Simple Color File. */
    private static readonly fileNameTemplate: string = `color-${SCFGenerator.colorVar}.html`;

    /** The default HTML content template of the Simple Color File. */
    private static readonly fileContentsTemplate: string = 
`<html>
<head>
    <title>Color ${SCFGenerator.colorVar}</title>
</head>
<body style="background: ${SCFGenerator.colorVar}">
</body>
</html>`;

    /** Get or set the color value to be exported to the Simple Color File. */
    public color: string;

    updateDownloadAnchor(anchor: HTMLAnchorElement) {

        // Replace the current color value in the HTML content template
        let scfContents = SCFGenerator.fileContentsTemplate.replace(new RegExp(SCFGenerator.colorVar, "g"), this.color);

        // Create the HTML content blob
        let scfBlob = new Blob([scfContents], {type : 'text/html'});

        // Update the anchor's href property to the URL of the blob
        anchor.href = URL.createObjectURL(scfBlob);

        // Replace the current color value in the file name template and update the anchor's download property
        anchor.download = SCFGenerator.fileNameTemplate.replace(SCFGenerator.colorVar, this.color);
    }
}

/** The Simple Color File Application class. */
class SCFApp {

    /** The current color value to be exported to the Simple Color File. */
    private color: string;

    /** A SCF generator instance. */
    private scfGen: SCFGenerator;

    /** The color HTML input element. */
    private colorInput : HTMLInputElement;

    /** The download HTML anchor element. */
    private downloadAnchor : HTMLAnchorElement;

    /** Check for a valid color and update the color when the user changes the content of the Color input. */
    private onColorInputInput = (event) => {
        document.body.style.backgroundColor = "";
        document.body.style.backgroundColor = this.colorInput.value;

        if (document.body.style.backgroundColor != "") {
            // The body has accepted the color input, we have a valid color, show the download anchor
            this.color = this.colorInput.value;
            this.downloadAnchor.classList.remove("hidden");
        } else {
            // Hide the download anchor if color input is invalid
            this.downloadAnchor.classList.add("hidden");
        }
    }

    /** 
     * Generate the Simple Color File and update the download anchor when the user clicks it, before the browser
     * starts the download.
     */
    private onDownloadAnchorClick = (event) => {
        this.scfGen.color = this.color;
        this.scfGen.updateDownloadAnchor(this.downloadAnchor);
        return true;
    }

    /** Initialize the app and add the event handlers. */
    init() {
        // Create the SCF generator
        this.scfGen = new SCFGenerator();

        this.colorInput = <HTMLInputElement>document.getElementById("color");
        this.colorInput.addEventListener("input", this.onColorInputInput);

        this.downloadAnchor = <HTMLAnchorElement>document.getElementById("download");
        this.downloadAnchor.addEventListener("click", this.onDownloadAnchorClick);

        // Init startup color
        this.onColorInputInput(null);
    }
}

// Initialize the application
let scfApp = new SCFApp();
scfApp.init();