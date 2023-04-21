const fs = require('fs');
// JSON data
const data = require('./sortedstocks.json');
const data2 = require('./nasdaqstocks.json');
// Build paths
const { buildPathHtml } = require('./buildPaths');

/**
 * Take an object which has the following model
 * @param {Object} item 
 * @model
 * {
 *   "invoiceId": `Number`,
 *   "createdDate": `String`,
 *   "dueDate": `String`,
 *   "address": `String`,
 *   "companyName": `String`,
 *   "invoiceName": `String`,
 *   "price": `Number`,
 * }
 * 
 * @returns {String}
 */
const createRow = (stock) => `
  <tr>
    <td>${stock.Date}</td>
    <td>${stock.Symbol}</td>
    <td>${stock.Name}</td>
    <td>${stock.Price}</td>
    <td>${stock.Rank}</td>
  </tr>
`;

/**
 * @description Generates an `html` table with all the table rows
 * @param {String} rows
 * @returns {String}
 */
const createTable = (rows) => `
    ${rows}
`;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (table) => `
  <html>
    <head>
<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
<meta name="viewport" content="width=device-width, initial-scale=1">
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js"></script>
 <script type="text/javascript">
 
 $(document).ready(function(){
     $('#table_id td.y_n').each(function(){
         if ($(this).text() == '4-Sell') {
             $(this).css('background-color','#FF2828');
         }
         if ($(this).text() == '2-Buy') {
             $(this).css('background-color','#41BB00');
         }
	 if ($(this).text() == '3-Hold') {
	     $(this).css('background-color','#FF971C');
	 }
	 if ($(this).text() == '1-Strong Buy') {
	     $(this).css('background-color','#C5FF00');
	 }
	 if ($(this).text() == '5-Strong Sell') {
	     $(this).css('background-color','#A50000');
	 }
     });
 });
 </script>

      <style>
body {
  margin: 0;
  font-family: "Lato", sans-serif;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 220px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
 
.sidebar a.active {
background: linear-gradient(to bottom right, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
<div class="sidebar">
  <a href="Portfolio.html">Portfolio</a>
  <a href="ranking_changes.html">S&P Rank Changes</a>
  <a href="nasdaq_changes.html">NASDAQ100 (ALL)</a>
  <a href="DJ.html">Dow Jones (ALL)</a>
</div>

 <div class="content">

      ${table}

 </div>
`;

/**
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath 
 * @returns {Boolean}
 */
const doesFileExist = (filePath) => {
	try {
		fs.statSync(filePath); // get information of the specified file path.
		return true;
	} catch (error) {
		return false;
	}
};

try {
	/* Check if the file for `html` build exists in system or not */
	if (doesFileExist(buildPathHtml)) {
		console.log('Deleting old build file');
		/* If the file exists delete the file from system */
		fs.unlinkSync(buildPathHtml);
	}
	/* generate rows */
	const rows = data.map(createRow).join('');
	/* generate table */
	const table = createTable(rows);
	/* generate html */
	const html = createHtml(table);
	/* write the generated html to file */
	fs.writeFileSync(buildPathHtml, html);
	console.log('Succesfully created an HTML table');
} catch (error) {
	console.log('Error generating table', error);
}
