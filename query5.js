//find the oldest friend for each user who has a friend. For simplicity, use only year of birth to determine age, if there is a tie, use the one with smallest user_id
//return a javascript object : key is the user_id and the value is the oldest_friend id
//You may find query 2 and query 3 helpful. You can create selections if you want. Do not modify users collection.
//
//You should return something like this:(order does not matter)
//{user1:userx1, user2:userx2, user3:userx3,...}

function oldest_friend(dbname){
  db = db.getSiblingDB(dbname)

  var ans = {};
  var cnt = 0;
  var mycursor = db.users.find();
  while (mycursor.hasNext()){
  	var curtUser = mycursor.next();
  	if (Object.keys(curtUser.friends).length == 0){
  		continue;
  	}
    // var curtUserYOB = curtUser
  	var curtFriends = db.flat_users.find({user_id:curtUser.user_id});
  	var oldest_year = Number.MAX_VALUE;
  	var oldest_user_id;
    
  	// for (var i = 0; i < Object.keys(curtFriends).length ; i++){
    while (curtFriends.hasNext()){
      var curtFriend = curtFriends.next();
      // print (curtFriend.friends)
  		var YOB = db.users.find({user_id:curtFriend.friends});

      if (YOB.hasNext()){
        YOB = YOB.next();
      }

      var YOB = YOB.YOB;
      // print (YOB)
  		if (YOB < oldest_year){
  			oldest_year = YOB;
  			oldest_user_id = curtFriend.friends;
        // print (oldest_year+ "    " +oldest_user_id)
  		}
      else if (YOB == oldest_year && curtFriend.friends < oldest_user_id){
  			oldest_user_id = curtFriend.friends;
  		}
      if (!ans.hasOwnProperty(curtFriend.friends)){
        ans[curtFriend.friends] = curtUser.user_id;
      }else{
        var ansYOB = db.users.find({user_id:ans[curtFriend.friends]});
        ansYOB = ansYOB.next().YOB;

        if(ansYOB > curtUser.YOB || (ansYOB == curtUser.YOB && ans[curtFriend.friends] > curtUser.user_id)){
          ans[curtFriend.friends] = curtUser.user_id;
        }
      }
  	}
    cnt = cnt + 1;
    if (!ans.hasOwnProperty(curtUser.user_id)){
      print ("The index is : "+ cnt +"  curt User is : "+ curtUser.user_id+" and the oldest_friend id is: "+ oldest_user_id)
      ans[curtUser.user_id] = oldest_user_id;      
    }else{
      var ansYOB = db.users.find({user_id:ans[curtFriend.friends]});
      ansYOB = ansYOB.next().YOB;
      if (oldest_year < ansYOB || (oldest_year == ansYOB && oldest_user_id<ans[curtUser.user_id])){
        print ("The index is : "+ cnt +"  curt User is : "+ curtUser.user_id+" and the oldest_friend id is: "+ oldest_user_id)
        ans[curtUser.user_id] = oldest_user_id;        
      }
    }
  }


  return ans;
  //return an javascript object described above

}
