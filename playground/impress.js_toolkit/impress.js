(function(e, t) {
  "use strict";
  var n = function() {
    var t = e.createElement("dummy").style,
      n = "Webkit Moz O ms Khtml".split(" "),
      r = {};
    return function(e) {
      if (typeof r[e] === "undefined") {
        var i = e.charAt(0).toUpperCase() + e.substr(1),
          s = (e + " " + n.join(i + " ") + i).split(" ");
        r[e] = null;
        for (var o in s) {
          if (t[s[o]] !== undefined) {
            r[e] = s[o];
            break
          }
        }
      }
      return r[e]
    }
  }();
  var r = function(e) {
    return [].slice.call(e)
  };
  var i = function(e, t) {
    var r, i;
    for (r in t) {
      if (t.hasOwnProperty(r)) {
        i = n(r);
        if (i !== null) {
          e.style[i] = t[r]
        }
      }
    }
    return e
  };
  var s = function(e, t) {
    return isNaN(e) ? t || 0 : Number(e)
  };
  var o = function(t) {
    return e.getElementById(t)
  };
  var u = function(t, n) {
    n = n || e;
    return n.querySelector(t)
  };
  var a = function(t, n) {
    n = n || e;
    return r(n.querySelectorAll(t))
  };
  var f = function(t, n, r) {
    var i = e.createEvent("CustomEvent");
    i.initCustomEvent(n, true, true, r);
    t.dispatchEvent(i)
  };
  var l = function(e) {
    return " translate3d(" + e.x + "px," + e.y + "px," + e.z + "px) "
  };
  var c = function(e, t) {
    var n = " rotateX(" + e.x + "deg) ",
      r = " rotateY(" + e.y + "deg) ",
      i = " rotateZ(" + e.z + "deg) ";
    return t ? i + r + n : n + r + i
  };
  var h = function(e) {
    return " scale(" + e + ") "
  };
  var p = function(e) {
    return " perspective(" + e + "px) "
  };
  var d = function() {
    return o(t.location.hash.replace(/^#\/?/, ""))
  };
  var v = function(e) {
    var n = t.innerHeight / e.height,
      r = t.innerWidth / e.width,
      i = n > r ? r : n;
    if (e.maxScale && i > e.maxScale) {
      i = e.maxScale
    }
    if (e.minScale && i < e.minScale) {
      i = e.minScale
    }
    return i
  };
  var m = e.body;
  var g = navigator.userAgent.toLowerCase();
  var y = n("perspective") !== null && m.classList && m.dataset && g.search(/(iphone)|(ipod)|(android)/) === -1;
  if (!y) {
    m.className += " impress-not-supported "
  } else {
    m.classList.remove("impress-not-supported");
    m.classList.add("impress-supported")
  }
  var b = {};
  var w = {
    width: 1024,
    height: 768,
    maxScale: 1,
    minScale: 0,
    perspective: 1e3,
    transitionDuration: 1e3
  };
  var E = function() {
    return false
  };
  var S = t.impress = function(n) {
    if (!y) {
      return {
        init: E,
        "goto": E,
        prev: E,
        next: E
      }
    }
    n = n || "impress";
    if (b["impress-root-" + n]) {
      return b["impress-root-" + n]
    }
    var g = {};
    var S = null;
    var x = null;
    var T = null;
    var N = null;
    var C = null;
    var k = o(n);
    var L = e.createElement("div");
    var A = false;
    var O = null;
    var M = function(e) {
      if (O !== e) {
        f(e, "impress:stepenter");
        O = e
      }
    };
    var _ = function(e) {
      if (O === e) {
        f(e, "impress:stepleave");
        O = null
      }
    };
    var D = function(e, t) {
      var n = e.dataset,
        r = {
          translate: {
            x: s(n.x),
            y: s(n.y),
            z: s(n.z)
          },
          rotate: {
            x: s(n.rotateX),
            y: s(n.rotateY),
            z: s(n.rotateZ || n.rotate)
          },
          scale: s(n.scale, 1),
          el: e
        };
      if (!e.id) {
        e.id = "step-" + (t + 1)
      }
      g["impress-" + e.id] = r;
      i(e, {
        position: "absolute",
        transform: "translate(-50%,-50%)" + l(r.translate) + c(r.rotate) + h(r.scale),
        transformStyle: "preserve-3d"
      })
    };
    var P = function() {
      if (A) {
        return
      }
      var t = u("meta[name='viewport']") || e.createElement("meta");
      t.content = "width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no";
      if (t.parentNode !== e.head) {
        t.name = "viewport";
        e.head.appendChild(t)
      }
      var o = k.dataset;
      N = {
        width: s(o.width, w.width),
        height: s(o.height, w.height),
        maxScale: s(o.maxScale, w.maxScale),
        minScale: s(o.minScale, w.minScale),
        perspective: s(o.perspective, w.perspective),
        transitionDuration: s(o.transitionDuration, w.transitionDuration)
      };
      C = v(N);
      r(k.childNodes).forEach(function(e) {
        L.appendChild(e)
      });
      k.appendChild(L);
      e.documentElement.style.height = "100%";
      i(m, {
        height: "100%",
        overflow: "hidden"
      });
      var l = {
        position: "absolute",
        transformOrigin: "top left",
        transition: "all 0s ease-in-out",
        transformStyle: "preserve-3d"
      };
      i(k, l);
      i(k, {
        top: "50%",
        left: "50%",
        transform: p(N.perspective / C) + h(C)
      });
      i(L, l);
      m.classList.remove("impress-disabled");
      m.classList.add("impress-enabled");
      T = a(".step", k);
      T.forEach(D);
      x = {
        translate: {
          x: 0,
          y: 0,
          z: 0
        },
        rotate: {
          x: 0,
          y: 0,
          z: 0
        },
        scale: 1
      };
      A = true;
      f(k, "impress:init", {
        api: b["impress-root-" + n]
      })
    };
    var H = function(e) {
      if (typeof e === "number") {
        e = e < 0 ? T[T.length + e] : T[e]
      } else if (typeof e === "string") {
        e = o(e)
      }
      return e && e.id && g["impress-" + e.id] ? e : null
    };
    var B = null;
    var j = function(e, n) {
      if (!A || !(e = H(e))) {
        return false
      }
      t.scrollTo(0, 0);
      var r = g["impress-" + e.id];
      if (S) {
        S.classList.remove("active");
        m.classList.remove("impress-on-" + S.id)
      }
      e.classList.add("active");
      m.classList.add("impress-on-" + e.id);
      var o = {
        rotate: {
          x: -r.rotate.x,
          y: -r.rotate.y,
          z: -r.rotate.z
        },
        translate: {
          x: -r.translate.x,
          y: -r.translate.y,
          z: -r.translate.z
        },
        scale: 1 / r.scale
      };
      var u = o.scale >= x.scale;
      n = s(n, N.transitionDuration);
      var a = n / 2;
      if (e === S) {
        C = v(N)
      }
      var f = o.scale * C;
      if (S && S !== e) {
        _(S)
      }
      i(k, {
        transform: p(N.perspective / f) + h(f),
        transitionDuration: n + "ms",
        transitionDelay: (u ? a : 0) + "ms"
      });
      i(L, {
        transform: c(o.rotate, true) + l(o.translate),
        transitionDuration: n + "ms",
        transitionDelay: (u ? 0 : a) + "ms"
      });
      if (x.scale === o.scale || x.rotate.x === o.rotate.x && x.rotate.y === o.rotate.y && x.rotate.z === o.rotate.z && x.translate.x === o.translate.x && x.translate.y === o.translate.y && x.translate.z === o.translate.z) {
        a = 0
      }
      x = o;
      S = e;
      t.clearTimeout(B);
      B = t.setTimeout(function() {
        M(S)
      }, n + a);
      return e
    };
    var F = function() {
      var e = T.indexOf(S) - 1;
      e = e >= 0 ? T[e] : T[T.length - 1];
      return j(e)
    };
    var I = function() {
      var e = T.indexOf(S) + 1;
      e = e < T.length ? T[e] : T[0];
      return j(e)
    };
    k.addEventListener("impress:init", function() {
      T.forEach(function(e) {
        e.classList.add("future")
      });
      k.addEventListener("impress:stepenter", function(e) {
        e.target.classList.remove("past");
        e.target.classList.remove("future");
        e.target.classList.add("present")
      }, false);
      k.addEventListener("impress:stepleave", function(e) {
        e.target.classList.remove("present");
        e.target.classList.add("past")
      }, false)
    }, false);
    k.addEventListener("impress:init", function() {
      var e = "";
      k.addEventListener("impress:stepenter", function(n) {
        t.location.hash = e = "#/" + n.target.id
      }, false);
      t.addEventListener("hashchange", function() {
        if (t.location.hash !== e) {
          j(d())
        }
      }, false);
      j(d() || T[0], 0)
    }, false);
    m.classList.add("impress-disabled");
    return b["impress-root-" + n] = {
      init: P,
      "goto": j,
      next: I,
      prev: F
    }
  };
  S.supported = y
})(document, window);
(function(e, t) {
  "use strict";
  var n = function(e, t) {
    var n = null;
    return function() {
      var r = this,
        i = arguments;
      clearTimeout(n);
      n = setTimeout(function() {
        e.apply(r, i)
      }, t)
    }
  };
  e.addEventListener("impress:init", function(r) {
    var i = r.detail.api;
    e.addEventListener("keydown", function(e) {
      if (e.keyCode === 9 || e.keyCode >= 32 && e.keyCode <= 34 || e.keyCode >= 37 && e.keyCode <= 40) {
        e.preventDefault()
      }
    }, false);
    e.addEventListener("keyup", function(e) {
      if (e.keyCode === 9 || e.keyCode >= 32 && e.keyCode <= 34 || e.keyCode >= 37 && e.keyCode <= 40) {
        switch (e.keyCode) {
          case 33:
          case 37:
          case 38:
            i.prev();
            break;
          case 9:
          case 32:
          case 34:
          case 39:
          case 40:
            i.next();
            break
        }
        e.preventDefault()
      }
    }, false);
    e.addEventListener("click", function(t) {
      var n = t.target;
      while (n.tagName !== "A" && n !== e.documentElement) {
        n = n.parentNode
      }
      if (n.tagName === "A") {
        var r = n.getAttribute("href");
        if (r && r[0] === "#") {
          n = e.getElementById(r.slice(1))
        }
      }
      if (i.goto(n)) {
        t.stopImmediatePropagation();
        t.preventDefault()
      }
    }, false);
    e.addEventListener("click", function(t) {
      var n = t.target;
      while (!(n.classList.contains("step") && !n.classList.contains("active")) && n !== e.documentElement) {
        n = n.parentNode
      }
      if (i.goto(n)) {
        t.preventDefault()
      }
    }, false);
    e.addEventListener("touchstart", function(e) {
      if (e.touches.length === 1) {
        var n = e.touches[0].clientX,
          r = t.innerWidth * .3,
          s = null;
        if (n < r) {
          s = i.prev()
        } else if (n > t.innerWidth - r) {
          s = i.next()
        }
        if (s) {
          e.preventDefault()
        }
      }
    }, false);
    t.addEventListener("resize", n(function() {
      i.goto(e.querySelector(".active"), 500)
    }, 250), false)
  }, false)
})(document, window)
