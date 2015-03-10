//登录模块
$('.login').find('a.userlog').click(function(event) {
	
});
//注册模块
$('.login').find('a.reglog').click(function(event) {
	
});
//检测是否登录模块


//抓取内容列表
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var gethost = GetQueryString("host"),gettitle = GetQueryString("title"),getmsg = GetQueryString("msg");
$('body').append('<form class="dwz"><input name="url" value="'+gethost+'" /></form>')
$('.host').text(gethost).attr('href', gethost);
$(".title").val(gettitle).text(gettitle);
$(".msg").text(gethost+'\n'+getmsg);
var vallength = (gethost+'\n'+getmsg).length;
var maxlenfth = 240-vallength;
if(maxlenfth>=0){
	$('span.fontnumber').removeClass('error').css('color','#333').text('还可以输入'+maxlenfth+"个字");
}else{
	$('span.fontnumber').addClass('error').css('color','red').text('超出'+maxlenfth+"个字");
}

//字数限制
$("textarea").keyup(function(){
	var vallength = $("textarea.msg").val().length;
	var maxlenfth = 240-vallength;
	if(maxlenfth>=0){
		$('span.fontnumber').removeClass('error').css('color','#333').text('还可以输入'+maxlenfth+"个字");
	}else{
		$('span.fontnumber').addClass('error').css('color','red').text('超出'+maxlenfth+"个字");
	}
  });

//设备选择
$('#haved_devel').find('li').mouseover(function(i) {
	var value = $(this).find('input[type=hidden]').val();
	$(this).attr('id',value);
});

$('#haved_devel').delegate('li','click', function(event) {
	var getdeveltype  = $(this).attr('class');
	var develname = $(this).find('.devel_name').html();
	var getdeveluuid = $(this).find('input[type=hidden]').val();
	var clickover = $(this).hasClass('active');
	$('.have_not_devel').hide();
	$(this).addClass('active');
	if(clickover===false){
		$('.select_list').find('.'+getdeveltype).fadeIn().find('ul').append('<li><i></i><span>'+develname+'</span><font style="display:none;">'+getdeveluuid+'</font><b class="clouse">x</b></li>');
		var nowvalue = $('#value_uuid').text();
		var pustvalue = nowvalue+getdeveluuid+',' ;
		$('#value_uuid').html(pustvalue);
		var settext = $('#value_uuid').html().slice(0,-1);
		$('#touuid').val(settext);
		$('.select_list').find('.'+getdeveltype).each(function(i) {
			var selectnamber = $(this).find('ul').find('li').length;
			$(this).find('h5').find('span').html(selectnamber);
			if(selectnamber===0){
				$(this).fadeOut();
			}
		});
	}else{
		alert('您已经选择这个设备了');
	}

});

// 设备删除
$('.select_list').delegate('b.clouse', 'click', function(event) {
	var develnamber = $(this).parent('li').parent('ul').parent('div').find('h5').find('span').html();
	var getdeveluuid = $(this).parent('li').find('font').html();
	var nowvalue = $('#value_uuid').text();
	$("#haved_devel").find('#'+getdeveluuid).removeClass('active');
	$('#value_uuid').text(nowvalue.replace(new RegExp(getdeveluuid+',',"g"),""));
	var settext = $('#value_uuid').html().slice(0,-1);
	$('#touuid').val(settext);
	$(this).parent('li').parent('ul').parent('div').find('h5').find('span').html(develnamber-1);
	if(develnamber==="1"){
		$(this).parent('li').parent('ul').parent('div').fadeOut(50);
	}
	$(this).parent('li').detach();
});


//提交模块
$('.submsg').click(function(){
	$.get('../log/log.json',$('form').serialize(),'json');
	// setTimeout(function(){window.close()}, 3000);
});