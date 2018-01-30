<cfscript>

    // writeDump(var = attributes, expand = false, label = 'Element Attributes');
    // writeDump(var = attributes, expand = true, label = 'Element Attributes');
    // exit;

    request.element.isStatic = 0;

    Server.CommonSpot.udf.resources.loadResources('babel-polyfill');
    Server.CommonSpot.udf.resources.loadResources('polyfill-nodelist-foreach');
    Server.CommonSpot.udf.resources.loadResources('element-closest');
    Server.CommonSpot.udf.resources.loadResources('justified-layout-browser');
    Server.CommonSpot.udf.resources.loadResources('smartphoto');
    Server.CommonSpot.udf.resources.loadResources('picturefill');
    Server.CommonSpot.udf.resources.loadResources('image-index-justified');

    ImageIndex = new lib.ImageIndex(attributes);

    // exit;

    Justified = new lib.Justified(ImageIndex);

    WriteOutput(Justified.toHTML());

</cfscript>
