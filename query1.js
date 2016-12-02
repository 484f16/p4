//query1 : find users who live in the specified city. 
// Returns an array of user_ids.


function find_user(city, dbname){
    db = db.getSiblingDB(dbname)
    //implementation goes here
    ans = [];
    // var ans = db.users.find({"$hometown.city":city},{user_id:1,_id:0});
    // var ans = db.users.find({"hometown.city":"Bucklebury"},{user_id:1, _id:0});
    // var ans = db.cities.find({"_id":'Bucklebury'},{user_id:1, _id:0});
    // while (mycursor.hasNext()){
    // 	var w = mycursor.next();
    // 	print (w.user_id, w.DOB);
    // }
    var mycursor = db.users.find();
    while(mycursor.hasNext()){
        var curt = mycursor.next();
        if (curt.hometown.city == city){
            ans.push(curt.user_id);
        }
    }
    // console.log("Hello there");
    return ans;

    // returns a Javascript array. See test.js for a partial correctness check.  
    // This will be  an array of integers. The order does not matter.                                                               

}
