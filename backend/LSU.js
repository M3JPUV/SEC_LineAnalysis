//ZB.
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
    //getting avg from a 2d table(array/list)
    var avg = 0;
    var total  = 0;
    var i,j,n = 0;
    
    console.log("Y length " + table_data.length);
    console.log("X length " + table_data[0].length);
    //console.log(table_data[0][0]);
    //console.log(table_data[0]);
    
    for (i = 0;i!=table_data.length; i++){
        for (j = 0;j != table_data[i].length; j++){
            
            total += table_data[i][j];
            // note: table_data[j] returns a string not a int 
            n++;
        }
    }
    avg = (total/(n));
    return avg;
};
