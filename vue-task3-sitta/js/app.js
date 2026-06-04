(function () {
  var DATA_URL = "data/dataBahanAjar.json";
  var FALLBACK_DATA = {
    upbjjList: [
      "Jakarta",
      "Surabaya",
      "Makassar",
      "Padang",
      "Denpasar"
    ],
    kategoriList: [
      "MK Wajib",
      "MK Pilihan",
      "Praktikum",
      "Problem-Based"
    ],
    pengirimanList: [
      {
        kode: "REG",
        nama: "Reguler (3-5 hari)"
      },
      {
        kode: "EXP",
        nama: "Ekspres (1-2 hari)"
      }
    ],
    paket: [
      {
        kode: "PAKET-UT-001",
        nama: "PAKET IPS Dasar",
        isi: [
          "EKMA4116",
          "EKMA4115"
        ],
        harga: 120000
      },
      {
        kode: "PAKET-UT-002",
        nama: "PAKET IPA Dasar",
        isi: [
          "BIOL4201",
          "FISIP4001"
        ],
        harga: 140000
      }
    ],
    stok: [
      {
        kode: "EKMA4116",
        judul: "Pengantar Manajemen",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A3",
        harga: 65000,
        qty: 28,
        safety: 20,
        catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
      },
      {
        kode: "EKMA4115",
        judul: "Pengantar Akuntansi",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A4",
        harga: 60000,
        qty: 7,
        safety: 15,
        catatanHTML: "<strong>Cover baru</strong>"
      },
      {
        kode: "BIOL4201",
        judul: "Biologi Umum (Praktikum)",
        kategori: "Praktikum",
        upbjj: "Surabaya",
        lokasiRak: "R3-B2",
        harga: 80000,
        qty: 12,
        safety: 10,
        catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
      },
      {
        kode: "FISIP4001",
        judul: "Dasar-Dasar Sosiologi",
        kategori: "MK Pilihan",
        upbjj: "Makassar",
        lokasiRak: "R2-C1",
        harga: 55000,
        qty: 2,
        safety: 8,
        catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
      }
    ],
    tracking: [
      {
        "DO2025-0001": {
          nim: "123456789",
          nama: "Rina Wulandari",
          status: "Dalam Perjalanan",
          ekspedisi: "JNE",
          tanggalKirim: "2025-08-25",
          paket: "PAKET-UT-001",
          total: 120000,
          perjalanan: [
            {
              waktu: "2025-08-25 10:12:20",
              keterangan: "Penerimaan di Loket: TANGSEL"
            }
          ]
        }
      }
    ]
  };

  function formatRupiah(value) {
    var number = Number(value || 0);
    return "Rp" + number.toLocaleString("id-ID");
  }

  function formatTitleCase(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
      });
  }

  function formatLabel(value) {
    return String(value || "")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, function (letter) {
        return letter.toUpperCase();
      });
  }

  function formatTanggalJam(value) {
    if (!value) {
      return "-";
    }

    var normalized = String(value).replace(" ", "T");
    var date = new Date(normalized);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  Vue.filter("rupiah", formatRupiah);
  Vue.filter("titleCase", formatTitleCase);
  Vue.filter("labelize", formatLabel);
  Vue.filter("tanggalJam", formatTanggalJam);

  Vue.component("app-header", {
    template: "#app-header-template",
    props: {
      activeTab: { type: String, required: true },
      tabs: { type: Array, required: true },
      loading: { type: Boolean, required: true }
    },
    updated: refreshIcons,
    mounted: refreshIcons
  });

  Vue.component("summary-panel", {
    template: "#summary-template",
    props: {
      filteredCount: { type: Number, required: true },
      criticalCount: { type: Number, required: true },
      orderTotal: { type: Number, required: true },
      selectedUpbjj: { type: String, default: "" }
    }
  });

  Vue.component("stock-browser", {
    template: "#stock-browser-template",
    props: {
      stock: { type: Array, required: true },
      categories: { type: Array, required: true },
      upbjjList: { type: Array, required: true },
      filters: { type: Object, required: true },
      sortKey: { type: String, required: true },
      sortDirection: { type: String, required: true }
    }
  });

  Vue.component("stock-row", {
    template: "#stock-row-template",
    props: {
      item: { type: Object, required: true },
      index: { type: Number, required: true },
      sortKey: { type: String, required: true },
      sortDirection: { type: String, required: true }
    }
  });

  Vue.component("order-form", {
    template: "#order-form-template",
    props: {
      stock: { type: Array, required: true },
      packages: { type: Array, required: true },
      shippingOptions: { type: Array, required: true },
      order: { type: Object, required: true },
      errors: { type: Object, required: true },
      orderTotal: { type: Number, required: true },
      selectedPackage: { type: Object, default: null }
    }
  });

  Vue.component("tracking-panel", {
    template: "#tracking-template",
    props: {
      trackingList: { type: Array, required: true },
      trackingCode: { type: String, required: true },
      trackingResult: { type: Object, default: null }
    }
  });

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function flattenTracking(rows) {
    return rows.reduce(function (result, item) {
      Object.keys(item).forEach(function (code) {
        var payload = item[code];
        result.push(Object.assign({ code: code }, payload));
      });
      return result;
    }, []);
  }

  function isFileMode() {
    return window.location.protocol === "file:";
  }

  function cloneData(data) {
    return JSON.parse(JSON.stringify(data));
  }

  new Vue({
    el: "#app",
    data: function () {
      return {
        loading: true,
        errorMessage: "",
        activeTab: "stok",
        tabs: [
          { id: "stok", label: "Stok", icon: "boxes" },
          { id: "pesan", label: "Pesan", icon: "clipboard-list" },
          { id: "tracking", label: "Tracking", icon: "truck" }
        ],
        upbjjList: [],
        kategoriList: [],
        pengirimanList: [],
        paketList: [],
        stokList: [],
        trackingList: [],
        trackingCode: "",
        filters: {
          search: "",
          upbjj: "",
          kategori: ""
        },
        sortKey: "kode",
        sortDirection: "asc",
        order: {
          nim: "",
          nama: "",
          packageCode: "",
          shippingCode: "",
          items: [],
          submitted: false
        },
        formErrors: {},
        activityLog: []
      };
    },
    computed: {
      filteredStock: function () {
        var search = this.filters.search.trim().toLowerCase();
        var rows = this.stokList.filter(function (item) {
          var matchesSearch = !search ||
            item.kode.toLowerCase().indexOf(search) !== -1 ||
            item.judul.toLowerCase().indexOf(search) !== -1;
          var matchesUpbjj = !this.filters.upbjj || item.upbjj === this.filters.upbjj;
          var matchesKategori = !this.filters.kategori || item.kategori === this.filters.kategori;
          return matchesSearch && matchesUpbjj && matchesKategori;
        }, this);

        return rows.slice().sort(function (a, b) {
          var left = a[this.sortKey];
          var right = b[this.sortKey];
          if (typeof left === "number") {
            return this.sortDirection === "asc" ? left - right : right - left;
          }
          return this.sortDirection === "asc"
            ? String(left).localeCompare(String(right))
            : String(right).localeCompare(String(left));
        }.bind(this));
      },
      criticalStock: function () {
        return this.stokList.filter(function (item) {
          return item.qty < item.safety;
        });
      },
      selectedPackage: function () {
        return this.paketList.find(function (item) {
          return item.kode === this.order.packageCode;
        }, this) || null;
      },
      orderTotal: function () {
        var packageTotal = this.selectedPackage ? Number(this.selectedPackage.harga) : 0;
        var itemTotal = this.order.items.reduce(function (sum, code) {
          var item = this.stokList.find(function (row) {
            return row.kode === code;
          });
          return sum + (item ? Number(item.harga) : 0);
        }.bind(this), 0);

        return packageTotal + itemTotal;
      },
      trackingResult: function () {
        var code = this.trackingCode.trim().toUpperCase();
        var found = this.trackingList.find(function (item) {
          return item.code === code;
        });

        if (!found) {
          return null;
        }

        return Object.assign({}, found, {
          info: {
            tanggalKirim: formatTanggalJam(found.tanggalKirim),
            paket: found.paket,
            total: formatRupiah(found.total)
          }
        });
      }
    },
    watch: {
      "filters.upbjj": function (value, oldValue) {
        this.addActivity("Filter UPBJJ berubah dari " + (oldValue || "semua") + " ke " + (value || "semua") + ".");
      },
      "order.items": {
        deep: true,
        handler: function (value) {
          this.order.submitted = false;
          this.addActivity("Jumlah bahan ajar satuan sekarang " + value.length + " item.");
        }
      },
      trackingCode: function (value) {
        if (value.length >= 4) {
          this.addActivity("Kode tracking diketik: " + value + ".");
        }
      }
    },
    methods: {
      loadData: function () {
        this.loading = true;
        this.errorMessage = "";

        if (isFileMode()) {
          this.applyData(cloneData(FALLBACK_DATA), "Data fallback dimuat karena halaman dibuka dari file lokal.");
          this.loading = false;
          this.$nextTick(refreshIcons);
          return;
        }

        fetch(DATA_URL)
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Data JSON tidak dapat dibaca.");
            }
            return response.json();
          })
          .then(function (data) {
            this.applyData(data, "Data bahan ajar berhasil dimuat.");
          }.bind(this))
          .catch(function (error) {
            this.errorMessage = error.message || "Data gagal dimuat.";
          }.bind(this))
          .finally(function () {
            this.loading = false;
            this.$nextTick(refreshIcons);
          }.bind(this));
      },
      applyData: function (data, message) {
        this.upbjjList = data.upbjjList || [];
        this.kategoriList = data.kategoriList || [];
        this.pengirimanList = data.pengirimanList || [];
        this.paketList = data.paket || [];
        this.stokList = data.stok || [];
        this.trackingList = flattenTracking(data.tracking || []);
        this.trackingCode = this.trackingList.length ? this.trackingList[0].code : "";
        this.addActivity(message);
      },
      updateFilter: function (key, value) {
        this.$set(this.filters, key, value);
      },
      setSort: function (key) {
        if (this.sortKey === key) {
          this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        } else {
          this.sortKey = key;
          this.sortDirection = "asc";
        }
        this.addActivity("Urutan data diubah berdasarkan " + key + ".");
      },
      toggleOrderItem: function (code) {
        var index = this.order.items.indexOf(code);
        if (index === -1) {
          this.order.items.push(code);
        } else {
          this.order.items.splice(index, 1);
        }
      },
      validateOrder: function () {
        var errors = {};
        if (!/^\d{9}$/.test(this.order.nim)) {
          errors.nim = "NIM wajib 9 digit angka.";
        }
        if (this.order.nama.length < 3) {
          errors.nama = "Nama minimal 3 karakter.";
        }
        if (!this.order.shippingCode) {
          errors.shippingCode = "Metode pengiriman wajib dipilih.";
        }
        if (!this.order.packageCode && this.order.items.length === 0) {
          errors.packageCode = "Pilih paket atau minimal satu bahan ajar.";
        }

        this.formErrors = errors;
        return Object.keys(errors).length === 0;
      },
      submitOrder: function () {
        if (!this.validateOrder()) {
          this.order.submitted = false;
          this.addActivity("Validasi pesanan belum lolos.");
          return;
        }

        this.order.submitted = true;
        this.addActivity("Pesanan " + this.order.nama + " berhasil divalidasi.");
      },
      resetOrder: function () {
        this.order.nim = "";
        this.order.nama = "";
        this.order.packageCode = "";
        this.order.shippingCode = "";
        this.order.items = [];
        this.order.submitted = false;
        this.formErrors = {};
        this.addActivity("Formulir pesanan dikosongkan.");
      },
      addActivity: function (text) {
        this.activityLog.unshift({
          id: Date.now() + Math.random(),
          text: text
        });
        this.activityLog = this.activityLog.slice(0, 6);
      }
    },
    mounted: function () {
      this.loadData();
      refreshIcons();
    }
  });
})();
