/* TODO: Would it be possibble to use flash to keep a reference to the opened file, so there could be both save & save as? */

function importFile(file) {
  var filename = file.name;
	console.log('opening', filename);
	var reader = new FileReader();

	reader.onerror = function(event) {
		var msg = 'Error ' + event.target.error.code;
    console.log(msg);
	};
	reader.onload = function(event) {
		var file = event.target.result;
		$('#text').val(file);
    $('title').text(filename);
	};
 	reader.readAsText(file);
}

function fileSelect(event) {
  var file = event.target.files[0];
  importFile(file);
};

/* TODO: importFile function for reading files with flash */
// function importFile(argument) {
// }


$(document).ready(function() {

  // Open file: Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('html').addClass('fileapi');
    $('.label.fileapi').addClass('label-success');
    $('[for=open-file]').removeAttr('disabled');

    $('#open-file').change(fileSelect);

  } else {
    $('html').addClass('no-fileapi');
    $('.label.fileapi').addClass('label-important');
  }

  // Save file: Check for flash
  if (typeof swfobject !== 'undefined' && swfobject.getFlashPlayerVersion().major >= 10 && window.location.href.indexOf('file://') != 0) {
    $('html').addClass('flash');
    $('.label.flash').addClass('label-success');

    Downloadify.create('save-file',{
  		filename: function(){
  			return $('title').text();
  		},
  		data: function(){ 
  			return $('#text').val() + '.txt';
  		},
  		onComplete: function(){},
  		onCancel: function(){},
  		onError: function(){},
  		swf: 'js/downloadify/media/downloadify.swf',
  		downloadImage: 'img/saveas-btn.png',
  		width: 94,
  		height: 30,
  		transparent: true,
  		append: false
  	});
  }
  else if (window.location.href.indexOf('file://') == 0) {
    $('html').addClass('flash');
    $('.label.flash').text('Flash "file://" security error');
  }
  else {
    $('html').addClass('no-flash');
    $('.label.flash').addClass('label-important');
  }

});




















