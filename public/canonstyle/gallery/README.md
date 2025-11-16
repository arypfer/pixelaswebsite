# Canon Picture Style - Gallery Setup

## Cara Menambahkan Foto ke Galeri

Setiap picture style memiliki folder galeri sendiri. Anda bisa menambahkan foto dengan **NAMA FILE APA SAJA** ke dalam folder yang sesuai.

## Struktur Folder:

```
public/canonstyle/gallery/
├── fuji-natura-1600/       (Galeri untuk Fuji Natura 1600)
├── kodak-ektar/            (Galeri untuk Kodak Ektar)
├── puretone-2/             (Galeri untuk Puretone 2)
├── kodak-satin/            (Galeri untuk Kodak Satin)
└── kodak-alaris/           (Galeri untuk Kodak Alaris)
```

## Cara Menggunakan:

### 1. Pilih Folder Picture Style
Masuk ke folder sesuai picture style yang ingin ditampilkan galerinya.

### 2. Tambahkan Foto dengan Nama Bebas
Anda bisa menggunakan nama file apa saja, contoh:
- `photo1.webp`
- `DSC_1234.jpg`
- `portrait-outdoor.png`
- `my-favorite-shot.webp`
- `IMG_5678.jpeg`

**Tidak ada aturan penamaan khusus!** Sistem akan otomatis membaca semua file gambar di folder tersebut.

### 3. Format yang Didukung:
- `.webp` (recommended)
- `.jpg` / `.jpeg`
- `.png`
- `.gif`

### 4. Rekomendasi:
- **Resolusi**: 1080x1440px atau 1200x1600px (portrait/vertical)
- **Aspect Ratio**: 3:4 (sama dengan slider before/after)
- **Ukuran File**: Maksimal 500KB per foto
- **Format**: WebP untuk ukuran file lebih kecil

## Contoh Penggunaan:

### Fuji Natura 1600
```
public/canonstyle/gallery/fuji-natura-1600/
├── street-photo-1.webp
├── portrait-sunset.webp
├── candid-moment.webp
├── DSC_0123.jpg
└── my-best-shot.webp
```

### Kodak Ektar
```
public/canonstyle/gallery/kodak-ektar/
├── landscape-mountain.webp
├── colorful-sunset.webp
├── vibrant-portrait.webp
└── nature-shot.webp
```

## Tips:

1. **Tambahkan sebanyak mungkin foto** untuk showcase yang lebih menarik
2. **Gunakan foto berkualitas tinggi** dengan exposure yang bagus
3. **Variasi subjek** - portrait, landscape, street, dll
4. **Konsisten dengan picture style** - pastikan foto menggunakan picture style yang sesuai
5. **Compress foto** sebelum upload untuk loading lebih cepat

## Cara Kerja:

Ketika user klik tombol **"Lihat Galeri Foto"** di bawah slider:
1. System akan membaca semua file gambar di folder picture style yang sedang aktif
2. Menampilkan semua foto dalam grid 3 kolom (responsive)
3. Foto bisa di-hover untuk efek zoom
4. Modal bisa ditutup dengan klik di luar atau tombol X

## Troubleshooting:

### Foto tidak muncul?
- Pastikan foto ada di folder yang benar
- Cek format file (harus .jpg, .jpeg, .png, .webp, atau .gif)
- Refresh browser (Ctrl+F5)
- Cek console browser untuk error

### Galeri kosong?
- Pastikan minimal ada 1 foto di folder
- Cek nama folder sudah benar (huruf kecil, pakai dash)
- Restart development server

---

**Note**: Sistem akan otomatis membaca semua file gambar tanpa perlu konfigurasi tambahan. Tinggal drag & drop foto ke folder yang sesuai!
