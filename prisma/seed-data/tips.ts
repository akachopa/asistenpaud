import type { TipSeed } from "./types";

export const tips: TipSeed[] = [
  // ===== Adaptasi sekolah (4) =====
  {
    slug: "adaptasi-hari-pertama-menempel-orang-tua",
    title: "Anak baru tidak mau lepas dari orang tua di hari pertama",
    category: "Adaptasi sekolah",
    situation:
      "Hari pertama masuk sekolah, seorang anak menempel erat pada orang tuanya di depan pintu kelas dan menolak masuk meski teman-temannya sudah mulai bermain.",
    actions: [
      "Sapa anak setinggi matanya dengan senyum, tanpa langsung menariknya masuk.",
      "Ajak orang tua ikut masuk sebentar dan duduk di area yang disepakati, lalu kurangi jaraknya perlahan.",
      "Tawarkan satu aktivitas menarik yang bisa dilihat dari dekat orang tua, misalnya balok atau playdough.",
      "Sepakati ritual perpisahan singkat dengan orang tua, misalnya pelukan dan lambaian dari jendela.",
      "Beri anak peran kecil, misalnya membawa keranjang mainan, agar merasa dibutuhkan.",
    ],
    exampleScripts: [
      "Selamat pagi, Sari. Ibu guru senang sekali Sari datang hari ini. Mau lihat balok warna-warni di sana?",
      "Bunda boleh duduk di kursi itu dulu ya. Sari main di dekat Bunda, tidak apa-apa.",
      "Nanti kalau jarum panjang di angka enam, Bunda datang lagi menjemput Sari.",
    ],
    avoid: [
      "Menarik anak paksa dari pelukan orang tua.",
      "Menyuruh orang tua pergi diam-diam tanpa pamit pada anak.",
      "Membandingkan dengan anak lain yang sudah berani, misalnya 'Lihat, temanmu saja tidak menangis.'",
    ],
    escalation:
      "Jika setelah 3-4 minggu anak masih menolak berpisah dengan tangisan hebat setiap hari, ajak orang tua berdiskusi untuk menyusun rencana adaptasi bertahap bersama kepala sekolah, misalnya durasi sekolah yang diperpendek dulu.",
  },
  {
    slug: "adaptasi-anak-diam-di-pojok-minggu-pertama",
    title: "Anak baru hanya diam mengamati di pojok kelas",
    category: "Adaptasi sekolah",
    situation:
      "Sudah beberapa hari sekolah, seorang anak baru memilih duduk di pojok dan hanya mengamati teman-temannya bermain tanpa ikut serta.",
    actions: [
      "Biarkan anak mengamati dulu; mengamati adalah cara wajar anak mengenal lingkungan baru.",
      "Duduk di dekatnya sesekali dan bermain sendiri dengan mainan menarik tanpa memaksanya ikut.",
      "Narasikan apa yang terjadi di kelas dengan suara santai agar anak merasa dilibatkan.",
      "Tawarkan aktivitas berdua dengan guru sebelum mengajaknya bergabung dengan kelompok kecil.",
    ],
    exampleScripts: [
      "Ibu guru mau menyusun balok di sini. Kalau Bima mau ikut, boleh sekali.",
      "Bima sedang melihat teman-teman main pasir ya. Seru ya kelihatannya.",
      "Mau pegang boneka kucing ini? Dia juga baru pertama kali ke sekolah, sama seperti Bima.",
    ],
    avoid: [
      "Memaksa anak bergabung dengan berkata 'Ayo jangan diam saja!'",
      "Melabeli anak sebagai penyendiri di depan teman atau orang tua.",
      "Terus-menerus menyorot anak di depan kelas sehingga ia merasa diawasi.",
    ],
    escalation:
      "Jika setelah lebih dari sebulan anak sama sekali belum mau berinteraksi dengan guru maupun teman, diskusikan pengamatan Anda dengan orang tua dan kepala sekolah untuk menyepakati langkah pendampingan berikutnya.",
  },
  {
    slug: "adaptasi-anak-menangis-tiap-pagi-minggu-kedua",
    title: "Anak masih menangis setiap pagi di minggu kedua",
    category: "Adaptasi sekolah",
    situation:
      "Memasuki minggu kedua, seorang anak masih menangis setiap kali diantar, meskipun biasanya tenang kembali setelah 15-20 menit.",
    actions: [
      "Sambut anak dengan ritual yang sama setiap pagi agar ia merasa aman dengan rutinitas.",
      "Validasi perasaannya dulu sebelum mengalihkan ke aktivitas.",
      "Siapkan 'tugas pagi' khusus untuknya, misalnya memberi makan ikan atau menyiram tanaman kelas.",
      "Beri tahu orang tua bahwa tangisan mereda setelah mereka pergi, agar orang tua tenang dan konsisten.",
      "Catat pola: jam berapa tangis mereda dan aktivitas apa yang paling membantunya tenang.",
    ],
    exampleScripts: [
      "Raka sedih ya berpisah dengan Ayah. Tidak apa-apa, Ibu guru temani di sini.",
      "Yuk, ikan di akuarium sudah menunggu Raka. Hari ini Raka petugas pemberi makan ikan.",
      "Ayah selalu kembali menjemput Raka, sama seperti kemarin dan kemarinnya lagi.",
    ],
    avoid: [
      "Mengatakan 'Sudah besar kok masih nangis.'",
      "Mengancam, misalnya 'Kalau nangis terus nanti tidak boleh main.'",
      "Menganggap tangisan sebagai kenakalan yang harus dihentikan seketika.",
    ],
    escalation:
      "Jika tangisan justru makin lama dan makin intens setelah beberapa minggu, atau anak menolak makan dan bermain sepanjang hari, ajak orang tua berdiskusi tentang kondisi anak di rumah dan pertimbangkan bersama sekolah apakah perlu penyesuaian jadwal adaptasi.",
  },
  {
    slug: "adaptasi-kembali-setelah-libur-panjang",
    title: "Anak-anak sulit kembali ke rutinitas setelah libur panjang",
    category: "Adaptasi sekolah",
    situation:
      "Setelah libur panjang, banyak anak kembali rewel saat diantar, lupa rutinitas kelas, dan sulit mengikuti kegiatan seperti biasanya.",
    actions: [
      "Perlakukan minggu pertama setelah libur seperti masa adaptasi mini: turunkan target kegiatan.",
      "Ulangi pengenalan rutinitas dengan lagu dan gambar jadwal harian.",
      "Beri waktu bermain bebas lebih banyak di hari-hari awal agar anak menyambung kembali pertemanan.",
      "Ajak anak bercerita tentang pengalaman liburan sebagai jembatan masuk kegiatan.",
    ],
    exampleScripts: [
      "Wah, teman-teman sudah kembali! Ibu guru kangen sekali. Siapa yang mau cerita liburannya?",
      "Yuk kita ingat lagi, setelah main kita apa ya? Betul, membereskan mainan sambil menyanyi.",
    ],
    avoid: [
      "Langsung menuntut anak tertib penuh di hari pertama masuk.",
      "Memarahi anak yang lupa aturan kelas.",
      "Menjejalkan banyak kegiatan baru sekaligus di minggu pertama.",
    ],
    escalation:
      "Jika ada anak tertentu yang setelah dua minggu masih sangat sulit mengikuti rutinitas dibanding sebelumnya, ajak orang tua berbincang tentang perubahan yang terjadi selama libur, misalnya pindah rumah atau anggota keluarga baru.",
  },

  // ===== Anak menangis (4) =====
  {
    slug: "menangis-tanpa-sebab-jelas",
    title: "Anak menangis tanpa sebab yang terlihat",
    category: "Anak menangis",
    situation:
      "Di tengah kegiatan, seorang anak tiba-tiba menangis tanpa ada kejadian yang terlihat jelas, dan tidak menjawab saat ditanya kenapa.",
    actions: [
      "Dekati anak, turunkan badan setinggi matanya, dan tawarkan kehadiran tanpa banyak pertanyaan.",
      "Beri pilihan sederhana untuk menenangkan diri: dipeluk, duduk di pojok tenang, atau minum air.",
      "Setelah tenang, bantu anak menamai perasaannya dengan bahasa sederhana.",
      "Periksa kebutuhan dasar: lapar, mengantuk, ingin ke toilet, atau badan tidak nyaman.",
      "Amati apa yang terjadi sebelum tangisan untuk menemukan pemicunya di lain waktu.",
    ],
    exampleScripts: [
      "Ibu guru di sini menemani Nia. Kalau sudah siap, Nia boleh cerita.",
      "Nia mau duduk di pojok bantal dulu atau dipeluk Ibu guru?",
      "Tadi Nia sedih ya. Sekarang badannya sudah lebih tenang?",
    ],
    avoid: [
      "Memberondong dengan pertanyaan 'Kenapa? Kenapa nangis? Ayo bilang!'",
      "Menyuruh diam dengan nada tinggi.",
      "Mengabaikan tangisan karena dianggap cari perhatian.",
    ],
    escalation:
      "Jika tangisan tanpa sebab terjadi berulang setiap hari atau disertai keluhan sakit, sampaikan pengamatan Anda kepada orang tua dan sarankan memeriksakan kesehatan anak.",
  },
  {
    slug: "menangis-karena-hasil-karya-rusak",
    title: "Anak menangis karena hasil karyanya rusak",
    category: "Anak menangis",
    situation:
      "Menara balok yang susah payah dibangun seorang anak roboh tersenggol temannya, dan ia menangis kencang sambil menolak melanjutkan bermain.",
    actions: [
      "Akui kekecewaannya terlebih dahulu; jangan buru-buru menyuruhnya membangun ulang.",
      "Ceritakan kembali kejadian secara netral agar anak tahu itu tidak disengaja.",
      "Tawarkan bantuan membangun kembali bersama-sama, termasuk mengajak teman yang menyenggol.",
      "Setelah tenang, tunjukkan bahwa membangun ulang bisa jadi kesempatan membuat yang lebih kokoh.",
    ],
    exampleScripts: [
      "Menara Dika roboh, padahal sudah tinggi sekali. Pasti kecewa ya.",
      "Tadi Salsa lewat dan tidak sengaja tersenggol. Salsa, yuk kita bantu Dika membangun lagi.",
      "Kali ini kita buat bagian bawahnya lebih lebar yuk, supaya lebih kuat.",
    ],
    avoid: [
      "Meremehkan dengan berkata 'Cuma balok, kan bisa bikin lagi.'",
      "Memarahi anak yang tidak sengaja menyenggol di depan semua anak.",
      "Membangun ulang sendirian untuk anak tanpa melibatkannya.",
    ],
    escalation:
      "Jika anak sangat sering meledak hebat setiap kali hasil karyanya tidak sempurna hingga mengganggu kesehariannya, diskusikan dengan orang tua pola yang sama di rumah dan sepakati cara pendampingan yang konsisten.",
  },
  {
    slug: "menangis-menular-beberapa-anak",
    title: "Satu anak menangis, anak lain ikut menangis",
    category: "Anak menangis",
    situation:
      "Seorang anak menangis kencang, lalu dua-tiga anak lain di dekatnya ikut menangis sehingga suasana kelas menjadi riuh.",
    actions: [
      "Tetap tenang; nada suara guru yang stabil adalah jangkar bagi seluruh kelas.",
      "Dampingi anak pertama yang menangis, sambil minta rekan guru atau ajak anak lain ke aktivitas menenangkan.",
      "Gunakan pengalih yang lembut untuk kelompok: lagu pelan, tepuk tenang, atau bisik-bisik cerita.",
      "Setelah reda, beri penjelasan singkat agar anak-anak paham temannya sudah baik-baik saja.",
    ],
    exampleScripts: [
      "Teman-teman, Ibu guru sedang menemani Rara. Rara sebentar lagi tenang. Yuk kita duduk melingkar sambil tepuk pelan.",
      "Rara sudah tersenyum lagi, teman-teman. Terima kasih sudah menunggu dengan tenang.",
    ],
    avoid: [
      "Panik atau meninggikan suara sehingga anak makin cemas.",
      "Memarahi anak-anak yang ikut menangis.",
      "Meninggalkan seluruh kelas demi satu anak tanpa mengatur kelompok terlebih dahulu.",
    ],
    escalation:
      "Jika tangis massal sering terjadi di jam yang sama, tinjau jadwal bersama kepala sekolah; bisa jadi anak-anak kelelahan atau lapar dan jadwal perlu disesuaikan.",
  },
  {
    slug: "menangis-menjelang-dijemput",
    title: "Anak menangis menjelang waktu penjemputan",
    category: "Anak menangis",
    situation:
      "Menjelang jam pulang, seorang anak mulai gelisah dan menangis karena orang tuanya belum terlihat, sementara teman-temannya satu per satu dijemput.",
    actions: [
      "Dekati anak sebelum kecemasannya memuncak, ajak duduk di dekat guru.",
      "Beri informasi yang jujur dan menenangkan tentang penjemputan.",
      "Libatkan anak dalam aktivitas ringan bermakna sambil menunggu, misalnya membantu merapikan buku.",
      "Hubungi orang tua untuk memastikan perkiraan waktu jemput, dan sampaikan ke anak dengan bahasa sederhana.",
    ],
    exampleScripts: [
      "Bunda Alif sedang dalam perjalanan. Alif menunggu di sini bersama Ibu guru ya.",
      "Sambil menunggu, mau bantu Ibu guru menyusun buku cerita di rak? Alif pilih buku untuk dibaca bersama yuk.",
    ],
    avoid: [
      "Berbohong dengan berkata 'Sebentar lagi datang' padahal tidak tahu kepastiannya.",
      "Membiarkan anak menunggu sendirian di dekat pintu.",
      "Menunjukkan kekesalan pada anak karena orang tuanya terlambat.",
    ],
    escalation:
      "Jika keterlambatan penjemputan terjadi berulang kali, sampaikan kepada kepala sekolah agar ada pembicaraan resmi dengan orang tua tentang jadwal jemput dan dampaknya pada anak.",
  },

  // ===== Anak berebut (4) =====
  {
    slug: "berebut-mainan-favorit",
    title: "Dua anak berebut mainan yang sama",
    category: "Anak berebut",
    situation:
      "Dua anak saling menarik satu mobil-mobilan, keduanya berteriak 'punyaku!' dan hampir saling dorong.",
    actions: [
      "Datangi segera dan pegang mainan dengan tenang agar tarik-menarik berhenti tanpa merebutnya kasar.",
      "Sebutkan apa yang Anda lihat secara netral, tanpa menuduh siapa yang salah.",
      "Beri kesempatan kedua anak berbicara bergantian.",
      "Ajak anak mencari jalan keluar: bergiliran dengan penanda waktu, bermain bersama, atau memilih mainan serupa.",
      "Hargai usaha mereka saat berhasil menemukan kesepakatan.",
    ],
    exampleScripts: [
      "Ibu guru lihat Yoga dan Rafi sama-sama ingin mobil biru ini. Mobilnya Ibu pegang dulu ya.",
      "Yoga dulu yang cerita, lalu giliran Rafi. Ibu guru dengarkan dua-duanya.",
      "Bagaimana kalau bergiliran? Saat pasir di jam pasir habis, gantian ya.",
    ],
    avoid: [
      "Langsung menghukum atau menyita mainan sambil marah.",
      "Memutuskan siapa yang salah tanpa mendengar kedua anak.",
      "Selalu meminta anak yang lebih besar untuk mengalah.",
    ],
    escalation:
      "Jika perebutan selalu berujung pada kekerasan fisik seperti memukul atau menggigit meski sudah didampingi berulang kali, catat kejadiannya dan diskusikan strategi bersama kepala sekolah dan orang tua kedua anak.",
  },
  {
    slug: "berebut-giliran-di-permainan",
    title: "Anak-anak berebut giliran main perosotan",
    category: "Anak berebut",
    situation:
      "Saat bermain di halaman, beberapa anak saling mendahului dan mendorong di tangga perosotan karena tidak sabar menunggu giliran.",
    actions: [
      "Hentikan permainan sebentar demi keamanan, bukan sebagai hukuman.",
      "Ajak anak menyepakati aturan antre yang terlihat jelas, misalnya berdiri di pijakan bergambar.",
      "Jadikan antrean menyenangkan dengan lagu atau hitungan bersama.",
      "Posisikan guru di titik rawan (tangga) untuk mengingatkan dengan kalimat positif.",
      "Puji perilaku antre yang baik secara spesifik.",
    ],
    exampleScripts: [
      "Berhenti sebentar, teman-teman. Perosotan menunggu kita antre dulu supaya semua aman.",
      "Satu anak di tangga, satu anak meluncur. Kita nyanyikan lagu antre yuk sambil menunggu.",
      "Ibu guru lihat Sinta menunggu gilirannya dengan sabar. Terima kasih, Sinta.",
    ],
    avoid: [
      "Meniadakan permainan untuk semua anak karena ulah satu-dua anak.",
      "Berteriak dari jauh tanpa mendekat.",
      "Mendorong anak agar cepat naik karena antrean panjang.",
    ],
    escalation:
      "Jika ada anak yang berulang kali mendorong hingga temannya jatuh meski sudah didampingi, dampingi anak itu secara khusus saat bermain alat dan komunikasikan pola ini kepada orang tuanya.",
  },
  {
    slug: "berebut-tempat-duduk-dekat-guru",
    title: "Anak berebut duduk paling dekat dengan guru",
    category: "Anak berebut",
    situation:
      "Setiap kali kegiatan lingkaran atau membaca cerita, beberapa anak berebut dan saling menyerobot agar bisa duduk tepat di samping guru.",
    actions: [
      "Akui bahwa keinginan dekat dengan guru adalah hal yang wajar dan menyenangkan.",
      "Buat sistem giliran yang adil dan terlihat, misalnya kartu nama 'sahabat duduk hari ini'.",
      "Pastikan semua anak mendapat momen dekat dengan guru di kesempatan lain, misalnya saat bermain bebas.",
      "Atur posisi duduk melingkar sehingga semua anak merasa sama dekatnya.",
    ],
    exampleScripts: [
      "Semua anak sayang Ibu guru, dan Ibu guru sayang semua. Hari ini giliran Bayu duduk di samping Ibu, besok giliran yang lain.",
      "Kita duduk melingkar ya, supaya Ibu guru bisa melihat wajah semua anak.",
    ],
    avoid: [
      "Selalu membiarkan anak yang paling cepat atau paling kuat yang menang.",
      "Memiliki 'anak favorit' yang selalu duduk di dekat guru.",
      "Menyindir anak yang berebut dengan sebutan manja.",
    ],
    escalation:
      "Jika ada anak yang sangat bergantung pada kedekatan fisik dengan guru sampai tidak bisa mengikuti kegiatan tanpa menempel, diskusikan dengan orang tua tentang kebutuhan rasa aman anak dan sepakati pendampingan bertahap.",
  },
  {
    slug: "berebut-peran-dalam-main-peran",
    title: "Anak berebut peran yang sama saat main peran",
    category: "Anak berebut",
    situation:
      "Saat bermain peran dokter-dokteran, tiga anak sama-sama ingin menjadi dokter dan tidak ada yang mau menjadi pasien atau perawat.",
    actions: [
      "Hargai keinginan mereka dan jelaskan bahwa semua peran akan bergiliran.",
      "Perkaya skenario: tunjukkan bahwa peran lain juga seru dan penting.",
      "Gunakan cara adil yang disepakati anak untuk menentukan giliran pertama, misalnya hompimpa.",
      "Beri penanda giliran yang jelas, misalnya setelah dua pasien diperiksa, dokter berganti.",
    ],
    exampleScripts: [
      "Wah, tiga dokter hebat! Rumah sakit kita juga butuh perawat yang menyuntik dan apoteker yang meracik obat, lho.",
      "Kita hompimpa yuk untuk giliran pertama. Semua pasti kebagian jadi dokter.",
    ],
    avoid: [
      "Menunjuk langsung anak favorit untuk peran utama.",
      "Membatalkan permainan karena anak berebut.",
      "Memaksa anak menerima peran yang tidak ia mau tanpa dialog.",
    ],
    escalation:
      "Jika satu anak selalu memaksa menjadi tokoh utama dan mengamuk hebat setiap kali harus bergiliran, dampingi ia secara khusus dalam permainan kelompok dan bicarakan polanya dengan orang tua secara empatik.",
  },

  // ===== Anak tidak fokus (4) =====
  {
    slug: "tidak-fokus-saat-kegiatan-lingkaran",
    title: "Anak tidak bisa duduk tenang saat kegiatan lingkaran",
    category: "Anak tidak fokus",
    situation:
      "Saat kegiatan lingkaran pagi, seorang anak terus berguling-guling, menyenggol teman, dan tidak mengikuti lagu maupun percakapan.",
    actions: [
      "Periksa dulu durasi kegiatan; rentang duduk anak usia dini memang pendek, sekitar 1 menit per tahun usia.",
      "Beri anak posisi strategis di dekat guru dengan alas duduk yang jelas batasnya.",
      "Selipkan gerakan aktif di tengah kegiatan lingkaran: tepuk, goyang badan, berdiri-duduk.",
      "Beri anak 'benda kesibukan' yang bisa diremas jika ia butuh menggerakkan tangan.",
      "Beri tugas bergerak yang sah, misalnya membagikan kartu nama teman.",
    ],
    exampleScripts: [
      "Andi duduk di bantal bintang dekat Ibu guru ya, supaya bisa dengar cerita paling jelas.",
      "Sebelum lanjut, kita goyang-goyang dulu! Berdiri, lompat dua kali, lalu duduk pelan-pelan.",
      "Andi, bantu Ibu bagikan kartu ke teman-teman yuk.",
    ],
    avoid: [
      "Menghukum anak berdiri di depan kelas karena tidak bisa duduk diam.",
      "Melabeli anak dengan sebutan seperti 'anak nakal' atau menyebut nama gangguan tertentu.",
      "Memperpanjang kegiatan duduk melebihi kemampuan usia anak.",
    ],
    escalation:
      "Jika anak secara konsisten jauh lebih sulit fokus dibanding teman seusianya di berbagai jenis kegiatan selama beberapa bulan, catat pengamatan konkret Anda dan sampaikan kepada orang tua agar mereka dapat berkonsultasi dengan tenaga profesional tumbuh kembang.",
  },
  {
    slug: "tidak-fokus-mudah-teralih-suara",
    title: "Anak mudah teralih setiap ada suara dari luar",
    category: "Anak tidak fokus",
    situation:
      "Setiap ada suara motor, penjual lewat, atau kelas sebelah bernyanyi, seorang anak langsung meninggalkan kegiatannya dan berlari ke jendela.",
    actions: [
      "Atur posisi anak membelakangi jendela atau sumber suara saat kegiatan yang butuh konsentrasi.",
      "Akui rasa ingin tahunya, lalu ajak kembali dengan jembatan yang menarik.",
      "Jadikan suara sebagai bagian belajar sesekali, misalnya menebak sumber bunyi bersama-sama.",
      "Kurangi gangguan visual dan bunyi di area kegiatan inti bila memungkinkan.",
    ],
    exampleScripts: [
      "Kiki dengar suara motor ya? Telinganya hebat! Sekarang yuk kita dengarkan cerita, ada suara harimau lho di halaman berikutnya.",
      "Nanti waktu main bebas kita boleh lihat ke jendela sama-sama. Sekarang giliran menyelesaikan puzzle dulu.",
    ],
    avoid: [
      "Membentak anak agar kembali duduk.",
      "Menutup semua akses anak pada lingkungan sekitar secara kaku.",
      "Mempermalukannya dengan berkata 'Dasar tidak bisa diam.'",
    ],
    escalation:
      "Jika anak tampak sangat terganggu oleh suara sampai menutup telinga, menangis, atau panik berulang kali, sampaikan pengamatan spesifik ini kepada orang tua dan sarankan berkonsultasi ke tenaga kesehatan anak, tanpa menyimpulkan sendiri penyebabnya.",
  },
  {
    slug: "tidak-fokus-tidak-menyelesaikan-kegiatan",
    title: "Anak berpindah-pindah kegiatan tanpa menyelesaikan",
    category: "Anak tidak fokus",
    situation:
      "Seorang anak berpindah dari satu meja kegiatan ke meja lain setiap dua-tiga menit tanpa menyelesaikan satu pun pekerjaannya.",
    actions: [
      "Amati dulu: apakah kegiatannya terlalu sulit, terlalu mudah, atau kurang menarik baginya.",
      "Pecah kegiatan menjadi langkah kecil dan rayakan tiap langkah selesai.",
      "Temani anak memulai, lalu mundur perlahan saat ia mulai terlibat.",
      "Beri pilihan terbatas agar anak merasa memegang kendali: dua kegiatan, ia yang memilih.",
      "Gunakan penanda selesai yang konkret, misalnya 'tempel tiga kertas lalu boleh pindah'.",
    ],
    exampleScripts: [
      "Dini mau menyelesaikan yang mana dulu: mewarnai ikan atau menempel sisiknya?",
      "Tinggal satu bagian lagi, hampir selesai! Setelah itu Dini boleh pilih meja lain.",
    ],
    avoid: [
      "Memaksa anak duduk berlama-lama di kegiatan yang jelas tidak sesuai kebutuhannya.",
      "Menyelesaikan pekerjaan anak agar cepat rapi.",
      "Membandingkan dengan teman yang tekun.",
    ],
    escalation:
      "Jika setelah kegiatan disesuaikan berkali-kali anak tetap tidak pernah bisa terlibat lebih dari 1-2 menit dan ini berbeda jauh dari teman seusianya, dokumentasikan pengamatan Anda dan diskusikan dengan orang tua untuk tindak lanjut bersama pihak yang lebih ahli.",
  },
  {
    slug: "tidak-fokus-melamun-di-kelas",
    title: "Anak sering melamun dan tidak merespons panggilan",
    category: "Anak tidak fokus",
    situation:
      "Seorang anak kerap menatap kosong ke satu arah saat kegiatan, dan baru merespons setelah dipanggil beberapa kali atau disentuh pundaknya.",
    actions: [
      "Dekati dan sapa dengan sentuhan lembut di pundak alih-alih memanggil keras dari jauh.",
      "Cek kondisi fisik: cukup tidurkah ia, sudah sarapankah, sedang sakitkah.",
      "Libatkan dalam kegiatan yang melibatkan tangan dan tubuh, bukan hanya mendengarkan.",
      "Catat kapan dan berapa lama episode melamun terjadi.",
    ],
    exampleScripts: [
      "Halo Fajar, Ibu guru di sini. Yuk kita lanjutkan menara baloknya, tinggal bagian atapnya.",
      "Fajar tadi malam tidurnya nyenyak? Kalau mengantuk, boleh bilang ke Ibu guru ya.",
    ],
    avoid: [
      "Menegur keras atau menyentak anak agar 'bangun'.",
      "Menertawakan anak yang melamun di depan teman-temannya.",
      "Mengabaikan pola melamun yang sering dengan anggapan anak pemalas.",
    ],
    escalation:
      "Jika episode tatapan kosong sering terjadi, berlangsung cukup lama, atau anak tampak bingung setelahnya, segera sampaikan kepada orang tua dengan catatan waktu kejadian dan sarankan pemeriksaan ke dokter, karena kondisi fisik perlu dipastikan lebih dulu.",
  },

  // ===== Anak pemalu (4) =====
  {
    slug: "pemalu-tidak-mau-bicara-di-kelas",
    title: "Anak tidak mau berbicara saat ditanya di kelas",
    category: "Anak pemalu",
    situation:
      "Saat guru bertanya di kegiatan lingkaran, seorang anak selalu menunduk dan diam, meskipun di rumah menurut orang tuanya ia cerewet.",
    actions: [
      "Jangan memaksa jawaban di depan kelompok; beri kesempatan menjawab dengan cara lain.",
      "Sediakan pilihan respons tanpa kata: mengangguk, menunjuk gambar, atau mengangkat kartu.",
      "Bangun percakapan satu lawan satu di momen santai, misalnya saat bermain atau makan.",
      "Beri waktu tunggu lebih panjang setelah bertanya, minimal 5-10 detik tanpa desakan.",
      "Rayakan setiap bentuk partisipasi kecil tanpa berlebihan agar anak tidak jadi pusat perhatian.",
    ],
    exampleScripts: [
      "Tidak apa-apa, Nada boleh jawab dengan menunjuk gambarnya saja.",
      "Nanti kalau Nada mau cerita, Ibu guru siap mendengarkan kapan saja.",
      "Wah, Nada tadi mengangguk mantap sekali. Terima kasih sudah ikut menjawab.",
    ],
    avoid: [
      "Memaksa dengan berkata 'Ayo jawab dong, masa diam saja!'",
      "Melabeli anak sebagai pemalu di depan teman atau orang tuanya.",
      "Menjadikan anak pusat perhatian mendadak, misalnya menyuruhnya berdiri sendirian di depan kelas.",
    ],
    escalation:
      "Jika setelah satu semester anak sama sekali tidak pernah bersuara di sekolah padahal lancar berbicara di rumah, sampaikan pengamatan ini kepada orang tua dan sarankan berkonsultasi dengan profesional tumbuh kembang anak, sambil terus memberi lingkungan tanpa tekanan di kelas.",
  },
  {
    slug: "pemalu-menolak-tampil-di-acara",
    title: "Anak menolak tampil di acara sekolah",
    category: "Anak pemalu",
    situation:
      "Menjelang pentas akhir tahun, seorang anak menangis dan menolak naik panggung meskipun sudah ikut semua latihan di kelas.",
    actions: [
      "Beri pilihan peran yang bertingkat: tampil di barisan belakang, memegang properti, atau membantu di sisi panggung.",
      "Latih di tempat acara sebelum hari-H agar tempatnya terasa akrab.",
      "Sepakati sinyal aman: anak tahu ia boleh berdiri di dekat guru jika gugup.",
      "Bicarakan dengan orang tua agar tidak ada tekanan tambahan dari rumah.",
    ],
    exampleScripts: [
      "Salma boleh berdiri di sebelah Ibu guru selama menyanyi. Ibu guru pegang tangan Salma ya.",
      "Kalau Salma belum mau di panggung, Salma bisa jadi pemegang bendera di samping panggung. Itu tugas penting juga.",
    ],
    avoid: [
      "Memaksa anak naik panggung sambil menangis demi acara berjalan.",
      "Menyindir 'Yang lain berani, masa kamu tidak.'",
      "Menjanjikan hadiah besar agar anak mau tampil, yang justru menambah tekanan.",
    ],
    escalation:
      "Jika ketakutan tampil meluas menjadi menolak sekolah sama sekali menjelang acara, diskusikan dengan orang tua dan kepala sekolah agar partisipasi anak disesuaikan tanpa paksaan.",
  },
  {
    slug: "pemalu-sulit-bergabung-bermain",
    title: "Anak ingin ikut bermain tapi tidak berani bergabung",
    category: "Anak pemalu",
    situation:
      "Seorang anak berdiri lama di pinggir area bermain sambil memandangi teman-temannya, terlihat ingin ikut tetapi tidak berani mendekat.",
    actions: [
      "Jadilah jembatan: temani anak mendekat dan bantu ia masuk ke permainan dengan peran konkret.",
      "Ajarkan kalimat sederhana untuk bergabung dan latih berdua dulu.",
      "Mulai dari bermain berpasangan dengan satu teman yang ramah sebelum kelompok besar.",
      "Setelah anak bergabung, mundur perlahan dan amati dari dekat.",
    ],
    exampleScripts: [
      "Yuk kita lihat masakan di dapur-dapuran. Teman-teman, Alya bawa sayur baru untuk dimasak, boleh ikut?",
      "Kalau mau ikut main, Alya bisa bilang: 'Aku ikut main ya.' Kita coba bilang sama-sama yuk.",
    ],
    avoid: [
      "Mendorong anak masuk ke kelompok secara tiba-tiba tanpa persiapan.",
      "Membiarkannya terus menonton tanpa pendampingan berhari-hari.",
      "Mengumumkan ke kelompok 'Ini ada anak pemalu, ajak main dong.'",
    ],
    escalation:
      "Jika berbulan-bulan anak tetap tidak pernah mau bermain bersama siapa pun meski sudah dijembatani berulang kali, catat pola interaksinya dan diskusikan bersama orang tua langkah pendampingan selanjutnya.",
  },
  {
    slug: "pemalu-bersembunyi-dari-tamu",
    title: "Anak bersembunyi setiap ada orang baru di kelas",
    category: "Anak pemalu",
    situation:
      "Setiap ada tamu, guru baru, atau orang tua murid lain masuk kelas, seorang anak langsung bersembunyi di belakang rak atau di balik badan guru.",
    actions: [
      "Izinkan anak mengamati dari tempat amannya; jangan paksa bersalaman atau menyapa.",
      "Perkenalkan tamu kepada seluruh kelas secara umum sehingga tidak ada sorotan pada satu anak.",
      "Beri anak peran kecil dari jarak aman, misalnya membantu membawakan kursi untuk tamu.",
      "Bangun paparan bertahap: hari ini melihat dari jauh, lain kali melambai, suatu saat menyapa.",
    ],
    exampleScripts: [
      "Ini Pak Ardi, beliau mau melihat kita bermain hari ini. Teman-teman boleh lanjut main seperti biasa.",
      "Gilang mau melambai dari sini saja? Boleh. Melambai juga cara menyapa yang baik.",
    ],
    avoid: [
      "Menarik anak keluar dari persembunyiannya untuk dipaksa menyapa.",
      "Menertawakan atau membicarakan perilaku anak di depan tamu.",
      "Memberi cap penakut di hadapan siapa pun.",
    ],
    escalation:
      "Jika rasa takut pada orang baru begitu kuat hingga anak gemetar, muntah, atau menolak masuk kelas, bicarakan dengan orang tua secara empatik dan sarankan mencari dukungan profesional untuk membantu anak merasa aman.",
  },

  // ===== Kelas terlalu aktif (4) =====
  {
    slug: "kelas-riuh-tidak-terkendali",
    title: "Seisi kelas berteriak dan berlarian tak terkendali",
    category: "Kelas terlalu aktif",
    situation:
      "Setelah kegiatan bebas, hampir semua anak berlarian dan berteriak di dalam kelas; suara guru tenggelam dan suasana semakin riuh.",
    actions: [
      "Jangan ikut berteriak; gunakan sinyal senyap yang sudah dilatih, misalnya lampu dimatikan sebentar, lonceng kecil, atau tangan di atas kepala.",
      "Mulai aktivitas magnet dengan suara pelan: berbisik, bernyanyi lirih, atau gerakan jari misterius; anak akan mendekat karena penasaran.",
      "Turunkan energi bertahap: dari lompat, ke jalan pelan, ke duduk, ke tarik napas bersama.",
      "Setelah tenang, beri apresiasi dan lanjutkan dengan kegiatan yang lebih terstruktur.",
    ],
    exampleScripts: [
      "(sambil berbisik) Teman-teman... Ibu guru punya rahasia... yang mau dengar, duduk pelan-pelan di karpet...",
      "Kita jadi balon yuk! Tiup... menggelembung... lalu kempes perlahan... sssss... sambil duduk.",
    ],
    avoid: [
      "Berteriak lebih keras dari anak-anak; ini menaikkan energi kelas.",
      "Menghukum seluruh kelas dengan meniadakan bermain.",
      "Menyalahkan satu-dua anak sebagai biang keributan di depan semua.",
    ],
    escalation:
      "Jika kelas selalu tidak terkendali di jam tertentu setiap hari, tinjau rasio guru-anak dan susunan jadwal bersama kepala sekolah; mungkin perlu guru pendamping tambahan atau perombakan alur kegiatan.",
  },
  {
    slug: "kelas-aktif-setelah-jam-olahraga",
    title: "Anak sulit tenang setelah kegiatan fisik",
    category: "Kelas terlalu aktif",
    situation:
      "Sepulang dari senam atau bermain di halaman, anak-anak masuk kelas masih dengan energi tinggi dan sulit diarahkan ke kegiatan tenang.",
    actions: [
      "Rancang aktivitas jembatan penurun energi sebelum kegiatan tenang: jalan jinjit, gerakan slow motion, atau meniru kura-kura.",
      "Beri waktu minum dan mengatur napas sebagai rutinitas tetap setelah kegiatan fisik.",
      "Gunakan pendinginan dengan cerita bergerak: anak mengikuti gerakan yang makin lama makin pelan.",
      "Baru mulai kegiatan duduk setelah tubuh anak benar-benar melambat.",
    ],
    exampleScripts: [
      "Sekarang kita jadi kura-kura. Jalannya pelaaan sekali menuju karpet.",
      "Minum dulu, lalu kita tarik napas seperti mencium bunga... dan hembuskan seperti meniup lilin.",
    ],
    avoid: [
      "Langsung menuntut duduk manis begitu masuk kelas.",
      "Menghapus kegiatan fisik supaya kelas mudah diatur; anak justru butuh gerak.",
      "Marah karena anak berkeringat dan berisik setelah bermain.",
    ],
    escalation:
      "Jika transisi setelah kegiatan fisik selalu kacau meski sudah ada pendinginan, diskusikan urutan jadwal dengan kepala sekolah, misalnya menempatkan makan atau cuci tangan sebagai jeda alami setelah olahraga.",
  },
  {
    slug: "kelas-aktif-satu-anak-memicu",
    title: "Satu anak memancing keributan dan yang lain mengikuti",
    category: "Kelas terlalu aktif",
    situation:
      "Seorang anak mulai melempar bantal sambil tertawa, dan dalam hitungan detik beberapa anak lain ikut melempar hingga kelas gaduh.",
    actions: [
      "Dekati sumber pemicu dengan tenang dan hentikan perilakunya tanpa drama besar.",
      "Alihkan energi anak pemicu ke kegiatan fisik yang diperbolehkan, misalnya melempar bola ke keranjang.",
      "Arahkan kelompok yang terlanjur ikut dengan instruksi bermain yang jelas dan menarik.",
      "Setelah tenang, bicara empat mata dengan anak pemicu, bukan di depan kelas.",
    ],
    exampleScripts: [
      "Bantal untuk duduk, bukan untuk dilempar. Kalau Damar ingin melempar, kita main lempar bola ke keranjang yuk.",
      "Teman-teman, keranjang merah menunggu bola! Siapa bisa memasukkan sambil berdiri di garis?",
    ],
    avoid: [
      "Mempermalukan anak pemicu dengan menyebutnya sumber masalah di depan teman-temannya.",
      "Mengabaikan kejadian sampai membesar.",
      "Menghukum semua anak yang ikut-ikutan tanpa membedakan situasi.",
    ],
    escalation:
      "Jika anak yang sama berulang kali memicu keributan yang membahayakan, catat pemicu dan waktunya, lalu ajak orang tua berbicara untuk memahami kebutuhan anak dan menyusun strategi bersama.",
  },
  {
    slug: "kelas-aktif-saat-cuaca-hujan",
    title: "Kelas gelisah karena tidak bisa bermain di luar",
    category: "Kelas terlalu aktif",
    situation:
      "Hujan deras membuat anak-anak tidak bisa bermain di halaman; energi mereka menumpuk dan kelas menjadi riuh serta mudah terjadi gesekan.",
    actions: [
      "Sediakan versi indoor untuk menyalurkan energi: senam lantai, menari, lompat di garis lakban, atau lorong rintangan dari kursi.",
      "Bagi kelas menjadi kelompok kecil dengan pos kegiatan bergantian agar tidak berdesakan.",
      "Gunakan permainan terstruktur bertenaga tinggi tapi teratur, misalnya 'patung musik'.",
      "Selingi dengan kegiatan tenang setelah energi tersalurkan.",
    ],
    exampleScripts: [
      "Hari ini hujan, jadi halaman kita pindah ke dalam! Ada lorong rintangan seru di sebelah sana.",
      "Saat musik berhenti, semua jadi patung! Patung paling tenang boleh pilih gerakan berikutnya.",
    ],
    avoid: [
      "Memaksa anak duduk mengerjakan lembar kerja seharian karena tidak bisa keluar.",
      "Membiarkan anak berlarian bebas tanpa struktur di ruang sempit hingga bertabrakan.",
      "Menyalakan video sepanjang hari sebagai satu-satunya pengisi waktu.",
    ],
    escalation:
      "Jika ruangan memang terlalu sempit untuk aktivitas fisik indoor dan gesekan antaranak sering terjadi di musim hujan, bicarakan dengan kepala sekolah kemungkinan memakai aula, teras tertutup, atau pengaturan sesi bermain bergiliran.",
  },

  // ===== Transisi aktivitas (4) =====
  {
    slug: "transisi-sulit-berhenti-bermain",
    title: "Anak menolak berhenti bermain saat waktunya beralih kegiatan",
    category: "Transisi aktivitas",
    situation:
      "Saat guru mengumumkan waktu bermain selesai, beberapa anak protes, terus bermain, atau menangis karena permainannya belum selesai.",
    actions: [
      "Beri peringatan waktu bertahap sebelum transisi: 5 menit dan 1 menit sebelumnya, dengan penanda yang sama setiap hari.",
      "Gunakan lagu beres-beres yang konsisten sebagai penanda transisi.",
      "Akui perasaan anak yang belum selesai, lalu tawarkan cara menyimpan karya untuk dilanjutkan.",
      "Jadikan beres-beres permainan: berlomba dengan lagu, mengelompokkan mainan sesuai warna.",
      "Puji anak yang mulai bergerak lebih dulu secara spesifik.",
    ],
    exampleScripts: [
      "Teman-teman, lima menit lagi lagu beres-beres berbunyi. Selesaikan bagian yang penting ya.",
      "Menara Raja belum selesai ya? Kita beri tanda nama, besok dilanjutkan lagi. Ibu guru jaga baik-baik.",
      "Wah, kelompok meja hijau sudah rapi duluan sebelum lagunya habis!",
    ],
    avoid: [
      "Membereskan mainan anak secara tiba-tiba tanpa peringatan.",
      "Mengancam membuang mainan yang tidak dibereskan.",
      "Transisi mendadak tanpa penanda yang bisa diprediksi anak.",
    ],
    escalation:
      "Jika ada anak yang selalu tantrum hebat di setiap transisi meski penanda sudah konsisten selama beberapa minggu, buat catatan pola transisinya dan diskusikan strategi khusus dengan orang tua, misalnya menggunakan jadwal bergambar pribadi.",
  },
  {
    slug: "transisi-antre-cuci-tangan-kacau",
    title: "Antrean cuci tangan sebelum makan selalu kacau",
    category: "Transisi aktivitas",
    situation:
      "Setiap jelang makan bersama, semua anak berhamburan menuju wastafel sekaligus sehingga terjadi dorong-dorongan dan air berceceran.",
    actions: [
      "Panggil anak bergiliran per kelompok kecil dengan cara menyenangkan, misalnya berdasarkan warna baju.",
      "Beri kegiatan tunggu yang jelas bagi yang belum dipanggil: bernyanyi, tebak-tebakan jari.",
      "Tandai lantai tempat antre dengan pijakan gambar berjarak.",
      "Tempatkan guru di titik wastafel untuk mengarahkan tempo.",
    ],
    exampleScripts: [
      "Yang memakai baju berwarna merah, silakan berjalan pelan ke wastafel. Yang lain, kita tebak-tebakan dulu.",
      "Berdiri di telapak kaki gambar ya, satu anak satu gambar.",
    ],
    avoid: [
      "Melepas semua anak sekaligus ke area sempit.",
      "Membiarkan anak menunggu lama tanpa kegiatan sehingga saling dorong.",
      "Memarahi anak yang basah kuyup padahal alurnya yang belum diatur.",
    ],
    escalation:
      "Jika titik cuci tangan terlalu sedikit untuk jumlah anak dan kekacauan terus terjadi, sampaikan kebutuhan penambahan titik air atau pengaturan jadwal bergilir antar kelas kepada kepala sekolah.",
  },
  {
    slug: "transisi-menunggu-terlalu-lama",
    title: "Anak ribut karena menunggu terlalu lama antar kegiatan",
    category: "Transisi aktivitas",
    situation:
      "Saat guru menyiapkan bahan kegiatan berikutnya, anak-anak dibiarkan menunggu tanpa kegiatan sehingga mulai saling mengganggu dan berlarian.",
    actions: [
      "Siapkan bahan kegiatan sebelum anak datang atau saat anak masih terlibat aktivitas sebelumnya.",
      "Miliki kantong kegiatan penyambung tanpa alat: tepuk berpola, tebak gerakan hewan, bisik berantai.",
      "Libatkan anak dalam persiapan bila memungkinkan, misalnya membagikan kertas.",
      "Usahakan jeda kosong tidak lebih dari 2-3 menit.",
    ],
    exampleScripts: [
      "Sambil Ibu menyiapkan cat, kita main tebak hewan! Ibu peragakan, teman-teman tebak.",
      "Tio dan Sari, bantu Ibu membagikan celemek ke setiap kursi ya.",
    ],
    avoid: [
      "Meminta anak duduk diam tanpa kegiatan selama guru sibuk menyiapkan.",
      "Menyalahkan anak atas keributan yang muncul dari jeda kosong.",
      "Meninggalkan kelas tanpa pengawasan untuk mengambil bahan.",
    ],
    escalation:
      "Jika persiapan bahan selalu memakan waktu lama karena keterbatasan tempat penyimpanan atau tenaga, bicarakan dengan kepala sekolah tentang penataan ruang atau pembagian tugas antar guru.",
  },
  {
    slug: "transisi-dari-rumah-ke-sekolah-pagi",
    title: "Anak sulit beralih dari suasana rumah ke kegiatan pagi",
    category: "Transisi aktivitas",
    situation:
      "Beberapa anak datang dengan suasana hati berbeda-beda: ada yang masih mengantuk, ada yang rewel, sehingga sulit langsung mengikuti kegiatan pembuka.",
    actions: [
      "Sediakan rutinitas penyambutan yang sama setiap hari: salam pilihan anak (tos, salaman, atau lambaian).",
      "Buka kelas dengan aktivitas pilihan bebas yang tenang 10-15 menit sebagai landasan pacu.",
      "Sapa setiap anak dengan namanya dan satu kalimat personal.",
      "Amati suasana hati anak sejak pintu untuk mengantisipasi kebutuhan khusus hari itu.",
    ],
    exampleScripts: [
      "Selamat pagi, Bunga! Mau salam tos, salaman, atau lambaian hari ini?",
      "Ibu lihat Dafa masih mengantuk. Duduk dulu di bantal empuk, nanti gabung kalau sudah siap ya.",
    ],
    avoid: [
      "Langsung memulai kegiatan terstruktur begitu anak melewati pintu.",
      "Mengabaikan anak yang datang dengan wajah murung.",
      "Menegur anak yang datang terlambat di depan teman-temannya.",
    ],
    escalation:
      "Jika ada anak yang setiap pagi datang dengan kondisi sangat lelah, mengantuk berat, atau belum sarapan, ajak orang tuanya berbincang ringan tentang rutinitas pagi di rumah dan cari solusi bersama.",
  },

  // ===== Komunikasi dengan orang tua (4) =====
  {
    slug: "ortu-menyampaikan-perilaku-menantang",
    title: "Menyampaikan perilaku menantang anak kepada orang tua",
    category: "Komunikasi dengan orang tua",
    situation:
      "Seorang anak beberapa kali memukul temannya minggu ini, dan guru perlu menyampaikan hal tersebut kepada orang tuanya tanpa membuat mereka tersinggung atau panik.",
    actions: [
      "Pilih waktu dan tempat yang privat, bukan sambil lalu di depan anak-anak atau orang tua lain.",
      "Mulai dengan hal positif yang tulus tentang anak sebelum masuk ke masalah.",
      "Sampaikan fakta perilaku yang teramati, bukan penilaian tentang karakter anak.",
      "Ajak orang tua berbagi cerita: apakah ada hal serupa atau perubahan di rumah.",
      "Tutup dengan rencana konkret yang disepakati kedua pihak dan jadwal untuk saling mengabari.",
    ],
    exampleScripts: [
      "Rangga anak yang semangat sekali kalau main balok. Minggu ini ada beberapa kejadian yang ingin saya ceritakan supaya kita bisa bantu Rangga sama-sama.",
      "Hari Selasa dan Kamis, saat berebut mainan, tangan Rangga sempat memukul temannya. Di rumah, kalau Rangga kesal biasanya bagaimana, Bu?",
      "Di sekolah saya akan dampingi Rangga belajar meminta dengan kata-kata. Nanti kita saling kabari perkembangannya ya, Bu.",
    ],
    avoid: [
      "Melabeli anak dengan sebutan 'nakal', 'agresif', atau menebak-nebak diagnosis tertentu.",
      "Menyampaikan keluhan di grup pesan atau di depan orang tua lain.",
      "Menumpuk banyak keluhan sekaligus setelah lama dipendam.",
    ],
    escalation:
      "Jika perilaku memukul makin sering dan membahayakan meski strategi sekolah-rumah sudah berjalan selaras, ajak kepala sekolah bergabung dalam pertemuan dengan orang tua untuk menyusun dukungan tambahan, termasuk kemungkinan berkonsultasi dengan profesional.",
  },
  {
    slug: "ortu-menuntut-calistung",
    title: "Orang tua menuntut anak diajari membaca-menulis intensif",
    category: "Komunikasi dengan orang tua",
    situation:
      "Seorang orang tua protes karena anaknya 'hanya bermain' di sekolah dan meminta guru memberikan drill membaca, menulis, dan berhitung setiap hari.",
    actions: [
      "Dengarkan kekhawatiran orang tua sampai tuntas; biasanya berakar dari cemas soal kesiapan SD.",
      "Jelaskan dengan contoh konkret bagaimana bermain membangun kemampuan pra-literasi dan pra-matematika.",
      "Tunjukkan bukti perkembangan anak: hasil karya, foto kegiatan, catatan observasi.",
      "Bagikan kegiatan sederhana yang bisa dilakukan di rumah tanpa drill, misalnya membacakan buku dan bermain tebak bunyi.",
    ],
    exampleScripts: [
      "Saya paham sekali, Ayah ingin Bila siap masuk SD. Itu keinginan kita juga.",
      "Waktu Bila bermain kartu nama tadi, ia sebenarnya sedang belajar mengenali huruf. Ini fotonya saat ia menyusun namanya sendiri.",
      "Di rumah, Ayah bisa membacakan buku 10 menit sebelum tidur. Itu bekal membaca yang sangat kuat.",
    ],
    avoid: [
      "Mengabaikan atau meremehkan kecemasan orang tua.",
      "Menyerah lalu memberikan drill berlebihan yang tidak sesuai tahap perkembangan.",
      "Berdebat dengan nada menggurui atau merendahkan.",
    ],
    escalation:
      "Jika orang tua tetap tidak puas setelah beberapa kali dialog, ajukan pertemuan bersama kepala sekolah untuk menjelaskan kurikulum dan kebijakan sekolah secara resmi.",
  },
  {
    slug: "ortu-anak-terluka-di-sekolah",
    title: "Mengabari orang tua saat anak terluka di sekolah",
    category: "Komunikasi dengan orang tua",
    situation:
      "Seorang anak jatuh saat bermain dan lututnya lecet berdarah sedikit; luka sudah ditangani, dan guru perlu mengabari orang tua.",
    actions: [
      "Tangani anak lebih dulu: bersihkan luka, tenangkan, catat kronologi singkat.",
      "Kabari orang tua secepatnya, jangan menunggu mereka menemukan lukanya sendiri saat menjemput.",
      "Sampaikan kronologi jujur dan apa adanya: apa yang terjadi, penanganan yang diberikan, kondisi anak sekarang.",
      "Sampaikan langkah pencegahan yang akan dilakukan sekolah.",
      "Ikuti prosedur pelaporan insiden sekolah dan dokumentasikan.",
    ],
    exampleScripts: [
      "Bu, saya ingin mengabari: tadi pukul sepuluh Raisa terjatuh saat berlari di halaman. Lututnya lecet, sudah kami bersihkan dan beri plester. Sekarang Raisa sudah main lagi dengan ceria.",
      "Kami akan tambah pengawasan di area itu dan ingatkan anak-anak aturan berlari. Mohon maaf atas kejadian ini, Bu.",
    ],
    avoid: [
      "Menyembunyikan atau mengecilkan kejadian dengan harapan orang tua tidak sadar.",
      "Menyalahkan anak yang terluka atau anak lain di hadapan orang tua.",
      "Memberi keterangan berbeda-beda antara guru satu dan lainnya.",
    ],
    escalation:
      "Untuk luka yang lebih dari lecet ringan, benturan di kepala, atau anak tampak kesakitan terus, segera hubungi orang tua saat itu juga, laporkan ke kepala sekolah, dan ikuti prosedur rujukan ke fasilitas kesehatan.",
  },
  {
    slug: "ortu-membandingkan-anak-di-grup",
    title: "Orang tua membanding-bandingkan anak di grup kelas",
    category: "Komunikasi dengan orang tua",
    situation:
      "Di grup pesan kelas, beberapa orang tua saling memamerkan kemampuan anak dan ada yang bertanya mengapa anaknya 'tertinggal' dibanding teman-temannya.",
    actions: [
      "Tanggapi di grup secara umum dan positif tanpa membahas anak tertentu.",
      "Hubungi secara pribadi orang tua yang cemas untuk berbincang lebih dalam.",
      "Jelaskan bahwa setiap anak berkembang dengan kecepatan dan jalurnya masing-masing, sertai contoh kekuatan spesifik anaknya.",
      "Tetapkan dan ingatkan etika grup: grup untuk informasi kegiatan, perkembangan individual dibahas pribadi.",
    ],
    exampleScripts: [
      "Terima kasih sharing-nya, Ayah-Bunda. Setiap anak punya jalur berkembangnya sendiri, dan semua anak di kelas kami tumbuh dengan baik dengan caranya masing-masing.",
      "Bu, saya lihat Bunda agak khawatir. Boleh kita ngobrol sebentar besok saat penjemputan? Saya ingin cerita banyak hal baik tentang Zahra.",
    ],
    avoid: [
      "Membahas perkembangan anak tertentu secara terbuka di grup.",
      "Ikut membanding-bandingkan anak untuk menenangkan orang tua.",
      "Membiarkan budaya pamer di grup tumbuh tanpa arahan.",
    ],
    escalation:
      "Jika suasana grup menjadi tidak sehat dan menimbulkan konflik antar orang tua, minta kepala sekolah menyegarkan kembali kesepakatan penggunaan grup dalam pertemuan orang tua.",
  },

  // ===== Classroom management (5) =====
  {
    slug: "cm-membangun-aturan-kelas-bersama",
    title: "Membangun aturan kelas bersama anak",
    category: "Classroom management",
    situation:
      "Di awal tahun ajaran, kelas belum memiliki kesepakatan bersama sehingga anak-anak sering bingung tentang apa yang boleh dan tidak boleh dilakukan.",
    actions: [
      "Ajak anak berdiskusi tentang apa yang membuat kelas nyaman dan aman, tampung ide mereka.",
      "Rumuskan 3-5 kesepakatan sederhana dalam kalimat positif (apa yang dilakukan, bukan larangan).",
      "Visualisasikan dengan gambar atau foto anak yang mencontohkan, tempel setinggi mata anak.",
      "Rujuk kesepakatan secara konsisten setiap hari, bukan hanya saat ada pelanggaran.",
      "Tinjau ulang bersama anak jika ada kesepakatan yang sering dilanggar.",
    ],
    exampleScripts: [
      "Supaya semua senang bermain di kelas, enaknya kita sepakat apa saja ya?",
      "Kaki berjalan di dalam kelas. Ayo tunjuk gambar kesepakatan kita!",
      "Wah, Ibu lihat Nino menyimpan mainan ke tempatnya. Itu sesuai kesepakatan kita yang nomor dua!",
    ],
    avoid: [
      "Membuat daftar larangan panjang penuh kata 'jangan' yang ditentukan sepihak oleh guru.",
      "Menempel aturan tinggi di dinding lalu tidak pernah dirujuk lagi.",
      "Menegakkan aturan hanya untuk anak tertentu dan longgar untuk yang lain.",
    ],
    escalation:
      "Jika kesepakatan kelas terus gagal berjalan meski sudah dibangun bersama dan dirujuk konsisten, minta rekan guru senior atau kepala sekolah mengobservasi kelas Anda dan memberi masukan.",
  },
  {
    slug: "cm-mendapatkan-perhatian-kelas",
    title: "Cara mendapatkan perhatian seluruh kelas tanpa berteriak",
    category: "Classroom management",
    situation:
      "Guru sering kehabisan suara karena harus berteriak setiap kali ingin memanggil perhatian anak-anak yang sedang asyik beraktivitas.",
    actions: [
      "Latih satu sinyal perhatian di saat tenang, sebelum dipakai di saat riuh: tepuk berpola, lonceng, atau panggilan berbalas.",
      "Gunakan sinyal secara konsisten dan tunggu sampai benar-benar semua merespons sebelum bicara.",
      "Variasikan sesekali agar tidak membosankan: suara berbisik, gerakan tangan misterius.",
      "Beri apresiasi cepat saat kelas merespons, lalu langsung sampaikan pesan dengan singkat.",
    ],
    exampleScripts: [
      "Kalau Ibu bilang 'Halo halo', teman-teman jawab 'Hai hai' sambil lihat ke Ibu ya. Kita coba!",
      "Tepuk satu! (prok) Tepuk dua! (prok prok) Mata ke Ibu guru... Terima kasih. Ibu mau memberi tahu sesuatu yang seru.",
    ],
    avoid: [
      "Berteriak makin keras setiap kali kelas riuh.",
      "Memakai sinyal terlalu sering untuk hal sepele sehingga anak kebal.",
      "Mulai bicara panjang sebelum semua anak siap mendengarkan.",
    ],
    escalation:
      "Jika dengan berbagai sinyal kelas tetap sulit merespons dan jumlah anak sangat banyak, diskusikan rasio guru-anak dengan kepala sekolah karena mungkin dibutuhkan guru pendamping.",
  },
  {
    slug: "cm-penataan-ruang-kelas",
    title: "Menata ruang kelas untuk mengurangi masalah perilaku",
    category: "Classroom management",
    situation:
      "Anak-anak sering berlarian melintasi kelas, bertabrakan di area sempit, dan berebut di sudut mainan yang menumpuk di satu tempat.",
    actions: [
      "Pecah ruang menjadi area kegiatan yang jelas batasnya menggunakan rak rendah atau karpet.",
      "Hilangkan lintasan lurus panjang yang mengundang anak berlari.",
      "Sebar area yang diminati agar anak tidak menumpuk di satu titik, dan batasi jumlah anak per area dengan penanda.",
      "Simpan mainan pada wadah berlabel gambar setinggi jangkauan anak agar mudah diambil dan dibereskan.",
      "Amati seminggu setelah perubahan: catat titik mana yang masih memicu masalah.",
    ],
    exampleScripts: [
      "Area balok ada di karpet biru, cukup untuk empat anak. Kalau kartu gantungnya habis, berarti pilih area lain dulu ya.",
      "Mobil-mobilan pulang ke rumahnya di kotak bergambar mobil ya.",
    ],
    avoid: [
      "Menaruh semua mainan menarik di satu sudut.",
      "Membiarkan area kosong luas di tengah kelas yang memancing berlari.",
      "Menyimpan mainan terlalu tinggi sehingga anak selalu bergantung pada guru.",
    ],
    escalation:
      "Jika keterbatasan ruangan atau perabot membuat penataan ideal tidak memungkinkan, ajukan kebutuhan penataan ulang atau perabot sederhana (rak rendah, karpet pembatas) kepada kepala sekolah.",
  },
  {
    slug: "cm-rutinitas-harian-konsisten",
    title: "Membangun rutinitas harian yang bisa diprediksi anak",
    category: "Classroom management",
    situation:
      "Anak-anak sering bertanya-tanya kegiatan berikutnya, gelisah menjelang pergantian kegiatan, dan bergantung penuh pada instruksi guru untuk setiap langkah.",
    actions: [
      "Susun urutan kegiatan harian yang tetap dan tampilkan sebagai jadwal bergambar setinggi mata anak.",
      "Tinjau jadwal bersama setiap pagi dan tandai kegiatan yang sudah lewat.",
      "Gunakan lagu atau penanda bunyi yang sama untuk setiap jenis transisi.",
      "Beri tahu jauh-jauh hari bila ada perubahan jadwal, dan tunjukkan pada papan jadwal.",
    ],
    exampleScripts: [
      "Ayo lihat jadwal kita. Setelah main bebas, gambar apa ini? Betul, cuci tangan lalu makan bersama.",
      "Besok ada yang spesial: gambar bus! Kita akan jalan-jalan ke pasar. Setelah itu jadwalnya kembali seperti biasa.",
    ],
    avoid: [
      "Mengubah-ubah urutan kegiatan setiap hari tanpa penjelasan.",
      "Menganggap anak pasti ingat urutan tanpa dukungan visual.",
      "Membuat jadwal terlalu padat tanpa jeda bermain bebas.",
    ],
    escalation:
      "Jika ada anak yang tetap sangat cemas terhadap perubahan kecil sekalipun dan sulit tenang kembali, catat situasi pemicunya dan diskusikan dengan orang tua cara memberi dukungan yang konsisten di rumah dan sekolah.",
  },
  {
    slug: "cm-anak-selesai-lebih-dulu",
    title: "Mengelola anak yang menyelesaikan kegiatan lebih dulu",
    category: "Classroom management",
    situation:
      "Beberapa anak selalu menyelesaikan kegiatan jauh lebih cepat dari temannya, lalu mulai mengganggu anak lain yang masih bekerja.",
    actions: [
      "Siapkan 'kegiatan lanjutan' yang menarik dan bisa diambil mandiri: buku, puzzle, kartu gambar.",
      "Beri tantangan pengayaan pada kegiatan yang sama, misalnya menambah detail karya.",
      "Beri peran membantu yang jelas batasnya bagi yang berminat: membantu, bukan mengerjakan milik teman.",
      "Buat sudut tenang tempat anak boleh menunggu sambil beraktivitas ringan.",
    ],
    exampleScripts: [
      "Karya Lala sudah selesai! Mau tambah hiasan rumput dan matahari, atau pilih kegiatan di rak tunggu?",
      "Kalau mau membantu Sena, tanya dulu: 'Boleh kubantu?' Kalau Sena bilang tidak, kita hargai ya.",
    ],
    avoid: [
      "Menyuruh anak diam menunggu tanpa kegiatan apa pun.",
      "Memberi tugas tambahan yang terkesan hukuman.",
      "Membiarkan anak cepat selesai mengerjakan milik temannya.",
    ],
    escalation:
      "Jika seorang anak secara konsisten menyelesaikan semua kegiatan jauh lebih cepat dan tampak tidak tertantang, diskusikan dengan orang tua dan kepala sekolah tentang pengayaan yang sesuai minat dan tahap perkembangannya.",
  },

  // ===== Bahasa positif (5) =====
  {
    slug: "bp-mengganti-kata-jangan",
    title: "Mengganti kalimat larangan dengan instruksi positif",
    category: "Bahasa positif",
    situation:
      "Guru menyadari dirinya terus-menerus berkata 'jangan lari', 'jangan berisik', 'jangan naik-naik', namun anak justru semakin sering melakukan hal yang dilarang.",
    actions: [
      "Katakan perilaku yang diinginkan, bukan yang dilarang: otak anak menangkap kata kunci terakhir.",
      "Sertakan alasan singkat agar anak memahami maknanya.",
      "Latih diri dengan mengubah tiga larangan yang paling sering Anda ucapkan menjadi kalimat positif.",
      "Minta rekan guru saling mengingatkan dengan kode ringan saat terdengar kata 'jangan'.",
    ],
    exampleScripts: [
      "Kaki berjalan di dalam kelas ya, supaya tidak ada yang tertabrak.",
      "Suara pelan seperti bisikan kupu-kupu, teman kita sedang mendengarkan cerita.",
      "Duduk di kursi ya, kursi untuk duduk supaya aman.",
    ],
    avoid: [
      "Menumpuk kata 'jangan' berkali-kali dalam satu kalimat.",
      "Instruksi positif tapi dengan nada mengancam.",
      "Menganggap satu kali instruksi cukup; anak butuh pengulangan yang sabar.",
    ],
    escalation:
      "Jika Anda kesulitan mengubah kebiasaan bahasa sendiri, ajak seluruh tim guru membuat daftar 'kamus kalimat positif' bersama dan bahas dalam rapat mingguan agar saling menguatkan.",
  },
  {
    slug: "bp-memuji-proses-bukan-hasil",
    title: "Memuji proses dan usaha, bukan sekadar hasil",
    category: "Bahasa positif",
    situation:
      "Anak-anak mulai sering bertanya 'Bagus tidak, Bu?' dan tampak hanya termotivasi jika karyanya dipuji 'bagus' atau 'pintar'.",
    actions: [
      "Deskripsikan apa yang Anda lihat secara spesifik alih-alih menilai bagus/jelek.",
      "Soroti usaha, strategi, dan kemajuan anak dibanding dirinya sendiri sebelumnya.",
      "Kembalikan pertanyaan pada anak untuk membangun penilaian diri.",
      "Kurangi pujian umum seperti 'pintar' yang tidak memberi informasi apa pun.",
    ],
    exampleScripts: [
      "Wah, Sasa memakai tiga warna dan mewarnainya sampai penuh. Sasa mengerjakannya dengan teliti sekali.",
      "Kemarin gunting Bara masih sering keluar garis, sekarang guntingannya mengikuti garis. Latihan Bara berhasil!",
      "Menurut Rania sendiri, bagian mana yang paling Rania suka dari gambar ini?",
    ],
    avoid: [
      "Memuji berlebihan setiap hal kecil sehingga pujian kehilangan makna.",
      "Membandingkan hasil antar anak, misalnya 'punya kakak ini paling bagus sekelas'.",
      "Menilai karya anak dengan 'salah' atau 'jelek'.",
    ],
    escalation:
      "Jika ada anak yang tampak sangat takut salah hingga menolak mencoba kegiatan apa pun, sampaikan pengamatan ini kepada orang tua dan diskusikan bersama cara menumbuhkan keberanian mencoba di rumah dan di sekolah.",
  },
  {
    slug: "bp-menamai-emosi-anak",
    title: "Membantu anak menamai emosinya dengan kata-kata",
    category: "Bahasa positif",
    situation:
      "Anak-anak sering mengekspresikan emosi dengan berteriak, melempar, atau memukul karena belum punya kata-kata untuk perasaannya.",
    actions: [
      "Namai emosi yang Anda amati dengan nada tenang, tanpa menghakimi.",
      "Validasi dulu perasaannya, baru batasi perilakunya: semua perasaan boleh, tidak semua perilaku boleh.",
      "Gunakan alat bantu: kartu wajah emosi, cermin, buku cerita tentang perasaan.",
      "Contohkan menamai emosi Anda sendiri dalam keseharian.",
      "Ajarkan cara aman menyalurkan emosi: tarik napas, memeluk bantal, minta bantuan guru.",
    ],
    exampleScripts: [
      "Sepertinya Rio marah karena menaranya diambil. Marah itu boleh, memukul yang tidak boleh. Ayo tarik napas dulu bersama Ibu.",
      "Ibu guru tadi sedikit kaget waktu pintu berbunyi keras. Ibu tarik napas dulu supaya tenang.",
      "Wajah Tata seperti kartu yang mana ya hari ini? Yang tersenyum atau yang cemberut?",
    ],
    avoid: [
      "Menyuruh anak berhenti merasa, misalnya 'Tidak usah marah!' atau 'Gitu aja kok sedih.'",
      "Menghukum anak karena emosinya, bukan membimbing perilakunya.",
      "Meremehkan perasaan anak karena pemicunya tampak sepele bagi orang dewasa.",
    ],
    escalation:
      "Jika ledakan emosi anak sangat intens, sangat sering, sulit reda hingga melukai diri atau orang lain, catat pola kejadiannya dan ajak orang tua berdiskusi untuk mencari dukungan profesional bersama-sama.",
  },
  {
    slug: "bp-menghindari-label-negatif",
    title: "Menghindari label negatif pada anak",
    category: "Bahasa positif",
    situation:
      "Beberapa anak mulai dikenal dengan julukan seperti 'si tukang nangis' atau 'si nakal', bahkan anak-anak lain ikut memanggilnya begitu.",
    actions: [
      "Hentikan label dari diri sendiri: pisahkan perilaku dari pribadi anak dalam setiap kalimat.",
      "Koreksi dengan lembut saat anak lain memakai label, dan beri contoh kalimat penggantinya.",
      "Sengaja tangkap dan sebutkan momen positif anak yang terlanjur berlabel, di depan teman-temannya.",
      "Selaraskan dengan semua guru dan staf agar tidak ada yang memakai julukan negatif.",
    ],
    exampleScripts: [
      "Deni bukan anak nakal. Tadi Deni sedang kesal, dan Deni sedang belajar mengatakannya dengan kata-kata.",
      "Di kelas ini kita memanggil teman dengan namanya: Deni. Coba lihat, tadi Deni membantu membawakan kursi lho.",
    ],
    avoid: [
      "Melabeli anak, walau bercanda, seperti 'si lelet', 'si cengeng', 'si biang ribut'.",
      "Membicarakan keburukan anak dengan sesama guru di ruang yang bisa didengar anak.",
      "Menceritakan perilaku buruk anak kepada orang tua lain.",
    ],
    escalation:
      "Jika label sudah tersebar hingga orang tua murid lain ikut menyebutnya, minta dukungan kepala sekolah untuk meluruskan komunikasi, dan bicarakan dengan orang tua anak tersebut agar mereka tahu sekolah melindungi nama baik anaknya.",
  },
  {
    slug: "bp-memberi-pilihan-terbatas",
    title: "Memberi pilihan terbatas agar anak mau bekerja sama",
    category: "Bahasa positif",
    situation:
      "Anak sering menjawab 'tidak mau!' setiap kali diminta melakukan sesuatu, dan guru kelelahan karena setiap instruksi berubah menjadi adu tarik urat.",
    actions: [
      "Tawarkan dua pilihan yang keduanya bisa Anda terima, alih-alih perintah tunggal atau pertanyaan terbuka.",
      "Pastikan pilihan nyata dan konkret, sesuai kemampuan anak memutuskan.",
      "Hormati pilihan yang diambil anak, jangan didebat lagi.",
      "Bila anak menolak keduanya, tenang sampaikan bahwa tidak memilih berarti guru yang memilihkan, lalu tepati.",
    ],
    exampleScripts: [
      "Waktunya membereskan. Ranu mau menyimpan balok merah dulu atau balok biru dulu?",
      "Mau cuci tangan sambil berjingkat seperti kucing atau melompat seperti kelinci?",
      "Belum memilih ya? Kalau begitu Ibu pilihkan: kita simpan balok merah dulu. Besok Ranu yang memilih duluan.",
    ],
    avoid: [
      "Memberi pilihan palsu yang sebenarnya tidak boleh dipilih.",
      "Menawarkan terlalu banyak pilihan sehingga anak bingung.",
      "Menganulir pilihan anak setelah ia memilih.",
    ],
    escalation:
      "Jika penolakan anak terhadap hampir semua kegiatan berlangsung intens selama berminggu-minggu dan mengganggu keikutsertaannya, ajak orang tua berbincang tentang situasi di rumah dan sepakati pendekatan yang sama di kedua tempat.",
  },

  // ===== Persiapan mengajar (4) =====
  {
    slug: "persiapan-rencana-kegiatan-harian",
    title: "Menyiapkan rencana kegiatan harian yang realistis",
    category: "Persiapan mengajar",
    situation:
      "Guru sering merasa rencana kegiatan yang disusun terlalu ambisius: bahan belum siap, waktu tidak cukup, dan akhirnya kegiatan berjalan kacau.",
    actions: [
      "Susun rencana dengan satu kegiatan inti yang matang, bukan banyak kegiatan yang setengah siap.",
      "Siapkan bahan sehari sebelumnya dan cek kelengkapannya di pagi hari sebelum anak datang.",
      "Sediakan selalu rencana cadangan sederhana tanpa alat untuk situasi tak terduga.",
      "Ujicoba sendiri kegiatan yang rumit sebelum diberikan ke anak, misalnya resep playdough baru.",
      "Beri ruang longgar pada jadwal; kegiatan anak usia dini hampir selalu butuh waktu lebih lama dari perkiraan.",
    ],
    exampleScripts: [
      "(kepada rekan guru) Besok kegiatan intinya mencetak daun. Bahannya sudah kusiapkan di keranjang hijau, tolong cek lagi ya.",
      "(kepada diri sendiri saat menyusun rencana) Kalau hujan dan tidak bisa ke halaman, gantinya berburu daun dari tanaman pot di teras.",
    ],
    avoid: [
      "Menyiapkan bahan mendadak sambil meninggalkan anak tanpa kegiatan.",
      "Memaksakan semua rencana selesai meski anak sudah lelah.",
      "Menyalin rencana dari internet tanpa menyesuaikan dengan kondisi kelas sendiri.",
    ],
    escalation:
      "Jika beban administrasi perencanaan terasa menyita waktu hingga mengorbankan persiapan bahan, diskusikan dengan kepala sekolah tentang format perencanaan yang lebih ringkas dan pembagian tugas tim.",
  },
  {
    slug: "persiapan-mengajar-tanpa-alat-peraga",
    title: "Bersiap mengajar dengan sumber daya terbatas",
    category: "Persiapan mengajar",
    situation:
      "Sekolah memiliki sedikit alat peraga dan anggaran terbatas, sementara guru ingin kegiatan tetap kaya dan menarik bagi anak.",
    actions: [
      "Manfaatkan bahan lepasan dari alam dan barang bekas: daun, batu, tutup botol, kardus, kain perca.",
      "Kumpulkan koleksi bertahap dengan melibatkan orang tua menyumbang barang bekas layak pakai.",
      "Kuasai kegiatan tanpa alat: permainan gerak, tepuk, bernyanyi, bercerita, main peran.",
      "Buat alat peraga awet bersama rekan guru di waktu khusus, misalnya kartu gambar yang dilaminasi.",
    ],
    exampleScripts: [
      "(kepada orang tua) Ayah-Bunda, bulan ini kami mengumpulkan tutup botol bersih dan kardus bekas untuk bahan main anak-anak. Boleh dititipkan lewat anak ya.",
      "(kepada anak-anak) Hari ini kita berburu harta karun: daun kering, batu halus, dan ranting kecil di halaman!",
    ],
    avoid: [
      "Menganggap kegiatan bermakna hanya bisa terjadi dengan alat mahal.",
      "Menggunakan barang bekas yang tajam, kotor, atau berukuran kecil yang mudah tertelan.",
      "Membebani orang tua dengan permintaan bahan yang harus dibeli.",
    ],
    escalation:
      "Jika kebutuhan alat dasar keselamatan (seperti gunting anak yang aman atau matras) benar-benar tidak tersedia, ajukan kebutuhan prioritas ini secara tertulis kepada kepala sekolah atau yayasan.",
  },
  {
    slug: "persiapan-hari-pertama-tahun-ajaran",
    title: "Menyiapkan diri menghadapi minggu pertama tahun ajaran",
    category: "Persiapan mengajar",
    situation:
      "Menjelang tahun ajaran baru, guru akan menerima belasan anak baru yang belum dikenal, dan minggu pertama biasanya penuh tangisan serta kejadian tak terduga.",
    actions: [
      "Pelajari data anak sebelum hari pertama: nama panggilan, kebiasaan, alergi, dan pesan khusus dari orang tua.",
      "Siapkan kelas yang ramah: label nama, area bermain yang menarik namun tidak berlebihan.",
      "Rancang minggu pertama fokus pada perkenalan dan rasa aman, bukan target akademik.",
      "Sepakati pembagian peran dengan guru pendamping: siapa menyambut, siapa mendampingi anak menangis.",
      "Siapkan barang praktis: tisu, baju ganti cadangan, kantong untuk pakaian basah.",
    ],
    exampleScripts: [
      "(kepada rekan guru) Minggu pertama aku fokus di pintu menyambut, kamu standby di dalam untuk anak yang butuh ditemani ya.",
      "(kepada orang tua saat orientasi) Minggu-minggu awal, tujuan utama kami adalah anak merasa aman dan senang datang ke sekolah.",
    ],
    avoid: [
      "Menargetkan kelas langsung tertib dan tenang di minggu pertama.",
      "Menghafal aturan lebih dulu daripada membangun kelekatan dengan anak.",
      "Bekerja tanpa koordinasi peran dengan rekan guru.",
    ],
    escalation:
      "Jika jumlah anak baru terlalu banyak dibanding jumlah guru sehingga keamanan sulit dijaga, sampaikan kepada kepala sekolah sebelum tahun ajaran dimulai agar ada penyesuaian rombongan belajar atau tambahan pendamping.",
  },
  {
    slug: "persiapan-mengelola-energi-guru",
    title: "Menjaga energi dan emosi guru tetap stabil",
    category: "Persiapan mengajar",
    situation:
      "Guru merasa kelelahan fisik dan emosi menumpuk, mulai mudah tersulut oleh perilaku anak yang biasanya bisa ia hadapi dengan sabar.",
    actions: [
      "Kenali tanda awal lelah emosi pada diri sendiri: nada meninggi, napas pendek, ingin menjauh dari anak.",
      "Gunakan jeda mikro yang aman: tarik napas panjang tiga kali, minum air, ganti posisi.",
      "Bangun sistem saling menopang dengan rekan guru: kode meminta bantuan pegang kelas sebentar.",
      "Jaga bekal dasar: tidur cukup, makan sebelum mengajar, sepatu yang nyaman.",
      "Sisihkan waktu refleksi singkat sepulang mengajar: apa yang berjalan baik hari ini.",
    ],
    exampleScripts: [
      "(kepada rekan guru) Aku butuh dua menit menepi, tolong pegang kelas sebentar ya.",
      "(kepada anak-anak, dengan jujur dan tenang) Ibu guru mau tarik napas dulu supaya lebih segar. Yuk tarik napas bersama Ibu.",
    ],
    avoid: [
      "Melampiaskan lelah pada anak dengan bentakan.",
      "Memendam kewalahan tanpa pernah minta bantuan.",
      "Menganggap istirahat sebagai kemalasan.",
    ],
    escalation:
      "Jika kelelahan berlarut hingga memengaruhi kesehatan atau membuat Anda takut kehilangan kendali di depan anak, bicarakan beban kerja dengan kepala sekolah dan pertimbangkan mencari dukungan konseling untuk diri sendiri.",
  },

  // ===== Observasi (4) =====
  {
    slug: "observasi-mencatat-di-tengah-kesibukan",
    title: "Mencatat observasi anak di tengah kesibukan mengajar",
    category: "Observasi",
    situation:
      "Guru ingin mendokumentasikan perkembangan anak, tetapi selalu kehabisan waktu karena sibuk mendampingi kegiatan dari pagi sampai pulang.",
    actions: [
      "Gunakan catatan anekdot super singkat: nama, tanggal, satu kalimat fakta yang dilihat, ditulis saat itu juga di kertas tempel atau ponsel.",
      "Targetkan realistis: amati mendalam 2-3 anak per hari secara bergilir, bukan semua anak sekaligus.",
      "Manfaatkan momen anak bermain bebas sebagai jendela observasi utama.",
      "Foto hasil karya atau momen proses sebagai pelengkap catatan (sesuai kebijakan dokumentasi sekolah).",
      "Rapikan dan pindahkan catatan ke portofolio anak di waktu khusus, misalnya sekali seminggu.",
    ],
    exampleScripts: [
      "(contoh isi catatan) 12/8 - Ata menuang air ke botol sempit tanpa tumpah, mengulang 4 kali.",
      "(kepada rekan guru) Hari ini giliranku mengamati Ata, Bunga, dan Cakra. Tolong bantu perhatikan kejadian penting anak lain ya.",
    ],
    avoid: [
      "Menunda semua pencatatan ke akhir minggu hingga detail terlupakan.",
      "Menulis penilaian umum seperti 'anak pintar' tanpa fakta perilaku konkret.",
      "Mengamati anak sambil terus mengintervensi sehingga perilaku alaminya tidak muncul.",
    ],
    escalation:
      "Jika format dokumentasi yang diminta sekolah terasa terlalu berat hingga tidak pernah selesai, usulkan penyederhanaan format kepada kepala sekolah dengan menunjukkan contoh catatan ringkas yang tetap bermakna.",
  },
  {
    slug: "observasi-fakta-vs-tafsir",
    title: "Memisahkan fakta dan tafsir dalam catatan observasi",
    category: "Observasi",
    situation:
      "Saat membaca ulang catatannya, guru menyadari isinya penuh label dan kesimpulan seperti 'anak malas' atau 'anak hiperaktif', bukan deskripsi kejadian yang sebenarnya.",
    actions: [
      "Latih menulis apa yang terlihat dan terdengar saja: tindakan, ucapan, durasi, konteks.",
      "Pisahkan kolom catatan: sebelah kiri fakta, sebelah kanan dugaan atau pertanyaan guru.",
      "Hindari kata sifat penilaian (malas, nakal, bodoh, pintar) dan istilah yang menyerupai diagnosis.",
      "Uji catatan Anda: apakah orang lain yang membacanya bisa membayangkan kejadian persisnya.",
    ],
    exampleScripts: [
      "(contoh fakta) Selama 10 menit kegiatan meronce, Gilang meninggalkan meja 3 kali dan berpindah ke jendela.",
      "(contoh tafsir yang ditulis terpisah sebagai pertanyaan) Apakah ronce terlalu sulit untuk Gilang? Coba besok beri manik yang lebih besar.",
    ],
    avoid: [
      "Menulis label atau istilah diagnosis dalam catatan, misalnya 'sepertinya hiperaktif'.",
      "Mencampur opini dan fakta dalam satu kalimat tanpa bisa dibedakan.",
      "Menyimpulkan pola besar hanya dari satu kejadian.",
    ],
    escalation:
      "Jika dari kumpulan fakta berminggu-minggu terlihat pola yang jauh berbeda dari anak seusianya, bawa catatan faktual tersebut saat berdiskusi dengan orang tua dan biarkan penilaian lebih lanjut dilakukan oleh profesional yang berwenang.",
  },
  {
    slug: "observasi-anak-pendiam-terlewat",
    title: "Anak pendiam sering luput dari pengamatan guru",
    category: "Observasi",
    situation:
      "Saat mengisi laporan perkembangan, guru sadar hampir tidak punya catatan tentang beberapa anak yang pendiam dan tidak pernah bermasalah, karena perhatian tersedot ke anak-anak yang aktif.",
    actions: [
      "Buat daftar putar observasi: pastikan setiap anak mendapat giliran diamati dalam seminggu.",
      "Beri tanda centang pada daftar nama setiap kali Anda menuliskan catatan seorang anak, agar terlihat siapa yang belum.",
      "Sengaja duduk dan bermain bersama anak pendiam di waktu bermain bebas.",
      "Amati kekuatan yang tidak bersuara: ketekunan, kerapian, kepedulian pada teman.",
    ],
    exampleScripts: [
      "(kepada anak) Ibu boleh ikut duduk di sini? Wah, Ibu penasaran, ceritakan dong gambar Nisa ini.",
      "(contoh catatan) 14/8 - Nisa menyusun puzzle 12 keping sendiri sampai selesai, lalu merapikannya ke kotak tanpa diminta.",
    ],
    avoid: [
      "Menganggap anak pendiam pasti baik-baik saja sehingga tidak perlu diamati.",
      "Menilai anak pendiam hanya dari kurangnya masalah, bukan dari kekuatannya.",
      "Menulis laporan perkembangan berdasarkan kesan umum tanpa data.",
    ],
    escalation:
      "Jika setelah diamati lebih dekat ternyata seorang anak pendiam menunjukkan tanda-tanda yang mengkhawatirkan, misalnya tidak pernah berinteraksi sama sekali atau tampak sedih terus-menerus, sampaikan pengamatan faktual Anda kepada orang tua untuk ditindaklanjuti bersama.",
  },
  {
    slug: "observasi-menggunakan-hasil-untuk-rencana",
    title: "Menggunakan hasil observasi untuk merancang kegiatan",
    category: "Observasi",
    situation:
      "Guru rajin mencatat observasi anak, tetapi catatan hanya menumpuk di map dan tidak pernah memengaruhi kegiatan yang dirancang minggu berikutnya.",
    actions: [
      "Baca ulang catatan seminggu sekali dan tandai tiga temuan: minat anak, kemampuan yang muncul, dan kesulitan yang berulang.",
      "Rancang kegiatan berikutnya dari minat yang teramati, misalnya anak sedang gandrung serangga.",
      "Sesuaikan tingkat tantangan berdasar temuan: naikkan untuk yang sudah lancar, sederhanakan untuk yang kesulitan.",
      "Catat di rencana kegiatan: observasi mana yang menjadi dasarnya, agar siklusnya terlihat.",
      "Bagikan temuan menarik kepada orang tua sebagai cerita perkembangan positif.",
    ],
    exampleScripts: [
      "(kepada rekan guru) Minggu ini banyak anak berlama-lama mengamati semut di halaman. Minggu depan kita angkat tema serangga yuk.",
      "(kepada orang tua) Bu, Fikri minggu ini tekun sekali menuang air. Di rumah bisa dilanjutkan dengan membantu menuang minum keluarga.",
    ],
    avoid: [
      "Mengarsipkan catatan tanpa pernah dibaca ulang.",
      "Merancang kegiatan hanya dari buku panduan tanpa melihat kondisi nyata anak.",
      "Menggunakan hasil observasi untuk melabeli atau meranking anak.",
    ],
    escalation:
      "Jika Anda kesulitan menerjemahkan temuan observasi menjadi rencana kegiatan, minta sesi belajar bersama guru senior atau pengawas, dengan membawa contoh catatan dan rencana Anda untuk dibedah bersama.",
  },
];
