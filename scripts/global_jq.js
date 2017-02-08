$(function(){
    highlightPage();
    prepareSideshow();
    prepareInternalnav();
    preparePlaceholder();
    displayAbbreviations();
    prepareForms()
})

//index.html、about.html、photos.html、live.html、contact.html
//遍及nav中的a元素，如果当前页面url中包含href属性值，则为当前a元素添加here类
//并且将a元素的文本值小写后赋予当前body的id属性，用于设置个性化背景图像
function highlightPage() {
    $('header nav a[href]').each(function() {
        //如果目前地址包含当前a元素，则给当前a元素加here类，并将body的id设置为当前a元素的文本值
        if (window.location.href.indexOf($(this).attr('href')) != -1) {
            $(this).attr('class', 'here');  //这里是设置attr，而不是追加addClass
            var bodyId = $(this).attr('href').split('.')[0];
            if (bodyId == 'index') { bodyId = 'home' };  //index改为home
            $('body').attr('id', bodyId);  
        }
    });    
}

//index.html
//在intro后创建一个div，包含一个图像框和一个移动图像（5个合成1个）
//a元素绑定事件mouseover
function prepareSideshow() {
    if (!($('#home')[0])) return false;
    var slideshow = '<div id="slideshow"><img id="frame" src="images/frame.gif" alt="" /><img id="preview" src="images/slideshow.gif" alt="a glimpse of what awaits you" /></div>'; 
    $('#intro').after(slideshow);
    //第二个a元素在第一个a元素的父元素的下一个元素的子元素
    $('header nav a:first').mouseover(function() {
        $('#preview').stop().animate({left: '0', top: '0'}, 150);        
    }).parent().next().children().mouseover(function() {
        $('#preview').stop().animate({left: '-150px', top: '0'}, 150);        
    }).parent().next().children().mouseover(function() {
        $('#preview').stop().animate({left: '-300px', top: '0'}, 150);        
    }).parent().next().children().mouseover(function() {
        $('#preview').stop().animate({left: '-450px', top: '0'}, 150);        
    }).parent().next().children().mouseover(function() {
        $('#preview').stop().animate({left: '-600px', top: '0'}, 150);        
    });
}

//about.html
//article a元素href属性#后字符串，如果section存在，隐藏当前section，绑定click事件
//click事件：隐藏其他，显示当前section
function prepareInternalnav() {
    if (!($('#about')[0])) return false;
    $('article nav a').each(function() {
        var id = $(this).attr('href').split('#')[1];
        if ($('#'+id).length) {
            $('#'+id).hide();
            $(this).click(function() {
                $('article section[id!='+id+']').hide();
                $('#'+id).show();
                return false; 
            })
        }
    })
}

//photos.html
//创建一个p元素，默认文本值为Choose an image.
//创建一个img图像占位符，默认src="images/placeholder.gif"
//将两个元素添加进article
//#imagegallery a元素绑定click事件
//click事件：p元素文本值、img占位符src值，分别设置为this的title值、href值
function preparePlaceholder() {
    if (!($('#photos')[0])) return false; 
    var $description = $('<p id="description">选择一张图像.</p>');
    var $placeholder = $('<img id="placeholder" src="images/placeholder.gif" alt="my image gallery" />');
    $('article').append($description).append($placeholder);
    $('#imagegallery a').each(function() {
        $(this).click(function() {
            $('#description').text(this.title);
            $('#placeholder').attr('src', this.href);
            return false;
        })
    })
}

//live.html
//table tr元素加类odd
//tr悬停加类highlight，离开移除
//创建abbreviation缩写词，包含h3和dl
//dl中的dt元素、dd元素，分别对应abbr元素的文本值、title值
function displayAbbreviations() {
    if (!($('#live')[0])) return false;
    $('table tr:odd').addClass('odd');
    $('table tr').mouseover(function() {
        $(this).addClass('highlight');
    }).mouseout(function() {
        $(this).removeClass('highlight');
    });
    var header = '<h3>缩写词</h3>';
    var dl = '<dl />';
    $('article').append(header).append(dl);
    $('abbr').each(function() {
        var dt = '<dt>' + $(this).text() + '</dt>';
        var dd = '<dd>' + this.title +'</dd>';
        $('article dl').append(dt).append(dd);
    })
}

//contact.html、submit.html
//请求发出后，article元素清空子元素，导入loading.gif图像，接收成功后清空载入submit.html中article元素
function prepareForms() {
    if (!($('#contact')[0])) return false;
    $('form').submit(function() {  
        $('article').empty().append('<img src="images/loading.gif" alt="Loading..." />');
        //chrome跨域请求不支持file://..
        $.get($(this).attr('action'), {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        }, function(data, textStatus) {
            $('article').empty().append(data.$('article'));
        }, 'html')  
        return false;  //拦截form action，留在当前页面
    })
}
