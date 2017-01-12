$(function() {
	if(!Cookies.get('token')){
		location.href="./login"
	}
	var token=Cookies.get('token')

	function getNumbers(){
		$.post("/admin/postList",{token:token},function(res){
			$("#parentWell").append('<h3>Total post number: <b>'+res.payload.length+'</b></h3>')
			$.post("/admin/activeCommentList",{token:token},function(res){
				$("#parentWell").append('<h3>Total comment number: <b>'+res.payload.length+'</b></h3>')
			})
		})
	}

	getNumbers()

	$("li a").css({"color":"#23527C"})

	$("li").click(function(){
		$("li").css("background-color", "#BDBDBD")
		$(this).css("background-color", "#A8A8A8")
	})

	$("#btnHome").click(function(){
		$("#passiveCommentWell").remove()
		$("#parentWell").html("")
		getNumbers()
	})

	$("#btnPosts").click(function(){
		$.post("/admin/postList",{token:token},function(res){
			$("#passiveCommentWell").remove()
			$("#parentWell").html("")
			$("#parentWell").append('<a class="btn btn-success btn-md" style="float:right" id="newPost"><span class="glyphicon glyphicon-plus"></span> New</a>'+
				'<table class="table table-striped custab">'+
			    '<thead>'+
			        '<tr>'+
			            '<th>Title</th>'+
			            '<th>Author</th>'+
			            '<th>Date</th>'+
			            '<th class="text-center">Action</th>'+
			        '</tr>'+
			    '</thead>'+
			'</table>')
			for(var i=0;i<res.payload.length;i++){
				var name=res.payload[i].header
				if(name.length>20){
					name=name.substring(0,20)+"..."
				}
				$(".custab").append('<tr>'+
	                '<td><b>'+name+'</b></td>'+
	                '<td>'+res.payload[i].username+'</td>'+
	                '<td>'+res.payload[i].date+'</td>'+
	                '<td class="text-center"><a class="btn btn-info btn-xs editPost" postid="'+res.payload[i].id+'"><span class="glyphicon glyphicon-edit"></span> Edit</a>'+
	                '<a class="btn btn-danger btn-xs deletePost" postid="'+res.payload[i].id+'"><span class="glyphicon glyphicon-remove"></span> Del</a></td>'+
	            '</tr>')
			}
		})
	})

	$("#btnComments").click(function(){
		$.post("/admin/activeCommentList",{token:token},function(res){
				$("#passiveCommentWell").remove()
				$("#parentWell").html("")
				$("#parentWell").append('<center><h2><b>Comments</b></h2></center>'+
				'<table class="table table-striped custab" style="table-layout:fixed;">'+
				    '<thead>'+
				        '<tr>'+
				            '<th>Name</th>'+
				            '<th>Comment</th>'+
				            '<th>Content</th>'+
				            '<th>Date</th>'+
				            '<th class="text-center">Action</th>'+
				        '</tr>'+
				    '</thead>'+
				'</table>')
				for(var i=0;i<res.payload.length;i++){
					var comment=res.payload[i].content
					var postName=res.payload[i].postName
					if(comment.length>20){
						comment=comment.substring(0,20)+"..."
					}
					if(postName.length>20){
						postName=postName.substring(0,20)+"..."
					}
					$(".custab").append('<tr>'+
						'<td style="word-wrap:break-word;"><b>'+res.payload[i].name+'</b></td>'+
		                '<td style="word-wrap:break-word;">'+comment+'</b></td>'+
		                '<td style="word-wrap:break-word;">'+postName+'</b></td>'+
		                '<td style="word-wrap:break-word;">'+res.payload[i].date+'</b></td>'+
		                '<td style="word-wrap:break-word;" class="text-center"><a class="btn btn-info btn-xs editComment" commentid="'+res.payload[i].id+'"><span class="glyphicon glyphicon-edit"></span> Edit</a>'+
		                '<a class="btn btn-danger btn-xs deleteComment" commentid="'+res.payload[i].id+'"><span class="glyphicon glyphicon-remove"></span> Del</a></td>'+
		            '</tr>')
				}
				$.post("/admin/passiveCommentList",{},function(res){
					$("#parentWell").after('<div id="passiveCommentWell" class="well col-lg-10 col-md-10 col-sm-2" style="background-color:#bdbdbd"><center><h2><b>Passive Comments</b></h2></center><table class="table table-striped custab" id="passiveComments" style="table-layout:fixed;">'+
					    '<thead>'+
					        '<tr>'+
					            '<th>Name</th>'+
					            '<th>Comment</th>'+
					            '<th>Content</th>'+
					            '<th>Date</th>'+
					            '<th class="text-center">Action</th>'+
					        '</tr>'+
					    '</thead>'+
					'</table></div>')
					for(var i=0;i<res.payload.length;i++){
						var comment=res.payload[i].content
						var postName=res.payload[i].postName
						if(comment.length>20){
							comment=comment.substring(0,20)+"..."
						}
						if(postName.length>20){
							postName=postName.substring(0,20)+"..."
						}
						$("#passiveComments").append('<tr>'+
							'<td style="word-wrap:break-word;"><b>'+res.payload[i].name+'</b></td>'+
			                '<td style="word-wrap:break-word;">'+comment+'</b></td>'+
			                '<td style="word-wrap:break-word;">'+postName+'</b></td>'+
			                '<td style="word-wrap:break-word;">'+res.payload[i].date+'</b></td>'+
			                '<td style="word-wrap:break-word;" class="text-center"><a class="btn btn-success btn-xs activateComment" commentid="'+res.payload[i].id+'"><span class="glyphicon glyphicon-ok"></span></a>'+
			                '<a class="btn btn-info btn-xs editComment" commentid="'+res.payload[i].id+'"><span class="glyphicon glyphicon-edit"></span> Edit</a>'+
			                '<a class="btn btn-danger btn-xs deleteComment" commentid="'+res.payload[i].id+'"><span class="glyphicon glyphicon-remove"></span> Del</a></td>'+
			            '</tr>')
					}
				})
			})
	})

	$(document).on('click', '#newPost' ,function() {
			$("#parentWell").append('<div id="newPostModal" class="modal fade" role="dialog">'+
				  '<div class="modal-dialog">'+
				    '<div class="modal-content">'+
				      '<div class="modal-body">'+
				        '<div class="form-group">'+
						  '<label for="headercontent">Title:</label>'+
						  '<input type="text" class="form-control" id="headercontent" value="">'+
						'</div>'+
						'<div class="form-group">'+
						  '<label for="postcontent">Content:</label>'+
						  '<textarea class="form-control" rows="5" id="postcontent"></textarea>'+
						'</div>'+
				      '</div>'+
				      '<div class="modal-footer">'+
				      	'<button type="button" class="btn btn-success" data-dismiss="modal" id="postsend">Send</button>'+
				        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
				      '</div>'+
				    '</div>'+
				  '</div>'+
				'</div>')
			$("#newPostModal").modal("show")
    })

	$(document).on('click', '.editPost' ,function() {
		var postid=$(this).attr("postid")
		$.post("./getPost",{id:postid},function(res){
			$("#parentWell").append('<div id="editModal" class="modal fade" role="dialog">'+
				  '<div class="modal-dialog">'+
				    '<div class="modal-content">'+
				      '<div class="modal-header">'+
				        '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
				        '<h4 class="modal-title">'+res.payload[0].header+'</h4>'+
				      '</div>'+
				      '<div class="modal-body">'+
				        '<div class="form-group">'+
						  '<label for="headeredit">Title:</label>'+
						  '<input type="text" class="form-control" id="headeredit" value="'+res.payload[0].header+'">'+
						'</div>'+
						'<div class="form-group">'+
						  '<label for="contentedit">Content:</label>'+
						  '<textarea class="form-control" rows="5" id="contentedit">'+res.payload[0].content+'</textarea>'+
						'</div>'+
				      '</div>'+
				      '<div class="modal-footer">'+
				      	'<button type="button" class="btn btn-success" data-dismiss="modal" postid="'+res.payload[0].id+'" id="postupdate">Update</button>'+
				        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
				      '</div>'+
				    '</div>'+
				  '</div>'+
				'</div>')
			$("#editModal").modal("show")
		})
    })

    $(document).on('click', '.editComment' ,function() {
		var commentid=$(this).attr("commentid")
		$.post("./getComment",{id:commentid},function(res){
			$("#parentWell").append('<div id="editModal" class="modal fade" role="dialog">'+
				  '<div class="modal-dialog">'+
				    '<div class="modal-content">'+
				      '<div class="modal-body">'+
				        '<div class="form-group">'+
						  '<label for="nameedit">Name:</label>'+
						  '<input type="text" class="form-control" id="nameedit" value="'+res.payload[0].name+'">'+
						'</div>'+
						'<div class="form-group">'+
						  '<label for="contentedit">Content:</label>'+
						  '<textarea class="form-control" rows="5" id="contentedit">'+res.payload[0].content+'</textarea>'+
						'</div>'+
				      '</div>'+
				      '<div class="modal-footer">'+
				      	'<button type="button" class="btn btn-success" data-dismiss="modal" commentid="'+res.payload[0].id+'" id="commentupdate">Update</button>'+
				        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
				      '</div>'+
				    '</div>'+
				  '</div>'+
				'</div>')
			$("#editModal").modal("show")
		})
    })

    $(document).on('click', '.activateComment' ,function() {
		var commentid=$(this).attr("commentid")
		$.post("./admin/activateComment",{id:commentid},function(res){
			alert(res.message)
			$("#btnComments").click()
		})
    })

    $(document).on('click','#postsend',function(){
		var header=$("#headercontent").val()
		var content=$("#postcontent").val()
		$.post("./admin/sendPost",{token:token,header:header,content:content},function(res){
			alert(res.message)
			$("#btnPosts").click()
			$("#newPostModal").modal("hide")
		})
	})

	$(document).on('click','#postupdate',function(){
		var postid=$(this).attr("postid")
		var newHeader=$("#headeredit").val()
		var newContent=$("#contentedit").val()
		$.post("./admin/editPost",{token:token,id:postid,header:newHeader,content:newContent},function(res){
			alert(res.message)
			$("#btnPosts").click()
			$("#editModal").modal("hide")
		})
	})

	$(document).on('click','#commentupdate',function(){
		var commentid=$(this).attr("commentid")
		console.log(commentid)
		var newName=$("#nameedit").val()
		var newContent=$("#contentedit").val()
		$.post("./admin/editComment",{token:token,id:commentid,name:newName,content:newContent},function(res){
			alert(res.message)
			$("#btnComments").click()
			$("#editModal").modal("hide")
		})
	})

	$(document).on('click','.deletePost',function(){
		if (confirm('Are you sure?')) {
			var postid=$(this).attr('postid')
			$.post("./admin/deletePost",{token:token,id:postid},function(res){
				alert(res.message)
				$("#btnPosts").click()
			})
		}
	})

	$(document).on('click','.deleteComment',function(){
		if (confirm('Are you sure?')) {
			var commentid=$(this).attr('commentid')
			$.post("./admin/deleteComment",{token:token,id:commentid},function(res){
				alert(res.message)
				$("#btnComments").click()
			})
		}
	})

	$("#btnSignOut").click(function(){
		Cookies.remove('token')
		location.href="./login"
	})
})