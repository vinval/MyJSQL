# MyJSQL: MYSQL with JQUERY


MyJSQL is a JQuery extension that allows making calls to the database through javascript, without using PHP


It doesn’t require installations, it doesn’t require knowing PHP or MYSQL.


All that needs to be done, is copying the files myjsql-1.0.0.js and myjsql-1.0.0.php in the appropriate folders and declare the first in the index.


With MyJSQL the pages can be written in simple html and code javascript.


The Plugin, furthermore, exploits the potential of (asyncrone) calls, which united with the callback, become a strong tool to use.


You can use JSON callback to get more powerful.


## HOW TO START


Copy and paste the files myjsql-1.0.0.js and myjsql-1.0.0.php in the appropriate folders.


As default, the first needs to be put inside a folder called “js”, whilst the second in a folder called “php”, both situated in a main folder.


Afterwards, the file js must be declared inside the inder (right after having declared jquery(:


<script src=”js/ myjsql-1.0.0.js” type=”text/javascript”></script>


That’s all!


## THE SETTINGS

To make the work environment secure, the call parameters to the database will be set in the php file, in this method:
- private $host = "localhost";
- private $username = "yourDatabaseUsername";
- private $password = "yourDatabasePassword";
- private $dbName = "nameOfYourDatabase";

This allows a secure access and final to the data.


To make the tests instead there are functions to verify the connection, but we’ll see them later on.


To begin with the code myjsql it is not necessary to declare it, but it will be useful to change the default configurations.


Next there is a list of the parameters:

- url: "php/myjsql-1.0.0.php",	//(string)  indicates where to find myjsql php
- host: false,		//(string) rappresents the host’s address (false to use the php settings)
- username: false,	//(string) rappresents the host’s username (false to use the php settings)
- password: false,	//(string) rappresents the host’s password (false to use the php settings)
- dbName: false,	//(string) rappresents the name of the database to call (false to use the php settings)	
- tbName: false,	//(string) rappresents the name of the table to call (false to use the php settings)
- alert: false,		//(boolean) indicates if there must be a return warning message after every function
- logs: true,		//(boolean) indicates if there must be a message returned to the console.log after every function 
- async: true,		//(boolean) sets the async as default (this method will be explained separately)
- cache: false,		//(boolean) sets to false the memorization of the data in the cache 
- JSON: false,          //(boolean) sets the callback: JSON or Array
- loader: true,		//(boolean) visualizes a preloader when waiting that the function will solve
- loaderImage: false,	//(string) sets the url of an alternative image
- loaderOpacity: false,	//(string) Sets the opacità of the background (the values go from “0.0” to “1.0”
- loaderText: false,	//(string) adds a text to the preloader
- loaderWidth: false,	//(string) defines the size of the preloader (ex. “100px”)
- loaderHeight: false,	//(string) defines the height of the preloader (ex. “100px”)
- encCycles: 1		//(Entire) sets the number of cycles for md5, to crypt a string n times

$.jsql({
	host: “localhost”,
	username: “root”,
	password: “root”,
  dbName: “myDbName”,
	alert: true
});


How does asynchrony work
MyJSQL functions with a system that recognizes automatically the synchrony or the asynchrony, or we can set this parameter to establish the preference;
When we write:

$.jsql.array.databases ();

Will be considered what we have set in the settings. Therefore the call with result as synchronized or synchronized depending on what we chose
With a synchronized call we can assign immediately the result of a variable, for example:

var md5 = $.jsql.md5(“hello world”);

obtaining the variable md5, which will have the value “5eb63bbbe01eeed093cb22bb8f5acdc3”.

With an asynchronized call the result cannot be assigned to a variabile external to the function. For example:

$.jsql.md5(“hello world”, function(md5) {
	alert(md5);
});

The result with be given from the callback, therefore the function alert will show the result in the md5 method.
If we try to assign a variable to the method with the asynchronized call, the result will be undefined.
Only the methods serverTime() and md5() are always synchronized, but they also have the callback function.

## THE METHODS
The methods are divided in:
- GET;
- PUT;
- QUERY;

The methods “GET” are only occupied for receiving the requested information from the server, they are:
- connectionTest;
- serverTime;
- md5;
- array;

The methods “PUT” takes care the changes to the data of the server, they are: 
- database;
- table;
- The methods “QUERY” executes both the GET and PUT function, they are:
- query;
- procedure;

### THE GET METHODS
#### The connectionTest method
This function runs a connection test to verify the server response (like if it were a ping) and returns a visible string, with console.log or alert.
It is possible to use the callback of the connection test, to start a function after the occurred connection, for example:

$.jsql.connectionTest(function(){
	someFunction();
});

#### The serverTime method
The serverTime method runs a call to the server, which will return the information in the string format on hour, minutes and seconds set on the server
This method uses the following parameter:
- format: "Y/m/d H:i:sa",		//formato di visualizzazione
- timeStamp: "now" //when?

For example:
var time = $.jsql.serverTime();

Where the variable time will give as result for example “2016/09/21 12:41:29pm”, or:
var time = $.jsql.serverTime({
	timeStamp: "tomorrow"
});

Where time will give as a result “2016/10/21 12:41:29pm”.

#### md5 method
The md5 is the metodo that cripta a string.
In the settings it is possible to set the number of crypting cycles (ex. encCycles: 5 which will run 5 md5 cycles).
Example: 

$.jsql.md5(“hello world”); //with 5 cycles it will give as a result the following string: “90cbb9cf94746b92ed4e6dbf05588cde”.

#### The array method
The array method, like the name suggests, returns an array of what we ask the server. It is divided into different functions:
- databases()	//produces an array with the list of the databases of the server
- tables()		//produces an array with the list of the tables of the chosen database
- columns()	//produces an array with the list of the columns of a chosen table
- select()		//produces an array with the list of the chosen selection

How to write the functions and the parameters for the array method:
$.jsql.array.databases()

$.jsql.array.tables({
  dbName: “yourDatabaseName” 	//optional
})

$.jsql.array.columns({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName” 		//optional
})

$.jsql.array.select({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
  what: “*”,				//optional, represents the column to select
  where: “col1>10 AND col2=’hello’”,	//optional, represents the filter to select
  orderBy: “col1 DESC”,			//optional, represents the order of the selection 
})


Examples of uses:

$.jsql.databases(function(dbs){
	For (var n = 0; n < dbs.length; n ++) {
	  $(“body”).append(dbs[n]+”<br>”);
  }
});

Produces the list of the databases and it inserts them in the body of the web page.


THE PUT METHODS
The database method
The database method works using two functions:
- create();	//creates the database with the chosen name
- drop();		//deletes the database depending on the name
How to write the functions and the parameters for the database method:

$.jsql.database.create({
  dbName: “newName”		//optional
});

$.jsql.database.drop({
  dbName: “newName”		//optional
});

#### The table method

The table method uses numerous functions to insert data, and changes for the tables:
- create();	//creates a table with the chosen name 
- drop();		//eliminates a table depending on the name
- truncate();	//eliminates the entire content of the data from a table
- insertRow();	//inserts a row from the table
- updateRows();	//updates the rows depending on the filters
- deleteRows();	//removes one or more rows from a table, depending on the filters
- alterAdd();	//adds one or more columns to the table
- alterDrop();	//deletes one or more columns to a table
- alterCol();	//changes a single column from the table

How to write the functions and the parameters for the table methods:
$.jsql.table.create({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
	columns: [
    “col1 INT(6) AUTO_INCREMENT PRIMARY KEY”,
    “col2 VARCHAR(25) NULL”
  ]
})

$.jsql.table.drop({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
})

$.jsql.table.truncate({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
})

$.jsql.table.insertRow({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
	row: [
    “col1=5”,
    “col2=’hello world’”
  ],
})

$.jsql.table. updateRows ({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
	set: [
    “col1=1”,
    “col2=’hello world!’”
  ],
  where: “col1>1”			
})

$.jsql.table. deleteRows ({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
  where: “col1>1”			
})

$.jsql.table. aterAdd ({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
	columns: [
    “col3 TEXT ‘Hi world!’”,
    “col4 INT(2) NULL”
  ]
})

$.jsql.table. aterDrop ({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
	columns: [
    “col3”,
    “col4”
  ]
})

$.jsql.table. alterCol ({
  dbName: “yourDatabaseName”, 	//optional
  tbName: “yourTableName”, 		//optional
	colName: “col3”,
  dataType: “INT(4) NULL”, 		
})


### THE QUERY METHOD

#### The query method

Works both as a GET and PUT function. When it runs a GET function, the result is an array.
It’s use is very simple::
$.jsql.query({
  dbName: “yourDatabaseName”, 		//optional
  queryString: “SELECT * FROM tbName WHERE x=y”
});

#### The procedure method
Uses the MYSQL characteristics to produce a procedure, and uses 3 different functions:
- create();
- call();
- drop();

How it works:
$.jsql.procedure.create({
  dbName: “yourDatabaseName”, 	//optional
  procedureName: "newProcedure",
  procedureString: "SELECT * FROM a_in WHER col1=b_in",
  arguments: [“IN a_in VARCHAR(20)”, “IN b_in INT(2)”]
});

$.jsql.procedure.call({
  dbName: “yourDatabaseName”, 	//optional
  procedureName: "newProcedure(‘tableName’, 5)"
});

$.jsql.procedure.drop({
  dbName: “yourDatabaseName”, 	//optional
  procedureName: "newProcedure"
});
