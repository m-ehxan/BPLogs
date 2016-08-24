(function () {

    var ProjectsController = function ($scope, projectsFactory, logsFactory) {
        $scope.loaded = false;
        $scope.projects = null;
        $scope.logs = null;

        function init() {
            $scope.projects = projectsFactory.getProjects();
            $scope.logs = logsFactory.getLogs();
            
            $scope.logs.$loaded().then(function (x) {
                $scope.loaded = x === $scope.logs;
            });
        }
        
        $scope.getReadings = function (project) {
            
            return $scope.logs.length;
        };

        $scope.addProject = function (name) {
            $scope.projects.$add({
                name: name
            });
            $scope.newProjectName = null;
        };

        $scope.deleteProject = function (project) {
            var _id = project.$id;
            if ($scope.logs.length > 0) {
                for (var i = 0, len = $scope.logs.length; i < len; i++) {
                    if ($scope.logs[i].projectId == _id) {
                        $scope.logs.$remove($scope.logs[i]);
                    }
                }
            }
            $scope.projects.$remove(project);
        };

        init();
    };

    ProjectsController.$inject = ['$scope', 'projectsFactory', 'logsFactory'];

    angular.module('appTimeTracker').controller('ProjectsController', ProjectsController);

}());