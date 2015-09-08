
module.exports = function (grunt) {

    grunt.initConfig({
        distFolder: 'wwwroot',

        pkg: grunt.file.readJSON('package.json'),
        "merge-json": {

            menu: {
                src: ['wwwroot/apps/**/menu.json.txt'],
                dest: '<%= distFolder %>/menu.json.txt',
            },
        },
    });

    // Load modules, register tasks
    grunt.loadNpmTasks('grunt-merge-json');

};