(function () {

    var TrackerController = function ($scope, logsFactory, statusFactory, projectsFactory, $interval) {
        $scope.loaded = false;
        $scope.bloodPressure = null;
        $scope.status = null;
        $scope.projectsRaw = null;
        $scope.projectsConverted = null;
        var _intervalId;

        function init() {
            
            $scope.projectsRaw = projectsFactory.getProjects();
            $scope.projectsRaw.$watch(function () {
                $scope.projectsConverted = [];
                for (var i = 0, len = $scope.projectsRaw.length; i < len; i++) {
                    var _id = $scope.projectsRaw[i].$id;
                    var _name = $scope.projectsRaw[i].name;
                    $scope.projectsConverted.push({
                        id: _id,
                        name: _name
                    });
                };
            });

            $scope.status = statusFactory.getStatus();

            $scope.status.$loaded(function () {
                $scope.loaded = true;
            });
        }
           
        $scope.submitValue = function (newBP) {
            
            
            if (!!$scope.status.activeProjectId) {
                $scope.status.active = true;
                $scope.status.dateStart = moment().format('x');
                $scope.status.$save();
            }
            
            
            if (!!$scope.status.dateStart) {
                
                var bloodPressure = $scope.newBP;
                if (bloodPressure > 0) {
                    logsFactory.addLog($scope.status.activeProjectId, $scope.status.dateStart, bloodPressure, $scope.status.notes);
                }
                
            }
            $scope.newBP = null;
            $scope.status.active = false;
            $scope.status.$save();
            
        };

        init();
    };

    TrackerController.$inject = ['$scope', 'logsFactory', 'statusFactory', 'projectsFactory', '$interval'];

    angular.module('appTimeTracker').controller('TrackerController', TrackerController);

}());