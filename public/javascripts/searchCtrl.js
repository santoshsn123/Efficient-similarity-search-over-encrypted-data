app.controller('searchCtrl', function ($scope, $http, $cookieStore, $mdDialog,Upload) {
console.log("search Controller called");

$scope.searchFuc = function()
{
    $scope.fileTitle;
    
    $http({
        method: 'POST',
        url: '/searchFile',
        data: {user:$cookieStore.get('LoggedInuser'),searchKey:$scope.searchKey},
    }).then(function successCallback(response) {
        console.log("Success : - ", response);
        $scope.searchReasult = response.data.data;
        $scope.message = response.data.message;
    }, function errorCallback(response) {
        console.log("Error : - ", response);
    });
}

// $scope.highlight = function(haystack, needle) {
//     if(!needle) {
//         return $scope.trustAsHtml(haystack);
//     }
//     return $scope.trustAsHtml(haystack.replace(new RegExp(needle, "gi"), function(match) {
//         return '<span class="highlightedText">' + match + '</span>';
//     }));
// };

});