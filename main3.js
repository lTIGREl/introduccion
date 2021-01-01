// https://www.mathsisfun.com/main3.js https://www.mathsisfun.com/style3.css
//

var mainVersion = '0.786';
var theme = "dark";

//adOffReset() 
//adOffSet()
//adOffQ()
//var i;
// var d = document;

var menuVis = false;
var srchVis = false;

function absolute(base, relative) {
  var stack = base.split("/"),
    parts = relative.split("/");
  stack.pop(); // remove current file name (or empty string)
  // (omit if "base" is the current folder without trailing slash)
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] == ".") continue;
    if (parts[i] == "..") stack.pop();
    else stack.push(parts[i]);
  }
  return stack.join("/");
}

// flash interaction
function getLocation() {
  return window.location.toString();
}

// localization
var DecSep = (1.5).toLocaleString().charAt(1);
//DecSep = ",";
var ThouSep = String.fromCharCode(90 - DecSep.charCodeAt(0));
var DecType = "";
if (DecSep == ",") {
  DecType = "c";
}

function decfmt() {
  if (DecSep == ",") {
    // 0,00=>0#00 then 0.0=>0,0, then 0#0=>0.0
    fixSpells(document.body, "d");
    //document.body.innerHTML = document.body.innerHTML.replace(/(\d),(\d\d)/g, '$1#$2').replace(/(\d)\.(\d)/g, '$1,$2').replace(/(\d)#(\d)/g, '$1.$2');
    // images replace "." with "c."
    var imgs = document.body.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].getAttribute("hasdec") != null && imgs[i].getAttribute("hasdec") != "") {
        imgs[i].src = imgs[i].src.replace(/\.(gif|jpg|png)/g, "c.$1");
      }
    }
  }
}

function doSpell() {
  if (typeof (reSpell) == 'undefined') return;
  var userLang = window.navigator.userLanguage || window.navigator.language;
  switch (userLang.toLowerCase()) {
  case "en-us":
    break;
  case "en-au":
  case "en-ca":
  case "en-gb":
  case "en-ie":
  case "en-nz":
  case "en-za":
    fixSpells(document.body, "s");
    break;
  default:
  }

}

function doChina() {
  var userLang = window.navigator.userLanguage || window.navigator.language;
  //console.log("doChina", userLang);
  var transQ = false;
  var zhQ = false;
  switch (userLang.toLowerCase()) {
  case "zh-tw":
  case "zh-hk":
    break;
    //case "en-au": // NB !!!!!!!!!
  case "zh-sg":
  case "zh-cn":
    zhQ = true;
    break;
  default:
  }

  //	if (!zhQ) {
  //		// chinese may be in navigator.languages (chrome 32+, firefox 32+)
  //		if (window.navigator.languages) {
  //			//console.log("window.navigator.languages", window.navigator.languages);
  //			for (var i = 0; i < window.navigator.languages.length; i++) {
  //				var l = window.navigator.languages[i];
  //				//console.log("l=", l);
  //				if (l == "zh-cn") {
  //					zhQ = true;
  //				}
  //			}
  //		}
  //	}

  if (zhQ) {
    var path = location.pathname;
    path = path.split('/mathsisfun/').join('/'); // for local

    var dir = path.substring(0, path.lastIndexOf('/'));
    var file = path.substring(path.lastIndexOf('/') + 1);

    switch (dir) {
    case '':
    case '/activity':
    case '/algebra':
    case '/calculus':
      //case '/combinatorics':
    case '/data':
    case '/geometry':
    case '/measure':
    case '/money':
    case '/numbers':
    case '/physics':
    case '/sets':
      transQ = true;
      break;
      //	if (file < 'e') transQ = true;
      //	break;
    default:
    }

    //console.log("transQ", dir, file, transQ);
    if (transQ) {
      path = 'http://www.shuxuele.com' + path;
      //
      var newDiv = document.createElement("div");
      var tgtDiv = document.getElementById("content"); // add the newly created element and its content into the DOM
      document.body.insertBefore(newDiv, tgtDiv);
      var str = '<div style="position: absolute; right: 50%; margin-right: 260px; top:120px; font:45px Arial; background-color: rgba(255, 220, 0, 0.5);  border-radius:5px; border: 1px solid red; "><a href="' + path + '" style="color:red; text-decoration: none;">中文</a></div>'; // 中文版 "Chinese Version"
      newDiv.innerHTML = str;
    }
  }

  if (!transQ) {
    var path = location.pathname;
    path = path.split('/mathsisfun/').join('/'); // for local

    var dir = path.substring(0, path.lastIndexOf('/'));
    var file = path.substring(path.lastIndexOf('/') + 1);

    //console.log("dir,file", dir,file);
    var fbQ = false;
    //		switch (dir) {
    //			case '':
    //			case '/activity':
    //			case '/algebra':
    //			case '/calculus':
    //			case '/combinatorics':
    //			case '/data':
    //			case '/definitions':
    //			case '/geometry':
    //			case '/measure':
    //			case '/money':
    //			case '/numbers':
    //			case '/physics':
    //			case '/sets':
    //				fbQ = true;
    //				break;
    //			default:
    //		}

    //if (file == 'aboutmathsisfun.html') {
    //if (Math.random() < 0.01) { // only sometimes
    if (fbQ) {
      path = 'https://www.facebook.com/Mathisfun-249324325634773/';
      var newDiv = document.createElement("div");
      var tgtDiv = document.getElementById("content"); // add the newly created element and its content into the DOM
      document.body.insertBefore(newDiv, tgtDiv);
      var str = '<div style="position: absolute; right: 50%; margin-right: 260px; top:120px; "><a href="https://www.facebook.com/Mathisfun-249324325634773/" rel="nofollow"><img src="/images/style/facebook.svg"></a></div>';
      //console.log("facebook", str);
      newDiv.innerHTML = str;
    }
  }

}

function fixSpells(elem, tp) {
  // check if parameter is a an ELEMENT_NODE
  if (!(elem instanceof Node) || elem.nodeType !== Node.ELEMENT_NODE) return;
  var children = elem.childNodes;
  for (var i = 0; children[i]; ++i) {
    var node = children[i];
    switch (node.nodeType) {
    case Node.ELEMENT_NODE: // call recursively
      fixSpells(node, tp);
      break;
    case Node.TEXT_NODE: // fix spelling
      if (tp == "s") fixSpell(node);
      if (tp == "d") fixDec(node);
      break;
    }
  }
}

