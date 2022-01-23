(() => {
  "use strict";
  let t = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
      );
    },
  };
  let e = (t, e = 500, o = 0) => {
      t.classList.contains("_slide") ||
        (t.classList.add("_slide"),
        (t.style.transitionProperty = "height, margin, padding"),
        (t.style.transitionDuration = e + "ms"),
        (t.style.height = `${t.offsetHeight}px`),
        t.offsetHeight,
        (t.style.overflow = "hidden"),
        (t.style.height = o ? `${o}px` : "0px"),
        (t.style.paddingTop = 0),
        (t.style.paddingBottom = 0),
        (t.style.marginTop = 0),
        (t.style.marginBottom = 0),
        window.setTimeout(() => {
          (t.hidden = !o),
            !o && t.style.removeProperty("height"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            !o && t.style.removeProperty("overflow"),
            t.style.removeProperty("transition-duration"),
            t.style.removeProperty("transition-property"),
            t.classList.remove("_slide");
        }, e));
    },
    o = (t, e = 500, o = 0) => {
      if (!t.classList.contains("_slide")) {
        t.classList.add("_slide"),
          (t.hidden = !t.hidden && null),
          o && t.style.removeProperty("height");
        let a = t.offsetHeight;
        (t.style.overflow = "hidden"),
          (t.style.height = o ? `${o}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          t.offsetHeight,
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = a + "px"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            t.style.removeProperty("height"),
              t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide");
          }, e);
      }
    },
    a = !0,
    s = (t = 500) => {
      let e = document.querySelector("body");
      if (a) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < o.length; t++) {
            o[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (a = !1),
          setTimeout(function () {
            a = !0;
          }, t);
      }
    },
    r = (t = 500) => {
      let e = document.querySelector("body");
      if (a) {
        let o = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < o.length; t++) {
          o[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (a = !1),
          setTimeout(function () {
            a = !0;
          }, t);
      }
    };
  function n(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function i(t) {
    return t.filter(function (t, e, o) {
      return o.indexOf(t) === e;
    });
  }
  function l(t, e) {
    const o = Array.from(t).filter(function (t, o, a) {
      if (t.dataset[e]) return t.dataset[e].split(",")[0];
    });
    if (o.length) {
      const t = [];
      o.forEach((o) => {
        const a = {},
          s = o.dataset[e].split(",");
        (a.value = s[0]),
          (a.type = s[1] ? s[1].trim() : "max"),
          (a.item = o),
          t.push(a);
      });
      let a = t.map(function (t) {
        return (
          "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
        );
      });
      a = i(a);
      const s = [];
      if (a.length)
        return (
          a.forEach((e) => {
            const o = e.split(","),
              a = o[1],
              r = o[2],
              n = window.matchMedia(o[0]),
              i = t.filter(function (t) {
                if (t.value === a && t.type === r) return !0;
              });
            s.push({ itemsArray: i, matchMedia: n });
          }),
          s
        );
    }
  }
  let c = (t, e = !1, o = 500, a = 0) => {
    const r = document.querySelector(t);
    if (r) {
      let i = "",
        l = 0;
      e &&
        ((i = "header.header"), (l = document.querySelector(i).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: o,
        header: i,
        offset: a,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (s(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(r, "", c);
      else {
        let t = r.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? t - l : t, behavior: "smooth" });
      }
      n(`[gotoBlock]: Юхуу...едем к ${t}`);
    } else n(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
  };
  class d {
    constructor(t) {
      (this.config = Object.assign({ logging: !0 }, t)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(t) {
      if (t.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${t.length})...`
        ),
          i(
            Array.from(t).map(function (t) {
              return `${
                t.dataset.watchRoot ? t.dataset.watchRoot : null
              }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
            })
          ).forEach((e) => {
            let o = e.split("|"),
              a = { root: o[0], margin: o[1], threshold: o[2] },
              s = Array.from(t).filter(function (t) {
                let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                  o = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                  s = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                if (
                  String(e) === a.root &&
                  String(o) === a.margin &&
                  String(s) === a.threshold
                )
                  return t;
              }),
              r = this.getScrollWatcherConfig(a);
            this.scrollWatcherInit(s, r);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(t) {
      let e = {};
      if (
        (document.querySelector(t.root)
          ? (e.root = document.querySelector(t.root))
          : "null" !== t.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${t.root} нет на странице`
            ),
        (e.rootMargin = t.margin),
        !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
      ) {
        if ("prx" === t.threshold) {
          t.threshold = [];
          for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
        } else t.threshold = t.threshold.split(",");
        return (e.threshold = t.threshold), e;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(t) {
      this.observer = new IntersectionObserver((t, e) => {
        t.forEach((t) => {
          this.scrollWatcherCallback(t, e);
        });
      }, t);
    }
    scrollWatcherInit(t, e) {
      this.scrollWatcherCreate(e), t.forEach((t) => this.observer.observe(t));
    }
    scrollWatcherIntersecting(t, e) {
      t.isIntersecting
        ? (!e.classList.contains("_watcher-view") &&
            e.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${e.classList}, добавил класс _watcher-view`
          ))
        : (e.classList.contains("_watcher-view") &&
            e.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${e.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(t, e) {
      e.unobserve(t),
        this.scrollWatcherLogging(`Я перестал следить за ${t.classList}`);
    }
    scrollWatcherLogging(t) {
      this.config.logging && n(`[Наблюдатель]: ${t}`);
    }
    scrollWatcherCallback(t, e) {
      const o = t.target;
      this.scrollWatcherIntersecting(t, o),
        o.hasAttribute("data-watch-once") &&
          t.isIntersecting &&
          this.scrollWatcherOff(o, e),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: t } })
        );
    }
  }
  let h = !1;
  setTimeout(() => {
    if (h) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    t.any() && document.documentElement.classList.add("touch"),
    (function () {
      let t = document.querySelector(".icon-menu");
      t &&
        t.addEventListener("click", function (t) {
          a &&
            (((t = 500) => {
              document.documentElement.classList.contains("lock") ? s(t) : r(t);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      if (document.querySelectorAll("[data-fullscreen]").length && t.any()) {
        function t() {
          let t = 0.01 * window.innerHeight;
          document.documentElement.style.setProperty("--vh", `${t}px`);
        }
        window.addEventListener("resize", t), t();
      }
    })(),
    (function () {
      const t = document.querySelectorAll("[data-spollers]");
      if (t.length > 0) {
        const a = Array.from(t).filter(function (t, e, o) {
          return !t.dataset.spollers.split(",")[0];
        });
        a.length && r(a);
        let s = l(t, "spollers");
        function r(t, e = !1) {
          t.forEach((t) => {
            (t = e ? t.item : t),
              e.matches || !e
                ? (t.classList.add("_spoller-init"),
                  n(t),
                  t.addEventListener("click", i))
                : (t.classList.remove("_spoller-init"),
                  n(t, !1),
                  t.removeEventListener("click", i));
          });
        }
        function n(t, e = !0) {
          const o = t.querySelectorAll("[data-spoller]");
          o.length > 0 &&
            o.forEach((t) => {
              e
                ? (t.removeAttribute("tabindex"),
                  t.classList.contains("_spoller-active") ||
                    (t.nextElementSibling.hidden = !0))
                : (t.setAttribute("tabindex", "-1"),
                  (t.nextElementSibling.hidden = !1));
            });
        }
        function i(t) {
          const a = t.target;
          if (a.closest("[data-spoller]")) {
            const s = a.closest("[data-spoller]"),
              r = s.closest("[data-spollers]"),
              n = !!r.hasAttribute("data-one-spoller");
            r.querySelectorAll("._slide").length ||
              (n && !s.classList.contains("_spoller-active") && c(r),
              s.classList.toggle("_spoller-active"),
              ((t, a = 500) => {
                t.hidden ? o(t, a) : e(t, a);
              })(s.nextElementSibling, 500)),
              t.preventDefault();
          }
        }
        function c(t) {
          const o = t.querySelector("[data-spoller]._spoller-active");
          o &&
            (o.classList.remove("_spoller-active"),
            e(o.nextElementSibling, 500));
        }
        s &&
          s.length &&
          s.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              r(t.itemsArray, t.matchMedia);
            }),
              r(t.itemsArray, t.matchMedia);
          });
      }
    })(),
    (function () {
      const t = document.querySelectorAll("[data-tabs]");
      let a = [];
      if (t.length > 0) {
        const e = location.hash.replace("#", "");
        e.startsWith("tab-") && (a = e.replace("tab-", "").split("-")),
          t.forEach((t, e) => {
            t.classList.add("_tab-init"),
              t.setAttribute("data-tabs-index", e),
              t.addEventListener("click", r),
              (function (t) {
                const e = t.querySelectorAll("[data-tabs-titles]>*"),
                  o = t.querySelectorAll("[data-tabs-body]>*"),
                  s = t.dataset.tabsIndex,
                  r = a[0] == s;
                if (r) {
                  t.querySelector(
                    "[data-tabs-titles]>._tab-active"
                  ).classList.remove("_tab-active");
                }
                o.length > 0 &&
                  o.forEach((t, o) => {
                    e[o].setAttribute("data-tabs-title", ""),
                      t.setAttribute("data-tabs-item", ""),
                      r && o == a[1] && e[o].classList.add("_tab-active"),
                      (t.hidden = !e[o].classList.contains("_tab-active"));
                  });
              })(t);
          });
        let o = l(t, "tabs");
        o &&
          o.length &&
          o.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              s(t.itemsArray, t.matchMedia);
            }),
              s(t.itemsArray, t.matchMedia);
          });
      }
      function s(t, e) {
        t.forEach((t) => {
          const o = (t = t.item).querySelector("[data-tabs-titles]"),
            a = t.querySelectorAll("[data-tabs-title]"),
            s = t.querySelector("[data-tabs-body]");
          t.querySelectorAll("[data-tabs-item]").forEach((r, n) => {
            e.matches
              ? (s.append(a[n]), s.append(r), t.classList.add("_tab-spoller"))
              : (o.append(a[n]), t.classList.remove("_tab-spoller"));
          });
        });
      }
      function r(t) {
        const a = t.target;
        if (a.closest("[data-tabs-title]")) {
          const s = a.closest("[data-tabs-title]"),
            r = s.closest("[data-tabs]");
          if (
            !s.classList.contains("_tab-active") &&
            !r.querySelectorAll("._slide").length
          ) {
            const t = r.querySelector("[data-tabs-title]._tab-active");
            t && t.classList.remove("_tab-active"),
              s.classList.add("_tab-active"),
              (function (t) {
                const a = t.querySelectorAll("[data-tabs-title]"),
                  s = t.querySelectorAll("[data-tabs-item]"),
                  r = t.dataset.tabsIndex,
                  n = (function (t) {
                    if (t.hasAttribute("data-tabs-animate"))
                      return t.dataset.tabsAnimate > 0
                        ? t.dataset.tabsAnimate
                        : 500;
                  })(t);
                s.length > 0 &&
                  s.forEach((t, s) => {
                    a[s].classList.contains("_tab-active")
                      ? (n ? o(t, n) : (t.hidden = !1),
                        t.closest(".popup") ||
                          (location.hash = `tab-${r}-${s}`))
                      : n
                      ? e(t, n)
                      : (t.hidden = !0);
                  });
              })(r);
          }
          t.preventDefault();
        }
      }
    })(),
    new d({}),
    (function () {
      function t(t) {
        if ("click" === t.type) {
          const e = t.target;
          if (e.closest("[data-goto]")) {
            const o = e.closest("[data-goto]"),
              a = o.dataset.goto ? o.dataset.goto : "",
              s = !!o.hasAttribute("data-goto-header"),
              r = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
            c(a, s, r), t.preventDefault();
          }
        } else if ("watcherCallback" === t.type && t.detail) {
          const e = t.detail.entry,
            o = e.target;
          if ("navigator" === o.dataset.watch) {
            const t = o.id,
              a =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${t}"]`));
            e.isIntersecting
              ? a && a.classList.add("_navigator-active")
              : a && a.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t);
    })();
})();
