// query6 : Find the Average friend count per user for the Users
// collection.  We define the `friend count` as the number of friends
// of a user. The average friend count per user is the average `friend
// count` towards a collection of users. In this function we ask you
// to find the `average friend count per user` for the users in the
// Users collection.
//
// Return a decimal variable as the average user friend count of all users
// in the Users collection.

function find_average_friendcount(dbname){
  db = db.getSiblingDB(dbname)
  // Implementation goes here

  var mycursor = db.users.find();
  var cnt = 0;
  var amountFriends = 0;
  while (mycursor.hasNext()){
  	var curtUser = mycursor.next();
  	cnt++;
  	if (Object.keys(curtUser.friends).length == 0){
  		continue;
  	}
  	var curtFriends = db.flat_users.find({user_id:curtUser.user_id});
    // curtFriends = curtFriends.next();
  	amountFriends = amountFriends + curtFriends.length();

    // db.users.aggregate( [ { $group : { _id:null, count : {$sum:1}, totalFriends:{$sum:} } }])
    // db.users.aggregate( [ { $group : { _id:null, avg_count: {$avg: "$friends.length()"}} }])

  }
  return amountFriends/cnt;  

}
