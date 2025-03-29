app.controller('AdminController', function($scope,$http){
    $scope.pools = [];
  });
  app.controller('ItemController', function(dataFactory,$scope,$http){
    $scope.data = [];
    $scope.pageNumber = 1;
    $scope.libraryTemp = {};
    $scope.totalItemsTemp = {};
    $scope.totalItems = 0;
    $scope.pageChanged = function(newPage) {
      getResultsPage(newPage);
    };
    getResultsPage(1);
    function getResultsPage(pageNumber) {
        if(! $.isEmptyObject($scope.libraryTemp)){
            dataFactory.httpRequest('/items?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {
              $scope.data = data.data;
              $scope.totalItems = data.total;
              $scope.pageNumber = pageNumber;
            });
        }else{
          dataFactory.httpRequest('/items?page='+pageNumber).then(function(data) {
            $scope.data = data.data;
            $scope.totalItems = data.total;
            $scope.pageNumber = pageNumber;
          });
        }
    }
    $scope.searchDB = function(){
        if($scope.searchText.length >= 3){
            if($.isEmptyObject($scope.libraryTemp)){
                $scope.libraryTemp = $scope.data;
                $scope.totalItemsTemp = $scope.totalItems;
                $scope.data = {};
            }
            getResultsPage(1);
        }else{
            if(! $.isEmptyObject($scope.libraryTemp)){
                $scope.data = $scope.libraryTemp ;
                $scope.totalItems = $scope.totalItemsTemp;
                $scope.libraryTemp = {};
            }
        }
    }
    $scope.saveAdd = function(){
      dataFactory.httpRequest('itemsCreate','POST',{},$scope.form).then(function(data) {
        $scope.data.push(data);
        $(".modal").modal("hide");
      });
    }
    $scope.edit = function(id){
      dataFactory.httpRequest('itemsEdit/'+id).then(function(data) {
          console.log(data);
            $scope.form = data;
      });
    }
    $scope.saveEdit = function(){
      dataFactory.httpRequest('itemsUpdate/'+$scope.form.id,'PUT',{},$scope.form).then(function(data) {
            $(".modal").modal("hide");
          $scope.data = apiModifyTable($scope.data,data.id,data);
      });
    }
    $scope.remove = function(item,index){
      var result = confirm("Are you sure delete this item?");
         if (result) {
        dataFactory.httpRequest('itemsDelete/'+item.id,'DELETE').then(function(data) {
            $scope.data.splice(index,1);
        });
      }
    }
  });

app.controller('ItemsController', ['$scope', 'ItemService', function($scope, ItemService) {
    $scope.items = [];
    $scope.error = '';

    // Fetch all items
    $scope.loadItems = function() {
        ItemService.getAllItems()
            .then(function(response) {
                $scope.items = response.data;
            })
            .catch(function(error) {
                $scope.error = 'Error fetching items: ' + error.message;
            });
    };

    // Delete an item
    $scope.deleteItem = function(id) {
        if (confirm('Are you sure you want to delete this item?')) {
            ItemService.deleteItem(id)
                .then(function() {
                    $scope.loadItems(); // Reload items after deletion
                })
                .catch(function(error) {
                    $scope.error = 'Error deleting item: ' + error.message;
                });
        }
    };

    // Initialize
    $scope.loadItems();
}]);