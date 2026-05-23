# SITTA Bahan Ajar - Tugas Praktik 1

Web app front-end untuk pemesanan dan distribusi bahan ajar Universitas Terbuka. Aplikasi dibuat dengan HTML, CSS, dan JavaScript DOM tanpa back-end.

## Informasi

Nama: Fahrul Sanjaya\
NIM: 055179048\
UT Cabang: Surabaya

## Cara Menjalankan

1. Buka `index.html` atau jalankan server lokal dari folder proyek.
2. Jika memakai server lokal:

```bash
python -m http.server 8000
```

3. Buka `http://localhost:8000`.

## Akun Login

- `rina@ut.ac.id` / `rina123`
- `agus@ut.ac.id` / `agus123`
- `siti@ut.ac.id` / `siti123`
- `doni@ut.ac.id` / `doni123`
- `admin@ut.ac.id` / `admin123`

## Halaman dan Fitur

- `login.html`: validasi email/password, alert pop-up saat salah, modal Lupa Password, modal Daftar.
- `dashboard.html`: greeting berdasarkan waktu lokal, ringkasan stok, dan menu navigasi utama.
- `tracking.html`: pencarian nomor Delivery Order, status pengiriman, progress bar, ekspedisi, tanggal kirim, paket, total pembayaran, dan timeline perjalanan.
- `stok.html`: tabel stok dinamis dari `js/data.js`, pencarian, filter, sort, validasi form, dan tambah baris stok baru dengan DOM.
- `laporan.html`: Monitoring Progress DO Bahan Ajar dan Rekap Bahan Ajar.
- `histori.html`: Histori Transaksi Bahan Ajar dengan pencarian.

## Kesesuaian Rubrik

- Struktur HTML semantik: memakai `main`, `section`, `article`, `header`, `aside`, `nav`, tabel valid, label form, dan atribut aksesibilitas dasar.
- CSS: memakai external CSS di `css/styles.css`, internal CSS kecil pada `login.html`, serta inline style dinamis untuk progress bar dan variasi halaman.
- JavaScript DOM: login, modal, toast alert, greeting waktu lokal, render tabel dinamis, tambah/hapus data stok tambahan, filter, sort, pencarian DO, laporan, dan histori.
- Validasi form: login salah, pencarian DO tidak ditemukan, form stok wajib lengkap, stok harus angka, dan duplikasi kode ditolak.
- Modularitas: data di `js/data.js`, logika aplikasi di `js/app.js`, style di `css/styles.css`, halaman HTML terpisah.
- Kreativitas tambahan: dashboard ringkasan, laporan visual, timeline tracking, status badge, responsive layout, dan penyimpanan stok tambahan di `localStorage`.

## Pemetaan Soal PDF ke Kode

Line number di bawah mengacu pada posisi kode saat README ini dibuat.

