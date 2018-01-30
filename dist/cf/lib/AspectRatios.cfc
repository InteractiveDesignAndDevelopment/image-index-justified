<cfcomponent accessors="true" output="true">

  <cfproperty name="aspectRatiosArray" type="array">

  <cfscript>

    /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    ██████  ██    ██ ██████  ██      ██  ██████
    ██   ██ ██    ██ ██   ██ ██      ██ ██
    ██████  ██    ██ ██████  ██      ██ ██
    ██      ██    ██ ██   ██ ██      ██ ██
    ██       ██████  ██████  ███████ ██  ██████

    =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    // Either aspect ratios or dimenensions can be passed in
    // They both become aspect ratios
    public function init(incomingAspectRatios) {
      aspectRatiosArray = [];

      if (! IsDefined('incomingAspectRatios')) {
        return this;
      }

      if (IsArray(incomingAspectRatios)) {
        ArrayEach(incomingAspectRatios, function(ratio) {
          if (IsStruct(ratio) && StructKeyExists(ratio, 'width') && StructKeyExists(ratio, 'height')) {
              ArrayAppend(aspectRatiosArray, structToAspectRatio(ratio));
          } else if (FindNoCase('x', ratio)) {
            ArrayAppend(aspectRatiosArray, stringtoAspectRatio(ratio));
          } else if (IsNumeric(ratio)) {
            ArrayAppend(aspectRatiosArray, ratio);
          }
        });
      } else if (Find(',', incomingAspectRatios)) {
        ListEach(incomingAspectRatios, function(ratio) {
          if (FindNoCase('x', ratio)) {
            ArrayAppend(aspectRatiosArray, stringtoAspectRatio(ratio));
          } else if (IsNumeric(ratio)) {
            ArrayAppend(aspectRatiosArray, ratio);
          }
        });
      }

      return this;
    }

    public function average() {
      var sum = ArrayReduce(aspectRatiosArray, function(result, item) {
        return result + item;
      }, 0);
      return sum / ArrayLen(aspectRatiosArray);
    }

    public function toArray() {
      return aspectRatiosArray;
    }

    public function toList() {
      return ArrayToList(aspectRatiosArray);
    }

    function widest() {
        var tempArray = aspectRatiosArray;
        ArraySort(tempArray, 'numeric' , 'desc');
        return tempArray[1];
    }

    /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    ██████  ██████  ██ ██    ██  █████  ████████ ███████
    ██   ██ ██   ██ ██ ██    ██ ██   ██    ██    ██
    ██████  ██████  ██ ██    ██ ███████    ██    █████
    ██      ██   ██ ██  ██  ██  ██   ██    ██    ██
    ██      ██   ██ ██   ████   ██   ██    ██    ███████

    =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    private function structToAspectRatio(dimensionsStruct) {
      if (0 eq dimensionsStruct.width || 0 eq dimensionsStruct.height) {
        return 0;
      }
      return dimensionsStruct.width / dimensionsStruct.height;
    }

    private function stringtoAspectRatio(dimensionsString) {
      return ListFirst(dimensionsString, 'xX') / ListLast(dimensionsString, 'xX');
    }
  </cfscript>

</cfcomponent>
