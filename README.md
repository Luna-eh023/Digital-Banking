Kuis Backend Programming 1 - Sistem Undian Gacha
Nama: Brandon Wesley

NIM: 535250138

Fakultas: Teknologi Informasi (FTI)

Universitas: Universitas Tarumanagara (UNTAR)

1. ENDPOINT : POST /api/gacha/play

URL : http://localhost:5000/api/gacha/play

FUNGSI : Melakukan eksekusi undian gacha, memvalidasi limit harian user, dan memperbarui stok hadiah secara real-time.

RAW DATA (JSON) :
JSON
{
  "user_id": "661f1a3a5b2c7e001234abcd"
}

2. ENDPOINT : GET /api/gacha/history/:userId

URL : http://localhost:5000/api/gacha/history/661f1a3a5b2c7e001234abcd

FUNGSI : Menampilkan riwayat lengkap aktivitas gacha milik user tertentu berdasarkan ID.

Endpoint 3
ENDPOINT : GET /api/gacha/prizes

URL : http://localhost:5000/api/gacha/prizes

FUNGSI : Menampilkan daftar seluruh hadiah yang tersedia beserta sisa kuota yang bisa dimenangkan.

Endpoint 4
ENDPOINT : GET /api/gacha/winners

URL : http://localhost:5000/api/gacha/winners

FUNGSI : Menampilkan daftar user yang telah memenangkan hadiah dengan nama yang sudah disensor otomatis.