//find the oldest friend for each user who has a friend. For simplicity, use only year of birth to determine age, if there is a tie, use the one with smallest user_id
//return a javascript object : key is the user_id and the value is the oldest_friend id
//You may find query 2 and query 3 helpful. You can create selections if you want. Do not modify users collection.
//
//You should return something like this:(order does not matter)
//{user1:userx1, user2:userx2, user3:userx3,...}

function oldest_friend(dbname){
  db = db.getSiblingDB(dbname)

  var ans = {};

  var mycursor = db.users.find();
  while (mycursor.hasNext()){
  	var curtUser = mycursor.next();
  	if (curtUser.friends.isEmpty()){
  		continue;
  	}
  	var curtFriends = db.flat_users.find({user_id:curtUser.user_id});
  	var oldest_year = Number.MAX_VALUE;
  	var oldest_user_id;
  	for (var i = 0; i < curtFriends.length() ; i++){
  		var YOB = db.users.find({user_id:curtFriends[i].friends}).YOB;
  		if (YOB < oldest_year){
  			oldest_year = YOB;
  			oldest_user_id = curtFriends[i].friends;
  		}else if (YOB = oldest_year && curtFriends[i].friends < oldest_user_id){
  			oldest_user_id = curtFriends[i].friends;
  		}
  	}
  	ans[curtUser.user_id] = oldest_user_id;

  }


  return ans;
  //return an javascript object described above

}
