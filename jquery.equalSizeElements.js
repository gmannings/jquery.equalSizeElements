(function( $ ) {
    /**
     * Plugin that calculates the largest width or height element from a supplied group and resizes each element based on the largest
     *
     * @author Gavin Mannings
     * @param {String} [dimension="height"] Switch the plugin to measure height or width.
     */
    $.fn.equalSizeElements = function(dimension) {

        var
            intLargestSize = 0,  // The largest element size is kept in this variable
            strDimension;

        // Dimension parameters
        if (!dimension || dimension === 'height') {
            strDimension = 'height';
        } else if (dimension === 'width') {
            strDimension = 'width';
        } else {
            throw "equalSizeElements: Incorrect 'dimension' parameter provided, must be a string."
        }

        // Make all elements in group the same height as largest element
        return this.each(function() {
                    if ($(this).height() > intLargestSize) {
                        intLargestSize = $(this).height();
                    }
                }).each(function() {
                    $(this).css(strDimension, intLargestSize)
                });

    };
})( jQuery );