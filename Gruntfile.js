/**
 * Created by Muralidhar on 12/19/2014.
 */
// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Configure Grunt
    grunt.initConfig({
        // grunt-express will serve the files from the folders listed in `bases`
        // on specified `port` and `hostname`
        clean:{
            files:{
                src:['app/build/']
            }
        },
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "localhost",
                    bases: [__dirname],
                    livereload: true
                }
            },
            app: {
                options: {
                    port: 9001,
                    hostname: "localhost",
                    bases: ['app'],
                    livereload: true
                }
            }
        },
        // grunt-watch will monitor the projects files
        watch: {
            all: {
                files: {
                    src:'index.html'
                },
                options: {
                    livereload: true
                }
            },
            app: {
                files: ['app/*.*'],
                tasks:['appcompile'],
                options: {
                    livereload: true
                }
            }
        },
        // grunt-open will open your browser at the project's URL
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://<%= express.all.options.hostname%>:<%= express.all.options.port%>'
            },
            app:{
                path: 'http://<%= express.app.options.hostname%>:<%= express.app.options.port%>'
            }
        },
        'compile-handlebars':{
            test:{
                template:'./app/test.hbs',
                templateData:{
                    test:require('./app/test.json')
                },
                output:'./app/index.html'
            }
        }
    });

    // Creates the `server` task
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.registerMultiTask('clean', 'Deletes files', function () {
        this.files.forEach(function (file) {
            file.orig.src.forEach(function (f) {
                if (grunt.file.exists(f)) {
                    grunt.file.delete(f);
                }
            });
        });
    });

    grunt.registerTask('default',['express:all','open:all','watch:all']);
    grunt.registerTask('app',['appcompile'],['express:app','open:app','watch:app']);
    grunt.registerTask('appcompile',['compile-handlebars']);
    grunt.registerTask('test',['express:test','open:test','watch:test']);
};