| Poin dari PDF | Halaman / File | Line kode HTML/CSS/Data | Function JavaScript |
| --- | --- | --- | --- |
| Halaman Login: input email, password, tombol Login | `login.html` | Form `#login-form`: line 31; input email/password dan tombol: line 32-40 | `initLogin()`: `js/app.js` line 151-173 |
| Login salah menampilkan alert/pop-up teks "email/password yang anda masukkan salah" | `login.html`, `js/app.js` | Container toast: `login.html` line 78; style toast: `css/styles.css` line 654-680 | `showToast()`: line 13-33; pengecekan salah di `initLogin()`: line 163-165 |
| Tombol Lupa Password dan Daftar dalam modal box/pop-up | `login.html` | Tombol: line 44-45; elemen `<dialog>` modal: line 71-77; style modal: `css/styles.css` line 684-722 | `openModal()`: `js/app.js` line 114-124; event Lupa Password: line 175-185; event Daftar: line 187-216 |
| Dashboard Menu dengan navigasi ke Informasi Bahan Ajar, Tracking, Laporan, Histori | `dashboard.html` | Navigasi sidebar: line 22-42; menu utama: line 63-90 | `syncShell()` untuk active nav/mobile nav: `js/app.js` line 87-100; `renderDashboard()`: line 250-278 |
| Greeting berdasarkan waktu local time pagi/siang/sore | `dashboard.html` | Target greeting `#greeting`: line 55; jam lokal `#local-clock`: line 58 | `getGreeting()`: `js/app.js` line 39-45; render greeting/jam di `syncShell()`: line 68-84 |
| Tracking Pengiriman: input Nomor Delivery Order dan tombol Cari | `tracking.html` | Form `#tracking-form`: line 64; input `#nomor-do`: line 66-67; tombol Cari: line 70-71; hasil `#tracking-result`: line 80-82 | `initTracking()`: `js/app.js` line 307-337 |
| Tracking menampilkan nama, status, ekspedisi, tanggal kirim, paket, total pembayaran, progress bar/list | `tracking.html`, `js/data.js` | Data dummy `dataTracking`: `js/data.js` line 92; area hasil: `tracking.html` line 80 | `getProgress()`: `js/app.js` line 339-346; `renderTracking()`: line 348-381 |
| Informasi Stok Bahan Ajar dinamis dari `dataBahanAjar` | `stok.html`, `js/data.js` | Data stok `dataBahanAjar`: `js/data.js` line 44; tabel `#stock-body`: `stok.html` line 87-99 | `getStockRows()`: `js/app.js` line 219-231; `renderStockTable()`: line 454-496 |
| Fitur tambah baris stok baru menggunakan JavaScript DOM | `stok.html` | Form `#stock-form`: line 109-154; input kode lokasi mulai line 112-113 | `initStock()`: `js/app.js` line 387-452; submit tambah data: line 404-438 |
| Validasi form dan feedback error | `login.html`, `tracking.html`, `stok.html` | Login form line 31-40; tracking form line 64-77; stock form line 109-154 | Login salah: `js/app.js` line 163-165; DO tidak ditemukan: line 351-354; stok wajib/angka: line 419-421; duplikasi stok: line 424-429 |
| Manipulasi data tabel, filter, sort, dan interaksi UI | `stok.html`, `histori.html` | Kontrol stok search/filter/sort: `stok.html` line 64-81; histori search: `histori.html` line 64-65 | Stok filter/sort/render: `renderStockTable()` line 454-496; histori search/render: `initHistory()` line 563-591 |
| Laporan: Monitoring Progress DO Bahan Ajar dan Rekap Bahan Ajar | `laporan.html` | Section monitoring: line 62-82; section rekap: line 84-110; chart stok: line 108 | `initReports()`: `js/app.js` line 498-561 |
| Histori Transaksi Bahan Ajar | `histori.html`, `js/data.js` | Tabel `#history-body`: `histori.html` line 69-82; data `dataRiwayatTransaksi`: `js/data.js` line 153 | `initHistory()`: `js/app.js` line 563-591 |
| Struktur HTML semantik dan valid | Semua halaman utama | Contoh: `main`, `section`, `article`, `aside`, `nav` di `login.html` line 16-69, `dashboard.html` line 22-91, `stok.html` line 52-156 | Tidak spesifik function; struktur ada di file HTML |
| Desain CSS: external, internal, inline | `css/styles.css`, `login.html`, beberapa HTML | External CSS mulai `css/styles.css` line 1; internal CSS login: `login.html` line 8-12; inline style: `login.html` line 16 dan progress bar dibuat di JS | Inline progress dibuat di `renderTracking()` line 366 dan `initReports()` line 513, 555 |
| Modularitas file dan struktur folder | Root, `css`, `js`, `img` | Data: `js/data.js`; logic: `js/app.js`; style: `css/styles.css`; assets: `img/img/*` | Initializer page-based: `init()` di `js/app.js` line 597-605 |
| Kreativitas tambahan: dashboard ringkasan, laporan visual, responsive UI | `dashboard.html`, `laporan.html`, `css/styles.css` | Dashboard stats: `dashboard.html` line 61; chart laporan: `laporan.html` line 108; responsive CSS: `css/styles.css` line 750-827 | `renderDashboard()`: `js/app.js` line 250-278; chart laporan di `initReports()`: line 544-559 |

## Alur Video Singkat

1. Jelaskan tujuan aplikasi dan struktur folder.
2. Tunjukkan login berhasil dan login gagal.
3. Tunjukkan dashboard serta greeting waktu lokal.
4. Tunjukkan tracking DO `2023001234` dan `2023005678`.
5. Tunjukkan tabel stok, filter/sort, tambah baris stok, dan validasi error.
6. Tunjukkan laporan monitoring, rekap bahan ajar, dan histori transaksi.
7. Tutup dengan menjelaskan bahwa semua data berasal dari file JavaScript dan manipulasi dilakukan di DOM.
