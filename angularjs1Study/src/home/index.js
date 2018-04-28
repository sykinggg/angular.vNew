import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './routing';
import HomeController from './controller';

export default angular.module('home', [uirouter])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;