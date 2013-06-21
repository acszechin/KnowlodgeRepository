package br.com.knowlodge;

import Acme.Crypto.Rc4Cipher;

public class TesteCriptografia {
	public static void main(String[] args) {
		String html = "daniel takabayashi da silva junior";
		
		Rc4Cipher cypher = new Rc4Cipher("123");
		byte[] htmlSeguro = new byte[html.length()];
		cypher.encrypt(html.getBytes(), htmlSeguro);
		
		System.out.println("Criptografado [<" + new String(htmlSeguro) + ">]");
		
		Rc4Cipher cypher2 = new Rc4Cipher("333");
		byte[] htmlDecript =  new byte[html.length()];
		cypher2.decrypt(htmlSeguro, htmlDecript);
		System.out.println("Decriptografado [<" + new String(htmlDecript) + ">]");
		
		
	}
	
	
	
	public String getHTML(){
		return "<!DOCTYPE html>\n<html lang=en>\n<head>\n<meta charset=utf-8>\n<meta name=viewport content=\'width=62 blablabla\n</li>\n<li>\nmais blablabla\n</li>\n</ol>\n</section>\n<div>\n<input type=button id=clear value=\'Limpar alteracoes\' />\n</div>\n</article>\n<script>var editable=document.getElementById("editable");addEvent(editable,"blur",function(){localStorage.setItem("contenteditable",this.innerHTML);document.designMode="off"});addEvent(editable,"focus",function(){document.designMode="on"});addEvent(document.getElementById("clear"),"click",function(){localStorage.clear();window.location=window.location});if(localStorage.getItem("contenteditable")){editable.innerHTML=localStorage.getItem("contenteditable")};</script>\n</body>\n</html>";
	}
}
