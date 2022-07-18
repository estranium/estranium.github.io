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
		var res
		str = str.replaceAll(/[ ]/ig,"")
		res = str.replaceAll(/[\+\-\*\/]/ig," $& ").split(" ")
		var idx
		while(idx = res.indexOf("*"),idx>0){
		    res.splice(idx-1,3,bigDecimal.multiply(res[idx-1],res[idx+1]))
		}
		while(idx = res.indexOf("/"),idx>0){
		    res.splice(idx-1,3,bigDecimal.divide(res[idx-1],res[idx+1]))
		}
		while(idx = res.indexOf("-"),idx>0){
		    res.splice(idx-1,3,bigDecimal.subtract(res[idx-1],res[idx+1]))
		}
		while(idx = res.indexOf("+"),idx>0){
		    res.splice(idx-1,3,bigDecimal.add(res[idx-1],res[idx+1]))
		}
		res = res[0]
		idx = res.length
		var dot = res.indexOf(".")
		while((dot>0) && (idx>dot) && ((res[idx-1] == '0') || (res[idx-1] == '.'))) {idx--}
		res = res.slice(0,idx)
		res = bigDecimal.getPrettyValue(res,3," ")
	return res
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
