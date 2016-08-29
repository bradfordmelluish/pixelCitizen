angular.module('citizen', [
  'citizen.services',
  'citizen.auth',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/viewer', {
      templateUrl: 'app/viewer/viewer.html',
      authenticate: true
    })
    .otherwise({
      redirectTo: '/viewer'
    });
  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (obj) {
      var jwt = $window.localStorage.getItem('com.citizen');
      if (jwt) { 
        obj.headers['x-access-token'] = jwt;
      }
      obj.headers['Allow-Control-Allow-Origin'] = '*';
      return obj;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    next.$$route && next.$$route.authenticate && !Auth.isAuth() && $location.path('/signin');
  });
});