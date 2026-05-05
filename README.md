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

## Alur Video Singkat

1. Jelaskan tujuan aplikasi dan struktur folder.
2. Tunjukkan login berhasil dan login gagal.
3. Tunjukkan dashboard serta greeting waktu lokal.
4. Tunjukkan tracking DO `2023001234` dan `2023005678`.
5. Tunjukkan tabel stok, filter/sort, tambah baris stok, dan validasi error.
6. Tunjukkan laporan monitoring, rekap bahan ajar, dan histori transaksi.
7. Tutup dengan menjelaskan bahwa semua data berasal dari file JavaScript dan manipulasi dilakukan di DOM.
