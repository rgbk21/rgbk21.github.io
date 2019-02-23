//Clicking on li should grey out the text and provide a strikethrough the text
$("ul").on("click", "li", function(){
	$(this).toggleClass("liStyling");
});

//Clicking on a span X should fade out the enclosing li element and then fade out and delete the entire li element
//Note the (this).parent() method to delete the parent of the enclosing li
//Note that the simple version of on("click") does not work. We need to change the code a bit to the below version
//Only take care that the element in place of the "ul" exists when the document is first loaded.

// $("ul").on("click", "span", function(event){
// 	$(this).parent().fadeOut(3000, function(){
// 		$(this).remove();
// 		$(this).remove();
// 	});
// 	event.stopPropagation();
// });

//$("ul").on("click", "span", function(event)
//what does $(this) refer to over here?

$("ul").on("click", "span", function(event){
	$(this).parent().parent().fadeOut(750, function(){//$(this).parent().parent() fades out the div
		$(this).remove();//$(this) removes the div. How does (this) refer to 2 separate things?
	});
	event.stopPropagation();
});


//Add a listener to the text input that fires when we press the enter key. Our new todo is created.

$("input[type=text]").on("keypress", function(event){
	if(event.which === 13)
	{
		//Either one works:
		// var newTodo = $(this).val();
		var newTodo = $("input[type=text]").val();
		$("ul").append('<div class="eachTodo"><li><span><i class="fa fa-trash"></i></span> ' + newTodo + '</li></div>');
		$("input[type=text]").val("");
	}
});

$(".fa-plus").on("click", function(){
	$("input").fadeToggle();
});




