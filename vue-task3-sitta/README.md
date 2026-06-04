# Tugas Praktik 3 - SITTA Vue.js

Aplikasi ini dibuat untuk demonstrasi Tugas Praktik 3 STSI4209. Folder menggunakan Vue.js dari CDN agar source code mudah dibuka, dibaca, dan direkam tanpa proses build.

## Cara Menjalankan

Jalankan server lokal dari folder repo:

```powershell
python -m http.server 5173 -d E:\Work\Codex\sitta\vue-task3-sitta
```

Buka:

```text
http://localhost:5173
```

## Struktur Folder

```text
vue-task3-sitta/
  index.html
  css/
    styles.css
  js/
    app.js
  data/
    dataBahanAjar.json
```

## Bagian Vue yang Ditunjukkan

- Vue Component dan property template: `app-header`, `summary-panel`, `stock-browser`, `stock-row`, `order-form`, `tracking-panel`.
- Template: setiap komponen memakai `<script type="text/x-template">`.
- Menampilkan data: mustache `{{ }}`, `v-text`, dan `v-html`.
- Conditional: `v-if`, `v-else-if`, `v-else`, dan `v-show`.
- Data binding: `v-bind` melalui `:class`, `:value`, `:disabled`; two-way binding melalui `v-model`.
- Computed property: `filteredStock`, `criticalStock`, `selectedPackage`, `orderTotal`, `trackingResult`.
- Methods property: `loadData`, `updateFilter`, `setSort`, `toggleOrderItem`, `submitOrder`, `resetOrder`.
- Watcher: `filters.upbjj`, `order.items` dengan `deep: true`, dan `trackingCode`.
- Array rendering: `v-for` memakai zero-based index pada tabel stok dan timeline.
- Name-based/object rendering: `v-for="(value, key) in trackingResult.info"`.
- Filter teks: `rupiah`, `titleCase`, `labelize`, dan `tanggalJam`.
- Event handler mouse dan keyboard: klik tab/filter/tombol, `keyup.enter`, `keyup.esc`, dan `Ctrl+Enter` untuk validasi pesanan.

## Alur Video Singkat

1. Jelaskan struktur folder dan alasan memakai Vue 2 karena mendukung filter.
2. Tampilkan komponen dan template di `index.html`.
3. Demo tab Stok: pencarian, filter UPBJJ, filter kategori, sort, `v-html` catatan stok.
4. Demo tab Pesan: `v-model`, validasi, pilih paket atau item satuan, total computed.
5. Demo tab Tracking: pencarian DO, list perjalanan, object rendering.
6. Tunjukkan watcher melalui panel Catatan Interaksi.
