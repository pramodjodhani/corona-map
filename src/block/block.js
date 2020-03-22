import './editor.scss';
import './style.scss';
import Cmap from "./map.jsx";
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;
const { TextControl } = wp.components;
const { PanelColorSettings } = wp.editor;


const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register the block.
 */
registerBlockType( 'promz/corona-map', {
	attributes: {
		gmap_api: {
			type: 'string'
		},
		fromColor:{
			type: 'string'
		},
		toColor: {
			type:'string'
		}
	},
	title: __( 'Corona map' ), 
	icon: 'admin-site-alt2', 
	category: 'common', 
	keywords: [
		__( 'corona-map' ),
		__( 'Map' ),
		__( 'Covid-19' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		console.log( 'props on edit', props );
		let fromColor = props.attributes.fromColor ? props.attributes.fromColor : '#fdeeee';
		let toColor = props.attributes.toColor ? props.attributes.toColor : '#ff0000';

		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody>
						<PanelColorSettings 
							title="Map Color"
							colorSettings={[	
								{
									value: fromColor,
									onChange: (colorValue) => props.setAttributes ( { fromColor: colorValue } ),
									label: 'Color',
								},
								{
									value: toColor,
									onChange: (colorValue) => props.setAttributes ( { toColor: colorValue } ),
									label: 'Color',
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>
				<Cmap fromColor={fromColor} toColor={toColor} ></Cmap>
			</div>
		);
	},

	/**
	 * Save.
	 */
	save: ( props ) => {
		let fromColor = props.attributes.fromColor ? props.attributes.fromColor : '#fdeeee';
		let toColor = props.attributes.toColor ? props.attributes.toColor : '#ff0000';

		return (
			<div className={ props.className } data-from-color={fromColor} data-to-color={toColor} >
			</div>
		);
	},
} );
