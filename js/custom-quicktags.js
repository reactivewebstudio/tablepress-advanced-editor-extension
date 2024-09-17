(function() {
    // Ensure the quicktags function is available
    if (typeof QTags !== 'undefined') {
        // Add a custom Quicktag button to Advaned Editor toolbar
        QTags.addButton('custom_b1', 'Bullet List', '<li>', '</li>'); // id, button text, start tag, end tag
        QTags.addButton('custom_b2', 'Numbered List', '<ol>', '</ol>'); // id, button text, start tag, end tag
    }
})();
