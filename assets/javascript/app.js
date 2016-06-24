var musicians = ['bon jovi','nirvana','guns n roses','the police','air supply',
				'michael jackson','drake','adele','elvis presley','rihanna',
				'shakira','eminem','50 cent','backstreet boys','beastie boys',
				'bob dylan','bob marley','bruno mars','coldplay','david guetta',
				'enrique iglesias','jennifer lopez','justin bieber','kanye west','USHER',
				'madonna','taylor swift','the beatles','the rolling stones','jay z'];

function displayMusicianGif(){
	$('#musicianImages').empty();
	var musician = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + musician + "&limit=10&api_key=dc6zaTOxFJmzC";
	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		console.log(response);
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			var musicianDiv = $('<div>');
			musicianDiv.addClass('orderImages');
			var p = $('<p>',{
				text:"Rated : " + results[i].rating,
				width:results[i].images.fixed_height.width
			});
			var musicianImage = $('<img>',{
				src:results[i].images.fixed_height_still.url,
				alt:results[i].images.fixed_height.url
			});
			(musicianImage).on('click',function(){
				var newALT = this.src;
				var newSRC = this.alt;
				this.src = newSRC;
				this.alt = newALT;
			})
			musicianDiv.append(p);
			musicianDiv.append(musicianImage);
			$('#musicianImages').append(musicianDiv);
		}
	})
}

function renderButtons(){
	$('#musicianButtons').empty();
	for (var i = 0; i <musicians.length; i++) {
		var a = $('<button>')
		var lower = musicians[i];
		var capital =lower.toUpperCase();
		a.addClass('musician');
		a.attr('data-name',capital);
		a.text(capital);
		$('#musicianButtons').append(a);
	}
}

$('#addMusician').on('click',function(){
	var loweMusician = $('#musician-input').val().trim();
	var musician = loweMusician.toUpperCase();
	for (var i = 0; i < musicians.length; i++) {
		musicians[i] = musicians[i].toUpperCase();
	}
	for (var i = 0; i < musicians.length; i++) {
		if ((musicians[i]) === musician) {
			alert("This Band/Musician is already added");
			return false;
		}
	}
	if (musician === ""){
		alert("Please type a Band or Musician");
	}else{
		musicians.push(musician);
		renderButtons();
	}
	return false;
})

$('#clear').on('click',function(){
	$('#musicianForm').reset();
})

$(document).on('click','.musician',displayMusicianGif);

renderButtons();