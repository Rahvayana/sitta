(function () {
  var page = document.body.dataset.page || "";
  var toastTimer = null;

  function $(selector, parent) {
    return (parent || document).querySelector(selector);
  }

  function $$(selector, parent) {
    return Array.prototype.slice.call((parent || document).querySelectorAll(selector));
  }

  function showToast(message, type) {
    var toast = $("#toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      toast.setAttribute("role", "alert");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = "toast show" + (type ? " " + type : "");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.className = "toast" + (type ? " " + type : "");
    }, 3000);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  function getGreeting() {
    var hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return "Selamat pagi";
    if (hour >= 11 && hour < 15) return "Selamat siang";
    if (hour >= 15 && hour < 18) return "Selamat sore";
    return "Selamat malam";
  }

  function getStoredUser() {
    try {
      return JSON.parse(localStorage.getItem("sittaUser"));
    } catch (error) {
      return null;
    }
  }

  function getCurrentUser() {
    return getStoredUser() || dataPengguna[4];
  }

  function syncShell() {
    var user = getCurrentUser();
    $$("[data-user-name]").forEach(function (node) {
      node.textContent = user.nama;
    });
    $$("[data-user-role]").forEach(function (node) {
      node.textContent = user.role + " - " + user.lokasi;
    });

    var greeting = $("#greeting");
    if (greeting) {
      greeting.textContent = getGreeting() + ", " + user.nama.split(" ")[0];
    }

    var clock = $("#local-clock");
    if (clock) {
      var now = new Date();
      clock.innerHTML = "<strong>" + now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      }) + "</strong>" + now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    }

    var currentPath = window.location.pathname.split("/").pop() || "dashboard.html";
    $$(".nav-link").forEach(function (link) {
      var href = link.getAttribute("href") || "";
      if (href.split("#")[0] === currentPath) {
        link.classList.add("active");
      }
    });

    var mobileNav = $("#mobile-nav-select");
    if (mobileNav) {
      mobileNav.value = currentPath;
      mobileNav.addEventListener("change", function () {
        window.location.href = mobileNav.value;
      });
    }

    $$("[data-logout]").forEach(function (button) {
      button.addEventListener("click", function () {
        localStorage.removeItem("sittaUser");
        showToast("Sesi keluar berhasil.", "success");
        window.setTimeout(function () {
          window.location.href = "login.html";
        }, 500);
      });
    });
  }

  function openModal(title, bodyHtml) {
    var dialog = $("#app-modal");
    if (!dialog) return;
    $(".modal-title", dialog).textContent = title;
    $(".modal-body", dialog).innerHTML = bodyHtml;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "open");
    }
  }

  function initModal() {
    var dialog = $("#app-modal");
    if (!dialog) return;

    $$(".modal-close", dialog).forEach(function (button) {
      button.addEventListener("click", function () {
        dialog.close();
      });
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("submit", function (event) {
      var form = event.target;
      if (!form.matches("[data-modal-form]")) return;
      event.preventDefault();
      showToast(form.dataset.success || "Data berhasil diproses.", "success");
      dialog.close();
    });
  }

  function initLogin() {
    var form = $("#login-form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = $("#email").value.trim().toLowerCase();
      var password = $("#password").value;
      var user = dataPengguna.find(function (item) {
        return item.email.toLowerCase() === email && item.password === password;
      });

      if (!user) {
        showToast("email/password yang anda masukkan salah", "error");
        return;
      }

      localStorage.setItem("sittaUser", JSON.stringify(user));
      showToast("Login berhasil. Mengalihkan ke dashboard.", "success");
      window.setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 650);
    });

    $("#forgot-button").addEventListener("click", function () {
      openModal("Lupa Password", [
        '<form class="panel-form" data-modal-form data-success="Permintaan reset password berhasil dikirim.">',
        '<div class="field">',
        '<label for="reset-email">Email terdaftar</label>',
        '<input id="reset-email" type="email" name="reset-email" placeholder="nama@ut.ac.id" required>',
        "</div>",
        '<button class="btn" type="submit">Kirim Reset</button>',
        "</form>"
      ].join(""));
    });

    $("#register-button").addEventListener("click", function () {
      openModal("Daftar Pengguna", [
        '<form class="panel-form" data-modal-form data-success="Pendaftaran simulasi berhasil dibuat.">',
        '<div class="form-grid">',
        '<div class="field">',
        '<label for="reg-name">Nama lengkap</label>',
        '<input id="reg-name" name="reg-name" required>',
        "</div>",
        '<div class="field">',
        '<label for="reg-email">Email UT</label>',
        '<input id="reg-email" type="email" name="reg-email" required>',
        "</div>",
        '<div class="field">',
        '<label for="reg-role">Role</label>',
        '<select id="reg-role" name="reg-role" required>',
        '<option value="">Pilih role</option>',
        "<option>UPBJJ-UT</option>",
        "<option>Puslaba</option>",
        "<option>Fakultas</option>",
        "</select>",
        "</div>",
        '<div class="field">',
        '<label for="reg-location">Lokasi</label>',
        '<input id="reg-location" name="reg-location" required>',
        "</div>",
        "</div>",
        '<button class="btn" type="submit">Daftar</button>',
        "</form>"
      ].join(""));
    });
  }

  function getStockRows() {
    var manualRows = [];
    try {
      manualRows = JSON.parse(localStorage.getItem("sittaStockRows")) || [];
    } catch (error) {
      manualRows = [];
    }

    return dataBahanAjar.map(function (row) {
      return Object.assign({ source: "data" }, row);
    }).concat(manualRows);
  }

  function saveManualStockRows(rows) {
    localStorage.setItem("sittaStockRows", JSON.stringify(rows));
  }

  function getManualStockRows() {
    try {
      return JSON.parse(localStorage.getItem("sittaStockRows")) || [];
    } catch (error) {
      return [];
    }
  }

  function getStockStatus(stock) {
    if (stock < 180) return { label: "Perlu Restok", className: "danger" };
    if (stock < 250) return { label: "Menipis", className: "warning" };
    return { label: "Aman", className: "success" };
  }

  function renderDashboard() {
    var stats = $("#dashboard-stats");
    if (!stats) return;
    var rows = getStockRows();
    var totalStock = rows.reduce(function (sum, item) {
      return sum + Number(item.stok);
    }, 0);
    var lowStock = rows.filter(function (item) {
      return Number(item.stok) < 250;
    }).length;
    var biggest = rows.slice().sort(function (a, b) {
      return Number(b.stok) - Number(a.stok);
    })[0];
    var doCount = Object.keys(dataTracking).length;

    stats.innerHTML = [
      statCard("Total Stok", totalStock.toLocaleString("id-ID"), "Eksemplar tersedia"),
      statCard("Bahan Ajar", rows.length, "Item terdata"),
      statCard("DO Aktif", doCount, "Pengiriman terlacak"),
      statCard("Perlu Dicek", lowStock, "Stok di bawah batas")
    ].join("");

    var highlight = $("#stock-highlight");
    if (highlight && biggest) {
      highlight.textContent = biggest.namaBarang + " memiliki stok terbanyak (" + biggest.stok + ").";
    }

    renderCoverPreview();
  }

  function statCard(label, value, caption) {
    return [
      '<article class="stat-card">',
      "<span>" + label + "</span>",
      "<strong>" + value + "</strong>",
      '<p class="muted">' + caption + "</p>",
      "</article>"
    ].join("");
  }

  function renderCoverPreview() {
    var board = $("#cover-preview");
    if (!board) return;
    board.innerHTML = dataBahanAjar.slice(0, 3).map(function (item) {
      return [
        '<article class="board-row">',
        '<img class="cover-stack" src="' + item.cover + '" alt="Cover ' + item.namaBarang + '">',
        "<div>",
        "<h2>" + item.namaBarang + "</h2>",
        "<p>" + item.kodeBarang + " - Edisi " + item.edisi + "</p>",
        "</div>",
        '<span class="badge">' + item.stok + " stok</span>",
        "</article>"
      ].join("");
    }).join("");
  }

  function initTracking() {
    var form = $("#tracking-form");
    var result = $("#tracking-result");
    var dataList = $("#do-list");
    if (!form || !result) return;

    if (dataList) {
      dataList.innerHTML = Object.keys(dataTracking).map(function (nomor) {
        return '<option value="' + nomor + '"></option>';
      }).join("");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var nomor = $("#nomor-do").value.trim();
      renderTracking(nomor);
    });

    $("[data-demo-do]").addEventListener("click", function (event) {
      var button = event.target.closest("[data-do]");
      if (!button) return;
      $("#nomor-do").value = button.dataset.do;
      renderTracking(button.dataset.do);
    });

    var initialDO = new URLSearchParams(window.location.search).get("do");
    if (initialDO) {
      $("#nomor-do").value = initialDO;
      renderTracking(initialDO);
    }
  }

  function getProgress(item) {
    var last = item.perjalanan[item.perjalanan.length - 1];
    var delivered = last && last.keterangan.toLowerCase().indexOf("selesai") !== -1;
    if (delivered) return 100;
    if (item.status.toLowerCase().indexOf("perjalanan") !== -1) return 62;
    if (item.status.toLowerCase().indexOf("dikirim") !== -1) return 76;
    return 35;
  }

  function renderTracking(nomor) {
    var result = $("#tracking-result");
    var item = dataTracking[nomor];
    if (!item) {
      result.innerHTML = '<div class="empty-state">Nomor Delivery Order tidak ditemukan.</div>';
      showToast("Nomor Delivery Order tidak ditemukan.", "error");
      return;
    }

    var progress = getProgress(item);
    var statusClass = progress === 100 ? "success" : progress > 60 ? "warning" : "";
    result.innerHTML = [
      '<article class="content-panel tracking-card">',
      "<div>",
      '<span class="status-badge ' + statusClass + '">' + item.status + "</span>",
      "<h2>Delivery Order " + item.nomorDO + "</h2>",
      '<p>' + item.nama + " - " + item.ekspedisi + "</p>",
      "</div>",
      '<div class="progress" aria-label="Progress pengiriman"><span style="width: ' + progress + '%"></span></div>',
      '<div class="tracking-summary">',
      infoTile("Nama Mahasiswa", item.nama),
      infoTile("Tanggal Kirim", formatDate(item.tanggalKirim)),
      infoTile("Jenis Paket", item.paket),
      infoTile("Total Pembayaran", item.total),
      "</div>",
      '<h3>Riwayat Perjalanan</h3>',
      '<ol class="timeline">',
      item.perjalanan.map(function (step) {
        return "<li><time>" + step.waktu + "</time><strong>" + step.keterangan + "</strong></li>";
      }).join(""),
      "</ol>",
      "</article>"
    ].join("");
  }

  function infoTile(label, value) {
    return '<div class="info-tile"><span>' + label + "</span><strong>" + value + "</strong></div>";
  }

  function initStock() {
    var table = $("#stock-body");
    if (!table) return;
    var search = $("#stock-search");
    var filter = $("#stock-filter");
    var sort = $("#stock-sort");
    var form = $("#stock-form");

    function rerender() {
      renderStockTable();
    }

    [search, filter, sort].forEach(function (control) {
      if (control) control.addEventListener("input", rerender);
      if (control) control.addEventListener("change", rerender);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(form);
      var newRow = {
        id: "manual-" + Date.now(),
        kodeLokasi: formData.get("kodeLokasi").trim().toUpperCase(),
        kodeBarang: formData.get("kodeBarang").trim().toUpperCase(),
        namaBarang: formData.get("namaBarang").trim(),
        jenisBarang: formData.get("jenisBarang"),
        edisi: formData.get("edisi").trim(),
        stok: Number(formData.get("stok")),
        cover: formData.get("cover") || "img/img/pengantar_komunikasi.jpg",
        source: "manual"
      };

      if (!newRow.kodeLokasi || !newRow.kodeBarang || !newRow.namaBarang || Number.isNaN(newRow.stok) || newRow.stok < 0) {
        showToast("Mohon lengkapi form stok dengan benar.", "error");
        return;
      }

      var duplicate = getStockRows().some(function (row) {
        return row.kodeLokasi === newRow.kodeLokasi && row.kodeBarang === newRow.kodeBarang;
      });
      if (duplicate) {
        showToast("Kode lokasi dan kode barang sudah terdaftar.", "error");
        return;
      }

      var manualRows = getManualStockRows();
      manualRows.push(newRow);
      saveManualStockRows(manualRows);
      form.reset();
      renderStockTable();
      showToast("Baris stok baru berhasil ditambahkan.", "success");
    });

    table.addEventListener("click", function (event) {
      var button = event.target.closest("[data-remove-stock]");
      if (!button) return;
      var manualRows = getManualStockRows().filter(function (row) {
        return row.id !== button.dataset.removeStock;
      });
      saveManualStockRows(manualRows);
      renderStockTable();
      showToast("Baris stok tambahan dihapus.", "success");
    });

    renderStockTable();
  }

  function renderStockTable() {
    var table = $("#stock-body");
    if (!table) return;
    var searchTerm = ($("#stock-search") ? $("#stock-search").value : "").trim().toLowerCase();
    var filter = $("#stock-filter") ? $("#stock-filter").value : "all";
    var sort = $("#stock-sort") ? $("#stock-sort").value : "name";
    var rows = getStockRows().filter(function (item) {
      var text = [item.kodeLokasi, item.kodeBarang, item.namaBarang, item.jenisBarang].join(" ").toLowerCase();
      var matchesSearch = text.indexOf(searchTerm) !== -1;
      var matchesFilter = filter === "all" || (filter === "low" && Number(item.stok) < 250) || item.jenisBarang === filter;
      return matchesSearch && matchesFilter;
    });

    rows.sort(function (a, b) {
      if (sort === "stock-asc") return Number(a.stok) - Number(b.stok);
      if (sort === "stock-desc") return Number(b.stok) - Number(a.stok);
      if (sort === "code") return a.kodeBarang.localeCompare(b.kodeBarang);
      return a.namaBarang.localeCompare(b.namaBarang);
    });

    if (!rows.length) {
      table.innerHTML = '<tr><td colspan="7" class="muted">Data stok tidak ditemukan.</td></tr>';
      return;
    }

    table.innerHTML = rows.map(function (item) {
      var status = getStockStatus(Number(item.stok));
      var action = item.source === "manual"
        ? '<button class="btn danger" type="button" data-remove-stock="' + item.id + '">Hapus</button>'
        : '<span class="muted">Data utama</span>';
      return [
        "<tr>",
        "<td>" + item.kodeLokasi + "</td>",
        '<td><div class="book-cell"><img class="book-thumb" src="' + item.cover + '" alt="Cover ' + item.namaBarang + '"><div><strong>' + item.namaBarang + '</strong><br><span class="muted">' + item.kodeBarang + "</span></div></div></td>",
        "<td>" + item.jenisBarang + "</td>",
        "<td>Edisi " + item.edisi + "</td>",
        "<td><strong>" + Number(item.stok).toLocaleString("id-ID") + "</strong></td>",
        '<td><span class="status-badge ' + status.className + '">' + status.label + "</span></td>",
        "<td>" + action + "</td>",
        "</tr>"
      ].join("");
    }).join("");
  }

  function initReports() {
    var monitoring = $("#monitoring-body");
    var recap = $("#recap-body");
    if (!monitoring && !recap) return;

    if (monitoring) {
      monitoring.innerHTML = Object.keys(dataTracking).map(function (nomor) {
        var item = dataTracking[nomor];
        var progress = getProgress(item);
        return [
          "<tr>",
          "<td>" + item.nomorDO + "</td>",
          "<td>" + item.nama + "</td>",
          "<td>" + item.ekspedisi + "</td>",
          "<td>" + formatDate(item.tanggalKirim) + "</td>",
          '<td><div class="progress"><span style="width: ' + progress + '%"></span></div></td>',
          "<td><strong>" + progress + "%</strong></td>",
          "</tr>"
        ].join("");
      }).join("");
    }

    if (recap) {
      var byType = getStockRows().reduce(function (acc, item) {
        if (!acc[item.jenisBarang]) {
          acc[item.jenisBarang] = { jenis: item.jenisBarang, item: 0, stok: 0, rendah: 0 };
        }
        acc[item.jenisBarang].item += 1;
        acc[item.jenisBarang].stok += Number(item.stok);
        if (Number(item.stok) < 250) acc[item.jenisBarang].rendah += 1;
        return acc;
      }, {});

      recap.innerHTML = Object.keys(byType).map(function (key) {
        var item = byType[key];
        return [
          "<tr>",
          "<td>" + item.jenis + "</td>",
          "<td>" + item.item + "</td>",
          "<td>" + item.stok.toLocaleString("id-ID") + "</td>",
          "<td>" + item.rendah + "</td>",
          "</tr>"
        ].join("");
      }).join("");
    }

    var chart = $("#stock-chart");
    if (chart) {
      var rows = getStockRows();
      var max = Math.max.apply(null, rows.map(function (item) {
        return Number(item.stok);
      }));
      chart.innerHTML = rows.map(function (item) {
        var width = Math.round((Number(item.stok) / max) * 100);
        return [
          '<div class="chart-row">',
          "<strong>" + item.kodeBarang + "</strong>",
          '<div class="chart-bar"><span style="width: ' + width + '%"></span></div>',
          '<span class="muted">' + item.stok + "</span>",
          "</div>"
        ].join("");
      }).join("");
    }
  }

  function initHistory() {
    var body = $("#history-body");
    if (!body) return;
    var search = $("#history-search");

    function render() {
      var term = (search.value || "").trim().toLowerCase();
      var rows = dataRiwayatTransaksi.filter(function (item) {
        return Object.keys(item).some(function (key) {
          return String(item[key]).toLowerCase().indexOf(term) !== -1;
        });
      });

      body.innerHTML = rows.map(function (item) {
        var status = item.status === "Selesai" ? "success" : item.status === "Menunggu DO" ? "warning" : "";
        return [
          "<tr>",
          "<td>" + item.id + "</td>",
          "<td>" + formatDate(item.tanggal) + "</td>",
          "<td>" + item.nama + "</td>",
          "<td>" + item.upbjj + "</td>",
          "<td>" + item.kodeBarang + "</td>",
          "<td>" + item.jumlah + "</td>",
          "<td>" + item.total + "</td>",
          '<td><span class="status-badge ' + status + '">' + item.status + "</span></td>",
          "</tr>"
        ].join("");
      }).join("");
    }

    search.addEventListener("input", render);
    render();
  }

  function init() {
    initModal();
    if (page !== "login") syncShell();
    if (page === "login") initLogin();
    if (page === "dashboard") renderDashboard();
    if (page === "tracking") initTracking();
    if (page === "stok") initStock();
    if (page === "laporan") initReports();
    if (page === "histori") initHistory();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
