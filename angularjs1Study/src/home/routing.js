routes.$injector = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			template: require('./template.html'),
			controller: 'HomeController'
		})
}