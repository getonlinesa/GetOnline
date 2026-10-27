/* Shared logic: slots, demo bookings, live status. DEMO MODE: everything is stored in localStorage on this device only. */
(function () {
  document.documentElement.classList.add("js");
  var S = window.SITE, T = window.T;
  var KEY_B = "mooi_demo_bookings", KEY_O = "mooi_demo_override";
  var DAYS = T.days, MONTHS = T.months;

  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ymd(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function hash(str) { var h = 7; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h; }
  function minutes(t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; }
  function label(m) { return pad(Math.floor(m / 60)) + ":" + pad(m % 60); }
  function niceDate(s) { var d = parse(s); return DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()]; }

  // Slot times for a date (empty when closed). Past slots today are flagged.
  function slotsFor(dateStr) {
    var d = parse(dateStr), h = S.hours[d.getDay()];
    if (!h) return [];
    var out = [], now = new Date(), isToday = ymd(now) === dateStr;
    for (var m = minutes(h[0]); m + S.slotMinutes <= minutes(h[1]); m += S.slotMinutes) {
      out.push({ time: label(m), past: isToday && m <= now.getHours() * 60 + now.getMinutes() });
    }
    return out;
  }
  // Demo-only pretend bookings so the calendar looks lived-in. Replace by real data when live.
  function seeded(dateStr, time) {
    var day = hash(dateStr) % 60 + 30; // 30..89 percent busy for that day
    return hash(dateStr + "|" + time) % 100 < day;
  }
  function taken(dateStr, time, bookings) {
    if (seeded(dateStr, time)) return true;
    var n = 0; (bookings || load(KEY_B, [])).forEach(function (b) { if (b.date === dateStr && b.time === time) n++; });
    return n >= S.rooms;
  }
  function override(dateStr) { return (load(KEY_O, {}) || {})[dateStr] || "auto"; }
  // Live status for a date: level quiet | busy | full | closed
  function status(dateStr) {
    var slots = slotsFor(dateStr).filter(function (s) { return !s.past; });
    var o = override(dateStr);
    var total = slots.length, free = 0, b = load(KEY_B, []), next = null;
    slots.forEach(function (s) { if (!taken(dateStr, s.time, b)) { free++; if (!next) next = s.time; } });
    var level = "quiet";
    if (!slotsFor(dateStr).length) level = "closed";
    else if (total === 0) level = "closed"; // today, but past closing time
    else if (free === 0) level = "full";
    else if (free / total < 0.35) level = "busy";
    if (o !== "auto" && level !== "closed") level = o === "quiet" ? "quiet" : o;
    return { level: level, free: free, total: total, next: next, overridden: o !== "auto" };
  }
  var TEXT = T.lvl;

  function renderStatus(el) {
    var t = ymd(new Date()), st = status(t), msg;
    if (st.level === "closed") {
      var d = new Date(), nd = "";
      for (var i = 1; i < 14 && !nd; i++) { d.setDate(d.getDate() + 1); var ds = ymd(d), s2 = status(ds); if (s2.level !== "closed" && s2.free > 0) nd = niceDate(ds) + (s2.next ? " " + T.at + " " + s2.next : ""); }
      msg = nd ? T.stNext(nd) : T.stLater;
    }
    else if (st.level === "full") msg = T.stFull;
    else msg = T.stOpen(st.free, st.next);
    var html = '<span class="dot pulse" aria-hidden="true"></span><span><b>' + TEXT[st.level] + "</b>: " + msg + "</span>";
    if (el.getAttribute("data-html") === html) return; // unchanged: do not re-announce to screen readers
    el.setAttribute("data-html", html); el.setAttribute("data-level", st.level); el.innerHTML = html;
  }
  function initStatus() {
    var els = document.querySelectorAll("[data-live-status]");
    function all() { els.forEach(renderStatus); }
    all(); setInterval(all, 30000);
    window.addEventListener("storage", all);
    window.addEventListener("mooi:update", all);
  }

  window.MOOI = { S: S, T: T, load: load, save: save, ymd: ymd, parse: parse, niceDate: niceDate, slotsFor: slotsFor, taken: taken, status: status, override: override, TEXT: TEXT, KEY_B: KEY_B, KEY_O: KEY_O, DAYS: DAYS, MONTHS: MONTHS, pad: pad };

  document.addEventListener("DOMContentLoaded", function () {
    initStatus();
    var band = document.querySelector(".band");
    if (band) { if ("IntersectionObserver" in window) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { band.classList.add("in"); io.disconnect(); } }); }, { threshold: 0.4 }); io.observe(band); } else band.classList.add("in"); }
    var y = document.getElementById("yr"); if (y) y.textContent = new Date().getFullYear();
    var cur = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a").forEach(function (a) { if (a.getAttribute("href") === cur) a.setAttribute("aria-current", "page"); });
  });
})();
