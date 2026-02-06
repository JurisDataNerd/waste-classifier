# ♻️ Waste Classification System using CNN & FastAPI

Sistem klasifikasi sampah berbasis citra digital yang memanfaatkan arsitektur **Deep Learning MobileNetV2** untuk mengidentifikasi jenis limbah secara otomatis. Proyek ini menyediakan API siap pakai melalui **FastAPI** untuk integrasi ke platform frontend atau mobile.

## 📌 Deskripsi Proyek

Sistem ini dirancang untuk mempermudah proses pemilahan sampah ke dalam 6 kategori utama guna mendukung upaya daur ulang. Model dilatih menggunakan teknik *Transfer Learning* pada arsitektur MobileNetV2 yang ringan namun akurat, sehingga efisien untuk dijalankan di sisi server maupun perangkat dengan sumber daya terbatas.

### 🗂️ Kategori Sampah

Aplikasi ini mampu mengklasifikasikan sampah ke dalam:

* 🧴 **Plastic Bottle** (Botol Plastik)
* 🧃 **Carton Brick** (Karton Minuman/Tetra Pak)
* 🥫 **Metal Packaging** (Kemasan Logam)
* 🗑️ **Household Waste** (Sampah Rumah Tangga/Sisa Makan)
* 📦 **Paper & Cardboard** (Kertas & Kardus)
* 🍷 **Glass** (Kaca)

---

## 🏗️ Struktur Proyek

```text
waste-classifier/
├── backend/            # Layanan API Inference
│   └── main.py         # Entry point FastAPI
├── frontend/           # Interface pengguna (terpisah/opsional)
├── model/              # Artefak Machine Learning
│   ├── waste_model.h5  # Model Keras yang sudah dilatih
│   └── classes.txt     # Daftar label kategori
├── train.py            # Pipeline pelatihan model
├── requirements.txt    # Daftar dependensi Python
└── README.md           # Dokumentasi proyek

```

---

## 🚀 Panduan Instalasi

Pastikan Anda telah menginstal **Python 3.10+**.

1. **Clone Repositori**
```bash
git clone https://github.com/JurisDataNerd/waste-classifier.git
cd waste-classifier

```


2. **Siapkan Virtual Environment (Opsional tapi Disarankan)**
```bash
python -m venv venv
source venv/bin/activate  # Untuk Linux/Mac
# atau
venv\Scripts\activate     # Untuk Windows

```


3. **Instal Dependensi**
```bash
pip install -r requirements.txt

```



---

## 🛠️ Penggunaan

### 1. Pelatihan Model (Training)

Jika Anda ingin melatih ulang model dengan dataset baru, jalankan perintah berikut:

```bash
python train.py

```

Output berupa `model/waste_model.h5` dan `model/classes.txt` akan diperbarui secara otomatis.

### 2. Menjalankan Backend API

Jalankan server FastAPI menggunakan Uvicorn:

```bash
cd backend
uvicorn main:app --reload

```

Server akan berjalan di `http://localhost:8000`.

---

## 🔌 Dokumentasi API

### Predict Image

Mengunggah gambar untuk diklasifikasikan oleh model.

* **Endpoint:** `/predict`
* **Method:** `POST`
* **Payload:** `multipart/form-data`
* **Key:** `file` (Image file)

**Contoh Request (cURL):**

```bash
curl -X 'POST' \
  'http://localhost:8000/predict' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@nama_gambar.jpg;type=image/jpeg'

```

**Contoh Response:**

```json
{
  "class": "plastic_bottle",
  "confidence": 0.9254
}

```

---

## 🧠 Detail Model

* **Arsitektur:** MobileNetV2 (Pre-trained pada ImageNet).
* **Lapisan Akhir:** Global Average Pooling + Dense Layer (Softmax).
* **Input Size:** 224x224 piksel.
* **Optimizer:** Adam.
* **Loss Function:** Categorical Crossentropy.

---

## 🤝 Kontribusi

Kontribusi sangat terbuka! Silakan lakukan *fork* pada repositori ini dan ajukan *pull request* untuk perbaikan fitur atau bug.

1. Fork repositori ini.
2. Buat branch fitur baru (`git checkout -b fitur-keren`).
3. Commit perubahan Anda (`git commit -m 'Menambah fitur keren'`).
4. Push ke branch (`git push origin fitur-keren`).
5. Buat Pull Request.

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi.

---

**Maintainer:** [JurisDataNerd](https://www.google.com/search?q=https://github.com/JurisDataNerd)

**Project Link:** [https://github.com/JurisDataNerd/waste-classifier](https://www.google.com/search?q=https://github.com/JurisDataNerd/waste-classifier)
