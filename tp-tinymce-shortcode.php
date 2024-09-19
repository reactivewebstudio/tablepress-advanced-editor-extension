function tpwp_scode_func( $atts ) {
    $a = shortcode_atts( array(
        'link' => '',
        'text' => 'Try it Out',
        'color' => 'green',
    ), $atts );

    return '<div class="twp_scode_btn">
    <a style="background-color:' . $a['color'] . ';" class="" href="' . $a['link'] . '" target="_blank">' . $a['text'] . '</a>
      </div>';
}
add_shortcode( 'tpwp-scode', 'tpwp_scode_func' );