/*
* @Author: WUZHILONG860
* @Date:   2018-03-22 19:21:45
* @Last Modified by:   WUZHILONG860
* @Last Modified time: 2018-03-22 22:29:20
*/
'use strict';

const Generator = require('yeoman-generator');
const beautify = require('gulp-beautify');
const chalk = require('chalk');
const yosay = require('yosay');
const utils = require('../utils/file-util');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('babel');
  }

  initializing() {
    this.log(yosay(
      'Welcome to the PABank B2B2C ' + chalk.red('VUE.JS MPA') + ' generator!'
    ));

    this._copyTpl('package.json', 'package.json')
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'desc',
        message: 'Project description',
        default: 'A b2b2c vue.js project'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: 'WUZHILONG860 <wuzhilong860@pingan.com.cn>'
      },
      {
        type: 'confirm',
        name: 'router',
        message: 'Install vue-router ?',
        default: false
      },
      {
        type: 'confirm',
        name: 'vuex',
        message: 'Install vuex',
        default: false
      },
      {
        type: 'confirm',
        name: 'share',
        message: '引入分享组件',
        default: true
      },
      {
        type: 'confirm',
        name: 'auth',
        message: '启用登录组件拦截',
        default: false
      },
      {
        type: 'confirm',
        name: 'webtrends',
        message: '引入埋点组件',
        default: true
      },
      {
        type: 'confirm',
        name: 'zhida',
        message: '引入直达组件',
        default: false
      }
    ];

    return this.prompt(prompts).then(answers => {
      // To access answers later use this.answers.someAnswer;
      this.answers = answers;
    });
  }


  configuring() {
    this._mergeJson('package.json', {
      name: this.answers.name,
      description: this.answers.desc,
      author: this.answers.author,
    });

    if (this.answers.router === true) {
      this._mergeJson('package.json', {
        dependencies: {
          "vue-router": "^3.0.1"
        }
      });
    }

    if (this.answers.vuex === true) {
      this._mergeJson('package.json', {
        dependencies: {
          "vuex": "3.0.1"
        }
      });
    }
  }


  writing() {
    this._copyTpl('package-lock.json', 'package-lock.json')
    this._copyTpl('.babelrc', '.babelrc')
    this._copyTpl('.editorconfig', '.editorconfig')
    this._copyTpl('.eslintignore', '.eslintignore')
    this._copyTpl('.eslintrc.js', '.eslintrc.js')
    this._copyTpl('.gitignore', '.gitignore')
    this._copyTpl('.postcssrc.js', '.postcssrc.js')
    this._copyTpl('README.md', 'README.md')

    this._copyTpl('build/', 'build/')
    this._copyTpl('config/', 'config/')
    this._copyTpl('data/user.json', 'data/user.json')
    this._copyTpl('static/', 'static/')

    this._copyTpl('utils/index.js', 'src/utils/index.js')
    this._copyTpl('utils/spinner.js', 'src/utils/spinner.js')

    this._copyTpl('api/doc.md', 'src/api/doc.md')
    this._copyTpl('api/api.js', 'src/api/api.js')

    this._copyTpl('plugins/README.md', 'src/plugins/README.md')
    this._copyTpl('plugins/APIPlugin.js', 'src/plugins/APIPlugin.js')

    this._copyTpl('template/layout.html', 'src/template/layout.html')
    this._copyTpl('template/README.md', 'src/template/README.md')

    this._copyTpl('services/README.md', 'src/services/README.md')

    this._copyTpl('views/index.html', 'src/views/index/index.html')
    this._copyTpl('views/index.vue', 'src/views/index/index.vue')
    this._copyTpl('views/index.js', 'src/views/index/index.js')


    if (this.answers.zhida) {
      this.fs.copyTpl(
        this.templatePath('services/zhida.js'),
        this.destinationPath('src/services/zhida.js')
      );

      this.fs.copyTpl(
        this.templatePath('services/zhida.config.js'),
        this.destinationPath('src/services/zhida.config.js')
      );
    }

    if (this.answers.auth) {
      this.fs.copyTpl(
        this.templatePath('utils/http-auth.js'),
        this.destinationPath('src/utils/http-auth.js')
      );

      this.fs.copyTpl(
        this.templatePath('services/auth.js'),
        this.destinationPath('src/services/auth.config.js')
      );

      this.fs.copyTpl(
        this.templatePath('services/auth.config.js'),
        this.destinationPath('src/services/auth.config.js')
      );

      this.fs.copyTpl(
        this.templatePath('api/http-auth.js'),
        this.destinationPath('src/api/index.js'),
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('utils/http.js'),
        this.destinationPath('src/utils/http.js')
      );

      this.fs.copyTpl(
        this.templatePath('api/http-only.js'),
        this.destinationPath('src/api/index.js')
      );
    }

    if (this.answers.share) {
      this.fs.copyTpl(
        this.templatePath('services/share.js'),
        this.destinationPath('src/services/share.js')
      );

      this.fs.copyTpl(
        this.templatePath('services/share.config.js'),
        this.destinationPath('src/services/share.config.js')
      );
    }

    if (this.answers.webtrends) {
      this.fs.copyTpl(
        this.templatePath('services/webtrends.js'),
        this.destinationPath('src/services/webtrends.js')
      );

      this.fs.copyTpl(
        this.templatePath('services/webtrends.config.js'),
        this.destinationPath('src/services/webtrends.config.js')
      );
    }
  }


  install() {
    this.log('')
    this.log(chalk.yellow('# Installing project dependencies ...'))
    this.log(chalk.red('# If install error try manually run `npm install`'))
    this.log(chalk.yellow('# ========================'))
    this.log('')

    this.npmInstall()
  }


  // UTILS
  _mergeJson(fileName, newContent) {
    const content = this.fs.readJSON(this.destinationPath(fileName), {});

    _.mergeWith(content, newContent, (a, b) => {
      if (_.isArray(a)) {
        return _.uniq(a.concat(b));
      }
    });

    this.fs.writeJSON(this.destinationPath(fileName), content);
  }

  _copy(from, to) {
    this.fs.copy(this.templatePath(from), this.destinationPath(to))
  }

  _copyTpl(from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this)
  }

  // installingLodash
  // installingLodash() {
  //   this.npmInstall('lodash', {
  //     'save-dev': true
  //   })
  // }

  // show destination/template context
  // showContext() {
  //   this.log('dest root', this.destinationRoot())
  //   this.log('dest path', this.destinationPath())

  //   this.log('temp root', this.sourceRoot())
  //   this.log('temp path', this.templatePath())
  // }
};


// Generate project in current directory
// Project name
// Project description
// Author
// Install vue-router?
// Install vuex?
// Use ESLint to lint your code?
// Set up unit tests
// Jest
// Karma and Mocha
// Setup e2e tests with Nightwatch?