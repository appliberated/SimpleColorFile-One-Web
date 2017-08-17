class SCFGen {

    /** The color variable in the templates. */
    private static readonly colorVar: string = "{color}";

    /** The default name template of the Simple Color File. */
    private static readonly fileNameTemplate: string = `color-${SCFGen.colorVar}.html`;

    /** The default HTML content template of the Simple Color File. */
    private static readonly fileContentsTemplate: string = 
`<html>
<head>
    <title>Color ${SCFGen.colorVar}</title>
</head>
<body style="background: ${SCFGen.colorVar}">
</body>
</html>`;

    /** Get or set the color value to be exported to the Simple Color File. */
    public color: string;

    updateDownloadAnchor(anchor: HTMLAnchorElement) {

        // Replace the current color value in the HTML content template
        let scfContents = SCFGen.fileContentsTemplate.replace(new RegExp(SCFGen.colorVar, "g"), this.color);

        // Create the HTML content blob
        let scfBlob = new Blob([scfContents], {type : 'text/html'});

        // Update the anchor's href property to the URL of the blob
        anchor.href = URL.createObjectURL(scfBlob);

        // Replace the current color value in the file name template and update the anchor's download property
        anchor.download = SCFGen.fileNameTemplate.replace(SCFGen.colorVar, this.color);
    }
}


class SCFApp {

    private color: string;
    private scfGen: SCFGen;
    private colorInput : HTMLInputElement;
    private downloadAnchor : HTMLAnchorElement;


    private onColorInputInput = (event) => {
        document.body.style.backgroundColor = "";
        document.body.style.backgroundColor = this.colorInput.value;

        if (document.body.style.backgroundColor != "") {
            this.color = this.colorInput.value;
            this.downloadAnchor.classList.remove("hidden");
        } else {
            this.downloadAnchor.classList.add("hidden");
        }
    }

    private onDownloadAnchorClick = (event) => {
        this.scfGen.color = this.color;
        this.scfGen.updateDownloadAnchor(this.downloadAnchor);
        return true;
    }

    attachEvents() {
        this.scfGen = new SCFGen();

        this.colorInput = <HTMLInputElement>document.getElementById("color");
        this.colorInput.addEventListener("input", this.onColorInputInput);

        this.downloadAnchor = <HTMLAnchorElement>document.getElementById("download");
        this.downloadAnchor.addEventListener("click", this.onDownloadAnchorClick);
    }
}

let scfApp = new SCFApp();
scfApp.attachEvents();