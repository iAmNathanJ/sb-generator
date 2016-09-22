'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    // this.log(yosay(
    //   'Let\'s make a pattern with the ' + chalk.red('generator-sb-pattern') + ' generator!'
    // ));

    var prompts = [{
      type: 'input',
      name: 'patternName',
      message: 'Pattern name?',
      default: ''
    }];

    return this.prompt(prompts).then(function (props) {
      this.destinationRoot('./src/templates/partials');
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.template(
      this.templatePath('pattern.hbs'),
      this.destinationPath(`${this.props.patternName}/_${this.props.patternName}.hbs`),
      this.props
    );

    this.template(
      this.templatePath('pattern.scss'),
      this.destinationPath(`${this.props.patternName}/_${this.props.patternName}.scss`),
      this.props
    );

    this.template(
      this.templatePath('README.md'),
      this.destinationPath(`${this.props.patternName}/README.md`),
      this.props
    );
  },

  install: function () {
    // this.installDependencies();
  }
});
