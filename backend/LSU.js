var data = 0;
exports.data = data; 
exports.set = function(value) {
    data = value;
    //console.log("data",data);
};
exports.get = function() {
    return data;
};
exports.runmodel = function(table_data) {
    return table_data *2 ;
};
