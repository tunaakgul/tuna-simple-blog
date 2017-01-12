$(function() {
	function getPosts(){
		$.post("/postList",{},function(res){
				var posts=res.payload
				var postsDiv=$("#body")
				for(var i=0;i<posts.length;i++){
					var content=posts[i].content.substring(0,400)+"..."
					postsDiv.append('<div class="well">'+
						'<h3><a style="cursor:pointer;font-weight:bold;" class="postheader" postid="'+posts[i].id+'">'+posts[i].header+'</a></h3>'+
						'<h5 style="font-weight:bold">'+posts[i].date+' - Written by '+posts[i].username+'</h5>'+
						'<p style="word-wrap:break-word;">'+content+
						'</p><br>'+
						'<button type="button" class="btn btn-primary" style="float:right;" postid="'+posts[i].id+'">Read More...</button><br>'+
					'</div>')
				}
			})
	}
	
	getPosts()

	$(document).on('click', 'button' ,function() {
		      		var postid=$(this).attr('postid')
		      		window.location.href="/post="+postid
		        })

	$(document).on('click', '.postheader' ,function() {
		      		var postid=$(this).attr('postid')
		      		window.location.href="/post="+postid
		        })
})