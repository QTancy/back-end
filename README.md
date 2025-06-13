# QTancy Back-end

## Deskripsi Proyek

Repositori ini berisi *back-end* untuk aplikasi **QTancy**. API ini bertanggung jawab untuk menyediakan *endpoint* RESTful untuk **autentikasi**.

## Fitur Utama

* **Autentikasi Pengguna:** Sistem *sign-up* dan *sign-in* yang aman menggunakan **[metode autentikasi JWT (JSON Web Tokens)]**.

---

## Teknologi yang Digunakan

* **Bahasa Pemrograman:** Javascript 
* **Framework:** Express.Js
* **Autentikasi:** JWT (JSON WEB TOKEN)
* **Lain-lain:** Docker ( Sebagai Container Builder, Penerapan CI/CD di Google Cloud Service)

---

## Memulai Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda.

### Instalasi

1.  **Clone repositori:**
    ```bash
    git clone [https://github.com/QTancy/back-end.git](https://github.com/QTancy/back-end.git)
    cd back-end
    ```

2.  **Instal dependensi:**
    ```bash
    # Jika menggunakan npm
    npm install

    # Atau jika menggunakan yarn
    # yarn install
    ```

3.  **Konfigurasi Variabel Lingkungan:**
    Buat file `.env` di *root* proyek Anda dengan SECRET_KEY untuk proses pembuatan JWT.

    Contoh `.env`:
    ```
    SECRET_KEY="[Contoh: supersecretkeyanda]"
    ```


### Menjalankan Aplikasi

Untuk menjalankan server *back-end*:

```bash
# Untuk pengembangan (dengan hot-reloading jika didukung)
npm run dev

# Untuk produksi
npm start
```
