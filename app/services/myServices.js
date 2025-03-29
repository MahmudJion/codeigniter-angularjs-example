app.factory('dataFactory', function($http) {
    var myService = {
      httpRequest: function(url,method,params,dataPost,upload) {
        var passParameters = {};
        passParameters.url = url;
        if (typeof method == 'undefined'){
          passParameters.method = 'GET';
        }else{
          passParameters.method = method;
        }
        if (typeof params != 'undefined'){
          passParameters.params = params;
          passParameters.params = params;
        }
        if (typeof dataPost != 'undefined'){
          passParameters.data = dataPost;
        }
        if (typeof upload != 'undefined'){
           passParameters.upload = upload;
        }
        var promise = $http(passParameters).then(function (response) {
          if(typeof response.data == 'string' && response.data != 1){
            if(response.data.substr('loginMark')){
                location.reload();
                return;
            }
            $.gritter.add({
              title: 'Application',
              text: response.data
            });
            return false;
          }
          if(response.data.jsMessage){
            $.gritter.add({
              title: response.data.jsTitle,
              text: response.data.jsMessage
            });
          }
          return response.data;
        },function(){
          $.gritter.add({
            title: 'Application',
            text: 'An error occured while processing your request.'
          });
        });
        return promise;
      }
    };
    return myService;
  });

app.factory('ItemService', ['$http', function($http) {
    var baseUrl = 'http://localhost/codeigniter-angularjs-example/api/items';

    return {
        getAllItems: function() {
            return $http.get(baseUrl);
        },
        getItemById: function(id) {
            return $http.get(baseUrl + '/' + id);
        },
        createItem: function(data) {
            return $http.post(baseUrl, data);
        },
        updateItem: function(id, data) {
            return $http.put(baseUrl + '/' + id, data);
        },
        deleteItem: function(id) {
            return $http.delete(baseUrl + '/' + id);
        }
    };
}]);