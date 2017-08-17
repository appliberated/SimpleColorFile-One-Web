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


let pocofi = new SCFGen();

let colorElement = <HTMLInputElement>document.getElementById("color");

let downloadAnchor = <HTMLAnchorElement>document.getElementById("download");
downloadAnchor.addEventListener("click", function (e) {
    pocofi.color = colorElement.value;
    pocofi.updateDownloadAnchor(downloadAnchor);
    return true;
});

colorElement.addEventListener("input", function(e) {
    document.body.style.backgroundColor = colorElement.value;
    console.log(document.body.style.backgroundColor);
    
})