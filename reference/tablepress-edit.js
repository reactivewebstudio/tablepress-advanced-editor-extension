tp.callbacks.advanced_editor = {};

tp.callbacks.advanced_editor.$textarea = $( '#advanced-editor-content' );

/**
 * Open the wpdialog for the Advanced Editor.
 *
 * @param {HTMLElement|null} $active_textarea Active textarea of the table editor or null.
 */
tp.callbacks.advanced_editor.open_dialog = function ( $active_textarea = null ) {
	tp.callbacks.advanced_editor.$textarea.value = tp.editor.options.data[ tp.helpers.selection.rows[0] ][ tp.helpers.selection.columns[0] ];

	const cell_name = jexcel.getColumnNameFromId( [ tp.helpers.selection.columns[0], tp.helpers.selection.rows[0] ] );
	const title = sprintf( __( 'Advanced Editor for cell %1$s', 'tablepress' ), cell_name );
	$( '#advanced-editor-label' ).textContent = title; // Screen reader label for the "Advanced Editor" textarea.
	$( '#link-modal-title' ).textContent = sprintf( __( 'Insert Link into cell %1$s', 'tablepress' ), cell_name );

	jQuery( '#advanced-editor' ).wpdialog( {
		width: 600,
		modal: true,
		title,
		resizable: false, // Height of textarea does not increase when resizing editor height.
		closeOnEscape: true,
		buttons: [
			{
				text: __( 'Cancel', 'tablepress' ),
				class: 'button button-cancel',
				click() {
					jQuery( this ).wpdialog( 'close' );
				},
			},
			{
				text: __( 'OK', 'tablepress' ),
				class: 'button button-primary button-ok',
				click: tp.callbacks.advanced_editor.confirm_save,
			},
		],
	} );

	jexcel.current = null; // This is necessary to prevent problems with the focus and cells being emptied when the Advanced Editor is called from the context menu.
	if ( $active_textarea ) {
		tp.callbacks.advanced_editor.$textarea.selectionStart = $active_textarea.selectionStart;
		tp.callbacks.advanced_editor.$textarea.selectionEnd = $active_textarea.selectionEnd;
	} else {
		tp.callbacks.advanced_editor.$textarea.selectionStart = tp.callbacks.advanced_editor.$textarea.value.length;
		tp.callbacks.advanced_editor.$textarea.selectionEnd = tp.callbacks.advanced_editor.$textarea.value.length;
	}
	tp.callbacks.advanced_editor.$textarea.focus();
};

/**
 * Confirm and save changes of the Advanced Editor.
 */
tp.callbacks.advanced_editor.confirm_save = function () {
	const current_value = tp.editor.options.data[ tp.helpers.selection.rows[0] ][ tp.helpers.selection.columns[0] ];
	// Only set the cell content if changes were made to not wrongly call tp.helpers.unsaved_changes.set().
	if ( tp.callbacks.advanced_editor.$textarea.value !== current_value ) {
		tp.editor.setValueFromCoords( tp.helpers.selection.columns[0], tp.helpers.selection.rows[0], tp.callbacks.advanced_editor.$textarea.value );
	}
	jQuery( this ).wpdialog( 'close' );
};