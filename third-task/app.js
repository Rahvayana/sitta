new Vue({
  el: "#app",
  data: {
    apiUrl: "https://api.coinlore.net/api/tickers/",
    maxRows: 50,
    cryptos: [],
    searchTerm: "",
    isLoading: false,
    hasError: false
  },
  computed: {
    filteredCryptos: function () {
      var term = this.searchTerm.trim().toLowerCase();
      var rows = this.cryptos;

      if (term) {
        rows = rows.filter(function (coin) {
          return coin.name.toLowerCase().indexOf(term) !== -1 ||
            coin.symbol.toLowerCase().indexOf(term) !== -1;
        });
      }

      return rows.slice(0, this.maxRows);
    },
    totalCount: function () {
      return this.cryptos.length.toLocaleString("id-ID");
    },
    shownCount: function () {
      return this.filteredCryptos.length.toLocaleString("id-ID");
    },
    statusText: function () {
      if (this.isLoading) return "Memuat";
      if (this.hasError) return "Gagal";
      if (this.cryptos.length > 0) return "Berhasil";
      return "Siap";
    },
    isEmpty: function () {
      return !this.isLoading && !this.hasError && this.cryptos.length > 0 && this.filteredCryptos.length === 0;
    }
  },
  methods: {
    normalizeCoin: function (item) {
      return {
        rank: item.rank || "-",
        name: item.name || "-",
        symbol: item.symbol || "-",
        priceUsd: item.price_usd || "0"
      };
    },
    formatUsd: function (value) {
      var number = Number(value);
      if (!Number.isFinite(number)) {
        return "$0.00";
      }

      return "$" + number.toLocaleString("en-US", {
        minimumFractionDigits: number >= 1 ? 2 : 4,
        maximumFractionDigits: number >= 1 ? 2 : 8
      });
    },
    loadCryptos: function () {
      var app = this;
      app.isLoading = true;
      app.hasError = false;

      fetch(app.apiUrl)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("API response was not ok");
          }
          return response.json();
        })
        .then(function (payload) {
          app.cryptos = Array.isArray(payload.data) ? payload.data.map(app.normalizeCoin) : [];
        })
        .catch(function () {
          app.cryptos = [];
          app.hasError = true;
        })
        .finally(function () {
          app.isLoading = false;
        });
    }
  },
  mounted: function () {
    this.loadCryptos();
  }
});
