document.addEventListener('DOMContentLoaded',function() {
  console.log('DOM loaded');
  textWriter.init();
});

var textWriter = (function() {
	
	//var select;
	//var savedContainer;
	var myForm;
	var textArea;
	//var turnText;
	//var tidyHtml;
	var wordCount;
	var charCount;

	function init() {
		//savedContainer = document.querySelector('.oldEntries-items');
		//turnText = document.querySelector('button.turntext');
		wordCount = document.querySelector('.wordCount');
		charCount = document.querySelector('.charCount');
		//tidyHtml = document.querySelector('button.tidy');
		textArea = document.querySelector('textarea');
		
		myForm.addEventListener('keyup', charCounter);
		myForm.addEventListener('keyup', wordCounter);
		//myForm.addEventListener('submit',submitHandler);
		//myForm.addEventListener('reset', deleter);
		//tidyHtml.addEventListener('click', tidier);
		//turnText.addEventListener('click', textReverser);

	}


	function charCounter(e) {
		charCount.textContent = textArea.value.length + ' stafir';
	}

	function wordCounter(e) {
		var words = textArea.value.replace( /\n/g, " " ).split(' ');
		wordCount.textContent = words.length - 1 + ' orð';
		if(textArea.value == '') {
			wordCount.textContent = '0 orð';
		}
	}
	/*
	function textReverser(e) {
		var text = textArea.value;
		var textReversed = text.split('').reverse().join('');
		textArea.value = textReversed;
  	}

  	function tidier(e) {
		var text = textArea.value;
		var textCleaned = text.replace(/<(?:.|\n)*?>/gm, '');
		textArea.value = textCleaned;
  	}
	*/
	return {
		init: init
	};

})();