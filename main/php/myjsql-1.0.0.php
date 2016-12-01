<?php
error_reporting(0);
// jsql CLASS uses MYSQL functions to create and edit tables with only javascript functions
//
class jsql {
	// SET HERE THE SECURITY CONNECTION VARIABLES
	private $host = "localhost";
	private $username = "root";
	private $password = "root";
	private $dbName = "";
	// MD5 ENCRYPTION
	private function priv_encrypt () {
		$cyc = $_POST['encCycles'];
		$enc = $_POST['encrypt'];
		for ($i=0; $i<$cyc; $i++) {
			$enc = md5($enc);
		}
		return $enc;		
	}
	function encrypt(){
		echo $this->priv_encrypt();
	}
	// SERVER TIME RETURN
	private function priv_serverTime () {
		$format = $_POST['format'];
		$timeStamp = strtotime($_POST['timeStamp']);
		switch ($format) {
			case "microtime": return microtime($timeStamp); break;
			case "time": return time($timeStamp); break;
			default : return date($format, $timeStamp);
		}
	}
	function serverTime(){
		echo $this->priv_serverTime();
	}
	// CONNECT
	private function priv_connect () {
		$host = isset($_POST['host'])?$_POST['host']:$this->host;
		$username = $_POST['username']?$_POST['username']:$this->username;		
		$password = $_POST['password']?$_POST['password']:$this->password;
		$conn = new mysqli($host, $username, $password, $dbName);
		if (mysqli_errno($conn)) {
			return false;
		} else {
			return $conn;
		}
	}
	private function connect ($callback) {
		if ($conn = $this->priv_connect()) {
			if ($callback) echo "successfully connected ";
			return $conn;
		} else {
			return false;
		}
	}
	// CLOSE CONNECTION
	private function closeConnection ($conn) {
		$close = $_POST['closeConnection']?$_POST['closeConnection']:true;
		if ($close) mysqli_close($conn);
	}
	// TESTING CONNECTION
	private function priv_connectionTest () {
		$host = $_POST['host']?$_POST['host']:$this->host;
		$username = $_POST['username']?$_POST['username']:$this->username;		
		$password = $_POST['password']?$_POST['password']:$this->password;
		$conn = new mysqli($host, $username, $password);
		if (mysqli_connect_errno()) {
			$this->closeConnection($conn);
			return false;
		} else {
			$this->closeConnection($conn);
			return true;
		}
	}
	public function connectionTest () {
		$host = $_POST['host']?$_POST['host']:$this->host;
		$conn = $this->priv_connectionTest();
		if ($conn) {
			echo "successfully connected to:  ".$host;
		} else {
			echo "There was a problem connecting to:  ".$host." ".mysqli_error($conn);
		}
	}
	// DATABASE CREATION
	private function priv_dbCreate () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$sql = "CREATE DATABASE `".$dbName."`";
		$conn = $this->connect(false);
		if (!mysqli_select_db($conn, $dbName)) {
			if ($conn->query($sql) === TRUE) {
				$this->closeConnection($conn);
				return "successfully executed query ".$sql;
			} else {
				$error = mysqli_error($conn);
				$this->closeConnection($conn);
				return "(!) ".$error;
			}
		} else {
			return "(!) Database already exists";
		}
	}
	public function dbCreate () {
		if ($return = $this->priv_dbCreate()) {
			echo $return." "; 
		} else {
			echo false;
		}
	}
	// DATABASE DROP
	private function priv_dbDrop () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$sql = "DROP DATABASE `".$dbName."`";
		$conn = $this->connect(false);
		if (mysqli_select_db($conn, $dbName)) {
			if ($conn->query($sql) === TRUE) {
				$this->closeConnection($conn);
				return "successfully executed query ".$sql;
			} else {
				$error = mysqli_error($conn);
				$this->closeConnection($conn);
				return "(!) ".$error;
			}
		} else {
			return "(!) Database does not exist";
		}
	}
	public function dbDrop () {
		if ($return = $this->priv_dbDrop()) {
			echo $return." ";
		} else {
			echo false;
		}
	}
	// TABLE CREATE
	private function priv_tableCreate () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$tbName = $_POST['tbName'];
		$columns = $_POST['columns'];
		if (!$this->priv_arrayTables($tbName)) {
			$sql = "CREATE TABLE `".$dbName."`.`".$tbName."` (".$columns.")";
			$conn = $this->connect(false);
			if (mysqli_select_db($conn, $dbName)) {
				if ($conn->query($sql) === TRUE) {
					$this->closeConnection($conn);
					return "successfully executed query ".$sql;
				} else {
					$error = mysqli_error($conn);
					$this->closeConnection($conn);
					return "(!) ".$error;
				}
			} else {
				return "(!) The database you are trying to call does not exsist. ";
			}
		} else {
			return "(!) The table you are trying to create already exist. ";
		}
	}
	public function tableCreate () {
		if ($return = $this->priv_tableCreate()) 
			echo $return." ";
		else
			echo false;
	}
	// TABLE DROP
	private function priv_tableDrop () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$tbName = $_POST['tbName'];
		$sql = "DROP TABLE `".$dbName."`.`".$tbName."`";
		$conn = $this->connect(false);
		if (mysqli_select_db($conn, $dbName)) {
			if ($this->priv_arrayTables($tbName)) {
				if ($conn->query($sql) === TRUE) {
					$this->closeConnection($conn);
					return "successfully executed query ".$sql;
				} else {
					$error = mysqli_error($conn);
					$this->closeConnection($conn);
					return "(!) ".$error;
				}
			} else {
				return "(!) The table you are trying to drop does not exist. ";
			}
		} else {
			return "(!) The database you are trying to call does not exsist. ";
		}
	}
	public function tableDrop () {
		if ($return = $this->priv_tableDrop()) 
			echo $return." "; 
		else 
			false;
	}
	// TABLE TRUNCATE
	private function priv_tableTruncate () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$tbName = $_POST['tbName'];
		$sql = "TRUNCATE TABLE `".$dbName."`.`".$tbName."`";
		$conn = $this->connect(false);
		mysqli_select_db($conn, $dbName);
		if ($conn->query($sql) === TRUE) {
			$this->closeConnection($conn);
			return "successfully executed query ".$sql;
		} else {
			$error = mysqli_error($conn);
			$this->closeConnection($conn);
			return "(!) ".$error;
		}
	}
	public function tableTruncate () {
		if ($return = $this->priv_tableTruncate())
			echo $return." ";
		else 
			false;
	}
	// TABLE INSERT ROW
	private function priv_tableInsertRow () {
		$cols = $_POST['cols'];
		$vals = $_POST['vals'];
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$tbName = $_POST['tbName'];
		$sql = "INSERT INTO `".$dbName."`.`".$tbName."` (".$cols.") VALUES (".$vals.")";
		$conn = $this->connect(false);
		if (mysqli_select_db($conn, $dbName)) {
			if ($this->priv_arrayTables($tbName)) {
				if ($conn->query($sql) === TRUE) {
					$this->closeConnection($conn);
					return "successfully executed query ".$sql;
				} else {
					$error = mysqli_error($conn);
					$this->closeConnection($conn);
					return "(!) ".$error;
				}
			} else {
				return "(!) The table you are trying to call does not exist. ";
			}
		} else {
			return "(!) The database you are trying to call does not exsist. ";
		}
	}
	public function tableInsertRow () {
		if ($return = $this->priv_tableInsertRow()) 
			echo $return." "; 
		else 
			false;
	}
	// TABLE DELETE ROWS
	private function priv_tableDeleteRows () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$tbName = $_POST['tbName'];
		$where = replaceOperands($_POST['where']);
		$sql = "DELETE FROM `".$dbName."`.`".$tbName."` WHERE ".$where;
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if ($this->priv_arrayTables($tbName)) {
				if ($query = $conn->query($sql)) {
					$count = mysqli_affected_rows($conn);
					$this->closeConnection($conn);
					if ($count == 0) return "(!) Conditions doesn't matching with any rows!"; else return "successfully deleted ".$count." rows ".$sql;
				} else {
					$error = mysqli_error($conn);
					$this->closeConnection($conn);
					return "(!) ".$error;
				}
			} else {
				return "(!) The table you are trying to call does not exist. ";
			}
		} else {
			return "(!) The database you are trying to call does not exsist. ";
		}
	}
	public function tableDeleteRows () {
		if ($return = $this->priv_tableDeleteRows()) 
			echo $return." "; 
		else 
			false;
	}
	// TABLE UPDATE ROWS
	private function priv_tableUpdateRows () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$tbName = $_POST['tbName'];
		$set = replaceOperands($_POST['set']);
		$where = $_POST['where']=="" ? " " : " WHERE ".replaceOperands($_POST['where']);
		$sql = "UPDATE `".$dbName."`.`".$tbName."` SET ".$set.$where;
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if ($this->priv_arrayTables($tbName)) {
				if ($conn->query($sql) === TRUE) {
					$count = mysqli_affected_rows($conn);
					$this->closeConnection($conn);
					if ($count == 0) return "(!) Conditions doesn't matching with any rows!"; else return "successfully updated ".$count." rows ".$sql;
				} else {
					$error = mysqli_error($conn);
					$this->closeConnection($conn);
					return "(!) ".$error;
				}
			} else {
				return "(!) The table you are trying to call does not exist. ";
			}
		} else {
			return "(!) The database you are trying to call does not exsist. ";
		}
	}
	public function tableUpdateRows () {
		if ($return = $this->priv_tableUpdateRows()) 
			echo $return." "; 
		else 
			false;
	}
	// TABLE ALTER ADD COLUMN
	private function priv_tableAlterAdd ($column, $colName) {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$tbName = $_POST['tbName'];
		$sql = "ALTER TABLE `".$dbName."`.`".$tbName."` ADD ".$column;
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if ($this->priv_arrayTables($tbName)) {
				if ($conn->query($sql) === TRUE) {
					$this->closeConnection($conn);
					return "successfully executed query ".$sql;
				} else {
					$error = mysqli_error($conn);
					$this->closeConnection($conn);
					return "(!) ".$error;
				}
			} else {
				return "(!) The table you are trying to call does not exist. ";
			}
		} else {
			return "(!) The database you are trying to call does not exsist. ";
		}
	}
	public function tableAlterAdd () {
		$columns = explode(",", $_POST['columns']);
		for ($i=0; $i<count($columns); $i++) {
			if (substr($columns[$i], 0, 1)==" ") $columns[$i]=substr($columns[$i], 1);
			$colName = explode(" ", $columns[$i]);
			if ($return = $this->priv_tableAlterAdd($columns[$i], $colName[0])) 
				echo $return." "; 
			else 
				false;
		}
	}
	// TABLE ALTER DROP COLUMN
	private function priv_tableAlterDrop ($columns, $colName) {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$tbName = $_POST['tbName'];
		$sql = "ALTER TABLE `".$dbName."`.`".$tbName."` DROP COLUMN ".$columns;
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if ($this->priv_arrayTables($tbName)) {
				if ($this->priv_arrayColumns($colName)) {
					if ($conn->query($sql) === TRUE) {
						$this->closeConnection($conn);
						return "successfully executed query ".$sql." ";
					} else {
						$error = mysqli_error($conn);
						$this->closeConnection($conn);
						return "(!) ".$error;
					}
				} else {
					return "(!) The column you are trying to drop does not exsist. ";
				}
			} else {
				return "(!) The table you are trying to drop does not exsist. ";
			}
		} else {
			return "(!) The database you are trying to call does not exsist. ";
		}
		
	}
	public function tableAlterDrop () {
		$columns = explode(",", $_POST['columns']);
		for ($i=0; $i<count($columns);$i++) {
			if (substr($columns[$i], 0, 1)==" ") $columns[$i]=substr($columns[$i], 1);
			$colName = explode(" ", $columns[$i]);
			if ($result = $this->priv_tableAlterDrop($columns[$i], $colName[0]))
				echo $result; 
			else 
				false;
		}
	}
	// TABLE ALTER COLUMN DATATYPE
	private function priv_tableAlterCol () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$tbName = $_POST['tbName'];
		$colName = $_POST['colName'];
		$dataType = $_POST['dataType'];
		$sql = "ALTER TABLE `".$dbName."`.`".$tbName."` ALTER COLUMN ".$colName." ".$dataType;
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if ($this->priv_arrayTables($tbName)) {
				if ($this->priv_arrayColumns($colName)) {
					if ($conn->query($sql) === TRUE) {
						$this->closeConnection($conn);
						return "successfully executed query ".$sql." ";
					} else {
						$error = mysqli_error($conn);
						$this->closeConnection($conn);
						return "(!) ".$error;
					}
				} else {
					return "(!) The column you are trying to drop does not exsist. ";
				}
			} else {
				return "(!) The table you are trying to drop does not exsist. ";
			}
		} else {
			return "(!) The database you are trying to call does not exsist. ";
		}
		
	}
	public function tableAlterCol () {
		if ($result = $this->priv_tableAlterCol())
			echo $result; 
		else 
			false;
	}
	// EXECUTE QUERY
	private function priv_query () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$sql = $_POST['queryString'];
		$expl = explode(" ", $sql);
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if (strtoupper($expl[0]) == "SELECT") {
				return $this->priv_arraySelect($sql);
			} else {
				if ($conn->query($sql) === TRUE) {
					$this->closeConnection($conn);
					return "successfully executed query ".$sql;
				} else {
					$error = mysqli_error($conn);
					$this->closeConnection($conn);
					return "(!) ".$error;
				}
			}
		} else {
			return "(!) The database you are trying to call does not exsist.";
		}
	}
	public function query () {
		if ($return = $this->priv_query()) 
			echo $return; 
		else 
			false;
	}
	// CREATE STORED PROCEDURE
	private function priv_createProcedure () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$arguments = $_POST['arguments'];
		$sql = replaceOperands($_POST['procedure']);
		$procedureName = $_POST['procedureName'];
		$query = "CREATE PROCEDURE $procedureName($arguments) BEGIN ".$sql."; END;";
		echo $query;
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if ($conn->query($query) === TRUE) {
				$this->closeConnection($conn);
				return "successfully created procedure ".$sql;
			} else {
				$error = mysqli_error($conn);
				$this->closeConnection($conn);
				return "(!) ".$error;
			}
		} else {
			return "(!) The database you are trying to call does not exsist.";
		}
	}
	public function createProcedure () {
		if ($return = $this->priv_createProcedure()) 
			echo $return; 
		else 
			false;
	}
	// CALL STORED PROCEDURE
	private function priv_callProcedure () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$procedureName = $_POST['procedureName'];
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if ($conn->query("CALL ".$functionName) === TRUE) {
				$this->closeConnection($conn);
				return "successfully called procedure ".$sql;
			} else {
				$error = mysqli_error($conn);
				$this->closeConnection($conn);
				return "(!) ".$error;
			}
		} else {
			return "(!) The database you are trying to call does not exsist.";
		}
	}
	public function callProcedure () {
		if ($return = $this->priv_callProcedure())
			echo $return; 
		else 
			false;
	}
	// DROP STORED PROCEDURE
	private function priv_dropProcedure () {
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$procedureName = $_POST['procedureName'];
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if ($conn->query("DROP PROCEDURE IF EXISTS ".$procedureName) === TRUE) {
				$this->closeConnection($conn);
				return "successfully dropped procedure ".$sql;
			} else {
				$error = mysqli_error($conn);
				$this->closeConnection($conn);
				return "(!) ".$error;
			}
		} else {
			return "(!) The database you are trying to call does not exsist.";
		}
	}
	public function dropProcedure () {
		if ($return = $this->priv_dropProcedure())
			echo $return; 
		else 
			false;
	}
	// DATABASES LIST IN ARRAY
	private function priv_arrayDatabases () {
		$conn = $this->connect();
		$query = $conn->query("SHOW DATABASES");
		$str = "";
		while ($row = mysqli_fetch_row($query)) {
			if ($tbName) {
				if ($row[0]==$tbName) {
					return true;
				} else {
					return false;
				}
			} else {
				$str .= $row[0].",";
			}
		}
		$this->closeConnection($conn);
		return substr($str, 0, -1);
	}
	public function arrayDatabases() {
		echo $this->priv_arrayDatabases();
	}
	// TABLES LIST IN ARRAY
	private function priv_arrayTables ($tbName) {
		$tbName = $_POST['tbName']?$_POST['tbName']:$tbName;
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$conn = $this->connect(false);
		if (mysqli_select_db($conn, $dbName)) {
			$query = $conn->query("SHOW TABLES FROM ".$dbName);
			$str = "";
			while ($row = mysqli_fetch_row($query)) {
				if ($tbName) {
					if ($row[0]==$tbName) {
						return true;
					}
				} else {
					$str .= $row[0].",";
				}
			}
			return substr($str, 0, -1);
		}
		$this->closeConnection($conn);
	}
	public function arrayTables () {
		echo $this->priv_arrayTables();
	}
	// COLUMNS LIST IN ARRAY
	private function priv_arrayColumns ($colName) {
		$tbName = $_POST['tbName'];
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$conn = $this->connect();
		$sql = "SHOW COLUMNS FROM ".$tbName." FROM ".$dbName;
		if (mysqli_select_db($conn, $dbName)) {
			if ($this->priv_arrayTables($tbName, true)) {
				$query = $conn->query($sql);
				$str = "";
				while ($row = mysqli_fetch_row($query)) {
					if ($colName) {
						if ($row[0]==$colName) {
							return true;
						} else {
							return "(!) The column you are trying to call does not exsist. ";
						}
					} else {
						$str .= $row[0].",";
					}
				}
			} else {
				return "(!) The table you are trying to call does not exist.";
			}
			return substr($str, 0, -1);
		} else {
			return "(!) The database you are trying to call does not exist.";
		}
		$this->closeConnection($conn);
	}
	public function arrayColumns () {
		echo $this->priv_arrayColumns();
	}
	// SQL SELECT IN ARRAY
	private function priv_arraySelect ($sql) {
		$tbName = $_POST['tbName'];
		$dbName = $_POST['dbName']?$_POST['dbName']:$this->dbName;
		$what = $_POST['what']=="" ? "*" : $_POST['what'];
		$where = $_POST['where']=="" ? " " : " WHERE ".replaceOperands($_POST['where']);
		$orderBy = $_POST['orderBy']=="" ? "" : " ORDER BY ".$_POST['orderBy'];
		$sql = $sql?$sql:"SELECT ".$what." FROM ".$tbName.$where.$orderBy;
		$conn = $this->connect();
		if (mysqli_select_db($conn, $dbName)) {
			if ($this->priv_arrayTables($tbName, true)) {
				$query = $conn->query($sql);
				$what = str_replace("DISTINCT ", "", $what);
				if ($what!=="*") {
					$col = explode(",", $what);
				} else {
					$col = explode(",", $this->priv_arrayColumns());
				}
				if($_POST['JSON']==false) {
					$str = "";
					while ($row = mysqli_fetch_array($query)) {
						for ($i=0; $i<$query->field_count; $i++) {
							$str .=$row[$i];
							if ($i<$query->field_count-1) $str .="<,>";
						}
						$str .= "<|>";
					}
					return substr($str, 0, -3);
				} else {
					$str = "[";
					while ($row = mysqli_fetch_array($query)) {
						$str .= "{";
						for ($i=0; $i<$query->field_count; $i++) {
							$str .= $col[$i].":\"".$row[$i]."\"";
							if ($i<$query->field_count-1) $str .=",";
						}
						$str .= "},";
					}
					if ($str!=="[") {
						$str = substr($str, 0, -1);
						$str .= "]";
						return $str;
					} else {
						return false;
					}
				}
			} else {
				return "(!) The column you are trying to call does not exsist. ";
			}				
		}
		$this->closeConnection($conn);
	}
	public function arraySelect () {
		echo $this->priv_arraySelect();
	}
	private function priv_column_type ($col) {
		$conn = $this->connect();
		$sql = "	SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '".$_POST['tbName']."' AND COLUMN_NAME = '".$col."'";
		$query = $conn->query($sql);
		return mysqli_fetch_array($query);
	}
}
// EXTRA CLASS FUNCTIONS
//
// REPLACE OPERANDS (+,-,/,*,=)
function replaceOperands($str) {
	$str = str_replace("|", "=", $str);
	$str = str_replace("_plus_", "+", $str);
	$str = str_replace("_less_", "-", $str);
	$str = str_replace("_multi_", "*", $str);
	$str = str_replace("_subd_", "//", $str);
	return $str;
}
// CREATE STRING FOR INSERT QUERY (ex. COL=VAL)
function subdRow($row, $colOrVal, $colSimbol) {
	$colSimbol = $colSimbol?$colSimbol:"";
	$expl = str_replace(" ", "", $row);
	$expl = str_replace("_str_", "'", $expl);
	$expl = explode(",", $expl);
	$str = "";
	for ($i=0; $i<count($expl); $i++) {
		$expl2 = explode("|", $expl[$i]);
		$str .= $colSimbol.$expl2[$colOrVal].$colSimbol.",";
	}
	return substr($str, 0, -1);
}
// LISTEN CALLED DIRECTIVE
//
// DATABASE DIRECTIVES
if (isset($_POST['connectionTest'])) {
	$jsql = new jsql;
	$jsql->connectionTest();
}
if (isset($_POST['dbCreate'])) {
	$jsql = new jsql;
	$jsql->dbCreate();
}
if (isset($_POST['dbDrop'])) {
	$jsql = new jsql;
	$jsql->dbDrop();
}
// TABLES DIRECTIVES
if (isset($_POST['tableCreate'])) {
	$jsql = new jsql;
	$jsql->tableCreate();
}
if (isset($_POST['tableDrop'])) {
	$jsql = new jsql;
	$jsql->tableDrop();
}
if (isset($_POST['tableInsertRow'])) {
	$jsql = new jsql;
	$jsql->tableInsertRow();
}
if (isset($_POST['tableUpdateRows'])) {
	$jsql = new jsql;
	$jsql->tableUpdateRows();
}
if (isset($_POST['tableDeleteRows'])) {
	$jsql = new jsql;
	$jsql->tableDeleteRows();
}
if (isset($_POST['tableTruncate'])) {
	$jsql = new jsql;
	$jsql->tableTruncate();
}
if (isset($_POST['tableAlterAdd'])) {
	$jsql = new jsql;
	$jsql->tableAlterAdd();
}
if (isset($_POST['tableAlterDrop'])) {
	$jsql = new jsql;
	$jsql->tableAlterDrop();
}
if (isset($_POST['tableAlterCol'])) {
	$jsql = new jsql;
	$jsql->tableAlterCol();
}
// QUERY DIRECTIVES
if (isset($_POST['query'])) {
	$jsql = new jsql;
	$jsql->query();
}
// STORED PROCEDURES DIRECTIVES
if (isset($_POST['createProcedure'])) {
	$jsql = new jsql;
	$jsql->createProcedure();
}
if (isset($_POST['callProcedure'])) {
	$jsql = new jsql;
	$jsql->callProcedure();
}
if (isset($_POST['dropProcedure'])) {
	$jsql = new jsql;
	$jsql->dropProcedure();
}
// ARRAY DIRECTIVES
if (isset($_POST['arrayDatabases'])) {
	$jsql = new jsql;
	$jsql->arrayDatabases();
}
if (isset($_POST['arrayTables'])) {
	$jsql = new jsql;
	$jsql->arrayTables();
}
if (isset($_POST['arrayColumns'])) {
	$jsql = new jsql;
	$jsql->arrayColumns();
}
if (isset($_POST['arraySelect'])) {
	$jsql = new jsql;
	$jsql->arraySelect();
}
// ENCRYPT/DECRYPT DIRECTIVES
if (isset($_POST['encryptMD5'])) {
	$jsql = new jsql;
	$jsql->encrypt();
}
// ENCRYPT/DECRYPT DIRECTIVES
if (isset($_POST['serverTime'])) {
	$jsql = new jsql;
	$jsql->serverTime();
}
?>
