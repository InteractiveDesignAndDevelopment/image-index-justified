<!--- =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

Image

Requires
  - Image

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= --->

<cfcomponent resultessors="true" output="true">

  <cfproperty name="images" type="array">

  <cfscript>

    /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    ██ ███    ██ ██ ████████
    ██ ████   ██ ██    ██
    ██ ██ ██  ██ ██    ██
    ██ ██  ██ ██ ██    ██
    ██ ██   ████ ██    ██

    =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    public function init(required array items) {
      images = [];

      ArrayEach(items, function(item) {
        ArrayAppend(images, new Image(item));
      });

      return this;
    }

    /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    ██████  ██    ██ ██████  ██      ██  ██████
    ██   ██ ██    ██ ██   ██ ██      ██ ██
    ██████  ██    ██ ██████  ██      ██ ██
    ██      ██    ██ ██   ██ ██      ██ ██
    ██       ██████  ██████  ███████ ██  ██████

    =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    public function aspectRatiosArray() {
      return ArrayReduce(images, function(result, image) {
        ArrayAppend(result, image.aspectRatio);
      }, []);
    }

    public function aspectRatiosList() {
      return ArrayReduce(images, function(result, image) {
        return ListAppend(result, image.getAspectRatio());
      }, '');
    }

    public function toArray() {
      return images;
    }

    public function sortedByPixels(string direction = 'asc') {
      var tempArr = images;
      var multiplier = 0;
      direction = LCase(direction);
      if ('asc' == direction) {
        multiplier = 1;
      } else if ('desc' == direction) {
        multiplier = -1;
      }
      ArraySort(tempArr, function(a, b) {
        var aLargestSize = a.getSizes().largest();
        var aPixels = aLargestSize.width * aLargestSize.height;
        var bLargestSize = b.getSizes().largest();
        var bPixels = bLargestSize.widht * bLargestSize.height;
        if (aPixels < bPixels) {
          return -1 * multiplier;
        } else if (bPixels < aPixels) {
          return 1 * multiplier;
        } else {
          return 0;
        }
      });
      return tempArr;
    }

    public function sortedByHeight(string direction = 'asc') {
      var tempArr = images;
      var multiplier = 0;
      direction = LCase(direction);
      if ('asc' == direction) {
        multiplier = 1;
      } else if ('desc' == direction) {
        multiplier = -1;
      }
      ArraySort(tempArr, function(a, b) {
        var aTallestSizeHeight = a.getSizes().tallest().height;
        var bTallestSizeHeight = b.getSizes().tallest().height;
        if (aTallestSizeHeight < bTallestSizeHeight) {
          return -1 * multiplier;
        } else if (bTallestSizeHeight < aTallestSizeHeight) {
          return 1 * multiplier;
        } else {
          return 0;
        }
      });
      return tempArr;
    }

    public function shortest() {
      return sortedByHeight()[1];
    }

    /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    ██████  ██████  ██ ██    ██  █████  ████████ ███████
    ██   ██ ██   ██ ██ ██    ██ ██   ██    ██    ██
    ██████  ██████  ██ ██    ██ ███████    ██    █████
    ██      ██   ██ ██  ██  ██  ██   ██    ██    ██
    ██      ██   ██ ██   ████   ██   ██    ██    ███████

    =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

  </cfscript>

</cfcomponent>
