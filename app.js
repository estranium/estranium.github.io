function tapMe(){
	taps = localStorage.getItem('taps');
	if(taps != null){
		taps++;
	} else {
		taps = 1;
	}
	document.getElementById("test").innerHTML = taps
	localStorage.setItem('taps', taps);
}

var taps = localStorage.getItem('taps');
if(taps == null){
	taps = 0;
}
//document.getElementById("test").innerHTML = taps
//document.getElementById("button").addEventListener('click',tapMe)

function calc(str){
	//arr = str.replaceAll(/[\+\-\*\/]/ig," $& ")
	return Number(eval(str).toFixed(15))
}
function buttonClick(ev){
	
	var cmd = ev.target.innerText
	//hist = h.value
	//result = r.value
	var hist = h.innerText
	var result = r.innerText
	
	//alert(cmd)
	switch(cmd){
		case "C":{
			hist = "";
			lastCmd = false
		}
		case "CE":{
			result = "0";
			newDig = false
			break;
		}
		case "BS":{
			result = result.slice(0,-1);
			if(result == ""){
				result = "0"
			}
			if(newCalc){
				hist = ""
				newCalc = false
			}
			newDig = false
			break;
		}
		case "+":
		case "-":
		case "*":
		case "/":{
			if(newCalc){
				hist = ""
				newCalc = false
			}
			if(lastCmd){
				hist = hist.slice(0,-1);
			} else {
				hist += result
				result = calc(hist);
			}
			hist += cmd
			lastCmd = cmd
			newDig = true
			break;
		}
		case "=":{
			//if(lastCmd){
			//	hist += result
		//		lastCmd = false
			//} else {//if(!hist){
			//	hist = result
			//}
			if(newCalc){
				hist = ""
			}
			hist += result
			result = calc(hist);
			hist += cmd
			newDig = true
			newCalc = true
			break;
		}
		default:{
			if(newCalc){
				hist = ""
				newCalc = false
			}
			if(result == "0" || newDig){
				result = ""
				if(cmd == "."){
					result = "0"
				}
				newDig = false
			}
			result = result + cmd
			lastCmd = false
			
			//r.focus()
		}
	}
	
	//h.value = hist
	//r.value = result
	h.innerText = hist
	r.innerText = result
	//log.innerText = "lastCmd " + lastCmd + "; newDig " + newDig + "; newCalc " + newCalc
}
var t = document.getElementById("table").getElementsByTagName("td")
var r = document.getElementById("result")
var h = document.getElementById("history")
var log = document.getElementById("log")
var reload = document.getElementById("reload")

var lastCmd = false
var newDig = false
var newCalc = true


for(var i=0;i<t.length;i++){
	//t[i].innerText
	t[i].addEventListener("click",buttonClick)
}
reload.addEventListener("click",function(){location.reload()})



const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/sw.js',
        {
          scope: '/',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();
