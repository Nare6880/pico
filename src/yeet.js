/*! @sentry/browser 6.18.2 (22f518e) | https://github.com/getsentry/sentry-javascript */
var Sentry = (function (t) {
	var n = function (t, r) {
		return (
			(n =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function (t, n) {
						t.__proto__ = n;
					}) ||
				function (t, n) {
					for (var r in n)
						Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
				}),
			n(t, r)
		);
	};
	function r(t, r) {
		if ("function" != typeof r && null !== r)
			throw new TypeError(
				"Class extends value " + String(r) + " is not a constructor or null"
			);
		function i() {
			this.constructor = t;
		}
		n(t, r),
			(t.prototype =
				null === r ? Object.create(r) : ((i.prototype = r.prototype), new i()));
	}
	var i,
		e = function () {
			return (
				(e =
					Object.assign ||
					function (t) {
						for (var n, r = 1, i = arguments.length; r < i; r++)
							for (var e in (n = arguments[r]))
								Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
						return t;
					}),
				e.apply(this, arguments)
			);
		};
	function o(t) {
		var n = "function" == typeof Symbol && Symbol.iterator,
			r = n && t[n],
			i = 0;
		if (r) return r.call(t);
		if (t && "number" == typeof t.length)
			return {
				next: function () {
					return (
						t && i >= t.length && (t = void 0), { value: t && t[i++], done: !t }
					);
				},
			};
		throw new TypeError(
			n ? "Object is not iterable." : "Symbol.iterator is not defined."
		);
	}
	function u(t, n) {
		var r = "function" == typeof Symbol && t[Symbol.iterator];
		if (!r) return t;
		var i,
			e,
			o = r.call(t),
			u = [];
		try {
			for (; (void 0 === n || n-- > 0) && !(i = o.next()).done; )
				u.push(i.value);
		} catch (t) {
			e = { error: t };
		} finally {
			try {
				i && !i.done && (r = o.return) && r.call(o);
			} finally {
				if (e) throw e.error;
			}
		}
		return u;
	}
	function a() {
		for (var t = [], n = 0; n < arguments.length; n++)
			t = t.concat(u(arguments[n]));
		return t;
	}
	(t.Severity = void 0),
		((i = t.Severity || (t.Severity = {})).Fatal = "fatal"),
		(i.Error = "error"),
		(i.Warning = "warning"),
		(i.Log = "log"),
		(i.Info = "info"),
		(i.Debug = "debug"),
		(i.Critical = "critical");
	var c = {};
	function s() {
		return "undefined" != typeof window
			? window
			: "undefined" != typeof self
			? self
			: c;
	}
	var f = Object.prototype.toString;
	function h(t) {
		switch (f.call(t)) {
			case "[object Error]":
			case "[object Exception]":
			case "[object DOMException]":
				return !0;
			default:
				return x(t, Error);
		}
	}
	function v(t, n) {
		return f.call(t) === "[object " + n + "]";
	}
	function d(t) {
		return v(t, "ErrorEvent");
	}
	function l(t) {
		return v(t, "DOMError");
	}
	function p(t) {
		return v(t, "String");
	}
	function y(t) {
		return null === t || ("object" != typeof t && "function" != typeof t);
	}
	function m(t) {
		return v(t, "Object");
	}
	function b(t) {
		return "undefined" != typeof Event && x(t, Event);
	}
	function w(t) {
		return "undefined" != typeof Element && x(t, Element);
	}
	function g(t) {
		return Boolean(t && t.then && "function" == typeof t.then);
	}
	function x(t, n) {
		try {
			return t instanceof n;
		} catch (t) {
			return !1;
		}
	}
	function E(t, n) {
		try {
			for (
				var r = t, i = [], e = 0, o = 0, u = " > ".length, a = void 0;
				r &&
				e++ < 5 &&
				!(
					"html" === (a = _(r, n)) ||
					(e > 1 && o + i.length * u + a.length >= 80)
				);

			)
				i.push(a), (o += a.length), (r = r.parentNode);
			return i.reverse().join(" > ");
		} catch (t) {
			return "<unknown>";
		}
	}
	function _(t, n) {
		var r,
			i,
			e,
			o,
			u,
			a = t,
			c = [];
		if (!a || !a.tagName) return "";
		c.push(a.tagName.toLowerCase());
		var s =
			n && n.length
				? n
						.filter(function (t) {
							return a.getAttribute(t);
						})
						.map(function (t) {
							return [t, a.getAttribute(t)];
						})
				: null;
		if (s && s.length)
			s.forEach(function (t) {
				c.push("[" + t[0] + '="' + t[1] + '"]');
			});
		else if ((a.id && c.push("#" + a.id), (r = a.className) && p(r)))
			for (i = r.split(/\s+/), u = 0; u < i.length; u++) c.push("." + i[u]);
		var f = ["type", "name", "title", "alt"];
		for (u = 0; u < f.length; u++)
			(e = f[u]), (o = a.getAttribute(e)) && c.push("[" + e + '="' + o + '"]');
		return c.join("");
	}
	var j =
		Object.setPrototypeOf ||
		({ __proto__: [] } instanceof Array
			? function (t, n) {
					return (t.__proto__ = n), t;
			  }
			: function (t, n) {
					for (var r in n)
						Object.prototype.hasOwnProperty.call(t, r) || (t[r] = n[r]);
					return t;
			  });
	var k = (function (t) {
			function n(n) {
				var r = this.constructor,
					i = t.call(this, n) || this;
				return (
					(i.message = n),
					(i.name = r.prototype.constructor.name),
					j(i, r.prototype),
					i
				);
			}
			return r(n, t), n;
		})(Error),
		S = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
	function O(t, n) {
		void 0 === n && (n = !1);
		var r = t.host,
			i = t.path,
			e = t.pass,
			o = t.port,
			u = t.projectId;
		return (
			t.protocol +
			"://" +
			t.publicKey +
			(n && e ? ":" + e : "") +
			"@" +
			r +
			(o ? ":" + o : "") +
			"/" +
			(i ? i + "/" : i) +
			u
		);
	}
	function T(t) {
		return (
			"user" in t && !("publicKey" in t) && (t.publicKey = t.user),
			{
				user: t.publicKey || "",
				protocol: t.protocol,
				publicKey: t.publicKey || "",
				pass: t.pass || "",
				host: t.host,
				port: t.port || "",
				path: t.path || "",
				projectId: t.projectId,
			}
		);
	}
	function D(t) {
		var n =
			"string" == typeof t
				? (function (t) {
						var n = S.exec(t);
						if (!n) throw new k("Invalid Sentry Dsn: " + t);
						var r = u(n.slice(1), 6),
							i = r[0],
							e = r[1],
							o = r[2],
							a = void 0 === o ? "" : o,
							c = r[3],
							s = r[4],
							f = void 0 === s ? "" : s,
							h = "",
							v = r[5],
							d = v.split("/");
						if (
							(d.length > 1 && ((h = d.slice(0, -1).join("/")), (v = d.pop())),
							v)
						) {
							var l = v.match(/^\d+/);
							l && (v = l[0]);
						}
						return T({
							host: c,
							pass: a,
							path: h,
							projectId: v,
							port: f,
							protocol: i,
							publicKey: e,
						});
				  })(t)
				: T(t);
		return n;
	}
	var R = ["fatal", "error", "warning", "log", "info", "debug", "critical"],
		N = s(),
		I = "Sentry Logger ";
	function M(t) {
		var n = s();
		if (!("console" in n)) return t();
		var r = n.console,
			i = {};
		["debug", "info", "warn", "error", "log", "assert"].forEach(function (t) {
			t in n.console &&
				r[t].__sentry_original__ &&
				((i[t] = r[t]), (r[t] = r[t].__sentry_original__));
		});
		var e = t();
		return (
			Object.keys(i).forEach(function (t) {
				r[t] = i[t];
			}),
			e
		);
	}
	var q = (function () {
		function t() {
			this.t = !1;
		}
		return (
			(t.prototype.disable = function () {
				this.t = !1;
			}),
			(t.prototype.enable = function () {
				this.t = !0;
			}),
			(t.prototype.log = function () {
				for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
				this.t &&
					M(function () {
						var n;
						(n = N.console).log.apply(n, a([I + "[Log]:"], t));
					});
			}),
			(t.prototype.warn = function () {
				for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
				this.t &&
					M(function () {
						var n;
						(n = N.console).warn.apply(n, a([I + "[Warn]:"], t));
					});
			}),
			(t.prototype.error = function () {
				for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
				this.t &&
					M(function () {
						var n;
						(n = N.console).error.apply(n, a([I + "[Error]:"], t));
					});
			}),
			t
		);
	})();
	N.__SENTRY__ = N.__SENTRY__ || {};
	var A = N.__SENTRY__.logger || (N.__SENTRY__.logger = new q());
	function C(t) {
		if (!t.length) return [];
		var n = t,
			r = n[0].function || "",
			i = n[n.length - 1].function || "";
		return (
			(-1 === r.indexOf("captureMessage") &&
				-1 === r.indexOf("captureException")) ||
				(n = n.slice(1)),
			-1 !== i.indexOf("sentryWrapped") && (n = n.slice(0, -1)),
			n
				.slice(0, 50)
				.map(function (t) {
					return e(e({}, t), {
						filename: t.filename || n[0].filename,
						function: t.function || "?",
					});
				})
				.reverse()
		);
	}
	var L = "<anonymous>";
	function U(t) {
		try {
			return (t && "function" == typeof t && t.name) || L;
		} catch (t) {
			return L;
		}
	}
	function H(t, n) {
		return (
			void 0 === n && (n = 0),
			"string" != typeof t || 0 === n || t.length <= n
				? t
				: t.substr(0, n) + "..."
		);
	}
	function F(t, n) {
		if (!Array.isArray(t)) return "";
		for (var r = [], i = 0; i < t.length; i++) {
			var e = t[i];
			try {
				r.push(String(e));
			} catch (t) {
				r.push("[value cannot be serialized]");
			}
		}
		return r.join(n);
	}
	function P(t, n) {
		return (
			!!p(t) &&
			(v(n, "RegExp") ? n.test(t) : "string" == typeof n && -1 !== t.indexOf(n))
		);
	}
	function X(t, n, r) {
		if (n in t) {
			var i = t[n],
				e = r(i);
			if ("function" == typeof e)
				try {
					W(e, i);
				} catch (t) {}
			t[n] = e;
		}
	}
	function B(t, n, r) {
		Object.defineProperty(t, n, { value: r, writable: !0, configurable: !0 });
	}
	function W(t, n) {
		var r = n.prototype || {};
		(t.prototype = n.prototype = r), B(t, "__sentry_original__", n);
	}
	function $(t) {
		return t.__sentry_original__;
	}
	function J(t) {
		if (h(t)) {
			var n = t,
				r = { message: n.message, name: n.name, stack: n.stack };
			for (var i in n)
				Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
			return r;
		}
		if (b(t)) {
			var e = t,
				o = {};
			o.type = e.type;
			try {
				o.target = w(e.target)
					? E(e.target)
					: Object.prototype.toString.call(e.target);
			} catch (t) {
				o.target = "<unknown>";
			}
			try {
				o.currentTarget = w(e.currentTarget)
					? E(e.currentTarget)
					: Object.prototype.toString.call(e.currentTarget);
			} catch (t) {
				o.currentTarget = "<unknown>";
			}
			for (var u in ("undefined" != typeof CustomEvent &&
				x(t, CustomEvent) &&
				(o.detail = e.detail),
			e))
				Object.prototype.hasOwnProperty.call(e, u) && (o[u] = e[u]);
			return o;
		}
		return t;
	}
	function z(t) {
		return (function (t) {
			return ~-encodeURI(t).split(/%..|./).length;
		})(JSON.stringify(t));
	}
	function G(t, n, r) {
		void 0 === n && (n = 3), void 0 === r && (r = 102400);
		var i = Q(t, n);
		return z(i) > r ? G(t, n - 1, r) : i;
	}
	function K(t, n) {
		return "domain" === n && t && "object" == typeof t && t.i
			? "[Domain]"
			: "domainEmitter" === n
			? "[DomainEmitter]"
			: "undefined" != typeof global && t === global
			? "[Global]"
			: "undefined" != typeof window && t === window
			? "[Window]"
			: "undefined" != typeof document && t === document
			? "[Document]"
			: m((r = t)) &&
			  "nativeEvent" in r &&
			  "preventDefault" in r &&
			  "stopPropagation" in r
			? "[SyntheticEvent]"
			: "number" == typeof t && t != t
			? "[NaN]"
			: void 0 === t
			? "[undefined]"
			: "function" == typeof t
			? "[Function: " + U(t) + "]"
			: "symbol" == typeof t
			? "[" + String(t) + "]"
			: "bigint" == typeof t
			? "[BigInt: " + String(t) + "]"
			: t;
		var r;
	}
	function V(t, n, r, i) {
		var e, o;
		void 0 === r && (r = 1 / 0),
			void 0 === i &&
				((e = "function" == typeof WeakSet),
				(o = e ? new WeakSet() : []),
				(i = [
					function (t) {
						if (e) return !!o.has(t) || (o.add(t), !1);
						for (var n = 0; n < o.length; n++) if (o[n] === t) return !0;
						return o.push(t), !1;
					},
					function (t) {
						if (e) o.delete(t);
						else
							for (var n = 0; n < o.length; n++)
								if (o[n] === t) {
									o.splice(n, 1);
									break;
								}
					},
				]));
		var a = u(i, 2),
			c = a[0],
			s = a[1];
		if (0 === r)
			return (function (t) {
				if ("string" == typeof t) return t;
				var n = Object.prototype.toString.call(t);
				if ("[object Object]" === n) return "[Object]";
				if ("[object Array]" === n) return "[Array]";
				var r = K(t);
				return y(r) ? r : n;
			})(n);
		if (null != n && "function" == typeof n.toJSON) return n.toJSON();
		var f = K(n, t);
		if (y(f)) return f;
		var h = J(n),
			v = Array.isArray(n) ? [] : {};
		if (c(n)) return "[Circular ~]";
		for (var d in h)
			if (Object.prototype.hasOwnProperty.call(h, d)) {
				var l = h[d];
				v[d] = V(d, l, r - 1, i);
			}
		return s(n), v;
	}
	function Q(t, n) {
		try {
			return V("", t, n);
		} catch (t) {
			return "**non-serializable**";
		}
	}
	function Y(t, n) {
		void 0 === n && (n = 40);
		var r = Object.keys(J(t));
		if ((r.sort(), !r.length)) return "[object has no keys]";
		if (r[0].length >= n) return H(r[0], n);
		for (var i = r.length; i > 0; i--) {
			var e = r.slice(0, i).join(", ");
			if (!(e.length > n)) return i === r.length ? e : H(e, n);
		}
		return "";
	}
	function Z(t) {
		var n, r;
		if (m(t)) {
			var i = t,
				e = {};
			try {
				for (var u = o(Object.keys(i)), a = u.next(); !a.done; a = u.next()) {
					var c = a.value;
					void 0 !== i[c] && (e[c] = Z(i[c]));
				}
			} catch (t) {
				n = { error: t };
			} finally {
				try {
					a && !a.done && (r = u.return) && r.call(u);
				} finally {
					if (n) throw n.error;
				}
			}
			return e;
		}
		return Array.isArray(t) ? t.map(Z) : t;
	}
	function tt() {
		if (!("fetch" in s())) return !1;
		try {
			return new Headers(), new Request(""), new Response(), !0;
		} catch (t) {
			return !1;
		}
	}
	function nt(t) {
		return (
			t && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
		);
	}
	function rt() {
		if (!tt()) return !1;
		try {
			return new Request("_", { referrerPolicy: "origin" }), !0;
		} catch (t) {
			return !1;
		}
	}
	var it,
		et = s(),
		ot = {},
		ut = {};
	function at(t) {
		if (!ut[t])
			switch (((ut[t] = !0), t)) {
				case "console":
					!(function () {
						if (!("console" in et)) return;
						["debug", "info", "warn", "error", "log", "assert"].forEach(
							function (t) {
								t in et.console &&
									X(et.console, t, function (n) {
										return function () {
											for (var r = [], i = 0; i < arguments.length; i++)
												r[i] = arguments[i];
											st("console", { args: r, level: t }),
												n && n.apply(et.console, r);
										};
									});
							}
						);
					})();
					break;
				case "dom":
					!(function () {
						if (!("document" in et)) return;
						var t = st.bind(null, "dom"),
							n = lt(t, !0);
						et.document.addEventListener("click", n, !1),
							et.document.addEventListener("keypress", n, !1),
							["EventTarget", "Node"].forEach(function (n) {
								var r = et[n] && et[n].prototype;
								r &&
									r.hasOwnProperty &&
									r.hasOwnProperty("addEventListener") &&
									(X(r, "addEventListener", function (n) {
										return function (r, i, e) {
											if ("click" === r || "keypress" == r)
												try {
													var o = this,
														u = (o.__sentry_instrumentation_handlers__ =
															o.__sentry_instrumentation_handlers__ || {}),
														a = (u[r] = u[r] || { refCount: 0 });
													if (!a.handler) {
														var c = lt(t);
														(a.handler = c), n.call(this, r, c, e);
													}
													a.refCount += 1;
												} catch (t) {}
											return n.call(this, r, i, e);
										};
									}),
									X(r, "removeEventListener", function (t) {
										return function (n, r, i) {
											if ("click" === n || "keypress" == n)
												try {
													var e = this,
														o = e.__sentry_instrumentation_handlers__ || {},
														u = o[n];
													u &&
														((u.refCount -= 1),
														u.refCount <= 0 &&
															(t.call(this, n, u.handler, i),
															(u.handler = void 0),
															delete o[n]),
														0 === Object.keys(o).length &&
															delete e.__sentry_instrumentation_handlers__);
												} catch (t) {}
											return t.call(this, n, r, i);
										};
									}));
							});
					})();
					break;
				case "xhr":
					!(function () {
						if (!("XMLHttpRequest" in et)) return;
						var t = XMLHttpRequest.prototype;
						X(t, "open", function (t) {
							return function () {
								for (var n = [], r = 0; r < arguments.length; r++)
									n[r] = arguments[r];
								var i = this,
									e = n[1],
									o = (i.__sentry_xhr__ = {
										method: p(n[0]) ? n[0].toUpperCase() : n[0],
										url: n[1],
									});
								p(e) &&
									"POST" === o.method &&
									e.match(/sentry_key/) &&
									(i.__sentry_own_request__ = !0);
								var u = function () {
									if (4 === i.readyState) {
										try {
											o.status_code = i.status;
										} catch (t) {}
										st("xhr", {
											args: n,
											endTimestamp: Date.now(),
											startTimestamp: Date.now(),
											xhr: i,
										});
									}
								};
								return (
									"onreadystatechange" in i &&
									"function" == typeof i.onreadystatechange
										? X(i, "onreadystatechange", function (t) {
												return function () {
													for (var n = [], r = 0; r < arguments.length; r++)
														n[r] = arguments[r];
													return u(), t.apply(i, n);
												};
										  })
										: i.addEventListener("readystatechange", u),
									t.apply(i, n)
								);
							};
						}),
							X(t, "send", function (t) {
								return function () {
									for (var n = [], r = 0; r < arguments.length; r++)
										n[r] = arguments[r];
									return (
										this.__sentry_xhr__ &&
											void 0 !== n[0] &&
											(this.__sentry_xhr__.body = n[0]),
										st("xhr", {
											args: n,
											startTimestamp: Date.now(),
											xhr: this,
										}),
										t.apply(this, n)
									);
								};
							});
					})();
					break;
				case "fetch":
					!(function () {
						if (
							!(function () {
								if (!tt()) return !1;
								var t = s();
								if (nt(t.fetch)) return !0;
								var n = !1,
									r = t.document;
								if (r && "function" == typeof r.createElement)
									try {
										var i = r.createElement("iframe");
										(i.hidden = !0),
											r.head.appendChild(i),
											i.contentWindow &&
												i.contentWindow.fetch &&
												(n = nt(i.contentWindow.fetch)),
											r.head.removeChild(i);
									} catch (t) {}
								return n;
							})()
						)
							return;
						X(et, "fetch", function (t) {
							return function () {
								for (var n = [], r = 0; r < arguments.length; r++)
									n[r] = arguments[r];
								var i = {
									args: n,
									fetchData: { method: ft(n), url: ht(n) },
									startTimestamp: Date.now(),
								};
								return (
									st("fetch", e({}, i)),
									t.apply(et, n).then(
										function (t) {
											return (
												st(
													"fetch",
													e(e({}, i), { endTimestamp: Date.now(), response: t })
												),
												t
											);
										},
										function (t) {
											throw (
												(st(
													"fetch",
													e(e({}, i), { endTimestamp: Date.now(), error: t })
												),
												t)
											);
										}
									)
								);
							};
						});
					})();
					break;
				case "history":
					!(function () {
						if (
							!(function () {
								var t = s(),
									n = t.chrome,
									r = n && n.app && n.app.runtime,
									i =
										"history" in t &&
										!!t.history.pushState &&
										!!t.history.replaceState;
								return !r && i;
							})()
						)
							return;
						var t = et.onpopstate;
						function n(t) {
							return function () {
								for (var n = [], r = 0; r < arguments.length; r++)
									n[r] = arguments[r];
								var i = n.length > 2 ? n[2] : void 0;
								if (i) {
									var e = it,
										o = String(i);
									(it = o), st("history", { from: e, to: o });
								}
								return t.apply(this, n);
							};
						}
						(et.onpopstate = function () {
							for (var n = [], r = 0; r < arguments.length; r++)
								n[r] = arguments[r];
							var i = et.location.href,
								e = it;
							if (((it = i), st("history", { from: e, to: i }), t))
								try {
									return t.apply(this, n);
								} catch (t) {}
						}),
							X(et.history, "pushState", n),
							X(et.history, "replaceState", n);
					})();
					break;
				case "error":
					(pt = et.onerror),
						(et.onerror = function (t, n, r, i, e) {
							return (
								st("error", { column: i, error: e, line: r, msg: t, url: n }),
								!!pt && pt.apply(this, arguments)
							);
						});
					break;
				case "unhandledrejection":
					(yt = et.onunhandledrejection),
						(et.onunhandledrejection = function (t) {
							return (
								st("unhandledrejection", t), !yt || yt.apply(this, arguments)
							);
						});
					break;
				default:
					A.warn("unknown instrumentation type:", t);
			}
	}
	function ct(t, n) {
		(ot[t] = ot[t] || []), ot[t].push(n), at(t);
	}
	function st(t, n) {
		var r, i;
		if (t && ot[t])
			try {
				for (var e = o(ot[t] || []), u = e.next(); !u.done; u = e.next()) {
					var a = u.value;
					try {
						a(n);
					} catch (t) {
						0;
					}
				}
			} catch (t) {
				r = { error: t };
			} finally {
				try {
					u && !u.done && (i = e.return) && i.call(e);
				} finally {
					if (r) throw r.error;
				}
			}
	}
	function ft(t) {
		return (
			void 0 === t && (t = []),
			"Request" in et && x(t[0], Request) && t[0].method
				? String(t[0].method).toUpperCase()
				: t[1] && t[1].method
				? String(t[1].method).toUpperCase()
				: "GET"
		);
	}
	function ht(t) {
		return (
			void 0 === t && (t = []),
			"string" == typeof t[0]
				? t[0]
				: "Request" in et && x(t[0], Request)
				? t[0].url
				: String(t[0])
		);
	}
	var vt, dt;
	function lt(t, n) {
		return (
			void 0 === n && (n = !1),
			function (r) {
				if (
					r &&
					dt !== r &&
					!(function (t) {
						if ("keypress" !== t.type) return !1;
						try {
							var n = t.target;
							if (!n || !n.tagName) return !0;
							if (
								"INPUT" === n.tagName ||
								"TEXTAREA" === n.tagName ||
								n.isContentEditable
							)
								return !1;
						} catch (t) {}
						return !0;
					})(r)
				) {
					var i = "keypress" === r.type ? "input" : r.type;
					(void 0 === vt ||
						(function (t, n) {
							if (!t) return !0;
							if (t.type !== n.type) return !0;
							try {
								if (t.target !== n.target) return !0;
							} catch (t) {}
							return !1;
						})(dt, r)) &&
						(t({ event: r, name: i, global: n }), (dt = r)),
						clearTimeout(vt),
						(vt = et.setTimeout(function () {
							vt = void 0;
						}, 1e3));
				}
			}
		);
	}
	var pt = null;
	var yt = null;
	function mt() {
		var t = s(),
			n = t.crypto || t.msCrypto;
		if (void 0 !== n && n.getRandomValues) {
			var r = new Uint16Array(8);
			n.getRandomValues(r),
				(r[3] = (4095 & r[3]) | 16384),
				(r[4] = (16383 & r[4]) | 32768);
			var i = function (t) {
				for (var n = t.toString(16); n.length < 4; ) n = "0" + n;
				return n;
			};
			return (
				i(r[0]) +
				i(r[1]) +
				i(r[2]) +
				i(r[3]) +
				i(r[4]) +
				i(r[5]) +
				i(r[6]) +
				i(r[7])
			);
		}
		return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (t) {
			var n = (16 * Math.random()) | 0;
			return ("x" === t ? n : (3 & n) | 8).toString(16);
		});
	}
	function bt(t) {
		if (!t) return {};
		var n = t.match(
			/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
		);
		if (!n) return {};
		var r = n[6] || "",
			i = n[8] || "";
		return { host: n[4], path: n[5], protocol: n[2], relative: n[5] + r + i };
	}
	function wt(t) {
		return t.exception && t.exception.values ? t.exception.values[0] : void 0;
	}
	function gt(t) {
		var n = t.message,
			r = t.event_id;
		if (n) return n;
		var i = wt(t);
		return i
			? i.type && i.value
				? i.type + ": " + i.value
				: i.type || i.value || r || "<unknown>"
			: r || "<unknown>";
	}
	function xt(t, n, r) {
		var i = (t.exception = t.exception || {}),
			e = (i.values = i.values || []),
			o = (e[0] = e[0] || {});
		o.value || (o.value = n || ""), o.type || (o.type = r || "Error");
	}
	function Et(t, n) {
		var r = wt(t);
		if (r) {
			var i = r.mechanism;
			if (
				((r.mechanism = e(e(e({}, { type: "generic", handled: !0 }), i), n)),
				n && "data" in n)
			) {
				var o = e(e({}, i && i.data), n.data);
				r.mechanism.data = o;
			}
		}
	}
	function _t(t) {
		if (t && t.__sentry_captured__) return !0;
		try {
			B(t, "__sentry_captured__", !0);
		} catch (t) {}
		return !1;
	}
	function jt(t) {
		return new St(function (n) {
			n(t);
		});
	}
	function kt(t) {
		return new St(function (n, r) {
			r(t);
		});
	}
	var St = (function () {
		function t(t) {
			var n = this;
			(this.o = 0),
				(this.u = []),
				(this.h = function (t) {
					n.v(1, t);
				}),
				(this.l = function (t) {
					n.v(2, t);
				}),
				(this.v = function (t, r) {
					0 === n.o &&
						(g(r) ? r.then(n.h, n.l) : ((n.o = t), (n.p = r), n.m()));
				}),
				(this.m = function () {
					if (0 !== n.o) {
						var t = n.u.slice();
						(n.u = []),
							t.forEach(function (t) {
								t[0] ||
									(1 === n.o && t[1](n.p), 2 === n.o && t[2](n.p), (t[0] = !0));
							});
					}
				});
			try {
				t(this.h, this.l);
			} catch (t) {
				this.l(t);
			}
		}
		return (
			(t.prototype.then = function (n, r) {
				var i = this;
				return new t(function (t, e) {
					i.u.push([
						!1,
						function (r) {
							if (n)
								try {
									t(n(r));
								} catch (t) {
									e(t);
								}
							else t(r);
						},
						function (n) {
							if (r)
								try {
									t(r(n));
								} catch (t) {
									e(t);
								}
							else e(n);
						},
					]),
						i.m();
				});
			}),
			(t.prototype.catch = function (t) {
				return this.then(function (t) {
					return t;
				}, t);
			}),
			(t.prototype.finally = function (n) {
				var r = this;
				return new t(function (t, i) {
					var e, o;
					return r
						.then(
							function (t) {
								(o = !1), (e = t), n && n();
							},
							function (t) {
								(o = !0), (e = t), n && n();
							}
						)
						.then(function () {
							o ? i(e) : t(e);
						});
				});
			}),
			t
		);
	})();
	function Ot(t) {
		var n = [];
		function r(t) {
			return n.splice(n.indexOf(t), 1)[0];
		}
		return {
			$: n,
			add: function (i) {
				if (!(void 0 === t || n.length < t))
					return kt(new k("Not adding Promise due to buffer limit reached."));
				var e = i();
				return (
					-1 === n.indexOf(e) && n.push(e),
					e
						.then(function () {
							return r(e);
						})
						.then(null, function () {
							return r(e).then(null, function () {});
						}),
					e
				);
			},
			drain: function (t) {
				return new St(function (r, i) {
					var e = n.length;
					if (!e) return r(!0);
					var o = setTimeout(function () {
						t && t > 0 && r(!1);
					}, t);
					n.forEach(function (t) {
						jt(t).then(function () {
							--e || (clearTimeout(o), r(!0));
						}, i);
					});
				});
			},
		};
	}
	function Tt(n) {
		return "warn" === n
			? t.Severity.Warning
			: (function (t) {
					return -1 !== R.indexOf(t);
			  })(n)
			? n
			: t.Severity.Log;
	}
	var Dt = {
		nowSeconds: function () {
			return Date.now() / 1e3;
		},
	};
	var Rt = (function () {
			var t = s().performance;
			if (t && t.now)
				return {
					now: function () {
						return t.now();
					},
					timeOrigin: Date.now() - t.now(),
				};
		})(),
		Nt =
			void 0 === Rt
				? Dt
				: {
						nowSeconds: function () {
							return (Rt.timeOrigin + Rt.now()) / 1e3;
						},
				  },
		It = Dt.nowSeconds.bind(Dt),
		Mt = Nt.nowSeconds.bind(Nt);
	function qt(t, n) {
		return void 0 === n && (n = []), [t, n];
	}
	function At(t) {
		var n = u(t, 2),
			r = n[0],
			i = n[1],
			e = JSON.stringify(r);
		return i.reduce(function (t, n) {
			var r = u(n, 2),
				i = r[0],
				e = r[1],
				o = y(e) ? String(e) : JSON.stringify(e);
			return t + "\n" + JSON.stringify(i) + "\n" + o;
		}, e);
	}
	!(function () {
		var t = s().performance;
		if (t && t.now) {
			var n = 36e5,
				r = t.now(),
				i = Date.now(),
				e = t.timeOrigin ? Math.abs(t.timeOrigin + r - i) : n,
				o = e < n,
				u = t.timing && t.timing.navigationStart,
				a = "number" == typeof u ? Math.abs(u + r - i) : n;
			(o || a < n) && e <= a && t.timeOrigin;
		}
	})();
	var Ct = (function () {
		function t() {
			(this.g = !1),
				(this._ = []),
				(this.j = []),
				(this.k = []),
				(this.S = {}),
				(this.O = {}),
				(this.T = {}),
				(this.D = {}),
				(this.R = {});
		}
		return (
			(t.clone = function (n) {
				var r = new t();
				return (
					n &&
						((r.k = a(n.k)),
						(r.O = e({}, n.O)),
						(r.T = e({}, n.T)),
						(r.D = e({}, n.D)),
						(r.S = n.S),
						(r.N = n.N),
						(r.I = n.I),
						(r.M = n.M),
						(r.q = n.q),
						(r.A = n.A),
						(r.j = a(n.j)),
						(r.C = n.C)),
					r
				);
			}),
			(t.prototype.addScopeListener = function (t) {
				this._.push(t);
			}),
			(t.prototype.addEventProcessor = function (t) {
				return this.j.push(t), this;
			}),
			(t.prototype.setUser = function (t) {
				return (
					(this.S = t || {}),
					this.M && this.M.update({ user: t }),
					this.L(),
					this
				);
			}),
			(t.prototype.getUser = function () {
				return this.S;
			}),
			(t.prototype.getRequestSession = function () {
				return this.C;
			}),
			(t.prototype.setRequestSession = function (t) {
				return (this.C = t), this;
			}),
			(t.prototype.setTags = function (t) {
				return (this.O = e(e({}, this.O), t)), this.L(), this;
			}),
			(t.prototype.setTag = function (t, n) {
				var r;
				return (
					(this.O = e(e({}, this.O), (((r = {})[t] = n), r))), this.L(), this
				);
			}),
			(t.prototype.setExtras = function (t) {
				return (this.T = e(e({}, this.T), t)), this.L(), this;
			}),
			(t.prototype.setExtra = function (t, n) {
				var r;
				return (
					(this.T = e(e({}, this.T), (((r = {})[t] = n), r))), this.L(), this
				);
			}),
			(t.prototype.setFingerprint = function (t) {
				return (this.A = t), this.L(), this;
			}),
			(t.prototype.setLevel = function (t) {
				return (this.N = t), this.L(), this;
			}),
			(t.prototype.setTransactionName = function (t) {
				return (this.q = t), this.L(), this;
			}),
			(t.prototype.setTransaction = function (t) {
				return this.setTransactionName(t);
			}),
			(t.prototype.setContext = function (t, n) {
				var r;
				return (
					null === n
						? delete this.D[t]
						: (this.D = e(e({}, this.D), (((r = {})[t] = n), r))),
					this.L(),
					this
				);
			}),
			(t.prototype.setSpan = function (t) {
				return (this.I = t), this.L(), this;
			}),
			(t.prototype.getSpan = function () {
				return this.I;
			}),
			(t.prototype.getTransaction = function () {
				var t = this.getSpan();
				return t && t.transaction;
			}),
			(t.prototype.setSession = function (t) {
				return t ? (this.M = t) : delete this.M, this.L(), this;
			}),
			(t.prototype.getSession = function () {
				return this.M;
			}),
			(t.prototype.update = function (n) {
				if (!n) return this;
				if ("function" == typeof n) {
					var r = n(this);
					return r instanceof t ? r : this;
				}
				return (
					n instanceof t
						? ((this.O = e(e({}, this.O), n.O)),
						  (this.T = e(e({}, this.T), n.T)),
						  (this.D = e(e({}, this.D), n.D)),
						  n.S && Object.keys(n.S).length && (this.S = n.S),
						  n.N && (this.N = n.N),
						  n.A && (this.A = n.A),
						  n.C && (this.C = n.C))
						: m(n) &&
						  ((n = n),
						  (this.O = e(e({}, this.O), n.tags)),
						  (this.T = e(e({}, this.T), n.extra)),
						  (this.D = e(e({}, this.D), n.contexts)),
						  n.user && (this.S = n.user),
						  n.level && (this.N = n.level),
						  n.fingerprint && (this.A = n.fingerprint),
						  n.requestSession && (this.C = n.requestSession)),
					this
				);
			}),
			(t.prototype.clear = function () {
				return (
					(this.k = []),
					(this.O = {}),
					(this.T = {}),
					(this.S = {}),
					(this.D = {}),
					(this.N = void 0),
					(this.q = void 0),
					(this.A = void 0),
					(this.C = void 0),
					(this.I = void 0),
					(this.M = void 0),
					this.L(),
					this
				);
			}),
			(t.prototype.addBreadcrumb = function (t, n) {
				var r = "number" == typeof n ? Math.min(n, 100) : 100;
				if (r <= 0) return this;
				var i = e({ timestamp: It() }, t);
				return (this.k = a(this.k, [i]).slice(-r)), this.L(), this;
			}),
			(t.prototype.clearBreadcrumbs = function () {
				return (this.k = []), this.L(), this;
			}),
			(t.prototype.applyToEvent = function (t, n) {
				if (
					(this.T &&
						Object.keys(this.T).length &&
						(t.extra = e(e({}, this.T), t.extra)),
					this.O &&
						Object.keys(this.O).length &&
						(t.tags = e(e({}, this.O), t.tags)),
					this.S &&
						Object.keys(this.S).length &&
						(t.user = e(e({}, this.S), t.user)),
					this.D &&
						Object.keys(this.D).length &&
						(t.contexts = e(e({}, this.D), t.contexts)),
					this.N && (t.level = this.N),
					this.q && (t.transaction = this.q),
					this.I)
				) {
					t.contexts = e({ trace: this.I.getTraceContext() }, t.contexts);
					var r = this.I.transaction && this.I.transaction.name;
					r && (t.tags = e({ transaction: r }, t.tags));
				}
				return (
					this.U(t),
					(t.breadcrumbs = a(t.breadcrumbs || [], this.k)),
					(t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0),
					(t.sdkProcessingMetadata = this.R),
					this.H(a(Lt(), this.j), t, n)
				);
			}),
			(t.prototype.setSDKProcessingMetadata = function (t) {
				return (this.R = e(e({}, this.R), t)), this;
			}),
			(t.prototype.H = function (t, n, r, i) {
				var o = this;
				return (
					void 0 === i && (i = 0),
					new St(function (u, a) {
						var c = t[i];
						if (null === n || "function" != typeof c) u(n);
						else {
							var s = c(e({}, n), r);
							g(s)
								? s
										.then(function (n) {
											return o.H(t, n, r, i + 1).then(u);
										})
										.then(null, a)
								: o
										.H(t, s, r, i + 1)
										.then(u)
										.then(null, a);
						}
					})
				);
			}),
			(t.prototype.L = function () {
				var t = this;
				this.g ||
					((this.g = !0),
					this._.forEach(function (n) {
						n(t);
					}),
					(this.g = !1));
			}),
			(t.prototype.U = function (t) {
				(t.fingerprint = t.fingerprint
					? Array.isArray(t.fingerprint)
						? t.fingerprint
						: [t.fingerprint]
					: []),
					this.A && (t.fingerprint = t.fingerprint.concat(this.A)),
					t.fingerprint && !t.fingerprint.length && delete t.fingerprint;
			}),
			t
		);
	})();
	function Lt() {
		var t = s();
		return (
			(t.__SENTRY__ = t.__SENTRY__ || {}),
			(t.__SENTRY__.globalEventProcessors =
				t.__SENTRY__.globalEventProcessors || []),
			t.__SENTRY__.globalEventProcessors
		);
	}
	function Ut(t) {
		Lt().push(t);
	}
	var Ht = (function () {
			function t(t) {
				(this.errors = 0),
					(this.sid = mt()),
					(this.duration = 0),
					(this.status = "ok"),
					(this.init = !0),
					(this.ignoreDuration = !1);
				var n = Mt();
				(this.timestamp = n), (this.started = n), t && this.update(t);
			}
			return (
				(t.prototype.update = function (t) {
					if (
						(void 0 === t && (t = {}),
						t.user &&
							(!this.ipAddress &&
								t.user.ip_address &&
								(this.ipAddress = t.user.ip_address),
							this.did ||
								t.did ||
								(this.did = t.user.id || t.user.email || t.user.username)),
						(this.timestamp = t.timestamp || Mt()),
						t.ignoreDuration && (this.ignoreDuration = t.ignoreDuration),
						t.sid && (this.sid = 32 === t.sid.length ? t.sid : mt()),
						void 0 !== t.init && (this.init = t.init),
						!this.did && t.did && (this.did = "" + t.did),
						"number" == typeof t.started && (this.started = t.started),
						this.ignoreDuration)
					)
						this.duration = void 0;
					else if ("number" == typeof t.duration) this.duration = t.duration;
					else {
						var n = this.timestamp - this.started;
						this.duration = n >= 0 ? n : 0;
					}
					t.release && (this.release = t.release),
						t.environment && (this.environment = t.environment),
						!this.ipAddress && t.ipAddress && (this.ipAddress = t.ipAddress),
						!this.userAgent && t.userAgent && (this.userAgent = t.userAgent),
						"number" == typeof t.errors && (this.errors = t.errors),
						t.status && (this.status = t.status);
				}),
				(t.prototype.close = function (t) {
					t
						? this.update({ status: t })
						: "ok" === this.status
						? this.update({ status: "exited" })
						: this.update();
				}),
				(t.prototype.toJSON = function () {
					return Z({
						sid: "" + this.sid,
						init: this.init,
						started: new Date(1e3 * this.started).toISOString(),
						timestamp: new Date(1e3 * this.timestamp).toISOString(),
						status: this.status,
						errors: this.errors,
						did:
							"number" == typeof this.did || "string" == typeof this.did
								? "" + this.did
								: void 0,
						duration: this.duration,
						attrs: {
							release: this.release,
							environment: this.environment,
							ip_address: this.ipAddress,
							user_agent: this.userAgent,
						},
					});
				}),
				t
			);
		})(),
		Ft = (function () {
			function t(t, n, r) {
				void 0 === n && (n = new Ct()),
					void 0 === r && (r = 4),
					(this.F = r),
					(this.P = [{}]),
					(this.getStackTop().scope = n),
					t && this.bindClient(t);
			}
			return (
				(t.prototype.isOlderThan = function (t) {
					return this.F < t;
				}),
				(t.prototype.bindClient = function (t) {
					(this.getStackTop().client = t),
						t && t.setupIntegrations && t.setupIntegrations();
				}),
				(t.prototype.pushScope = function () {
					var t = Ct.clone(this.getScope());
					return (
						this.getStack().push({ client: this.getClient(), scope: t }), t
					);
				}),
				(t.prototype.popScope = function () {
					return !(this.getStack().length <= 1) && !!this.getStack().pop();
				}),
				(t.prototype.withScope = function (t) {
					var n = this.pushScope();
					try {
						t(n);
					} finally {
						this.popScope();
					}
				}),
				(t.prototype.getClient = function () {
					return this.getStackTop().client;
				}),
				(t.prototype.getScope = function () {
					return this.getStackTop().scope;
				}),
				(t.prototype.getStack = function () {
					return this.P;
				}),
				(t.prototype.getStackTop = function () {
					return this.P[this.P.length - 1];
				}),
				(t.prototype.captureException = function (t, n) {
					var r = (this.X = n && n.event_id ? n.event_id : mt()),
						i = n;
					if (!n) {
						var o = void 0;
						try {
							throw new Error("Sentry syntheticException");
						} catch (t) {
							o = t;
						}
						i = { originalException: t, syntheticException: o };
					}
					return this.B("captureException", t, e(e({}, i), { event_id: r })), r;
				}),
				(t.prototype.captureMessage = function (t, n, r) {
					var i = (this.X = r && r.event_id ? r.event_id : mt()),
						o = r;
					if (!r) {
						var u = void 0;
						try {
							throw new Error(t);
						} catch (t) {
							u = t;
						}
						o = { originalException: t, syntheticException: u };
					}
					return (
						this.B("captureMessage", t, n, e(e({}, o), { event_id: i })), i
					);
				}),
				(t.prototype.captureEvent = function (t, n) {
					var r = n && n.event_id ? n.event_id : mt();
					return (
						"transaction" !== t.type && (this.X = r),
						this.B("captureEvent", t, e(e({}, n), { event_id: r })),
						r
					);
				}),
				(t.prototype.lastEventId = function () {
					return this.X;
				}),
				(t.prototype.addBreadcrumb = function (t, n) {
					var r = this.getStackTop(),
						i = r.scope,
						o = r.client;
					if (i && o) {
						var u = (o.getOptions && o.getOptions()) || {},
							a = u.beforeBreadcrumb,
							c = void 0 === a ? null : a,
							s = u.maxBreadcrumbs,
							f = void 0 === s ? 100 : s;
						if (!(f <= 0)) {
							var h = It(),
								v = e({ timestamp: h }, t),
								d = c
									? M(function () {
											return c(v, n);
									  })
									: v;
							null !== d && i.addBreadcrumb(d, f);
						}
					}
				}),
				(t.prototype.setUser = function (t) {
					var n = this.getScope();
					n && n.setUser(t);
				}),
				(t.prototype.setTags = function (t) {
					var n = this.getScope();
					n && n.setTags(t);
				}),
				(t.prototype.setExtras = function (t) {
					var n = this.getScope();
					n && n.setExtras(t);
				}),
				(t.prototype.setTag = function (t, n) {
					var r = this.getScope();
					r && r.setTag(t, n);
				}),
				(t.prototype.setExtra = function (t, n) {
					var r = this.getScope();
					r && r.setExtra(t, n);
				}),
				(t.prototype.setContext = function (t, n) {
					var r = this.getScope();
					r && r.setContext(t, n);
				}),
				(t.prototype.configureScope = function (t) {
					var n = this.getStackTop(),
						r = n.scope,
						i = n.client;
					r && i && t(r);
				}),
				(t.prototype.run = function (t) {
					var n = Xt(this);
					try {
						t(this);
					} finally {
						Xt(n);
					}
				}),
				(t.prototype.getIntegration = function (t) {
					var n = this.getClient();
					if (!n) return null;
					try {
						return n.getIntegration(t);
					} catch (n) {
						return (
							A.warn(
								"Cannot retrieve integration " + t.id + " from the current Hub"
							),
							null
						);
					}
				}),
				(t.prototype.startSpan = function (t) {
					return this.W("startSpan", t);
				}),
				(t.prototype.startTransaction = function (t, n) {
					return this.W("startTransaction", t, n);
				}),
				(t.prototype.traceHeaders = function () {
					return this.W("traceHeaders");
				}),
				(t.prototype.captureSession = function (t) {
					if ((void 0 === t && (t = !1), t)) return this.endSession();
					this.J();
				}),
				(t.prototype.endSession = function () {
					var t = this.getStackTop(),
						n = t && t.scope,
						r = n && n.getSession();
					r && r.close(), this.J(), n && n.setSession();
				}),
				(t.prototype.startSession = function (t) {
					var n = this.getStackTop(),
						r = n.scope,
						i = n.client,
						o = (i && i.getOptions()) || {},
						u = o.release,
						a = o.environment,
						c = (s().navigator || {}).userAgent,
						f = new Ht(
							e(
								e(
									e({ release: u, environment: a }, r && { user: r.getUser() }),
									c && { userAgent: c }
								),
								t
							)
						);
					if (r) {
						var h = r.getSession && r.getSession();
						h && "ok" === h.status && h.update({ status: "exited" }),
							this.endSession(),
							r.setSession(f);
					}
					return f;
				}),
				(t.prototype.J = function () {
					var t = this.getStackTop(),
						n = t.scope,
						r = t.client;
					if (n) {
						var i = n.getSession && n.getSession();
						i && r && r.captureSession && r.captureSession(i);
					}
				}),
				(t.prototype.B = function (t) {
					for (var n, r = [], i = 1; i < arguments.length; i++)
						r[i - 1] = arguments[i];
					var e = this.getStackTop(),
						o = e.scope,
						u = e.client;
					u && u[t] && (n = u)[t].apply(n, a(r, [o]));
				}),
				(t.prototype.W = function (t) {
					for (var n = [], r = 1; r < arguments.length; r++)
						n[r - 1] = arguments[r];
					var i = Pt(),
						e = i.__SENTRY__;
					if (e && e.extensions && "function" == typeof e.extensions[t])
						return e.extensions[t].apply(this, n);
					A.warn(
						"Extension method " + t + " couldn't be found, doing nothing."
					);
				}),
				t
			);
		})();
	function Pt() {
		var t = s();
		return (t.__SENTRY__ = t.__SENTRY__ || { extensions: {}, hub: void 0 }), t;
	}
	function Xt(t) {
		var n = Pt(),
			r = Wt(n);
		return $t(n, t), r;
	}
	function Bt() {
		var t,
			n = Pt();
		return (
			((t = n) && t.__SENTRY__ && t.__SENTRY__.hub && !Wt(n).isOlderThan(4)) ||
				$t(n, new Ft()),
			Wt(n)
		);
	}
	function Wt(t) {
		return (
			(t && t.__SENTRY__ && t.__SENTRY__.hub) ||
				((t.__SENTRY__ = t.__SENTRY__ || {}), (t.__SENTRY__.hub = new Ft())),
			t.__SENTRY__.hub
		);
	}
	function $t(t, n) {
		return (
			!!t && ((t.__SENTRY__ = t.__SENTRY__ || {}), (t.__SENTRY__.hub = n), !0)
		);
	}
	function Jt(t) {
		for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
		var i = Bt();
		if (i && i[t]) return i[t].apply(i, a(n));
		throw new Error(
			"No hub defined or " +
				t +
				" was not found on the hub, please open a bug report."
		);
	}
	function captureException(t, n) {
		var r;
		try {
			throw new Error("Sentry syntheticException");
		} catch (t) {
			r = t;
		}
		return Jt("captureException", t, {
			captureContext: n,
			originalException: t,
			syntheticException: r,
		});
	}
	function zt(t) {
		Jt("withScope", t);
	}
	function Gt(t) {
		var n = t.protocol ? t.protocol + ":" : "",
			r = t.port ? ":" + t.port : "";
		return n + "//" + t.host + r + (t.path ? "/" + t.path : "") + "/api/";
	}
	function Kt(t, n) {
		return "" + Gt(t) + t.projectId + "/" + n + "/";
	}
	function Vt(t) {
		return (
			(n = { sentry_key: t.publicKey, sentry_version: "7" }),
			Object.keys(n)
				.map(function (t) {
					return encodeURIComponent(t) + "=" + encodeURIComponent(n[t]);
				})
				.join("&")
		);
		var n;
	}
	function Qt(t) {
		return (
			(function (t) {
				return Kt(t, "store");
			})(t) +
			"?" +
			Vt(t)
		);
	}
	function Yt(t, n) {
		return (
			n ||
			(function (t) {
				return Kt(t, "envelope");
			})(t) +
				"?" +
				Vt(t)
		);
	}
	var Zt = [];
	function tn(t) {
		return t.reduce(function (t, n) {
			return (
				t.every(function (t) {
					return n.name !== t.name;
				}) && t.push(n),
				t
			);
		}, []);
	}
	function nn(t) {
		var n = {};
		return (
			(function (t) {
				var n = (t.defaultIntegrations && a(t.defaultIntegrations)) || [],
					r = t.integrations,
					i = a(tn(n));
				Array.isArray(r)
					? (i = a(
							i.filter(function (t) {
								return r.every(function (n) {
									return n.name !== t.name;
								});
							}),
							tn(r)
					  ))
					: "function" == typeof r &&
					  ((i = r(i)), (i = Array.isArray(i) ? i : [i]));
				var e = i.map(function (t) {
						return t.name;
					}),
					o = "Debug";
				return (
					-1 !== e.indexOf(o) && i.push.apply(i, a(i.splice(e.indexOf(o), 1))),
					i
				);
			})(t).forEach(function (t) {
				(n[t.name] = t),
					(function (t) {
						-1 === Zt.indexOf(t.name) &&
							(t.setupOnce(Ut, Bt),
							Zt.push(t.name),
							A.log("Integration installed: " + t.name));
					})(t);
			}),
			B(n, "initialized", !0),
			n
		);
	}
	var rn = "Not capturing exception because it's already been captured.",
		en = (function () {
			function t(t, n) {
				(this.G = {}),
					(this.K = 0),
					(this.V = new t(n)),
					(this.Y = n),
					n.dsn && (this.Z = D(n.dsn));
			}
			return (
				(t.prototype.captureException = function (t, n, r) {
					var i = this;
					if (!_t(t)) {
						var e = n && n.event_id;
						return (
							this.tt(
								this.nt()
									.eventFromException(t, n)
									.then(function (t) {
										return i.rt(t, n, r);
									})
									.then(function (t) {
										e = t;
									})
							),
							e
						);
					}
					A.log(rn);
				}),
				(t.prototype.captureMessage = function (t, n, r, i) {
					var e = this,
						o = r && r.event_id,
						u = y(t)
							? this.nt().eventFromMessage(String(t), n, r)
							: this.nt().eventFromException(t, r);
					return (
						this.tt(
							u
								.then(function (t) {
									return e.rt(t, r, i);
								})
								.then(function (t) {
									o = t;
								})
						),
						o
					);
				}),
				(t.prototype.captureEvent = function (t, n, r) {
					if (!(n && n.originalException && _t(n.originalException))) {
						var i = n && n.event_id;
						return (
							this.tt(
								this.rt(t, n, r).then(function (t) {
									i = t;
								})
							),
							i
						);
					}
					A.log(rn);
				}),
				(t.prototype.captureSession = function (t) {
					this.it() &&
						("string" != typeof t.release ||
							(this.et(t), t.update({ init: !1 })));
				}),
				(t.prototype.getDsn = function () {
					return this.Z;
				}),
				(t.prototype.getOptions = function () {
					return this.Y;
				}),
				(t.prototype.getTransport = function () {
					return this.nt().getTransport();
				}),
				(t.prototype.flush = function (t) {
					var n = this;
					return this.ot(t).then(function (r) {
						return n
							.getTransport()
							.close(t)
							.then(function (t) {
								return r && t;
							});
					});
				}),
				(t.prototype.close = function (t) {
					var n = this;
					return this.flush(t).then(function (t) {
						return (n.getOptions().enabled = !1), t;
					});
				}),
				(t.prototype.setupIntegrations = function () {
					this.it() && !this.G.initialized && (this.G = nn(this.Y));
				}),
				(t.prototype.getIntegration = function (t) {
					try {
						return this.G[t.id] || null;
					} catch (n) {
						return (
							A.warn(
								"Cannot retrieve integration " +
									t.id +
									" from the current Client"
							),
							null
						);
					}
				}),
				(t.prototype.ut = function (t, n) {
					var r,
						i,
						u = !1,
						a = !1,
						c = n.exception && n.exception.values;
					if (c) {
						a = !0;
						try {
							for (var s = o(c), f = s.next(); !f.done; f = s.next()) {
								var h = f.value.mechanism;
								if (h && !1 === h.handled) {
									u = !0;
									break;
								}
							}
						} catch (t) {
							r = { error: t };
						} finally {
							try {
								f && !f.done && (i = s.return) && i.call(s);
							} finally {
								if (r) throw r.error;
							}
						}
					}
					var v = "ok" === t.status;
					((v && 0 === t.errors) || (v && u)) &&
						(t.update(
							e(e({}, u && { status: "crashed" }), {
								errors: t.errors || Number(a || u),
							})
						),
						this.captureSession(t));
				}),
				(t.prototype.et = function (t) {
					this.nt().sendSession(t);
				}),
				(t.prototype.ot = function (t) {
					var n = this;
					return new St(function (r) {
						var i = 0,
							e = setInterval(function () {
								0 == n.K
									? (clearInterval(e), r(!0))
									: ((i += 1), t && i >= t && (clearInterval(e), r(!1)));
							}, 1);
					});
				}),
				(t.prototype.nt = function () {
					return this.V;
				}),
				(t.prototype.it = function () {
					return !1 !== this.getOptions().enabled && void 0 !== this.Z;
				}),
				(t.prototype.at = function (t, n, r) {
					var i = this,
						o = this.getOptions().normalizeDepth,
						u = void 0 === o ? 3 : o,
						a = e(e({}, t), {
							event_id: t.event_id || (r && r.event_id ? r.event_id : mt()),
							timestamp: t.timestamp || It(),
						});
					this.ct(a), this.st(a);
					var c = n;
					r && r.captureContext && (c = Ct.clone(c).update(r.captureContext));
					var s = jt(a);
					return (
						c && (s = c.applyToEvent(a, r)),
						s.then(function (t) {
							return (
								t &&
									(t.sdkProcessingMetadata = e(e({}, t.sdkProcessingMetadata), {
										normalizeDepth: Q(u),
									})),
								"number" == typeof u && u > 0 ? i.ft(t, u) : t
							);
						})
					);
				}),
				(t.prototype.ft = function (t, n) {
					if (!t) return null;
					var r = e(
						e(
							e(
								e(
									e({}, t),
									t.breadcrumbs && {
										breadcrumbs: t.breadcrumbs.map(function (t) {
											return e(e({}, t), t.data && { data: Q(t.data, n) });
										}),
									}
								),
								t.user && { user: Q(t.user, n) }
							),
							t.contexts && { contexts: Q(t.contexts, n) }
						),
						t.extra && { extra: Q(t.extra, n) }
					);
					return (
						t.contexts &&
							t.contexts.trace &&
							(r.contexts.trace = t.contexts.trace),
						(t.sdkProcessingMetadata = e(e({}, t.sdkProcessingMetadata), {
							baseClientNormalized: !0,
						})),
						r
					);
				}),
				(t.prototype.ct = function (t) {
					var n = this.getOptions(),
						r = n.environment,
						i = n.release,
						e = n.dist,
						o = n.maxValueLength,
						u = void 0 === o ? 250 : o;
					"environment" in t ||
						(t.environment = "environment" in n ? r : "production"),
						void 0 === t.release && void 0 !== i && (t.release = i),
						void 0 === t.dist && void 0 !== e && (t.dist = e),
						t.message && (t.message = H(t.message, u));
					var a = t.exception && t.exception.values && t.exception.values[0];
					a && a.value && (a.value = H(a.value, u));
					var c = t.request;
					c && c.url && (c.url = H(c.url, u));
				}),
				(t.prototype.st = function (t) {
					var n = Object.keys(this.G);
					n.length > 0 &&
						((t.sdk = t.sdk || {}),
						(t.sdk.integrations = a(t.sdk.integrations || [], n)));
				}),
				(t.prototype.ht = function (t) {
					this.nt().sendEvent(t);
				}),
				(t.prototype.rt = function (t, n, r) {
					return this.vt(t, n, r).then(
						function (t) {
							return t.event_id;
						},
						function (t) {
							A.error(t);
						}
					);
				}),
				(t.prototype.vt = function (t, n, r) {
					var i = this,
						e = this.getOptions(),
						o = e.beforeSend,
						u = e.sampleRate,
						a = this.getTransport();
					function c(t, n) {
						a.recordLostEvent && a.recordLostEvent(t, n);
					}
					if (!this.it())
						return kt(new k("SDK not enabled, will not capture event."));
					var s = "transaction" === t.type;
					return !s && "number" == typeof u && Math.random() > u
						? (c("sample_rate", "event"),
						  kt(
								new k(
									"Discarding event because it's not included in the random sample (sampling rate = " +
										u +
										")"
								)
						  ))
						: this.at(t, r, n)
								.then(function (r) {
									if (null === r)
										throw (
											(c("event_processor", t.type || "event"),
											new k(
												"An event processor returned null, will not send event."
											))
										);
									return (n && n.data && !0 === n.data.__sentry__) || s || !o
										? r
										: (function (t) {
												var n =
													"`beforeSend` method has to return `null` or a valid event.";
												if (g(t))
													return t.then(
														function (t) {
															if (!m(t) && null !== t) throw new k(n);
															return t;
														},
														function (t) {
															throw new k("beforeSend rejected with " + t);
														}
													);
												if (!m(t) && null !== t) throw new k(n);
												return t;
										  })(o(r, n));
								})
								.then(function (n) {
									if (null === n)
										throw (
											(c("before_send", t.type || "event"),
											new k(
												"`beforeSend` returned `null`, will not send event."
											))
										);
									var e = r && r.getSession && r.getSession();
									return !s && e && i.ut(e, n), i.ht(n), n;
								})
								.then(null, function (t) {
									if (t instanceof k) throw t;
									throw (
										(i.captureException(t, {
											data: { __sentry__: !0 },
											originalException: t,
										}),
										new k(
											"Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " +
												t
										))
									);
								});
				}),
				(t.prototype.tt = function (t) {
					var n = this;
					(this.K += 1),
						t.then(
							function (t) {
								return (n.K -= 1), t;
							},
							function (t) {
								return (n.K -= 1), t;
							}
						);
				}),
				t
			);
		})();
	var on = (function () {
			function t() {}
			return (
				(t.prototype.sendEvent = function (t) {
					return jt({
						reason:
							"NoopTransport: Event has been skipped because no Dsn is configured.",
						status: "skipped",
					});
				}),
				(t.prototype.close = function (t) {
					return jt(!0);
				}),
				t
			);
		})(),
		un = (function () {
			function t(t) {
				(this.Y = t),
					this.Y.dsn ||
						A.warn("No DSN provided, backend will not do anything."),
					(this.dt = this.lt());
			}
			return (
				(t.prototype.eventFromException = function (t, n) {
					throw new k("Backend has to implement `eventFromException` method");
				}),
				(t.prototype.eventFromMessage = function (t, n, r) {
					throw new k("Backend has to implement `eventFromMessage` method");
				}),
				(t.prototype.sendEvent = function (t) {
					this.dt.sendEvent(t).then(null, function (t) {
						0;
					});
				}),
				(t.prototype.sendSession = function (t) {
					this.dt.sendSession &&
						this.dt.sendSession(t).then(null, function (t) {
							0;
						});
				}),
				(t.prototype.getTransport = function () {
					return this.dt;
				}),
				(t.prototype.lt = function () {
					return new on();
				}),
				t
			);
		})();
	function an(t) {
		if (t.metadata && t.metadata.sdk) {
			var n = t.metadata.sdk;
			return { name: n.name, version: n.version };
		}
	}
	function cn(t, n) {
		var r,
			i = an(n),
			o = t.type || "event",
			u = "transaction" === o || !!n.tunnel,
			c = (t.sdkProcessingMetadata || {}).transactionSampling || {},
			s = c.method,
			f = c.rate;
		!(function (t, n) {
			n &&
				((t.sdk = t.sdk || {}),
				(t.sdk.name = t.sdk.name || n.name),
				(t.sdk.version = t.sdk.version || n.version),
				(t.sdk.integrations = a(
					t.sdk.integrations || [],
					n.integrations || []
				)),
				(t.sdk.packages = a(t.sdk.packages || [], n.packages || [])));
		})(t, n.metadata.sdk),
			(t.tags = t.tags || {}),
			(t.extra = t.extra || {}),
			(t.sdkProcessingMetadata &&
				t.sdkProcessingMetadata.baseClientNormalized) ||
				((t.tags.skippedNormalization = !0),
				(t.extra.normalizeDepth = t.sdkProcessingMetadata
					? t.sdkProcessingMetadata.normalizeDepth
					: "unset")),
			delete t.sdkProcessingMetadata;
		try {
			r = JSON.stringify(t);
		} catch (n) {
			(t.tags.JSONStringifyError = !0), (t.extra.JSONStringifyError = n);
			try {
				r = JSON.stringify(Q(t));
			} catch (t) {
				var h = t;
				r = JSON.stringify({
					message: "JSON.stringify error after renormalization",
					extra: { message: h.message, stack: h.stack },
				});
			}
		}
		var v = { body: r, type: o, url: u ? Yt(n.dsn, n.tunnel) : Qt(n.dsn) };
		if (u) {
			var d = qt(
				e(
					e(
						{ event_id: t.event_id, sent_at: new Date().toISOString() },
						i && { sdk: i }
					),
					!!n.tunnel && { dsn: O(n.dsn) }
				),
				[[{ type: o, sample_rates: [{ id: s, rate: f }] }, v.body]]
			);
			v.body = At(d);
		}
		return v;
	}
	var sn,
		fn = "6.18.2",
		hn = (function () {
			function t() {
				this.name = t.id;
			}
			return (
				(t.prototype.setupOnce = function () {
					(sn = Function.prototype.toString),
						(Function.prototype.toString = function () {
							for (var t = [], n = 0; n < arguments.length; n++)
								t[n] = arguments[n];
							var r = $(this) || this;
							return sn.apply(r, t);
						});
				}),
				(t.id = "FunctionToString"),
				t
			);
		})(),
		vn = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
		dn = (function () {
			function t(n) {
				void 0 === n && (n = {}), (this.Y = n), (this.name = t.id);
			}
			return (
				(t.prototype.setupOnce = function () {
					Ut(function (n) {
						var r = Bt();
						if (!r) return n;
						var i = r.getIntegration(t);
						if (i) {
							var e = r.getClient(),
								o = e ? e.getOptions() : {},
								u = "function" == typeof i.yt ? i.yt(o) : {};
							return "function" != typeof i.bt ? n : i.bt(n, u) ? null : n;
						}
						return n;
					});
				}),
				(t.prototype.bt = function (t, n) {
					return (
						!!this.wt(t, n) ||
						!!this.gt(t, n) ||
						!!this.xt(t, n) ||
						!this.Et(t, n)
					);
				}),
				(t.prototype.wt = function (t, n) {
					if (!n.ignoreInternal) return !1;
					try {
						return "SentryError" === t.exception.values[0].type;
					} catch (t) {}
					return !1;
				}),
				(t.prototype.gt = function (t, n) {
					return (
						!(!n.ignoreErrors || !n.ignoreErrors.length) &&
						this._t(t).some(function (t) {
							return n.ignoreErrors.some(function (n) {
								return P(t, n);
							});
						})
					);
				}),
				(t.prototype.xt = function (t, n) {
					if (!n.denyUrls || !n.denyUrls.length) return !1;
					var r = this.jt(t);
					return (
						!!r &&
						n.denyUrls.some(function (t) {
							return P(r, t);
						})
					);
				}),
				(t.prototype.Et = function (t, n) {
					if (!n.allowUrls || !n.allowUrls.length) return !0;
					var r = this.jt(t);
					return (
						!r ||
						n.allowUrls.some(function (t) {
							return P(r, t);
						})
					);
				}),
				(t.prototype.yt = function (t) {
					return (
						void 0 === t && (t = {}),
						{
							allowUrls: a(
								this.Y.whitelistUrls || [],
								this.Y.allowUrls || [],
								t.whitelistUrls || [],
								t.allowUrls || []
							),
							denyUrls: a(
								this.Y.blacklistUrls || [],
								this.Y.denyUrls || [],
								t.blacklistUrls || [],
								t.denyUrls || []
							),
							ignoreErrors: a(
								this.Y.ignoreErrors || [],
								t.ignoreErrors || [],
								vn
							),
							ignoreInternal:
								void 0 === this.Y.ignoreInternal || this.Y.ignoreInternal,
						}
					);
				}),
				(t.prototype._t = function (t) {
					if (t.message) return [t.message];
					if (t.exception)
						try {
							var n = (t.exception.values && t.exception.values[0]) || {},
								r = n.type,
								i = void 0 === r ? "" : r,
								e = n.value,
								o = void 0 === e ? "" : e;
							return ["" + o, i + ": " + o];
						} catch (t) {
							return [];
						}
					return [];
				}),
				(t.prototype.kt = function (t) {
					void 0 === t && (t = []);
					for (var n = t.length - 1; n >= 0; n--) {
						var r = t[n];
						if (
							r &&
							"<anonymous>" !== r.filename &&
							"[native code]" !== r.filename
						)
							return r.filename || null;
					}
					return null;
				}),
				(t.prototype.jt = function (t) {
					try {
						if (t.stacktrace) return this.kt(t.stacktrace.frames);
						var n;
						try {
							n = t.exception.values[0].stacktrace.frames;
						} catch (t) {}
						return n ? this.kt(n) : null;
					} catch (t) {
						return null;
					}
				}),
				(t.id = "InboundFilters"),
				t
			);
		})(),
		ln = Object.freeze({
			__proto__: null,
			FunctionToString: hn,
			InboundFilters: dn,
		}),
		pn = "?";
	function yn(t, n, r, i) {
		var e = { filename: t, function: n, in_app: !0 };
		return void 0 !== r && (e.lineno = r), void 0 !== i && (e.colno = i), e;
	}
	var mn =
			/^\s*at (?:(.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
		bn = /\((\S*)(?::(\d+))(?::(\d+))\)/,
		wn = [
			30,
			function (t) {
				var n = mn.exec(t);
				if (n) {
					if (n[2] && 0 === n[2].indexOf("eval")) {
						var r = bn.exec(n[2]);
						r && ((n[2] = r[1]), (n[3] = r[2]), (n[4] = r[3]));
					}
					var i = u(Dn(n[1] || pn, n[2]), 2),
						e = i[0];
					return yn(i[1], e, n[3] ? +n[3] : void 0, n[4] ? +n[4] : void 0);
				}
			},
		],
		gn =
			/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
		xn = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
		En = [
			50,
			function (t) {
				var n,
					r = gn.exec(t);
				if (r) {
					if (r[3] && r[3].indexOf(" > eval") > -1) {
						var i = xn.exec(r[3]);
						i &&
							((r[1] = r[1] || "eval"),
							(r[3] = i[1]),
							(r[4] = i[2]),
							(r[5] = ""));
					}
					var e = r[3],
						o = r[1] || pn;
					return (
						(o = (n = u(Dn(o, e), 2))[0]),
						yn((e = n[1]), o, r[4] ? +r[4] : void 0, r[5] ? +r[5] : void 0)
					);
				}
			},
		],
		_n =
			/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
		jn = [
			40,
			function (t) {
				var n = _n.exec(t);
				return n ? yn(n[2], n[1] || pn, +n[3], n[4] ? +n[4] : void 0) : void 0;
			},
		],
		kn = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
		Sn = [
			10,
			function (t) {
				var n = kn.exec(t);
				return n ? yn(n[2], n[3] || pn, +n[1]) : void 0;
			},
		],
		On =
			/ line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i,
		Tn = [
			20,
			function (t) {
				var n = On.exec(t);
				return n ? yn(n[5], n[3] || n[4] || pn, +n[1], +n[2]) : void 0;
			},
		],
		Dn = function (t, n) {
			var r = -1 !== t.indexOf("safari-extension"),
				i = -1 !== t.indexOf("safari-web-extension");
			return r || i
				? [
						-1 !== t.indexOf("@") ? t.split("@")[0] : pn,
						r ? "safari-extension:" + n : "safari-web-extension:" + n,
				  ]
				: [t, n];
		};
	function Rn(t) {
		var n = In(t),
			r = { type: t && t.name, value: qn(t) };
		return (
			n.length && (r.stacktrace = { frames: n }),
			void 0 === r.type &&
				"" === r.value &&
				(r.value = "Unrecoverable error caught"),
			r
		);
	}
	function Nn(t) {
		return { exception: { values: [Rn(t)] } };
	}
	function In(t) {
		var n = t.stacktrace || t.stack || "",
			r = (function (t) {
				if (t) {
					if ("number" == typeof t.framesToPop) return t.framesToPop;
					if (Mn.test(t.message)) return 1;
				}
				return 0;
			})(t);
		try {
			return (function () {
				for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
				var r = t
					.sort(function (t, n) {
						return t[0] - n[0];
					})
					.map(function (t) {
						return t[1];
					});
				return function (t, n) {
					var i, e, u, a;
					void 0 === n && (n = 0);
					var c = [];
					try {
						for (
							var s = o(t.split("\n").slice(n)), f = s.next();
							!f.done;
							f = s.next()
						) {
							var h = f.value;
							try {
								for (
									var v = ((u = void 0), o(r)), d = v.next();
									!d.done;
									d = v.next()
								) {
									var l = (0, d.value)(h);
									if (l) {
										c.push(l);
										break;
									}
								}
							} catch (t) {
								u = { error: t };
							} finally {
								try {
									d && !d.done && (a = v.return) && a.call(v);
								} finally {
									if (u) throw u.error;
								}
							}
						}
					} catch (t) {
						i = { error: t };
					} finally {
						try {
							f && !f.done && (e = s.return) && e.call(s);
						} finally {
							if (i) throw i.error;
						}
					}
					return C(c);
				};
			})(
				Sn,
				Tn,
				wn,
				jn,
				En
			)(n, r);
		} catch (t) {}
		return [];
	}
	var Mn = /Minified React error #\d+;/i;
	function qn(t) {
		var n = t && t.message;
		return n
			? n.error && "string" == typeof n.error.message
				? n.error.message
				: n
			: "No error message";
	}
	function An(n, r, i) {
		var e = Ln(n, (r && r.syntheticException) || void 0, i);
		return (
			Et(e),
			(e.level = t.Severity.Error),
			r && r.event_id && (e.event_id = r.event_id),
			jt(e)
		);
	}
	function Cn(n, r, i, e) {
		void 0 === r && (r = t.Severity.Info);
		var o = Un(n, (i && i.syntheticException) || void 0, e);
		return (o.level = r), i && i.event_id && (o.event_id = i.event_id), jt(o);
	}
	function Ln(t, n, r, i) {
		var o;
		if (d(t) && t.error) return Nn(t.error);
		if (l(t) || v(t, "DOMException")) {
			var u = t;
			if ("stack" in t) o = Nn(t);
			else {
				var a = u.name || (l(u) ? "DOMError" : "DOMException"),
					c = u.message ? a + ": " + u.message : a;
				xt((o = Un(c, n, r)), c);
			}
			return (
				"code" in u &&
					(o.tags = e(e({}, o.tags), { "DOMException.code": "" + u.code })),
				o
			);
		}
		return h(t)
			? Nn(t)
			: m(t) || b(t)
			? ((o = (function (t, n, r) {
					var i = {
						exception: {
							values: [
								{
									type: b(t)
										? t.constructor.name
										: r
										? "UnhandledRejection"
										: "Error",
									value:
										"Non-Error " +
										(r ? "promise rejection" : "exception") +
										" captured with keys: " +
										Y(t),
								},
							],
						},
						extra: { __serialized__: G(t) },
					};
					if (n) {
						var e = In(n);
						e.length && (i.stacktrace = { frames: e });
					}
					return i;
			  })(t, n, i)),
			  Et(o, { synthetic: !0 }),
			  o)
			: (xt((o = Un(t, n, r)), "" + t, void 0), Et(o, { synthetic: !0 }), o);
	}
	function Un(t, n, r) {
		var i = { message: t };
		if (r && n) {
			var e = In(n);
			e.length && (i.stacktrace = { frames: e });
		}
		return i;
	}
	var Hn,
		Fn = s();
	function Pn() {
		if (Hn) return Hn;
		if (nt(Fn.fetch)) return (Hn = Fn.fetch.bind(Fn));
		var t = Fn.document,
			n = Fn.fetch;
		if (t && "function" == typeof t.createElement)
			try {
				var r = t.createElement("iframe");
				(r.hidden = !0), t.head.appendChild(r);
				var i = r.contentWindow;
				i && i.fetch && (n = i.fetch), t.head.removeChild(r);
			} catch (t) {
				0;
			}
		return (Hn = n.bind(Fn));
	}
	function Xn(t, n) {
		if (
			"[object Navigator]" ===
				Object.prototype.toString.call(Fn && Fn.navigator) &&
			"function" == typeof Fn.navigator.sendBeacon
		)
			return Fn.navigator.sendBeacon.bind(Fn.navigator)(t, n);
		if (tt()) {
			var r = Pn();
			r(t, {
				body: n,
				method: "POST",
				credentials: "omit",
				keepalive: !0,
			}).then(null, function (t) {
				console.error(t);
			});
		} else;
	}
	function Bn(t) {
		return "event" === t ? "error" : t;
	}
	var Wn = s(),
		$n = (function () {
			function t(t) {
				var n,
					r,
					i,
					e = this;
				(this.options = t),
					(this.St = Ot(30)),
					(this.Ot = {}),
					(this.Tt = {}),
					(this.Dt =
						((n = t.dsn),
						(r = t.Rt),
						(i = t.tunnel),
						{ initDsn: n, metadata: r || {}, dsn: D(n), tunnel: i })),
					(this.url = Qt(this.Dt.dsn)),
					this.options.sendClientReports &&
						Wn.document &&
						Wn.document.addEventListener("visibilitychange", function () {
							"hidden" === Wn.document.visibilityState && e.Nt();
						});
			}
			return (
				(t.prototype.sendEvent = function (t) {
					return this.It(cn(t, this.Dt), t);
				}),
				(t.prototype.sendSession = function (t) {
					return this.It(
						(function (t, n) {
							var r = an(n),
								i = "aggregates" in t ? "sessions" : "session";
							return {
								body: At(
									qt(
										e(
											e({ sent_at: new Date().toISOString() }, r && { sdk: r }),
											!!n.tunnel && { dsn: O(n.dsn) }
										),
										[[{ type: i }, t]]
									)
								),
								type: i,
								url: Yt(n.dsn, n.tunnel),
							};
						})(t, this.Dt),
						t
					);
				}),
				(t.prototype.close = function (t) {
					return this.St.drain(t);
				}),
				(t.prototype.recordLostEvent = function (t, n) {
					var r;
					if (this.options.sendClientReports) {
						var i = Bn(n) + ":" + t;
						A.log("Adding outcome: " + i),
							(this.Tt[i] = (null != (r = this.Tt[i]) ? r : 0) + 1);
					}
				}),
				(t.prototype.Nt = function () {
					if (this.options.sendClientReports) {
						var t = this.Tt;
						if (((this.Tt = {}), Object.keys(t).length)) {
							A.log("Flushing outcomes:\n" + JSON.stringify(t, null, 2));
							var n,
								r,
								i,
								e = Yt(this.Dt.dsn, this.Dt.tunnel),
								o = Object.keys(t).map(function (n) {
									var r = u(n.split(":"), 2),
										i = r[0];
									return { reason: r[1], category: i, quantity: t[n] };
								}),
								a =
									((n = o),
									qt((r = this.Dt.tunnel && O(this.Dt.dsn)) ? { dsn: r } : {}, [
										[
											{ type: "client_report" },
											{ timestamp: i || It(), discarded_events: n },
										],
									]));
							try {
								Xn(e, At(a));
							} catch (t) {
								A.error(t);
							}
						} else A.log("No outcomes to flush");
					}
				}),
				(t.prototype.Mt = function (t) {
					t.requestType;
					var n,
						r = t.response,
						i = t.headers,
						e = t.resolve,
						o = t.reject,
						u =
							(n = r.status) >= 200 && n < 300
								? "success"
								: 429 === n
								? "rate_limit"
								: n >= 400 && n < 500
								? "invalid"
								: n >= 500
								? "failed"
								: "unknown";
					this.qt(i);
					"success" !== u ? o(r) : e({ status: u });
				}),
				(t.prototype.At = function (t) {
					var n = Bn(t);
					return this.Ot[n] || this.Ot.all;
				}),
				(t.prototype.Ct = function (t) {
					return this.At(t) > new Date(Date.now());
				}),
				(t.prototype.qt = function (t) {
					var n,
						r,
						i,
						e,
						u = Date.now(),
						a = t["x-sentry-rate-limits"],
						c = t["retry-after"];
					if (a) {
						try {
							for (
								var s = o(a.trim().split(",")), f = s.next();
								!f.done;
								f = s.next()
							) {
								var h = f.value.split(":", 2),
									v = parseInt(h[0], 10),
									d = 1e3 * (isNaN(v) ? 60 : v);
								try {
									for (
										var l = ((i = void 0), o(h[1].split(";"))), p = l.next();
										!p.done;
										p = l.next()
									) {
										var y = p.value;
										this.Ot[y || "all"] = new Date(u + d);
									}
								} catch (t) {
									i = { error: t };
								} finally {
									try {
										p && !p.done && (e = l.return) && e.call(l);
									} finally {
										if (i) throw i.error;
									}
								}
							}
						} catch (t) {
							n = { error: t };
						} finally {
							try {
								f && !f.done && (r = s.return) && r.call(s);
							} finally {
								if (n) throw n.error;
							}
						}
						return !0;
					}
					return (
						!!c &&
						((this.Ot.all = new Date(
							u +
								(function (t, n) {
									void 0 === n && (n = Date.now());
									var r = parseInt("" + t, 10);
									if (!isNaN(r)) return 1e3 * r;
									var i = Date.parse("" + t);
									return isNaN(i) ? 6e4 : i - n;
								})(c, u)
						)),
						!0)
					);
				}),
				t
			);
		})(),
		Jn = (function (t) {
			function n(n, r) {
				void 0 === r && (r = Pn());
				var i = t.call(this, n) || this;
				return (i.Lt = r), i;
			}
			return (
				r(n, t),
				(n.prototype.It = function (t, n) {
					var r = this;
					if (this.Ct(t.type))
						return (
							this.recordLostEvent("ratelimit_backoff", t.type),
							Promise.reject({
								event: n,
								type: t.type,
								reason:
									"Transport for " +
									t.type +
									" requests locked till " +
									this.At(t.type) +
									" due to too many requests.",
								status: 429,
							})
						);
					var i = {
						body: t.body,
						method: "POST",
						referrerPolicy: rt() ? "origin" : "",
					};
					return (
						void 0 !== this.options.fetchParameters &&
							Object.assign(i, this.options.fetchParameters),
						void 0 !== this.options.headers &&
							(i.headers = this.options.headers),
						this.St.add(function () {
							return new St(function (n, e) {
								r.Lt(t.url, i)
									.then(function (i) {
										var o = {
											"x-sentry-rate-limits": i.headers.get(
												"X-Sentry-Rate-Limits"
											),
											"retry-after": i.headers.get("Retry-After"),
										};
										r.Mt({
											requestType: t.type,
											response: i,
											headers: o,
											resolve: n,
											reject: e,
										});
									})
									.catch(e);
							});
						}).then(void 0, function (n) {
							throw (
								(n instanceof k
									? r.recordLostEvent("queue_overflow", t.type)
									: r.recordLostEvent("network_error", t.type),
								n)
							);
						})
					);
				}),
				n
			);
		})($n),
		zn = (function (t) {
			function n() {
				return (null !== t && t.apply(this, arguments)) || this;
			}
			return (
				r(n, t),
				(n.prototype.It = function (t, n) {
					var r = this;
					return this.Ct(t.type)
						? (this.recordLostEvent("ratelimit_backoff", t.type),
						  Promise.reject({
								event: n,
								type: t.type,
								reason:
									"Transport for " +
									t.type +
									" requests locked till " +
									this.At(t.type) +
									" due to too many requests.",
								status: 429,
						  }))
						: this.St.add(function () {
								return new St(function (n, i) {
									var e = new XMLHttpRequest();
									for (var o in ((e.onreadystatechange = function () {
										if (4 === e.readyState) {
											var o = {
												"x-sentry-rate-limits": e.getResponseHeader(
													"X-Sentry-Rate-Limits"
												),
												"retry-after": e.getResponseHeader("Retry-After"),
											};
											r.Mt({
												requestType: t.type,
												response: e,
												headers: o,
												resolve: n,
												reject: i,
											});
										}
									}),
									e.open("POST", t.url),
									r.options.headers))
										Object.prototype.hasOwnProperty.call(
											r.options.headers,
											o
										) && e.setRequestHeader(o, r.options.headers[o]);
									e.send(t.body);
								});
						  }).then(void 0, function (n) {
								throw (
									(n instanceof k
										? r.recordLostEvent("queue_overflow", t.type)
										: r.recordLostEvent("network_error", t.type),
									n)
								);
						  });
				}),
				n
			);
		})($n),
		Gn = Object.freeze({
			__proto__: null,
			BaseTransport: $n,
			FetchTransport: Jn,
			XHRTransport: zn,
		}),
		Kn = (function (n) {
			function i() {
				return (null !== n && n.apply(this, arguments)) || this;
			}
			return (
				r(i, n),
				(i.prototype.eventFromException = function (t, n) {
					return An(t, n, this.Y.attachStacktrace);
				}),
				(i.prototype.eventFromMessage = function (n, r, i) {
					return (
						void 0 === r && (r = t.Severity.Info),
						Cn(n, r, i, this.Y.attachStacktrace)
					);
				}),
				(i.prototype.lt = function () {
					if (!this.Y.dsn) return n.prototype.lt.call(this);
					var t = e(e({}, this.Y.transportOptions), {
						dsn: this.Y.dsn,
						tunnel: this.Y.tunnel,
						sendClientReports: this.Y.sendClientReports,
						Rt: this.Y.Rt,
					});
					return this.Y.transport
						? new this.Y.transport(t)
						: tt()
						? new Jn(t)
						: new zn(t);
				}),
				i
			);
		})(un),
		Vn = s(),
		Qn = 0;
	function Yn() {
		return Qn > 0;
	}
	function Zn() {
		(Qn += 1),
			setTimeout(function () {
				Qn -= 1;
			});
	}
	function tr(t, n, r) {
		if ((void 0 === n && (n = {}), "function" != typeof t)) return t;
		try {
			var i = t.__sentry_wrapped__;
			if (i) return i;
			if ($(t)) return t;
		} catch (n) {
			return t;
		}
		var sentryWrapped = function () {
			var i = Array.prototype.slice.call(arguments);
			try {
				r && "function" == typeof r && r.apply(this, arguments);
				var o = i.map(function (t) {
					return tr(t, n);
				});
				return t.apply(this, o);
			} catch (t) {
				throw (
					(Zn(),
					zt(function (r) {
						r.addEventProcessor(function (t) {
							return (
								n.mechanism && (xt(t, void 0, void 0), Et(t, n.mechanism)),
								(t.extra = e(e({}, t.extra), { arguments: i })),
								t
							);
						}),
							captureException(t);
					}),
					t)
				);
			}
		};
		try {
			for (var o in t)
				Object.prototype.hasOwnProperty.call(t, o) && (sentryWrapped[o] = t[o]);
		} catch (t) {}
		W(sentryWrapped, t), B(t, "__sentry_wrapped__", sentryWrapped);
		try {
			Object.getOwnPropertyDescriptor(sentryWrapped, "name").configurable &&
				Object.defineProperty(sentryWrapped, "name", {
					get: function () {
						return t.name;
					},
				});
		} catch (t) {}
		return sentryWrapped;
	}
	function nr(t) {
		if ((void 0 === t && (t = {}), Vn.document && t.eventId && t.dsn)) {
			var n = Vn.document.createElement("script");
			(n.async = !0),
				(n.src = (function (t, n) {
					var r = D(t),
						i = Gt(r) + "embed/error-page/",
						e = "dsn=" + O(r);
					for (var o in n)
						if ("dsn" !== o)
							if ("user" === o) {
								if (!n.user) continue;
								n.user.name &&
									(e += "&name=" + encodeURIComponent(n.user.name)),
									n.user.email &&
										(e += "&email=" + encodeURIComponent(n.user.email));
							} else
								e +=
									"&" + encodeURIComponent(o) + "=" + encodeURIComponent(n[o]);
					return i + "?" + e;
				})(t.dsn, t)),
				t.onLoad && (n.onload = t.onLoad);
			var r = Vn.document.head || Vn.document.body;
			r && r.appendChild(n);
		}
	}
	var rr = (function () {
		function t(n) {
			(this.name = t.id),
				(this.Ut = { onerror: ir, onunhandledrejection: er }),
				(this.Y = e({ onerror: !0, onunhandledrejection: !0 }, n));
		}
		return (
			(t.prototype.setupOnce = function () {
				Error.stackTraceLimit = 50;
				var t = this.Y;
				for (var n in t) {
					var r = this.Ut[n];
					r && t[n] && (ur(n), r(), (this.Ut[n] = void 0));
				}
			}),
			(t.id = "GlobalHandlers"),
			t
		);
	})();
	function ir() {
		ct("error", function (n) {
			var r = u(cr(), 2),
				i = r[0],
				e = r[1];
			if (i.getIntegration(rr)) {
				var o = n.msg,
					a = n.url,
					c = n.line,
					s = n.column,
					f = n.error;
				if (!(Yn() || (f && f.__sentry_own_request__))) {
					var h =
						void 0 === f && p(o)
							? (function (t, n, r, i) {
									var e =
											/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i,
										o = d(t) ? t.message : t,
										u = "Error",
										a = o.match(e);
									a && ((u = a[1]), (o = a[2]));
									return or(
										{ exception: { values: [{ type: u, value: o }] } },
										n,
										r,
										i
									);
							  })(o, a, c, s)
							: or(Ln(f || o, void 0, e, !1), a, c, s);
					(h.level = t.Severity.Error), ar(i, f, h, "onerror");
				}
			}
		});
	}
	function er() {
		ct("unhandledrejection", function (n) {
			var r = u(cr(), 2),
				i = r[0],
				e = r[1];
			if (i.getIntegration(rr)) {
				var o = n;
				try {
					"reason" in n
						? (o = n.reason)
						: "detail" in n && "reason" in n.detail && (o = n.detail.reason);
				} catch (t) {}
				if (Yn() || (o && o.__sentry_own_request__)) return !0;
				var a = y(o)
					? {
							exception: {
								values: [
									{
										type: "UnhandledRejection",
										value:
											"Non-Error promise rejection captured with value: " +
											String(o),
									},
								],
							},
					  }
					: Ln(o, void 0, e, !0);
				(a.level = t.Severity.Error), ar(i, o, a, "onunhandledrejection");
			}
		});
	}
	function or(t, n, r, i) {
		var e = (t.exception = t.exception || {}),
			o = (e.values = e.values || []),
			u = (o[0] = o[0] || {}),
			a = (u.stacktrace = u.stacktrace || {}),
			c = (a.frames = a.frames || []),
			f = isNaN(parseInt(i, 10)) ? void 0 : i,
			h = isNaN(parseInt(r, 10)) ? void 0 : r,
			v =
				p(n) && n.length > 0
					? n
					: (function () {
							var t = s();
							try {
								return t.document.location.href;
							} catch (t) {
								return "";
							}
					  })();
		return (
			0 === c.length &&
				c.push({ colno: f, filename: v, function: "?", in_app: !0, lineno: h }),
			t
		);
	}
	function ur(t) {
		0;
	}
	function ar(t, n, r, i) {
		Et(r, { handled: !1, type: i }),
			t.captureEvent(r, { originalException: n });
	}
	function cr() {
		var t = Bt(),
			n = t.getClient();
		return [t, n && n.getOptions().attachStacktrace];
	}
	var sr = [
			"EventTarget",
			"Window",
			"Node",
			"ApplicationCache",
			"AudioTrackList",
			"ChannelMergerNode",
			"CryptoOperation",
			"EventSource",
			"FileReader",
			"HTMLUnknownElement",
			"IDBDatabase",
			"IDBRequest",
			"IDBTransaction",
			"KeyOperation",
			"MediaController",
			"MessagePort",
			"ModalWindow",
			"Notification",
			"SVGElementInstance",
			"Screen",
			"TextTrack",
			"TextTrackCue",
			"TextTrackList",
			"WebSocket",
			"WebSocketWorker",
			"Worker",
			"XMLHttpRequest",
			"XMLHttpRequestEventTarget",
			"XMLHttpRequestUpload",
		],
		fr = (function () {
			function t(n) {
				(this.name = t.id),
					(this.Y = e(
						{
							XMLHttpRequest: !0,
							eventTarget: !0,
							requestAnimationFrame: !0,
							setInterval: !0,
							setTimeout: !0,
						},
						n
					));
			}
			return (
				(t.prototype.setupOnce = function () {
					var t = s();
					this.Y.setTimeout && X(t, "setTimeout", hr),
						this.Y.setInterval && X(t, "setInterval", hr),
						this.Y.requestAnimationFrame && X(t, "requestAnimationFrame", vr),
						this.Y.XMLHttpRequest &&
							"XMLHttpRequest" in t &&
							X(XMLHttpRequest.prototype, "send", dr);
					var n = this.Y.eventTarget;
					n && (Array.isArray(n) ? n : sr).forEach(lr);
				}),
				(t.id = "TryCatch"),
				t
			);
		})();
	function hr(t) {
		return function () {
			for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
			var i = n[0];
			return (
				(n[0] = tr(i, {
					mechanism: {
						data: { function: U(t) },
						handled: !0,
						type: "instrument",
					},
				})),
				t.apply(this, n)
			);
		};
	}
	function vr(t) {
		return function (n) {
			return t.call(
				this,
				tr(n, {
					mechanism: {
						data: { function: "requestAnimationFrame", handler: U(t) },
						handled: !0,
						type: "instrument",
					},
				})
			);
		};
	}
	function dr(t) {
		return function () {
			for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
			var i = this,
				e = ["onload", "onerror", "onprogress", "onreadystatechange"];
			return (
				e.forEach(function (t) {
					t in i &&
						"function" == typeof i[t] &&
						X(i, t, function (n) {
							var r = {
									mechanism: {
										data: { function: t, handler: U(n) },
										handled: !0,
										type: "instrument",
									},
								},
								i = $(n);
							return i && (r.mechanism.data.handler = U(i)), tr(n, r);
						});
				}),
				t.apply(this, n)
			);
		};
	}
	function lr(t) {
		var n = s(),
			r = n[t] && n[t].prototype;
		r &&
			r.hasOwnProperty &&
			r.hasOwnProperty("addEventListener") &&
			(X(r, "addEventListener", function (n) {
				return function (r, i, e) {
					try {
						"function" == typeof i.handleEvent &&
							(i.handleEvent = tr(i.handleEvent.bind(i), {
								mechanism: {
									data: { function: "handleEvent", handler: U(i), target: t },
									handled: !0,
									type: "instrument",
								},
							}));
					} catch (t) {}
					return n.call(
						this,
						r,
						tr(i, {
							mechanism: {
								data: {
									function: "addEventListener",
									handler: U(i),
									target: t,
								},
								handled: !0,
								type: "instrument",
							},
						}),
						e
					);
				};
			}),
			X(r, "removeEventListener", function (t) {
				return function (n, r, i) {
					var e = r;
					try {
						var o = e && e.__sentry_wrapped__;
						o && t.call(this, n, o, i);
					} catch (t) {}
					return t.call(this, n, e, i);
				};
			}));
	}
	var pr = (function () {
		function t(n) {
			(this.name = t.id),
				(this.Y = e(
					{ console: !0, dom: !0, fetch: !0, history: !0, sentry: !0, xhr: !0 },
					n
				));
		}
		return (
			(t.prototype.addSentryBreadcrumb = function (t) {
				this.Y.sentry &&
					Bt().addBreadcrumb(
						{
							category:
								"sentry." +
								("transaction" === t.type ? "transaction" : "event"),
							event_id: t.event_id,
							level: t.level,
							message: gt(t),
						},
						{ event: t }
					);
			}),
			(t.prototype.setupOnce = function () {
				this.Y.console && ct("console", yr),
					this.Y.dom &&
						ct(
							"dom",
							(function (t) {
								function n(n) {
									var r,
										i = "object" == typeof t ? t.serializeAttribute : void 0;
									"string" == typeof i && (i = [i]);
									try {
										r = n.event.target ? E(n.event.target, i) : E(n.event, i);
									} catch (t) {
										r = "<unknown>";
									}
									0 !== r.length &&
										Bt().addBreadcrumb(
											{ category: "ui." + n.name, message: r },
											{ event: n.event, name: n.name, global: n.global }
										);
								}
								return n;
							})(this.Y.dom)
						),
					this.Y.xhr && ct("xhr", mr),
					this.Y.fetch && ct("fetch", br),
					this.Y.history && ct("history", wr);
			}),
			(t.id = "Breadcrumbs"),
			t
		);
	})();
	function yr(t) {
		var n = {
			category: "console",
			data: { arguments: t.args, logger: "console" },
			level: Tt(t.level),
			message: F(t.args, " "),
		};
		if ("assert" === t.level) {
			if (!1 !== t.args[0]) return;
			(n.message =
				"Assertion failed: " + (F(t.args.slice(1), " ") || "console.assert")),
				(n.data.arguments = t.args.slice(1));
		}
		Bt().addBreadcrumb(n, { input: t.args, level: t.level });
	}
	function mr(t) {
		if (t.endTimestamp) {
			if (t.xhr.__sentry_own_request__) return;
			var n = t.xhr.__sentry_xhr__ || {},
				r = n.method,
				i = n.url,
				e = n.status_code,
				o = n.body;
			Bt().addBreadcrumb(
				{
					category: "xhr",
					data: { method: r, url: i, status_code: e },
					type: "http",
				},
				{ xhr: t.xhr, input: o }
			);
		} else;
	}
	function br(n) {
		n.endTimestamp &&
			((n.fetchData.url.match(/sentry_key/) && "POST" === n.fetchData.method) ||
				(n.error
					? Bt().addBreadcrumb(
							{
								category: "fetch",
								data: n.fetchData,
								level: t.Severity.Error,
								type: "http",
							},
							{ data: n.error, input: n.args }
					  )
					: Bt().addBreadcrumb(
							{
								category: "fetch",
								data: e(e({}, n.fetchData), { status_code: n.response.status }),
								type: "http",
							},
							{ input: n.args, response: n.response }
					  )));
	}
	function wr(t) {
		var n = s(),
			r = t.from,
			i = t.to,
			e = bt(n.location.href),
			o = bt(r),
			u = bt(i);
		o.path || (o = e),
			e.protocol === u.protocol && e.host === u.host && (i = u.relative),
			e.protocol === o.protocol && e.host === o.host && (r = o.relative),
			Bt().addBreadcrumb({ category: "navigation", data: { from: r, to: i } });
	}
	var gr = (function () {
		function t(n) {
			void 0 === n && (n = {}),
				(this.name = t.id),
				(this.Ht = n.key || "cause"),
				(this.Ft = n.limit || 5);
		}
		return (
			(t.prototype.setupOnce = function () {
				Ut(function (n, r) {
					var i = Bt().getIntegration(t);
					return i
						? (function (t, n, r, i) {
								if (
									!(
										r.exception &&
										r.exception.values &&
										i &&
										x(i.originalException, Error)
									)
								)
									return r;
								var e = xr(n, i.originalException, t);
								return (r.exception.values = a(e, r.exception.values)), r;
						  })(i.Ht, i.Ft, n, r)
						: n;
				});
			}),
			(t.id = "LinkedErrors"),
			t
		);
	})();
	function xr(t, n, r, i) {
		if ((void 0 === i && (i = []), !x(n[r], Error) || i.length + 1 >= t))
			return i;
		var e = Rn(n[r]);
		return xr(t, n[r], r, a([e], i));
	}
	var Er = s(),
		_r = (function () {
			function t() {
				this.name = t.id;
			}
			return (
				(t.prototype.setupOnce = function () {
					Ut(function (n) {
						if (Bt().getIntegration(t)) {
							if (!Er.navigator && !Er.location && !Er.document) return n;
							var r =
									(n.request && n.request.url) ||
									(Er.location && Er.location.href),
								i = (Er.document || {}).referrer,
								o = (Er.navigator || {}).userAgent,
								u = e(
									e(e({}, n.request && n.request.headers), i && { Referer: i }),
									o && { "User-Agent": o }
								),
								a = e(e({}, r && { url: r }), { headers: u });
							return e(e({}, n), { request: a });
						}
						return n;
					});
				}),
				(t.id = "UserAgent"),
				t
			);
		})(),
		jr = (function () {
			function t() {
				this.name = t.id;
			}
			return (
				(t.prototype.setupOnce = function (n, r) {
					n(function (n) {
						var i = r().getIntegration(t);
						if (i) {
							try {
								if (
									(function (t, n) {
										if (!n) return !1;
										if (
											(function (t, n) {
												var r = t.message,
													i = n.message;
												if (!r && !i) return !1;
												if ((r && !i) || (!r && i)) return !1;
												if (r !== i) return !1;
												if (!Sr(t, n)) return !1;
												if (!kr(t, n)) return !1;
												return !0;
											})(t, n)
										)
											return !0;
										if (
											(function (t, n) {
												var r = Or(n),
													i = Or(t);
												if (!r || !i) return !1;
												if (r.type !== i.type || r.value !== i.value) return !1;
												if (!Sr(t, n)) return !1;
												if (!kr(t, n)) return !1;
												return !0;
											})(t, n)
										)
											return !0;
										return !1;
									})(n, i.Pt)
								)
									return (
										A.warn(
											"Event dropped due to being a duplicate of previously captured event."
										),
										null
									);
							} catch (t) {
								return (i.Pt = n);
							}
							return (i.Pt = n);
						}
						return n;
					});
				}),
				(t.id = "Dedupe"),
				t
			);
		})();
	function kr(t, n) {
		var r = Tr(t),
			i = Tr(n);
		if (!r && !i) return !0;
		if ((r && !i) || (!r && i)) return !1;
		if (((r = r), (i = i).length !== r.length)) return !1;
		for (var e = 0; e < i.length; e++) {
			var o = i[e],
				u = r[e];
			if (
				o.filename !== u.filename ||
				o.lineno !== u.lineno ||
				o.colno !== u.colno ||
				o.function !== u.function
			)
				return !1;
		}
		return !0;
	}
	function Sr(t, n) {
		var r = t.fingerprint,
			i = n.fingerprint;
		if (!r && !i) return !0;
		if ((r && !i) || (!r && i)) return !1;
		(r = r), (i = i);
		try {
			return !(r.join("") !== i.join(""));
		} catch (t) {
			return !1;
		}
	}
	function Or(t) {
		return t.exception && t.exception.values && t.exception.values[0];
	}
	function Tr(t) {
		var n = t.exception;
		if (n)
			try {
				return n.values[0].stacktrace.frames;
			} catch (t) {
				return;
			}
		else if (t.stacktrace) return t.stacktrace.frames;
	}
	var Dr = Object.freeze({
			__proto__: null,
			GlobalHandlers: rr,
			TryCatch: fr,
			Breadcrumbs: pr,
			LinkedErrors: gr,
			UserAgent: _r,
			Dedupe: jr,
		}),
		Rr = (function (t) {
			function n(n) {
				void 0 === n && (n = {});
				return (
					(n.Rt = n.Rt || {}),
					(n.Rt.sdk = n.Rt.sdk || {
						name: "sentry.javascript.browser",
						packages: [{ name: "npm:@sentry/browser", version: fn }],
						version: fn,
					}),
					t.call(this, Kn, n) || this
				);
			}
			return (
				r(n, t),
				(n.prototype.showReportDialog = function (t) {
					void 0 === t && (t = {}),
						s().document &&
							(this.it()
								? nr(e(e({}, t), { dsn: t.dsn || this.getDsn() }))
								: A.error(
										"Trying to call showReportDialog with Sentry Client disabled"
								  ));
				}),
				(n.prototype.at = function (n, r, i) {
					return (
						(n.platform = n.platform || "javascript"),
						t.prototype.at.call(this, n, r, i)
					);
				}),
				(n.prototype.ht = function (n) {
					var r = this.getIntegration(pr);
					r && r.addSentryBreadcrumb(n), t.prototype.ht.call(this, n);
				}),
				n
			);
		})(en),
		Nr = [
			new dn(),
			new hn(),
			new fr(),
			new pr(),
			new rr(),
			new gr(),
			new jr(),
			new _r(),
		];
	function Ir(t) {
		t.startSession({ ignoreDuration: !0 }), t.captureSession();
	}
	var Mr = {},
		qr = s();
	qr.Sentry && qr.Sentry.Integrations && (Mr = qr.Sentry.Integrations);
	var Ar = e(e(e({}, Mr), ln), Dr);
	return (
		(t.BrowserClient = Rr),
		(t.Hub = Ft),
		(t.Integrations = Ar),
		(t.SDK_NAME = "sentry.javascript.browser"),
		(t.SDK_VERSION = fn),
		(t.Scope = Ct),
		(t.Session = Ht),
		(t.Transports = Gn),
		(t.addBreadcrumb = function (t) {
			Jt("addBreadcrumb", t);
		}),
		(t.addGlobalEventProcessor = Ut),
		(t.captureEvent = function (t) {
			return Jt("captureEvent", t);
		}),
		(t.captureException = captureException),
		(t.captureMessage = function (t, n) {
			var r;
			try {
				throw new Error(t);
			} catch (t) {
				r = t;
			}
			return Jt(
				"captureMessage",
				t,
				"string" == typeof n ? n : void 0,
				e(
					{ originalException: t, syntheticException: r },
					"string" != typeof n ? { captureContext: n } : void 0
				)
			);
		}),
		(t.close = function (t) {
			var n = Bt().getClient();
			return n ? n.close(t) : jt(!1);
		}),
		(t.configureScope = function (t) {
			Jt("configureScope", t);
		}),
		(t.defaultIntegrations = Nr),
		(t.eventFromException = An),
		(t.eventFromMessage = Cn),
		(t.flush = function (t) {
			var n = Bt().getClient();
			return n ? n.flush(t) : jt(!1);
		}),
		(t.forceLoad = function () {}),
		(t.getCurrentHub = Bt),
		(t.getHubFromCarrier = Wt),
		(t.init = function (t) {
			if (
				(void 0 === t && (t = {}),
				void 0 === t.defaultIntegrations && (t.defaultIntegrations = Nr),
				void 0 === t.release)
			) {
				var n = s();
				n.SENTRY_RELEASE &&
					n.SENTRY_RELEASE.id &&
					(t.release = n.SENTRY_RELEASE.id);
			}
			void 0 === t.autoSessionTracking && (t.autoSessionTracking = !0),
				void 0 === t.sendClientReports && (t.sendClientReports = !0),
				(function (t, n) {
					!0 === n.debug && A.enable();
					var r = Bt(),
						i = r.getScope();
					i && i.update(n.initialScope);
					var e = new t(n);
					r.bindClient(e);
				})(Rr, t),
				t.autoSessionTracking &&
					(function () {
						if (void 0 === s().document) return void 0;
						var t = Bt();
						if (!t.captureSession) return;
						Ir(t),
							ct("history", function (t) {
								var n = t.from,
									r = t.to;
								void 0 !== n && n !== r && Ir(Bt());
							});
					})();
		}),
		(t.injectReportDialog = nr),
		(t.lastEventId = function () {
			return Bt().lastEventId();
		}),
		(t.makeMain = Xt),
		(t.onLoad = function (t) {
			t();
		}),
		(t.setContext = function (t, n) {
			Jt("setContext", t, n);
		}),
		(t.setExtra = function (t, n) {
			Jt("setExtra", t, n);
		}),
		(t.setExtras = function (t) {
			Jt("setExtras", t);
		}),
		(t.setTag = function (t, n) {
			Jt("setTag", t, n);
		}),
		(t.setTags = function (t) {
			Jt("setTags", t);
		}),
		(t.setUser = function (t) {
			Jt("setUser", t);
		}),
		(t.showReportDialog = function (t) {
			void 0 === t && (t = {});
			var n = Bt(),
				r = n.getScope();
			r && (t.user = e(e({}, r.getUser()), t.user)),
				t.eventId || (t.eventId = n.lastEventId());
			var i = n.getClient();
			i && i.showReportDialog(t);
		}),
		(t.startTransaction = function (t, n) {
			return Jt("startTransaction", e({}, t), n);
		}),
		(t.withScope = zt),
		(t.wrap = function (t) {
			return tr(t)();
		}),
		t
	);
})({});
//# sourceMappingURL=bundle.min.js.map
