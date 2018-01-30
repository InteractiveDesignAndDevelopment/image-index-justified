<!--- -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

Justified

Requires
  - Color
  - ImageIndex

-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- --->

<cfcomponent accessors="true" output="true">

  <cfproperty name="ImageIndex">

  <cfscript>
    /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    ██ ███    ██ ██ ████████
    ██ ████   ██ ██    ██
    ██ ██ ██  ██ ██    ██
    ██ ██  ██ ██ ██    ██
    ██ ██   ████ ██    ██

    =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    public function init(ImageIndex) {
      setImageIndex(ImageIndex);

      // WriteDump(var = getImageIndex(), expand = false);
      // WriteOutput('<div><strong>Element Classes</strong>: #ImageIndex.getElementClasses().toList()#</div>');
      // WriteOutput('<div><strong>Photo Classes</strong>: #ImageIndex.getPhotoClasses().toList()#</div>');
      // WriteOutput('<div><strong>Title Classes</strong>: #ImageIndex.getTitleClasses().toList()#</div>');
      // WriteOutput('<div><strong>Description Classes</strong>: #ImageIndex.getDescriptionClasses().toList()#</div>');
      // WriteDump(var = ImageIndex.getImages().toArray(), label = 'images', expand = false);

      return this;
    }
  </cfscript>

    <!--- =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    ██████  ██    ██ ██████  ██      ██  ██████
    ██   ██ ██    ██ ██   ██ ██      ██ ██
    ██████  ██    ██ ██████  ██      ██ ██
    ██      ██    ██ ██   ██ ██      ██ ██
    ██       ██████  ██████  ███████ ██  ██████

    =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= --->

    <cffunction name="toHTML" returnType="string" access="public">
      <cfscript>
          var html = '';
      </cfscript>
      <cfsavecontent variable = "html">
        <cfoutput>

          #styleTag()#

          <div  class="#themeClasses()#">

            <div class="#imageIndexJustifiedClasses()#"
              id="image-index-justified-#ImageIndex.getInstanceID()#"
              #galleryDataAttributes()#>

              <style id="image-index-justified-#ImageIndex.getInstanceID()#-geometry-style"></style>

              <div class="#galleryClasses()#" id="image-index-justified-#ImageIndex.getInstanceID()#-container">

                <cfset jsIndex = 0>
                <cfloop array="#ImageIndex.getImages().toArray()#" index="image">

                  <figure class="#figureClasses()#" id="image-index-justified-#ImageIndex.getInstanceID()#-figure-#jsIndex#">
                    <a
                      class="image-index-justified-figure__link"
                      href="#image.getSizes().largest().path#"
                      data-group="#ImageIndex.getInstanceID()#"
                      data-caption="#imgAlt(image.getTitle(), image.getDescription())#">
                      <img
                        alt="#imgAlt(image.getTitle(), image.getDescription())#"
                        class="image-index-justified-figure__image"
                        src="#image.getSizes().smallest().path#" />
                    </a>
                    <cfif isTitleRendered(image.getTitle()) || isDescriptionRendered(image.getDescription())>
                      <figcaption class="image-index-justified-figure__caption">
                        <cfif isTitleRendered(image.getTitle())>
                          <div class="image-index-justified-figure__title">
                            #image.getTitle()#
                          </div>
                        </cfif>
                        <cfif isDescriptionRendered(image.getDescription())>
                          <div class="image-index-justified-figure__description">
                            #image.getDescription()#
                          </div>
                        </cfif>
                      </figcaption>
                    </cfif>
                  </figure><!-- .image-index-justified-Box -->

                  <cfset ++jsIndex>
                </cfloop>

              </div><!-- .image-index-justified-Container -->
            </div><!-- .image-index-justified-Gallery -->
          </div><!-- Theme -->
        </cfoutput>
      </cfsavecontent>
      <cfscript>
        return html;
      </cfscript>
    </cffunction>

    <!--- =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    ██████  ██████  ██ ██    ██  █████  ████████ ███████
    ██   ██ ██   ██ ██ ██    ██ ██   ██    ██    ██
    ██████  ██████  ██ ██    ██ ███████    ██    █████
    ██      ██   ██ ██  ██  ██  ██   ██    ██    ██
    ██      ██   ██ ██   ████   ██   ██    ██    ███████

    =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= --->

    <cfscript>

      private function imgAlt(title = '', description = '') {
        var attributeValue = '';
        if (0 lt Len(title)) {
          attributeValue = title;
        }
        if (0 lt Len(description)) {
          if (0 lt Len(attributeValue)) {
            attributeValue &= ': ';
          }
          attributeValue &= description;
        }
        return attributeValue;
      }

      private function isTitleRendered(required string title) {
        var isTitleBlank = 0 eq Len(title);
        var isTitleVisible = ImageIndex.getTitleClasses().booleanOf('visible');
        return ! isTitleBlank && isTitleVisible;
      }

      private function isDescriptionRendered(required string description) {
        var isDescriptionBlank = 0 eq Len(description);
        var isDescriptionVisible = ImageIndex.getDescriptionClasses().booleanOf('visible');
        return ! isDescriptionBlank && isDescriptionVisible;
      }

      private function themeClass() {
        var themeName = ImageIndex.getElementClasses().valueOf('theme');

        // WriteOutput('themeName = #themeName#');

        if (! isDefined('themeName')) {
          themeName = 'default';
        }

        return 't-#themeName#';
      }

      private function styleTag() {
        var style = [];

        var elementBackgroundColor = ImageIndex.getElementClasses().valueOf('background-color');
        var captionBackgroundColor = ImageIndex.getPhotoClasses().valueOf('caption-background-color');
        var titleColor = ImageIndex.getTitleClasses().valueOf('color');
        var titleSize = ImageIndex.getTitleClasses().valueOf('size');
        var descriptionColor = ImageIndex.getDescriptionClasses().valueOf('color');
        var descriptionSize = ImageIndex.getDescriptionClasses().valueOf('size');

        ArrayAppend(style, '<style>');

        if (IsDefined('elementBackgroundColor')) {
          elementBackgroundColor = new Color(elementBackgroundColor).toRGBA();
          ArrayAppend(style, '##image-index-justified-#ImageIndex.getInstanceID()#-gallery .image-index-justified-Container {');
          ArrayAppend(style, 'background-color: #elementBackgroundColor# !important;');
          ArrayAppend(style, '}');
        }

        if (IsDefined('captionBackgroundColor')) {
          captionBackgroundColor = new Color(captionBackgroundColor).toRGBA();
          ArrayAppend(style, '##image-index-justified-#ImageIndex.getInstanceID()#-gallery .image-index-justified-figure__caption {');
          ArrayAppend(style, 'background-color: #captionBackgroundColor# !important;');
          ArrayAppend(style, '}');
        }

        if (IsDefined('titleColor')) {
          titleColor = new Color(titleColor).toRGBA();
          ArrayAppend(style, '##image-index-justified-#ImageIndex.getInstanceID()#-gallery .image-index-justified-figure__title {');
          ArrayAppend(style, 'color: #titleColor# !important;');
          ArrayAppend(style, '}');
        }

        if (IsDefined('titleSize')) {
          ArrayAppend(style, '##image-index-justified-#ImageIndex.getInstanceID()#-gallery .image-index-justified-figure__title {');
          ArrayAppend(style, 'font-size: #titleSize#px !important;');
          ArrayAppend(style, '}');
        }

        if (IsDefined('descriptionColor')) {
          descriptionColor = new Color(descriptionColor).toRGBA();
          ArrayAppend(style, '##image-index-justified-#ImageIndex.getInstanceID()#-gallery .image-index-justified-figure__description {');
          ArrayAppend(style, 'color: #descriptionColor# !important;');
          ArrayAppend(style, '}');
        }

        if (IsDefined('descriptionSize')) {
          ArrayAppend(style, '##image-index-justified-#ImageIndex.getInstanceID()#-gallery .image-index-justified-figure__description {');
          ArrayAppend(style, 'font-size: #descriptionSize#px !important;');
          ArrayAppend(style, '}');
        }

        ArrayAppend(style, '</style>');

        return ArrayToList(style, ' ');
      }

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

       ██████ ██       █████  ███████ ███████ ███████ ███████
      ██      ██      ██   ██ ██      ██      ██      ██
      ██      ██      ███████ ███████ ███████ █████   ███████
      ██      ██      ██   ██      ██      ██ ██           ██
       ██████ ███████ ██   ██ ███████ ███████ ███████ ███████

      =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

      private function themeClasses() {
          var classes = [];
          ArrayAppend(classes, themeClass());
          return ArrayToList(classes, ' ');
      }

      private function figureClasses() {
        var classes = [];
        ArrayAppend(classes, 'image-index-justified-figure');
        ArrayAppend(classes, ImageIndex.getDescriptionClasses().booleanClassOf('visible', 'image-index-justified-figure--with-description'));
        ArrayAppend(classes, ImageIndex.getTitleClasses().booleanClassOf('visible', 'image-index-justified-figure--with-title'));
        return ArrayToList(classes, ' ');
      }

      private function galleryClasses() {
        var classes = [];
        ArrayAppend(classes, 'image-index-justified__gallery');
        return ArrayToList(classes, ' ');
      }

      private function imageIndexJustifiedClasses() {
        var classes = [];
        ArrayAppend(classes, 'image-index-justified');
        return ArrayToList(classes, ' ');
      }

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

      ██████   █████  ████████  █████       █████  ████████ ████████ ██████  ██ ██████  ██    ██ ████████ ███████ ███████
      ██   ██ ██   ██    ██    ██   ██     ██   ██    ██       ██    ██   ██ ██ ██   ██ ██    ██    ██    ██      ██
      ██   ██ ███████    ██    ███████     ███████    ██       ██    ██████  ██ ██████  ██    ██    ██    █████   ███████
      ██   ██ ██   ██    ██    ██   ██     ██   ██    ██       ██    ██   ██ ██ ██   ██ ██    ██    ██    ██           ██
      ██████  ██   ██    ██    ██   ██     ██   ██    ██       ██    ██   ██ ██ ██████   ██████     ██    ███████ ███████

      =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

      private function galleryDataAttributes() {
        var dataAttributes = [];

        ArrayAppend(dataAttributes, ImageIndex.getElementClasses().dataAttributeOf('spacing'));
        ArrayAppend(dataAttributes, ImageIndex.getPhotoClasses().dataAttributeOf('spacing', 'box-spacing'));
        ArrayAppend(dataAttributes, ImageIndex.getElementClasses().dataAttributeOf('target-row-height'));
        ArrayAppend(dataAttributes, ImageIndex.getElementClasses().dataAttributeOf('full-width-breakout-row-cadence'));

        ArrayAppend(dataAttributes, 'data-image-aspect-ratios="#ImageIndex.getImages().aspectRatiosList()#"');
        ArrayAppend(dataAttributes, 'data-instance-id="#ImageIndex.getInstanceID()#"');
        ArrayAppend(dataAttributes, 'data-shortest-image-height="#ImageIndex.getImages().shortest().getSizes().largest().height#"');

        return ArrayToList(dataAttributes, ' ');
      }

    </cfscript>

</cfcomponent>
