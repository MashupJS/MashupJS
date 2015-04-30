
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
        //    ngAnnotate: {
        //        options: {
        //            singleQuotes: true,
        //        },
        //        mashupCore: {
        //            files: [{
        //                expand: true,
        //                src: ['apps/**/*.js', 'core/**/*.js', '!core/lib/**/*', '!**/*.min.js'],
        //            }],
        //        }
        //    },

        //    clean: {
        //        dist: {
        //            src: ['<%= distFolder %>/**', '<%= distFolder %>/']
        //        }
        //    },

        //    concat: {
        //        options: {
        //            separator: ';',
        //        },
        //        routeconfig: {
        //            src: ['core/config/route.config.js', 'apps/**/route.config.js', '!core/lib/**/*', '!<%= distFolder %>/**/*'],
        //            dest: '<%= distFolder %>/route.config.js',
        //        },
        //        coreservices: {
        //            src: ['core/common/**/*', '!core/lib/**/*', '!<%= distFolder %>/**/*'],
        //            dest: '<%= distFolder %>/core.services.js',
        //        },

        //    },

        "merge-json": {

            menu: {
                src: ['apps/**/menu.json.txt'],
                dest: '<%= distFolder %>/menu.json.txt',
            },
        },

        //    copy: {
        //        all: {
        //            expand: true,
        //            src: ['apps/**/*', 'core/**/*', 'index.*'],
        //            dest: '<%= distFolder %>/',
        //        },
        //    },




        //    uglify: {
        //        options: {
        //            sourceMap: true,
        //        },
        //        dist: {
        //            files: [
        //                {
        //                    expand: true,
        //                    src: ['<%= distFolder %>/**/*.js', '!<%= distFolder %>**/*.min.js', '!<%= distFolder %>/core/lib/**'],
        //                    dest: '',
        //                    ext: '.min.js',
        //                    extDot: 'last'
        //                }
        //            ]
        //        },

        //    },

        //    cssmin: {
        //        all: {
        //            files: [
        //                {
        //                    expand: true,
        //                    src: ['<%= distFolder %>/core/**/*.css', '!<%= distFolder %>/**/*.min.css', '!<%= distFolder %>/core/lib/**'],
        //                    dest: '',
        //                    ext: '.min.css',
        //                    extDot: 'last'
        //                }
        //            ]
        //        }
        //    },

        //    // Executing jshint against the source and deposits in dist/img.
        //    // https://github.com/gruntjs/grunt-contrib-imagemin
        //    imagemin: {
        //        dynamic: {
        //            options: {                       // Target options
        //                optimizationLevel: 7
        //            },
        //            files: [{
        //                expand: true,                  // Enable dynamic expansion
        //                src: ['core/**/*.{png,jpg,gif,ico}', '!**/*.min.*', '!core/css/**', '!core/lib/**'],
        //                dest: '<%= distFolder %>/img/'
        //            }]
        //        }
        //    },

        //    // Executing jshint against the source, not dist
        //    jshint: {

        //        options: {
        //            // options here to override JSHint defaults
        //            reporterOutput: 'jshint.xml',
        //            //reporter: require('jshint-stylish'),
        //            reporter: 'checkstyle',
        //            node: true,
        //            globals: {
        //                jQuery: true,
        //                console: true,
        //                module: true,
        //                document: true,
        //                jshintrc: true,
        //                "angular": false,
        //                "$": false,
        //                //"mashupApp" : false,
        //            },
        //            maxerr: 19999,
        //            force: true,

        //            // options from Joha Papa's Angular Design-Guide
        //            "bitwise": true,
        //            "camelcase": true,
        //            "curly": true,
        //            "eqeqeq": true,
        //            "es3": false,
        //            "forin": true,
        //            "freeze": true,
        //            "immed": true,
        //            "indent": 4,
        //            "latedef": "nofunc",
        //            "newcap": true,
        //            "noarg": true,
        //            "noempty": true,
        //            "nonbsp": true,
        //            "nonew": true,
        //            "plusplus": false,
        //            "quotmark": "single",
        //            "undef": true,
        //            "unused": false,
        //            "strict": false,
        //            "maxparams": 10,
        //            "maxdepth": 5,
        //            "maxstatements": 40,
        //            "maxcomplexity": 8,
        //            "maxlen": 140,

        //            "asi": false,
        //            "boss": false,
        //            "debug": false,
        //            "eqnull": true,
        //            "esnext": false,
        //            "evil": false,
        //            "expr": false,
        //            "funcscope": false,
        //            "globalstrict": false,
        //            "iterator": false,
        //            "lastsemic": false,
        //            "laxbreak": false,
        //            "laxcomma": false,
        //            "loopfunc": true,
        //            "moz": false,
        //            "multistr": false,
        //            "notypeof": false,
        //            "proto": false,
        //            "scripturl": false,
        //            "shadow": false,
        //            "sub": true,
        //            "supernew": false,
        //            "validthis": false,
        //            "noyield": false,
        //            "browser": true,

        //        },
        //        files: ['core/**/*.js', 'apps/**/*.js', '!Gruntfile.js', '!**/*.min.js', '!core/lib/**/*', '!**/dist/**/*.*'],
        //    },




        //});

        // // on watch events configure jshint:all to only run on changed file
        //grunt.event.on('watch', function (action, filepath) {
        //    grunt.config('copy.all.src', filepath);
    });


    // Load modules, register tasks
    grunt.loadNpmTasks('grunt-merge-json');



    //grunt.registerTask('default', ['annotate', 'clean:dist', 'concat:routeconfig', 'merge-json:menu', 'concat:coreservices',
    //    'copy:all', 'uglify:dist', 'imagemin:dynamic', 'cssmin:all', 'jshint'
    //]);

    //grunt.registerTask('annotate', ['ngAnnotate']);
    //grunt.registerTask('clean_dist', ['clean:dist']);
    //grunt.registerTask('images', ['imagemin:dynamic']);
    //grunt.registerTask('watchall', ['watch']);
    //grunt.registerTask('myjshint', ['jshint']);
    //grunt.registerTask('buildmenujson', ['merge-json:menu']);


    //// This is where I hit a wall and I've decided to move to gulp.
    //// The watch command works great by itself but a subset of watch commands cannot be used.
    //// Grunt is to slow not to allow smaller subsets.  I find it disapointing this cannot work.
    //grunt.registerTask('watchjs', ['watch:allmin', 'watch:service_config']);
    //grunt.registerTask('watchall', ['watch']);


};