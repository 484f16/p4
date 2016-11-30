// query 4: find user pairs such that, one is male, second is female,
// their year difference is less than year_diff, and they live in same
// city and they are not friends with each other. Store each user_id
// pair as arrays and return an array of all the pairs. The order of
// pairs does not matter. Your answer will look something like the following:
// [
//      [userid1, userid2],
//      [userid1, userid3],
//      [userid4, userid2],
//      ...
//  ]
// In the above, userid1 and userid4 are males. userid2 and userid3 are females.
// Besides that, the above constraints are satisifed.
// userid is the field from the userinfo table. Do not use the _id field in that table.


function arrayContainsElement(arr, item){
	if (!arr){
		return false;
	}
	for (var i = 0; i < arr.length ; i++){
		if (arr[i] == item){
			return true;
		}
	}
	return false;
}
  
function suggest_friends(year_diff, dbname) {
    db = db.getSiblingDB(dbname)
    //implementation goes here
    var ans = [];

	// var mycursor = db.users.aggregate( [ { $unwind : "$friends" } ]); 
	var mycursor = db.cities.find();
	// var curtUsers = [1,3,2,4,5,6];
	while (mycursor.hasNext()) {
	    var curtUsers = mycursor.next().users; 

	    
	    if(!curtUsers){
	    	continue;
	    }
	    var user1;
	    for (var i = 0; i < curtUsers.length ; i++){
		    if(!curtUsers){
		    	continue;
		    }	    	
	    	var user1 = db.users.find({user_id:curtUsers[i]});
	    	if (user1.gender == "female"){
	    		continue;
	    	}
	    	for (var j = i + 1; j < curtUsers.length; j++){
	    		// if they're friends
	    		if (arrayContainsElement(user1.friends,curtUsers[j]) ){
	    			continue;
	    		}
	    		// year_diff and gender
	    		var user2 = db.users.find({user_id: curtUsers[j]});
	    		if (user2.gender == "male" || Math.abs(user1.YOB - user2.YOB) >= year_diff ||arrayContainsElement(user2.friends,curtUsers[i]) ){
	    			continue;
	    		}

	    		ans.add([curtUsers[i],curtUsers[j]]);
	    	}
	    }



	}    
	return ans;
  
    // Return an array of arrays.
}
