'use strict';

module.exports = function (grunt) {
  const coverage = process.env.GRUNT_HTML_DOM_SNAPSHOT_COVERAGE;

  grunt.initConfig({
    eslint: {
      target: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    instrument: {
      files: 'tasks/**/*.js',
      options: {
        lazy: true,
        basePath: 'coverage/'
      }
    },

    storeCoverage: {
      options: {
        dir: 'coverage'
      }
    },

    makeReport: {
      src: 'coverage/coverage.json',
      options: {
        type: 'lcov',
        dir: 'coverage',
        print: 'detail'
      }
    },

    coveralls: {
      tests: {
        src: 'coverage/lcov.info'
      }
    },

    nodeunit: {
      tests: ['test/*.js']
    },

    connect: {
      server: {
        options: {
          port: 8881
        }
      }
    },

    clean: {
      coverage: ['coverage/**'],
      snapshots: ['test/snapshots/*'],
      screenshots: ['test/screenshots/*']
    },

    'html-dom-snapshot': {
      options: {
        browserCapabilities: {
          browserName: 'phantomjs'
        },
        snapshots: 'test/snapshots'
      },
      'single-target.html': {
        url: 'http://localhost:8881/test/pages/single-target.html'
      },
      others: {
        commands: [
          {
            options: {
              snapshots: null,
              screenshots: 'test/screenshots',
              fileNumbering: true
            },
            url: 'http://localhost:8881/test/pages/static.html',
            file: 'static.html'
          },
          {
            url: 'http://localhost:8881/test/pages/delayed.html',
            wait: 200,
            file: 'delayed'
          },
          {
            options: {
              screenshots: 'test/screenshots'
            },
            url: 'http://localhost:8881/test/pages/dynamic.html',
            wait: '.dynamic',
            file: 'dynamic'
          },
          {
            options: {
              viewport: {
                width: 1600,
                height: 900
              }
            },
            url: 'http://localhost:8881/test/pages/dynamic-reverse.html',
            wait: '!.dynamic',
            file: 'dynamic-reverse'
          },
          {
            url: 'http://localhost:8881/test/pages/dynamic-delayed.html',
            wait: [
              '.dynamic',
              200
            ],
            file: 'dynamic-delayed'
          },
          {
            url: 'http://localhost:8881/test/pages/dynamic-custom.html',
            wait: function (browser) {
              return browser.waitForExist('.dynamic', 1000);
            },
            file: 'dynamic-custom'
          },
          {
            options: {
              doctype: ''
            },
            url: 'http://localhost:8881/test/pages/no-doctype.html',
            file: 'no-doctype'
          },
          {
            url: 'http://localhost:8881/test/pages/dynamic-multiple.html'
          },
          {
            file: 'dynamic-first'
          },
          {
            wait: '.second',
            file: 'dynamic-second'
          },
          {
            wait: '.third'
          },
          {
            file: 'dynamic-third'
          },
          {
            go: 'back',
            wait: function (browser) {
              return browser.getUrl()
                .then(function (url) {
                  if (url !== 'http://localhost:8881/test/pages/no-doctype.html') {
                    throw new Error ('go:back failed');
                  }
                });
            }
          },
          {
            go: 'forward',
            wait: function (browser) {
              return browser.getUrl()
                .then(function (url) {
                  if (url !== 'http://localhost:8881/test/pages/dynamic-multiple.html') {
                    throw new Error ('go:forward failed');
                  }
                });
            }
          },
          {
            go: 'refresh',
            wait: function (browser) {
              return browser.getUrl()
                .then(function (url) {
                  if (url !== 'http://localhost:8881/test/pages/dynamic-multiple.html') {
                    throw new Error ('go:forward failed');
                  }
                });
            }
          },
          {
            url: 'http://localhost:8881/test/pages/input.html',
            moveCursor: 'input',
            click: 'input',
            wait: function (browser) {
              return browser.hasFocus('input')
                .then(function (value) {
                  if (value !== true) {
                    throw new Error ('click failed');
                  }
                });
            }
          },
          {
            setValue: {
              selector: 'input',
              value: 'Hi'
            },
            wait: function (browser) {
              return browser.getValue('input')
                .then(function (value) {
                  if (value !== 'Hi') {
                    throw new Error ('setValue failed');
                  }
                });
            }
          },
          {
            addValue: {
              selector: 'input',
              value: ' there!'
            },
            wait: function (browser) {
              return browser.getValue('input')
                .then(function (value) {
                  if (value !== 'Hi there!') {
                    throw new Error ('addValue failed');
                  }
                });
            }
          },
          {
            clearValue: 'input',
            wait: function (browser) {
              return browser.getValue('input')
                .then(function (value) {
                  if (value !== '') {
                    throw new Error ('clearValue failed');
                  }
                });
            }
          },
          {
            keys: 'test',
            wait: function (browser) {
              return browser.getValue('input')
                .then(function (value) {
                  if (value !== 'test') {
                    throw new Error ('sending text failed');
                  }
                });
            }
          },
          {
            keys: ['Home', 'Delete'],
            wait: function (browser) {
              return browser.getValue('input')
                .then(function (value) {
                  if (value !== 'est') {
                    throw new Error ('sending key strokes failed', value);
                  }
                });
            }
          },
          {
            url: 'http://localhost:8881/test/pages/values.html',
            isEnabled: 'select',
            isExisting: 'select',
            isFocused: 'select',
            isVisible: 'select',
            isVisibleWithinViewport: 'select',
            isNotEnabled: 'input',
            isNotExisting: 'textarea',
            isNotFocused: 'input',
            isNotVisible: 'input',
            isNotVisibleWithinViewport: 'input',
            hasAtribute: {
              selector: 'input',
              name: 'disabled',
              value: 'disabled'
            },
            hasValue: {
              selector: 'input',
              value: 'test'
            },
            hasText: {
              selector: 'div',
              value: 'Text'
            },
            hasInnerHtml: {
              selector: 'div',
              value: 'Text'
            },
            hasOuterHtml: {
              selector: 'div',
              value: '<div class="class" tabindex="0">Text</div>'
            }
          },
          {
            hasClass: {
              selector: 'div',
              value: 'class'
            }
          },
          {
            hasClass: {
              selector: 'div',
              value: '!none'
            }
          },
          {
            hasClass: {
              selector: 'div',
              value: 'class none'
            }
          },
          {
            hasClass: {
              selector: 'div',
              value: 'class !none',
              allRequired: true
            }
          },
          {
            selectOptionByIndex: {
              selector: 'select',
              index: 1
            },
            hasValue: {
              selector: 'select',
              value: '2'
            }
          },
          {
            selectOptionByValue: {
              selector: 'select',
              value: '1'
            },
            hasValue: {
              selector: 'select',
              value: '1'
            }
          },
          {
            setViewport: {
              width: 768,
              height: 480
            }
          },
          {
            setViewport: {}
          },
          {
            setViewport: {}
          }
        ],
        scenarios: 'test/scenarios/*.js'
      },
      'no-input': {
        options: {
          force: true
        },
        commands: [
          {}
        ]
      },
      'invalid-file': {
        options: {
          screenshots: 'test/screenshots',
          force: true
        },
        pages: [
          {
            url: 'http://localhost:8881',
            file: '/\\//\\'
          }
        ]
      },
      'invalid-dest': {
        options: {
          dest: '/ /',
          force: true
        },
        dummy: {
          url: 'http://localhost:8881',
          file: 'dummy'
        }
      },
      'invalid-screenshots': {
        options: {
          screenshots: '/ /',
          force: true
        },
        pages: [
          {
            url: 'http://localhost:8881',
            file: 'dummy'
          }
        ]
      },
      'invalid-go': {
        options: {
          force: true
        },
        pages: [
          {
            url: 'http://localhost:8881',
            go: 'dummy'
          }
        ]
      },
      'invalid-wait': {
        options: {
          force: true
        },
        commands: [
          { wait: true}
        ]
      }
    },

    'selenium_standalone': {
      options: {
        stopOnExit: true
      },
      server: {
        seleniumVersion: '3.7.1',
        seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
        drivers: {
          phantomjs: { // https://bitbucket.org/ariya/phantomjs/downloads/
            version: '2.1.1'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-selenium-standalone');
  grunt.loadTasks(coverage ? 'coverage/tasks' : 'tasks');

  const test = ['clean', 'eslint',
                'selenium_standalone:server:install',
                'selenium_standalone:server:start',
                'connect', 'html-dom-snapshot',
                'selenium_standalone:server:stop', 'nodeunit'],
        report = coverage ? ['storeCoverage', 'makeReport'] : [];
  grunt.registerTask('default', test.concat(report));
};
