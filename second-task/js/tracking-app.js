new Vue({
  el: '#app',
  data: {
    // Data dummy tracking DO dari dataBahanAjar.js
    trackingList: {
      "DO2025-0001": {
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "PAKET-UT-001",
        total: 120000,
        perjalanan: [
          { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
          { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
          { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
        ]
      },
      "DO2025-0002": {
        nim: "987654321",
        nama: "Budi Santoso",
        status: "Terkirim",
        ekspedisi: "POS Indonesia",
        tanggalKirim: "2025-08-20",
        paket: "PAKET-UT-002",
        total: 140000,
        perjalanan: [
          { waktu: "2025-08-20 09:00:00", keterangan: "Paket diterima agen penjemputan" },
          { waktu: "2025-08-21 15:30:00", keterangan: "Tiba di kota tujuan" },
          { waktu: "2025-08-22 13:00:00", keterangan: "Paket telah diterima oleh Budi Santoso" }
        ]
      }
    },
    // State form
    inputResi: "",
    sudahMencari: false,
    nomorResiDicari: "",
    dataTracking: null
  },
  computed: {
    // Validasi sederhana: input resi minimal 5 karakter
    isInputValid() {
      return this.inputResi.trim().length >= 5;
    },
    // Menampilkan error jika pengguna sudah mulai mengetik tapi kurang dari 5 karakter
    inputError() {
      return this.inputResi.length > 0 && !this.isInputValid;
    },
    badgeStatusClass() {
      if (!this.dataTracking) return '';
      
      const status = this.dataTracking.status.toLowerCase();
      if (status.includes('terkirim') || status.includes('selesai')) {
        return 'bg-success';
      } else if (status.includes('perjalanan') || status.includes('proses')) {
        return 'bg-warning text-dark';
      }
      return 'bg-info text-dark';
    }
  },
  watch: {
    // Watcher 1: Memantau input resi. Jika user mengubah input setelah mencari, kita hilangkan hasil sebelumnya untuk sementara.
    inputResi(newVal, oldVal) {
      if (this.sudahMencari && newVal !== this.nomorResiDicari) {
        this.sudahMencari = false;
        this.dataTracking = null;
      }
    },
    // Watcher 2: Memantau riwayat pencarian
    nomorResiDicari(newVal, oldVal) {
      if (newVal) {
        console.log(`Pengguna melakukan pelacakan untuk nomor resi/DO: ${newVal}`);
      }
    }
  },
  methods: {
    cariResi() {
      if (this.isInputValid) {
        const resi = this.inputResi.trim().toUpperCase(); // Format seragam ke uppercase
        this.nomorResiDicari = resi;
        this.sudahMencari = true;

        if (this.trackingList[resi]) {
          this.dataTracking = this.trackingList[resi];
        } else {
          this.dataTracking = null;
        }
      }
    }
  }
});