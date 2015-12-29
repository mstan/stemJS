STeMJS (Simple conTent Management NodeJS) is software written by Matthew Stanley for use of simple website creation. <br />
<br /> <br />
In order to install stemJS: <br />
	1. Clone the repository with 'git clone https://github.com/mstan/stemJS.git'  <br />
	2. cd stemJS  <br />
	3. npm install  <br />
	4. Create stemJS/db.sqlite (empty file)<br />
	5. In authHandler change Line 32: http://<YOURWEBSITE>.<EXT> with respective info (ex: http://1379.tech ) <br />
	6. in app.js change 42 and 44 <TOKEN A> and <TOKEN B> to randomly generated secure tokens <br />
	7. npm start
