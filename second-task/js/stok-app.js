new Vue({
  el: '#app',
  data: {
    // Data list dari dataBahanAjar.js
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
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
    // State untuk form & filter
    katakunci: "",
    kategoriTerpilih: "",
    upbjjTerpilih: "",
    pesanPeringatan: ""
  },
  computed: {
    stokTersaring() {
      return this.stok.filter(item => {
        const cariKatakunci = this.katakunci.toLowerCase();
        const cocokKataKunci = item.judul.toLowerCase().includes(cariKatakunci) || 
                               item.kode.toLowerCase().includes(cariKatakunci);
        const cocokKategori = this.kategoriTerpilih === "" || item.kategori === this.kategoriTerpilih;
        const cocokUpbjj = this.upbjjTerpilih === "" || item.upbjj === this.upbjjTerpilih;
        return cocokKataKunci && cocokKategori && cocokUpbjj;
      });
    },
    totalStokKeseluruhan() {
      return this.stok.reduce((total, item) => total + item.qty, 0);
    }
  },
  watch: {
    // Watcher 1: Memantau perubahan input kata kunci pencarian (Hanya console log)
    katakunci(newVal, oldVal) {
      console.log(`Mencari data dengan kata kunci: ${newVal}`);
    },
    // Watcher 2: Memantau perubahan filter kategori
    kategoriTerpilih(newVal, oldVal) {
      console.log(`Filter kategori diubah menjadi: ${newVal}`);
    }
  },
  methods: {
    formatRupiah(angka) {
      return angka.toLocaleString('id-ID');
    },
    tambahStok(item) {
      item.qty++;
    },
    kurangiStok(item) {
      if (item.qty > 0) {
        item.qty--;
      }
    }
  }
});