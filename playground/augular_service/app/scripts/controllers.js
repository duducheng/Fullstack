'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.showMenu = false;
  $scope.message = 'Loading...';

  menuFactory.getDishes().query(
    function(response) {
      $scope.dishes = response; //success function take response directly the data
      $scope.showMenu = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  ); //default is empty []

  $scope.select = function(setTab) {
    $scope.tab = setTab;

    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } else if (setTab === 3) {
      $scope.filtText = "mains";
    } else if (setTab === 4) {
      $scope.filtText = "dessert";
    } else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function(checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };
}])

.controller('ContactController', ['$scope', function($scope) {

  $scope.feedback = {
    mychannel: "",
    firstName: "",
    lastName: "",
    agree: false,
    email: ""
  };

  var channels = [{
    value: "tel",
    label: "Tel."
  }, {
    value: "Email",
    label: "Email"
  }];

  $scope.channels = channels;
  $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
  $scope.showMessage = false;

  $scope.sendFeedback = function() {

    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
      $scope.invalidChannelSelection = true;
      console.log('incorrect');
    } else {
      $scope.invalidChannelSelection = false;

      feedbackFactory.getFeedback().save($scope.feedback).$promise.then(
        function() {
          $scope.showMessage = true;
          $scope.showSucceed = true;
          $scope.message = "We really care what you think, thank you!";
          $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
          };
          $scope.feedback.mychannel = "";
          $scope.feedbackForm.$setPristine();
          setTimeout(function() {
            if ($scope.feedbackForm.$pristine) {
              window.location.reload();
            }
          }, 6666);
        },
        function(response) {
          $scope.showMessage = true;
          $scope.showSucceed = false;
          $scope.message = "Sorry but we didn't receive you feedback, please try again later. Error: " + response.status + " " + response.statusText;
        }
      );

      console.log($scope.feedback);
    }

  };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
  $scope.showDish = false;
  $scope.message = "Loading ...";
  menuFactory.getDishes().get({
      id: parseInt($stateParams.id, 10)
    })
    .$promise.then(
      function(response) {
        $scope.dish = response;
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
}])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  //This scope is under DishDetailController, which should be check in the DOM
  //Saying, we can directly get all the things under DishDetailController

  $scope.mycomment = {
    rating: 5,
    author: "",
    date: new Date().toISOString()
  };

  $scope.submitComment = function() {

    $scope.mycomment.date = new Date().toISOString();
    console.log($scope.mycomment);

    $scope.dish.comments.push($scope.mycomment);

    menuFactory.getDishes().update({
      id: $scope.dish.id
    }, $scope.dish);

    $scope.commentForm.$setPristine();

    $scope.mycomment = {
      rating: 5,
      comment: "",
      author: "",
      date: ""
    };
  }
}])

// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

  $scope.showDish = false;
  $scope.showPromotion = false;
  $scope.showLeader = false;
  $scope.message = "Loading ...";

  menuFactory.getDishes().get({
    id: 0
  }).$promise.then(
    function(response) {
      $scope.dish = response;
      $scope.showDish = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  );

  menuFactory.getPromotions().get({
    id: 0
  }).$promise.then(
    function(response) {
      $scope.promotion = response;
      $scope.showPromotion = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  );

  corporateFactory.getLeaders().get({
      id: 3
    })
    .$promise.then(
      function(response) {
        $scope.leader = response;
        $scope.showLeader = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
  $scope.showLeaders = false;
  $scope.message = "Loading ...";

  corporateFactory.getLeaders().query(
    function(response) {
      $scope.learders = response; //success function take response directly the data
      $scope.showLeaders = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  );
}])

.controller('GithubController', ['$scope', 'GithubFactory', function($scope, GithubFactory) {
  $scope.message = 'This message is showing...';

  GithubFactory.getDB().get().$promise.then(
    function(response) {
      console.log(response);
      $scope.dishes = response.dishes;
      $scope.message = 'return github';
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    });
  GithubFactory.getDB().save({
    mychannel: "",
    firstName: "duducheng",
    lastName: "jiancheng",
    agree: false,
    email: "eee@eee.com"
  });
}])

;
