#!/bin/bash
# PXCut Remote Installer for macOS
# Usage: bash -c "$(curl -fsSL https://raw.githubusercontent.com/arypfer/pixelaswebsite/main/public/install-pxcut.sh)"

set -e

PLUGIN_ZIP_URL="https://github.com/arypfer/pxcut/releases/latest/download/pxcut-mac.zip"

echo ""
echo "  ============================================="
echo "    PXCut | Installer for macOS"
echo "    Silence Cutter untuk Premiere Pro"
echo "  ============================================="
echo ""

# --- 1. Detect architecture ---
ARCH="$(uname -m)"
if [ "$ARCH" = "arm64" ]; then
    echo "  [INFO] Arsitektur: Apple Silicon (arm64)"
    FFMPEG_URL="https://ffmpeg.martin-riedl.de/redirect/latest/macos/arm64/release/ffmpeg.zip"
elif [ "$ARCH" = "x86_64" ]; then
    echo "  [INFO] Arsitektur: Intel (x86_64)"
    FFMPEG_URL="https://ffmpeg.martin-riedl.de/redirect/latest/macos/amd64/release/ffmpeg.zip"
else
    echo "  [ERROR] Arsitektur tidak dikenal: $ARCH"
    exit 1
fi

# --- 2. Download plugin zip to temp dir ---
TMPDIR_PXCUT="$(mktemp -d)"
PLUGIN_ZIP="$TMPDIR_PXCUT/pxcut-mac.zip"

echo "  [INFO] Mengunduh plugin dari GitHub..."
curl -L -# -o "$PLUGIN_ZIP" "$PLUGIN_ZIP_URL"

if [ ! -f "$PLUGIN_ZIP" ] || [ ! -s "$PLUGIN_ZIP" ]; then
    echo "  [ERROR] Gagal mengunduh plugin."
    rm -rf "$TMPDIR_PXCUT"
    exit 1
fi

echo "  [INFO] Mengekstrak plugin..."
unzip -o -q "$PLUGIN_ZIP" -d "$TMPDIR_PXCUT/plugin"

# Find the actual plugin root (might be nested in a folder)
if [ -f "$TMPDIR_PXCUT/plugin/index.html" ]; then
    SRC="$TMPDIR_PXCUT/plugin"
elif [ -d "$TMPDIR_PXCUT/plugin/pxcut-mac" ] && [ -f "$TMPDIR_PXCUT/plugin/pxcut-mac/index.html" ]; then
    SRC="$TMPDIR_PXCUT/plugin/pxcut-mac"
else
    # Find wherever index.html ended up
    FOUND="$(find "$TMPDIR_PXCUT/plugin" -name "index.html" -maxdepth 3 | head -1)"
    if [ -n "$FOUND" ]; then
        SRC="$(dirname "$FOUND")"
    else
        echo "  [ERROR] Plugin zip tidak valid — index.html tidak ditemukan."
        rm -rf "$TMPDIR_PXCUT"
        exit 1
    fi
fi

echo "  [INFO] Sumber plugin: $SRC"

# --- 3. CEP extension install path ---
EXT_ROOT="$HOME/Library/Application Support/Adobe/CEP/extensions"
DEST="$EXT_ROOT/pxcut"

echo "  [INFO] Tujuan instalasi: $DEST"
echo ""

# --- 4. Create extension directory ---
if [ ! -d "$EXT_ROOT" ]; then
    echo "  [INFO] Membuat folder CEP extensions..."
    mkdir -p "$EXT_ROOT"
fi

# --- 5. Remove old install ---
if [ -d "$DEST" ]; then
    echo "  [INFO] Menghapus versi lama..."
    rm -rf "$DEST"
fi

# --- 6. Copy plugin files ---
echo "  [INFO] Menyalin file plugin..."
mkdir -p "$DEST"

for item in CSXS css js jsx node_modules index.html; do
    if [ -e "$SRC/$item" ]; then
        cp -R "$SRC/$item" "$DEST/"
    fi
done

echo "  [INFO] File plugin berhasil disalin."

# --- 7. Download ffmpeg ---
FFMPEG_DIR="$HOME/.pxcut/ffmpeg"
FFMPEG_BIN="$FFMPEG_DIR/ffmpeg"

if [ -x "$FFMPEG_BIN" ]; then
    echo "  [INFO] ffmpeg sudah ada di $FFMPEG_BIN, skip download."
else
    echo "  [INFO] Mengunduh ffmpeg..."
    mkdir -p "$FFMPEG_DIR"
    FFMPEG_ZIP="$FFMPEG_DIR/ffmpeg.zip"

    curl -L -# -o "$FFMPEG_ZIP" "$FFMPEG_URL"

    echo "  [INFO] Mengekstrak ffmpeg..."
    unzip -o -q "$FFMPEG_ZIP" -d "$FFMPEG_DIR"
    chmod +x "$FFMPEG_BIN"
    rm -f "$FFMPEG_ZIP"

    if [ -x "$FFMPEG_BIN" ]; then
        echo "  [INFO] ffmpeg berhasil diunduh."
    else
        echo "  [WARN] ffmpeg tidak ditemukan setelah ekstrak."
        echo "         Install manual: brew install ffmpeg"
    fi
fi

# --- 8. Set PlayerDebugMode ---
echo "  [INFO] Mengaktifkan izin plugin (PlayerDebugMode)..."

for V in 9 10 11 12 13; do
    defaults write com.adobe.CSXS.$V PlayerDebugMode 1 2>/dev/null || true
done

echo "  [INFO] PlayerDebugMode berhasil diatur."

killall cfprefsd 2>/dev/null || true

# --- 9. Cleanup temp files ---
rm -rf "$TMPDIR_PXCUT"

# --- 10. Verify installation ---
echo ""
OK=1
for F in "CSXS/manifest.xml" "index.html" "js/main.js" "js/fix.js" "js/CSInterface.js" "jsx/hostscript.jsx"; do
    if [ ! -f "$DEST/$F" ]; then
        echo "  [WARN] File tidak ditemukan: $F"
        OK=0
    fi
done

if [ -x "$FFMPEG_BIN" ]; then
    FFMPEG_SIZE=$(du -h "$FFMPEG_BIN" | cut -f1)
    echo "  [OK]   ffmpeg ($FFMPEG_SIZE) di $FFMPEG_BIN"
elif command -v ffmpeg &>/dev/null; then
    echo "  [OK]   ffmpeg ditemukan di PATH: $(which ffmpeg)"
else
    echo "  [WARN] ffmpeg tidak ditemukan. Install: brew install ffmpeg"
    OK=0
fi

echo ""
if [ "$OK" = "1" ]; then
    echo "  ============================================="
    echo "   PXCut berhasil diinstal!"
    echo ""
    echo "   Langkah selanjutnya:"
    echo "   1. Tutup dan buka ulang Adobe Premiere Pro"
    echo "   2. Klik menu Window > Extensions > PXCut"
    echo "   3. Masukkan kode lisensi Anda"
    echo "  ============================================="
else
    echo "  [WARN] Instalasi selesai tapi beberapa file mungkin hilang."
    echo "         Coba jalankan installer lagi."
fi

echo ""
