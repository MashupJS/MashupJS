
module.exports = function (grunt) {

    grunt.initConfig({
        distFolder: 'core/dist',

        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            mashupCore: {
                files: [{
                    expand: true,
                    src: ['apps/**/*.js', '!**/*.min.js'],
                }],

            }
        },
        uglify: {
            options: {
                sourceMap: true,
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: ['<%= distFolder %>/**/*.js', '!<%= distFolder %>**/*.min.js'],
                        dest: '',
                        ext: '.min.js',
                        extDot: 'last'
                    }
                ]
            },
            apps: {
                files: [
                    {
                        expand: true,
                        src: ['apps/**/*.js', '!**/*.min.js', '!apps/**/route.config.js'],
                        dest: '',
                        ext: '.min.js',
                        extDot: 'last'
                    }
                ]
            },
            coreroot: {
                files: [
                    {
                        expand: true,
                        src: ['core/*.js', '!**/*.min.js'],
                        dest: '',
                        ext: '.min.js',
                        extDot: 'last'
                    }
                ]
            }
        },
        cssmin: {
            all: {
                files: [
                    {
                        expand: true,
                        src: ['core/**/*.css', 'apps/**/*.css', '!**/*.min.css'],
                        dest: '',
                        ext: '.min.css',
                        extDot: 'last'
                    }
                ]
            }
        },


        concat: {
            options: {
                separator: ';',
            },
            routeconfig: {
                src: ['core/config/route.config.js', 'apps/**/route.config.js', '!core/lib/**/*', '!core/dist/**/*'],
                dest: '<%= distFolder %>/route.config.js',
            },
            coreservices: {
                src: ['core/common/services/**/*', '!core/lib/**/*', '!core/dist/**/*'],
                dest: '<%= distFolder %>/core.services.js',
            },
            menuconfig: {
                src: ['core/config/menu.config.js', 'apps/**/menu.config.js', '!core/lib/**/*', '!core/dist/**/*'],
                dest: '<%= distFolder %>/menu.config.js',
            },

        },
        clean: {
            dist: {
                src: ['<%= distFolder %>/**/*.*/', '<%= distFolder %>/**/*.*']
            }
        },


        // https://github.com/gruntjs/grunt-contrib-imagemin
        imagemin: {
            dynamic: {
                options: {                       // Target options
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'core/',
                    src: ['**/*.{png,jpg,gif,ico}', '!**/*.min.*', '!**/lib/**/*.*', '!**/dist/**/*.*'],   // Actual patterns to match
                    dest: '<%= distFolder %>/img/'
                }]
            }
        },
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
                    "$": false
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
                "maxlen": 120,

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

            },
            files: ['core/**/*.js', 'apps/**/*.js', '!Gruntfile.js', '!**/*.min.js', '!core/lib/**/*'],
        },
        watch: {
            appsjsmin: {
                files: ['apps/**/*.js', '!**/*.min.js', '!core/apps/**/route.config.js', '!core/apps/**/menu.config.js'],
                tasks: ['newer:uglify:apps'],
                options: {
                    nospawn: true,
                },
            },
            rootjsmin: {
                files: ['core/*.js', '!**/*.min.js'],
                tasks: ['newer:uglify:coreroot'],
                options: {
                    nospawn: true,
                },
            },
            service_config: {
                files: ['core/common/services/**/*', 'core/config/route.config.js', 'core/apps/**/route.config.js'
                        , 'core/config/menu.config.js', 'core/apps/**/menu.config.js', '!core/lib/**/*', '!core/dist/**/*', '!**/*.min.*'],
                tasks: ['clean:dist', 'concat:routeconfig', 'concat:menuconfig', 'concat:coreservices', 'uglify:dist'],
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
        //watchjsonly: {
        //    tasks: ['watch:appsjsmin', 'watch:rootjsmin', 'watch:service_config']
        //},

        concurrent: {
            options: {
                logConcurrentOutput: true

            },
            watchjsonly: {
                tasks: ['watch:appsjsmin', 'watch:rootjsmin', 'watch:service_config']
            }
        }
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
    grunt.loadNpmTasks('load-grunt-tasks');
    // grunt.loadNpmTasks('jshint-stylish');




    // ------------------------------------------------------------------------------------------
    // grunt default
    grunt.registerTask('default', [
        'annotate',
        'clean:dist', 'concat:routeconfig', 'concat:menuconfig', 'concat:coreservices',
        'uglify:dist', 'imagemin:dynamic', 'uglify:apps', 'uglify:coreroot', 'cssmin:all', 'jshint', 'watch'
    ]);
    // 1. Annotates all but 'lib' directory.  This allows Angular dependency injection to work after minification.
    // 2. Cleans out the "dist" directory to prepare for new files
    // 3. Concatinates together all files named route.config.js into a single file route.config.min.js
    // 4. Uglify/minify application js files and creates maps
    // 5. Minifies CSS files but allows them to remain separate.  Some may be combined later.
    // ------------------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------------------
    // HOW TO USE
    // ------------------------------------------------------------------------------------------
    // If grunt failes it might be because all unversioned files were removed.  Run "npm install".
    // grunt
    // At the command line just type "grunt".  All files will be processed and a watch is started for newly changed files.


    grunt.registerTask('annotate', ['ngAnnotate']);
    grunt.registerTask('clean_dist', ['clean:dist']);
    grunt.registerTask('images', ['imagemin:dynamic']);
    grunt.registerTask('watchall', ['watch']);
    grunt.registerTask('watchjs', ['concurrent:watchjsonly']);
    grunt.registerTask('myjshint', ['jshint']);

    //TODO:
    // add css remove to get rid of styles we aren't using.
    // add less/sass with source maps when we start using them.
    // add typescript if we start using it
    // combine CSS files that are always used and only minify css files that can be switched.
    // combine all JS for each app and make an app.min.js file.
    // create a task for deploying to dev/test/stage/prod (dist directories)
    // create a task to zip dist directories for deployment and restoration.


};