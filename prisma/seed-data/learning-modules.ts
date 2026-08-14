// Materi learning path mahasiswa PGPAUD/PIAUD — 6 level.

export interface ModuleSection {
  heading: string;
  body: string;
  points?: string[];
}

export interface LearningModuleSeed {
  level: number;
  order: number;
  slug: string;
  title: string;
  description: string;
  sections: ModuleSection[];
}

export const learningModules: LearningModuleSeed[] = [
  // Level 1 — Mengenal Anak
  {
    level: 1,
    order: 1,
    slug: "karakteristik-belajar-anak-usia-dini",
    title: "Bagaimana Anak Usia Dini Belajar",
    description: "Memahami cara alami anak belajar: lewat bermain, gerak, dan pengalaman langsung.",
    sections: [
      {
        heading: "Anak belajar dengan seluruh tubuhnya",
        body: "Anak usia dini tidak belajar dengan duduk diam mendengarkan. Mereka belajar dengan menyentuh, bergerak, mencoba, gagal, dan mencoba lagi. Rentang fokus anak masih pendek — kira-kira 1 menit per tahun usianya. Anak 4 tahun umumnya hanya fokus 4-5 menit pada satu instruksi pasif.",
        points: [
          "Rancang kegiatan yang membuat anak AKTIF, bukan hanya menonton guru.",
          "Ganti aktivitas sebelum anak bosan, bukan setelahnya.",
          "Pengalaman konkret (memegang daun asli) selalu lebih kuat daripada gambar daun.",
        ],
      },
      {
        heading: "Bermain adalah belajar",
        body: "Bermain bukan selingan dari belajar — bermain ADALAH cara anak belajar. Saat bermain peran jual-jualan, anak berlatih bahasa, berhitung, negosiasi, dan empati sekaligus. Tugas guru bukan menghentikan bermain untuk mengajar, tetapi menghadirkan pembelajaran di dalam bermain.",
        points: [
          "Bermain bebas: anak memimpin, guru mengamati.",
          "Bermain terarah: guru menyiapkan lingkungan dan tujuan, anak tetap punya pilihan.",
          "Hindari mengubah semua permainan menjadi drill akademik.",
        ],
      },
      {
        heading: "Setiap anak berbeda",
        body: "Dalam satu kelas, kemampuan anak bisa terpaut jauh meski usianya sama. Ada yang sudah lancar bercerita, ada yang baru berani berbisik. Keduanya normal. Perkembangan bukan perlombaan.",
        points: [
          "Amati setiap anak sebagai individu, bukan dibandingkan dengan temannya.",
          "Siapkan variasi tingkat kesulitan dalam satu kegiatan.",
          "Jangan pernah melabel anak (pemalu, nakal, lambat) — label mudah melekat.",
        ],
      },
    ],
  },
  {
    level: 1,
    order: 2,
    slug: "keamanan-dan-bahasa-guru",
    title: "Keamanan Anak dan Bahasa Guru",
    description: "Dua fondasi yang tidak bisa ditawar: anak merasa aman, dan guru berbahasa positif.",
    sections: [
      {
        heading: "Aman secara fisik",
        body: "Sebelum kegiatan apa pun, guru memindai risiko: benda tajam, permukaan licin, benda kecil yang bisa tertelan (untuk anak di bawah 3 tahun), sudut meja, dan area yang tidak terpantau. Keamanan selalu mengalahkan keseruan kegiatan.",
        points: [
          "Periksa area sebelum anak datang, bukan saat kejadian.",
          "Rasio pengawasan: semakin muda anak, semakin dekat jarak guru.",
          "Saat ragu apakah sebuah aktivitas aman, pilih versi yang lebih aman.",
        ],
      },
      {
        heading: "Aman secara psikologis",
        body: "Anak hanya bisa belajar saat merasa aman. Anak yang takut dimarahi atau dipermalukan akan berhenti mencoba. Kesalahan anak adalah bagian dari belajar, bukan pelanggaran.",
        points: [
          "Tidak ada hukuman fisik dan mempermalukan — dalam bentuk apa pun.",
          "Respons kesalahan dengan: tenangkan, bereskan bersama, bicarakan singkat.",
          "Rayakan usaha, bukan hanya hasil.",
        ],
      },
      {
        heading: "Bahasa positif",
        body: "Otak anak memproses kalimat positif lebih mudah daripada larangan. 'Jangan lari!' menyisakan kata 'lari'. 'Berjalan pelan ya' memberi tahu persis apa yang diharapkan.",
        points: [
          "Katakan apa yang BOLEH dilakukan, bukan hanya yang dilarang.",
          "Turunkan tubuh sejajar mata anak saat berbicara hal penting.",
          "Ganti 'Kamu nakal' dengan menyebut perilakunya: 'Balok untuk membangun, bukan untuk dilempar.'",
        ],
      },
    ],
  },
  // Level 2 — Merancang Aktivitas
  {
    level: 2,
    order: 1,
    slug: "menyusun-tujuan-dan-memilih-aktivitas",
    title: "Menyusun Tujuan dan Memilih Aktivitas",
    description: "Dari tujuan perkembangan menjadi kegiatan konkret yang bisa dijalankan.",
    sections: [
      {
        heading: "Mulai dari tujuan, bukan dari kegiatan",
        body: "Guru pemula sering memilih kegiatan yang lucu dulu, baru mencari-cari tujuannya. Urutan yang benar: apa yang ingin dialami/dipelajari anak → kegiatan apa yang memberi pengalaman itu. Tujuan yang baik menyebut perilaku anak yang bisa diamati.",
        points: [
          "Lemah: 'Anak memahami warna.' Kuat: 'Anak mengelompokkan benda berdasarkan warna sambil menyebut namanya.'",
          "Satu kegiatan cukup 1-3 tujuan. Lebih dari itu biasanya tidak fokus.",
          "Kaitkan dengan tiga elemen CP PAUD: Nilai Agama dan Budi Pekerti; Jati Diri; Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni.",
        ],
      },
      {
        heading: "Uji kelayakan rencana",
        body: "Rencana yang indah di kertas bisa gagal di kelas. Sebelum mengajar, uji rencana dengan pertanyaan feasibility.",
        points: [
          "Apakah semua anak kebagian peran/alat, atau ada yang hanya menunggu?",
          "Apakah durasinya realistis untuk rentang fokus usia ini?",
          "Apa rencana B jika alat kurang, cuaca berubah, atau anak selesai lebih cepat?",
        ],
      },
      {
        heading: "Alat sederhana, pengalaman kaya",
        body: "Aktivitas terbaik sering memakai bahan paling murah: daun, kardus, botol bekas, air, tanah. Alat mahal tidak menjamin pembelajaran bermakna. Yang menentukan adalah kualitas interaksi dan kesempatan anak mencoba.",
        points: [
          "Biasakan merancang versi 'tanpa alat' untuk setiap kegiatan.",
          "Bahan alam dan barang bekas melatih kreativitas lebih daripada mainan jadi.",
          "Jumlah alat menentukan manajemen: kurang alat = sistem bergiliran yang jelas.",
        ],
      },
    ],
  },
  {
    level: 2,
    order: 2,
    slug: "adaptasi-dan-diferensiasi",
    title: "Adaptasi dan Diferensiasi Kegiatan",
    description: "Menyesuaikan satu kegiatan untuk anak yang berbeda-beda kemampuan dan kondisinya.",
    sections: [
      {
        heading: "Satu kegiatan, banyak pintu masuk",
        body: "Kegiatan yang baik bisa diikuti anak dengan kemampuan berbeda pada level tantangan berbeda. Ini disebut diferensiasi. Contoh: kegiatan meronce — anak yang butuh tantangan meronce mengikuti pola, anak yang masih berlatih cukup memasukkan manik ke tali.",
        points: [
          "Siapkan versi lebih mudah dan lebih menantang untuk kegiatan inti.",
          "Biarkan anak memilih tingkat tantangannya sendiri bila memungkinkan.",
          "Sukses didefinisikan per anak, bukan satu standar untuk semua.",
        ],
      },
      {
        heading: "Membaca kondisi kelas",
        body: "Rencana harus tunduk pada kondisi nyata. Anak baru pulang berenang dan lelah? Persingkat. Anak penuh energi karena hujan tidak bisa keluar? Tambahkan gerak. Guru yang baik mengubah rencana tanpa merasa gagal.",
        points: [
          "Amati energi kelas 5 menit pertama, lalu sesuaikan tempo.",
          "Selalu punya 2-3 permainan transisi hafalan di luar kepala.",
          "Kegiatan cadangan tanpa alat menyelamatkan banyak situasi.",
        ],
      },
    ],
  },
  // Level 3 — Membawa Kelas
  {
    level: 3,
    order: 1,
    slug: "membuka-kegiatan-dan-bercerita",
    title: "Membuka Kegiatan dan Bercerita",
    description: "Merebut perhatian anak di menit pertama dan menghidupkan cerita.",
    sections: [
      {
        heading: "Menit pertama menentukan",
        body: "Pembukaan yang baik membuat anak penasaran, bukan sekadar memberi tahu jadwal. Benda misterius dalam kotak, suara aneh, pertanyaan tak terduga, atau bisikan — semuanya lebih kuat daripada 'Anak-anak, hari ini kita akan belajar tentang...'",
        points: [
          "Gunakan benda konkret: sesuatu yang bisa dilihat dan disentuh anak.",
          "Pertanyaan terbuka memancing: 'Menurut kalian apa isi kotak ini?'",
          "Bangun ritual pembuka yang anak kenal: lagu, tepuk, atau gerakan khusus.",
        ],
      },
      {
        heading: "Bercerita yang hidup",
        body: "Anak tidak menuntut cerita sempurna — mereka menuntut cerita yang hidup. Suara yang berubah-ubah, ekspresi wajah, jeda dramatis, dan gerakan tangan membuat cerita sederhana menjadi pengalaman.",
        points: [
          "Berhenti di momen seru dan tanya: 'Menurut kalian apa yang terjadi?'",
          "Suara besar-kecil, cepat-lambat, adalah alat utama pendongeng.",
          "Libatkan anak: mereka menirukan suara angin, mengetuk pintu, memanggil tokoh.",
        ],
      },
      {
        heading: "Transisi tanpa kekacauan",
        body: "Perpindahan antar kegiatan adalah titik rawan kelas menjadi riuh. Transisi yang baik adalah permainan kecil, bukan perintah.",
        points: [
          "Beri sinyal sebelum transisi: 'Setelah lagu ini selesai, kita ke karpet.'",
          "Jadikan perpindahan permainan: berjalan seperti semut, terbang seperti kupu-kupu.",
          "Anak yang sudah siap diberi peran, bukan dibiarkan menunggu kosong.",
        ],
      },
    ],
  },
  {
    level: 3,
    order: 2,
    slug: "manajemen-kelas-positif",
    title: "Manajemen Kelas yang Positif",
    description: "Menjaga kelas kondusif tanpa berteriak, mengancam, atau menghukum.",
    sections: [
      {
        heading: "Cegah sebelum terjadi",
        body: "Sebagian besar 'masalah perilaku' sebenarnya masalah desain kegiatan: menunggu terlalu lama, instruksi tidak jelas, kegiatan terlalu sulit atau terlalu mudah. Kelas yang sibuk bermakna jarang bermasalah.",
        points: [
          "Minimalkan waktu menunggu — antrean panjang adalah undangan keributan.",
          "Instruksi maksimal 1-2 langkah untuk anak kecil, contohkan sambil bicara.",
          "Aturan kelas sedikit, positif, dan dibuat bersama anak.",
        ],
      },
      {
        heading: "Penarik perhatian",
        body: "Guru PAUD tidak berteriak minta diam. Guru punya repertoar penarik perhatian yang anak kenal dan sukai: tepuk pola, lagu pendek, gerakan beku, bisikan.",
        points: [
          "Latih penarik perhatian saat kelas tenang, agar berfungsi saat riuh.",
          "Bisikan sering lebih ampuh daripada teriakan.",
          "Turunkan energi bertahap: gerakan cepat → pelan → hening.",
        ],
      },
      {
        heading: "Saat perilaku menantang muncul",
        body: "Anak yang 'mengganggu' hampir selalu sedang mengomunikasikan kebutuhan: bosan, lelah, butuh perhatian, atau belum punya kata untuk perasaannya. Tugas guru membaca kebutuhan itu, bukan menaklukkan anaknya.",
        points: [
          "Dekati secara pribadi, jangan tegur dari jauh di depan semua anak.",
          "Akui perasaan, batasi perilaku: 'Kamu boleh kesal, tapi memukul tidak boleh.'",
          "Beri peran positif pada anak yang paling aktif — energi butuh saluran.",
        ],
      },
    ],
  },
  // Level 4 — Menghadapi Situasi
  {
    level: 4,
    order: 1,
    slug: "menghadapi-tangis-dan-konflik",
    title: "Menghadapi Tangisan dan Konflik Anak",
    description: "Merespons tangisan, rebutan, dan konflik antaranak dengan tenang dan mendidik.",
    sections: [
      {
        heading: "Tangisan bukan musuh",
        body: "Menangis adalah cara komunikasi paling awal anak. Tujuan guru bukan menghentikan tangisan secepat mungkin, tetapi membantu anak merasa aman sampai bisa tenang sendiri. Anak yang selalu disuruh diam belajar menyembunyikan perasaan, bukan mengelolanya.",
        points: [
          "Sejajarkan tubuh, suara tenang: 'Ibu di sini. Kamu aman.'",
          "Beri nama perasaan: 'Kamu sedih ya karena Bunda pulang.'",
          "Setelah tenang baru bicara — anak yang sedang menangis tidak bisa mendengar nasihat.",
        ],
      },
      {
        heading: "Rebutan sebagai momen belajar",
        body: "Dua anak berebut mainan bukanlah gangguan pembelajaran — itu justru momen belajar sosial terbaik. Anak sedang berlatih konsep milik, giliran, dan negosiasi.",
        points: [
          "Amankan dulu (pisahkan mainannya, bukan anaknya), lalu dengarkan dua sisi.",
          "Bantu anak bicara satu sama lain, bukan hanya kepada guru.",
          "Tawarkan alat bantu konkret: jam pasir untuk giliran, papan antrean.",
        ],
      },
      {
        heading: "Kapan guru turun tangan",
        body: "Tidak semua konflik butuh intervensi. Konflik kecil yang anak selesaikan sendiri lebih berharga daripada yang diselesaikan guru. Guru turun tangan penuh saat ada risiko fisik atau ketimpangan kekuatan.",
        points: [
          "Ada kontak fisik menyakiti → pisahkan segera, tenangkan, baru proses.",
          "Konflik verbal seimbang → amati dari dekat, beri kesempatan dulu.",
          "Pola berulang menindas satu anak → tangani serius, libatkan orang tua sesuai prosedur.",
        ],
      },
    ],
  },
  {
    level: 4,
    order: 2,
    slug: "anak-yang-menolak-dan-kelas-riuh",
    title: "Anak yang Menolak Ikut dan Kelas Riuh",
    description: "Strategi untuk anak yang menarik diri dan kelas yang energinya meledak.",
    sections: [
      {
        heading: "Anak yang tidak mau ikut",
        body: "Memaksa anak ikut kegiatan hampir selalu memperburuk keadaan. Anak punya alasan: takut gagal, tidak nyaman dengan keramaian, lelah, atau sekadar butuh waktu mengamati. Mengamati dari pinggir juga bentuk partisipasi.",
        points: [
          "Sediakan 'kursi penonton' — anak boleh melihat dulu sampai siap.",
          "Tawarkan peran kecil tanpa sorotan: memegang keranjang, membagikan alat.",
          "Rayakan keterlibatan kecil secara privat, jangan diumumkan ke kelas.",
        ],
      },
      {
        heading: "Kelas yang riuh",
        body: "Kelas riuh adalah data, bukan dosa. Tanyakan: apakah kegiatan terlalu lama? Terlalu pasif? Apakah anak butuh gerak? Jawaban paling efektif biasanya mengubah kegiatan, bukan menambah volume suara guru.",
        points: [
          "Selipkan jeda gerak 1-2 menit, lalu kembali dengan energi turun bertahap.",
          "Jangan menghukum seluruh kelas karena beberapa anak.",
          "Catat pola: jam berapa, kegiatan apa, siapa — untuk perbaikan desain.",
        ],
      },
    ],
  },
  // Level 5 — Observasi
  {
    level: 5,
    order: 1,
    slug: "apa-dan-bagaimana-mengamati",
    title: "Apa dan Bagaimana Mengamati Anak",
    description: "Dasar observasi: melihat fakta perilaku, bukan menilai anak.",
    sections: [
      {
        heading: "Observasi adalah memotret, bukan menghakimi",
        body: "Catatan observasi yang baik berisi fakta yang bisa dilihat dan didengar: apa yang anak lakukan dan katakan. Bukan kesimpulan tentang sifat anak. 'Rara menyusun 5 balok lalu menghitungnya satu-satu' adalah observasi. 'Rara anak yang pintar' adalah penilaian.",
        points: [
          "Tulis perilaku spesifik + konteks: kapan, sedang apa, dengan siapa.",
          "Hindari kata sifat menilai: pintar, malas, nakal, lambat.",
          "Satu catatan pendek yang faktual lebih berharga daripada paragraf opini.",
        ],
      },
      {
        heading: "Kapan dan apa yang diamati",
        body: "Guru tidak bisa mengamati semua anak setiap saat — dan tidak perlu. Observasi efektif itu terencana: hari ini fokus 3-4 anak, atau fokus satu aspek (misal interaksi sosial saat bermain bebas).",
        points: [
          "Momen kaya observasi: bermain bebas, transisi, dan saat anak menghadapi kesulitan.",
          "Amati juga apa yang SUDAH BISA dilakukan anak, bukan hanya yang belum.",
          "Foto/karya anak bisa melengkapi catatan — dengan izin dan disimpan privat.",
        ],
      },
      {
        heading: "Interpretasi yang hati-hati",
        body: "Satu kejadian bukan pola. Anak yang diam hari ini mungkin hanya mengantuk. Guru mengamati berulang sebelum menyimpulkan, dan kesimpulannya pun tetap hipotesis kerja — bukan diagnosis. Diagnosis adalah wewenang profesional, bukan guru.",
        points: [
          "Gunakan frasa: 'terlihat pada beberapa catatan', 'perlu diamati lebih lanjut'.",
          "Jangan pernah menyampaikan dugaan diagnosis kepada orang tua.",
          "Bila ada kekhawatiran konsisten, sarankan orang tua berkonsultasi dengan ahli — dengan bahasa yang tidak menakutkan.",
        ],
      },
    ],
  },
  {
    level: 5,
    order: 2,
    slug: "mencatat-dan-menindaklanjuti-observasi",
    title: "Mencatat dan Menindaklanjuti Observasi",
    description: "Dari catatan tercecer menjadi siklus: amati → catat → rencanakan → amati lagi.",
    sections: [
      {
        heading: "Sistem catatan yang realistis",
        body: "Sistem pencatatan terbaik adalah yang benar-benar dipakai. Catatan super lengkap yang membebani guru akan ditinggalkan dalam dua minggu. Mulai dari yang kecil: satu-dua kalimat per anak per minggu sudah bermakna bila konsisten.",
        points: [
          "Catat segera dalam bentuk singkat, rapikan nanti.",
          "Gunakan format tetap: nama, tanggal, konteks, perilaku, (opsional) tindak lanjut.",
          "Data anak bersifat privat — simpan aman, jangan bagikan sembarangan.",
        ],
      },
      {
        heading: "Observasi menggerakkan pembelajaran",
        body: "Observasi baru bermakna saat mengubah apa yang guru lakukan besok. Ini inti asesmen formatif: bukan menilai anak di akhir, tetapi menyesuaikan pembelajaran di tengah jalan.",
        points: [
          "Dari catatan 'Bima selalu memilih balok' → hadirkan literasi lewat balok.",
          "Dari 'Sari belum nyaman kelompok besar' → mulai dari pasangan berdua.",
          "Tinjau catatan mingguan: pola apa yang muncul? apa rencana pekan depan?",
        ],
      },
    ],
  },
  // Level 6 — Microteaching
  {
    level: 6,
    order: 1,
    slug: "merencanakan-microteaching",
    title: "Merencanakan Microteaching",
    description: "Menyusun rencana mengajar singkat yang matang: tujuan, alur, media, dan antisipasi.",
    sections: [
      {
        heading: "Anatomi rencana yang kuat",
        body: "Microteaching adalah simulasi mengajar singkat (10-20 menit). Karena waktunya pendek, setiap menit harus dirancang. Rencana yang kuat menjawab: apa tujuannya, bagaimana anak dilibatkan dari menit pertama, apa yang DILAKUKAN anak (bukan hanya guru), dan bagaimana menutupnya.",
        points: [
          "Pembukaan menarik ≤ 2 menit — langsung ke pengalaman, bukan ceramah.",
          "Kegiatan inti: anak aktif minimal 70% waktu.",
          "Penutup: refleksi singkat bersama anak, bukan sekadar 'selesai ya'.",
        ],
      },
      {
        heading: "Antisipasi adalah setengah keberhasilan",
        body: "Pengajar pemula gugup karena hal tak terduga. Padahal sebagian besar bisa diantisipasi: bagaimana jika anak selesai cepat? Jika alat kurang? Jika ada yang tidak mau ikut? Tuliskan rencana B sebelum tampil.",
        points: [
          "Siapkan satu kegiatan tambahan dan satu penyederhanaan.",
          "Latih kalimat instruksi — ucapkan keras-keras sebelum tampil.",
          "Cek media: cukup untuk semua? bisa dilihat dari belakang?",
        ],
      },
    ],
  },
  {
    level: 6,
    order: 2,
    slug: "tampil-dan-refleksi-microteaching",
    title: "Tampil, Menerima Feedback, dan Refleksi",
    description: "Membawakan microteaching dengan percaya diri dan tumbuh dari umpan balik.",
    sections: [
      {
        heading: "Saat tampil",
        body: "Gugup itu normal — bahkan guru berpengalaman merasakannya. Yang membedakan adalah persiapan dan fokus. Alihkan fokus dari 'bagaimana penampilanku' ke 'apakah anak-anak terlibat'. Perhatianmu pada anak akan menenangkan dirimu sendiri.",
        points: [
          "Kontak mata menyapu semua anak, bukan hanya satu sisi.",
          "Suara bervariasi; diam sejenak lebih kuat daripada bicara terus.",
          "Bila ada langkah terlewat, lanjutkan saja — anak tidak memegang rencanamu.",
        ],
      },
      {
        heading: "Menerima feedback dengan terbuka",
        body: "Feedback adalah hadiah untuk versi dirimu yang berikutnya, bukan penilaian atas harga dirimu. Pengajar yang berkembang paling cepat adalah yang paling lapar akan masukan spesifik.",
        points: [
          "Dengarkan penuh dulu, jangan buru-buru membela diri.",
          "Minta contoh konkret: 'Di bagian mana instruksiku membingungkan?'",
          "Pilih 1-2 hal untuk diperbaiki di penampilan berikutnya — jangan semua sekaligus.",
        ],
      },
      {
        heading: "Refleksi yang mengubah praktik",
        body: "Refleksi bukan menyalahkan diri. Refleksi adalah menganalisis: apa yang berjalan, apa yang tidak, dan apa hipotesisku tentang penyebabnya. Tuliskan — refleksi yang ditulis bertahan, yang hanya dipikirkan menguap.",
        points: [
          "Tiga pertanyaan: Apa yang paling berhasil? Apa yang akan kuubah? Apa yang kupelajari tentang anak?",
          "Bandingkan rencana dengan kenyataan: di mana melesetnya, mengapa?",
          "Simpan semua refleksi — portofoliomu adalah bukti pertumbuhanmu.",
        ],
      },
    ],
  },
];
