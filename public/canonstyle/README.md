# Canon Picture Style - Setup Gambar

## Struktur Folder
Letakkan gambar before/after di folder ini dengan nama sebagai berikut:

### Gambar yang Dibutuhkan:

1. **Kodak Ektar**
   - `kodak-ektar-before.webp` - Foto original tanpa picture style
   - `kodak-ektar-after.webp` - Foto dengan Kodak Ektar picture style

2. **Kodak Alaris**
   - `kodak-alaris-before.webp` - Foto original tanpa picture style
   - `kodak-alaris-after.webp` - Foto dengan Kodak Alaris picture style

3. **Kodak Satin**
   - `kodak-satin-before.webp` - Foto original tanpa picture style
   - `kodak-satin-after.webp` - Foto dengan Kodak Satin picture style

4. **Fuji Natura 1600**
   - `fuji-natura-before.webp` - Foto original tanpa picture style
   - `fuji-natura-after.webp` - Foto dengan Fuji Natura 1600 picture style

5. **Puretone 2**
   - `puretone-before.webp` - Foto original tanpa picture style
   - `puretone-after.webp` - Foto dengan Puretone 2 picture style

## Rekomendasi Gambar:

### Spesifikasi Teknis:
- **Resolusi**: Minimal 1080x1440px atau 1200x1600px
- **Aspect Ratio**: 3:4 (portrait/vertical)
- **Orientasi**: Vertikal (portrait)
- **Format**: WebP (lebih efisien dari JPG/PNG)
- **Ukuran File**: Maksimal 300KB per gambar (WebP lebih kecil)
- **Kualitas**: 80-85% compression

### Tips Memilih Foto:
1. **Gunakan foto yang sama** untuk before dan after setiap picture style
2. **Pilih subjek yang menarik**: Portrait, landscape, atau street photography
3. **Pencahayaan bagus**: Foto dengan exposure yang baik akan menunjukkan perbedaan lebih jelas
4. **Variasi subjek**: Gunakan subjek berbeda untuk setiap picture style agar lebih menarik
5. **Hindari foto yang terlalu gelap atau overexposed**

### Contoh Subjek yang Cocok:
- **Kodak Ektar**: Landscape dengan warna-warna cerah, sunset, atau portrait outdoor
- **Kodak Alaris**: Street photography, candid moments, vintage vibes
- **Kodak Satin**: Portrait dengan skin tone natural, wedding photography
- **Fuji Natura 1600**: Low light photography, indoor shots, moody atmosphere
- **Puretone 2**: Product photography, architecture, clean compositions

## Cara Menambahkan Gambar:

1. Ambil foto SOOC (Straight Out Of Camera) dengan kamera Canon
2. Untuk foto "before": Export foto dengan Picture Style Standard
3. Untuk foto "after": Export foto dengan Picture Style yang sesuai
4. Resize dan compress gambar sesuai spesifikasi di atas
5. Rename file sesuai dengan naming convention di atas
6. Letakkan semua gambar di folder `public/canonstyle/`

## Tools untuk Convert ke WebP & Compress:
- **Online**: Squoosh.app (recommended for WebP), CloudConvert, Online-Convert
- **Software**: Adobe Photoshop (Save for Web), GIMP, XnConvert
- **Batch Processing**: ImageMagick, IrfanView, cwebp (Google's WebP converter)
- **Command Line**: `cwebp -q 80 input.jpg -o output.webp`

## Setelah Gambar Ditambahkan:
Website akan otomatis menampilkan gambar-gambar tersebut dengan fitur before/after slider yang interaktif.

---

**Note**: Jika gambar belum ditambahkan, website akan menampilkan placeholder dengan gradient yang menunjukkan posisi before dan after.
