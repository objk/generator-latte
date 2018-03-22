/*
* @Author: WUZHILONG860
* @Date:   2018-03-22 18:12:12
* @Last Modified by:   WUZHILONG860
* @Last Modified time: 2018-03-22 20:35:42
*/
'use strict';

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('vuejs');
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('tpl.html'),
      this.destinationPath('src/views/' + this._viewPath() + '.html'),
      {
        viewName: this._viewName(),
        title: this._args[1] !== '' ? this._args[1] : false
      }
    );

    this.fs.copyTpl(
      this.templatePath('tpl.js'),
      this.destinationPath('src/views/' + this._viewPath() + '.js'),
      { viewName: this._viewName() }
    );

    this.fs.copyTpl(
      this.templatePath('tpl.vue'),
      this.destinationPath('src/views/' + this._viewPath() + '.vue'),
      { viewName: this._viewName() }
    );
  }

  _viewPath() {
    return this._args[0] + '/' + this.args[0]
  }

  _viewName() {
    return this._args[0]
  }
}