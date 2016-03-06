/*
c2 jQuery tools
 */

jQuery(function ($) {

	$('.page-id-68 div.post-entry h2').each(function() { 
	$(this).next().andSelf()    //Get the pair of elements
		   .wrapAll('<li class="liWrap" />')
	});
	$('.page-id-68 div.post-entry').wrapInner( "<ul id='slideDown'></ul>");
	$('.page-id-68 div.post-entry dl').addClass('xcontent');
	$('.page-id-68 div.post-entry h2').wrapInner( "<a href='#' class='head'></a>");

	$('#slideDown .head').click(function(e){
		e.preventDefault();
		$(this).closest('li').find('.xcontent').not(':animated').slideToggle();
	});



// 	var imgHtml = $('.home #featured-image').html();
// 	var featHtml = $('.home #featured-content').html();
// 
// 	$('.home #featured-image').html(featHtml);
// 	$('.home #featured-content').html(imgHtml);

	//custom functions?


// 	$('div#header div.main-nav ul.menu li ul.sub-menu li a').each(function(index) {
// 		if(this.href.trim() == window.location)
// 			$(this).addClass("selected");
// 	});

// 	$('div#header div.main-nav > ul.menu > li.current-menu-item.page_item').addClass('parent');
// 	$('div#header div.main-nav ul.menu li ul.sub-menu li a.selected').parents('li').addClass('parent');
// 
// 	var newClass = $('div#header div.main-nav ul.menu > li.parent > a').text();
// 	var string = newClass.split(' ')[0];
// 	$('body').addClass(string);

//slide show caption
$('div#featured-image div.meteor-clip > div.mslide > img').each(function() {
    $(this).after( "<div class='captionBox'>" + $(this).attr('title') + "</div>" ); 
});
$('span.post-meta-key:contains("seminars_start:")').parent().addClass("hider");

var divs = $("div.widgetsWonder").get().sort(function(){ 
            return Math.round(Math.random())-0.5; //so we get the right +/- combo
           }).slice(0,1);
$(divs).show();


$('#featured-image').children().clone().prependTo('#featured-content');
$('#featured-content p:eq(0), #featured-content p:eq(1)').remove();
$('div.call-to-action').prependTo('#featured-content p:eq(0)');
$('.widget-wrapper.widget_rss h3 img').addClass('hider');
// div#featured-content div.meteor-clip img.attachment-featured-slide.wp-post-image




if ($.browser.chrome) {
    //alert("This is Chrome!");
}
// Check for IE
else if($.browser.msie){
    //alert("This is Internet Explorer!");
    $('body').addClass('ieStabMyEyesOut');

}
// Check for Safari
else if($.browser.safari){
    //alert("This is Safari!");
}
// Check for FireFox
else if($.browser.mozilla){
    //alert("This is FireFox!");
    $('body').addClass('ff');
}

$(function(){
      if(navigator.userAgent.match(/Trident\/7\./)) {
        $('body').addClass('if-ie');
		$('body').removeClass('ff')
     }
});

	//document.addEventListener("touchstart", function(){}, true);


$('#menu-menu-1 li.menu-item.current-menu-item.current_page_item.menu-item-has-children ul').clone().appendTo('.post-entry').wrap('<div class="slashMenu">');
$(".slashMenu").parent().addClass('booyah');

$('div.widget-title-home h3 a.rsswidget').contents().unwrap();

//  $("div.rssSummary").text(function(index, currentText) {
//      return currentText.substr(0, 145)+'...';
//      
//  });

//$("div.rssSummary").text($(this).text().substr(0, 175)+'...');


 $(document).ready(function() {
 
 $('#home_widget_1 div.rssSummary').text(function (_,txt) {
    return txt.slice(0, -11);
});
 
//     var showChar = 200;
//     var ellipsestext = "...";
//     var moretext = "more";
//     var lesstext = "less";
//     $("div.rssSummary").each(function() {
//         var content = $(this).html();
//  
//         if(content.length > showChar) {
//  
//             var c = content.substr(0, showChar);
//             var h = content.substr(showChar-1, content.length - showChar);
//  
//             var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
//  
//             $(this).html(html);
//         }
//  
//     });
//  
//     $(".morelink").click(function(){
//         if($(this).hasClass("less")) {
//             $(this).removeClass("less");
//             $(this).html(moretext);
//         } else {
//             $(this).addClass("less");
//             $(this).html(lesstext);
//         }
//         $(this).parent().prev().toggle();
//         $(this).prev().toggle();
//         return false;
//     });

 });




$(document).ready(function(){
        $('#widgets.home-widgets').each(function(){  
            var highestBox = 0;
            $('.widget-wrapper', this).each(function(){
                if($(this).height() > highestBox) 
                   highestBox = $(this).height(); 
            });  
            $('.widget-wrapper',this).height(highestBox);
    });    
    
    
   

});



});




