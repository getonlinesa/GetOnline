(function () {
  var M = window.MOOI, S = M.S, T = M.T, EN = window.LANG === "en";
  var form = document.getElementById("bookForm");
  if (!form) return;
  var state = { date: "", time: "" };
  var dateBox = document.getElementById("dates"), timeBox = document.getElementById("times");
  var svc = document.getElementById("service");
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  // Build service dropdown from data; honour ?dienst= from the price list.
  S.groups.forEach(function (g) {
    var og = document.createElement("optgroup"); og.label = EN ? g.en : g.title;
    g.items.forEach(function (it) {
      var o = document.createElement("option"), name = EN && it[2] ? it[2] : it[0];
      var price = Array.isArray(it[1]) ? "R" + it[1][0] + " " + T.to + " R" + it[1][1] : "R" + it[1];
      o.value = g.id + "|" + it[0]; o.setAttribute("data-name", name); o.textContent = name + " (" + price + ")"; og.appendChild(o);
    });
    svc.appendChild(og);
  });
  function preselect() {
    var m = location.hash.split("?")[1], q = m ? new URLSearchParams(m).get("dienst") : new URLSearchParams(location.search).get("dienst");
    if (q) { for (var i = 0; i < svc.options.length; i++) if (svc.options[i].value === q) svc.selectedIndex = i; }
  }
  window.MOOI_PRESELECT = preselect; preselect();

  function drawDates() {
    dateBox.innerHTML = "";
    var d = new Date(), n = 0, shown = 0;
    while (shown < S.bookingDays && n < 60) {
      var ds = M.ymd(d), st = M.status(ds);
      if (st.level !== "closed") {
        var b = document.createElement("button");
        b.type = "button"; b.className = "chip"; b.setAttribute("data-date", ds);
        b.setAttribute("aria-pressed", state.date === ds ? "true" : "false");
        var full = st.level === "full";
        if (full) b.disabled = true;
        b.innerHTML = M.DAYS[d.getDay()].slice(0, 3) + " " + d.getDate() + "<small>" + M.MONTHS[d.getMonth()].slice(0, 3) + '</small><span class="lvl">' + M.TEXT[st.level] + "</span>";
        b.setAttribute("aria-label", M.niceDate(ds) + ", " + M.TEXT[st.level]);
        b.addEventListener("click", function (e) { pickDate(e.currentTarget.getAttribute("data-date")); });
        dateBox.appendChild(b); shown++;
      }
      d.setDate(d.getDate() + 1); n++;
    }
  }
  function pickDate(ds) {
    state.date = ds; state.time = ""; drawDates(); drawTimes(); validate("time", true);
    document.getElementById("pickedDay").textContent = M.niceDate(ds);
  }
  function drawTimes() {
    timeBox.innerHTML = "";
    if (!state.date) { timeBox.innerHTML = '<p class="note">' + T.pickDay + "</p>"; return; }
    var b = M.load(M.KEY_B, []);
    M.slotsFor(state.date).forEach(function (s) {
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "chip"; btn.textContent = s.time;
      var gone = s.past || M.taken(state.date, s.time, b);
      if (gone) { btn.disabled = true; btn.setAttribute("aria-label", s.time + ", " + (s.past ? T.past : T.fullChip)); }
      btn.setAttribute("aria-pressed", state.time === s.time ? "true" : "false");
      btn.addEventListener("click", function () { state.time = s.time; drawTimes(); validate("time", true); });
      timeBox.appendChild(btn);
    });
  }

  function setErr(id, msg) { var e = document.getElementById("err-" + id); if (e) e.textContent = msg || ""; var f = document.getElementById(id); if (f) f.setAttribute("aria-invalid", msg ? "true" : "false"); return !msg; }
  function validate(k, soft) {
    var v = function (id) { return (document.getElementById(id).value || "").trim(); };
    switch (k) {
      case "service": return setErr("service", v("service") ? "" : T.errService);
      case "time": return setErr("time", state.date && state.time ? "" : (soft ? "" : T.errTime));
      case "name": return setErr("name", v("name").length >= 2 ? "" : T.errName);
      case "phone": return setErr("phone", /^(\+?27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/.test(v("phone")) ? "" : T.errPhone);
      case "email": return setErr("email", !v("email") || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("email")) ? "" : T.errEmail);
      case "consent": return setErr("consent", document.getElementById("consent").checked ? "" : T.errConsent);
    }
  }
  // Show errors on blur; clear them while typing, so the form does not jump under the next click.
  ["service", "name", "phone", "email"].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener("blur", function () { validate(id); });
    el.addEventListener(id === "service" ? "change" : "input", function () { if (el.getAttribute("aria-invalid") === "true") validate(id); });
  });
  document.getElementById("consent").addEventListener("change", function () { validate("consent"); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (document.getElementById("website").value) return; // honeypot: do not pretend it was sent
    var ok = ["service", "time", "name", "phone", "email", "consent"].map(function (k) { return validate(k); }).every(Boolean);
    var res = document.getElementById("result"); res.innerHTML = "";
    if (!ok) { var bad = form.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); return; }
    var bookings = M.load(M.KEY_B, []);
    if (M.taken(state.date, state.time, bookings)) {
      res.innerHTML = '<div class="msg bad" role="alert">' + T.slotTaken + "</div>";
      state.time = ""; drawTimes(); return;
    }
    var opt = svc.options[svc.selectedIndex];
    var rec = { id: Date.now().toString(36), date: state.date, time: state.time, service: opt.getAttribute("data-name"), name: document.getElementById("name").value.trim(), phone: document.getElementById("phone").value.trim(), note: document.getElementById("note").value.trim(), created: new Date().toISOString() };
    bookings.push(rec);
    if (!M.save(M.KEY_B, bookings)) { res.innerHTML = '<div class="msg bad" role="alert">' + T.saveFail + "</div>"; return; }
    window.dispatchEvent(new Event("mooi:update"));
    var wa = "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(T.waMsg(rec.service, M.niceDate(rec.date), rec.time, rec.name));
    res.innerHTML = '<div class="msg ok" role="status"><b>' + esc(T.okTitle(rec.name.split(" ")[0])) + "</b><br>" + esc(rec.service) + "<br>" + M.niceDate(rec.date) + " " + T.at + " " + rec.time +
      "<br><small>" + T.okDemo + "</small></div>" +
      '<p><a class="btn ghost" href="' + wa + '" target="_blank" rel="noopener">' + T.okWa + "</a></p>";
    form.reset(); state = { date: "", time: "" }; drawDates(); drawTimes(); document.getElementById("pickedDay").textContent = "";
    res.scrollIntoView({ block: "nearest" });
  });

  window.addEventListener("storage", function () { drawDates(); drawTimes(); });
  drawDates(); drawTimes();
})();
