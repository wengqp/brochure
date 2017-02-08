addLoadEvent(highlightPage);
addLoadEvent(prepareSideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabel);
addLoadEvent(prepareForms);

//index.html
//遍及nav中的a元素，如果当前页面url中包含href属性值，则为当前a元素添加here类
//并且将a元素的文本值小写后赋予当前body的id属性，用于设置个性化背景图像
function highlightPage() {
    if (!document.getElementsByTagName || !document.getElementById) return false;
    var headers = document.getElementsByTagName('header');
    if (headers.length == 0) return false;
    var navs = document.getElementsByTagName('nav');
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName('a');
    var linkurl;
    for (var i=0; i<links.length; i++) {
        linkurl = links[i].getAttribute('href');
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = 'here';
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute('id', linktext);
        }
    }
}

//index.html
//在intro后创建一个div，包含一个图像框和一个移动图像（5个合成1个）
function prepareSideshow() {
    if (!document.getElementById || !document.getElementsByTagName || !document.getElementById('intro')) return false;
    var intro = document.getElementById('intro');
    var slideshow = document.createElement('div');
    slideshow.setAttribute('id', 'slideshow');
    var frame = document.createElement('img');
    frame.setAttribute('src', 'images/frame.gif');
    frame.setAttribute('alt', '');
    frame.setAttribute('id', 'frame');
    slideshow.appendChild(frame);
    var preview = document.createElement('img');
    preview.setAttribute('src', 'images/slideshow.gif');
    preview.setAttribute('alt', 'a glimpse of what awaits you');
    preview.setAttribute('id', 'preview');
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);
    var links = document.getElementsByTagName('a');
    var destination;
    for (var i=0; i<links.length; i++) {
        links[i].onmouseover = function() {
            destination = this.getAttribute('href');
            //图像5个部分分别对应导航条的5个链接
            if (destination.indexOf('index.html') != -1) {
                moveElement('preview', 0 , 0, 5);
            }
            if (destination.indexOf('about.html') != -1) {
                moveElement('preview', -150 , 0, 5);
            }
            if (destination.indexOf('photos.html') != -1) {
                moveElement('preview', -300 , 0, 5);
            }
            if (destination.indexOf('live.html') != -1) {
                moveElement('preview', -450 , 0, 5);
            }
            if (destination.indexOf('contact.html') != -1) {
                moveElement('preview', -600 , 0, 5);
            }
        }
    }
}

//about.html
//检查兼容
//每个a元素的href选出#后面的字符串，与section中id比较
//如果不一致，则继续，如果一致，默认相应section隐藏，a元素绑定onclick事件
function prepareInternalnav() {
    if (!document.getElementById || 
        !document.getElementsByTagName) return false;
    var articles = document.getElementsByTagName('article');
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName('a');
    for (var i=0; i<links.length; i++) {    
        var section_id = links[i].getAttribute('href').split('#')[1];  //array = string.split(character)
        if (!document.getElementById(section_id)) continue;
        document.getElementById(section_id).style.display = 'none';
        //不能用links[i].onclick = showSection(section_id)，这样直接执行了
        links[i].destination = section_id;
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }
}

//about.html
//通过section的id与参数id对比，来设置display
function showSection(id) {
    var sections = document.getElementsByTagName('section');
    for (var i=0; i<sections.length; i++) {
        if (sections[i].getAttribute('id') != id) {
            sections[i].style.display = 'none';
        } else {
            sections[i].style.display = 'block';
        }
    }
}

//photos.html
function showPic(whichpic) {
    if (!document.getElementById('placeholder')) return false;
    var source = whichpic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    if (placeholder.nodeName != 'IMG') return false;  //nodeName为大写
    placeholder.setAttribute('src', source); 
    if (document.getElementById('description')) {
        var text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : '';
        var description = document.getElementById('description');
        if (description.firstChild.nodeType == 3) {
            description.firstChild.nodeValue = text;              
        }
    }
    return true;
}

//photos.html
//占位符
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById('imagegallery')) return false;
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id', 'placeholder');
    placeholder.setAttribute('src', 'images/placeholder.gif');
    placeholder.setAttribute('alt', 'my image gallery');
    var description = document.createElement('p');
    description.setAttribute('id', 'description');
    var desctext = document.createTextNode('Choose an image.');
    description.appendChild(desctext);
    var gallery = document.getElementById('imagegallery');
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
}

//photos.html
//图片库gallery
//把有关操作关联到onlick事件上
function prepareGallery(){
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById('imagegallery')) return false;
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for (var i=0; i<links.length; i++) {
        links[i].onclick = function() {
            return !showPic(this);
        }
    }
}

//live.html
//stripe是带有条纹
//利用布尔值odd变量，遍历tr，给偶数tr加类'odd'
function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName('table');
    for (var i=0; i<tables.length; i++) {
        var odd = false;
        var rows = tables[0].getElementsByTagName('tr');
        for (var j=0; j<rows.length; j++) {
            if (odd == true) {
                addClass(rows[j], 'odd');
                odd = false
            } else {
                odd = true;
            }
        }
    }
}

