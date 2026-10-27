(function () {
  var S = window.SITE, T = window.T, EN = window.LANG === "en", root = document.getElementById("priceRoot"), nav = document.getElementById("priceNav");
  if (!root) return;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  S.groups.forEach(function (g) {
    var title = EN ? g.en : g.title, sub = EN ? "" : g.en, note = EN ? (g.noteEn || "") : (g.note || "");
    var li = document.createElement("li"); li.innerHTML = '<a href="#' + g.id + '">' + esc(title) + "</a>"; nav.appendChild(li);
    var rows = g.items.map(function (it) {
      var name = EN && it[2] ? it[2] : it[0];
      var p = Array.isArray(it[1]) ? "R" + it[1][0] + " " + T.to + " R" + it[1][1] : "R" + String(it[1]).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return "<tr><td>" + esc(name) + '</td><td class="p">' + p + ' <a class="book" href="bespreek.html?dienst=' + encodeURIComponent(g.id + "|" + it[0]) + '" aria-label="' + esc(T.bookAria(name)) + '">' + T.book + "</a></td></tr>";
    }).join("");
    var sec = document.createElement("section"); sec.className = "pgroup"; sec.id = g.id;
    sec.innerHTML = "<h2>" + esc(title) + "</h2>" + (sub ? '<p class="en">' + esc(sub) + "</p>" : "") + (note ? '<p class="note">' + esc(note) + "</p>" : "") + '<table class="prices"><tbody>' + rows + "</tbody></table>";
    root.appendChild(sec);
  });
})();
