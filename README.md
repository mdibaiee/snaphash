Snaphash
========
Preview video frames on `<img>` elements with ease.

How does it work?

```html
<video id="myvideo" src="big-buck-bunny.mp4"></video>

<img data-snap="#myvideo@00:00:15" />
```

```javascript
Snaphash('img');
```

That's all, a preview of video's frame at 00:00:15 will be shown in the `img` element.

You can omit unnecessary zeros from time, i.e. `#myvideo@15` is the same as `#myvideo@00:00:15`.

See a [demo](http://mdibaiee.github.io/snaphash)
