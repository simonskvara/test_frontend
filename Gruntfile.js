'use strict';
module.exports = function (grunt) {
	const sass = require('node-sass');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			files: [
				'css/**/*.scss',
				'js/*.js',
			],
			tasks: ['sass', 'concat'],
			options: {
				spawn: false
			}
		},

		sass: {
			options: {
				outputStyle: 'expanded', // compressed|expanded
				sourceMap: true,
				implementation: sass
			},
			dist: {
				files: {
					'css/main.css': 'css/main.scss',
				}
			}
		},

		postcss: {
			options: {
				processors: [
					require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')(), // add vendor prefixes
					require('cssnano')() // minify the result
				]
			},
			dist: {
				src: 'dist/css/main.css'
			}
		},

		concat: {
			js: {
				src: [
					// vendor
					'node_modules/bootstrap/js/dist/bootstrap.js',
				],
				dest: 'js/all.js'
			},
		},

		uglify: {
			options: {
				mangle: true,
				preserveComments: 'some',
				sourceMap: true
			},
			default: {
				files: {
					'js/all.min.js': ['all.js'],
				}
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass', 'postcss', 'concat', 'uglify']);
};