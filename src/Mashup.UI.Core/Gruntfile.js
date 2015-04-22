﻿
// I'm disappointed in Grunts performance on watch.  So many files need watched that it takes Grunt
// a while to recognize a change.  Depending on machine power it could be 10 to 20 seconds and by then
// I could have launched and tested the change.
// 
// I will keep the file updated in case Grunt improves it's performance and so I can be reminded of why
// I'm choosing Gulp.
// I think Grunt is a great tool and my favorit part is how easy it was to learn on my own.  I just need a little more
// from it that it can't seem to provide or I'm unable to figure out.  Either is an indicator of a problem.
// As time permits I'll learn how to make my Grunt config faster.  I've learned of paralell plug-ins that might help.


module.exports = function (grunt) {

    grunt.initConfig({
        distFolder: 'dist',

        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            mashupCore: {
                files: [{
                    expand: true,
                    src: ['apps/**/*.js', 'core/**/*.js', '!core/lib/**/*', '!**/*.min.js'],
                }],
            }
        },

        clean: {
            dist: {
                src: ['<%= distFolder %>/**', '<%= distFolder %>/']
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            routeconfig: {
                src: ['core/config/route.config.js', 'apps/**/route.config.js', '!core/lib/**/*', '!<%= distFolder %>/**/*'],
                dest: '<%= distFolder %>/route.config.js',
            },
            coreservices: {
                src: ['core/common/**/*', '!core/lib/**/*', '!<%= distFolder %>/**/*'],
                dest: '<%= distFolder %>/core.services.js',
            },

        },

        "merge-json": {

            menu: {
                src: ['apps/**/menu.json.txt'],
                dest: '<%= distFolder %>/menu.json.txt',
            },
        },

        copy: {
            all: {
                expand: true,
                src: ['apps/**/*', 'core/**/*', 'index.*'],
                dest: '<%= distFolder %>/',
            },
        },

        uglify: {
            options: {
                sourceMap: true,
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: ['<%= distFolder %>/**/*.js', '!<%= distFolder %>**/*.min.js', '!<%= distFolder %>/core/lib/**'],
                        dest: '',
                        ext: '.min.js',
                        extDot: 'last'
                    }
                ]
            },

        },

        cssmin: {
            all: {
                files: [
                    {
                        expand: true,
                        //src: ['<%= distFolder %>/core/**/*.css', '<%= distFolder %>/apps/**/*.css', '!core/lib/**/*', '!**/*.min.css'],
                        src: ['<%= distFolder %>/core/**/*.css', '!<%= distFolder %>/**/*.min.css', '!<%= distFolder %>/core/lib/**'],
                        dest: '',
                        ext: '.min.css',
                        extDot: 'last'
                    }
                ]
            }
        },
        
        // Executing jshint against the source and deposits in dist/img.
        // https://github.com/gruntjs/grunt-contrib-imagemin
        imagemin: {
            dynamic: {
                options: {                       // Target options
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    // cwd: 'core/',
                    src: ['core/**/*.{png,jpg,gif,ico}', '!**/*.min.*', '!core/css/**', '!core/lib/**'],
                    dest: '<%= distFolder %>/img/'
                }]
            }
        },

        // Executing jshint against the source, not dist
        jshint: {

            options: {
                // options here to override JSHint defaults
                reporterOutput: 'jshint.xml',
                //reporter: require('jshint-stylish'),
                reporter: 'checkstyle',
                node: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    jshintrc: true,
                    "angular": false,
                    "$": false,
                    //"mashupApp" : false,
                },
                maxerr: 19999,
                force: true,

                // options from Joha Papa's Angular Design-Guide
                "bitwise": true,
                "camelcase": true,
                "curly": true,
                "eqeqeq": true,
                "es3": false,
                "forin": true,
                "freeze": true,
                "immed": true,
                "indent": 4,
                "latedef": "nofunc",
                "newcap": true,
                "noarg": true,
                "noempty": true,
                "nonbsp": true,
                "nonew": true,
                "plusplus": false,
                "quotmark": "single",
                "undef": true,
                "unused": false,
                "strict": false,
                "maxparams": 10,
                "maxdepth": 5,
                "maxstatements": 40,
                "maxcomplexity": 8,
                "maxlen": 140,

                "asi": false,
                "boss": false,
                "debug": false,
                "eqnull": true,
                "esnext": false,
                "evil": false,
                "expr": false,
                "funcscope": false,
                "globalstrict": false,
                "iterator": false,
                "lastsemic": false,
                "laxbreak": false,
                "laxcomma": false,
                "loopfunc": true,
                "moz": false,
                "multistr": false,
                "notypeof": false,
                "proto": false,
                "scripturl": false,
                "shadow": false,
                "sub": true,
                "supernew": false,
                "validthis": false,
                "noyield": false,
                "browser": true,
                //"devel": true,      // in combination with "browser: true" allows things like "alert('hi');" to not be flagged as undefined.

            },
            files: ['core/**/*.js', 'apps/**/*.js', '!Gruntfile.js', '!**/*.min.js', '!core/lib/**/*', '!**/dist/**/*.*'],
        },


        watch: {
            //appsjsmin: {
            //    files: ['apps/**/*.js', '!**/*.min.js', '!core/**/route.config.js', '!core/**/menu.config.js'],
            //    tasks: ['newer:uglify:apps'],
            //    options: {
            //        nospawn: true,
            //    },
            //},
            allmin: {
                files: ['**/*.js', '!core/lib/**/*', '!**/*.min.js'],
                tasks: ['newer:uglify:coreroot', 'newer:jshint'],
                options: {
                    nospawn: true,
                },
            },
            service_config: {
                files: ['core/common/**/*', 'core/config/route.config.js', 'core/**/route.config.js'
                        , 'core/config/menu.config.js', 'apps/**/menu.json.txt', '!core/lib/**/*', '!core/dist/**/*', '!**/*.min.*'],
                tasks: ['clean:dist', 'concat:routeconfig', 'merge-json:menu', 'concat:coreservices', 'uglify:dist'],
                options: {
                    nospawn: true,
                },
            },
            cssmin: {
                files: ['core/css/**/*.css', '!**/*.min.css'],
                tasks: ['newer:cssmin:all'],
                options: {
                    nospawn: true,
                },
            },
            imagemin: {
                files: ['**/*.{png,jpg,gif,ico}', '!**/*.min.*', '!**/lib/**/*.*', '!**/dist/**/*.*'],
                tasks: ['newer:imagemin:dynamic'],
                options: {
                    nospawn: true,
                },
            }
        },


    });

    // Load modules, register tasks
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-merge-json');
    grunt.loadNpmTasks('grunt-contrib-copy');


    // ------------------------------------------------------------------------------------------
    // grunt default
    //grunt.registerTask('default', [
    //    'annotate',
    //    'clean:dist', 'concat:routeconfig', 'merge-json:menu', 'concat:coreservices',
    //    'uglify:dist', 'imagemin:dynamic', 'uglify:apps', 'uglify:coreroot', 'cssmin:all', 'jshint'
    //]);
    // 1. Annotates all but 'lib' directory.  This allows Angular dependency injection to work after minification.
    // 2. Cleans out the "dist" directory to prepare for new files
    // 3. Concatinates together all files named route.config.js into a single file route.config.min.js.  Same for menu.config.js
    // 4. Uglify/minify application js files and creates maps
    // 5. Minifies CSS files but allows them to remain separate.  Some may be combined later.
    // ------------------------------------------------------------------------------------------

    grunt.registerTask('default', ['annotate', 'clean:dist', 'concat:routeconfig', 'merge-json:menu', 'concat:coreservices',
        'copy:all', 'uglify:dist', 'imagemin:dynamic', 'cssmin:all', 'jshint'
    ]);

    grunt.registerTask('annotate', ['ngAnnotate']);
    grunt.registerTask('clean_dist', ['clean:dist']);
    grunt.registerTask('images', ['imagemin:dynamic']);
    grunt.registerTask('watchall', ['watch']);
    grunt.registerTask('myjshint', ['jshint']);
    grunt.registerTask('menu', ['merge-json:menu']);


    // This is where I hit a wall and I've decided to move to gulp.
    // The watch command works great by itself but a subset of watch commands cannot be used.
    // Grunt is to slow not to allow smaller subsets.  I find it disapointing this cannot work.
    grunt.registerTask('watchjs', ['watch:allmin', 'watch:service_config']);
    grunt.registerTask('watchall', ['watch']);

    //TODO:
    // add css remove to get rid of styles we aren't using.
    // add less/sass with source maps when we start using them.
    // add typescript if we start using it
    // combine CSS files that are always used and only minify css files that can be switched.
    // combine all JS for each app and make an app.min.js file.
    // create a task for deploying to dev/test/stage/prod (dist directories)
    // create a task to zip dist directories for deployment and restoration.


};