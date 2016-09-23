'use strict';
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
// var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('patternName', {type: String, required: true});
    // And you can then access it later on this way; e.g. kebab-cased
    this.patternName = _.kebabCase(this.patternName);
    this.title = _.startCase(this.patternName);
  },

  prompting: function () {
    var prompts = [{
      type: 'confirm',
      name: 'jsFile',
      message: 'Include JS file?',
      default: false
    }, {
      type: 'confirm',
      name: 'dataFile',
      message: 'Include data file?',
      default: false
    }];

    return this.prompt(prompts).then(function (props) {
      this.destinationRoot('./src');
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.template(
      this.templatePath('pattern.hbs'),
      this.destinationPath(`templates/partials/${this.patternName}/_${this.patternName}.hbs`),
      this
    );

    this.template(
      this.templatePath('pattern.scss'),
      this.destinationPath(`templates/partials/${this.patternName}/_${this.patternName}.scss`),
      this
    );

    this.template(
      this.templatePath('README.md'),
      this.destinationPath(`templates/partials/${this.patternName}/README.md`),
      this
    );

    if (this.props.jsFile) {
      this.template(
        this.templatePath('pattern.js'),
        this.destinationPath(`templates/partials/${this.patternName}/${this.patternName}.js`),
        this
      );
    }

    if (this.props.dataFile) {
      this.template(
        this.templatePath('pattern.yml'),
        this.destinationPath(`data/${this.patternName}.yml`),
        this
      );
    }

    var scssMainPath = path.resolve('scss/main.scss');
    var scssMainContent = this.read(scssMainPath);
    var newScss = `@import "${this.patternName}/${this.patternName}";`;
    var msg = `\n${scssMainContent}${chalk.bold(newScss)}\n`;
    var newScssContent = `${scssMainContent}${newScss}\n`;
    fs.writeFile(scssMainPath, newScssContent, () => {
      this.log(msg);
      this.log(chalk.green('main.scss updated'));
    });
  },

  install: function () {
    // this.installDependencies();
  }
});
