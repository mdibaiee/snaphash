(function(global) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  var Snaphash = function(els) {
    if (!els) {
      throw Error('You must provide an element/selector');
    }

    // selector provided
    else if (typeof els === 'string') {
      els = document.querySelectorAll(els);
    }

    // single element provided (only image element)
    else if (!els instanceof HTMLImageElement) {
      throw TypeError("Can not apply Snaphash to " + els.constructor.name + " type. You must provide an image element/selector");
    }

    // loop over elements
    for (var i = 0, len = els.length; i < len; i++) {
      var el = els[i];
      // Let's find out target selector and time
      var src = parseSource(el.dataset.snap);

      // Target video, clone it to avoid flickering
      var target = document.querySelector(src.selector).cloneNode();

      function listener() {
        target.currentTime = src.time;

        target.addEventListener('seeked', function seeked() {
          canvas.width = target.videoWidth;
          canvas.height = target.videoHeight;
          context.drawImage(target, 0, 0);

          el.src = canvas.toDataURL();

          target.removeEventListener('seeked', seeked);
          target.remove();
        })

        target.removeEventListener('canplay', listener)
      }

      if (target.readyState === 4) {
        listener();
      } else {
        target.addEventListener('canplay', listener);
      }
    }
  }

  function parseSource(src) {
    var split = src.split('@');
    var selector = split[0];
    var time = parseTime(split[1]);

    return {selector: selector, time: time};
  }

  function parseTime(time) {
    var split = time.split(':');
    var parsed = {
      second: +split[split.length - 1] || 0,
      minute: +split[split.length - 2] || 0,
      hour: +split[split.length - 3] || 0
    }

    var total = parsed.second + parsed.minute * 60 + parsed.hour * 3600;

    return total;
  }

  global.Snaphash = Snaphash;
}(this))