function fixSpell(node) {
  var s = node.nodeValue;
  if (s.length < 4) return; // leave quickly if small
  if (s.match(/(?=.*[a-zA-Z])/)) { // any chars inside at all?
    //s = "(" + s + ")"
    var sStt = s;
    for (var j = 0; j < reSpell.length; j++) {
      var s0 = reSpell[j][0];
      var s1 = reSpell[j][1];
      s = s.replace(new RegExp('\\b' + s0 + '\\b', 'g'), s1);
      s = s.replace(new RegExp('\\b' + proper(s0) + '\\b', 'g'), proper(s1));
    }
    if (s != sStt) node.nodeValue = s; // only update if changed
  }
}

function fixDec(node) {
  var s = node.nodeValue;
  var sStt = s;
  s = s.replace(/(\d),(\d\d)/g, '$1#$2').replace(/(\d)\.(\d)/g, '$1,$2').replace(/(\d)#(\d)/g, '$1.$2');
  //if (s.match(/(?=.*[a-zA-Z])/)) { // any chars inside at all?
  if (s != sStt) {
    //console.log("fixDec",sStt,"=>",s);
    node.nodeValue = s; // only update if changed
  }
  //}
}

function doLocal() {
  decfmt();
  // doSpell();
  getRelated();
  // doChina();

  // top clickable link
  //document.getElementById('header').addEventListener('click', function ( e ) {
  //	if (e.target.id == "header") {
  //		location.href = 'https://www.mathsisfun.com/index.htm';
  //	}
  //}, false);

}

window.onload = doLocal;

function proper(s) {
  return s.charAt(0).toUpperCase() + s.substring(1, s.length).toLowerCase();
}

function tellAFriend() {
  var msg = "\nI found '" + document.title + "' here: " + location.href + "\n";
  window.location = "mailto:?subject=" + encodeURIComponent(document.title) + "&body=" + encodeURIComponent(msg);
}

function addFavorites() {
  if (window.sidebar) { // Mozilla Firefox Bookmark
    window.sidebar.addPanel(document.title, location.href, "");
  } else if (window.external) { // IE Favorite
    window.external.AddFavorite(location.href, document.title);
  }
}

function openEnglish() {
  if (typeof tranfrom == 'undefined') tranfrom = 'index.htm';
  var path = tranfrom; // only relative path to avoid spoofing
  var url = "https://www.mathsisfun.com/" + path;
  window.location = url;
}

function linkToUs() {
  var path = location.pathname + location.search; // only relative path to avoid spoofing
  var title = document.title;
  //var urlStt = urlSttGet() // to cope with pages at root or one level down
  postWith("https://" + document.domain + "/link-to-us.php", {
    path: path,
    title: title
  });
}

function Citation() {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var path = location.pathname + location.search; // only relative path to avoid spoofing
  var atitle = document.title;
  var md = new Date(document.lastModified);
  var mDate = md.getDate() + " " + months[md.getMonth()] + " " + md.getFullYear();
  if (typeof Author == 'undefined') Author = 'Pierce, Rod';
  //postWith("http://localhost:81/mathsisfun/citation.php",{path:path,title:atitle,moddate:mDate,author:Author});
  postWith(urlSttGet() + "citation.php", {
    path: path,
    title: atitle,
    moddate: mDate,
    author: Author
  });
}

function Contribute() {
  var path = location.pathname + location.search; // only relative path to avoid spoofing
  var atitle = document.title;
  postWith("https://" + document.domain + "/contribute.php", {
    path: path,
    title: atitle
  });
}

function postWith(to, p) {
  // from http://mentaljetsam.wordpress.com
  var myForm = document.createElement("form");
  myForm.method = "post";
  myForm.action = to;
  for (var k in p) {
    var myInput = document.createElement("input");
    myInput.setAttribute("name", k);
    myInput.setAttribute("value", p[k]);
    myForm.appendChild(myInput);
  }
  document.body.appendChild(myForm);
  myForm.submit();
  document.body.removeChild(myForm);
}

function URLEncode(text) {
  // The Javascript escape and unescape functions do not correspond with what browsers actually do...
  var SAFECHARS = "0123456789" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "-_.!~*'()"; // numeric,alpha, and RFC2396 Mark characters
  var HEX = "0123456789ABCDEF";

  var s = "";
  for (var i = 0; i < text.length; i++) {
    var ch = text.charAt(i);
    if (ch == " ") {
      s += "+"; // x-www-urlencoded, rather than %20
    } else if (SAFECHARS.indexOf(ch) != -1) {
      s += ch;
    } else {
      var charCode = ch.charCodeAt(0);
      if (charCode > 255) { // Unicode cannot be encoded using standard URL encoding
        s += "+";
      } else {
        s += "%";
        s += HEX.charAt((charCode >> 4) & 0xF);
        s += HEX.charAt(charCode & 0xF);
      }
    }
  }

  return s;
}

function CopyToClipboard(txtArea) {
  txtArea.focus();
  txtArea.select();
  var copiedTxt = document.selection.createRange();
  copiedTxt.execCommand("Copy");
}

/* Flash */

function getFlash6HTML(w, h, fn, querystring, clr) {
  // w=width, h=height, fn=filename(minus '.swf'), querystring=..., clr=bg color
  if (!querystring) {
    querystring = "";
  } else {
    querystring = "?" + querystring;
  }

  if (!clr) {
    clr = "#d6d9e6";
  } // default background color

  if (fn.substring(fn.lastIndexOf('.swf')) != '.swf') fn = fn + '.swf'; // append .swf if absent

  var s = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http:\/\/download.macromedia.com\/pub\/shockwave\/cabs\/flash\/swflash.cab#version=6,0,79,0" width="' + w + '" height="' + h + '" id="' + fn + '">\n';
  s += '<param name="movie" value="' + fn + querystring + '"\/> ';
  s += '<param name="quality" value="high"\/> ';
  s += '<param name="bgcolor" value="' + clr + '"\/> ';
  s += '<param name="menu" value="false"\/> ';
  s += '<param name="allowScriptAccess" value="sameDomain"\/> '; //        always
  s += '<param name="allowFullScreen" value="true"\/> ';
  s += '<embed src="' + fn + querystring + '" quality="high" bgcolor="' + clr + '" ';
  s += 'menu="false" width="' + w + '" height="' + h + '" type="application\/x-shockwave-flash" ';
  s += 'pluginspage="http:\/\/www.macromedia.com\/go\/getflashplayer" ';
  s += 'swLiveConnect="true" allowscriptaccess="sameDomain" allowFullScreen="true" id="' + fn + '" name="' + fn + '"><noembed><\/noembed><\/embed>\n'; //       always
  s += '</object>\n';

  //if (location.href.indexOf("localhost:81/mathsisfun") > 0) s += "<br>" + fn + "<br>";

  return (s);
}

function putFlash6(w, h, fn, querystring, clr, noflash) {
  var s = getFlash6HTML(w, h, fn, querystring, clr);
  //console.log("putFlash6: " + s);
  document.write(s);
  if (hasFlash()) {

  } else {
    var s = "";
    if (noflash) {
      s = noflash;
    } else {
      s = '<a href="/flash-player.html"><img src="/images/style/no-flash.jpg" alt="Needs Flash Player"></a>';
    }
    document.write(s);

    if (Math.random() < 0.1) {
      // log that flash not available
      var path = location.pathname;
      var pg = path + ", " + fn;
      var pgHex = toHex(pg);

      addView(pgHex, "View", window.location.hostname);
    }
  }
}

function toHex(s) {
  var hex = '';
  for (var i = 0; i < s.length; i++) {
		var cc = s.charCodeAt(i).toString(16);
		if (cc.length<2) cc = '0' +cc;
    hex += '' + cc;
  }
  return hex;
}

function hasFlash2() {
  try {
    var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    if (fo) return true;
  } catch (e) {
    if (navigator.mimeTypes &&
      navigator.mimeTypes["application/x-shockwave-flash"] &&
      navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) return true;
  }
  return false;
}

function hasFlash() {
  var isPPAPI = false;

  try {
    var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    if (fo) return true;
  } catch (e) {
    var type = 'application/x-shockwave-flash';
    var mimeTypes = navigator.mimeTypes;

    var endsWith = function (str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin &&
      (mimeTypes[type].enabledPlugin.filename == "pepflashplayer.dll" ||
        mimeTypes[type].enabledPlugin.filename == "libpepflashplayer.so" ||
        endsWith(mimeTypes[type].enabledPlugin.filename, "Chrome.plugin"))) isPPAPI = true;

    console.log("PPAPI enabled: " + isPPAPI);
  }

  return isPPAPI;
}

function FlashPHP(w, h, pathtoswf, clr) {
  var path = location.pathname;
  path = URLEncode(path.substring(0, path.lastIndexOf('/')));
  var atitle = URLEncode(document.title);
  var url = "https://" + document.domain + "/flash.php?path=" + path + "/" + pathtoswf + "&w=" + w + "&h=" + h + "&col=" + URLEncode(clr) + "&title=" + atitle;
  window.location = url;
}

/* ads */

function sethideadscookie(val) {
  var date = new Date();
  if (val == 1)
    date.setTime(date.getTime() + (1 * 36 * 60 * 60 * 1000)); // 36 hrs
  else
    date.setTime(date.getTime() - (30 * 24 * 60 * 60 * 1000)); // already expired
  document.cookie = "math_hideads=" + val.toString() + "; expires=" + date.toGMTString() + "; path=/";
}

function adOffQ() {
  var item = localStorage.getItem("adoff")
  if (item === null) return false

  var object = JSON.parse(item)
  var dateString = object.when;
  var until = new Date(dateString)
  // was.setTime(was.getTime() + (1 * 36 * 60 * 60 * 1000));
  until.setTime(until.getTime() + (1 * 60 * 1000)); // 1 minute
  var now = new Date()

  // console.log('adOffQ', until, now, until > now)

  return (until > now)
  // new Date ('1/1/1999 ' + '10:20:45') > new Date ('1/1/1999 ' + '5:10:10') 

  //compareTime(dateString, now); //to implement
}

function adOffSet() {

  var object = { value: false, when: new Date() }
  localStorage.setItem("adoff", JSON.stringify(object));
}

function adOffReset() {
  var object = { value: false, when: 0 }
  localStorage.setItem("adoff", JSON.stringify(object));
}

//var adIDs = [['adTop', 1, 0], ['adend', 1, 0], ['hideAds1', 1, 0], ['showAds1', 0, 1]];
var adIDs = [{ id: 'adTop', withAdsQ: true }, { id: 'adend', withAdsQ: true }, { id: 'hideAds1', withAdsQ: true }, { id: 'showAds1', withAdsQ: false }];

function setAds(onQ) {
  //var styles = ['none', 'inline'];
  for (var i = 0; i < adIDs.length; i++) {
    var ad = adIDs[i];
    var div = document.getElementById(ad.id); 
    if (div) {
      var showQ = ad.withAdsQ
      if (!onQ) showQ = !showQ
      if (showQ) {
        div.style.display = 'inline';
      } else {
        div.style.display = 'none';
      }
      //console.log('setAds', ad, div, showQ)
    }
  }

}

function hideAds() {
  adOffSet()
  setAds(false)

  // if (confirm("This will set a Cookie so we can remember not to show ads on each page. It lasts for about a day. Do you agree?")) {
  //   sethideadscookie(1);
  //   setAds(false);
  // } else {
  //   sethideadscookie(0); // deletes cookie
  // }
}

function showAds() {
  //sethideadscookie(0);
  adOffReset()
  setAds(true)
}
// do hide ads based on cookie
function cookieHideAds() {
  if (adOffQ()) {
    setAds(false);
  }
  // var ca = document.cookie.split(';');
  // for (var i = 0; i < ca.length; i++) {
  //   var c = ca[i];
  //   var pair = c.split('=');
  //   var key = pair[0];
  //   var value = pair[1];
  //   key = key.replace(/ /, '');
  //   if (key == 'math_hideads') {
  //     console.log("cookieHideAds");
  //     setAds(false);
  //   }
  // }
}

function printImg(s) {
  var pwin = window.open(s, "_blank");
  setTimeout("pwin.print()", 2000);
}

/* Question Database */
function doQ(id, qs) {
  var fromPath = location.pathname + location.search; // only relative path to avoid spoofing
  var title = document.title;
  //var url = "http://www.mathopolis.com/questions/q.php?id=" + parseInt(id)
  var url = "http://www.mathopolis.com/questions/q.html?id=" + parseInt(id) + '&t=mif';
  if (typeof qs == 'undefined') {
    url += "&qs=0";
  } else {
    url += "&qs=" + qs;
  }
  url += "&site=1" + "&ref=" + toHex(fromPath) + "&title=" + toHex(title)
  window.open(url, "mathopolis");
}

function getQ() {
  var qs = "";
  for (var i = 0; i < arguments.length; i++) {
    if (i > 0) qs += "_";
    qs += arguments[i];
  }
  var s = "";
  for (i = 0; i < arguments.length; i++) {
    s += '<a href="javascript:doQ(' + arguments[i] + ",'" + qs + "'" + ')">Question&nbsp;' + (i + 1) + '</a> ';
  }
  document.write(s);
}

function urlSttGet() {
  var stack = location.href.split("/");
  stack.pop(); // remove current file name (or empty string)
  var url = stack.join("/"); // remove filename

  var urlStt = "../"; // most urls are down one folder
  if (endsWith(url, "/dlm")) urlStt = "/dlm/"; // for urls at root
  if (endsWith(url, "disfrutalasmatematicas.com")) urlStt = "";
  //console.log('url',endsWith(url, "/dlm"),url,urlStt)
  return urlStt
}

function getMenu(typ) {
  // cope with urls at root or down one folder  NB: what about URLs down two folders?

  var urlStt = urlSttGet() // to cope with pages at root or one level down


  var links = [["index.html", "Inicio", 0], 
    ["algebra/index.html", "Álgebra", 0], ["calculo/index.html", "Cálculo", 1], ["datos/index.html", "Datos", 0],
    ["geometria/index.html", "Geometría", 0], ["medida/index.html", "Medida", 0], ["dinero/index.html", "Dinero", 1], 
    ["numeros/index.html", "Números", 0], 
    //["fisica/index.html", "Física", 1],
    //["activity/index.html", "Actividades", 1], 
    ["definiciones/index.html", "Diccionario", 0], 
    ["juegos/index.html", "Juegos", 0],
		["puzzles/index.html", "Puzzles", 0],
		["ejercicios/index.php", "Ejercicios", 0]];

  var s = '';

  var linkLen = links.length;
  var i;
  if (typ == 0) {
    s += '<ul role="list">';
    for (i = 0; i < linkLen; i++) {
      if (links[i][2] == 0) {
        s += '<li role="listitem" tabindex="0"><a href="' + urlStt + links[i][0] + '">' + links[i][1] + '</a></li>';
        s += '\n';
      }
    }
    s += '</ul>';
  }
  if (typ == 1) {
    s += '<ul role="list">';
    s += '<li><a role="listitem" href="' + urlStt + links[0][0] + '">' + links[0][1] + '</a></li>';
    s += '<li><a role="listitem" href="#">Sujetos &#x25BC;</a>';
    s += '<ul>';
    for (i = 1; i <= 8; i++) {
      s += '<li><a role="listitem" href="' + urlStt + links[i][0] + '">' + links[i][1] + '</a></li>';
    }
    s += '</ul>';
    s += '</li>';

    s += '<li><a role="listitem" href="#">Más &#x25BC;</a>';
    s += '<ul role="list">';
    for (i = 9; i < links.length; i++) {
      s += '<li><a role="listitem" href="' + urlStt + links[i][0] + '">' + links[i][1] + '</a></li>';
    }
    s += '</ul>';
    s += '</li>';
    s += '</ul>';
  }
  if (typ == 2) {
    s += '&nbsp;';
    s += '<a href="javascript:showMenu()" style="text-decoration: none;" aria-label="Show Menu">';
    // s += '<a href="javascript:showMenu()" style="width: 48px; height: 48px;font: 36px Arial; background-color: rgba(255, 255, 255, 0.8); text-decoration: none; vertical-align: 30%; ">';
    // s += '<span style="border-top:-55px;  ">&#9776;</span>'; // hamburger menu symbol
    s += '<img src="' + urlStt + 'images/style/menu.svg" alt="Menu" />';
    s += '</a>';
    s += ' ';

    s += '<a href="javascript:showSrch()" style="text-decoration: none;" aria-label="Show Search">';
    // s += '<div id="showSearch" style="display: inline-block;" ></div>';
    s += '<img src="' + urlStt + 'images/style/search.svg" alt="Search" />';
    s += '</a>';
    //s += '</div>';
    //background: url(../images/style/search.gif) no-repeat;

  }

  // alert(s);

  return s;
}

function showMenu() {
  console.log("showMenu", menuVis);
  var div = document.getElementById('menuSlim');
  if (menuVis) {
    div.style.display = 'none';
  } else {
    div.style.display = 'block';
    if (srchVis) showSrch(); // turn off
  }
  menuVis = !menuVis;
}

function showSrch() {
  console.log("showSrch", srchVis);
  var div = document.getElementById('search');
  if (srchVis) {
    div.style.display = 'none';
  } else {
    div.style.display = 'block';
    if (menuVis) showMenu(); // turn off
  }
  srchVis = !srchVis;
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function getSearch() {
  var s = "";
  s += '<form action="'+urlSttGet()+'search/search.html" method="get">';
  s += '<input type="text" name="query" value="" placeholder="Buscar" id="searchFld" aria-label="Search" />';
  s += '<input type="submit" name="submit" value="" id="searchBtn" aria-label="Search Button" />';
  s += '<input type="hidden" name="search" value="1" />';
  s += '</form>';

  return s;
}

function getAdRight() {
  var s = "";
  s += '<div style="margin-left: -425px; width:300px;">';
  s += getLinks(true);
  s += '</div>';
  return s;
}

function getAdRight2() {
	return ''
  var s = '';
  //s += '<div style="border: 4px solid green; width: 360px;"></div>';
  s += getLinks(false);
  if (true) {
    s += '<div id="google_translate_element" style="border: none; display:inline; float:left; "></div>';
    s += '<script type="text/javascript">';
    s += '	function googleTranslateElementInit() {';
    s += "new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');";
    s += '}';
    s += '</script>';
    if (true) {
      s += '	<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>';
    } else {
      console.log('async translate')
      s += 'var googleTranslateScript = document.createElement("script");'
      s += 'googleTranslateScript.type = "text/javascript";'
      s += 'googleTranslateScript.async = true;'
      s += 'googleTranslateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";'
      s += '( document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0] ).appendChild(googleTranslateScript);'
    }
  }
  //s += '</div>';
  return s;
}

function getGPlus() {
  // needed, because in templates up to 27 Feb 2019
  var s = '';
  // var url = location.href; //  safe?
  // s += '<div style="border: none; display:inline; margin: 0px; ">';
  // s += '<span class="g-plusone" data-size="standard" data-href="' + url + '"></span>';
  // s += '</div>';
  return s;
}

function getTrans() {
  return ''
  var s = '';
  //var url = location.href; //  safe?
  s += '<div id="google_translate_element"></div>';
  s += '<script type="text/javascript">';
  s += '	function googleTranslateElementInit() {';
  s += "new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');";
  s += '}';
  if (false) {
    s += '</script>';
    s += '	<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>';
  } else {
    console.log('async translate2')
    s += 'var googleTranslateScript = document.createElement("script");'
    s += 'googleTranslateScript.type = "text/javascript";'
    s += 'googleTranslateScript.async = true;'
    s += 'googleTranslateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";'
    s += '( document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0] ).appendChild(googleTranslateScript);'
    s += '</script>';
  }
  return s;
}

function cookieMsg() {
  var s = ''
  s += '<div id="cookieok" style="position:absolute; right:5px; top:5px; border-radius:10px; background-color:#def; padding:3px 8px; font: 14px Arial;">'

  //s += '<div style="border-radius:10px; background-color:#def; padding:3px 8px; font: 14px Arial;"> '

  var dom = document.domain
  if (dom == 'localhost') dom = 'localhost/mathsisfun'
  s += 'We may use <a href="http://' + dom + '/about-ads.html">Cookies</a> '

  s += '<div style="display:inline-block; border-radius:10px; background-color:#abf; padding:3px 8px; cursor: pointer;" onclick="cookieok()">OK</div>'
  //  s += '</div>'

  s += '</div>'
  return s
}

function themeGet() {
  return localStorage.getItem('theme')
}

function themeSet(s) {
  localStorage.setItem('theme', s)
}

function cookieok() {
  console.log('cookieok')
  document.getElementById('cookieok').style.display = "none"
  localStorage.setItem('cookie', 'ok')
}

function getAdTop() {
	return ''
  var path = location.pathname;
  path = path.split('/mathsisfun/').join('/'); // for local

  var dir = path.substring(0, path.lastIndexOf('/'));
  var file = path.substring(path.lastIndexOf('/') + 1);
  //console.log('getAdTop', dir, file)

  var s = ''

  if (localStorage.getItem('cookie') == 'ok') {} else {
    s += cookieMsg()
  }

  var src = ''
  //if (dir == '/puzzles') src = 'pixfuture'
  //if (dir == '/puzzles') src = 'pixfuture1'
  // if (dir == '/physics') src = 'adman'
  // if (dir == '/calculus') src = 'adman'

  s += getAdCode(src)
  //console.log('getAdTop=' + s)
  return s;

}

function getAdEnd() {
  var path = location.pathname;
  path = path.split('/mathsisfun/').join('/'); // for local

  var dir = path.substring(0, path.lastIndexOf('/'));
  var file = path.substring(path.lastIndexOf('/') + 1);
  //console.log('getAdEnd', dir, file)

  var src = ''
  //if (dir == '/puzzles') src = 'pixfuture2'
  //if (dir == '/data') src = 'dummy'

  src = 'adsense'

  //if (Math.random()<0.1) {
  //if (file=='casey-runner.html') {
  //    src = 'mathtutor'
  //}
  //src = '300x250'

  var s = getAdCode(src)
  //console.log('getAdEnd=' + s)
  return s;
}

function getAdCode(src) {
  var s = ''

  var mobQ = (window.innerWidth < 700)
  //console.log('mobQ', mobQ)

  switch (src) {

  case 'media':
    s += '<script type="text/javascript">'
    s += ' window._mNHandle = window._mNHandle || {};'
    s += ' window._mNHandle.queue = window._mNHandle.queue || [];'
    s += ' medianet_versionId = "3121199";'
    s += ' </script>'
    s += ' <script src="//contextual.media.net/dmedianet.js?cid=8CU6C33V2" async="async"></script>'

    var szNum = 0
    if (window.innerWidth < 700) {
      szNum = 1
      if (window.innerWidth < 470) {
        szNum = 2
      }
    }
    var szs = [{ sz: '728x90', ht: 90, id: '496278264' }, { sz: '468x60', ht: 60, id: '322386457' }, { sz: '320x90', ht: 90, id: '385483814' }]
    var sz = szs[szNum]

    s += ' <div id="' + sz.id + '" style="height:' + sz.ht + 'px;">'
    s += ' <script type="text/javascript">'
    s += ' try {'
    s += ' window._mNHandle.queue.push(function () {'
    s += ' window._mNDetails.loadTag("' + sz.id + '", "' + sz.sz + '", "' + sz.id + '");'
    s += ' });'
    s += ' }'
    s += ' catch (error) {'
    s += ' }'
    s += ' </script>'
    s += ' </div>'

    break

  case '300x250':
    s += '<img src="../images/style/300x250.jpg">'
    break

  case 'mathtutor':
    s += ' <div style="height:110px;">'
    s += '<a href="http://www.mathtutor.com/index-ad.html"><img src="/images/ad-mathtutor.gif"></a>'
    s += ' </div>'
    break

  case 'dummy': // 540635834_1 is account number plus "_1" SLOT ID !
    //s += '<img src="../images/style/728x90.jpg">'
    s += '<img src="../images/style/320x60.jpg">'
    break

  case 'adman':
    //s += '<img src="../images/style/728x90.jpg">'
    // head
    s += ' <script async="async" src="https://www.googletagservices.com/tag/js/gpt.js"></script>'
    s += '\n'
    s += ' <script>'
    s += ' var googletag = googletag || {};'
    s += ' googletag.cmd = googletag.cmd || [];'
    s += ' </script>'

    s += '\n'
    s += ' <script>'
    s += ' googletag.cmd.push(function() {'
    s += ' googletag.defineSlot("/21621894/top728x90", [[120, 60], [320, 50], [234, 60], [468, 60], [120, 90], [728, 90]], "div-gpt-ad-1551592987345-0").addService(googletag.pubads());'
    s += ' googletag.pubads().enableSingleRequest();'
    s += ' googletag.enableServices();'
    s += ' });'
    s += ' </script>'

    // ad unit
    s += '\n'
    s += ' <!-- /21621894/top728x90 -->'
    s += ' <div id="div-gpt-ad-1551592987345-0">'
    s += '\n'
    s += ' <script>'
    s += ' googletag.cmd.push(function() { googletag.display("div-gpt-ad-1551592987345-0"); });'
    s += ' </script>'
    s += ' </div>'

    break

  case 'pixfuture1': // 540635834_1 is account number plus "_1" SLOT ID !
    var id = (mobQ) ? "540635834" : "540635829"
    s += '<div id="' + id + '_1" style="width:320px;height:60px;margin:0;padding:0"></div>'
    s += ' <script type="text/javascript">'
    s += ' var OX_ads = OX_ads || [];'
    s += ' OX_ads.push({'
    s += ' slot_id: "' + id + '_1",'
    s += ' auid: "' + id + '"'
    s += ' });'
    s += ' </script>'
    s += ' <script type="text/javascript" src="https://pixfuture-d.openx.net/w/1.0/jstag"></script>'
    break

  case 'pixfuture2':
    var id = (mobQ) ? "540635834" : "540635829"
    s += '<div id="' + id + '_2" style="width:320px;height:60px;margin:0;padding:0"></div>'
    s += ' <script type="text/javascript">'
    s += ' var OX_ads = OX_ads || [];'
    s += ' OX_ads.push({'
    s += ' slot_id: "' + id + '_2",'
    s += ' auid: "' + id + '"'
    s += ' });'
    s += ' </script>'
    s += ' <script type="text/javascript" src="https://pixfuture-d.openx.net/w/1.0/jstag"></script>'
    break

  case 'chitika': // VERY SLOW (10s vs typical 1 to 2s) but maybe async
    s += '<script type="text/javascript">'
    s += ' ( function() {'
    s += ' if (window.CHITIKA === undefined) { window.CHITIKA = { "units" : [] }; };'
    s += ' var unit = {"calltype":"async[2]","publisher":"mathsisfun","width":320,"height":50,"sid":"Chitika Default"};'
    s += ' var placement_id = window.CHITIKA.units.length;'
    s += ' window.CHITIKA.units.push(unit);'
    s += " document.write('<div id=" + '"' + "chitikaAdBlock-' + placement_id + '" + '"' + "></div>');"
    s += ' }());'
    s += ' </script>'
    s += ' <script type="text/javascript" src="//cdn.chitika.net/getads.js" async></script>';
    break

  case 'patreon': // nothing, over 12 hours
    s += '<a href="https://www.patreon.com/mathisfun">Support Math is Fun on Patreon</a>'
    break

  case 'kofi':
    s += '<a href="https://ko-fi.com/mathisfun">Buy a Coffee for Math is Fun</a>'
    break

  case 'infolinks':
    s += '<script> var infolinks_pid = 3166388; var infolinks_wsid = 0; </script> <script src="//resources.infolinks.com/js/infolinks_main.js"></script><input type="hidden" name="IL_IN_ARTICLE">'
    break

  case 'media':
    //s += 'YAY media'
    break

  case 'adsenseold':
    s += '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
    s += '<!-- MIFTop -->';
    s += '<ins class="adsbygoogle"';
    s += '     style="display:block"';
    s += '     data-ad-client="ca-pub-1389989178296449"';
    s += '     data-ad-slot="6226552230"';
    s += '     data-ad-format="auto"></ins>';
    s += '<script>';
    s += '(adsbygoogle = window.adsbygoogle || []).push({});';
    s += '</script>';
    break

  case 'adsense':
    s += '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
    s += '<!-- mif1905 -->';
    s += '<ins class="adsbygoogle"';
    s += '     style="display:block"';
    s += '     data-ad-client="ca-pub-1389989178296449"';
    s += '     data-ad-slot="2009442555"';
    s += '     data-ad-format="auto"';
    s += '     data-full-width-responsive="true"></ins>';
    s += '<script>';
    s += '(adsbygoogle = window.adsbygoogle || []).push({});';
    s += '</script>';
    break

  default:
  }
  //console.log('getAdCode='+s)
  return s;
}

function getSocial() {
  if (true) return '';

  var url = location.href; //  safe?
  var title = encodeURIComponent(document.title);
  var s = '';

  s += '<ul class="share-buttons">';
  s += '<li><a href="https://www.facebook.com/sharer/sharer.php?u=' + url + '&t=' + title + '" title="Share on Facebook" target="_blank"><img src="/mathsisfun/images/style/Facebook.png"></a></li>';
  s += '<li><a href="https://twitter.com/intent/tweet?source=' + url + '&text=' + title + ':%20' + url + '" target="_blank" title="Tweet"><img src="/mathsisfun/images/style/Twitter.png"></a></li>';
  s += '<li><a href="http://pinterest.com/pin/create/button/?url=' + url + '&description=' + title + '" target="_blank" title="Pin it"><img src="/mathsisfun/images/style/Pinterest.png"></a></li>';
  s += '</ul>';

  return s;
}

function getLinks() {
  //var ffq = false;
  //if (navigator.userAgent.indexOf("Firefox")!=-1) ffq = true;
  //var url    = encodeURIComponent(location.href);
  var url = location.href; //  safe?
  var urlenc = encodeURIComponent(location.href);
  var title = encodeURIComponent(document.title);
  var linkstt = '<a target="_blank" rel="nofollow" href="';

  var s = '';
  s += '<a href="javascript:linkToUs()" id="linkus" title="Link To Us">Link To Us</a>';
  s += linkstt + "https://www.facebook.com/sharer/sharer.php?u=" + url + "&t=" + title + '" title="Share on Facebook" id="linkfb">Facebook</a> ';
  s += linkstt + 'https://twitter.com/intent/tweet?source=' + url + '&text=' + title + ':%20' + url + '" title="Tweet it" id="linktw">Twitter</a> ';
  s += linkstt + 'http://pinterest.com/pin/create/button/?url=' + url + '&description=' + title + '" title="Pin it" id="linkpi">Pinterest</a>';
  //s += linkstt + "http://www.stumbleupon.com/submit?url=" + url + "&title=" + title.replace(/%20/g, '+') + '" id="linksu">StumbleUpon</a> ';
  s += linkstt + 'https://www.linkedin.com/shareArticle?mini=true&url=' + urlenc + '&summary=' + title + '&source=mathsisfun.com" title="LinkedIn" id="linkli">LinkedIn</a>';
  // https://www.linkedin.com/shareArticle?mini=true&url=http://developer.linkedin.com&title=LinkedIn%20Developer%20Network&summary=My%20favorite%20developer%20program&source=LinkedIn

  s += '<a href="javascript:tellAFriend()" id="linkem" title="eMail">eMail a Friend</a>';
  return s;
}

function getFooter() {
  var s = '';
  //s += '<div id="footer" class="centerfull noprint">';
  //s += '<div class="footFriend"><a href="javascript:tellAFriend();"></a></div>';
  //s += '<div class="footFave"><a href="javascript:addFavorites();"></a></div>';
  //s += '<div class="footLink"><a href="javascript:linkToUs();"></a></div>';
  //s += '</div>';

  var urlStt = urlSttGet() // to cope with pages at root or one level down

  var sep = ' &cir; '

  s += '<div id="footMenu">';
  s += '<a href="'+urlStt+'search/search.html">Buscar</a>' + sep 
  //s += '<a href="'+urlStt+'links/index.html">Índice</a>' + sep 
  s += '<a href="'+urlStt+'aboutus.html">Sobre</a>' + sep 
  s += '<a href="'+urlStt+'contact.php">Contáctanos</a>' + sep 
  s += '<a href="javascript:Citation()">Cita&nbsp;esta&nbsp;Página</a>' + sep 
  s += '<b><a href="'+urlStt+'privacy.html">Privacidad</a></b>';
  s += '</div>';

  // <a href="javascript:Contribute()">Contribute</a>

  return s;
}

function themeSet(theme) {
  //document.body.setAttribute('data-theme', 'dark')
return

  var props = [];

  theme = 'light' // NB 

  switch (theme) {
  case 'light':
    props = [
    //['--h1Shadow', '1px 4px 6px #def, 0 0 0 #cde'],
    //['--hdrImg', 'url(images/hdr/hdr-main-lite.svg)'],
    //['--hdrAdvImg', 'url(images/hdr/hdr-adv.svg)'],
  ]

    break
  case 'dark':
    props = [
      ['--txtClr', 'hsl(0, 0%, 90%)'],
      ['--bgClr', 'hsl(0, 0%, 10%)'],
      ['--bg', 'linear-gradient(to right, hsla(214, 100%, 8%, 100%) 0%, hsla(214, 100%, 8%, 100%) 20%, hsla(214, 100%, 8%, 100%) 50%, hsla(214, 100%, 8%, 100%) 80%, hsla(214, 100%, 8%, 100%) 100%)'],


      ['--a0Clr', 'hsla(50, 100%, 96%, 50%)'], /* transparent yellow */
      ['--a1Clr', 'hsl(0, 0%, 9%)'], /*  */
      ['--a2Clr', 'hsl(45, 100%, 27%)'], /* sand */
      ['--a3Clr', 'hsl(50, 100%, 85%)'], /* light yellow  */
      ['--a4Clr', 'hsl(50, 100%, 96%)'], /* v light yellow */

      ['--b0Clr', 'hsla(214, 100%, 50%, 15%)'], /* transparent blue */
      ['--b1Clr', 'hsl(214, 100%, 20%)'], /* dark blue (text) */
      ['--b2Clr', 'hsl(214, 65%, 46%)'], /* pretty blue (text) */
      ['--b3Clr', 'hsl(214, 100%, 84%)'], /* light blue */
      ['--b4Clr', 'hsl(214, 100%, 94%)'], /* v light blue */

      ['--o1Clr', 'hsl(44, 100%, 50%)'], /* orange (text) */
      ['--r1Clr', 'hsl(0, 100%, 60%)'], /* red (text) */

      ['--hdrImg', 'url(images/hdr/hdr-main-dark.svg)'],
      ['--hdrAdvImg', 'url(images/hdr/hdr-adv-dark.svg)'],
      ['--h1Shadow', '0px 0px 0 hsl(214, 100%, 25%)'],

      ]
    break
  default:
  }
  var root = document.documentElement;
  for (var i = 0; i < props.length; i++) {
    var prop = props[i]
    root.style.setProperty(prop[0], prop[1]);
  }

}

function getBodyEnd() {

  themeSet('light')

  cookieHideAds();
  //    doPic();

  var s = "";
  s += gAnalyticsCall();

  return s;
}

function gAnalyticsCall() {
  var s = "";
  // <!-- Global site tag (gtag.js) - Google Analytics -->
  s += '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-164262884-1"></script>'
  s += '<script>'
  s += 'window.dataLayer = window.dataLayer || []; '
  s += 'function gtag(){dataLayer.push(arguments);} '
  s += "gtag('js', new Date()); "
  s += "gtag('config', 'UA-164262884-1'); "
  s += '</script>'

  // s += '<script type="text/javascript">';
  // s += 'var _gaq = _gaq || [];';
  // s += "_gaq.push(['_setAccount', 'UA-29771508-1']);";
  // s += "_gaq.push(['_trackPageview']);";
  // s += '(function() {';
  // s += "var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;";
  // s += "ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';";
  // s += "var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);";
  // s += '})();';
  // s += '</script>';
  return s;
}

function logVisit() {
  var pg = location.pathname;
  if (pg == '/') return; // NB because getting too many root page visits for some reason.
  var pgHex = toHex(pg);
  addVisit(pgHex, "visit", window.location.hostname);
}
if (Math.random() < 0.1) logVisit();

function addVisit(pg, viewtype, hostname) {
  console.log("addVisit", viewtype, hostname);
  var req;
  req = new XMLHttpRequest();

  var params = "type=" + viewtype;
  params += "&site=dlm";
  params += "&pg=" + encodeURIComponent(pg);
  params += "&lang=" + encodeURIComponent(window.navigator.language);

  req.open("POST", "https://mi2f.com/update.php", true); // NB: false=synchronous
  
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //req.setRequestHeader("Content-length", params.length);
  //req.setRequestHeader("Connection", "close");
  req.send(params);
  //console.log("addVisit",req);
  //console.log("response",req.response);
}

//window.addEventListener("scroll", onScroll);
function onScroll() {
  var scrollTop = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;
  var menu = document.getElementById("menu");
  //alert(scrollTop);
  if (scrollTop > 100) {
    menu.style.top = "0px";
    menu.style.width = "1000px";
    //menu.style.margin = "0 auto 0 auto";
    //menu.style.borderBottom = "2px solid #ffffff";
    menu.style.border = "1px solid #ffffff";
    menu.style.boxShadow = "0px 12px 12px -12px #77cc77";
    menu.style.backgroundColor = "white";
    //menu.style.right = "0";
    //menu.style.left = "0";
    menu.style.textAlign = "center";
    menu.style.position = "fixed";
    menu.style.zIndex = "5000";
  } else {
    //menu.style.backgroundColor = "transparent";
    menu.style.boxShadow = "none";
    menu.style.position = "static";
  }
}

function getRelated() {
  //this.id = typeof id !== 'undefined' ? id : "searchBox";

  if (window.innerWidth < 960) {
    return; // don't bother if screen not wide enough
  }
  var rels = document.getElementsByClassName('related');
  if (rels.length == 0) {
    return;
  }
  var rel = rels[0];

  //var array = [];
  var links = rel.getElementsByTagName("a");
  var count = links.length;
  //for (var i = 0; i < count; i++) {
  //	array.push([links[i].href, links[i].text]);
  //}

  var right = null;
  var left = null;
  if (count > 0) {
    right = links[0];
    if (count > 1) {
      left = links[count - 1];
    }
  }

  var pgWd = 760;
  var linkWd = 110;
  var wd = ((window.innerWidth - pgWd) / 2 - linkWd) / 2 + pgWd / 2;
  wd = Math.max(380, wd);

  var s = '';

  if (left != null) {
    s += '<div style="position: fixed; top: 0px; right: 50%; margin: 10px ' + wd + 'px 10px 0; text-align: left; ">';
    s += fmtMenuBox(left.href, left.text, 0);
    s += '</div>';
  }
  if (right != null) {
    s += '<div style="position: fixed; top: 0px; left: 50%; margin: 10px 0 10px ' + wd + 'px; text-align: right; ">';
    s += fmtMenuBox(right.href, right.text, 1);
    s += '</div>';
  }

  document.getElementById("stt").innerHTML += s;
  //document.getElementById("header").innerHTML += s;   // NB stops google translate from working
  //document.body.innerHTML = s + document.body.innerHTML;
  //document.getElementById("midfull").innerHTML += s;

}

function fmtMenuBox(url, txt, dirn) {
  var s = "";
  var boxID = "menuLt";
  if (dirn == 1) {
    boxID = "menuRt";
  }
  s += '<a href="' + url + '"  style="text-decoration: none; color: #888888; vertical-align: middle; display: table;">';
  s += '<div id="' + boxID + '" >';
  s += txt;
  s += '</div>';
  s += '</a>';
  return s;
}

function initVideo(id, titleid, spanid, style) {
  // defaults
  titleid = typeof titleid !== 'undefined' ? titleid : 'title';
  spanid = typeof spanid !== 'undefined' ? spanid : 'video';
  style = typeof style !== 'undefined' ? style : 'h1';

  // in FF, setting width AGAIN causes window to reset size
  if (navigator.appName == "Microsoft Internet Explorer") window.onresize = resizeVideo;

  var title = document.getElementById(titleid).innerHTML;

  var s = '';
  switch (style) {
  case "h1":
    s += '<div class="centerfull" style="clear:both; font-weight:400; padding: 0;">';
    s += '<div style="float:left; width:60px; text-align:left;">';
    s += '  <a href="javascript:doVideo(\'' + id + '\',\'' + spanid + '\')">';
    s += '    <img src="/images/style/video2.gif" alt="Video" width="75" height="33" style="vertical-align:middle; border:none;" />';
    s += ' </a>';
    s += '</div>';
    s += '<div style="float:right; width:60px; text-align:right;">&nbsp;</div>';
    s += '  <div style="margin:0 auto;">';
    s += '    <h1>' + title + '</h1>';
    s += '  </div>';
    s += '</div>';
    break;

  case "h2":
    s += '<div style="float:right; width:100px; margin: -10px 0 5px 0;">';
    s += '  <a href="javascript:doVideo(\'' + id + '\',\'' + spanid + '\')">';
    s += '    <img src="/images/style/video2.gif" alt="Video" width="75" height="33" style="vertical-align:middle; border:none;" />';
    s += ' </a>';
    s += '</div>';
    s += '    <h2>' + title + '</h2>';
    break;
  }

  document.getElementById(titleid).innerHTML = s; // outerHTML ?

}

function doVideo(id, spanid) {
  var s = "";

  var visIndex = videoVis.indexOf(spanid);
  var visQ = visIndex > -1 ? true : false; // is it currently visible?

  if (visQ) { // turn off
    var frame = document.getElementById(spanid + "v1");
    frame.parentNode.removeChild(frame);
    videoVis.splice(visIndex, 1);
    visQ = false;
  } else { // turn on
    s += '<div class="center">';
    s += '<iframe id="' + spanid + 'v1" src="https://www.youtube.com/embed/' + id + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
    s += '</div>';
    videoVis.push(spanid);
    visQ = true;
  }

  var vid = document.getElementById(spanid);
  vid.innerHTML = s;
  if (visQ) resizeVideo(spanid);
}

function resizeVideo(spanid) {
  var v1 = document.getElementById(spanid + "v1");
  var wd = window.innerWidth - 40;
  if (wd > 640) wd = 640;
  v1.style.width = wd + "px";
  v1.style.height = (wd * (340 / 640) + 80) + "px";
}

var videoVis = [];