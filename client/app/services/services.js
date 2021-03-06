angular.module('citizen.services', [])
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST', 
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };
  var signup = function (user) {
    return $http({
      method: 'POST',
      url: 'api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };
  var isAuth = function () {
    return !!$window.localStorage.getItem('com.citizen');
  };
  var signout = function () {
    $window.localStorage.removeItem('com.citizen')
    $location.path('/signin');
  };
  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});