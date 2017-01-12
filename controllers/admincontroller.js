var db=require('../db')
var util=require('../util')

exports.login=function(req,res){
	var body=req.body
	var uname=body.uname
	var pass=body.pass

	db.query("SELECT id FROM user WHERE uname=? AND pass=?",[uname,pass],function(err,result){
		if(!result[0]){
			util.send(res, 404, "Incorrect Information")
			return
		}
		var uid=result[0].id
		var token=util.randomString(30)
		db.query("INSERT INTO token (uid,token) VALUES (?,?)",[uid,token],function(err,result){
			if(err){
				util.send(res, 404, "Database Error")
				return
			}
			util.send(res, 200, "Success",{token:token})
		})
	})
}

exports.sendPost=function(req,res){
	var body=req.body
	var header=body.header
	var content=body.content
	var uid=req.uid
	var date=util.dateNow()

	db.query("INSERT INTO post (header,content,uid,date) VALUES (?,?,?,?)",[header,content,uid,date],function(err,result){
		if(err) {
			return util.send(res, 404, "Database Error")
		}

		util.send(res, 200, "Added")
	})
}

exports.editPost=function(req,res){
	var body=req.body
	var id=body.id
	var header=body.header
	var content=body.content
	var uid=req.uid

	db.query("UPDATE post SET header=?,content=? WHERE uid=? AND id=?",[header,content,uid,id],function(err,result){
		if(err){
			return util.send(res, 404, "Database Error")
		}

		util.send(res, 200, "Updated!")
	})
}

exports.deletePost=function(req,res){
	var uid=req.uid
	var id=req.body.id

	db.query("DELETE FROM post WHERE uid=? AND id=?",[uid,id],function(err,result){
		if(err){
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Deleted!")
	})
}

exports.postList=function(req,res){
	var uid=req.uid

	db.query("SELECT p.*,u.uname as username FROM post p INNER JOIN user u ON p.uid=u.id WHERE p.uid=? ORDER BY p.id DESC",[uid],function(err,result){
		if(err){
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Success",result)
	})
}

exports.activateComment=function(req,res){
	var id=req.body.id

	db.query("UPDATE comment SET isActive=? WHERE id=?",[1,id],function(err,result){
		if(err){
			return util.send(res,404,"Database Error")
		}
		util.send(res,200,"Activated!")
	})
}

exports.editComment=function(req,res){
	var body=req.body
	var id=body.id
	var name=body.name
	var content=body.content

	db.query("UPDATE comment SET name=?,content=? WHERE id=?",[name,content,id],function(err,result){
		if(err){
			return util.send(res,404,"Database Error")
		}
		util.send(res,200,"Updated!")
	})
}

exports.deleteComment=function(req,res){
	var id=req.body.id

	db.query("DELETE FROM comment WHERE id=?",[id],function(err,result){
		if(err){
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Deleted")
	})
}

exports.activeCommentList=function(req,res){

	db.query("SELECT c.*,p.header as postName FROM comment c INNER JOIN post p ON c.postid=p.id WHERE c.isActive=1",function(err,result){
		if(err){
			console.log(err)
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Success",result)
	})
}

exports.passiveCommentList=function(req,res){

	db.query("SELECT c.*,p.header as postName FROM comment c INNER JOIN post p ON c.postid=p.id WHERE c.isActive=0",function(err,result){
		if(err){
			console.log(err)
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Success",result)
	})
}

exports.commentListForPost=function(req,res){
	var id=req.body.id

	db.query("SELECT c.*,p.header as postName FROM comment c INNER JOIN post p ON c.postid=p.id WHERE p.id=?",[id],function(err,result){
		if(err){
			console.log(err)
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Success",result)
	})
}

exports.activeCommentListForPost=function(req,res){
	var id=req.body.id

	db.query("SELECT c.*,p.header as postName FROM comment c INNER JOIN post p ON c.postid=p.id WHERE p.id=? AND c.isActive=1",[id],function(err,result){
		if(err){
			console.log(err)
			return util.send(res,404,"Database Error")
		}
		util.send(res, 200, "Success",result)
	})
}
