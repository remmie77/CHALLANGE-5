myApp.controller('MessageController', ['$http', function ($http) {
    const vm = this;
    vm.message = [];
    getMessages();

    vm.addMessage = function (message) {
        $http({
            method: 'POST',
            url: '/message',
            data: message
        }).then(function (response) {
            console.log('MessageController - addMessage - response', response.data);
            getMessages();
        }).catch(function (error) {
            console.log('MessageController - addMessage - error', error.statusText);
        });
    }

    function getMessages() {
        $http({
            method: 'GET',
            url: '/message'
        }).then(function (response) {
            console.log('MessageController - getMessages - response', response.data);
            vm.message = response.data;
        }).catch(function (error) {
            console.log('MessageController - getMessages - error', error.statusText);
        })
    }
}]);