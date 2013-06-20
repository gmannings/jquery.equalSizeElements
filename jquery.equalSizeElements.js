(function( $ ) {
    /**
     * Plugin that calculates the largest width or height element from a supplied group and resizes each element based on the largest
     *
     * Uses ems for height sizing to ensure accessibility is kept
     *
     * @author Gavin Mannings
     * @param {String} [dimension="height"] Switch the plugin to measure height or width.
     */
    $.fn.equalSizeElements = function(dimension) {

        var
            instance = this,
            intLargestSize = 0,  // The largest element size is kept in this variable
            newHeight,
            strDimension,
            sizeOfEm = _getDefaultFontSize();

        // Dimension parameters
        if (!dimension || dimension === 'height') {
            strDimension = 'height';
        } else if (dimension === 'width') {
            strDimension = 'width';
        } else {
            throw "equalSizeElements: Incorrect 'dimension' parameter provided, must be a string."
        }

        // Make all elements in stack the same size as largest element
        return this
            .each(function() {

                var dimension = $(this)
                                    .css(strDimension, 'auto')  // reset dimension from previously applied euqal size
                                    [strDimension]();           // find value

                // If current largest in stack
                if (dimension > intLargestSize) {

                    // Save the size
                    intLargestSize = dimension;

                    // Apply a unique class to the largest element
                    $(instance).removeClass('resizeLargestItem');
                    $(this).addClass('resizeLargestItem');
                }

            })
            .filter(function() {

                // If we're applying to height we want to use 'em' measurements instead of px
                // for accessibility
                var
                    animationObj = {},
                    newSize = (strDimension === 'height') ?
                        String(intLargestSize / sizeOfEm.height) + 'em' :
                        intLargestSize + 'px';

                // Create the animation object to pass to jQuery, this creates:
                // {height: 8em} or {width: 200px}
                animationObj[strDimension] =  String(newSize);

                // Animate and if we need ems as the final measurement, apply
                $(instance)
                    .animate(animationObj, 200, function() {
                        $(this).css(strDimension, newSize);
                    });

                return this;
            });

        /**
         * Returns the width and height of one em
         * @param el
         * @returns {{width: number, height: number}}
         * @private
         */
        function _getDefaultFontSize(el){

            var
                parentEl = el || document.body,
                sizeOfOneCssEm,
                tempEl = document.createElement('div');

            // Hide the element from view but still get the height of 1em
            tempEl.style.cssText='display:inline-block; padding:0; line-height:1; ' +
                'position:absolute; visibility:hidden; font-size:1em';

            // Append the element to the DOM tree
            tempEl.appendChild(document.createTextNode('M'));
            parentEl.appendChild(tempEl);

            // Get the size of one em
            sizeOfOneCssEm = {
                width : tempEl.offsetWidth,
                height: tempEl.offsetHeight
            };

            // Clean up
            parentEl.removeChild(tempEl);

            return sizeOfOneCssEm;
        }

    };
})( jQuery );