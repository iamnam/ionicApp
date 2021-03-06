/**
 * Created by kimsuho on 15. 8. 1..
 */
(function(app){
    "use strict";
    app.controller('TodoCtrl', function($scope, Toast, $http, $location, $state, $firebaseObject, $firebaseArray, $cordovaSocialSharing){
        var ref = new Firebase("https://suho.firebaseio.com/todo");
        $scope.datas = $firebaseArray(ref);


        $scope.add = function(todo){
            if(!todo.text){
                return;
            }
            $scope.datas.$add({
                name : todo.text
            });
            todo.text = '';
        };

        /*$scope.people = [
            {name: 'suho',age: 31},
            {name: 'nayeon', age: 27},
            {name: 'dfefe', age : 30},
            {name: 'afdazf', age: 25}
        ]; Mock Array*/

        $scope.listCanSwipe = true;

        $scope.share = function(p){
            /*$cordovaSocialSharing
                .shareViaSMS(p.name, '핸드폰번호')
                .then(function(result) {
                    console.log(result);
                }, function(err) {
                    console.log(err);
                    // An error occurred. Show a message to the user
                });*/


            //jp.naver.line.android
            $cordovaSocialSharing
                .shareVia('com.kakao.talk', p.name, '', '')
                .then(function(result) {
                    // Success!
                    console.log(result);
                }, function(err) {
                    console.log(err);
                    // An error occurred. Show a message to the user
                });



            //alert(p.name + ': '+ p.age);


        };
        $scope.edit = function(p){
            alert(p.name + ': '+ p.age);
        };
        $scope.hahaha = function(str){
            Toast.show(str);
        };

        $scope.toast = function(msg){
            Toast.show(msg);
            $http.get('http://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=8d554a626fc5d01d77812b612a6de257', {}).success(function(res){
                console.log(res);
            }).error(function(err){
                console.log(err);
            });
        };

        $scope.goNextPage = function(name){
            //페이지 이동 코드 파라미터는 유니크한 값
            /*$location.search(name); //search() 에 인자가 있으면 세터 없으면 게터
            $location.path('/app/todo/detail'); //페이지 이동*/

            $state.go('app.detail', {name : name});
        };

        $scope.delete = function(index){
            $scope.datas.$remove(index);
            //var array = [];
            //array.splice(index, 1);
        };







        window.$scope = $scope;
    });
}(app));









