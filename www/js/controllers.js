angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicPush, $ionicUser) {
})

  .controller('DashCtrl', function($scope, $rootScope, $ionicUser, $ionicPush, $ionicDeploy) {
    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      console.log('Got token', data.token, data.platform);
      // Do something with the token
    });

    //Registration with push service
    $scope.registerWithPushService = function() {
      $ionicPush.register({
        canShowAlert: true, // Can pushes show an alert on your screen?
        canSetBadge: true, // Can pushes update app icon badges?
        canPlaySound: true, // Can notifications play a sound?
        canRunActionsOnWake: true, // Can run actions outside the app,
        onNotification: function(notification) {
          // Handle push notifications here
          console.log(notification);
          return true;
        }
      });
    };


    //Basic registration
    $scope.pushRegister = function() {
      alert('Registering...');

      $ionicPush.register({
        canShowAlert: false,
        onNotification: function(notification) {
          // Called for each notification for custom handling
          $scope.lastNotification = JSON.stringify(notification);
        }
      }).then(function(deviceToken) {
        $scope.token = deviceToken;
        alert(deviceToken);
      });
    }


    // Identifies a user with the Ionic User service
    $scope.identifyUser = function() {
      console.log('Ionic User: Identifying with Ionic User service');

      alert('Identifying');
      console.log('Identifying user');
      var user = $ionicUser.get();
      if(!user.user_id) {
        // Set your user_id here, or generate a random one
        user.user_id = $ionicUser.generateGUID();
        alert(user.user_id);
      };

      // Add some metadata to your user object.
      angular.extend(user, {
        name: 'Ionitron',
        bio: 'I come from planet Ion'
      });

      // Identify your user with the Ionic User Service
      $ionicUser.identify(user).then(function(){
        $scope.identified = true;
        alert('Identified user ' + user.name + '\n ID ' + user.user_id);
      });
    };


    // Check Ionic Deploy for new code
    $scope.checkForUpdates = function() {
      console.log('Ionic Deploy: Checking for updates');
      alert('Ionic Deploy: Checking for updates');
      $ionicDeploy.check().then(function(hasUpdate) {
        console.log('Ionic Deploy: Update available: ' + hasUpdate);
        alert('Ionic Deploy: Update available: ' + hasUpdate);
        $scope.hasUpdate = hasUpdate;
      }, function(err) {
        console.error('Ionic Deploy: Unable to check for updates', err);
        alert('Ionic Deploy: Unable to check for updates', err);
      });
    }


    // Update app code with new release from Ionic Deploy
    $scope.doUpdate = function() {
      $ionicDeploy.update().then(function(res) {
        console.log('Ionic Deploy: Update Success! ', res);
        alert('Ionic Deploy: Update Success! ', res);
      }, function(err) {
        console.log('Ionic Deploy: Update error! ', err);
        alert('Ionic Deploy: Update error! ', err);
      }, function(prog) {
        console.log('Ionic Deploy: Progress... ', prog);
      });
    };

  })

