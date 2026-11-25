# Student API (NestJS + Prisma + PostgreSQL)

REST API data mahasiswa untuk Tugas Bab 10. Data disimpan permanen di PostgreSQL
melalui Prisma ORM. Entitas utama: `Student` (`id`, `name`, `nim` unik, `major`,
`createdAt`, `updatedAt`).

## Menjalankan

```bash
npm install
cp .env.example .env        # lalu sesuaikan DATABASE_URL
npx prisma migrate dev --name init
npm run prisma:seed         # opsional: isi 3 data awal
npm run start:dev
```

Server berjalan di `http://localhost:3000/api`.

## Endpoint

| Method | URL | Keterangan |
|--------|-----|------------|
| POST | `/api/students` | Tambah mahasiswa |
| GET | `/api/students` | Semua mahasiswa |
| GET | `/api/students?major=informatika` | Filter jurusan (`where`) |
| GET | `/api/students/stats` | Statistik: total dan jumlah per jurusan (`count`) |
| GET | `/api/students/:id` | Detail satu mahasiswa |
| PATCH | `/api/students/:id` | Ubah data |
| DELETE | `/api/students/:id` | Hapus data |

Contoh body POST:

```json
{ "name": "Dzulfaqar", "nim": "123459", "major": "Software Engineering" }
```

## Screenshot

Simpan di `docs/screenshots/`:

1. Database PostgreSQL berhasil dibuat
2. `schema.prisma`
3. Hasil `npx prisma migrate dev` dan tabel `students` (pgAdmin / Prisma Studio)
4. `PrismaService` dan service yang memakai Prisma Client
5. Postman: POST, GET, GET by id, PATCH, DELETE
6. Data tetap ada setelah server di-restart
7. Endpoint tambahan (`?major=` dan `/stats`)
8. Tampilan mobile dan desktop
