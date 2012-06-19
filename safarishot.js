var images; //globals sucks, but it's ok
var totalWidth;
var totalHeight;
var userImage;
var defaultImage = "/images/safari/google.png";
var pageTitle;
var pageUrl;
var userImageSelected = false;

$(document).ready(function(){
    preFetchImages();
    document.getElementById('files').addEventListener('change', handleFileSelect, false);

    $("#generate").click(function(){
      generate();
      return false;
    });

});

function handleFileSelect(evt){
    var files = evt.target.files; // FileList object
    handleImage(files[0]);
}



function preFetchImages(){
  var sources = {
    topleft: "/images/safari/top-left.png",
    topmid: "/images/safari/top-mid.png",
    topright: "/images/safari/top-right.png",
    midleft: "/images/safari/mid-left.png",
    midmid:"/images/safari/mid-mid.png",
    midright:"/images/safari/mid-right.png",
    bottomleft:"/images/safari/bottom-left.png",
    bottommid:"/images/safari/bottom-mid.png",
    bottomright:"/images/safari/bottom-right.png"
  };

  loadImages(sources, function(loaded) {
      images = loaded;
      drawSafari();
  });
}


function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  // get num of sources
  for(var src in sources) {
    numImages++;
  }
  for(var src in sources) {
    images[src] = new Image();
    images[src].onload = function() {
      if(++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

function handleImage(f){
  userImageSelected = true;

  var reader = new FileReader();
  
  reader.onload = (function(theFile) {
          return function(e) {
            setImage(e.target.result);
          };
        })(f);
  reader.readAsDataURL(f);
}

function generate(){
   $("#show-screenshot-div").hide();
   $("#wait").show();
   $("#output").hide();

   pageTitle = $("#page-title").val();
   pageUrl = $("#page-url").val();
   if(!userImageSelected){
    setImage(defaultImage);
   }

   drawSafari();
   
}


function setImage(url){
  var img = new Image();
   img.onload = function(){
      
      userImage = img;
      totalHeight = img.height + 131;
      totalWidth = img.width + 80;
      document.getElementById("myCanvas").width = totalWidth;
      document.getElementById("myCanvas").height = totalHeight;
      drawSafari();
   };
   img.src = url;
}

function clearCanvas(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  var w = canvas.width;
  canvas.width = 1;
  canvas.width = w;
}

function drawSafari() {
  if((!images) || (!totalWidth) || (!userImage) || (!pageTitle)){
    return;
  }

  //w: 543
  //h: 328

  if(userImage.width < 550 || userImage.height < 340){
    alert("Image should be atleast 550x340px");
    $("#show-screenshot-div").show();
    $("#wait").hide();
    return;
  }

  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  clearCanvas(context, canvas);
    
  //draw top left
  context.drawImage(images.topleft, 0, 0);
  
  //draw top mid
  var topMidWidth = totalWidth - (images.topleft.width + images.topright.width);
  context.drawImage(images.topmid, 0, 0, 
                      images.topmid.width, images.topmid.height,
                      images.topleft.width, 0, topMidWidth, images.topmid.height);
                      
  //draw top right
  var topRightLeft = images.topleft.width + topMidWidth;
  
  context.drawImage(images.topright, 0, 0, images.topright.width, images.topright.height, topRightLeft, 0, images.topright.width, images.topright.height);
  
  
  var midheight = totalHeight - (images.topleft.height + images.bottomleft.height);

  //draw mid left
  context.drawImage(images.midleft, 0, 0, images.midleft.width, images.midleft.height, 0, images.topleft.height, images.midleft.width, midheight);
  
  //midmid
  var midMidWidth = totalWidth - (images.midleft.width + images.midright.width);
  
  context.drawImage(images.midmid, 0, 0, images.midmid.width, images.midmid.height, images.midleft.width, images.topleft.height, midMidWidth, midheight);
 
  
  //midright
  var midRightLeft = images.midleft.width + midMidWidth;
  context.drawImage(images.midright, 0, 0, images.midright.width, images.midright.height, midRightLeft, images.topleft.height, images.midright.width, midheight);
  
  
  
  //bottom-left
  var bottomTop = images.topleft.height + midheight;
  context.drawImage(images.bottomleft, 0, 0, images.bottomleft.width, images.bottomleft.height, 0, bottomTop, images.bottomleft.width, images.bottomleft.height);
  
  var bottomMidWith = totalWidth - (images.bottomleft.width + images.bottomright.width);
  context.drawImage(images.bottommid, 0, 0, images.bottommid.width, images.bottommid.height, images.bottomleft.width, bottomTop, bottomMidWith, images.bottommid.height);
  
  
  var bottomRightLeft = images.bottomleft.width + bottomMidWith;
  context.drawImage(images.bottomright, 0, 0, images.bottomright.width, images.bottomright.height, bottomRightLeft, bottomTop, images.bottomright.width, images.bottomright.height);
  
  
  context.drawImage(userImage, 40, 76);
  context.fillStyle = "#222";
  context.shadowColor = "#dcdcdc";
  context.shadowOffsetX = -1;
  context.shadowOffsetY = 1;
  context.font = "normal 13px 'Lucida Grande','Lucida Sans Unicode','Helvetica Neue','Helvetica',sans-serif,Arial";


  context.fillText(pageTitle, (totalWidth/2) - (pageTitle.length * 3), 40);
  
  context.font = "normal 12px 'Lucida Grande','Lucida Sans Unicode','Helvetica Neue','Helvetica',sans-serif,Arial";
  context.fillStyle = "#222";
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.fillText(pageUrl, 131, 62);
  
  var img    = canvas.toDataURL("image/png");
  document.getElementById("img").innerHTML = '<img src="'+img+'"/>';

   //$("#all-input").hide();
   $("#show-screenshot-div").show();
   $("#wait").hide();
   $("#output").slideDown();
  
};
