module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';', // permet d'ajouter un point-virgule entre chaque fichier concaténé.
      },
      dist: {
        src: ['js/libs/*.js', 'js/*.js', 'js/main.js'], // la source
        dest: 'index.js' // la destination finale
      }
    },
    uglify: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['index.js'],
        dest: 'index.js'
      }
    },
    watch: {
      scripts: {
        files: ['js/*.js', 'js/libs/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
  })

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat:dist', 'uglify:dist']);
}
