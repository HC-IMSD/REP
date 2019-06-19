var goog = goog || {};
goog.DEBUG = !1, goog.inherits = function (t, e) {
    function o() {
    }

    o.prototype = e.prototype, t.superClass_ = e.prototype, t.prototype = new o, t.prototype.constructor = t
}, goog.userAgent || (goog.userAgent = function () {
    var t = "";
    "undefined" != typeof navigator && navigator && "string" == typeof navigator.userAgent && (t = navigator.userAgent);
    var e = 0 == t.indexOf("Opera");
    return {
        jscript: {HAS_JSCRIPT: "ScriptEngine" in this},
        OPERA: e,
        IE: !e && -1 != t.indexOf("MSIE"),
        WEBKIT: !e && -1 != t.indexOf("WebKit")
    }
}()), goog.asserts || (goog.asserts = {
    assert: function (t) {
        if (!t) throw Error("Assertion error")
    }, fail: function () {
    }
}), goog.dom || (goog.dom = {}, goog.dom.DomHelper = function (t) {
    this.document_ = t || document
}, goog.dom.DomHelper.prototype.getDocument = function () {
    return this.document_
}, goog.dom.DomHelper.prototype.createElement = function (t) {
    return this.document_.createElement(t)
}, goog.dom.DomHelper.prototype.createDocumentFragment = function () {
    return this.document_.createDocumentFragment()
}), goog.format || (goog.format = {
    insertWordBreaks: function (t, e) {
        t = String(t);
        for (var o = [], n = 0, i = !1, r = !1, s = 0, a = 0, _ = 0, d = t.length; d > _; ++_) {
            var c = t.charCodeAt(_);
            if (s >= e && 32 != c && (o[n++] = t.substring(a, _), a = _, o[n++] = goog.format.WORD_BREAK, s = 0), i) 62 == c && (i = !1); else if (r) switch (c) {
                case 59:
                    r = !1, ++s;
                    break;
                case 60:
                    r = !1, i = !0;
                    break;
                case 32:
                    r = !1, s = 0
            } else switch (c) {
                case 60:
                    i = !0;
                    break;
                case 38:
                    r = !0;
                    break;
                case 32:
                    s = 0;
                    break;
                default:
                    ++s
            }
        }
        return o[n++] = t.substring(a), o.join("")
    }, WORD_BREAK: goog.userAgent.WEBKIT ? "<wbr></wbr>" : goog.userAgent.OPERA ? "&shy;" : "<wbr>"
}), goog.i18n || (goog.i18n = {
    bidi: {
        detectRtlDirectionality: function (t, e) {
            return t = soyshim.$$bidiStripHtmlIfNecessary_(t, e), soyshim.$$bidiRtlWordRatio_(t) > soyshim.$$bidiRtlDetectionThreshold_
        }
    }
}), goog.i18n.bidi.Dir = {RTL: -1, UNKNOWN: 0, LTR: 1}, goog.i18n.bidi.toDir = function (t) {
    return "number" == typeof t ? t > 0 ? goog.i18n.bidi.Dir.LTR : 0 > t ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.UNKNOWN : t ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
}, goog.i18n.BidiFormatter = function (t) {
    this.dir_ = goog.i18n.bidi.toDir(t)
}, goog.i18n.BidiFormatter.prototype.dirAttr = function (t, e) {
    var o = soy.$$bidiTextDir(t, e);
    return o && o != this.dir_ ? 0 > o ? 'dir="rtl"' : 'dir="ltr"' : ""
}, goog.i18n.BidiFormatter.prototype.endEdge = function () {
    return this.dir_ < 0 ? "left" : "right"
}, goog.i18n.BidiFormatter.prototype.mark = function () {
    return this.dir_ > 0 ? "â€Ž" : this.dir_ < 0 ? "â€" : ""
}, goog.i18n.BidiFormatter.prototype.markAfter = function (t, e) {
    var o = soy.$$bidiTextDir(t, e);
    return soyshim.$$bidiMarkAfterKnownDir_(this.dir_, o, t, e)
}, goog.i18n.BidiFormatter.prototype.spanWrap = function (t) {
    t = String(t);
    var e = soy.$$bidiTextDir(t, !0), o = soyshim.$$bidiMarkAfterKnownDir_(this.dir_, e, t, !0);
    return e > 0 && this.dir_ <= 0 ? t = '<span dir="ltr">' + t + "</span>" : 0 > e && this.dir_ >= 0 && (t = '<span dir="rtl">' + t + "</span>"), t + o
}, goog.i18n.BidiFormatter.prototype.startEdge = function () {
    return this.dir_ < 0 ? "right" : "left"
}, goog.i18n.BidiFormatter.prototype.unicodeWrap = function (t) {
    t = String(t);
    var e = soy.$$bidiTextDir(t, !0), o = soyshim.$$bidiMarkAfterKnownDir_(this.dir_, e, t, !0);
    return e > 0 && this.dir_ <= 0 ? t = "â€ª" + t + "â€¬" : 0 > e && this.dir_ >= 0 && (t = "â€«" + t + "â€¬"), t + o
}, goog.string = {
    newLineToBr: function (t, e) {
        return t = String(t), goog.string.NEWLINE_TO_BR_RE_.test(t) ? t.replace(/(\r\n|\r|\n)/g, e ? "<br />" : "<br>") : t
    }, urlEncode: encodeURIComponent, NEWLINE_TO_BR_RE_: /[\r\n]/
}, goog.string.StringBuffer = function (t) {
    this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "", null != t && this.append.apply(this, arguments)
}, goog.string.StringBuffer.prototype.bufferLength_ = 0, goog.string.StringBuffer.prototype.append = function (t, e) {
    if (goog.userAgent.jscript.HAS_JSCRIPT) if (null == e) this.buffer_[this.bufferLength_++] = t; else {
        var o = this.buffer_;
        o.push.apply(o, arguments), this.bufferLength_ = this.buffer_.length
    } else if (this.buffer_ += t, null != e) for (var n = 1; n < arguments.length; n++) this.buffer_ += arguments[n];
    return this
}, goog.string.StringBuffer.prototype.clear = function () {
    goog.userAgent.jscript.HAS_JSCRIPT ? (this.buffer_.length = 0, this.bufferLength_ = 0) : this.buffer_ = ""
}, goog.string.StringBuffer.prototype.toString = function () {
    if (goog.userAgent.jscript.HAS_JSCRIPT) {
        var t = this.buffer_.join("");
        return this.clear(), t && this.append(t), t
    }
    return this.buffer_
}, goog.soy || (goog.soy = {
    renderAsElement: function (t, e, o, n) {
        return soyshim.$$renderWithWrapper_(t, e, n, !0, o)
    }, renderAsFragment: function (t, e, o, n) {
        return soyshim.$$renderWithWrapper_(t, e, n, !1, o)
    }, renderElement: function (t, e, o, n) {
        t.innerHTML = e(o, null, n)
    }, data: {}
}), goog.soy.data.SanitizedContentKind = {
    HTML: {},
    JS: goog.DEBUG ? {sanitizedContentJsStrChars: !0} : {},
    JS_STR_CHARS: {},
    URI: {},
    ATTRIBUTES: goog.DEBUG ? {sanitizedContentHtmlAttribute: !0} : {},
    CSS: {},
    TEXT: {}
}, goog.soy.data.SanitizedContent = function () {
    throw Error("Do not instantiate directly")
}, goog.soy.data.SanitizedContent.prototype.contentKind, goog.soy.data.SanitizedContent.prototype.content, goog.soy.data.SanitizedContent.prototype.toString = function () {
    return this.content
};
var soy = {esc: {}}, soydata = {};
soydata.VERY_UNSAFE = {};
var soyshim = {$$DEFAULT_TEMPLATE_DATA_: {}};
soyshim.$$renderWithWrapper_ = function (t, e, o, n, i) {
    var r = o || document, s = r.createElement("div");
    if (s.innerHTML = t(e || soyshim.$$DEFAULT_TEMPLATE_DATA_, void 0, i), 1 == s.childNodes.length) {
        var a = s.firstChild;
        if (!n || 1 == a.nodeType) return a
    }
    if (n) return s;
    for (var _ = r.createDocumentFragment(); s.firstChild;) _.appendChild(s.firstChild);
    return _
}, soyshim.$$bidiMarkAfterKnownDir_ = function (t, e, o, n) {
    return t > 0 && (0 > e || soyshim.$$bidiIsRtlExitText_(o, n)) ? "â€Ž" : 0 > t && (e > 0 || soyshim.$$bidiIsLtrExitText_(o, n)) ? "â€" : ""
}, soyshim.$$bidiStripHtmlIfNecessary_ = function (t, e) {
    return e ? t.replace(soyshim.$$BIDI_HTML_SKIP_RE_, " ") : t
}, soyshim.$$BIDI_HTML_SKIP_RE_ = /<[^>]*>|&[^;]+;/g, soyshim.$$bidiLtrChars_ = "A-Za-zÃ€-Ã–Ã˜-Ã¶Ã¸-Ê¸Ì€-Öà €-á¿¿â°€-ï¬œï·¾-ï¹¯ï»½-ï¿¿", soyshim.$$bidiNeutralChars_ = "\x00- !-@[-`{-Â¿Ã—Ã·Ê¹-Ë¿â€€-â¯¿", soyshim.$$bidiRtlChars_ = "Ö‘-ß¿ï¬-ï·½ï¹°-ï»¼", soyshim.$$bidiRtlDirCheckRe_ = new RegExp("^[^" + soyshim.$$bidiLtrChars_ + "]*[" + soyshim.$$bidiRtlChars_ + "]"), soyshim.$$bidiNeutralDirCheckRe_ = new RegExp("^[" + soyshim.$$bidiNeutralChars_ + "]*$|^http://"), soyshim.$$bidiIsRtlText_ = function (t) {
    return soyshim.$$bidiRtlDirCheckRe_.test(t)
}, soyshim.$$bidiIsNeutralText_ = function (t) {
    return soyshim.$$bidiNeutralDirCheckRe_.test(t)
}, soyshim.$$bidiRtlDetectionThreshold_ = .4, soyshim.$$bidiRtlWordRatio_ = function (t) {
    for (var e = 0, o = 0, n = t.split(" "), i = 0; i < n.length; i++) soyshim.$$bidiIsRtlText_(n[i]) ? (e++, o++) : soyshim.$$bidiIsNeutralText_(n[i]) || o++;
    return 0 == o ? 0 : e / o
}, soyshim.$$bidiLtrExitDirCheckRe_ = new RegExp("[" + soyshim.$$bidiLtrChars_ + "][^" + soyshim.$$bidiRtlChars_ + "]*$"), soyshim.$$bidiRtlExitDirCheckRe_ = new RegExp("[" + soyshim.$$bidiRtlChars_ + "][^" + soyshim.$$bidiLtrChars_ + "]*$"), soyshim.$$bidiIsLtrExitText_ = function (t, e) {
    return t = soyshim.$$bidiStripHtmlIfNecessary_(t, e), soyshim.$$bidiLtrExitDirCheckRe_.test(t)
}, soyshim.$$bidiIsRtlExitText_ = function (t, e) {
    return t = soyshim.$$bidiStripHtmlIfNecessary_(t, e), soyshim.$$bidiRtlExitDirCheckRe_.test(t)
}, soy.StringBuilder = goog.string.StringBuffer, soydata.SanitizedContentKind = goog.soy.data.SanitizedContentKind, soydata.SanitizedHtml = function () {
    goog.soy.data.SanitizedContent.call(this)
}, goog.inherits(soydata.SanitizedHtml, goog.soy.data.SanitizedContent), soydata.SanitizedHtml.prototype.contentKind = soydata.SanitizedContentKind.HTML, soydata.SanitizedJs = function () {
    goog.soy.data.SanitizedContent.call(this)
}, goog.inherits(soydata.SanitizedJs, goog.soy.data.SanitizedContent), soydata.SanitizedJs.prototype.contentKind = soydata.SanitizedContentKind.JS, soydata.SanitizedJsStrChars = function () {
    goog.soy.data.SanitizedContent.call(this)
}, goog.inherits(soydata.SanitizedJsStrChars, goog.soy.data.SanitizedContent), soydata.SanitizedJsStrChars.prototype.contentKind = soydata.SanitizedContentKind.JS_STR_CHARS, soydata.SanitizedUri = function () {
    goog.soy.data.SanitizedContent.call(this)
}, goog.inherits(soydata.SanitizedUri, goog.soy.data.SanitizedContent), soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI, soydata.SanitizedHtmlAttribute = function () {
    goog.soy.data.SanitizedContent.call(this)
}, goog.inherits(soydata.SanitizedHtmlAttribute, goog.soy.data.SanitizedContent), soydata.SanitizedHtmlAttribute.prototype.contentKind = soydata.SanitizedContentKind.ATTRIBUTES, soydata.SanitizedCss = function () {
    goog.soy.data.SanitizedContent.call(this)
}, goog.inherits(soydata.SanitizedCss, goog.soy.data.SanitizedContent), soydata.SanitizedCss.prototype.contentKind = soydata.SanitizedContentKind.CSS, soydata.UnsanitizedText = function (t) {
    this.content = String(t)
}, goog.inherits(soydata.UnsanitizedText, goog.soy.data.SanitizedContent), soydata.UnsanitizedText.prototype.contentKind = soydata.SanitizedContentKind.TEXT, soydata.$$makeSanitizedContentFactory_ = function (t) {
    function e() {
    }

    return e.prototype = t.prototype, function (t) {
        var o = new e;
        return o.content = String(t), o
    }
}, soydata.markUnsanitizedText = function (t) {
    return new soydata.UnsanitizedText(t)
}, soydata.VERY_UNSAFE.ordainSanitizedHtml = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtml), soydata.VERY_UNSAFE.ordainSanitizedJs = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedJs), soydata.VERY_UNSAFE.ordainSanitizedJsStrChars = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedJsStrChars), soydata.VERY_UNSAFE.ordainSanitizedUri = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedUri), soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtmlAttribute), soydata.VERY_UNSAFE.ordainSanitizedCss = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedCss), soy.renderElement = goog.soy.renderElement, soy.renderAsFragment = function (t, e, o, n) {
    return goog.soy.renderAsFragment(t, e, n, new goog.dom.DomHelper(o))
}, soy.renderAsElement = function (t, e, o, n) {
    return goog.soy.renderAsElement(t, e, n, new goog.dom.DomHelper(o))
}, soy.$$augmentMap = function (t, e) {
    function o() {
    }

    o.prototype = t;
    var n = new o;
    for (var i in e) n[i] = e[i];
    return n
}, soy.$$checkMapKey = function (t) {
    if ("string" != typeof t) throw Error("Map literal's key expression must evaluate to string (encountered type \"" + typeof t + '").');
    return t
}, soy.$$getMapKeys = function (t) {
    var e = [];
    for (var o in t) e.push(o);
    return e
}, soy.$$getDelTemplateId = function (t) {
    return t
}, soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {}, soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {}, soy.$$registerDelegateFn = function (t, e, o, n) {
    var i = "key_" + t + ":" + e, r = soy.$$DELEGATE_REGISTRY_PRIORITIES_[i];
    if (void 0 === r || o > r) soy.$$DELEGATE_REGISTRY_PRIORITIES_[i] = o, soy.$$DELEGATE_REGISTRY_FUNCTIONS_[i] = n; else if (o == r) throw Error('Encountered two active delegates with the same priority ("' + t + ":" + e + '").')
}, soy.$$getDelegateFn = function (t, e, o) {
    var n = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + t + ":" + e];
    if (n || "" == e || (n = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + t + ":"]), n) return n;
    if (o) return soy.$$EMPTY_TEMPLATE_FN_;
    throw Error('Found no active impl for delegate call to "' + t + ":" + e + '" (and not allowemptydefault="true").')
}, soy.$$EMPTY_TEMPLATE_FN_ = function () {
    return ""
}, soy.$$escapeHtml = function (t) {
    return t && t.contentKind && t.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(t.constructor === soydata.SanitizedHtml), t.content) : soy.esc.$$escapeHtmlHelper(t)
}, soy.$$cleanHtml = function (t) {
    return t && t.contentKind && t.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(t.constructor === soydata.SanitizedHtml), t.content) : soy.$$stripHtmlTags(t, soy.esc.$$SAFE_TAG_WHITELIST_)
}, soy.$$escapeHtmlRcdata = function (t) {
    return t && t.contentKind && t.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(t.constructor === soydata.SanitizedHtml), soy.esc.$$normalizeHtmlHelper(t.content)) : soy.esc.$$escapeHtmlHelper(t)
}, soy.$$HTML5_VOID_ELEMENTS_ = new RegExp("^<(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\\b"), soy.$$stripHtmlTags = function (t, e) {
    if (!e) return String(t).replace(soy.esc.$$HTML_TAG_REGEX_, "").replace(soy.esc.$$LT_REGEX_, "&lt;");
    var o = String(t).replace(/\[/g, "&#91;"), n = [];
    o = o.replace(soy.esc.$$HTML_TAG_REGEX_, function (t, o) {
        if (o && (o = o.toLowerCase(), e.hasOwnProperty(o) && e[o])) {
            var i = "/" === t.charAt(1) ? "</" : "<", r = n.length;
            return n[r] = i + o + ">", "[" + r + "]"
        }
        return ""
    }), o = soy.esc.$$normalizeHtmlHelper(o);
    var i = soy.$$balanceTags_(n);
    return o = o.replace(/\[(\d+)\]/g, function (t, e) {
        return n[e]
    }), o + i
}, soy.$$balanceTags_ = function (t) {
    for (var e = [], o = 0, n = t.length; n > o; ++o) {
        var i = t[o];
        if ("/" === i.charAt(1)) {
            for (var r = e.length - 1; r >= 0 && e[r] != i;) r--;
            0 > r ? t[o] = "" : (t[o] = e.slice(r).reverse().join(""), e.length = r)
        } else soy.$$HTML5_VOID_ELEMENTS_.test(i) || e.push("</" + i.substring(1))
    }
    return e.reverse().join("")
}, soy.$$escapeHtmlAttribute = function (t) {
    return t && t.contentKind && t.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(t.constructor === soydata.SanitizedHtml), soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags(t.content))) : soy.esc.$$escapeHtmlHelper(t)
}, soy.$$escapeHtmlAttributeNospace = function (t) {
    return t && t.contentKind && t.contentKind === goog.soy.data.SanitizedContentKind.HTML ? (goog.asserts.assert(t.constructor === soydata.SanitizedHtml), soy.esc.$$normalizeHtmlNospaceHelper(soy.$$stripHtmlTags(t.content))) : soy.esc.$$escapeHtmlNospaceHelper(t)
}, soy.$$filterHtmlAttributes = function (t) {
    return t && t.contentKind === goog.soy.data.SanitizedContentKind.ATTRIBUTES ? (goog.asserts.assert(t.constructor === soydata.SanitizedHtmlAttribute), t.content.replace(/([^"'\s])$/, "$1 ")) : soy.esc.$$filterHtmlAttributesHelper(t)
}, soy.$$filterHtmlElementName = function (t) {
    return soy.esc.$$filterHtmlElementNameHelper(t)
}, soy.$$escapeJs = function (t) {
    return soy.$$escapeJsString(t)
}, soy.$$escapeJsString = function (t) {
    return t && t.contentKind === goog.soy.data.SanitizedContentKind.JS_STR_CHARS ? (goog.asserts.assert(t.constructor === soydata.SanitizedJsStrChars), t.content) : soy.esc.$$escapeJsStringHelper(t)
}, soy.$$escapeJsValue = function (t) {
    if (null == t) return " null ";
    if (t.contentKind == goog.soy.data.SanitizedContentKind.JS) return goog.asserts.assert(t.constructor === soydata.SanitizedJs), t.content;
    switch (typeof t) {
        case"boolean":
        case"number":
            return " " + t + " ";
        default:
            return "'" + soy.esc.$$escapeJsStringHelper(String(t)) + "'"
    }
}, soy.$$escapeJsRegex = function (t) {
    return soy.esc.$$escapeJsRegexHelper(t)
}, soy.$$problematicUriMarks_ = /['()]/g, soy.$$pctEncode_ = function (t) {
    return "%" + t.charCodeAt(0).toString(16)
}, soy.$$escapeUri = function (t) {
    if (t && t.contentKind === goog.soy.data.SanitizedContentKind.URI) return goog.asserts.assert(t.constructor === soydata.SanitizedUri), soy.$$normalizeUri(t);
    var e = soy.esc.$$escapeUriHelper(t);
    return soy.$$problematicUriMarks_.lastIndex = 0, soy.$$problematicUriMarks_.test(e) ? e.replace(soy.$$problematicUriMarks_, soy.$$pctEncode_) : e
}, soy.$$normalizeUri = function (t) {
    return soy.esc.$$normalizeUriHelper(t)
}, soy.$$filterNormalizeUri = function (t) {
    return t && t.contentKind == goog.soy.data.SanitizedContentKind.URI ? (goog.asserts.assert(t.constructor === soydata.SanitizedUri), soy.$$normalizeUri(t)) : soy.esc.$$filterNormalizeUriHelper(t)
}, soy.$$escapeCssString = function (t) {
    return soy.esc.$$escapeCssStringHelper(t)
}, soy.$$filterCssValue = function (t) {
    return t && t.contentKind === goog.soy.data.SanitizedContentKind.CSS ? (goog.asserts.assert(t.constructor === soydata.SanitizedCss), t.content) : null == t ? "" : soy.esc.$$filterCssValueHelper(t)
}, soy.$$filterNoAutoescape = function (t) {
    return t && t.contentKind === goog.soy.data.SanitizedContentKind.TEXT ? (goog.asserts.fail("Tainted SanitizedContentKind.TEXT for |noAutoescape: `%s`", [t.content]), "zSoyz") : String(t)
}, soy.$$changeNewlineToBr = function (t) {
    return goog.string.newLineToBr(String(t), !1)
}, soy.$$insertWordBreaks = function (t, e) {
    return goog.format.insertWordBreaks(String(t), e)
}, soy.$$truncate = function (t, e, o) {
    return t = String(t), t.length <= e ? t : (o && (e > 3 ? e -= 3 : o = !1), soy.$$isHighSurrogate_(t.charAt(e - 1)) && soy.$$isLowSurrogate_(t.charAt(e)) && (e -= 1), t = t.substring(0, e), o && (t += "..."), t)
}, soy.$$isHighSurrogate_ = function (t) {
    return t >= 55296 && 56319 >= t
}, soy.$$isLowSurrogate_ = function (t) {
    return t >= 56320 && 57343 >= t
}, soy.$$bidiFormatterCache_ = {}, soy.$$getBidiFormatterInstance_ = function (t) {
    return soy.$$bidiFormatterCache_[t] || (soy.$$bidiFormatterCache_[t] = new goog.i18n.BidiFormatter(t))
}, soy.$$bidiTextDir = function (t, e) {
    return t ? goog.i18n.bidi.detectRtlDirectionality(t, e) ? -1 : 1 : 0
}, soy.$$bidiDirAttr = function (t, e, o) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute(soy.$$getBidiFormatterInstance_(t).dirAttr(e, o))
}, soy.$$bidiMarkAfter = function (t, e, o) {
    var n = soy.$$getBidiFormatterInstance_(t);
    return n.markAfter(e, o)
}, soy.$$bidiSpanWrap = function (t, e) {
    var o = soy.$$getBidiFormatterInstance_(t);
    return o.spanWrap(e + "", !0)
}, soy.$$bidiUnicodeWrap = function (t, e) {
    var o = soy.$$getBidiFormatterInstance_(t);
    return o.unicodeWrap(e + "", !0)
}, soy.esc.$$escapeUriHelper = function (t) {
    return encodeURIComponent(String(t))
}, soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = {
    "\x00": "&#0;",
    '"': "&quot;",
    "&": "&",
    "'": "&#39;",
    "<": "&lt;",
    ">": "&gt;",
    "	": "&#9;",
    "\n": "&#10;",
    "": "&#11;",
    "\f": "&#12;",
    "\r": "&#13;",
    " ": "&#32;",
    "-": "&#45;",
    "/": "&#47;",
    "=": "&#61;",
    "`": "&#96;",
    "Â…": "&#133;",
    " ": "&#160;",
    "\u2028": "&#8232;",
    "\u2029": "&#8233;"
}, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = function (t) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[t]
}, soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = {
    "\x00": "\\x00",
    "\b": "\\x08",
    "	": "\\t",
    "\n": "\\n",
    "": "\\x0b",
    "\f": "\\f",
    "\r": "\\r",
    '"': "\\x22",
    "&": "\\x26",
    "'": "\\x27",
    "/": "\\/",
    "<": "\\x3c",
    "=": "\\x3d",
    ">": "\\x3e",
    "\\": "\\\\",
    "Â…": "\\x85",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
    $: "\\x24",
    "(": "\\x28",
    ")": "\\x29",
    "*": "\\x2a",
    "+": "\\x2b",
    ",": "\\x2c",
    "-": "\\x2d",
    ".": "\\x2e",
    ":": "\\x3a",
    "?": "\\x3f",
    "[": "\\x5b",
    "]": "\\x5d",
    "^": "\\x5e",
    "{": "\\x7b",
    "|": "\\x7c",
    "}": "\\x7d"
}, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = function (t) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[t]
}, soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_ = {
    "\x00": "\\0 ",
    "\b": "\\8 ",
    "	": "\\9 ",
    "\n": "\\a ",
    "": "\\b ",
    "\f": "\\c ",
    "\r": "\\d ",
    '"': "\\22 ",
    "&": "\\26 ",
    "'": "\\27 ",
    "(": "\\28 ",
    ")": "\\29 ",
    "*": "\\2a ",
    "/": "\\2f ",
    ":": "\\3a ",
    ";": "\\3b ",
    "<": "\\3c ",
    "=": "\\3d ",
    ">": "\\3e ",
    "@": "\\40 ",
    "\\": "\\5c ",
    "{": "\\7b ",
    "}": "\\7d ",
    "Â…": "\\85 ",
    " ": "\\a0 ",
    "\u2028": "\\2028 ",
    "\u2029": "\\2029 "
}, soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_ = function (t) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[t]
},soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = {
    "\x00": "%00",
    "": "%01",
    "": "%02",
    "": "%03",
    "": "%04",
    "": "%05",
    "": "%06",
    "": "%07",
    "\b": "%08",
    "	": "%09",
    "\n": "%0A",
    "": "%0B",
    "\f": "%0C",
    "\r": "%0D",
    "": "%0E",
    "": "%0F",
    "": "%10",
    "": "%11",
    "": "%12",
    "": "%13",
    "": "%14",
    "": "%15",
    "": "%16",
    "": "%17",
    "": "%18",
    "": "%19",
    "": "%1A",
    "": "%1B",
    "": "%1C",
    "": "%1D",
    "": "%1E",
    "": "%1F",
    " ": "%20",
    '"': "%22",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "<": "%3C",
    ">": "%3E",
    "\\": "%5C",
    "{": "%7B",
    "}": "%7D",
    "": "%7F",
    "Â…": "%C2%85",
    " ": "%C2%A0",
    "\u2028": "%E2%80%A8",
    "\u2029": "%E2%80%A9",
    "ï¼": "%EF%BC%81",
    "ï¼ƒ": "%EF%BC%83",
    "ï¼„": "%EF%BC%84",
    "ï¼†": "%EF%BC%86",
    "ï¼‡": "%EF%BC%87",
    "ï¼ˆ": "%EF%BC%88",
    "ï¼‰": "%EF%BC%89",
    "ï¼Š": "%EF%BC%8A",
    "ï¼‹": "%EF%BC%8B",
    "ï¼Œ": "%EF%BC%8C",
    "ï¼": "%EF%BC%8F",
    "ï¼š": "%EF%BC%9A",
    "ï¼›": "%EF%BC%9B",
    "ï¼": "%EF%BC%9D",
    "ï¼Ÿ": "%EF%BC%9F",
    "ï¼ ": "%EF%BC%A0",
    "ï¼»": "%EF%BC%BB",
    "ï¼½": "%EF%BC%BD"
},soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = function (t) {
    return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_[t]
},soy.esc.$$MATCHER_FOR_ESCAPE_HTML_ = /[\x00\x22\x26\x27\x3c\x3e]/g,soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_ = /[\x00\x22\x27\x3c\x3e]/g,soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g,soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g,soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_ = /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_ = /[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g,soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_ = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g,soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_ = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i,soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_ = /^(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i,soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_ = /^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i,soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_ = /^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i,soy.esc.$$escapeHtmlHelper = function (t) {
    var e = String(t);
    return e.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
},soy.esc.$$normalizeHtmlHelper = function (t) {
    var e = String(t);
    return e.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
},soy.esc.$$escapeHtmlNospaceHelper = function (t) {
    var e = String(t);
    return e.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
},soy.esc.$$normalizeHtmlNospaceHelper = function (t) {
    var e = String(t);
    return e.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
},soy.esc.$$escapeJsStringHelper = function (t) {
    var e = String(t);
    return e.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
},soy.esc.$$escapeJsRegexHelper = function (t) {
    var e = String(t);
    return e.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
},soy.esc.$$escapeCssStringHelper = function (t) {
    var e = String(t);
    return e.replace(soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_)
},soy.esc.$$filterCssValueHelper = function (t) {
    var e = String(t);
    return soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test(e) ? e : "zSoyz"
},soy.esc.$$normalizeUriHelper = function (t) {
    var e = String(t);
    return e.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_)
},soy.esc.$$filterNormalizeUriHelper = function (t) {
    var e = String(t);
    return soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test(e) ? e.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_) : "#zSoyz"
},soy.esc.$$filterHtmlAttributesHelper = function (t) {
    var e = String(t);
    return soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_.test(e) ? e : "zSoyz"
},soy.esc.$$filterHtmlElementNameHelper = function (t) {
    var e = String(t);
    return soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test(e) ? e : "zSoyz"
},soy.esc.$$HTML_TAG_REGEX_ = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,soy.esc.$$LT_REGEX_ = /</g,soy.esc.$$SAFE_TAG_WHITELIST_ = {
    b: 1,
    br: 1,
    em: 1,
    i: 1,
    s: 1,
    sub: 1,
    sup: 1,
    u: 1
};