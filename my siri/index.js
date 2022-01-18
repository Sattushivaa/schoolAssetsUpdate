const ws = require("ws");
const fs = require("fs");
let Store = JSON.parse( fs.readFileSync("data.json").toString() );

const server = new ws.Server({port:8080});

console.log("ws server started");
console.log("server listening on the port 8080...");

server.on("connection",(client)=>{
	console.log("[!] a new client connected");
	client.onmessage = data => handleData(JSON.parse(data.data),client);
});

//====================== FUNCTIONS =========================

function handleData(data,client){
	if(!data.type) return;
	data.type=="learn"?learn(data):reply(data,client);
}

function learn(data) {
	let address = false;
	let ansAllready = false;
	let existing = false;
	Store.questions.forEach( (Q,i) => {
		if(Q.question == data.question){
			existing = true;
			address = i;
		}
		if(existing){
			Store.questions[address].answers.forEach((A)=>{
				if(A == data.ansewer) ansAllready = true;
			});
			if(!ansAllready){
				Store.questions[address].answers.push(data.answer);
			}
		} else {
			let obj = {	answers : [] };
			obj.question = data.question;
			if (data.answer) obj.answers.push(data.answer);
			Store.questions.push(obj);
			fs.writeFileSync("data.json",JSON.stringify(Store));
		}
	});
}

function reply(data,client) {
	let Q = Store.questions.filter((elm)=> elm.question == data.question);
	client.send(JSON.stringify({type : "reply", message : decision.choose(Q.answers)}));
}