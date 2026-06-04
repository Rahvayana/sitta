# Tugas 03 - Data Cryptocurrency

Web app mobile sederhana untuk menampilkan data cryptocurrency dari API CoinLore:

`https://api.coinlore.net/api/tickers/`

## Identitas

Nama: Fahrul Sanjaya  
NIM: 055179048  
Mata kuliah: MSIM4401

## Cara Menjalankan

Jalankan server lokal dari root repo:

```bash
python -m http.server 8000
```

Buka:

```text
http://127.0.0.1:8000/third-task/index.html
```

## File Source Code

- `index.html`: struktur tampilan mobile berbasis Vue directive, identitas mahasiswa, ringkasan data, search, dan daftar cryptocurrency.
- `styles.css`: desain mobile, layout panel, state loading/error/empty, dan responsive view.
- `app.js`: inisialisasi Vue, mengambil data API CoinLore, normalisasi field `rank`, `name`, `symbol`, `price_usd`, computed filter, refresh, dan format harga.

## Hasil Praktikum

Aplikasi mengambil data online dari CoinLore dan menampilkan daftar cryptocurrency dalam format mobile. Field yang ditampilkan sesuai soal:

- `rank`
- `name`
- `symbol`
- `price_usd`

Tambahan untuk demonstrasi:

- Tombol muat ulang data.
- Pencarian berdasarkan nama atau symbol.
- Ringkasan total data dan jumlah data yang sedang ditampilkan.
- State loading, error, dan data kosong.

## Analisa Praktikum

Praktik ini menunjukkan cara memakai Vue.js dan JavaScript `fetch()` untuk mengambil data API online, mengubah respons JSON menjadi data yang siap ditampilkan, lalu merender data ke DOM menggunakan directive seperti `v-for`, `v-if`, `v-model`, `:disabled`, dan `@click`. Data dari API memiliki banyak atribut, tetapi aplikasi hanya mengambil atribut yang diminta pada soal agar tampilan tetap fokus.

Karena data berasal dari API online, aplikasi membutuhkan koneksi internet saat tombol muat ulang digunakan. Jika API gagal diakses, aplikasi menampilkan pesan error agar pengguna memahami kondisi yang terjadi.

## Link Rekaman Video

Isi setelah video diunggah:

```text
https://...
```

## Naskah Singkat Video

1. Perkenalkan identitas: nama, NIM, mata kuliah, dan tugas ke-3.
2. Jelaskan bahwa praktik membuat aplikasi mobile untuk menampilkan data cryptocurrency dari API CoinLore.
3. Tunjukkan struktur file: `index.html`, `styles.css`, dan `app.js`, lalu jelaskan bahwa tampilan memakai Vue.js.
4. Buka aplikasi di browser dan tunjukkan data `rank`, `name`, `symbol`, dan `price_usd`.
5. Tekan tombol muat ulang, lalu gunakan pencarian untuk menunjukkan aktivitas praktik.
6. Jelaskan hasil dan analisa: data berhasil diambil dari API online, diproses di Vue, dan ditampilkan ke DOM.
7. Tutup video dengan ucapan terima kasih.
