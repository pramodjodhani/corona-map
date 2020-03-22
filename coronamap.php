<?php
/**
 * Plugin Name: CoronaMap
 * Plugin URI: https://pramodjodhani.com
 * Description: An interactive map showing live cases of Corona Virus (Covid-19) thoughout the globe.
 * Author: promz
 * Author URI: https://pramodjodhani.com/
 * Version: 1.0.0
 * License: GPL2+`
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CoronaMap
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
