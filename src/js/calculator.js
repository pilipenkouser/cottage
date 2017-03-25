function calculateHome(currentValue, elem, step) {


	var oldValue = +($(elem).data("old-value"));
	var s = $('#price_result').text().replace(/[^0-9]/gim,'');

	if ( currentValue > oldValue) { // 

		var res = currentValue - oldValue;

		res = +s + +step * res;
	
	} else if( currentValue < oldValue) {

		var res = oldValue - currentValue;

		res = +s - +step * res;
	} else {
		res = +s;
	}


	res = String(res);
	var resArr = res.split('');
	var j = 0;
	var res = new Array();

	for( var i = resArr.length - 1; i >= 0; i-- ){

		if( j % 3 == 0) {

			res.unshift(' ');
		}

		res.unshift( resArr[i] );
		j++;
	}

	res = res.join('');

	$('#price_result').html( res + ' руб.');
	$('#modal_price_result').html( res + ' руб.');
	$('#modal_res_input').html( res + ' руб.');
	$(elem).data("old-value", currentValue);

}