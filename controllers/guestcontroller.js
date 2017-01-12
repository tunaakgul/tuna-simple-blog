var db=require('../db')
var util=require('../util')

exports.postList=function(req,res){

	db.query("SELECT p.*,u.uname as username FROM post p INNER JOIN user u ON p.uid=u.id ORDER BY p.id DESC",function(err,result){
		if(err){
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Success",result)
	})
}

exports.getPost=function(req,res){
	var id=req.body.id

	db.query("SELECT p.*,u.uname as username FROM post p INNER JOIN user u ON p.uid=u.id WHERE p.id=?",[id],function(err,result){
		if(err){
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Success",result)
	})
}

exports.getComments=function(req,res){
	var id=req.body.id

	db.query("SELECT * FROM comment WHERE postid=? AND isActive=1",[id],function(err,result){
		if(err){
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Success",result)
	})
}

exports.getComment=function(req,res){
	var id=req.body.id

	db.query("SELECT * FROM comment WHERE id=?",[id],function(err,result){
		if(err){
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Success",result)
	})
}

exports.sendComment=function(req,res){
	var body=req.body
	var name=body.name
	var mail=body.mail
	var postid=body.postid
	var content=body.content
	var date=util.dateNow()
	var website=body.website

	if(website==""){
		website==null
	}

	db.query("INSERT INTO comment (name,mail,postid,content,website,date,isActive) VALUES (?,?,?,?,?,?,0)",[name,mail,postid,content,website,date],function(err,result){
		if(err) {
			return util.send(res, 404, "Database Error")
		}

		util.send(res, 200, "Added")
	})
}