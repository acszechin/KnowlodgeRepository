var canvas = document.getElementById('canvasPagina');
var context = canvas.getContext('2d');
var imageObj = new Image();
var imgDefaultWidth = 740;
var imgDefaultHeight = 1004;
var paginaAtual = 1;
var qtdPaginas = 272;
var paginaCapa = 1;
var zoomRatio = 1;
var zoomOut = 0;
var zoomIn = 0;
var principalWidth = screen.width * 0.8;
var principalHeight = screen.height * 0.8;
var widgetIcon = {
		"topLocation":758,
		"leftLocation":510,
		"width":30,
		"height":30,
		"pagina":26,
		
		"defaultTopLocation":758,
		"defaultLeftLocation":510,
		"defaultWidth":30,
		"defaultHeight":30
}

window.onload = function (){
	//Aceita storage 
	if (typeof (Storage) !== "undefined") {
		paginaAtual = localStorage.ultimaPagina;
		
		if(paginaAtual == 'NaN' || paginaAtual === "undefined"){
			paginaAtual = 1;
		}
	}

	//altera tamanho da div principal
	document.getElementById("divPrincipal").style.width = principalWidth+'px';
	document.getElementById("divPrincipal").style.height = principalHeight+'px';
	
	//altera tamanho do canvas
	canvas.width  = imgDefaultWidth;//canvas.offsetWidth;
	canvas.height = imgDefaultHeight; //canvas.offsetHeight;
	
	
	//Carrega a primeira pagina ou carrega a ultima pagina navegada
	loadImgPagina(paginaAtual)
	
	document.getElementById("qtdPaginas").innerHTML = qtdPaginas;
	
	if(paginaAtual == 1){
		document.getElementById("back").style.display = 'none';
	}
}

function loadWidgetLinks(paginaAtual, ratio){
	
	if(paginaAtual == widgetIcon.pagina){
		if(ratio == 1){
			widgetIcon.leftLocation = widgetIcon.defaultLeftLocation;
			widgetIcon.topLocation = widgetIcon.defaultTopLocation;
			widgetIcon.width = widgetIcon.defaultWidth;
			widgetIcon.height = widgetIcon.defaultHeight;
			
		}else{
			widgetIcon.leftLocation = widgetIcon.leftLocation * ratio;
			widgetIcon.topLocation = widgetIcon.topLocation * ratio;
			widgetIcon.width = widgetIcon.width * ratio;
			widgetIcon.height = widgetIcon.height * ratio;
			
		}
		
		document.getElementById("divOED").style.top = canvas.offsetTop + widgetIcon.topLocation + 'px';
		document.getElementById("divOED").style.left = canvas.offsetLeft  + widgetIcon.leftLocation + 'px';
		
		document.getElementById("iconeOED").style.height = widgetIcon.height +'px';
		document.getElementById("iconeOED").style.width = widgetIcon.width + 'px';
		
		document.getElementById("divOED").style.display = "block";
		
	}else{
		document.getElementById("divOED").style.display = "none";
	}
}

document.getElementById("capa").onclick = function() {
	paginaAtual = paginaCapa;
	loadImgPagina(paginaAtual);
	
	document.getElementById("back").style.display = 'none';
	document.getElementById("next").style.display = 'inherit';
	document.getElementById("back").style.display = 'none';
};

document.getElementById("back").onclick = function() {
	paginaAtual--;
	
	loadImgPagina(paginaAtual);
	
	if(paginaAtual == 1){
		document.getElementById("back").style.display = 'none';
	}
	
	if(document.getElementById("next").style.display == 'none'){
		document.getElementById("next").style.display = 'inherit';
	}
};

document.getElementById("next").onclick = function() {
	paginaAtual++;
	
	loadImgPagina(paginaAtual);
	
	if(paginaAtual == qtdPaginas){
		document.getElementById("next").style.display = 'none';
	}
	
	if(document.getElementById("back").style.display == 'none'){
		document.getElementById("back").style.display = 'inherit';
	}
};

function loadImgPagina(paginaAtual){
	var paginaImg = new Image();
	
	paginaImg.onload = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(paginaImg, 0, 0, imgDefaultWidth, imgDefaultHeight);
	};
		
	paginaImg.src = 'images/s'+ paginaAtual + '_p1.jpg';
	localStorage.ultimaPagina = paginaAtual;
	
	document.getElementById("zoomOut").onclick = function() {
		zoomOut;
		
		imgDefaultWidth = imgDefaultWidth * 0.85; 
		imgDefaultHeight = imgDefaultHeight * 0.85;
		
		canvas.width  = imgDefaultWidth;
		canvas.height = imgDefaultHeight;
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(paginaImg, 0, 0, imgDefaultWidth, imgDefaultHeight);
		
		loadWidgetLinks(paginaAtual, 0.85);
	};
	
	document.getElementById("zoomIn").onclick = function() {
		zoomIn++;
		
		imgDefaultWidth = imgDefaultWidth * 1.25; 
		imgDefaultHeight = imgDefaultHeight * 1.25;
		
		canvas.width  = imgDefaultWidth;
		canvas.height = imgDefaultHeight;
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(paginaImg, 0, 0, imgDefaultWidth, imgDefaultHeight);
		
		loadWidgetLinks(paginaAtual, 1.25);
	};
	
	document.getElementById("zoomFit").onclick = function() {
		zoomIn = 0;
		zoomOut = 0;
		
		imgDefaultWidth = 740; 
		imgDefaultHeight = 1004;
		
		canvas.width  = imgDefaultWidth;
		canvas.height = imgDefaultHeight;
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(paginaImg, 0, 0, imgDefaultWidth, imgDefaultHeight);
		
		loadWidgetLinks(paginaAtual, 1);
	};
	
	document.getElementById("paginaAtual").innerHTML = paginaAtual;
	
	loadWidgetLinks(paginaAtual, 1);
}


function loadIFrame() {
	document.getElementById("iframe_a").src = "widgets/1/OED/index.html";
}

document.getElementById("zoomIFrameIn").onclick = function() {
	document.getElementById("iframe_a").style.width = '100%';
	document.getElementById("iframe_a").style.height = '100%';
};

document.getElementById("zoomIFrameOut").onclick = function() {
	document.getElementById("iframe_a").style.width = '80%';
	document.getElementById("iframe_a").style.height = '80%';
};