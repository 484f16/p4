import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.TreeSet;
import java.util.Vector;
import java.util.ArrayList;


//json.simple 1.1
// import org.json.simple.JSONObject;
// import org.json.simple.JSONArray;

// Alternate implementation of JSON modules.
import org.json.JSONObject;
import org.json.JSONArray;

public class GetData{

	static String prefix = "tajik.";

	// You must use the following variable as the JDBC connection
	Connection oracleConnection = null;

	// You must refer to the following variables for the corresponding
	// tables in your database

	String cityTableName = null;
	String userTableName = null;
	String friendsTableName = null;
	String currentCityTableName = null;
	String hometownCityTableName = null;
	String programTableName = null;
	String educationTableName = null;
	String eventTableName = null;
	String participantTableName = null;
	String albumTableName = null;
	String photoTableName = null;
	String coverPhotoTableName = null;
	String tagTableName = null;

	// This is the data structure to store all users' information
	// DO NOT change the name
	JSONArray users_info = new JSONArray();     // declare a new JSONArray


	// DO NOT modify this constructor
	public GetData(String u, Connection c) {
		super();
		String dataType = u;
		oracleConnection = c;
		// You will use the following tables in your Java code
		cityTableName = prefix+dataType+"_CITIES";
		userTableName = prefix+dataType+"_USERS";
		friendsTableName = prefix+dataType+"_FRIENDS";
		currentCityTableName = prefix+dataType+"_USER_CURRENT_CITY";
		hometownCityTableName = prefix+dataType+"_USER_HOMETOWN_CITY";
		programTableName = prefix+dataType+"_PROGRAMS";
		educationTableName = prefix+dataType+"_EDUCATION";
		eventTableName = prefix+dataType+"_USER_EVENTS";
		albumTableName = prefix+dataType+"_ALBUMS";
		photoTableName = prefix+dataType+"_PHOTOS";
		tagTableName = prefix+dataType+"_TAGS";
	}


	//  @Override
	private Vector getFriends(Long user_id) {

		// Scrollable result set allows us to read forward (using next())
		// and also backward.
		// This is needed here to support the user of isFirst() and isLast() methods,
		// but in many cases you will not need it.
		// To create a "normal" (unscrollable) statement, you would simply call
		// Statement stmt = oracleConnection.createStatement();
		//
		Vector friends = new Vector();
		try (Statement stmt =
					 oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
							 ResultSet.CONCUR_READ_ONLY)) {

			// For each month, find the number of users born that month
			// Sort them in descending order of count
			ResultSet rst = stmt.executeQuery("select user2_id from " + friendsTableName +
					" where user1_id = " + user_id +  " UNION select user1_id from " + friendsTableName +
					" where user2_id = " + user_id );


			while (rst.next()) {
				Long friend_id = rst.getLong(1);
				friends.addElement(friend_id);
			}

			// Close statement and result set
			rst.close();
			stmt.close();
		} catch (SQLException err) {
			System.err.println(err.getMessage());
		}
		return friends;
	}


	//  @Override
	private JSONObject getHometown(Long user_id) {

		// Scrollable result set allows us to read forward (using next())
		// and also backward.
		// This is needed here to support the user of isFirst() and isLast() methods,
		// but in many cases you will not need it.
		// To create a "normal" (unscrollable) statement, you would simply call
		// Statement stmt = oracleConnection.createStatement();
		//
		JSONObject hometown = new JSONObject();
		try (Statement stmt =
					 oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
							 ResultSet.CONCUR_READ_ONLY)) {

			// For each month, find the number of users born that month
			// Sort them in descending order of count
			ResultSet rst = stmt.executeQuery("select hometown_city_id from " + hometownCityTableName + " where user_id = " + user_id);


			if (rst.next()) {
				int hometown_city_id = rst.getInt(1);


				rst = stmt.executeQuery("select state_name, city_name, country_name from " + cityTableName + " where city_id = " + hometown_city_id);
				while (rst.next()) {
					String state_name = rst.getString(1);
					String city_name = rst.getString(2);
					String country_name = rst.getString(3);
//					JSONObject hometown = new JSONObject();
					hometown.put("state_name", state_name);
					hometown.put("city_name", city_name);
					hometown.put("country_name", country_name);
				}
			}

			// Close statement and result set
			rst.close();
			stmt.close();
		} catch (SQLException err) {
			System.err.println(err.getMessage());
		}

		return hometown;
	}


	//  @Override
	private JSONArray getUserTable() {

		// Scrollable result set allows us to read forward (using next())
		// and also backward.
		// This is needed here to support the user of isFirst() and isLast() methods,
		// but in many cases you will not need it.
		// To create a "normal" (unscrollable) statement, you would simply call
		// Statement stmt = oracleConnection.createStatement();
		//
		JSONArray user_info = new JSONArray();
		try (Statement stmt =
					 oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
							 ResultSet.CONCUR_READ_ONLY)) {

			// For each month, find the number of users born that month
			// Sort them in descending order of count
			ResultSet rst = stmt.executeQuery("select * from " + userTableName);


			while (rst.next()) {
				Long user_id = rst.getLong(1);
				String first_name = rst.getString(2);
				String last_name = rst.getString(3);
				int YOB = rst.getInt(4);
				int MOB = rst.getInt(5);
				int DOB = rst.getInt(6);
				String gender = rst.getString(7);

				JSONObject curtUser = new JSONObject();
				curtUser.put("user_id",user_id);
				curtUser.put("first_name",first_name);
				curtUser.put("last_name",last_name);
				curtUser.put("YOB",YOB);
				curtUser.put("MOB",MOB);
				curtUser.put("DOB",DOB);
				curtUser.put("gender",gender);


				// get friends
				Vector friends = getFriends(user_id);
				curtUser.put("friends",friends);

				// get hometown
				JSONObject hometown = getHometown(user_id);
				curtUser.put("hometown",hometown);

				System.out.println("curt User_id is : " + user_id);
				user_info.put(curtUser);

			}

			// Close statement and result set
			rst.close();
			stmt.close();
		} catch (SQLException err) {
			System.err.println(err.getMessage());
		}
		return user_info;
	}




	//implement this function

	@SuppressWarnings("unchecked")
	public JSONArray toJSON() throws SQLException{
		System.out.println("enter the toJSON;");
		JSONArray users_info =  getUserTable();
		return users_info;
	}


	// This outputs to a file "output.json"
	public void writeJSON(JSONArray users_info) {
		// DO NOT MODIFY this function
		try {
			FileWriter file = new FileWriter(System.getProperty("user.dir")+"/output.json");
			file.write(users_info.toString());
			file.flush();
			file.close();

		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}

