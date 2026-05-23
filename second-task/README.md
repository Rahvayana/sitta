# Peta Penilaian & Indikator Capaian Tugas Praktik 2

Berikut adalah panduan untuk menemukan implementasi baris kode dan fungsi-fungsi yang diminta berdasarkan indikator capaian penilaian di soal Tugas Praktik 2. Panduan ini dapat membantu Anda menjelaskan dan mempresentasikan hasil kerja di dalam video.

### 1.1. Arsitektur dan Struktur Proyek Vue.js
* **Penjelasan:** Proyek dipisahkan menjadi halaman HTML, pustaka stylesheet CSS, dan logika aplikasi JavaScript (`js`). Tidak menggunakan sistem template NPM (seperti Vite/Vue CLI) berdasarkan instruksi untuk tetap dalam batas file biasa. Semuanya telah dipindahkan ke folder yang terstruktur dengan rapi.
* **Lokasi:** Terlihat pada struktur _root_ folder `/second-task/`.

### 1.2. Penggunaan Data Binding & Directive untuk List Rendering
* **`{{ mustaches }}`:**
  - `stok.html`: Di bagian judul atas menampilkan total (`{{ totalStokKeseluruhan }} Buku`), serta di baris tabel (`{{ item.judul }}`)
  - `tracking.html`: Pada header detail pesanan (`{{ dataTracking.nama }}`)
* **`v-text`:** 
  - `stok.html`: Merender detail baris tabel untuk kode buku (`<span v-text="item.kode"></span>`)
* **`v-html`:**
  - `stok.html`: Merender keterangan status/kondisi dengan style HTML italic/bold (`<td v-html="item.catatanHTML"></td>`)
* **`v-bind` (atau `:`):**
  - `stok.html`: Mematikan tombol jika stok 0 (`:disabled="item.qty <= 0"`)
  - `tracking.html`: Memberikan class error dinamis pada input resi (`:class="{'is-invalid': inputError}"`), serta memberi warna badge dinamis (`:class="badgeStatusClass"`)
* **`v-model` (Two-way Data Binding):**
  - `stok.html`: Mencatat otomatis nilai baris pencarian (`v-model="katakunci"`) dan combobox filter (`v-model="kategoriTerpilih"`)
  - `tracking.html`: Menangkap nomor input resi form secara real-time (`v-model="inputResi"`)
* **`v-for` (List Rendering):**
  - `stok.html`: Melakukan perulangan untuk dropdown opsi rak/cabang (`v-for="cabang in upbjjList"`) dan mencetak semua baris dalam tabel stok (`v-for="item in stokTersaring"`)
  - `tracking.html`: Melakukan perulangan untuk mencetak riwayat pergerakan status logistik (`v-for="(log, index) in dataTracking.perjalanan"`)

### 1.3. Penggunaan Conditional
* **`v-if`, `v-else-if`, `v-else`:**
  - `stok.html`: Mengecek jika _Array_ stok hasil filter kosong maka tampilkan tabel peringatan. Jika tidak, proses perulangan.
  - `stok.html`: Mendiagnosis rentang Status Stok: `<span v-if="item.qty <= 0">Habis</span><span v-else-if="item.qty <= item.safety">Kritis</span><span v-else>Aman</span>`
  - `tracking.html`: Menentukan kapan bagian "Detail Pesanan" atau "Data Tidak Ditemukan" muncul ke layar.
* **`v-show`:**
  - `tracking.html`: Mengamankan form input user. Menampilkan teks merah di bawah input secara dinamis jika format resi tidak terpenuhi (`v-show="inputError"`).

### 1.4. Penggunaan Property (`computed` ataupun `methods`)
* **`computed` Property:**
  - `js/stok-app.js`: fungsi `stokTersaring()` digunakan untuk menyortir data array berdasarkan filter. fungsi `totalStokKeseluruhan()` untuk menjumlahkan sisa buku real-time.
  - `js/tracking-app.js`: fungsi validasi `isInputValid()`, `inputError()`, dan fungsi penentu warna form `badgeStatusClass()`.
* **`methods` Property:**
  - `js/stok-app.js`: Tempat disimpannya fungsi formatting mata uang `formatRupiah()`, fungsi `tambahStok()`, dan `kurangiStok()`.
  - `js/tracking-app.js`: Fungsi utama eksekutor pelacakan `cariResi()`.

### 1.5. Watchers (Memantau perubahan data)
* **`js/stok-app.js` (Memiliki 2 Watchers):**
  - `katakunci(newVal, oldVal)`: Memantau riwayat aktivitas pengetikkan nama/kode buku dan langsung membukukannya dalam `console.log`.
  - `kategoriTerpilih(newVal, oldVal)`: Memantau kapan user memilih filter combobox dan melog aktivitas tersebut ke `console`.
* **`js/tracking-app.js` (Memiliki 2 Watchers):**
  - `inputResi(newVal, oldVal)`: Melakukan observasi apakah angka resi terhapus/ganti isi (dengan _trigger_ mengkosongkan layar hasil sebelumnya agar tetap responsif).
  - `nomorResiDicari(newVal, oldVal)`: Mencatat rekaman (_log_) setiap pengguna klik lacak untuk sebuah nomor referensi resi.

### 1.6. Formulir input dan Validasi input sederhana
* **Penjelasan:** Di halaman `tracking.html`, form memiliki validasi pencegah _input error_. Logika validasi dikendalikan oleh fungsi `isInputValid` dalam Computed property. Saat tombol tekan dilibatkan, tombol Lacakan (`<button type="submit">`) statusnya terikat (_binded_) untuk terkunci selama `< 5 karakter_`. Muncul juga elemen keterangan tambahan `<div v-show="inputError">` yang berwarna merah jikalau format yang dimasukkan sedang kurang (_real-time_).

### 1.7. Kreativitas Interface
* **Penjelasan:** Aplikasi dikonstruksikan sepenuhnya menggunakan tema _Framework Bootstrap 5 murni_, dilengkapi dengan UI/UX melingkar yang modern (_pill, rounded, display icons, dropshadows_).
* Terdapat hover interaktif berbasis `css` custom pada index Beranda.
* Visualisasi _Tracking History_ dan status badge menggunakan komponen modern sehingga tampak seperti aplikasi pelacakan logistik level instansi sungguhan.

---

_Dokumen ini dibuat otomatis untuk memudahkan proses perekaman video tugas Anda._