(function () {

    angular.module('app')
        .controller('ClassroomController', ['$stateParams', 'notifier', 'dataService', ClassroomController]);

    function ClassroomController($stateParams, notifier, dataService) {

        var vm = this;

        vm.month = $stateParams.month;
        

        dataService.getClassroom($stateParams.id)
            .then(function(classroom) {
                vm.currentClassroom = classroom;

                if($stateParams.month) {
                    if(classroom.activities && classroom.activities.length > 0) {
                        vm.timePeriod = dataService.getMonthName($stateParams.month);
                    }
                    else {
                        vm.timePeriod = 'No activities this month';
                    }
                }
                else {
                    vm.timePeriod = 'All activities';
                }
            })
            .catch(showError);
        
        function showError (message) {
            notifier.error(message);
        };

    }

}());