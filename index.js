var range = document.querySelector('input');
var video = document.querySelector('video');
var img = document.querySelector('img');

video.addEventListener('canplay', function() {
  range.max = parseInt(video.duration, 10);
})

range.addEventListener('input', function() {
  img.dataset.snap = '#myvideo@' + range.value;
  Snaphash('img');
})

Snaphash('img');
