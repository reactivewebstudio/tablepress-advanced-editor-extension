(function() {
    tinymce.create('tinymce.plugins.tp_custom_quicktags', {
        init: function(editor, url) {
            // Add the first custom button
            editor.addButton('tp_custom_button_1', {
                text: 'Custom 1',
                icon: false,
                onclick: function() {
                    editor.insertContent('[custom_shortcode_1]');
                }
            });

            // Add the second custom button
            editor.addButton('tp_custom_button_2', {
                text: 'Custom 2',
                icon: false,
                onclick: function() {
                    editor.insertContent('[custom_shortcode_2]');
                }
            });
        }
    });

    // Register the plugin with TinyMCE
    tinymce.PluginManager.add('tp_custom_quicktags', tinymce.plugins.tp_custom_quicktags);
})();
