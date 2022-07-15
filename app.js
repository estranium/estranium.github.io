function tapMe(){
	taps = localStorage.getItem('taps');
	if(taps != null){
		taps+=100;
	} else {
		taps = 1;
	}
	document.getElementById("test").innerHTML = taps
	localStorage.setItem('taps', taps);
}


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


var taps = localStorage.getItem('taps');
if(taps == null){
	taps = 0;
}
document.getElementById("test").innerHTML = taps
document.getElementById("button").addEventListener('click',tapMe)

registerServiceWorker();
