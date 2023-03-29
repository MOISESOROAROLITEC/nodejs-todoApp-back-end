const sgMail = require("@sendgrid/mail");

const sendgridAPIKey = "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";

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
	to: "moisesoro@arolitec.com",
	from: "moisesoro@arolitec.com",
	subject: "This is the first message",
	html: "<h1>I hope this mail will send.</h1>",

}).then(() => {
	console.log("envoyé");
}).catch(err => console.log(err));