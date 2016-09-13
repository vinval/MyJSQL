# MyJSQL
Managing MYSQL database via JQuery

## Demo
$.jsql.database.create({
  dbName: “newDatabase”
});

## Description
MyJqsl uses jQuery to call many functions of mysql.
With an hidden php file into your server it can calls queries in totally security mode.
Php language knowledges are not necessary, so you will manage mysql database using only javascript.

## Setup
What you have to do is only copy and past jsql.js and sql.php files into your main folder into server and target php file into sql file (by default it point at a php folder).
Next step is declaring sql.js into index.html or whatever is main page after jQuery declaration as follow:

<script src=“myjsql-1.0.0.js”></script> 

## Features
* **connectionTest:**  
  Allows to test connection before starting to use or to test everytime the connection.
* **serverTime:**  
  shows what time is on server. You can obtain it in various formats
* **md5:**  
  Allows you to convert a string into md5 also into many cycles you will choose.
* **database:**  
  it has other methods as:
  ***create***
  ***drop***
* **table**  
  it has other methods as:
  ***create***
  ***drop***
  ***truncate***
  ***insertRow***
  ***updateRows***
  ***deleteRows***
  ***alterAdd***
  ***alterDrop***
  ***alterCol***
* **Procedure:**  
  Allows to create, drop and call procedure with methods:
  ***create***
  ***drop***
  ***call***
* **Array**  
  Returns an array to use of:
  ***databases***
  ***tables***
  ***columns***
  ***select***
  this one create an array from selection you call
* **Query**
  Is a generic query method that returns an array if you do a select sql function

## Browsers

### Desktop and Mobile browsers
MyJSQL has been tested into principal browsers:

* Google Chrome
* Apple Safari
* Mozilla Firefox
* Opera 11.0
* Microsoft Internet Explorer

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
