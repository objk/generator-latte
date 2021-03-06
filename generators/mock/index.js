/*
* @Author: WUZHILONG860
* @Date:   2018-03-22 19:55:12
* @Last Modified by:   WUZHILONG860
* @Last Modified time: 2018-03-22 20:34:20
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
      this.templatePath('data.json'),
      this.destinationPath('data/' + this._args[0] + '.json')
    );
  }

  _componentPath() {
    if (this._args[0].indexOf('/') > -1) {
      const arr = this._args[0].split('/')
      return arr[0] + '/' + arr[1].charAt(0).toUpperCase() + arr[1].slice(1)
    }

    return this._args[0].charAt(0).toUpperCase() + this._args[0].slice(1)
  }

  _componentModule() {
    return this._args[0].split('/')[0]
  }

  _componentName() {
    if (this._args[0].indexOf('/') > -1) {
      const arr = this._args[0].split('/')
      return arr[1].charAt(0).toUpperCase() + arr[1].slice(1)
    }

    return this._args[0].charAt(0).toUpperCase() + this._args[0].slice(1)
    // return this._args[0].split('/')[1]
  }
}