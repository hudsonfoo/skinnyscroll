module.exports = (function() {
	const _query = '[data-skinnyscroll]';
  let _toWatch = [];
  let cbs = {};

	update();

	_toWatch.length > 0 &&
    window.addEventListener('scroll', () => {
      for (let i = 0; i < _toWatch.length; i++) {
        let { el, options } = _toWatch[i];
        let distance = options.distance || 200;

        if (
          el.getBoundingClientRect().top < window.innerHeight - distance &&
          el.getBoundingClientRect().top > 0
        ) {
					cbs[options.name]
						&& cbs[options.name].length > 0
						&& cbs[options.name].forEach(cb => typeof cb === 'function' && cb.call(el));
        }
      }
    });

  function update() {
    const els = Array.from(document.querySelectorAll(_query));
    _toWatch = [];
		els.length > 0 && els.forEach(el => add(el));
  }

  function add(el) {
    try {
      const options = JSON.parse(el.getAttribute('data-skinnyscroll'));
      !options.name && console.warn('\'name\' is a required option', el);
      _toWatch.push({
        el,
        options,
      });
    } catch (e) {
      console.warn('options should be passed as JSON', el);
      return null;
    }
  }

  function on(name, cb) {
    cbs[name] = cbs[name] || [];
    cbs[name].push(cb);
  }

  function off(name, cb) {
    const index = cbs[name].indexOf(cb);
    if (index > -1) cbs[name].splice(index, 1);
  }

  return {
    add,
    update,
    on,
    off,
  };
}());
