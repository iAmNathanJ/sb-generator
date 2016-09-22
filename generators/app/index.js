'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Let\'s make a pattern with the ' + chalk.red('generator-sb-pattern') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'patternName',
      message: 'Pattern name?',
      default: '',
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('pattern.hbs'),
      this.destinationPath(`./src/templates/partials/${this.props.patternName}/${this.props.patternName}.hbs`)
    );

    this.fs.copy(
      this.templatePath('pattern.scss'),
      this.destinationPath(`./src/templates/partials/${this.props.patternName}/${this.props.patternName}.scss`)
    );

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath(`./src/templates/partials/${this.props.patternName}/README.md`)
    );
  },

  install: function () {
    // this.installDependencies();
  }
});
