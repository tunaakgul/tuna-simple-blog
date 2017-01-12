var crypto = require('crypto')
var db=require('./db')

exports.tokenToUid=function(req,res,next){
	var token = req.cookies.token || req.body.token

	db.query("SELECT uid FROM token WHERE token=?",[token],function(err,rows){
		if(!rows[0]){
			res.send("Unauthorized Request")
			return
		}
		var uid=rows[0].uid
		req.uid=uid
		next()
	})
}

exports.send = function (res, code, message, payload) {

	if(!payload) {
		payload = {}
	}

	res.send({code: code, message: message, payload: payload})
}

exports.randomString = function(len){
	return crypto.randomBytes(Math.floor(len/2)).toString('hex')
}


exports.dateNow=function(){
	var today = new Date()
	var dd = today.getDate()
	var mm = today.getMonth()+1 //January is 0!

	var yyyy = today.getFullYear()
	if(dd<10){
	    dd='0'+dd
	} 
	if(mm<10){
	    mm='0'+mm
	} 
	var today = dd+'/'+mm+'/'+yyyy
	return today
}

exports.header=function(){
	var header=('<div class="page-header">'+
				    '<h1><a style="cursor:pointer;color:black" href="./">Tuna Simple Blog</a></h1>'+
				    '<i style="margin-left:20px">lorem ipsum ashdsjad</i>'+
				'</div>')
	return header
}

exports.footer=function(){
	var footer=('<hr />'+
			        '<div class="text-center center-block">'+
			            '<p class="txt-railway">- <a href="http://www.tunaakgul.com">www.tunaakgul.com</a> -</p>'+
			            '<br />'+
			                '<a href="https://www.facebook.com/subvmozb"><i class="fa fa-facebook-square fa-3x social"></i></a>'+
				            '<a href="https://twitter.com/tunaakgul"><i class="fa fa-twitter-square fa-3x social"></i></a>'+
				            '<a href="mailto:tuna.akgul@gmail.com"><i class="fa fa-envelope-square fa-3x social"></i></a>'+
					'</div>'+
			    '<hr />')
	return footer
}