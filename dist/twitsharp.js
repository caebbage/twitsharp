// twitsharp.js
// by cae (https://twitter.com/mmt_n_)
// MIT
$(document).ready(function () {
  let drop = $('#drop-area');

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => {
    $(drop).on(ev, e => {
      if (ev == 'dragenter' || ev == 'dragover') {
        $(drop).addClass('active')
      } else {
        $(drop).removeClass('active')
      }
      if (ev == 'drop') {
        console.log(event.dataTransfer.files)
        readFiles(event.dataTransfer.files)
      }
      
      e.preventDefault()
      e.stopPropagation()
    })
    $('body').on(ev, e => {
      e.preventDefault()
      e.stopPropagation()
    })
  })

  // click to upload
  $(drop).on('click', () => {$('#upload').click();})

  $('#upload').on('change', function (e) {
    let data = $('#upload')[0].files
    readFiles(data);
  })

  function readFiles (data) {
    console.log('owo wut dis');
    for (let i = 0; i < data.length; i++) {
      if (!data[i].type.match('image.*')) {
        console.log('nuh');
        continue;
      }
      console.log('ok!')
      let reader = new FileReader()
      reader.onload = (function(file) {
        return function(e) {
          getFile(e.target.result, file.name.replace(/\.[^/.]+$/, ""))
        };
      })(data[i]);
      reader.readAsDataURL(data[i])
    }
  }

  function getFile(data, name) {
    let img = new Image
    img.src = data;
    img.onload = function () {
      $('#canvas').attr("width", img.width)
      $('#canvas').attr("height", img.height)
      let ctx = $('#canvas')[0].getContext( "2d");
      ctx.globalAlpha = 0.85;
      ctx.drawImage(img, 0,0)
      ctx.globalAlpha = 1;
      ctx.drawImage(img, 1, 0, img.width - 1, img.height);
      ctx.drawImage(img, 0, 1, img.width, img.height - 1);
      var link = document.createElement('a');
      $('#canvas')[0].toBlob(function(blob) {
        saveAs(blob, name + "-sharp.png");
    });
    }
  }
})