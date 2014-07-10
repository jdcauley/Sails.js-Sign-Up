/**
 * SignupController
 *
 * @description :: Server-side logic for managing signups
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "",
    auth: {
        user: "",
        pass: ""
    }
});

module.exports = {

	index: function(req, res){

		var params = req.params.all();

		Signup.create(params, function(err, signUp){

			if(err){
				res.send(500);
			}
			if(signUp){
				res.send(200);

				var mailOptions = {
    			from: "Plastic Signup <jordan@cauley.co>",
    			to: "jordan@cauley.co",
    			subject: "New Sign Up",
    			text: 'email: ' + params.email,
    			html: 'email: ' + params.email
				}

// send mail with defined transport object
				smtpTransport.sendMail(mailOptions, function(error, response){
    			if(error){
        		console.log(error);
    			}else{
        		console.log("Message sent: " + response.message);
    			}
				});

			}

		});

	}

};
