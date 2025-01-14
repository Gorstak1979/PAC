// Regular expression patterns for popular ad domains and subdomains
var adRegex = new RegExp(
  "^(.+[-_.])?(ad[sxv]?|teads?|doubleclick|adservice|adtrack(er|ing)?|advertising|adnxs|admeld|advert|adx(addy|pose|pr[io])?|adform|admulti|adbutler|adblade|adroll|adgr[ao]|adinterax|admarvel|admed(ia|ix)|adperium|adplugg|adserver|adsolut|adtegr(it|ity)|adtraxx|advertising|aff(iliat(es?|ion))|akamaihd|amazon-adsystem|appnexus|appsflyer|audience2media|bingads|bidswitch|brightcove|casalemedia|contextweb|criteo|doubleclick|emxdgt|e-planning|exelator|eyewonder|flashtalking|goog(le(syndication|tagservices))|gunggo|hurra(h|ynet)|imrworldwide|insightexpressai|kontera|lifestreetmedia|lkntracker|mediaplex|ooyala|openx|pixel(e|junky)|popcash|propellerads|pubmatic|quantserve|revcontent|revenuehits|sharethrough|skimresources|taboola|traktrafficx|twitter[.]com|undertone|yieldmo)",
  "i"
);


// Additional rules to block YouTube ads
if (shExpMatch(url, "*&adformat=*") || shExpMatch(url, "*&ctier=*") || shExpMatch(url, "*doubleclick.net*")) {
    return "DIRECT";
}

function FindProxyForURL(url, host) {
    url = url.toLowerCase();
    host = host.toLowerCase();

    // Block known YouTube ad-serving endpoints
    if (
        url.indexOf("youtube.com") !== -1 &&
        (url.indexOf("/ads") !== -1 ||
         url.indexOf("/doubleclick") !== -1 ||
         url.indexOf("adformat") !== -1 ||
         url.indexOf("/api/stats/ads") !== -1 ||
         url.indexOf("/pagead") !== -1)
    ) {
        return "PROXY 0.0.0.0:0";
    }

    // General ad-blocking based on regex
    if (adRegex.test(host)) {
        return "PROXY 0.0.0.0:0";
    }

    // Default action: direct connection
    return "DIRECT";
}
