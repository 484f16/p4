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
	for (var i = 0; i < Object.keys(arr).length ; i++){
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
	print(mycursor)
	// var curtUsers = [1,3,2,4,5,6];
	while(mycursor.hasNext()) {
	    var curtUsers = mycursor.next().users; 
	//     print (curtUsers)
	    
	    // var user1 = db.users.find({"user_id":curtUsers[0]});
	    // while(user1.hasNext()){
	    // 	var curtUser = user1.next()
	    // 	print(curtUser.gender)
	    // }


	    for (var i = 0; i < Object.keys(curtUsers).length ; i++){

	    	var user1 = db.users.find({user_id:curtUsers[i]});
	    	// this is important
	    	user1 = user1.next();
	    	// print(user1.gender);
	    	// if (user1.gender == "female"){
	    	// 	continue;
	    	// }
	    	for (var j = i + 1; j < Object.keys(curtUsers).length; j++){
	    		// if they're friends
	    		if (arrayContainsElement(user1.friends,curtUsers[j]) ){
	    			continue;
	    		}
	    		// year_diff and gender
	    		var user2 = db.users.find({user_id: curtUsers[j]});
	    		user2 = user2.next();
	    		if ( Math.abs(user1.YOB - user2.YOB) >= year_diff ||arrayContainsElement(user2.friends,curtUsers[i]) ){
	    			continue;
	    			// print("don't match")
	    		}
	    		// gender
	    		if (user1.gender == user2.gender){
	    			continue;
	    		}
	    		if (user1.gender == "male" && user2.gender == "female" ){
		    		print ("match : "+curtUsers[i] + " i is "+ i + "   " + curtUsers[j]+ " j is "+j)
		    		ans.push([curtUsers[i],curtUsers[j]]);						    			
	    		}else{
		    		print ("match : "+curtUsers[j] + " i is "+ j + "   " + curtUsers[i]+ " j is "+i)
		    		ans.push([curtUsers[j],curtUsers[i]]);	    			
	    		}

	    	}
	    }



	}    
	return ans;
  
    // Return an array of arrays.
}
