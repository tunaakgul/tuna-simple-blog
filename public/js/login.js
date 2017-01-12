$(function() {
	$("#login").click(function(){
		var username=$("#username").val()
		var password=$("#password").val()

		if(username==""||password==""){
			alert("Username or password can not be empty.")
		}
		else{
			$.post("/admin/login",{uname:username,pass:password},function(res){
				if(res.code==404){
					alert(res.message)
				}
				else{
					Cookies.set('token', res.payload.token);
					location.href="./admin"
				}
			})
		}
	})
})