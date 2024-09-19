<?php
/**
 * Plugin Name: TablePress Advanced Editor Extension
 * Plugin URI: https://tablepress.org/
 * Description: Extends the TablePress Advanced Editor modal by adding list formatting options (ordered and unordered lists).
 * Version: 1.1.0
 * Requires at least: 6.0
 * Requires PHP: 7.2
 * Author: James Hawkins
 * Author URI: https://www.reactivewebstudio.ca
 * License: GPL 2
 * 
 */

// Hook to enqueue the custom Quicktags JavaScript
add_action('admin_enqueue_scripts', 'tp_enqueue_custom_quicktags_script');
function tp_enqueue_custom_quicktags_script() {
    // Check if we are on the TablePress edit screen
    if (isset($_GET['page']) && $_GET['page'] === 'tablepress' && isset($_GET['action']) && $_GET['action'] === 'edit') {
        // Enqueue the custom Quicktags JavaScript file
        wp_enqueue_script('tp-custom-quicktags', plugins_url('js/custom-quicktags.js', __FILE__), array('quicktags'), null, true);
    }
}
