<?php
/*
Plugin Name: TablePress TinyMCE Plugin
Description: Adds custom buttons to TinyMCE.
Version: 1.0
Author: James Hawkins
*/

/ Hook to modify TinyMCE buttons
add_filter('mce_buttons', 'tp_add_custom_tinymce_buttons', 10, 2);

function tp_add_custom_tinymce_buttons($buttons, $editor_id) {
    // Check if we're on the TablePress advanced editor
    if ($editor_id === 'advanced-editor-content') {
        // Add custom buttons
        array_push($buttons, 'emoticons', 'bullist', 'numlist');
    }
    return $buttons;
}

// Hook to enqueue TinyMCE scripts if necessary
add_action('admin_enqueue_scripts', 'tp_enqueue_scripts_for_tablepress');

function tp_enqueue_scripts_for_tablepress($hook) {
    // Check if we're on the TablePress admin page
    if (strpos($hook, 'tablepress') !== false) {
        // Enqueue WordPress core TinyMCE if not already loaded
        wp_enqueue_script('wp-tinymce');
    }
}