//query3
//create a collection "cities" to store every user that lives in every city
//Each document(city) has following schema:
/*

{
  _id: city
  users:[userids]
}

db.books.aggregate( [
                      { $group : { _id : "$author", books: { $push: "$title" } } },
                      { $out : "authors" }
                  ] )

*/

function cities_table(dbname) {
    db = db.getSiblingDB(dbname)

    db.users.aggregate([{ $group : {_id: "$hometown.city", users: { $push: "$user_id"}}},{ $out : "cities"}]);


    // Returns nothing. Instead, it creates a collection inside the datbase.

}
