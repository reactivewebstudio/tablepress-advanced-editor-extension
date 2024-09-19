(function() {
    // Ensure the quicktags function is available
    if (typeof QTags !== 'undefined') {

        let isBulletListOpen = false;
        let isNumberedListOpen = false;

        // Function to insert bullet list or close bullet list with reduced whitespace
        function insertBulletList() {
            const textarea = document.getElementById('advanced-editor-content'); // Ensure correct textarea ID is used
            if (textarea) {
                const selectionStart = textarea.selectionStart;
                const selectionEnd = textarea.selectionEnd;
                const selectedText = textarea.value.substring(selectionStart, selectionEnd);
                const textBefore = textarea.value.substring(0, selectionStart);
                const textAfter = textarea.value.substring(selectionEnd);

                let content;

                // Check if <ul> exists before the current selection
                if (textBefore.includes('<ul>') && textAfter.includes('</ul>')) {
                    // If <ul> already exists, insert <li> only
                    if (!isBulletListOpen) {
                        content = '<li>' + selectedText;
                        isBulletListOpen = true;
                    } else {
                        // Insert closing </li> if <li> is open
                        content = selectedText + '</li>';
                        isBulletListOpen = false;
                    }
                } else {
                    // Insert the full <ul><li> structure if no <ul> is found
                    if (!isBulletListOpen) {
                        content = '<ul><li>' + selectedText;
                        isBulletListOpen = true;
                    } else {
                        content = selectedText + '</li></ul>';
                        isBulletListOpen = false;
                    }
                }

                textarea.value = textBefore + content + textAfter;
                textarea.selectionStart = textarea.selectionEnd = selectionStart + content.length;
            }
        }

        // Function to insert numbered list or close numbered list with reduced whitespace
        function insertNumberedList() {
            const textarea = document.getElementById('advanced-editor-content'); // Ensure correct textarea ID is used
            if (textarea) {
                const selectionStart = textarea.selectionStart;
                const selectionEnd = textarea.selectionEnd;
                const selectedText = textarea.value.substring(selectionStart, selectionEnd);
                const textBefore = textarea.value.substring(0, selectionStart);
                const textAfter = textarea.value.substring(selectionEnd);

                let content;

                // Check if <ol> exists before the current selection
                if (textBefore.includes('<ol>') && textAfter.includes('</ol>')) {
                    // If <ol> already exists, insert <li> only
                    if (!isNumberedListOpen) {
                        content = '<li>' + selectedText;
                        isNumberedListOpen = true;
                    } else {
                        // Insert closing </li> if <li> is open
                        content = selectedText + '</li>';
                        isNumberedListOpen = false;
                    }
                } else {
                    // Insert the full <ol><li> structure if no <ol> is found
                    if (!isNumberedListOpen) {
                        content = '<ol><li>' + selectedText;
                        isNumberedListOpen = true;
                    } else {
                        content = selectedText + '</li></ol>';
                        isNumberedListOpen = false;
                    }
                }

                textarea.value = textBefore + content + textAfter;
                textarea.selectionStart = textarea.selectionEnd = selectionStart + content.length;
            }
        }

        // Add custom Quicktag button for Bullet List (ul > li)
        QTags.addButton('custom_b1', 'Bullet List', insertBulletList); // id, button text, callback

        // Add custom Quicktag button for Numbered List (ol > li)
        QTags.addButton('custom_b2', 'Numbered List', insertNumberedList); // id, button text, callback
    }
})();
