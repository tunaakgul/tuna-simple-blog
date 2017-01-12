$(function() {

	var postid=$("#post").attr('postid')

	function getPost(){
		$.post("./getPost",{id:postid},function(res){
				var post=res.payload
				document.title=post[0].header + " - Tuna Simple Blog"
				var postDiv=$("#post")
					postDiv.append('<h3><a style="cursor:pointer;font-weight:bold;" class="postheader" postid="'+post[0].id+'">'+post[0].header+'</a></h3>'+
						'<h5 style="font-weight:bold">'+post[0].date+' - Written by '+post[0].username+'</h5>'+
						'<p style="word-wrap:break-word;">'+post[0].content+
						'</p><br>')
			})
	}

	function getComments(){
		$.post("./getComments",{id:postid},function(res){
				var comments=res.payload
				var commentsDiv=$("#comments")
				if(comments.length==0){
					$("#commentsHeader").text("")
				}
				for(var i=0;i<comments.length;i++){
					commentsDiv.append('<div class="col-sm-1">'+
						'<div class="thumbnail">'+
						'<img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">'+
						'</div>'+
						'</div>'+

						'<div class="col-sm-5">'+
						'<div class="panel panel-default">'+
						'<div class="panel-heading">'+
						'<strong>'+comments[i].name+'</strong> <span class="text-muted">commented at '+comments[i].date+'</span>'+
						'</div>'+
						'<div class="panel-body">'+
						'<p style="word-wrap:break-word;">'+
						comments[i].content+
						'</p>'+
						'</div>'+
						'</div>'+
						'</div>')
				}
			})
	}
	
	getPost()
	getComments()

	$(document).on('click', '.postheader' ,function() {
		      		var postid=$(this).attr('postid')
		      		window.location.href="/post="+postid
		        })

	$("#sendComment").click(function(){
		var name=$("#name").val()
		var email=$("#email").val()
		var website=$("#website").val()
		var content=$("#comment").val()

		if(name==""){
			alert("Name can not be null!")
			return
		}
		if(email==""){
			alert("Email can not be null!")
			return
		}
		if(content==""){
			alert("Comment can not be null!")
			return
		}
			$.post("./sendComment",{name:name,mail:email,postid:postid,content:content,website:website},function(res){
				if(res.code==404){
					alert("There is an error!")
				}
				else
					alert("Your comment sent. It will publish when be approved.")
				$("#name").val("")
				$("#email").val("")
				$("#website").val("")
				$("#comment").val("")
			})
	})
})