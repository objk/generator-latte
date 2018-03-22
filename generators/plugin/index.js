/*
* @Author: WUZHILONG860
* @Date:   2018-03-22 20:01:59
* @Last Modified by:   WUZHILONG860
* @Last Modified time: 2018-03-22 20:07:37
*/
'use strict';

var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('vuejs');
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('tpl.js'),
      this.destinationPath('plugin/' + this._args[0] + '.js')
    );
  }
}