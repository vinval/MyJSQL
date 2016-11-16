(function(){
	var noc=5; //Number of cycles
	$.jsql = function(options) {
		var set = $.extend ({
			url: "php/myjsql-1.0.0.php",
			host: false,
			username: false,
			password: false,
			dbName: false,
			tbName: false,
			alert: false,
			JSON: false,
			logs: true,
			async: true,
			cache: false,
			loader: true,
			loaderImage: false,
			loaderOpacity: false,
			loaderText: false,
			loaderWidth: false,
			loaderHeight: false,
			encCycles: 1,
			serverTime: function(options) {
				var start = JSQLgetTime();
				var callback;
				var args = arguments;
				var opt = $.extend({
					format: "Y/m/d H:i:sa",
					timeStamp: "now",
					cb: function () {
						for (var n=0; n<args.length; n++) {
							if (typeof args[n] === "function") {
								args[n].call(this, callback);
							}
						}
					}
				}, options);
				var encrypt = "";
				var datas = [
					set.host?"host="+set.host:"",
					set.username?"username="+set.username:"",
					set.password?"password="+set.password:"",
					set.dbName?"dbName="+set.dbName:"",
					"serverTime=true",
					"format="+opt.format,
					"timeStamp="+opt.timeStamp
				].join("&");
				$.ajax({
					url: set.url,
					type: "POST",
					cache: set.cache,
					async: false,
					data: datas,
					beforeSend: function() {
						JSQLloader(set.loader);								
					},
					success: function(e) {
						callback = e;
						JSQLloader();
						JSQLconsolelog (e);
						if (set.alert === true) JSQLcallback(set.alert, start, e);
						opt.cb();
					},
					error: function(){
						JSQLloader();
						if (set.logs) console.log("JSQL (error): connection callback failed!");
						if (set.alert === true) alert("connection callback failed!");
					}
				})
				return callback;
			},
			md5: function(string){
				var start = JSQLgetTime();
				var callback;
				var args = arguments;
				var encrypt = "";
				var opt = $.extend({
					cb: function () {
						for (var n=0; n<args.length; n++) {
							if (typeof args[n] == "function") {
								args[n].call(this, callback);
							}
						}
					}
				}, options);
				var datas = [
					set.host?"host="+set.host:"",
					set.username?"username="+set.username:"",
					set.password?"password="+set.password:"",
					set.dbName?"dbName="+set.dbName:"",
					"encryptMD5=true",
					"encrypt="+string,
					"encCycles="+set.encCycles
				].join("&");
				$.ajax({
					url: set.url,
					type: "POST",
					cache: set.cache,
					async: false,
					data: datas,
					beforeSend: function() {
						JSQLloader(set.loader);								
					},
					success: function(e) {
						callback = e;
						JSQLloader();
						JSQLconsolelog (e);
						JSQLcallback(set.alert, start, e);
						opt.cb();
					},
					error: function(){
						JSQLloader();
						if (set.logs) console.log("JSQL (error): connection callback failed!");
						if (set.alert === true) alert("connection callback failed!");
					}
				})
				return callback;
			},
			connectionTest: function(){
				var start = JSQLgetTime();
				var callback;
				var args = arguments;
				var opt = $.extend({
					cb: function () {
						for (var n=0; n<args.length; n++) {
							if (typeof args[n] == "function") {
								args[n].call(this, callback);
							}
						}
					}
				}, options);
				var datas = [
					set.host?"host="+set.host:"",
					set.username?"username="+set.username:"",
					set.password?"password="+set.password:"",
					set.dbName?"dbName="+set.dbName:"",
					"connectionTest=true",
				].join("&");
				$.ajax({
					url: set.url,
					type: "POST",
					cache: set.cache,
					async: set.async,
					data: datas,
					beforeSend: function() {
						JSQLloader(set.loader);								
					},
					success: function(e) {
						callback = e;
						JSQLloader();
						JSQLconsolelog (e+JSQLtimeToMilliseconds(start));
						if (set.alert === true) alert(e+JSQLtimeToMilliseconds(start));
						opt.cb();
					},
					error: function(){
						JSQLloader();
						if (set.logs) console.log("JSQL (error): connection callback failed!");
						if (set.alert === true) alert("connection callback failed!");
					}
				})
			},
			database: {
				create: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						dbName: false,
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"dbCreate=true",
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					$.ajax({
						url: set.url,
						type: "POST",
						cache: set.cache,
						async: set.async,
						data: datas,
						beforeSend: function() {
							JSQLloader(set.loader);								
						},
						success: function(e) {
							callback = e;
							JSQLloader();
							JSQLconsolelog (e);
							JSQLcallback(set.alert, start, e);
							opt.cb();
						},
						error: function(e){
							JSQLloader();
							if (set.logs) console.log("JSQL (error): dbCreate callback failed!");
							if (set.alert === true) alert("dbCreate callback failed!");
						}
					})
				},
				drop: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						dbName: false,
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"dbDrop=true",
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					$.ajax({
						url: set.url,
						type: "POST",
						cache: set.cache,
						async: set.async,
						data: datas,
						beforeSend: function() {
							JSQLloader(set.loader);								
						},
						success: function(e) {
							callback = e;
							JSQLloader();
							JSQLconsolelog (e);
							JSQLcallback(set.alert, start, e);
							opt.cb();
						},
						error: function(e){
							JSQLloader();
							if (set.logs) console.log("JSQL (error): dbDrop callback failed!");
							if (set.alert === true) alert("dbDrop callback failed!");
						}
					})
				}
			},
			table: {
				create: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						columns: [],
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"tableCreate=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"columns="+opt.JSQLcolsToString(opt.columns),
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): tableCreate callback failed!");
								if (set.alert === true) alert("tableCreate callback failed!");
								return false;
							}
						});
					} else {
						alert("Attention!\nI can't create unamed table.");
					}
				},
				drop: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"tableDrop=true",
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): tableDrop callback failed!");
								if (set.alert === true) alert("tableDrop callback failed!");
								return false
							}
						})
					} else {
						alert("Attention!\nI can't drop unamed table.");
					}
					for (var n=0; n<arguments.length; n++) {
						if (typeof arguments[n] == "function") {
							arguments[n].call(this);
						}
					}
				},
				truncate: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"tableTruncate=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): tableTruncate callback failed!");
								if (set.alert === true) alert("tableTruncate callback failed!");
							}
						})
					} else {
						alert("Attention!\nI can't truncate unamed table.");
					}
				},
				insertRow: function(options) {
					var start = JSQLgetTime();
					var row = [];
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						row: [],
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					row = JSQLrowsToString(opt.row);
					var cols = (function() {
						var arr = [];
						for (var n=0; n<row.length; n++) {
							if (n%2==0) arr.push(row[n]);
						}
						return arr;
					})();
					var vals = (function() {
						var arr = [];
						for (var n=1; n<row.length; n++) {
							if (n%2!=0) arr.push(row[n]) ;
						}
						return arr;
					})();
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"tableInsertRow=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"cols="+cols,
						"vals="+vals,
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tableName != "" || !opt.tableName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): insertRows callback failed!");;
								if (set.alert === true) alert("insertRows callback failed!");
							}
						})
					} else {
						alert("Attention!\nI can't create unamed table.");
					}
				},
				updateRows: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						set: [],
						where: "",
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"tableUpdateRows=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"set="+JSQLwhereToString (opt.set),
						"where="+JSQLwhereToString (opt.where),
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): updateRow callback failed!");
								if (set.alert === true) alert("updateRow callback failed!");
							}
						})
					} else {
						alert("Attention!\nI can't proced with unamed table.");
					}
				},
				deleteRows: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						where: "",
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"tableDeleteRows=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"where="+JSQLwhereToString (opt.where),
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): deleteRows callback failed!");
								if (set.alert === true) alert("deleteRows callback failed!");
							}
						})
					} else {
						alert("Attention!\nI can't proceded with unamed table.");
					}
				},
				alterAdd: function (options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						columns: [],
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"tableAlterAdd=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"columns="+typeof opt.columns == "object" ? JSQLcolsToString (opt.columns) : opt.columns,
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): alterTableAddCol callback failed!");
								if (set.alert === true) alert("alterTableAddCol callback failed!");
							}
						})
					} else {
						alert("Attention!\nI can't alter unamed table.");
					}
				},
				alterDrop: function (options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						columns: [],
						dataType: "",
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"tableAlterDrop=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"columns="+typeof opt.columns == "object" ? JSQLcolsToString (opt.columns) : opt.columns,
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): alterTableAddCol callback failed!");
								if (set.alert === true) alert("alterTableAddCol callback failed!");
							}
						})
					} else {
						alert("Attention!\nI can't alter unamed table.");
					}
				},
				alterCol: function (options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						colName: "",
						dataType: "",
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"tableAlterCol=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"colName="+opt.colName,
						"dataType="+opt.dataType,
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): alterTableAddCol callback failed!");
								if (set.alert === true) alert("alterTableAddCol callback failed!");
							}
						})
					} else {
						alert("Attention!\nI can't alter unamed table.");
					}
				}
			},
			procedure: {
				create: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						procedureName: "",
						procedureString: "",
						arguments: [],
						dbName: false,
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"createProcedure=true",
						"procedureName="+opt.procedureName,
						"procedure="+JSQLrowsToString(opt.procedureString),
						"arguments="+opt.arguments,
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.procedureName!="") {
						if (opt.procedureString != "") {
							$.ajax({
								url: set.url,
								type: "POST",
								cache: set.cache,
								async: set.async,
								data: datas,
								beforeSend: function() {
									JSQLloader(set.loader);								
								},
								success: function(e) {
									callback = e;
									JSQLloader();
									JSQLconsolelog (e);
									JSQLcallback(set.alert, start, e);
									opt.cb();
								},
								error: function(e){
									JSQLloader();
									if (set.logs) console.log("JSQL (error): Create procedure callback failed!");
									if (set.alert === true) alert("Create procedure callback failed!");
								}
							})
						} else {
							alert("Attention!\nI can't execute an empty procedure.");
						}
					} else {
						alert("ATTENTION!\nprocedureName cannot be empty.");
					}
					for (var n=0; n<arguments.length; n++) {
						if (typeof arguments[n] == "function") {
							arguments[n].call(this);
						}
					}
				},
				call: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						procedureName: "",
						dbName: false,
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"callProcedure=true",
						"procedureName="+opt.procedureName,
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.procedureName!="") {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): Call procedure callback failed!");
								if (set.alert === true) alert("Call procedure callback failed!");
							}
						})
					} else {
						alert("ATTENTION!\nprocedureName cannot be empty.");
					}
					for (var n=0; n<arguments.length; n++) {
						if (typeof arguments[n] == "function") {
							arguments[n].call(this);
						}
					}
				},
				drop: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						procedureName: "",
						dbName: false,
						closeConnection: true,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var p = opt.functionName.indexOf("(");
					if (p!=-1) functionName = functionName.substr(0, p);
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"dropProcedure=true",
						"procedureName="+opt.procedureName,
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.procedureName!="") {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: set.async,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								callback = e;
								JSQLloader();
								JSQLconsolelog (e);
								JSQLcallback(set.alert, start, e);
								opt.cb();
							},
							error: function(e){
								JSQLloader();
								if (set.logs) console.log("JSQL (error): Drop procedure callback failed!");
								if (set.alert === true) alert("Drop procedure callback failed!");
							}
						})
					} else {
						alert("ATTENTION!\nprocedureName cannot be empty.");
					}
				}
			},
			query: function(options) {
				var start = JSQLgetTime();
				var callback;
				var args = arguments;
				var opt = $.extend({
					queryString: "",
					dbName: false,
					closeConnection: true,
					cb: function () {
						for (var n=0; n<args.length; n++) {
							if (typeof args[n] == "function") {
								args[n].call(this, callback);
							}
						}
					}
				}, options);
				var isSelect = (opt.queryString.split(" ")[0]).toUpperCase();
				if (isSelect == "SELECT") set.async=false;
				var datas = [
					set.host?"host="+set.host:"",
					set.username?"username="+set.username:"",
					set.password?"password="+set.password:"",
					opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
					"query=true",
					"queryString="+opt.queryString,
					"closeConnection="+(opt.closeConnection?0:1)
				].join("&");
				alert(datas);
				if (opt.queryString != "") {
					$.ajax({
						url: set.url,
						type: "POST",
						cache: set.cache,
						async: set.async,
						data: datas,
						beforeSend: function() {
							JSQLloader(set.loader);								
						},
						success: function(e) {
							JSQLloader();
							if (e.substring(0,3) != "(!)") {
								if (set.async === false) {
									callback = createMultipleArray(e);
									JSQLconsolelog ("\r"+e.replace(/<\|>/g, "\r"));
									JSQLcallback(set.alert, start, callback);
									opt.cb();
								} else {
									if (set.logs) console.log("JSQL (success): "+e);
									JSQLcallback(set.alert, start, e);
									return e;
								}
							} else {
								if (set.logs) console.log("JSQL (error): "+e);
							}
						},
						error: function(e){
							JSQLloader();
							if (set.logs) console.log("JSQL (error): Query callback failed!");
							if (set.alert === true) alert("Query callback failed!");
						}
					})
				} else {
					alert("Attention!\nI can't execute an empty query.");
				}
				return callback;
			},
			array: {
				databases: function() {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var count = 0;
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"arrayDatabases=true",
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					while (!callback && count<noc) { 
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: false,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								JSQLloader();
								JSQLconsolelog (e);
								callback = e.split(",");
								opt.cb();
							},
							error: function(){
								JSQLloader();
								count++;
								if (set.logs) console.log("JSQL (error): Query callback failed!");
								alert("Query callback failed!");
							}
						}); 
					}
					return callback;
				},
				tables: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						dbName: false,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var count = 0;
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"arrayTables=true",
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					while (!callback && count<noc) { 
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: false,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								JSQLloader();
								JSQLconsolelog (e);
								callback = e.split(",");
								opt.cb();
							},
							error: function(){
								JSQLloader();
								count++;
								if (set.logs) console.log("JSQL (error): Query callback failed!");
								alert("Query callback failed!");
							}
						}); 
					}
					return callback;
				},
				columns: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						tbName: false,
						dbName: false,
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var count = 0;
					var datas = [
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"arrayColumns=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						while (!callback && count<noc) { 
							$.ajax({
								url: set.url,
								type: "POST",
								cache: set.cache,
								async: false,
								data: datas,
								beforeSend: function() {
									JSQLloader(set.loader);								
								},
								success: function(e) {
									JSQLloader();
									JSQLconsolelog (e);
									callback = e.split(",");
									opt.cb();
								},
								error: function(){
									JSQLloader();
									count++;
									if (set.logs) console.log("JSQL (error): Query callback failed!");
									alert("Query callback failed!");
								}
							});
						}
					} else {
						alert("Attention!\ntbName is necessary.");
					}
					return callback;
				},
				select: function(options) {
					var start = JSQLgetTime();
					var callback;
					var args = arguments;
					var opt = $.extend({
						dbName: false,
						tbName: false,
						what: "",
						where: "",
						orderBy: "",
						cb: function () {
							for (var n=0; n<args.length; n++) {
								if (typeof args[n] == "function") {
									args[n].call(this, callback);
								}
							}
						}
					}, options);
					var start = JSQLgetTime();
					var count = 0;
					var datas = [
						set.JSON?"JSON=true":"JSON=false",
						set.host?"host="+set.host:"",
						set.username?"username="+set.username:"",
						set.password?"password="+set.password:"",
						opt.dbName?"dbName="+opt.dbName:set.dbName?"dbName="+set.dbName:"",
						"arraySelect=true",
						opt.tbName?"tbName="+opt.tbName:set.tbName?"tbName="+set.tbName:"",
						"what="+opt.what,
						"where="+JSQLwhereToString(opt.where),
						"orderBy="+opt.orderBy,
						"closeConnection="+(opt.closeConnection?0:1)
					].join("&");
					if (opt.tbName != "" || !opt.tbName) {
						$.ajax({
							url: set.url,
							type: "POST",
							cache: set.cache,
							async: args.length>1?true:false,
							data: datas,
							beforeSend: function() {
								JSQLloader(set.loader);								
							},
							success: function(e) {
								JSQLloader();
								if (!set.JSON) {
									JSQLconsolelog ("\r"+e.replace(/<\|>/g, "\r"));
									callback = createMultipleArray(e);
								} else {
									JSQLconsolelog ("\r"+e, "\r");
									callback = eval(e);
								}
								opt.cb();
							},
							error: function(){
								JSQLloader();
								count++;
								if (set.logs) console.log("JSQL (error): Query callback failed!");
								alert("Query callback failed!");
							}
						});
					} else {
						alert("Attention!\ntbName is necessary.");
					}
					return callback;
				}
			}
		}, options);
		function JSQLcallback(c, s, e) {
			var t = JSQLtimeToMilliseconds(s);
			if (c === true) alert(t+e);
		}
		function createMultipleArray(e){
			var array = [];
			var s2 = e.split("<|>");
			for (var i=0; i<s2.length; i++) {
				array.push(s2[i]);
				array[i] = array[i].split("<,>");
			}
			return array;
		}
		function JSQLrowsToString (rows) {
			var splitted = [];
			for (var n=0; n<rows.length; n++) {
				var r = encodeURI(rows[n]).split(/=/g);
				splitted.push(r[0]);
				splitted.push(r[1]);
			}
			return splitted;
		}
		function JSQLwhereToString (row) {
			var str = "";
			if (typeof row == "object") {
				for (var n=0; n<row.length; n++) {
					row[n] = row[n].replace("=", '|');
					row[n] = row[n].replace(":", '|');
					row[n] = row[n].replace("+", '_plus_');
					row[n] = row[n].replace("-", '_less_');
					row[n] = row[n].replace("*", '_multi_');
					row[n] = row[n].replace("//", '_subd_');
					row[n] = row[n].replace("\'", '_str_').replace("\'", '_str_');
					if (n<row.length-1) str += row[n]+","; else str += row[n];
				}
				return str;
			}
			return row.replace(/=/g, '|').replace(/:/g, '|');
		}
		function JSQLcolsToString (columns) {
			var str = "";
			for (var n=0; n<columns.length; n++) {
				if (n<columns.length-1) {
					str += columns[n]+", "; 
				} else str += columns[n];
			}
			return str;
		}
		function JSQLdataToString () {
			var data = "";
			if (set.host) data += "&host="+set.host;
			if (set.username) data += "&username="+set.username;
			if (set.password) data += "&password="+set.password;
			return data;
		}
		function JSQLgetTime () {
			return new Date().getTime();
		}
		function JSQLtimeToMilliseconds(start) {
			return "("+((JSQLgetTime()-start)/1000)+" seconds)";
		}
		function JSQLloader (e) {
			if (e === true) {
				$(".JSQLloader").css({
					width: "100%",
					height: "100%"
				}).show();
			} else {
				$(".JSQLloader").css({
					width: "0%",
					height: "0%"
				}).hide();
			}
		}
		function JSQLloaderDefaultImage () {
				return "data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjA0ODA=";
		}
		function JSQLconsolelog (e) {
			if (typeof e === "object") e = e.join();
			if (e.substring(0,3) != "(!)") {
				if (set.logs) console.log("JSQL (success): "+e);
			} else {
				if (set.logs) console.log("JSQL (error): "+e);
			}
		}
		$(document).ready(function(e) {
			var image = set.loaderImage?set.loaderImage:JSQLloaderDefaultImage();
			var opacity = set.loaderOpacity?set.loaderOpacity:"0.5";
			var text = set.loaderText?set.loaderText:"";
			var width = set.loaderWidth?set.loaderWidth:"64px";
			var height = set.loaderHeight?set.loaderHeight:"64px";
			$("body").append("<div class='JSQLloader'><table width='100%' height='100%' style='position:fixed; top:0; left:0; width:0%; height:0%; color:white; background-color: rgb(0,0,0); background-color: rgba(0,0,0,"+opacity+"); z-index:999999'><td align='center' valign='middle'><div style='width: "+width+"; height: "+height+"; display:none; background-repeat: no-repeat; background-image: url("+image+")'></div>"+text+"</td></table></div>");					
		});
		return $.extend(set);
	}
})();
