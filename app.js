var app=require('express')()
var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')

var gctrl=require('./controllers/guestcontroller')
var actrl=require('./controllers/admincontroller')
var util=require("./util")

app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.engine('html', require('ejs').renderFile)
app.use(require('express').static("public"))

app.get("/",function(req,res){
	res.render("index.html",{footer:util.footer(),header:util.header()})
})

app.get("/post=:postid",function(req,res){
	var postid=req.params.postid
	res.render("post.html",{postid:postid,footer:util.footer(),header:util.header()})
})

app.get("/login",function(req,res){
	res.render("admin/login.html")
})

app.get("/admin",function(req,res){
	res.render("admin/index.html",{footer:util.footer()})
})

app.post("/admin/login",actrl.login)

app.post("/admin/sendPost",util.tokenToUid,actrl.sendPost)

app.post("/admin/editPost",util.tokenToUid,actrl.editPost)

app.post("/admin/deletePost",util.tokenToUid,actrl.deletePost)

app.post("/admin/postList",util.tokenToUid,actrl.postList)


app.post("/admin/activateComment",util.tokenToUid,actrl.activateComment)

app.post("/admin/editComment",util.tokenToUid,actrl.editComment)

app.post("/admin/deleteComment",util.tokenToUid,actrl.deleteComment)

app.post("/admin/activeCommentList",util.tokenToUid,actrl.activeCommentList)

app.post("/admin/commentListForPost",util.tokenToUid,actrl.commentListForPost)

app.post("/admin/passiveCommentList",util.tokenToUid,actrl.passiveCommentList)

app.post("/admin/activeCommentListForPost",util.tokenToUid,actrl.activeCommentListForPost)


app.post("/postList",gctrl.postList)

app.post("/getPost",gctrl.getPost)

app.post("/getComments",gctrl.getComments)

app.post("/getComment",gctrl.getComment)

app.post("/sendComment",gctrl.sendComment)

app.listen(8888)