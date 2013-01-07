$(function () {

    // Create three different size columns to test with
    $('<div/>', {
            'class' : 'content one'
    })
    .html('<p>one</p><p>one</p><p>one</p><p>one</p><p>one</p>')
    .appendTo('body');

    $('<div/>', {
        'class' : 'content two'
    })
    .html('<p>two two two</p><p>two</p><p>two two two</p>')
    .appendTo('body');

    $('<div/>', {
        'class' : 'content three'
    })
    .html('<p>three</p>')
    .appendTo('body');

    /**
     * Unit tests
     */
    module('equalSizeElements');
    test( "The plugin should exist and allow chaining", function() {
        ok( $('div.content').equalSizeElements() , "Plugin exists" );
        ok( $('div.content').equalSizeElements().css('background', 'blue') , "Allows chaining" );
    });
    test( "All elements should be equal height if no padding exists", function() {
        $('div.content').equalSizeElements();
        equal( $('div.one').height(), $('div.two').height() );
        equal( $('div.two').height(),  $('div.three').height() );
        equal( $('div.one').height(),  $('div.three').height() );
    });
    test( "All elements should be equal height if top padding exists" , function() {
        $('div.content').css('padding-top', 15).equalSizeElements();
        equal( $('div.one').height(),  $('div.two').height() );
        equal( $('div.two').height(),  $('div.three').height() );
        equal( $('div.one').height(),  $('div.three').height() );
    });
    test( "All elements should be equal height if top and bottom padding exists" , function() {
        $('div.content').css('padding-bottom', 15).equalSizeElements();
        equal( $('div.one').height(),  $('div.two').height() );
        equal( $('div.two').height(),  $('div.three').height() );
        equal( $('div.one').height(),  $('div.three').height() );
    });
    test( "All elements should be equal width", function() {
        $('div.content').css('padding-bottom', 15).equalSizeElements('width');
        equal( $('div.one').width(),  $('div.two').width() );
        equal( $('div.two').width(),  $('div.three').width() );
        equal( $('div.one').width(),  $('div.three').width() );
    });
    test( "All elements should be equal height if left padding exists" , function() {
        $('div.content').css('padding-left', 15).equalSizeElements('width');
        equal( $('div.one').width(),  $('div.two').width() );
        equal( $('div.two').width(),  $('div.three').width() );
        equal( $('div.one').width(),  $('div.three').width() );
    });
    test( "All elements should be equal height if left and right padding exists" , function() {
        $('div.content').css('padding-right', 15).equalSizeElements('width');
        equal( $('div.one').width(),  $('div.two').width() );
        equal( $('div.two').width(),  $('div.three').width() );
        equal( $('div.one').width(),  $('div.three').width() );
    });
    test( "All elements should be equal height and width", function() {
        $('div.content').equalSizeElements('width').equalSizeElements('height');
        equal( $('div.one').width(),  $('div.two').width() );
        equal( $('div.two').width(),  $('div.three').width() );
        equal( $('div.one').width(),  $('div.three').width() );
        equal( $('div.one').height(),  $('div.two').height() );
        equal( $('div.two').height(),  $('div.three').height() );
        equal( $('div.one').height(),  $('div.three').height() );
    });

    // Remove test content
    $('div.content').hide();

});