angular.module('quizme.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function () {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function () {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function () {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CollectionsCtrl', function ($scope, Omeka) {
  var promise = Omeka.getCollections();
  promise.then(function (collections) {
    $scope.collections = collections.data;
    console.log($scope.collections);
  });
})

.controller('CollectionCtrl', function ($scope, $stateParams, Omeka) {
  var collection = Omeka.getCollection($stateParams.collectionId);
  collection.then(function (collectionInfo) {
    $scope.collection = collectionInfo.data;
  });

  var items = Omeka.getCollectionItems($stateParams.collectionId);
  items.then(function (itemInfo) {
    $scope.items = itemInfo.data;
    console.log($scope.items);
  });
})

.controller('ItemCtrl', function ($scope, $stateParams, Omeka) {
  var item = Omeka.getItem($stateParams.itemId);
  item.then(function (itemInfo) {
    $scope.item = itemInfo.data;
    console.log($scope.item);
  });

  var files = Omeka.getItemFiles($stateParams.itemId);
  files.then(function (fileInfo) {
    $scope.files = fileInfo.data;
    console.log($scope.files);
  });

  $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
    }
 
    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
    }
 
    $scope.cardDestroyed = function(index) {
        $scope.files.splice(index, 1);
        console.log('Card removed');
    }
});