//live.html
//利用给tr添加属性oldClassName存储className，悬停添加highlight类，离开恢复类名
function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName('tr');
    for (var i=0; i<rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this, 'highlight');
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }

    }
}

//live.html
//abbreviation缩写词
//步骤清晰：一找二加三检查
function displayAbbreviations() {
    //检查兼容
    if (!document.createElement || 
        !document.createTextNode || 
        !document.getElementsByTagName) return false;
    //获取缩略词
    var defs = new Array();
    var abbreviations = document.getElementsByTagName('abbr');
    if (abbreviations.length < 1) return false;
    for (var i=0; i<abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        //对不支持abbr的IE7以前版本的浏览器，采取平稳退化
        //不支持，abbr元素的子节点个数返回错误值--0
        if (current_abbr.childNodes.length < 1) return false;
        var definition = current_abbr.getAttribute('title');
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    //创建列表标签/标记
    var dlist = document.createElement('dl');
    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement('dt');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    //dl没有子节点，则退出
    if (dlist.childNodes.length < 1) return false;
    //创建标题
    var header = document.createElement('h3');
    var header_text = document.createTextNode('Abbreviations');
    header.appendChild(header_text);
    //添加到article
    var articles = document.getElementsByTagName('article');
    if (articles.length == 0) return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}

//contact.html
//单击一个label标签就会把焦点转移到关联的表单字段input
function focusLabel() {
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName('label');
    for (var i=0; i<labels.length; i++) {
        if (!labels[i].getAttribute('for')) continue;
        labels[i].onclick = function() {
            var id = labels[i].getAttribute('for');
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();  //获取焦点
        }
    }
}

//contact.html、submit.html
function prepareForms() {
    for (var i=0; i<document.forms.length; i++) {
        var thisform = document.forms[i];
        //resetFields(thisform);
        thisform.onsubmit = function() {
            //if (!validateForm(this)) return false;
            var article = document.getElementsByTagName('article')[0];
            if (submitFormWithAjax(this, article)) return false;
            return true;
        }
    }
}

//contact.html、submit.html
//参数：表单、目标元素
//导入加载图像、表单值URL编码后通过Ajax请求发送
function submitFormWithAjax(whichform, thetarget) {
    var request = getHTTPObject();
    if (!request) return false;
    displayAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for (var i=0; i<whichform.element.length; i++) {
        element = whichform.element[i];
        dataParts[i] = element.name + '=' + encodeURIComponent(element.value);  //URL编码
    }
    var data = dataParts.join('&');  //把编码后的表单'名=值'用&连起来
    request.open('post', whichform.getAttribute('action'), true);  //方式、地址、异步
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');  //添加application/x-www-form-urlencoded头部
    request.onreadystatechange = function() {
        //响应内容解析完成，可以在客户端调用了
        if (request.readyState == 4) {
            //200表示客户端请求已成功
            //如果状态是UNSENT或者OPENED，返回0（http://blog.csdn.net/iaiti/article/details/42192659）
            if (request.status == 200 || request.status == 0) {
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);  //匹配article元素
                if (matches.length > 0) {
                    //第一元素是与整个模式匹配的部分，包括<article></article>
                    //第二元素是捕获组（一对圆括号）中模式匹配的部分
                    thetarget.innerHTML = matches[1];
                } else {
                    thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
                }
            } else {
                thetarget.innerHTML = '<p>' + request.statusText + '</p>'
            }
        }
    };
    request.send(data);
    return true;
}

//contact.html、submit.html
//删除元素所有子节点，添加子元素loading.gif图像
function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content = document.createElement('img');
    content.setAttribute('src', 'images/loading.gif');
    content.setAttribute('alt', 'Loading...');
    element.appendChild(content);
}

//多个函数共用window.onload
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}


//在目标元素后插入新元素
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

//给元素节点添加类名className
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        var newClassName = element.className;
        newClassName += '';
        newClassName += value;
        element.className = newClassName;
    }
}

//移动元素：元素ID，left位置(单位默认设置为px)，top位置(px)，间隔毫秒时间
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById || !document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    //确保一个元素只执行一个setTimeout
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    //如果不存在，设置默认值0px
    if (!elem.style.left) {
        elem.style.left = '0px';
    }
    if (!elem.style.top) {
        elem.style.top = '0px';
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0
    if (xpos == final_x && ypos == final_y) return false;
    if (xpos < final_x) {
        //距离远就相对快，距离近就相对慢
        dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    } else {
        dist = Math.ceil((xpos - final_x)/10); 
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    } else {
        dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat, 10);
}


//创建httpObject
function getHTTPObject() {
    if (typeof XMLHttpRequest == 'undefined') {
        XMLHttpRequest = function () {
            try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); }
                catch (e) {}
            try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); }
                catch (e) {}
            try { return new ActiveXObject('Msxml2.XMLHTTP'); }
                catch (e) {}
            return false;
        }
    }
    return new XMLHttpRequest();
}