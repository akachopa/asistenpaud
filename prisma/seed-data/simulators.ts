import type { SimulatorSeed } from "./types";

export const simulators: SimulatorSeed[] = [
  {
    slug: "anak-menangis-saat-ditinggal-orang-tua",
    title: "Tangis di Pintu Kelas",
    description:
      "Seorang anak menangis keras saat ibunya berpamitan di pintu kelas pada minggu-minggu awal sekolah. Kamu harus menenangkan anak sekaligus memulai kegiatan pagi.",
    difficulty: "DASAR",
    ageContext: "Kelompok A, usia 4-5 tahun, 12 anak",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Pukul 07.45, anak-anak mulai duduk di karpet. Bima (4 tahun) berdiri di pintu sambil memeluk kaki ibunya dan menangis keras. Ibunya terlihat bingung, sementara beberapa anak lain mulai memperhatikan.",
        context: "Ini minggu kedua Bima bersekolah. Kemarin ia juga menangis, tapi berhenti setelah 10 menit.",
        choices: [
          {
            label:
              "Mendekat, berjongkok sejajar mata Bima, dan berkata, \"Bima sedih ya berpisah dengan Ibu. Tidak apa-apa, Bu Guru temani.\"",
            effect:
              "Bima masih menangis tapi mau menatapmu. Ibunya tampak lega dan bisa berpamitan dengan tenang. Tangisan Bima perlahan mengecil.",
            nextNodeId: "n2",
            scores: { empathy: 2, communication: 2 },
          },
          {
            label:
              "Langsung menggendong perhatian Bima ke mainan: \"Lihat, ada balok baru! Ayo main!\" tanpa menyinggung perasaannya.",
            effect:
              "Bima melirik mainan sebentar, lalu menangis lagi lebih keras karena perasaannya belum diakui. Ibunya jadi ragu untuk pergi.",
            nextNodeId: "n3",
            scores: { empathy: -1, classroomManagement: 1 },
          },
          {
            label:
              "Membisiki ibu Bima agar diam-diam pergi saat Bima lengah melihat temannya.",
            effect:
              "Ibu menyelinap pergi. Dua menit kemudian Bima menyadari ibunya hilang, panik, dan menangis histeris sambil berlari ke pintu. Kepercayaannya pada situasi sekolah menurun.",
            nextNodeId: "n3",
            scores: { empathy: -2, communication: -1, safety: -1 },
          },
          {
            label:
              "Membiarkan Bima menangis di dekat pintu sambil kamu memulai kegiatan, sesekali mengawasinya dari jauh.",
            effect:
              "Kegiatan pagi dimulai, tapi Bima menangis makin lama di pintu yang terbuka. Ia sempat melangkah keluar mengejar ibunya sehingga kamu harus berlari menyusul.",
            nextNodeId: "n3",
            scores: { safety: -2, empathy: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Bima mulai tenang tapi masih menggenggam tanganmu erat. Ia belum mau duduk di karpet. Sebelas anak lain sudah menunggu kegiatan pembukaan dimulai.",
        choices: [
          {
            label:
              "Mengajak Bima menjadi \"asisten Bu Guru\" untuk membagikan kartu nama teman-temannya.",
            effect:
              "Bima mengangguk pelan dan mulai membagikan kartu. Ia mendapat sapaan hangat dari teman-temannya dan lupa pada tangisnya. Kegiatan pagi dimulai hampir tepat waktu.",
            nextNodeId: "END",
            scores: { childAgency: 2, classroomManagement: 2, empathy: 1 },
          },
          {
            label:
              "Meminta guru pendamping menemani Bima di sudut baca, sementara kamu membuka kegiatan untuk anak lain.",
            effect:
              "Bima duduk dengan guru pendamping sambil melihat buku. Kelas berjalan lancar, dan setelah 5 menit Bima bergabung sendiri ke karpet.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, empathy: 1 },
          },
          {
            label:
              "Tetap menemani Bima berdua sampai ia benar-benar tenang, meskipun anak lain harus menunggu tanpa kegiatan.",
            effect:
              "Bima merasa aman, tapi anak-anak lain mulai bosan menunggu. Dua anak mulai berlarian dan suasana karpet jadi tidak teratur.",
            nextNodeId: "n4",
            scores: { empathy: 1, classroomManagement: -2 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Tangisan Bima makin keras. Dua anak lain mulai gelisah, dan satu anak bertanya, \"Bu, kenapa Bima nangis terus?\" Suasana pagi mulai terganggu.",
        choices: [
          {
            label:
              "Kembali ke Bima, mengakui perasaannya, lalu menawarkan duduk di \"kursi tenang\" dekat jendela sambil memegang foto keluarganya.",
            effect:
              "Bima terisak tapi mau digandeng ke kursi dekat jendela. Ia memeluk tasnya yang ada gantungan foto ibu. Tangisnya mereda perlahan.",
            nextNodeId: "n2",
            scores: { empathy: 2, communication: 1 },
          },
          {
            label:
              "Menjanjikan stiker bintang kalau Bima berhenti menangis sekarang.",
            effect:
              "Bima berhenti sebentar demi stiker, tapi lima menit kemudian menangis lagi karena perasaannya belum selesai. Besoknya ia menagih stiker sebelum mau masuk kelas.",
            nextNodeId: "n4",
            scores: { pedagogy: -2, empathy: -1 },
          },
          {
            label:
              "Meminta ibu Bima masuk kembali dan menemani Bima sepanjang kegiatan pagi ini.",
            effect:
              "Bima langsung tenang di pangkuan ibunya, tapi ia menolak melakukan apa pun tanpa ibu. Beberapa anak lain mulai bertanya kenapa ibu mereka tidak boleh masuk.",
            nextNodeId: "n4",
            scores: { empathy: 1, classroomManagement: -1, pedagogy: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Kegiatan pembukaan terlambat 15 menit. Beberapa anak berlarian di karpet, dan Bima masih rewel. Kamu perlu mengembalikan suasana pagi.",
        choices: [
          {
            label:
              "Memulai lagu pembuka favorit kelas dengan tepuk tangan berirama, sambil mengajak Bima duduk tepat di sampingmu.",
            effect:
              "Anak-anak langsung merespons lagu yang mereka kenal dan kembali ke karpet. Bima ikut bertepuk pelan sambil duduk menempel padamu. Suasana pagi pulih.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, empathy: 1, pedagogy: 1 },
          },
          {
            label:
              "Menegur kelas dengan suara keras: \"Semua duduk! Kalau ribut, tidak ada main di luar!\"",
            effect:
              "Anak-anak duduk karena takut, tapi suasana jadi tegang. Bima kembali terisak mendengar suara keras, dan beberapa anak jadi pasif sepanjang kegiatan.",
            nextNodeId: "END",
            scores: { communication: -2, empathy: -2, classroomManagement: 1 },
          },
          {
            label:
              "Memberi Bima peran memegang boneka kelas, lalu membuka kegiatan dengan menyapa boneka bersama-sama.",
            effect:
              "Anak-anak antusias menyapa boneka, dan Bima merasa penting karena memegangnya. Perhatian kelas kembali terkumpul dengan cara yang menyenangkan.",
            nextNodeId: "END",
            scores: { childAgency: 2, classroomManagement: 1, pedagogy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: validasi perasaan anak sejajar mata sebelum mengalihkan, biarkan orang tua berpamitan secara terbuka, lalu beri anak peran kecil agar merasa memiliki tempat di kelas. Pisahkan kebutuhan anak yang menangis dari kebutuhan kelas dengan bantuan rekan guru bila ada.",
    debriefRisky:
      "Hindari meminta orang tua menyelinap pergi (merusak rasa aman), menyuap dengan hadiah agar tangis berhenti, atau meninggalkan anak menangis sendirian dekat pintu terbuka. Suara keras untuk menertibkan kelas menenangkan sesaat tapi menumbuhkan rasa takut.",
  },
  {
    slug: "dua-anak-berebut-mainan-balok",
    title: "Rebutan Balok Merah",
    description:
      "Dua anak menarik balok yang sama dan mulai berteriak. Kamu harus menengahi konflik tanpa memihak sekaligus melatih keterampilan sosial mereka.",
    difficulty: "DASAR",
    ageContext: "Kelompok A, usia 4-5 tahun, 14 anak, sesi bermain bebas",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Saat bermain bebas, Raka dan Dodi sama-sama menarik satu balok merah panjang. Keduanya berteriak \"Punyaku duluan!\" Wajah keduanya mulai memerah dan tarik-menarik makin kencang.",
        choices: [
          {
            label:
              "Mendekat dengan tenang, meletakkan tangan di antara mereka, dan berkata, \"Bu Guru pegang dulu baloknya. Ceritakan satu-satu, apa yang terjadi?\"",
            effect:
              "Kedua anak melepaskan balok dan mulai bicara bergantian meski masih kesal. Situasi fisik mereda dan kamu punya ruang untuk memfasilitasi.",
            nextNodeId: "n2",
            scores: { safety: 2, communication: 2, empathy: 1 },
          },
          {
            label:
              "Mengambil balok itu dan menyimpannya: \"Kalau rebutan, baloknya Bu Guru simpan. Tidak ada yang main.\"",
            effect:
              "Kedua anak berhenti bertengkar tapi sama-sama merasa dihukum. Raka merajuk di pojok dan Dodi menyalahkan Raka. Masalah berbaginya tidak terselesaikan.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, pedagogy: -1, childAgency: -2 },
          },
          {
            label:
              "Memutuskan cepat: \"Dodi kan sudah main balok dari tadi, sekarang giliran Raka.\"",
            effect:
              "Raka senang, tapi Dodi merasa diperlakukan tidak adil karena kamu tidak bertanya dulu. Ternyata Dodi baru saja mengambil balok itu dari rak. Dodi menangis keras.",
            nextNodeId: "n3",
            scores: { communication: -1, empathy: -1, classroomManagement: 1 },
          },
          {
            label:
              "Mengamati dulu dari jarak dekat tanpa langsung campur tangan, siap melerai bila mulai fisik.",
            effect:
              "Sesaat kamu berharap mereka selesai sendiri, tapi Dodi mendorong Raka hingga terjatuh ke belakang. Raka menangis dan anak-anak lain berkerumun.",
            nextNodeId: "n4",
            scores: { childAgency: 1, safety: -2 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Raka berkata ia mengambil balok itu lebih dulu untuk membuat jembatan. Dodi bilang ia membutuhkan balok panjang untuk menyelesaikan menaranya. Keduanya menatapmu menunggu keputusan.",
        choices: [
          {
            label:
              "Bertanya kepada keduanya: \"Kira-kira bagaimana caranya supaya kalian berdua bisa pakai balok ini?\"",
            effect:
              "Setelah hening sejenak, Raka mengusulkan membangun jembatan yang tersambung ke menara Dodi. Dodi setuju dengan antusias. Mereka bermain bersama dengan satu bangunan gabungan.",
            nextNodeId: "END",
            scores: { childAgency: 2, communication: 2, pedagogy: 2 },
          },
          {
            label:
              "Menawarkan aturan giliran dengan jam pasir: \"Raka lima menit dulu, lalu ganti Dodi.\"",
            effect:
              "Keduanya menerima karena aturan terasa adil dan terlihat jelas. Dodi menunggu sambil sesekali melirik jam pasir, lalu gilirannya berjalan lancar.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, communication: 1 },
          },
          {
            label:
              "Mengalihkan Dodi ke balok lain: \"Dodi, lihat! Balok biru ini juga panjang, sama bagusnya.\"",
            effect:
              "Dodi menerima balok biru dengan wajah cemberut karena merasa kalah. Sepuluh menit kemudian ia diam-diam mengambil balok merah saat Raka ke toilet, dan konflik pecah lagi.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, empathy: -1, childAgency: -1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Konflik memanas lagi. Dodi menangis kencang dan Raka memeluk balok sambil membelakangi Dodi. Anak-anak lain berhenti bermain dan memperhatikan.",
        choices: [
          {
            label:
              "Menenangkan Dodi dulu, mengakui kekesalannya, lalu mengajak keduanya duduk bersama mencari jalan keluar.",
            effect:
              "Dodi tenang setelah perasaannya diakui. Dalam obrolan singkat, keduanya sepakat bergiliran dengan hitungan yang mereka tentukan sendiri. Anak lain kembali bermain.",
            nextNodeId: "END",
            scores: { empathy: 2, communication: 1, childAgency: 1 },
          },
          {
            label:
              "Memisahkan keduanya ke area bermain yang berbeda sampai sesi selesai.",
            effect:
              "Pertengkaran berhenti karena mereka tidak lagi bertemu. Namun keduanya tidak belajar menyelesaikan konflik, dan Dodi masih menyimpan kesal saat pulang.",
            nextNodeId: "END",
            scores: { classroomManagement: 1, pedagogy: -1, empathy: -1 },
          },
          {
            label:
              "Meminta Raka mengalah karena Dodi menangis: \"Raka kan anak baik, kasih ke Dodi ya.\"",
            effect:
              "Raka menyerahkan balok dengan wajah kecewa. Anak-anak menangkap pesan bahwa menangis keras adalah cara mendapatkan barang. Besoknya beberapa anak menangis saat menginginkan mainan.",
            nextNodeId: "END",
            scores: { pedagogy: -2, empathy: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Raka terjatuh dan menangis sambil memegang sikunya. Dodi terlihat kaget dengan perbuatannya sendiri. Anak-anak lain berkerumun dan suasana ramai.",
        choices: [
          {
            label:
              "Memeriksa siku Raka dengan tenang, memastikan tidak ada cedera, lalu meminta anak lain kembali bermain sebelum menangani Dodi.",
            effect:
              "Siku Raka hanya merah, tidak luka. Kerumunan bubar setelah diarahkan. Kamu kini bisa bicara dengan kedua anak tanpa penonton.",
            nextNodeId: "n5",
            scores: { safety: 2, classroomManagement: 1 },
          },
          {
            label:
              "Langsung menegur Dodi di depan semua anak: \"Dodi nakal! Minta maaf sekarang!\"",
            effect:
              "Dodi menunduk malu di depan teman-temannya dan mengucapkan maaf tanpa makna. Raka masih menangis karena sikunya belum diperiksa. Anak-anak lain mulai memberi label Dodi \"anak nakal\".",
            nextNodeId: "n5",
            scores: { empathy: -2, safety: -1, communication: -1 },
          },
          {
            label:
              "Menggendong Raka ke ruang UKS sambil meminta guru pendamping mengawasi kelas dan menemani Dodi.",
            effect:
              "Raka diperiksa dan hanya perlu kompres dingin. Kelas tetap terawasi. Namun Dodi menunggu lama dengan perasaan bersalah tanpa ada yang mengajaknya bicara.",
            nextNodeId: "n5",
            scores: { safety: 2, empathy: -1 },
          },
        ],
      },
      {
        id: "n5",
        scene:
          "Raka sudah tenang. Dodi berdiri canggung di dekat rak balok, sesekali melirik Raka. Sesi bermain tinggal 10 menit lagi.",
        choices: [
          {
            label:
              "Memfasilitasi keduanya bicara: \"Dodi, lihat wajah Raka. Menurutmu apa yang bisa membuat Raka merasa lebih baik?\"",
            effect:
              "Dodi mengambil bantal kecil untuk Raka dan berkata pelan, \"Maaf ya.\" Raka mengangguk dan mengajak Dodi menyelesaikan menara bersama. Keduanya belajar memperbaiki hubungan, bukan sekadar mengucap maaf.",
            nextNodeId: "END",
            scores: { empathy: 2, communication: 2, pedagogy: 2 },
          },
          {
            label:
              "Meminta Dodi duduk terpisah sampai sesi selesai sebagai konsekuensi mendorong.",
            effect:
              "Dodi duduk sendiri sambil memandangi teman-temannya bermain. Ia merasa dibuang, dan tidak ada pembelajaran tentang cara memperbaiki kesalahan.",
            nextNodeId: "END",
            scores: { pedagogy: -1, empathy: -2, classroomManagement: 1 },
          },
          {
            label:
              "Mengumpulkan semua anak sebentar dan membahas aturan \"tangan untuk membantu, bukan mendorong\" tanpa menyebut nama.",
            effect:
              "Anak-anak menyimak dan beberapa mengangguk. Dodi tampak lega tidak dipermalukan. Namun percakapan personal antara Raka dan Dodi belum terjadi.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, communication: 1, pedagogy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: amankan situasi fisik dulu, dengarkan versi kedua anak, lalu fasilitasi mereka menemukan solusi sendiri (membangun bersama, bergiliran dengan penanda waktu). Setelah insiden fisik, prioritaskan pemeriksaan cedera lalu bantu anak memperbaiki hubungan secara bermakna.",
    debriefRisky:
      "Hindari memutuskan sepihak tanpa bertanya, menyita mainan sebagai hukuman kolektif, memaksa satu anak \"mengalah\" karena tangisan, atau mempermalukan anak di depan teman. Membiarkan konflik fisik tanpa jarak siaga membahayakan anak.",
  },
  {
    slug: "anak-berkeliaran-saat-circle-time",
    title: "Naya Tidak Mau Duduk di Lingkaran",
    description:
      "Saat circle time, satu anak terus berdiri dan berjalan-jalan mengelilingi kelas. Kamu harus menjaga alur kegiatan sambil memahami kebutuhan gerak anak.",
    difficulty: "DASAR",
    ageContext: "Kelompok A, usia 4-5 tahun, 15 anak, circle time pagi",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Kamu sedang memimpin circle time tentang cuaca. Naya (4,5 tahun) berdiri dari karpet, berjalan ke rak mainan, lalu berkeliling di belakang lingkaran. Dua anak mulai menoleh mengikuti Naya alih-alih memperhatikanmu.",
        context: "Naya memang anak yang sangat aktif bergerak. Circle time baru berjalan 5 menit dari rencana 15 menit.",
        choices: [
          {
            label:
              "Tetap melanjutkan kegiatan sambil memberi Naya isyarat tangan ramah untuk kembali, tanpa menghentikan cerita.",
            effect:
              "Naya melihat isyaratmu, tersenyum, tapi tetap berkeliling. Kelas masih terjaga karena kamu tidak berhenti, namun Naya kini mulai membuka rak mainan.",
            nextNodeId: "n2",
            scores: { classroomManagement: 1, communication: 1 },
          },
          {
            label:
              "Menghentikan kegiatan dan memanggil: \"Naya, ayo duduk. Semua teman menunggu kamu.\"",
            effect:
              "Naya duduk sebentar karena semua mata menatapnya, tapi wajahnya tidak nyaman. Dua menit kemudian ia berdiri lagi, dan kali ini beberapa anak ikut berdiri meniru.",
            nextNodeId: "n3",
            scores: { classroomManagement: -1, empathy: -1 },
          },
          {
            label:
              "Menyisipkan gerakan dalam kegiatan: \"Semua berdiri! Kita jadi pohon yang ditiup angin!\" lalu duduk kembali bersama-sama.",
            effect:
              "Seluruh kelas bergerak dengan gembira, termasuk Naya yang langsung bergabung. Setelah menggerakkan badan, sebagian besar anak duduk kembali lebih tenang.",
            nextNodeId: "n2",
            scores: { pedagogy: 2, classroomManagement: 2, empathy: 1 },
          },
          {
            label:
              "Membiarkan Naya berkeliling sepenuhnya selama ia tidak mengganggu, dan fokus pada anak-anak di lingkaran.",
            effect:
              "Naya berkeliling makin jauh sampai ke dekat pintu kelas yang setengah terbuka. Kamu harus memutus kegiatan mendadak untuk menghampirinya.",
            nextNodeId: "n3",
            scores: { childAgency: 1, safety: -1, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Kegiatan berlanjut, tapi Naya kembali gelisah. Ia memainkan ujung karpet, lalu berdiri lagi dan berputar-putar di tempat. Anak-anak lain masih cukup fokus padamu.",
        choices: [
          {
            label:
              "Memberi Naya peran bergerak: menjadi \"petugas cuaca\" yang berjalan ke jendela untuk melihat langit dan melapor ke teman-teman.",
            effect:
              "Naya berlari kecil ke jendela dengan bangga dan melapor, \"Langitnya biru, ada awan!\" Kebutuhan geraknya tersalurkan dalam kegiatan, dan kelas justru makin hidup.",
            nextNodeId: "END",
            scores: { childAgency: 2, pedagogy: 2, classroomManagement: 1 },
          },
          {
            label:
              "Mengajak Naya duduk di pangkuanmu agar ia tidak berkeliaran lagi.",
            effect:
              "Naya mau dipangku dan tenang sesaat, tapi anak lain mulai minta dipangku juga. Kamu kesulitan memimpin kegiatan sambil memangku, dan Naya tetap menggeliat ingin bergerak.",
            nextNodeId: "n3",
            scores: { empathy: 1, classroomManagement: -1 },
          },
          {
            label:
              "Memberikan Naya bantal duduk bertekstur dan menempatkannya di tepi lingkaran dekat guru.",
            effect:
              "Naya sibuk merasakan tekstur bantal sambil tetap duduk. Ia bertahan di lingkaran sampai kegiatan selesai, meski sesekali bergoyang-goyang.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, empathy: 1, pedagogy: 1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Situasi melebar: tiga anak lain ikut berdiri dan berjalan-jalan meniru Naya. Circle time terancam bubar padahal materi belum selesai.",
        choices: [
          {
            label:
              "Mengubah format kegiatan menjadi permainan gerak terstruktur: \"Cuaca cerah, semua jalan! Hujan, semua jongkok berteduh!\"",
            effect:
              "Semua anak, termasuk Naya, larut dalam permainan yang mengikuti aba-abamu. Materi cuaca tetap tersampaikan lewat gerak, dan kamu kembali memegang kendali kelas.",
            nextNodeId: "END",
            scores: { pedagogy: 2, classroomManagement: 2, childAgency: 1 },
          },
          {
            label:
              "Menegakkan aturan: semua yang berdiri diminta duduk kembali dan circle time diperpanjang sampai semua tenang.",
            effect:
              "Anak-anak duduk dengan enggan. Circle time molor 10 menit dan anak-anak makin gelisah karena dipaksa diam lebih lama dari kemampuan mereka.",
            nextNodeId: "END",
            scores: { classroomManagement: -1, pedagogy: -2 },
          },
          {
            label:
              "Mempersingkat circle time, menutup dengan satu lagu, lalu beralih ke kegiatan bermain yang lebih aktif.",
            effect:
              "Anak-anak menyanyi dengan senang lalu pindah kegiatan. Materi cuaca belum tuntas, tapi kamu mencatat untuk melanjutkannya besok dengan format lebih pendek.",
            nextNodeId: "END",
            scores: { classroomManagement: 1, pedagogy: 1, empathy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: pahami bahwa anak usia dini punya rentang duduk terbatas. Salurkan kebutuhan gerak lewat peran aktif, sisipan gerak dalam kegiatan, atau alat bantu duduk. Menyesuaikan durasi kegiatan dengan kondisi anak adalah bentuk kepekaan pedagogis, bukan kegagalan.",
    debriefRisky:
      "Hindari memanggil nama anak di depan kelas dengan nada menyalahkan, memaksa duduk lebih lama sebagai \"konsekuensi\", atau membiarkan anak berkeliaran hingga dekat pintu tanpa pengawasan. Anak aktif bukan anak nakal.",
  },
  {
    slug: "anak-tidak-mau-ikut-kegiatan-melukis",
    title: "Salsa Menolak Melukis",
    description:
      "Saat kegiatan melukis dengan jari, satu anak menolak ikut dan hanya duduk memeluk lutut. Kamu harus menghormati pilihan anak sambil tetap membuka pintu partisipasi.",
    difficulty: "MENENGAH",
    ageContext: "Kelompok B, usia 5-6 tahun, 13 anak, kegiatan seni",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Semua anak antusias mencelupkan jari ke cat warna, kecuali Salsa. Ia duduk di kursinya memeluk lutut dan menggeleng saat diajak. Ini kali ketiga Salsa menolak kegiatan yang melibatkan tangan kotor.",
        choices: [
          {
            label:
              "Duduk di sampingnya dan bertanya pelan, \"Salsa, ceritakan ke Bu Guru, apa yang membuat Salsa tidak mau ikut?\"",
            effect:
              "Salsa diam sebentar, lalu berbisik, \"Tanganku nanti kotor, lengket.\" Kamu jadi tahu alasan sebenarnya: ia tidak nyaman dengan tekstur cat, bukan tidak suka melukis.",
            nextNodeId: "n2",
            scores: { empathy: 2, communication: 2 },
          },
          {
            label:
              "Memegang tangan Salsa dan mencelupkannya ke cat sambil tersenyum: \"Coba dulu, pasti seru!\"",
            effect:
              "Salsa menjerit dan menarik tangannya, lalu menangis sambil mengusap-usap jarinya ke baju. Ia menjauh dari meja seni dan menolak mendekat lagi.",
            nextNodeId: "n3",
            scores: { childAgency: -2, empathy: -2, safety: -1 },
          },
          {
            label:
              "Membiarkannya: \"Ya sudah, Salsa duduk saja kalau tidak mau,\" lalu fokus mendampingi anak-anak lain.",
            effect:
              "Salsa duduk sendirian sepanjang kegiatan sambil memandangi teman-temannya. Ia tidak terganggu, tapi juga tidak mendapat jalan masuk untuk mencoba. Pola menghindarnya makin kuat.",
            nextNodeId: "n3",
            scores: { childAgency: 1, pedagogy: -1, empathy: -1 },
          },
          {
            label:
              "Mengumumkan ke kelas: \"Ayo semangati Salsa! Sal-sa! Sal-sa!\" agar ia termotivasi ikut.",
            effect:
              "Semua mata tertuju pada Salsa. Wajahnya memerah dan ia menunduk makin dalam, lalu menutup wajah dengan kedua tangan. Sorakan justru membuatnya merasa tertekan.",
            nextNodeId: "n3",
            scores: { empathy: -2, communication: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Kamu tahu Salsa tidak nyaman dengan rasa lengket di tangan. Ia masih duduk, tapi kini matanya memperhatikan teman-temannya melukis. Ada sedikit rasa ingin tahu di wajahnya.",
        choices: [
          {
            label:
              "Menawarkan alat perantara: \"Mau coba melukis pakai kuas atau cotton bud? Tanganmu tidak akan kena cat.\"",
            effect:
              "Mata Salsa berbinar. Ia mengambil kuas dan mulai melukis dengan hati-hati. Di akhir kegiatan, ia bahkan berani menyentuh cat dengan satu ujung jari atas kemauannya sendiri.",
            nextNodeId: "END",
            scores: { childAgency: 2, pedagogy: 2, empathy: 2 },
          },
          {
            label:
              "Memberi peran lain dulu: \"Salsa bantu Bu Guru menyiapkan kertas untuk teman-teman ya, sambil lihat-lihat.\"",
            effect:
              "Salsa membagikan kertas dan mengamati teman-temannya dari dekat. Ia belum melukis hari ini, tapi ia tetap terlibat dan mendekat ke meja seni tanpa tekanan.",
            nextNodeId: "END",
            scores: { childAgency: 1, empathy: 1, classroomManagement: 1 },
          },
          {
            label:
              "Menantangnya perlahan: \"Coba satu jari saja dulu, kalau tidak suka boleh langsung cuci tangan.\"",
            effect:
              "Salsa ragu-ragu lama, lalu mencoba satu jari dan langsung berlari mencuci tangan. Ia tidak mau mencoba lagi, tapi ia tahu pengalaman itu bisa diakhiri kapan pun ia mau.",
            nextNodeId: "n4",
            scores: { childAgency: 1, pedagogy: 1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Salsa kini benar-benar menutup diri. Ia duduk membelakangi meja seni. Sementara itu dua anak di meja seni mulai saling mencoret tangan dengan cat dan butuh perhatianmu juga.",
        choices: [
          {
            label:
              "Menenangkan dua anak di meja seni dulu dengan arahan singkat, lalu kembali ke Salsa dengan tawaran tanpa tekanan.",
            effect:
              "Meja seni kembali tertib. Kamu duduk diam di dekat Salsa tanpa memaksa, dan perlahan ia mau menoleh ke arah kegiatan lagi.",
            nextNodeId: "n4",
            scores: { classroomManagement: 2, empathy: 1 },
          },
          {
            label:
              "Fokus penuh membujuk Salsa karena merasa bersalah, sementara meja seni dibiarkan sebentar.",
            effect:
              "Saat kamu membujuk Salsa, dua anak di meja seni sudah mencoret meja dan lantai dengan cat. Kamu kini menghadapi dua masalah sekaligus dan Salsa tetap belum mau ikut.",
            nextNodeId: "n4",
            scores: { classroomManagement: -2, empathy: 1 },
          },
          {
            label:
              "Mencatat dalam hati bahwa Salsa \"memang begitu anaknya\" dan melanjutkan kegiatan tanpa rencana tindak lanjut.",
            effect:
              "Kegiatan selesai tanpa insiden baru, tapi kamu kehilangan kesempatan memahami kebutuhan Salsa. Penolakannya kemungkinan terulang di kegiatan serupa berikutnya.",
            nextNodeId: "END",
            scores: { pedagogy: -2, empathy: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Kegiatan melukis hampir selesai. Salsa belum benar-benar ikut melukis hari ini, tapi suasananya sudah lebih tenang. Kamu memikirkan langkah untuk hari-hari berikutnya.",
        choices: [
          {
            label:
              "Merencanakan paparan bertahap: besok menyediakan kegiatan tekstur yang lebih ringan (spons, stempel) dan mengomunikasikan pengamatanmu ke orang tua Salsa.",
            effect:
              "Dalam beberapa hari, Salsa mulai berani dengan stempel kentang karena tangannya tetap kering. Orang tuanya juga bercerita Salsa memang sensitif tekstur di rumah, sehingga kalian bisa selaras.",
            nextNodeId: "END",
            scores: { pedagogy: 2, empathy: 1, communication: 1 },
          },
          {
            label:
              "Menuliskan di catatan kelas bahwa Salsa \"kurang berpartisipasi\" dan perlu dipaksa lebih tegas besok.",
            effect:
              "Besoknya pendekatan tegas membuat Salsa menangis sejak awal kegiatan seni. Penolakannya meluas: kini ia juga menolak kegiatan playdough.",
            nextNodeId: "END",
            scores: { pedagogy: -2, empathy: -2, childAgency: -1 },
          },
          {
            label:
              "Mengajak Salsa melihat hasil karya teman-teman dan bertanya karya mana yang ia suka.",
            effect:
              "Salsa menunjuk lukisan kupu-kupu dan tersenyum. Ia pulang dengan perasaan tetap positif terhadap kegiatan seni, meski hari ini belum mencoba.",
            nextNodeId: "END",
            scores: { empathy: 2, communication: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: cari tahu alasan di balik penolakan sebelum bertindak. Tawarkan jalan masuk bertahap (alat perantara, peran pengamat, kesempatan berhenti kapan saja) dan rencanakan paparan bertahap lintas hari. Libatkan orang tua untuk memahami anak secara utuh.",
    debriefRisky:
      "Hindari memaksa kontak fisik dengan hal yang membuat anak tidak nyaman, menyoraki anak di depan kelas, atau melabeli anak \"tidak mau berpartisipasi\" tanpa menggali penyebab. Membiarkan tanpa tindak lanjut sama saja menutup pintu belajar anak.",
  },
  {
    slug: "gunting-tidak-cukup-untuk-semua-anak",
    title: "Gunting Hanya Ada Delapan",
    description:
      "Kegiatan menggunting sudah dimulai, tapi gunting hanya ada 8 untuk 16 anak. Kamu harus mengelola keterbatasan alat tanpa membuat anak lama menganggur.",
    difficulty: "MENENGAH",
    ageContext: "Kelompok B, usia 5-6 tahun, 16 anak, kegiatan motorik halus",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Kamu baru sadar gunting anak hanya tersedia 8 buah, sementara ada 16 anak yang sudah duduk siap menggunting pola daun. Beberapa anak mulai berebut mengambil gunting dari keranjang.",
        choices: [
          {
            label:
              "Menghentikan sejenak, lalu membagi kelas jadi dua kelompok: satu menggunting, satu merobek kertas bebas untuk kolase, lalu bertukar.",
            effect:
              "Anak-anak menerima karena kedua kegiatan sama-sama menyenangkan. Rotasi berjalan cukup rapi, meski kamu harus mengatur waktu tukar dengan cermat.",
            nextNodeId: "n2",
            scores: { classroomManagement: 2, pedagogy: 2 },
          },
          {
            label:
              "Meminta anak berpasangan berbagi satu gunting: satu menggunting, satu memegang kertas, lalu bergantian.",
            effect:
              "Beberapa pasangan bekerja sama dengan baik, tapi tiga pasangan mulai bertengkar karena pembagian giliran tidak jelas. Kamu harus berkeliling menengahi.",
            nextNodeId: "n3",
            scores: { pedagogy: 1, childAgency: 1, classroomManagement: -1 },
          },
          {
            label:
              "Membiarkan siapa cepat dia dapat, sisanya menunggu giliran sampai temannya selesai.",
            effect:
              "Delapan anak menggunting, delapan lainnya menganggur tanpa kegiatan. Anak yang menunggu mulai berlarian dan mengganggu yang sedang memegang gunting, situasi jadi berisiko.",
            nextNodeId: "n4",
            scores: { safety: -2, classroomManagement: -2 },
          },
          {
            label:
              "Mengganti kegiatan sepenuhnya menjadi merobek dan meremas kertas, gunting disimpan untuk lain kali.",
            effect:
              "Semua anak bisa langsung bekerja dengan tangan mereka. Namun beberapa anak yang sudah menantikan menggunting kecewa dan bertanya-tanya kenapa guntingnya disimpan.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, pedagogy: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Rotasi kelompok berjalan. Namun kelompok perobek kertas selesai lebih cepat, dan mereka mulai bosan menunggu giliran gunting. Sisa waktu kegiatan 20 menit.",
        choices: [
          {
            label:
              "Menambahkan tugas lanjutan bermakna: kelompok perobek mulai menyusun dan menempel robekan mereka menjadi kolase pohon.",
            effect:
              "Anak-anak larut menyusun kolase sambil menunggu giliran. Saat waktu tukar tiba, kedua kelompok berpindah tanpa keributan karena semua selalu punya kegiatan.",
            nextNodeId: "END",
            scores: { pedagogy: 2, classroomManagement: 2 },
          },
          {
            label:
              "Mempercepat waktu tukar: kelompok gunting diminta berhenti sekarang meski belum selesai.",
            effect:
              "Kelompok gunting protes karena pola daunnya baru setengah jadi. Beberapa anak kesal dan menolak menyerahkan gunting, kamu harus menegosiasi ulang.",
            nextNodeId: "n3",
            scores: { classroomManagement: -1, empathy: -1 },
          },
          {
            label:
              "Meminta kelompok yang selesai membantu membereskan sisa kertas dan menghitung robekan bersama.",
            effect:
              "Sebagian anak mau membantu, tapi kegiatannya terasa seperti pengisi waktu. Beberapa anak tetap melipir ke area gunting dan mengganggu temannya.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, pedagogy: -1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Muncul gesekan kecil di beberapa titik: ada anak yang merasa gilirannya diserobot, ada yang menunggu terlalu lama. Suara protes mulai terdengar dari dua meja.",
        choices: [
          {
            label:
              "Membuat penanda giliran yang terlihat: kartu nama ditata berurutan di meja, siapa selesai meletakkan gunting di depan kartu berikutnya.",
            effect:
              "Anak-anak bisa melihat sendiri kapan gilirannya tiba dan protes mereda. Beberapa anak bahkan mengingatkan temannya dengan menunjuk urutan kartu, bukan berteriak.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, communication: 2, childAgency: 1 },
          },
          {
            label:
              "Mengumumkan bahwa yang protes paling keras akan mendapat giliran paling akhir.",
            effect:
              "Kelas hening karena takut, tapi anak yang benar-benar diserobot gilirannya merasa tidak didengar. Ia memendam kesal dan menolak melanjutkan karyanya.",
            nextNodeId: "END",
            scores: { communication: -2, empathy: -2, classroomManagement: 1 },
          },
          {
            label:
              "Berkeliling menyelesaikan protes satu per satu sambil kegiatan berjalan.",
            effect:
              "Beberapa protes selesai, tapi kamu kewalahan karena masalah muncul lebih cepat daripada kecepatanmu berkeliling. Sistemnya sendiri belum berubah.",
            nextNodeId: "n4",
            scores: { empathy: 1, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Situasi butuh penataan ulang: ada anak menganggur, ada yang memegang gunting sambil berjalan-jalan mendekati temannya. Keselamatan mulai jadi perhatian utama.",
        choices: [
          {
            label:
              "Menghentikan kelas sebentar dengan tepukan berpola, menetapkan aturan \"gunting hanya di meja\", lalu menata ulang giliran dan kegiatan penunggu.",
            effect:
              "Anak-anak merespons tepukan yang mereka kenal dan kegiatan ditata ulang dalam dua menit. Gunting kembali hanya digunakan sambil duduk, dan setiap anak tahu tugasnya.",
            nextNodeId: "END",
            scores: { safety: 2, classroomManagement: 2, communication: 1 },
          },
          {
            label:
              "Mengambil semua gunting dan mengakhiri kegiatan lebih awal demi keamanan.",
            effect:
              "Risiko gunting hilang, tapi anak yang sedang asyik berkarya kecewa berat. Sisa waktu diisi menunggu tanpa kegiatan jelas dan kelas tetap riuh.",
            nextNodeId: "END",
            scores: { safety: 2, pedagogy: -2, empathy: -1 },
          },
          {
            label:
              "Menegur keras anak yang berjalan membawa gunting di depan semua temannya.",
            effect:
              "Anak itu kaget, menunduk, dan meletakkan gunting. Pesan keselamatan tersampaikan tapi dengan rasa malu, dan anak-anak lain tetap tidak tahu aturan yang seharusnya.",
            nextNodeId: "END",
            scores: { safety: 1, empathy: -2, communication: -1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: keterbatasan alat bisa diubah jadi desain kegiatan (rotasi dua kelompok dengan tugas setara, penanda giliran yang terlihat anak). Pastikan setiap anak selalu punya kegiatan bermakna, dan tegakkan aturan keselamatan alat secara jelas tanpa mempermalukan.",
    debriefRisky:
      "Hindari sistem \"siapa cepat dia dapat\" yang menciptakan penunggu menganggur, mengancam anak yang protes, atau menyita alat mendadak tanpa memberi kegiatan pengganti. Anak memegang gunting sambil berjalan adalah risiko yang harus segera dihentikan dengan tenang.",
  },
  {
    slug: "aktivitas-selesai-lebih-cepat-dari-rencana",
    title: "Masih Ada 20 Menit Kosong",
    description:
      "Kegiatan inti yang direncanakan 30 menit ternyata selesai dalam 10 menit. Kamu harus mengisi sisa waktu dengan bermakna tanpa persiapan tambahan.",
    difficulty: "DASAR",
    ageContext: "Kelompok B, usia 5-6 tahun, 15 anak",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Kegiatan menyusun puzzle bentuk yang kamu rencanakan 30 menit ternyata terlalu mudah; hampir semua anak selesai dalam 10 menit. Anak-anak mulai berteriak \"Sudah selesai, Bu!\" dan beberapa mulai jalan-jalan. Jadwal berikutnya masih 20 menit lagi.",
        choices: [
          {
            label:
              "Memperdalam kegiatan yang sama: menantang anak menyusun puzzle dengan cara baru, misalnya sambil menceritakan bentuk apa yang mereka buat.",
            effect:
              "Sebagian anak tertantang dan mulai bereksperimen, tapi sekitar lima anak sudah benar-benar bosan dengan puzzle dan tetap mencari kegiatan lain.",
            nextNodeId: "n2",
            scores: { pedagogy: 2, childAgency: 1 },
          },
          {
            label:
              "Mengisi waktu dengan permainan tanpa alat yang dikenal anak: tebak gerak binatang bersama-sama.",
            effect:
              "Anak-anak berkumpul dengan cepat karena permainannya familiar dan seru. Energi kelas tersalurkan, dan waktu terisi tanpa kamu perlu menyiapkan apa pun.",
            nextNodeId: "n3",
            scores: { classroomManagement: 2, pedagogy: 1 },
          },
          {
            label:
              "Meminta anak duduk tenang di karpet menunggu jadwal berikutnya sambil kamu menyiapkan kegiatan selanjutnya.",
            effect:
              "Menunggu 20 menit terlalu lama untuk anak usia dini. Dalam tiga menit karpet berubah jadi arena gulat kecil dan kamu harus meninggalkan persiapanmu.",
            nextNodeId: "n4",
            scores: { classroomManagement: -2, pedagogy: -2 },
          },
          {
            label:
              "Membuka waktu bermain bebas di sudut-sudut kelas sampai jadwal berikutnya.",
            effect:
              "Anak-anak menyebar ke sudut balok, buku, dan peran. Sebagian besar bermain tenang, tapi sudut balok jadi terlalu penuh karena delapan anak memilih tempat yang sama.",
            nextNodeId: "n2",
            scores: { childAgency: 2, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Sebagian anak sudah punya kegiatan, tapi ada satu titik kepadatan: terlalu banyak anak berkumpul di satu area dan mulai senggol-senggolan. Beberapa anak lain masih mondar-mandir tanpa arah.",
        choices: [
          {
            label:
              "Menawarkan pilihan yang jelas kepada anak yang mondar-mandir: \"Mau bergabung ke sudut buku atau membantu Bu Guru menyiapkan meja makan siang?\"",
            effect:
              "Anak-anak memilih dan menyebar lebih merata. Dua anak dengan bangga membantu menata gelas, merasa dipercaya melakukan tugas sungguhan.",
            nextNodeId: "END",
            scores: { childAgency: 2, classroomManagement: 2 },
          },
          {
            label:
              "Menetapkan batas jumlah di area padat: \"Sudut balok cukup empat anak, yang lain pilih giliran berikutnya.\"",
            effect:
              "Beberapa anak pindah dengan patuh, tapi dua anak menolak keluar dan berdebat siapa yang datang duluan. Kamu harus menengahi sebentar sebelum suasana pulih.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, communication: 1 },
          },
          {
            label:
              "Membiarkan kepadatan itu karena anak-anak tampak senang, sambil mengawasi dari meja guru.",
            effect:
              "Tak lama, menara balok roboh tersenggol dan menimpa kaki seorang anak. Ia menangis, dan kamu menyesal tidak mengatur kepadatan sejak awal.",
            nextNodeId: "n4",
            scores: { safety: -2, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Suasana kelas kembali terkendali dan waktu tersisa sekitar 8 menit. Anak-anak masih bersemangat, dan kamu ingin menutup jeda ini dengan rapi sebelum kegiatan berikutnya.",
        choices: [
          {
            label:
              "Menutup dengan refleksi ringan: anak-anak duduk melingkar dan bergantian menceritakan satu hal yang mereka buat atau mainkan tadi.",
            effect:
              "Anak-anak antusias bercerita meski singkat-singkat. Transisi ke kegiatan berikutnya berjalan halus karena mereka sudah duduk tenang dalam lingkaran.",
            nextNodeId: "END",
            scores: { pedagogy: 2, communication: 2, childAgency: 1 },
          },
          {
            label:
              "Memakai sisa waktu untuk lagu dan tepuk transisi, lalu langsung mengarahkan ke kegiatan berikutnya.",
            effect:
              "Anak-anak bernyanyi sambil membereskan mainan. Perpindahan kegiatan berjalan cepat dan tanpa keributan.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, pedagogy: 1 },
          },
          {
            label:
              "Membiarkan anak bermain sampai detik terakhir agar puas, lalu meminta mereka berhenti mendadak saat jadwal tiba.",
            effect:
              "Saat diminta berhenti tiba-tiba, banyak anak protes karena permainannya tanggung. Transisi jadi lambat dan dua anak menolak membereskan mainan.",
            nextNodeId: "END",
            scores: { classroomManagement: -1, empathy: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Ada anak menangis dan suasana sempat kacau. Anak-anak lain berkerumun ingin tahu. Waktu jeda masih tersisa dan kamu harus memulihkan keadaan.",
        choices: [
          {
            label:
              "Menenangkan dan memeriksa anak yang menangis, lalu mengalihkan anak lain ke permainan tepuk sambil kamu menangani situasi.",
            effect:
              "Anak yang menangis tenang setelah diperiksa dan dipeluk. Anak-anak lain sibuk dengan permainan tepuk sehingga tidak berkerumun. Keadaan pulih bertahap.",
            nextNodeId: "END",
            scores: { safety: 2, empathy: 2, classroomManagement: 1 },
          },
          {
            label:
              "Meminta semua anak duduk diam di kursi masing-masing tanpa kegiatan sampai jadwal berikutnya sebagai cara menenangkan kelas.",
            effect:
              "Kelas hening sesaat, tapi anak-anak yang tidak bersalah merasa bingung kenapa harus diam. Kegelisahan menumpuk dan pecah lagi saat kegiatan berikutnya dimulai.",
            nextNodeId: "END",
            scores: { classroomManagement: -1, empathy: -1, pedagogy: -1 },
          },
          {
            label:
              "Mengajak seluruh kelas duduk melingkar, memeriksa anak yang menangis di tengah, dan berbicara singkat tentang bermain dengan aman.",
            effect:
              "Anak yang menangis merasa diperhatikan, dan anak lain memahami apa yang terjadi tanpa saling menyalahkan. Kelas tenang, meski pemeriksaan di tengah lingkaran membuat anak itu sedikit jengah ditonton.",
            nextNodeId: "END",
            scores: { safety: 1, communication: 1, empathy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: selalu punya \"kantong kegiatan\" tanpa alat (permainan gerak, tebak-tebakan, lagu) untuk waktu sisa. Perdalam kegiatan yang ada, beri pilihan yang jelas, dan tutup jeda dengan refleksi atau transisi berirama. Waktu kosong tanpa struktur adalah undangan kekacauan.",
    debriefRisky:
      "Hindari meminta anak menunggu diam dalam waktu lama, membiarkan satu area terlalu padat tanpa pengaturan, atau menghentikan permainan secara mendadak tanpa aba-aba transisi. Menghukum seluruh kelas karena satu insiden membuat anak bingung dan tidak adil.",
  },
  {
    slug: "kelas-terlalu-berisik-saat-kegiatan",
    title: "Volume Kelas Naik Terus",
    description:
      "Suara kelas naik perlahan sampai instruksimu tidak terdengar lagi. Kamu harus menurunkan volume tanpa ikut berteriak dan tanpa mematikan semangat anak.",
    difficulty: "MENENGAH",
    ageContext: "Kelompok B, usia 5-6 tahun, 18 anak, kegiatan kelompok",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Anak-anak bekerja dalam empat kelompok membuat kandang dari balok. Awalnya seru, tapi kini semua kelompok berbicara makin keras untuk saling mengalahkan suara. Kamu memanggil dua kali dan tidak ada yang mendengar.",
        choices: [
          {
            label:
              "Menggunakan sinyal senyap yang sudah dilatih: mengangkat tangan sambil menyalakan lampu kedip mainan di meja guru.",
            effect:
              "Anak-anak yang melihat sinyal ikut mengangkat tangan dan menyenggol temannya. Dalam satu menit hampir semua anak hening sambil mengangkat tangan, tanpa kamu mengeluarkan suara.",
            nextNodeId: "n2",
            scores: { classroomManagement: 2, communication: 2 },
          },
          {
            label:
              "Berteriak lebih keras dari anak-anak: \"SEMUANYA DIAAAM!\"",
            effect:
              "Kelas kaget dan hening dua detik, lalu riuh kembali karena anak belajar bahwa berteriak adalah cara berkomunikasi di kelas ini. Tenggorokanmu mulai sakit.",
            nextNodeId: "n3",
            scores: { communication: -2, classroomManagement: -1 },
          },
          {
            label:
              "Mendekati satu kelompok paling riuh dan berbicara sangat pelan pada mereka, berharap kelompok lain penasaran dan ikut menurunkan suara.",
            effect:
              "Kelompok yang kamu dekati menurunkan suara untuk mendengarmu, dan dua kelompok terdekat ikut melirih. Namun kelompok terjauh masih berisik karena tidak menyadari perubahan.",
            nextNodeId: "n2",
            scores: { communication: 1, classroomManagement: 1 },
          },
          {
            label:
              "Mematikan lampu kelas mendadak agar semua anak berhenti.",
            effect:
              "Kelas hening seketika, tapi dua anak yang takut gelap langsung menangis. Kamu mendapat perhatian kelas dengan harga rasa aman beberapa anak.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, safety: -1, empathy: -2 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Kelas sudah lebih tenang dan memperhatikanmu. Sekarang kamu perlu memastikan volume tidak naik lagi begitu kegiatan kelompok dilanjutkan.",
        choices: [
          {
            label:
              "Mengajak anak menyepakati \"suara semut\" untuk kerja kelompok dan menunjuk satu anak per kelompok sebagai \"penjaga suara\".",
            effect:
              "Anak-anak senang mendapat peran penjaga suara dan saling mengingatkan dengan isyarat jari di bibir. Volume kelas naik-turun tapi selalu kembali terkendali oleh mereka sendiri.",
            nextNodeId: "END",
            scores: { childAgency: 2, classroomManagement: 2, communication: 1 },
          },
          {
            label:
              "Menjelaskan ulang aturan volume dengan contoh: memperagakan bedanya suara semut, suara bicara, dan suara lapangan.",
            effect:
              "Anak-anak menirukan ketiga jenis suara sambil tertawa, lalu memahami suara mana yang dipakai sekarang. Kegiatan dilanjutkan dengan volume yang jauh lebih wajar.",
            nextNodeId: "END",
            scores: { communication: 2, pedagogy: 1, classroomManagement: 1 },
          },
          {
            label:
              "Melanjutkan kegiatan langsung tanpa membahas volume, karena kelas sudah tenang.",
            effect:
              "Lima menit pertama aman, tapi tanpa kesepakatan baru volume kembali naik seperti semula. Kamu harus mengulang proses menenangkan dari awal.",
            nextNodeId: "n3",
            scores: { classroomManagement: -1, pedagogy: -1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Volume kembali tinggi dan kini bercampur: ada yang berteriak senang, ada yang mulai berteriak kesal karena balok kelompoknya diambil kelompok lain. Situasi butuh penanganan menyeluruh.",
        choices: [
          {
            label:
              "Menghentikan kegiatan dengan tepuk berpola, mengumpulkan anak di karpet, membahas singkat apa yang terjadi, lalu memulai ulang dengan aturan suara dan pembagian balok yang jelas.",
            effect:
              "Anak-anak mengikuti tepuk dan berkumpul. Setelah aturan disepakati ulang, kegiatan berjalan jauh lebih tertib dan konflik balok selesai dengan pembagian per kelompok.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, communication: 2, pedagogy: 1 },
          },
          {
            label:
              "Menghukum kelas: kegiatan balok dihentikan dan diganti duduk tenang karena kelas tidak bisa diatur.",
            effect:
              "Anak-anak yang bermain dengan baik ikut kehilangan kegiatannya dan merasa tidak adil. Beberapa anak menyalahkan kelompok yang berisik, muncul saling tuduh.",
            nextNodeId: "END",
            scores: { pedagogy: -2, empathy: -1, classroomManagement: 1 },
          },
          {
            label:
              "Menurunkan volume lewat aktivitas fisik singkat: semua berdiri, menggerakkan badan mengikuti hitungan, ditutup dengan tarik napas bersama, lalu lanjut bekerja.",
            effect:
              "Energi berlebih anak tersalur dan napas bersama menurunkan tempo kelas. Volume turun signifikan, meski konflik balok antar kelompok masih perlu kamu selesaikan terpisah.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, pedagogy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: gunakan sinyal senyap yang sudah dilatih, bukan suara yang lebih keras. Setelah tenang, bangun kesepakatan volume bersama anak dan beri mereka peran menjaga kesepakatan itu. Aktivitas fisik singkat dan napas bersama efektif menurunkan tempo kelas.",
    debriefRisky:
      "Hindari berteriak melebihi anak (mengajarkan bahwa suara keras adalah alat komunikasi), mematikan lampu yang bisa menakutkan sebagian anak, dan menghukum seluruh kelas atas keriuhan sebagian. Menenangkan tanpa membangun kesepakatan hanya menunda keriuhan berikutnya.",
  },
  {
    slug: "anak-menumpahkan-air-di-lantai-kelas",
    title: "Gelas Tumpah di Tengah Kelas",
    description:
      "Seorang anak tidak sengaja menumpahkan segelas air di lantai saat kegiatan minum bersama. Kamu harus mengamankan area licin sekaligus menjaga perasaan anak.",
    difficulty: "DASAR",
    ageContext: "Kelompok A, usia 4-5 tahun, 12 anak, jeda minum",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Saat jeda minum, Fatir menyenggol gelasnya dan air tumpah melebar di lantai keramik. Fatir membeku dengan mata berkaca-kaca. Dua anak di dekatnya berdiri hendak berlari melewati genangan itu.",
        choices: [
          {
            label:
              "Segera mengamankan area: \"Teman-teman, berhenti dulu, lantai licin!\" sambil merentangkan tangan, lalu menoleh ke Fatir dengan tenang, \"Tidak apa-apa, tumpah bisa dibereskan.\"",
            effect:
              "Kedua anak berhenti sebelum menginjak genangan. Fatir masih tegang tapi tidak jadi menangis karena nada suaramu tenang. Area licin terkendali.",
            nextNodeId: "n2",
            scores: { safety: 2, empathy: 2, communication: 1 },
          },
          {
            label:
              "Langsung mengambil lap dan membereskan tumpahan sendiri secepat mungkin tanpa berkata apa-apa.",
            effect:
              "Lantai cepat kering, tapi Fatir menafsirkan diammu sebagai kemarahan dan mulai menangis. Anak-anak lain sempat berjalan mendekati area basah sebelum kamu selesai.",
            nextNodeId: "n3",
            scores: { safety: 1, empathy: -1, communication: -1 },
          },
          {
            label:
              "Menegur refleks: \"Fatir! Makanya pegang gelasnya yang benar!\"",
            effect:
              "Fatir menangis keras karena merasa dimarahi di depan teman-teman untuk hal yang tidak disengaja. Beberapa anak ikut berkomentar \"Fatir tumpah, Fatir tumpah,\" dan air belum diamankan.",
            nextNodeId: "n3",
            scores: { empathy: -2, communication: -2, safety: -1 },
          },
          {
            label:
              "Meminta Fatir mengambil lap dan membereskan tumpahannya sendiri sekarang juga.",
            effect:
              "Fatir berjalan mengambil lap sambil menahan tangis, merasa dihukum. Sementara ia berjalan, genangan tidak dijaga siapa pun dan seorang anak hampir terpeleset.",
            nextNodeId: "n3",
            scores: { childAgency: 1, safety: -2, empathy: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Area sudah aman dan anak-anak menjauh dari genangan. Fatir berdiri di sampingmu, masih tampak merasa bersalah. Lap dan ember ada di sudut kelas.",
        choices: [
          {
            label:
              "Mengajak Fatir membereskan bersama: \"Ayo kita lap sama-sama. Fatir pegang lap yang ini, Bu Guru yang itu.\"",
            effect:
              "Fatir mengelap dengan sungguh-sungguh dan wajahnya berubah lega. Ia belajar bertanggung jawab tanpa merasa dihukum, dan lantai kering dengan cepat.",
            nextNodeId: "END",
            scores: { childAgency: 2, empathy: 1, pedagogy: 2 },
          },
          {
            label:
              "Membereskan sendiri dan meminta Fatir duduk kembali agar tidak menghambat.",
            effect:
              "Lantai bersih, tapi Fatir kehilangan kesempatan belajar memperbaiki keadaan. Ia duduk sambil sesekali melirikmu dengan cemas, tidak yakin apakah kamu marah.",
            nextNodeId: "END",
            scores: { classroomManagement: 1, childAgency: -1, pedagogy: -1 },
          },
          {
            label:
              "Mengubahnya jadi pelajaran kelas: mengajak anak-anak melihat proses mengelap dan bertanya \"Kenapa lantai basah harus segera dilap?\"",
            effect:
              "Anak-anak menjawab bergantian, \"Nanti kepleset!\" Fatir ikut menjawab dan tidak lagi jadi pusat kesalahan, melainkan bagian dari diskusi. Pesan keselamatan tertanam ke semua anak.",
            nextNodeId: "END",
            scores: { pedagogy: 2, communication: 2, safety: 1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Fatir menangis dan suasana jeda minum jadi kacau. Genangan air masih ada, dan anak-anak lain mulai berkerumun sambil berkomentar.",
        choices: [
          {
            label:
              "Meminta anak-anak mundur ke karpet dengan aba-aba jelas, mengamankan genangan dengan kursi sebagai penanda, lalu memeluk dan menenangkan Fatir.",
            effect:
              "Kerumunan bubar dan tidak ada yang mendekati area licin. Fatir tenang dalam pelukanmu setelah kamu berbisik bahwa tumpah adalah hal yang bisa terjadi pada siapa saja.",
            nextNodeId: "n2",
            scores: { safety: 2, empathy: 2, classroomManagement: 1 },
          },
          {
            label:
              "Menenangkan Fatir lebih dulu sampai benar-benar berhenti menangis, baru mengurus genangan.",
            effect:
              "Fatir perlahan tenang, tapi selama itu genangan terbuka tanpa penanda. Seorang anak terpeleset dan terduduk; untung tidak cedera, hanya kaget dan celananya basah.",
            nextNodeId: "n4",
            scores: { empathy: 2, safety: -2 },
          },
          {
            label:
              "Menghentikan komentar anak-anak dengan menegur mereka satu per satu agar berhenti mengejek Fatir.",
            effect:
              "Komentar berhenti, tapi prosesnya lama dan genangan tetap tidak diamankan. Fatir masih menangis karena kebutuhan utamanya, merasa aman, belum terpenuhi.",
            nextNodeId: "n4",
            scores: { communication: 1, safety: -1, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Ada anak lain yang terdampak (terpeleset atau ikut menangis). Jeda minum sudah melewati waktunya dan kegiatan berikutnya menunggu.",
        choices: [
          {
            label:
              "Memeriksa anak yang terpeleset dengan tenang, mengeringkan lantai tuntas, lalu mengumpulkan kelas dengan lagu sebelum lanjut kegiatan.",
            effect:
              "Anak yang terpeleset baik-baik saja setelah diperiksa dan diganti celananya. Lantai kering, kelas berkumpul dengan lagu, dan kegiatan berikutnya dimulai dengan suasana pulih.",
            nextNodeId: "END",
            scores: { safety: 2, classroomManagement: 2 },
          },
          {
            label:
              "Melanjutkan langsung ke kegiatan berikutnya agar jadwal tidak makin molor, pembersihan menyusul nanti.",
            effect:
              "Kegiatan dimulai tapi lantai masih setengah basah di satu sudut. Kamu terus waswas mengawasi area itu dan tidak bisa fokus memimpin kegiatan.",
            nextNodeId: "END",
            scores: { safety: -2, classroomManagement: -1 },
          },
          {
            label:
              "Meminta guru pendamping menangani lantai dan anak yang basah, sementara kamu memulihkan suasana kelas dan menemani Fatir.",
            effect:
              "Pembagian tugas berjalan efektif: lantai aman, anak yang basah diganti bajunya, dan Fatir kembali tenang di sisimu. Kelas siap melanjutkan kegiatan.",
            nextNodeId: "END",
            scores: { safety: 2, classroomManagement: 2, empathy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: amankan area licin lebih dulu dengan aba-aba jelas, sampaikan pada anak bahwa tumpah bukan kesalahan besar, lalu libatkan anak membereskan bersama sebagai pembelajaran tanggung jawab. Tumpahan bisa jadi momen belajar keselamatan untuk seluruh kelas.",
    debriefRisky:
      "Hindari memarahi anak untuk ketidaksengajaan, menyuruh anak membereskan sendirian sebagai hukuman, atau sibuk menenangkan sampai lupa mengamankan genangan. Lantai basah tanpa penanda adalah risiko terpeleset yang nyata.",
  },
  {
    slug: "anak-mengganggu-teman-saat-kegiatan",
    title: "Rafa Terus Mengusili Temannya",
    description:
      "Seorang anak berulang kali mencolek, mengambil pensil, dan merusak konsentrasi teman di sebelahnya. Kamu harus menghentikan gangguan sambil mencari tahu apa yang sebenarnya dibutuhkan anak itu.",
    difficulty: "MENENGAH",
    ageContext: "Kelompok B, usia 5-6 tahun, 16 anak, kegiatan menggambar",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Saat kegiatan menggambar, Rafa berulang kali mencolek lengan Zahra, menarik kertasnya, dan menyembunyikan pensilnya sambil tertawa. Zahra mulai merengek, \"Bu, Rafa ganggu terus!\" Ini kali ketiga dalam 15 menit.",
        context: "Kertas gambar Rafa sendiri masih kosong sejak tadi.",
        choices: [
          {
            label:
              "Mendekati Rafa dan mengamati sejenak, lalu bertanya pelan, \"Rafa, Bu Guru lihat kertasmu masih kosong. Bingung mau menggambar apa?\"",
            effect:
              "Rafa terdiam, lalu mengangguk kecil. Ternyata ia mengusili teman karena tidak tahu harus mulai dari mana. Kamu menemukan akar masalahnya.",
            nextNodeId: "n2",
            scores: { empathy: 2, pedagogy: 2, communication: 1 },
          },
          {
            label:
              "Menegur dari jauh: \"Rafa, jangan ganggu Zahra! Kalau diulang lagi, pindah tempat!\"",
            effect:
              "Rafa berhenti sebentar, tapi karena akar masalahnya tidak tersentuh, dua menit kemudian ia mengusili anak di sisi lainnya. Ancamanmu kini harus ditindaklanjuti atau kehilangan makna.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, empathy: -1, pedagogy: -1 },
          },
          {
            label:
              "Langsung memindahkan Rafa ke meja paling depan dekat guru tanpa berbicara dengannya dulu.",
            effect:
              "Gangguan pada Zahra berhenti, tapi Rafa merasa dibuang dan duduk sambil melipat tangan menolak menggambar. Beberapa anak berbisik, \"Rafa dihukum.\"",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, empathy: -2, childAgency: -1 },
          },
          {
            label:
              "Meminta Zahra pindah tempat menjauh dari Rafa supaya tidak diganggu lagi.",
            effect:
              "Zahra pindah dengan bingung; ia yang diganggu tapi ia yang harus pindah. Rafa kini duduk sendiri tanpa kegiatan dan mulai melempar-lempar penghapus ke udara.",
            nextNodeId: "n3",
            scores: { empathy: -1, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Rafa mengaku bingung mau menggambar apa. Ia memandangi kertas kosongnya sambil memutar-mutar pensil. Zahra sudah kembali tenang menggambar.",
        choices: [
          {
            label:
              "Membuka ide lewat obrolan: \"Tadi pagi Rafa ke sekolah naik apa? Coba ceritakan, nanti kita gambar sama-sama bagian pertamanya.\"",
            effect:
              "Rafa bersemangat bercerita tentang naik ojek bersama ayahnya, lalu mulai menggambar roda. Setelah bagian pertama jadi, ia melanjutkan sendiri dengan asyik dan berhenti mengusili teman.",
            nextNodeId: "END",
            scores: { pedagogy: 2, childAgency: 2, empathy: 1 },
          },
          {
            label:
              "Memberi contoh gambar untuk ditiru: menggambarkan rumah sederhana di kertasnya agar ia tinggal melanjutkan.",
            effect:
              "Rafa menebalkan garis gambarmu tanpa banyak berpikir. Ia sibuk dan berhenti mengganggu, tapi karya itu bukan idenya dan ia cepat bosan setelah selesai menebalkan.",
            nextNodeId: "n4",
            scores: { classroomManagement: 1, childAgency: -1 },
          },
          {
            label:
              "Memintanya meminta maaf dulu kepada Zahra sebelum dibantu menggambar.",
            effect:
              "Rafa meminta maaf dengan suara pelan dan Zahra mengangguk. Hubungan mereka membaik, tapi Rafa masih menatap kertas kosong menunggu bantuanmu yang tertunda.",
            nextNodeId: "n4",
            scores: { communication: 1, empathy: 1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Gangguan Rafa berlanjut dengan sasaran baru. Beberapa anak mulai kesal dan seorang anak balas mendorong tangan Rafa. Suasana meja itu memanas.",
        choices: [
          {
            label:
              "Duduk di samping Rafa, memisahkan tangan kedua anak dengan lembut, lalu mengajak Rafa bicara empat mata tentang apa yang ia rasakan dan butuhkan.",
            effect:
              "Dari obrolan singkat, Rafa mengaku bosan karena tidak tahu mau menggambar apa. Kamu akhirnya menemukan akar masalah yang sejak tadi terlewat.",
            nextNodeId: "n2",
            scores: { empathy: 2, communication: 2, safety: 1 },
          },
          {
            label:
              "Memberi Rafa konsekuensi yang sudah diucapkan: pindah duduk di meja terpisah sampai kegiatan selesai.",
            effect:
              "Rafa pindah sambil menggerutu. Gangguan berhenti, tapi ia menghabiskan sisa kegiatan tanpa menggambar apa pun, dan besok pola yang sama kemungkinan terulang.",
            nextNodeId: "n4",
            scores: { classroomManagement: 1, pedagogy: -1, empathy: -1 },
          },
          {
            label:
              "Mengumumkan pada kelas bahwa yang mengganggu teman tidak akan dapat giliran bermain di luar.",
            effect:
              "Kelas hening dan Rafa menunduk malu karena semua tahu ancaman itu untuknya. Ia berhenti mengganggu hari ini, tapi mulai dijauhi beberapa teman yang takut kena hukuman karena duduk dekatnya.",
            nextNodeId: "n4",
            scores: { empathy: -2, communication: -1, classroomManagement: 1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Kegiatan menggambar memasuki 10 menit terakhir. Rafa sudah tidak mengganggu, tapi keterlibatannya dalam kegiatan masih rendah. Kamu ingin menutup dengan langkah yang mencegah pola ini terulang.",
        choices: [
          {
            label:
              "Memberi Rafa tugas bermakna di akhir: menjadi \"kurator\" yang membantu mengumpulkan dan memajang gambar teman-temannya, sambil menyebut satu hal menarik dari tiap karya.",
            effect:
              "Rafa berkeliling dengan bangga, memuji gambar teman-temannya dengan caranya sendiri. Ia mendapat interaksi sosial positif yang sebenarnya ia cari sejak tadi, tanpa harus mengusili.",
            nextNodeId: "END",
            scores: { childAgency: 2, empathy: 1, pedagogy: 2 },
          },
          {
            label:
              "Mencatat perilaku Rafa untuk dibicarakan dengan orang tuanya sebagai laporan anak yang suka mengganggu.",
            effect:
              "Orang tua Rafa menerima laporan bernada negatif tanpa konteks kebutuhan anaknya. Di rumah Rafa dimarahi, dan keesokan harinya ia datang ke sekolah dengan wajah murung.",
            nextNodeId: "END",
            scores: { empathy: -2, communication: -1, pedagogy: -1 },
          },
          {
            label:
              "Mengakhiri kegiatan seperti biasa dan berencana mengamati Rafa lebih dekat besok: kapan gangguan muncul, pada kegiatan apa, dan apa pemicunya.",
            effect:
              "Hari ini selesai tanpa insiden baru. Rencana observasimu besok memberi data: Rafa mengganggu terutama saat kegiatan yang menuntut ide mandiri, temuan berharga untuk penyesuaian caramu membuka kegiatan.",
            nextNodeId: "END",
            scores: { pedagogy: 2, empathy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: perilaku mengganggu sering merupakan sinyal kebutuhan (bingung, bosan, mencari interaksi). Amati dulu, tanya dengan hangat, dan bantu anak masuk ke kegiatan lewat pijakan seperti obrolan pembuka ide. Beri peran sosial positif sebagai saluran energinya.",
    debriefRisky:
      "Hindari menghukum atau memindahkan anak tanpa memahami penyebab, mengancam di depan kelas hingga anak dijauhi teman, atau memindahkan justru anak yang diganggu. Melaporkan ke orang tua dengan label negatif tanpa konteks bisa berujung anak dimarahi di rumah.",
  },
  {
    slug: "anak-bertanya-di-luar-topik",
    title: "\"Bu, Kenapa Kucingku Mati?\"",
    description:
      "Di tengah kegiatan tema tanaman, seorang anak tiba-tiba bertanya tentang kucingnya yang mati. Kamu harus menghargai pertanyaan penting itu tanpa kehilangan arah kegiatan.",
    difficulty: "DASAR",
    ageContext: "Kelompok B, usia 5-6 tahun, 14 anak, circle time tema tanaman",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Kamu sedang menjelaskan cara menanam biji kacang hijau. Tiba-tiba Alif mengangkat tangan dan bertanya dengan wajah serius, \"Bu Guru, kenapa kucingku kemarin mati?\" Beberapa anak langsung menoleh, menunggu jawabanmu.",
        choices: [
          {
            label:
              "Menerima pertanyaannya dengan hangat: \"Alif kehilangan kucingnya, pasti sedih ya. Nanti setelah kegiatan, Bu Guru mau dengar ceritanya.\"",
            effect:
              "Alif mengangguk, merasa pertanyaannya dihargai. Kelas kembali fokus ke biji kacang hijau, dan Alif tampak menunggu janji ceritamu dengan tenang.",
            nextNodeId: "n2",
            scores: { empathy: 2, communication: 2, classroomManagement: 1 },
          },
          {
            label:
              "Menjawab langsung dan lengkap saat itu juga tentang kematian hewan, meninggalkan topik tanaman.",
            effect:
              "Pertanyaan Alif terjawab, tapi diskusi melebar: anak-anak lain bergantian bercerita tentang hewan mereka yang mati. Lima belas menit berlalu dan biji kacang hijau belum tersentuh.",
            nextNodeId: "n3",
            scores: { empathy: 1, communication: 1, classroomManagement: -2 },
          },
          {
            label:
              "Mengalihkan cepat: \"Itu nanti saja ya. Sekarang kita sedang belajar tanaman, ayo fokus.\"",
            effect:
              "Alif menunduk dan tidak mengangkat tangan lagi sepanjang kegiatan. Pertanyaan yang penting baginya terasa ditolak, dan ia tampak murung memikirkan kucingnya sendirian.",
            nextNodeId: "n3",
            scores: { empathy: -2, communication: -1, classroomManagement: 1 },
          },
          {
            label:
              "Menghubungkan pertanyaannya dengan topik: \"Pertanyaan bagus, Alif. Makhluk hidup, seperti kucing dan tanaman, memang ada masanya hidup dan mati. Nah, hari ini kita justru akan menumbuhkan hidup baru dari biji!\"",
            effect:
              "Anak-anak terpukau dengan hubungan itu dan makin penasaran pada biji kacang hijau. Alif merasa pertanyaannya berharga, meski kesedihannya tentang kucing belum sempat ditampung penuh.",
            nextNodeId: "n2",
            scores: { pedagogy: 2, communication: 2, empathy: 1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Kegiatan menanam berjalan lancar. Saat anak-anak mengisi gelas plastik dengan kapas basah, Alif mendekatimu dan berkata pelan, \"Bu, aku kangen kucingku.\" Matanya mulai berkaca-kaca.",
        choices: [
          {
            label:
              "Berjongkok, mendengarkan ceritanya sebentar, dan memvalidasi: \"Kangen itu tandanya Alif sayang sekali sama kucingnya. Boleh ceritakan kucingmu seperti apa?\"",
            effect:
              "Alif bercerita tentang kucingnya yang suka tidur di sandalnya, sambil sesekali tersenyum. Setelah dua menit, ia kembali ke mejanya dengan lega dan melanjutkan menanam.",
            nextNodeId: "END",
            scores: { empathy: 2, communication: 2 },
          },
          {
            label:
              "Menawarkan Alif menuangkan rasa sayangnya ke kegiatan: menanam biji ini spesial \"untuk mengenang kucingnya\" dan merawatnya setiap hari.",
            effect:
              "Mata Alif berbinar. Ia menanam bijinya dengan sangat hati-hati dan menamainya seperti nama kucingnya. Hari-hari berikutnya ia jadi anak yang paling rajin menyiram.",
            nextNodeId: "END",
            scores: { empathy: 2, pedagogy: 2, childAgency: 1 },
          },
          {
            label:
              "Menepuk pundaknya sambil berkata, \"Iya, nanti ceritanya ya, sekarang lanjutkan dulu menanamnya,\" karena anak lain sedang butuh bantuan menuang air.",
            effect:
              "Alif kembali ke mejanya dengan wajah datar. Kebutuhan anak lain memang nyata, tapi janji cerita yang tertunda dua kali membuat Alif berhenti berharap dan menyimpan kesedihannya sendiri.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, empathy: -1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Menjelang akhir kegiatan, Alif tampak murung dan tidak menyelesaikan tanamannya. Sisa waktu sekitar 10 menit sebelum kegiatan ditutup.",
        choices: [
          {
            label:
              "Menghampiri Alif, meminta maaf karena tadi belum sempat mendengarkan, lalu memberinya waktu bercerita sekarang.",
            effect:
              "Alif awalnya diam, lalu bercerita sambil terisak kecil. Setelah didengarkan, ia mau menyelesaikan tanamannya dengan bantuanmu. Kepercayaannya padamu pulih.",
            nextNodeId: "END",
            scores: { empathy: 2, communication: 2 },
          },
          {
            label:
              "Menutup kegiatan dengan cerita singkat untuk semua anak tentang menyayangi makhluk hidup, sambil duduk dekat Alif.",
            effect:
              "Anak-anak menyimak dan Alif merasa cerita itu untuknya. Ia belum bercerita langsung, tapi kesedihannya mendapat tempat dan ia pulang dengan perasaan lebih ringan.",
            nextNodeId: "END",
            scores: { pedagogy: 2, empathy: 1, communication: 1 },
          },
          {
            label:
              "Membiarkan Alif dengan suasananya karena anak biasanya lupa sendiri, dan fokus menutup kegiatan tepat waktu.",
            effect:
              "Kegiatan ditutup rapi, tapi Alif pulang dengan wajah murung. Sore harinya ibunya mengirim pesan bahwa Alif menangis di rumah karena merasa \"Bu Guru tidak mau dengar cerita kucingku.\"",
            nextNodeId: "END",
            scores: { empathy: -2, communication: -1, classroomManagement: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: pertanyaan di luar topik sering kali penting bagi anak. Akui dulu perasaannya, beri janji waktu yang benar-benar ditepati, atau jembatani pertanyaan ke topik bila memungkinkan. Kehilangan hewan peliharaan adalah duka nyata bagi anak dan layak didengarkan.",
    debriefRisky:
      "Hindari menolak pertanyaan anak dengan alasan \"bukan topiknya\", menunda janji berulang kali sampai anak berhenti berharap, atau membiarkan diskusi melebar tanpa kendali hingga kegiatan inti hilang. Jangan pula menganggap anak \"pasti lupa sendiri\".",
  },
  {
    slug: "anak-takut-suara-petir-di-kelas",
    title: "Petir Menggelegar, Dira Ketakutan",
    description:
      "Suara petir tiba-tiba membuat satu anak ketakutan hebat hingga menutup telinga dan menangis di bawah meja. Kamu harus menenangkan anak sambil menjaga suasana kelas.",
    difficulty: "MENENGAH",
    ageContext: "Kelompok A, usia 4-5 tahun, 13 anak, kegiatan meronce",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Langit tiba-tiba gelap dan petir menggelegar keras. Dira menjerit, menutup telinga, dan merangkak masuk ke bawah meja sambil menangis. Beberapa anak lain ikut tegang melihat reaksi Dira.",
        choices: [
          {
            label:
              "Mendekati meja Dira dengan tenang, duduk di lantai dekatnya tanpa memaksanya keluar, dan berkata lembut, \"Bu Guru di sini. Dira aman.\"",
            effect:
              "Dira masih menutup telinga tapi bergeser sedikit mendekatimu. Kehadiranmu yang tenang menjadi jangkar. Anak-anak lain melihat gurunya tidak panik, jadi mereka ikut tenang.",
            nextNodeId: "n2",
            scores: { empathy: 2, safety: 1, classroomManagement: 1 },
          },
          {
            label:
              "Menarik Dira keluar dari bawah meja agar tidak terbentur dan mendudukkannya di kursi.",
            effect:
              "Dira meronta dan menjerit lebih keras karena tempat persembunyiannya diambil paksa. Tangisannya memicu dua anak lain ikut menangis ketakutan.",
            nextNodeId: "n3",
            scores: { empathy: -2, childAgency: -2 },
          },
          {
            label:
              "Berkata pada seluruh kelas dengan nada ceria, \"Wah, suara petirnya keras ya! Tidak apa-apa, kita di dalam kelas, aman,\" sambil melanjutkan kegiatan.",
            effect:
              "Sebagian besar anak tenang mendengar penjelasanmu dan kembali meronce. Namun Dira masih di bawah meja sendirian, ketakutannya belum tertangani secara langsung.",
            nextNodeId: "n3",
            scores: { classroomManagement: 2, communication: 1, empathy: -1 },
          },
          {
            label:
              "Menertawakan situasi dengan ringan: \"Aduh, Dira, masa takut petir? Itu cuma suara, ayo keluar.\"",
            effect:
              "Beberapa anak ikut tertawa dan Dira makin menenggelamkan wajahnya sambil menangis. Rasa takutnya kini berlapis rasa malu di depan teman-teman.",
            nextNodeId: "n3",
            scores: { empathy: -2, communication: -2 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Dira mulai tenang di dekatmu, tapi masih gemetar dan menolak jauh darimu. Sementara itu, petir kembali menggelegar dan beberapa anak lain berlarian mendekat ke arahmu mencari rasa aman.",
        choices: [
          {
            label:
              "Mengumpulkan semua anak di karpet menjadi \"sarang aman\": duduk rapat bersama, lalu mengajak bernyanyi lagu yang berirama tenang sampai badai mereda.",
            effect:
              "Anak-anak duduk berdekatan dan suara nyanyian bersama menyamarkan gemuruh. Dira ikut bersenandung pelan di sisimu. Ketakutan berubah jadi pengalaman kebersamaan.",
            nextNodeId: "END",
            scores: { safety: 2, empathy: 2, classroomManagement: 2 },
          },
          {
            label:
              "Menjelaskan petir secara sederhana: \"Petir itu cahaya dan suara dari awan. Suaranya keras, tapi kita aman di dalam kelas.\"",
            effect:
              "Beberapa anak bertanya-tanya penasaran dan ketakutan berubah jadi rasa ingin tahu. Dira mendengarkan sambil masih memegang bajumu, sedikit lebih tenang karena hal menakutkan itu kini punya nama dan penjelasan.",
            nextNodeId: "END",
            scores: { pedagogy: 2, communication: 2, empathy: 1 },
          },
          {
            label:
              "Meminta anak-anak lain kembali ke tempat duduk masing-masing agar kegiatan meronce tetap jalan, sementara Dira tetap bersamamu.",
            effect:
              "Anak-anak kembali dengan ragu-ragu, sesekali menoleh ke jendela saat gemuruh terdengar. Kegiatan berjalan tapi terasa tegang, dan beberapa roncean berantakan karena tangan anak-anak gemetar.",
            nextNodeId: "n4",
            scores: { classroomManagement: 1, empathy: -1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Tangisan menular: kini tiga anak menangis dan beberapa anak lain memucat setiap kali gemuruh terdengar. Kegiatan meronce praktis terhenti.",
        choices: [
          {
            label:
              "Meredupkan ketegangan dengan tubuhmu sendiri: duduk di karpet, membuka lengan, dan mengajak semua anak merapat sambil bernapas bersama, \"Tarik napas... buang perlahan...\"",
            effect:
              "Anak-anak merapat dan meniru napasmu. Ritme bersama menenangkan sistem tubuh mereka; tangisan mereda satu per satu, termasuk Dira yang akhirnya keluar dari bawah meja sendiri.",
            nextNodeId: "n2",
            scores: { empathy: 2, safety: 2, classroomManagement: 1 },
          },
          {
            label:
              "Menutup semua gorden jendela agar kilat tidak terlihat, lalu menyalakan musik anak yang ceria dengan volume sedang.",
            effect:
              "Tanpa kilatan cahaya, pemicu visual berkurang dan musik menyamarkan gemuruh. Sebagian anak tenang, tapi dua anak masih menangis dan butuh kehadiran langsung, bukan hanya perubahan suasana.",
            nextNodeId: "n4",
            scores: { classroomManagement: 2, safety: 1 },
          },
          {
            label:
              "Meminta anak-anak yang tidak menangis untuk menghibur teman yang menangis, sementara kamu menata kembali kegiatan.",
            effect:
              "Niatnya bagus, tapi anak usia 4-5 tahun belum mampu menenangkan kepanikan temannya. Beberapa malah ikut cemas, dan anak yang menangis merasa gurunya menjauh saat mereka paling membutuhkan.",
            nextNodeId: "n4",
            scores: { empathy: -1, classroomManagement: -1, childAgency: 1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Badai mulai mereda tapi suasana kelas masih rapuh; sebagian anak tenang, sebagian masih waswas. Sisa waktu kegiatan sekitar 15 menit.",
        choices: [
          {
            label:
              "Mengganti sisa kegiatan dengan cerita bergambar yang menenangkan sambil semua duduk bersama di karpet, meronce dilanjutkan besok.",
            effect:
              "Anak-anak larut dalam cerita dan tubuh mereka rileks kembali. Saat pulang, suasana hati mereka sudah pulih dan beberapa anak bahkan bercerita ke penjemput bahwa tadi ada petir \"tapi kita aman\".",
            nextNodeId: "END",
            scores: { pedagogy: 2, empathy: 2, classroomManagement: 1 },
          },
          {
            label:
              "Melanjutkan meronce sesuai rencana agar target kegiatan hari ini tercapai.",
            effect:
              "Sebagian anak meronce dengan setengah hati dan hasilnya banyak yang berantakan. Target kegiatan tercapai di atas kertas, tapi kebutuhan emosional anak-anak hari ini terlewat.",
            nextNodeId: "END",
            scores: { pedagogy: -1, empathy: -1 },
          },
          {
            label:
              "Mengajak anak menggambar bebas tentang \"hujan dan petir\" bagi yang mau, sebagai cara menuangkan pengalaman tadi.",
            effect:
              "Banyak anak menggambar awan dengan garis-garis kilat sambil bercerita satu sama lain. Menggambar membantu mereka mengolah pengalaman menakutkan menjadi sesuatu yang bisa dibicarakan.",
            nextNodeId: "END",
            scores: { pedagogy: 2, childAgency: 2, empathy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: jadilah jangkar yang tenang, temani anak di tempat ia merasa aman tanpa memaksa, dan kelola ketakutan kolektif lewat kedekatan fisik, napas bersama, lagu, atau penjelasan sederhana. Beri anak saluran mengolah pengalaman, misalnya lewat menggambar atau cerita.",
    debriefRisky:
      "Hindari menarik paksa anak dari tempat persembunyiannya, menertawakan atau meremehkan rasa takut, dan menyerahkan tugas menenangkan kepanikan kepada sesama anak. Memaksakan target kegiatan saat kebutuhan emosional kelas belum pulih adalah prioritas yang terbalik.",
  },
  {
    slug: "hari-pertama-anak-baru-di-kelas",
    title: "Kenzo, Anak Baru yang Membisu",
    description:
      "Anak baru bergabung di tengah tahun ajaran. Ia tidak mau bicara, tidak mau lepas dari tasnya, dan berdiri kaku di pojok kelas. Kamu harus membantunya merasa aman tanpa memaksanya cepat beradaptasi.",
    difficulty: "MENENGAH",
    ageContext: "Kelompok B, usia 5-6 tahun, 15 anak (1 anak baru)",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Kenzo, murid baru pindahan, berdiri di pojok kelas sambil memeluk tas ranselnya. Ia menggeleng setiap diajak bicara dan menolak duduk. Beberapa anak mengerumuninya sambil bertanya-tanya, \"Namamu siapa? Kok diam saja?\"",
        choices: [
          {
            label:
              "Membubarkan kerumunan dengan halus: \"Teman-teman, Kenzo masih perlu waktu. Yuk kembali dulu, nanti kita berkenalan pelan-pelan.\" Lalu berdiri di dekat Kenzo tanpa menuntut apa pun.",
            effect:
              "Kerumunan bubar dan tekanan pada Kenzo berkurang drastis. Ia masih memeluk tasnya tapi bahunya mulai turun, tanda sedikit rileks. Ia melirik kegiatan kelas dari pojoknya.",
            nextNodeId: "n2",
            scores: { empathy: 2, classroomManagement: 2 },
          },
          {
            label:
              "Memperkenalkan Kenzo di depan kelas: memintanya maju, menyebutkan nama, dan disambut tepuk tangan.",
            effect:
              "Kenzo digiring ke depan dengan badan kaku. Ia menunduk, tidak mengeluarkan sepatah kata pun, dan matanya mulai berair. Tepuk tangan anak-anak justru terasa seperti sorotan yang menakutkan baginya.",
            nextNodeId: "n3",
            scores: { empathy: -2, childAgency: -1 },
          },
          {
            label:
              "Meminta tasnya disimpan di loker dulu sesuai aturan kelas, supaya ia bisa mengikuti kegiatan seperti teman lain.",
            effect:
              "Kenzo memeluk tasnya makin erat dan mundur ke dinding. Tas itu ternyata satu-satunya benda dari rumah yang membuatnya merasa aman, dan permintaanmu terasa seperti ancaman.",
            nextNodeId: "n3",
            scores: { empathy: -1, classroomManagement: 1, childAgency: -1 },
          },
          {
            label:
              "Menugaskan satu anak yang ramah, Laras, untuk menemani Kenzo hari ini sebagai \"sahabat pendamping\".",
            effect:
              "Laras duduk di dekat Kenzo dan mengajaknya bicara tanpa henti dengan niat baik. Kenzo sedikit kewalahan dengan ocehan Laras, tapi kehadiran teman sebaya membuat pojok itu terasa tidak terlalu asing.",
            nextNodeId: "n2",
            scores: { childAgency: 1, empathy: 1, classroomManagement: 1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Kenzo mulai mengamati kegiatan kelas dari pojoknya. Saat anak-anak bermain balok, matanya mengikuti dengan tertarik, tapi kakinya tetap tidak beranjak. Tasnya masih dipeluk erat.",
        choices: [
          {
            label:
              "Membawa beberapa balok ke dekat Kenzo dan mulai menyusunnya sendiri di lantai tanpa mengajaknya bicara, membiarkan permainan yang mengundang.",
            effect:
              "Setelah beberapa menit mengamati, Kenzo berjongkok dan meletakkan satu balok di susunanmu, masih tanpa bicara. Pintu masuknya terbuka lewat bermain, bukan lewat kata-kata.",
            nextNodeId: "n4",
            scores: { pedagogy: 2, empathy: 2, childAgency: 2 },
          },
          {
            label:
              "Mengajaknya langsung: \"Kenzo, ayo main balok sama teman-teman. Sini, Bu Guru antar.\"",
            effect:
              "Kenzo menggeleng dan memalingkan wajah. Ajakan langsung masih terlalu besar untuknya hari ini. Ia mundur setengah langkah ke pojok.",
            nextNodeId: "n3",
            scores: { communication: 1, empathy: -1 },
          },
          {
            label:
              "Membiarkan Kenzo mengamati sepanjang hari; besok-besok juga akan terbiasa sendiri.",
            effect:
              "Kenzo berdiri di pojok hampir dua jam tanpa satu pun jembatan interaksi. Saat dijemput, ia langsung berlari ke ibunya dan menangis. Ibunya khawatir dan bertanya apakah Kenzo diabaikan.",
            nextNodeId: "n3",
            scores: { empathy: -1, pedagogy: -2 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Kenzo makin menutup diri: ia kini duduk di pojok memeluk lutut dengan tas di pangkuan. Sesekali matanya berkaca-kaca. Jam istirahat hampir tiba.",
        choices: [
          {
            label:
              "Duduk di dekatnya dengan jarak nyaman, membuka buku bergambar, dan membacanya pelan untuk diri sendiri hingga Kenzo mulai melirik.",
            effect:
              "Rasa penasaran menang: Kenzo bergeser sedikit demi sedikit untuk melihat gambarnya. Kamu memiringkan buku ke arahnya tanpa berkomentar. Untuk pertama kalinya ia menunjuk sebuah gambar.",
            nextNodeId: "n4",
            scores: { empathy: 2, pedagogy: 2 },
          },
          {
            label:
              "Menelepon orang tuanya agar menjemput lebih awal karena Kenzo tampak belum siap sekolah.",
            effect:
              "Kenzo pulang lebih awal. Ia memang lega hari ini, tapi ia belajar bahwa menutup diri akan membuatnya dipulangkan, dan proses adaptasinya harus mulai dari nol lagi besok.",
            nextNodeId: "END",
            scores: { pedagogy: -2, empathy: 1 },
          },
          {
            label:
              "Membujuknya dengan camilan: \"Kalau Kenzo mau gabung, Bu Guru kasih biskuit.\"",
            effect:
              "Kenzo menerima biskuit tapi tetap di pojok. Rasa amannya tidak bisa dibeli dengan camilan, dan kini ia belajar bahwa diam di pojok pun mendapat biskuit.",
            nextNodeId: "n4",
            scores: { pedagogy: -1, empathy: 1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Ada kemajuan kecil: Kenzo mulai merespons lewat gerakan, meski belum bicara. Hari sekolah tinggal satu jam lagi, dan kamu ingin menutup hari pertamanya dengan kesan aman.",
        choices: [
          {
            label:
              "Menjaga kemajuan tanpa mendorong lebih: tetap di aktivitas yang ia respons, lalu saat penjemputan menceritakan kemajuan kecilnya kepada orang tua di depan Kenzo, \"Tadi Kenzo ikut menyusun balok, lho.\"",
            effect:
              "Kenzo pulang dengan pengalaman pertama yang tidak menakutkan. Mendengar gurunya menceritakan hal baik tentang dirinya, ia melirikmu sekilas; esok paginya ia masuk kelas tanpa menangis.",
            nextNodeId: "END",
            scores: { empathy: 2, communication: 2, pedagogy: 2 },
          },
          {
            label:
              "Memanfaatkan momentum: mengajak Kenzo bergabung ke kelompok besar sekarang karena ia sudah mulai terbuka.",
            effect:
              "Lompatan itu terlalu jauh; di tengah kelompok besar Kenzo membeku lagi dan mencari pojoknya. Kemajuan kecil hari ini tidak hilang, tapi ia butuh mengulang membangun rasa aman.",
            nextNodeId: "END",
            scores: { pedagogy: -1, classroomManagement: 1 },
          },
          {
            label:
              "Membuat rencana bertahap tertulis untuk seminggu ke depan: mulai dari bermain paralel, kelompok kecil, hingga kelompok besar, dan menyepakatinya dengan orang tua Kenzo.",
            effect:
              "Orang tua Kenzo merasa dilibatkan dan menceritakan kebiasaan Kenzo di rumah yang membantu penyusunan rencana. Adaptasi Kenzo berjalan bertahap dan terukur di hari-hari berikutnya.",
            nextNodeId: "END",
            scores: { pedagogy: 2, communication: 2 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: anak baru butuh rasa aman sebelum partisipasi. Kurangi tekanan sosial (kerumunan, perkenalan di depan kelas), izinkan benda transisi seperti tas, dan buka jalur lewat bermain paralel tanpa tuntutan bicara. Rayakan kemajuan kecil dan libatkan orang tua dalam rencana adaptasi bertahap.",
    debriefRisky:
      "Hindari memaksa perkenalan di depan kelas, merampas benda yang menjadi sumber rasa aman, membiarkan anak terisolasi tanpa jembatan interaksi, atau memulangkan anak karena \"belum siap\". Menyuap dengan camilan tidak membangun rasa aman yang sesungguhnya.",
  },
  {
    slug: "konflik-saat-antre-cuci-tangan",
    title: "Dorong-dorongan di Barisan Cuci Tangan",
    description:
      "Antrean cuci tangan sebelum makan berubah ricuh: ada yang menyerobot, ada yang mendorong, dan seorang anak terjepit di dekat wastafel. Kamu harus memulihkan ketertiban dan keamanan antrean.",
    difficulty: "DASAR",
    ageContext: "Kelompok A, usia 4-5 tahun, 14 anak, sebelum makan bersama",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Empat belas anak mengantre di dua wastafel. Gilang menyerobot ke depan, Sena mendorongnya dari belakang, dan barisan berubah jadi desak-desakan. Uma yang bertubuh kecil terjepit di antara teman-temannya dekat wastafel.",
        choices: [
          {
            label:
              "Masuk ke titik desakan lebih dulu, mengeluarkan Uma dengan lembut, lalu merentangkan tangan sebagai pembatas sambil berkata mantap, \"Berhenti. Semua mundur satu langkah.\"",
            effect:
              "Uma keluar dari jepitan dengan selamat dan desakan berhenti karena aba-abamu jelas. Anak-anak mundur, meski barisan masih berantakan dan Gilang-Sena masih saling kesal.",
            nextNodeId: "n2",
            scores: { safety: 2, classroomManagement: 2 },
          },
          {
            label:
              "Menegur Gilang si penyerobot dari jauh: \"Gilang! Kamu mulai duluan, sekarang pindah ke paling belakang!\"",
            effect:
              "Gilang protes keras merasa hanya dirinya yang dihukum padahal Sena mendorong. Selama kamu berdebat dengan Gilang, desakan di dekat wastafel belum terurai dan Uma mulai menangis.",
            nextNodeId: "n3",
            scores: { safety: -1, empathy: -1, classroomManagement: 1 },
          },
          {
            label:
              "Membubarkan antrean sepenuhnya: \"Semua duduk dulu di karpet! Cuci tangannya nanti dipanggil satu-satu.\"",
            effect:
              "Desakan bubar dan situasi aman, tapi memanggil satu per satu dari nol membuat waktu makan mundur jauh. Anak-anak yang lapar mulai rewel di karpet.",
            nextNodeId: "n3",
            scores: { safety: 2, classroomManagement: -1 },
          },
          {
            label:
              "Berseru dari tempatmu, \"Ayo antre yang rapi!\" sambil menyiapkan meja makan karena waktu sudah mepet.",
            effect:
              "Seruan tanpa kehadiran fisik tidak mengubah apa pun. Dorongan berlanjut dan Uma terbentur pinggir wastafel; ia menangis memegangi pelipisnya.",
            nextNodeId: "n4",
            scores: { safety: -2, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Desakan sudah terurai, tapi anak-anak masih berdiri tidak beraturan dan saling tuduh soal siapa yang menyerobot. Waktu makan makin dekat dan semua belum cuci tangan.",
        choices: [
          {
            label:
              "Membangun ulang antrean dengan struktur yang terlihat: anak berdiri di atas garis keramik, memegang pundak teman di depannya, sambil menyanyikan lagu antre.",
            effect:
              "Struktur yang konkret membuat anak tahu persis di mana harus berdiri. Barisan terbentuk sambil bernyanyi, dan cuci tangan berjalan lancar dua-dua ke wastafel.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, pedagogy: 2 },
          },
          {
            label:
              "Menyelesaikan dulu konflik Gilang dan Sena di hadapan antrean agar semua anak melihat cara menyelesaikan masalah.",
            effect:
              "Gilang dan Sena bersalaman, tapi proses itu memakan lima menit sementara dua belas anak lain berdiri menunggu. Barisan kembali riuh sebelum konflik selesai.",
            nextNodeId: "n3",
            scores: { communication: 1, classroomManagement: -1, empathy: 1 },
          },
          {
            label:
              "Membagi antrean jadi dua kelompok kecil: satu kelompok cuci tangan, satu kelompok bermain jari di karpet dulu, lalu bergantian.",
            effect:
              "Antrean pendek jauh lebih mudah dikelola anak usia 4-5 tahun. Kelompok yang menunggu sibuk bermain jari sehingga tidak menumpuk di wastafel. Semua selesai tanpa dorongan.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, pedagogy: 1, safety: 1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Ketertiban belum pulih: sebagian anak menunggu dengan gelisah, Gilang masih merasa diperlakukan tidak adil, dan waktu makan sudah lewat lima menit.",
        choices: [
          {
            label:
              "Menstruktur ulang dengan cepat: memanggil anak per meja untuk cuci tangan sambil sisanya menyanyikan lagu makan, lalu berbicara empat mata dengan Gilang dan Sena saat anak lain mulai makan.",
            effect:
              "Rotasi per meja berjalan tertib dan semua anak makan hanya terlambat sedikit. Gilang merasa didengar saat diajak bicara empat mata, dan Sena mengakui ia mendorong karena lapar dan tidak sabar.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, empathy: 2, communication: 1 },
          },
          {
            label:
              "Melewatkan cuci tangan kali ini dan langsung makan karena waktu sudah terlalu mundur; tangan dilap tisu basah saja.",
            effect:
              "Makan dimulai cepat, tapi kebiasaan cuci tangan yang sedang kamu bangun jadi kehilangan konsistensi. Beberapa anak besoknya bertanya kenapa hari ini harus antre kalau kemarin tidak.",
            nextNodeId: "END",
            scores: { pedagogy: -1, classroomManagement: 1 },
          },
          {
            label:
              "Menahan semua anak makan sampai mereka bisa antre dengan sempurna, mengulang barisan dari awal setiap ada yang bergerak.",
            effect:
              "Anak-anak yang lapar makin tidak mampu mengendalikan diri; barisan diulang empat kali dan tangisan mulai pecah. Menuntut kesempurnaan dari anak lapar adalah pertarungan yang kalah.",
            nextNodeId: "END",
            scores: { empathy: -2, pedagogy: -2, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Uma menangis memegangi pelipisnya setelah terbentur pinggir wastafel. Anak-anak lain berhenti mendorong karena kaget. Pelipisnya tampak kemerahan.",
        choices: [
          {
            label:
              "Memeriksa benturan dengan saksama, memberi kompres dingin, mencatat kejadian, dan memastikan orang tua Uma mendapat informasi lengkap saat penjemputan.",
            effect:
              "Pelipis Uma hanya memar ringan dan ia tenang setelah dikompres sambil dipangku. Orang tuanya menghargai kejujuran dan detail laporanmu, dan kamu mengevaluasi prosedur antre agar tidak terulang.",
            nextNodeId: "END",
            scores: { safety: 2, communication: 2, empathy: 1 },
          },
          {
            label:
              "Mengompres pelipis Uma lalu melanjutkan rutinitas seperti biasa tanpa memberi tahu orang tua karena lukanya tampak ringan.",
            effect:
              "Uma kembali beraktivitas, tapi sore harinya orang tuanya menemukan memar dan bertanya-tanya. Kepercayaan mereka pada sekolah terguncang karena tidak ada pemberitahuan.",
            nextNodeId: "END",
            scores: { safety: 1, communication: -2 },
          },
          {
            label:
              "Segera mencari siapa yang mendorong Uma dan meminta anak itu meminta maaf sebelum menangani luka.",
            effect:
              "Interogasi memicu saling tuduh sementara Uma masih menangis kesakitan tanpa penanganan. Urutan prioritasmu terbalik: luka dulu, baru cerita kejadian.",
            nextNodeId: "END",
            scores: { safety: -2, empathy: -1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: pada kericuhan antrean, amankan anak yang terjepit lebih dulu, hentikan gerakan dengan aba-aba jelas, lalu bangun struktur antre yang konkret (garis lantai, kelompok kecil, lagu). Bila terjadi benturan, tangani luka dulu, catat, dan laporkan jujur ke orang tua.",
    debriefRisky:
      "Hindari menghukum satu anak tanpa memahami kejadian utuh, berseru dari jauh tanpa hadir secara fisik di titik risiko, menahan anak lapar demi barisan sempurna, atau menyembunyikan insiden benturan dari orang tua.",
  },
  {
    slug: "anak-mengantuk-dan-lelah-saat-kegiatan",
    title: "Arka Tertidur di Meja",
    description:
      "Menjelang siang, seorang anak tampak sangat lelah, menguap terus, dan akhirnya menelungkupkan kepala di meja. Kamu harus menyeimbangkan kebutuhan istirahat anak dengan jalannya kegiatan.",
    difficulty: "MENENGAH",
    ageContext: "Kelompok A, usia 4-5 tahun, 12 anak, kegiatan sebelum pulang",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Pukul 10.30, saat kegiatan menempel bentuk, Arka menguap berkali-kali, mengucek mata, lalu menelungkupkan kepala di meja. Lemnya menempel di pipinya. Teman semejanya mulai menertawakan, \"Bu, Arka bobo!\"",
        context: "Kamu tahu dari ibunya bahwa semalam Arka tidur larut karena rumahnya kedatangan tamu.",
        choices: [
          {
            label:
              "Menghentikan tawa dengan halus: \"Arka sedang lelah, teman-teman. Kita semua pernah lelah, kan?\" Lalu membersihkan pipinya dan menawarinya berbaring di kasur sudut istirahat.",
            effect:
              "Anak-anak berhenti menertawakan dan mengangguk. Arka setengah sadar digiring ke sudut istirahat dan langsung terlelap. Kegiatan menempel berlanjut tanpa gangguan.",
            nextNodeId: "n2",
            scores: { empathy: 2, classroomManagement: 1, safety: 1 },
          },
          {
            label:
              "Membangunkannya dengan lembut dan mengajaknya mencuci muka agar segar kembali, lalu melanjutkan kegiatan.",
            effect:
              "Arka terbangun dan mencuci muka, tapi lima menit kemudian kepalanya terkulai lagi. Rasa kantuknya bukan sekadar bosan; tubuhnya benar-benar butuh tidur.",
            nextNodeId: "n3",
            scores: { empathy: 1, pedagogy: -1 },
          },
          {
            label:
              "Membiarkannya tidur di meja, toh sebentar lagi pulang.",
            effect:
              "Arka tidur dengan leher tertekuk dan pipi menempel lem. Posisinya tidak aman dan tidak nyaman; ia terbangun 20 menit kemudian dengan leher sakit dan menangis.",
            nextNodeId: "n3",
            scores: { safety: -1, empathy: -1 },
          },
          {
            label:
              "Menyemangatinya bergerak: mengajak seluruh kelas berdiri dan melakukan senam tepuk dua menit agar Arka ikut segar.",
            effect:
              "Anak-anak lain senang bergerak, tapi Arka ikut berdiri dengan mata setengah terpejam dan hampir kehilangan keseimbangan. Kelelahannya sudah melewati batas yang bisa diatasi gerakan.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, safety: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Arka tertidur pulas di sudut istirahat. Kegiatan menempel berjalan lancar, tapi beberapa anak mulai bertanya, \"Kok Arka boleh bobo? Aku juga mau bobo.\" Dua anak berpura-pura menguap.",
        choices: [
          {
            label:
              "Menjawab jujur dan tenang: \"Kalau badan kalian benar-benar lelah seperti Arka, boleh istirahat juga. Kalau masih kuat, ayo selesaikan tempelanmu yang bagus itu.\"",
            effect:
              "Diberi pilihan yang jujur, kedua anak itu justru memilih melanjutkan karya mereka. Tidak ada yang benar-benar mengantuk; mereka hanya menguji batas, dan batasmu jelas tapi adil.",
            nextNodeId: "END",
            scores: { communication: 2, childAgency: 1, classroomManagement: 2 },
          },
          {
            label:
              "Menegaskan bahwa tidur hanya untuk Arka dan yang lain tidak boleh meniru-niru.",
            effect:
              "Anak-anak berhenti bertanya tapi tidak paham alasannya. Bagi mereka aturan jadi terasa pilih kasih, dan bisik-bisik \"Arka anak emas\" mulai terdengar.",
            nextNodeId: "n4",
            scores: { communication: -1, classroomManagement: 1 },
          },
          {
            label:
              "Mengalihkan dengan tantangan seru: \"Siapa yang bisa menempel lima bentuk sebelum lagu selesai?\"",
            effect:
              "Perhatian anak-anak teralih ke tantangan dan pertanyaan soal Arka menguap begitu saja. Efektif untuk saat ini, meski pertanyaan tentang keadilan aturan belum benar-benar terjawab.",
            nextNodeId: "END",
            scores: { classroomManagement: 2, pedagogy: 1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Kondisi Arka menurun: ia menangis lesu, tidak mau melanjutkan kegiatan, dan terus memejamkan mata. Waktu pulang masih 45 menit lagi, dan anak lain butuh pendampinganmu menyelesaikan karya.",
        choices: [
          {
            label:
              "Memindahkan Arka ke tempat berbaring yang aman dan nyaman, memeriksa suhu badannya untuk memastikan ia hanya lelah, lalu kembali mendampingi kelas sambil sesekali mengeceknya.",
            effect:
              "Suhu badan Arka normal; ia memang hanya kurang tidur. Ia terlelap dalam dua menit di tempat yang aman, dan kamu bisa mendampingi kelas dengan tenang sambil memantaunya.",
            nextNodeId: "n4",
            scores: { safety: 2, empathy: 1, classroomManagement: 1 },
          },
          {
            label:
              "Menelepon orang tuanya untuk menjemput sekarang karena Arka sudah tidak bisa mengikuti kegiatan.",
            effect:
              "Ibunya datang tergopoh-gopoh meninggalkan pekerjaan, padahal Arka sebenarnya hanya butuh tidur sebentar di tempat aman. Untuk kelelahan biasa, langkah ini berlebihan.",
            nextNodeId: "END",
            scores: { safety: 1, pedagogy: -1 },
          },
          {
            label:
              "Memangku Arka sambil terus mendampingi kegiatan menempel anak-anak lain.",
            effect:
              "Arka tertidur di pangkuanmu, tapi kamu jadi tidak bisa bergerak membantu anak lain yang kesulitan menggunting dan mengelem. Dua anak mulai frustrasi menunggu bantuanmu.",
            nextNodeId: "n4",
            scores: { empathy: 2, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Situasi terkendali dan waktu pulang tiba. Arka baru bangun, masih tampak lelah. Para penjemput mulai berdatangan, termasuk ibu Arka.",
        choices: [
          {
            label:
              "Menceritakan kondisi Arka ke ibunya secara faktual dan tanpa menyalahkan: kapan mulai mengantuk, apa yang dilakukan sekolah, dan menanyakan pola tidurnya belakangan ini.",
            effect:
              "Ibunya bercerita rumah sedang ramai tamu hingga minggu depan, dan kalian sepakat Arka tidur lebih awal mulai malam ini. Kerja sama rumah-sekolah terbentuk tanpa ada yang merasa disalahkan.",
            nextNodeId: "END",
            scores: { communication: 2, empathy: 1, pedagogy: 1 },
          },
          {
            label:
              "Menyampaikan ke ibunya bahwa Arka \"tidur terus dan tidak mengerjakan apa-apa hari ini\" agar orang tua lebih memperhatikan jam tidur.",
            effect:
              "Nada laporanmu terdengar seperti keluhan. Ibu Arka merasa dihakimi sebagai orang tua yang lalai dan menjadi defensif; kerja sama yang kamu butuhkan justru menjauh.",
            nextNodeId: "END",
            scores: { communication: -2, empathy: -1 },
          },
          {
            label:
              "Tidak menyampaikan apa pun karena Arka sudah bangun dan tampak baik-baik saja.",
            effect:
              "Ibu Arka pulang tanpa tahu anaknya kelelahan di sekolah. Pola tidur larut berlanjut, dan tiga hari berikutnya Arka kembali tumbang di kelas dengan kondisi serupa.",
            nextNodeId: "END",
            scores: { communication: -1, pedagogy: -1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: kelelahan fisik anak adalah kebutuhan tubuh, bukan kenakalan. Sediakan tempat istirahat yang aman, cek kondisi fisik dasar, lindungi anak dari ejekan teman, dan komunikasikan secara faktual dengan orang tua untuk mencari solusi bersama.",
    debriefRisky:
      "Hindari memaksa anak yang benar-benar lelah untuk terus beraktivitas, membiarkannya tidur dalam posisi tidak aman, atau melaporkan pada orang tua dengan nada menyalahkan. Jangan pula menyembunyikan informasi penting tentang kondisi anak di sekolah.",
  },
  {
    slug: "hujan-tiba-tiba-saat-kegiatan-outdoor",
    title: "Hujan Deras di Tengah Berkebun",
    description:
      "Saat kegiatan berkebun di halaman, hujan turun tiba-tiba dan sangat deras. Kamu harus mengevakuasi 15 anak dengan aman, lalu menyelamatkan rencana kegiatan yang buyar.",
    difficulty: "LANJUT",
    ageContext: "Kelompok B, usia 5-6 tahun, 15 anak, kegiatan berkebun di halaman",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Lima belas anak sedang menanam bibit sayur di halaman ketika langit mendadak gelap dan hujan turun sangat deras. Anak-anak berteriak; ada yang berlari ke sana kemari, ada yang malah bermain hujan, ada yang membeku ketakutan. Jarak ke teras kelas sekitar 20 meter dan tanah mulai licin.",
        choices: [
          {
            label:
              "Mengambil posisi terlihat semua anak, meniup peluit dengan aba-aba yang sudah dilatih, dan mengarahkan: \"Semua pegangan tangan berpasangan, jalan cepat ke teras, tidak lari!\"",
            effect:
              "Anak-anak mengenali aba-aba dan berpasangan sambil berjalan cepat. Tidak ada yang terpeleset karena tidak ada yang berlari. Dalam satu menit semua tiba di teras, basah tapi selamat.",
            nextNodeId: "n2",
            scores: { safety: 2, classroomManagement: 2, communication: 1 },
          },
          {
            label:
              "Berteriak \"Lari ke kelas semuanya, cepat!\" sambil menunjuk ke arah teras.",
            effect:
              "Anak-anak berhamburan lari di tanah licin. Sebagian besar sampai, tapi Nadin terpeleset dan jatuh berlumuran lumpur, sementara dua anak justru berlari ke arah ayunan karena panik.",
            nextNodeId: "n3",
            scores: { safety: -2, classroomManagement: -1 },
          },
          {
            label:
              "Mengumpulkan alat berkebun dulu supaya tidak rusak kehujanan, sambil menyuruh anak-anak menunggu di tempat.",
            effect:
              "Anak-anak berdiri kehujanan makin lama sementara kamu memunguti sekop. Prioritasmu terbalik: alat bisa diganti, tapi anak yang basah kuyup kedinginan dan dua mulai menangis.",
            nextNodeId: "n3",
            scores: { safety: -2, empathy: -1 },
          },
          {
            label:
              "Menggendong dua anak terkecil lebih dulu ke teras, lalu kembali menjemput yang lain kelompok demi kelompok.",
            effect:
              "Dua anak terkecil selamat lebih dulu, tapi selama kamu bolak-balik, tiga belas anak lain tanpa pengawasan di tengah hujan. Beberapa mulai berlarian dan situasi nyaris lepas kendali.",
            nextNodeId: "n3",
            scores: { safety: -1, empathy: 1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Semua anak sudah di teras, basah dan menggigil tapi selamat. Beberapa anak menganggapnya petualangan seru, beberapa lainnya menangis. Baju ganti hanya dibawa oleh sebagian anak.",
        choices: [
          {
            label:
              "Melakukan penghitungan cepat jumlah anak, lalu mengeringkan dan mengganti baju yang basah kuyup lebih dulu, meminjamkan baju cadangan sekolah bagi yang tidak bawa.",
            effect:
              "Hitungan lengkap: 15 anak. Anak-anak yang paling basah segera kering dan hangat. Suasana pulih; anak yang menangis tenang setelah tubuhnya nyaman kembali.",
            nextNodeId: "n4",
            scores: { safety: 2, empathy: 2, classroomManagement: 1 },
          },
          {
            label:
              "Segera membawa semua anak masuk kelas dan melanjutkan dengan kegiatan pengganti agar tidak ada waktu kosong.",
            effect:
              "Kegiatan berjalan tapi beberapa anak masih berbaju basah dan mulai menggigil. Kamu baru sadar belum menghitung jumlah anak, dan jantungmu berdegup saat mengeceknya terlambat.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, safety: -2 },
          },
          {
            label:
              "Membiarkan anak-anak menonton hujan dari teras sebentar sebagai momen menenangkan sambil kamu mengatur baju ganti satu per satu.",
            effect:
              "Menonton hujan menenangkan sebagian anak, tapi proses ganti baju satu per satu terlalu lambat; anak yang paling basah menggigil lama menunggu giliran.",
            nextNodeId: "n3",
            scores: { empathy: 1, safety: -1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Ada masalah susulan: seorang anak basah kuyup menggigil dengan bibir mulai kebiruan, sementara anak lain butuh pengawasan. Guru pendamping baru saja datang membantu.",
        choices: [
          {
            label:
              "Menangani anak yang menggigil sebagai prioritas: keringkan, ganti baju, balut handuk, dan dekap sampai hangat, sementara guru pendamping memimpin anak lain bernyanyi di dalam kelas.",
            effect:
              "Anak itu berangsur hangat dan bibirnya kembali merah muda dalam beberapa menit. Pembagian tugas dengan guru pendamping berjalan efektif dan kelas tetap terkendali.",
            nextNodeId: "n4",
            scores: { safety: 2, empathy: 2, classroomManagement: 2 },
          },
          {
            label:
              "Meminta guru pendamping menangani anak yang menggigil, sementara kamu menenangkan kelas yang riuh karena merasa itu tanggung jawab wali kelas.",
            effect:
              "Anak yang menggigil tertangani meski ia sempat mencari-carimu karena kamu figur yang paling ia percaya. Kelas tenang di tanganmu. Pembagian ini berjalan, hanya kurang peka pada kebutuhan emosional si anak.",
            nextNodeId: "n4",
            scores: { safety: 1, classroomManagement: 1, empathy: -1 },
          },
          {
            label:
              "Menelepon orang tua anak yang menggigil lebih dulu sebelum melakukan penanganan apa pun, agar tidak salah langkah.",
            effect:
              "Telepon memakan waktu tiga menit sementara anak masih dalam baju basah yang mendinginkan tubuhnya. Penanganan pertama yang sederhana justru tertunda oleh prosedur yang bisa menyusul.",
            nextNodeId: "n4",
            scores: { safety: -2, communication: 1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Semua anak kering, hangat, dan aman di dalam kelas. Hujan masih deras. Rencana berkebun buyar total dan tersisa 40 menit sebelum jadwal berikutnya. Anak-anak masih membicarakan kejadian tadi dengan seru.",
        choices: [
          {
            label:
              "Menjadikan hujan sebagai kurikulum dadakan: mengamati hujan dari jendela, menampung air hujan di wadah, dan berdiskusi \"dari mana hujan berasal dan kenapa bibit kita justru senang disiram hujan\".",
            effect:
              "Anak-anak antusias luar biasa karena belajar dari peristiwa yang baru mereka alami sendiri. Diskusi mengalir hidup, dan kegiatan berkebun justru mendapat konteks yang lebih kaya untuk dilanjutkan besok.",
            nextNodeId: "END",
            scores: { pedagogy: 2, childAgency: 2, communication: 1 },
          },
          {
            label:
              "Mengisi sisa waktu dengan menonton video anak-anak di ponselmu yang disambungkan ke speaker agar kelas tenang.",
            effect:
              "Kelas memang tenang menonton, tapi momen emas belajar dari pengalaman nyata terlewat begitu saja. Energi dan rasa ingin tahu anak-anak tentang hujan menguap tanpa diolah.",
            nextNodeId: "END",
            scores: { pedagogy: -2, classroomManagement: 1 },
          },
          {
            label:
              "Mengajak anak-anak menceritakan kembali pengalaman tadi secara bergiliran, lalu menggambarnya sebagai \"cerita hujan kita\".",
            effect:
              "Anak-anak bergantian bercerita dengan versi masing-masing, lalu menggambar dengan penuh detail. Pengalaman menegangkan tadi terolah menjadi narasi dan karya yang membanggakan.",
            nextNodeId: "END",
            scores: { pedagogy: 2, communication: 2, empathy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: dalam evakuasi, gunakan aba-aba yang sudah dilatih, cegah berlari di permukaan licin, dan selalu hitung jumlah anak begitu tiba di tempat aman. Prioritaskan tubuh anak yang kedinginan di atas alat dan prosedur. Setelah aman, ubah kejadian tak terduga menjadi pengalaman belajar.",
    debriefRisky:
      "Hindari menyuruh anak berlari panik di tanah licin, mengurus alat sebelum anak, meninggalkan kelompok tanpa pengawasan, atau menunda penanganan anak menggigil demi menelepon. Melewatkan penghitungan anak setelah evakuasi adalah celah keselamatan yang serius.",
  },
  {
    slug: "anak-jatuh-dari-panjatan-saat-bermain",
    title: "Jatuh dari Panjatan",
    description:
      "Seorang anak jatuh dari alat panjat setinggi dada orang dewasa saat bermain di luar. Kamu harus menangani insiden dengan urutan yang benar: kondisi anak, kelas, dokumentasi, dan komunikasi orang tua.",
    difficulty: "LANJUT",
    ageContext: "Kelompok B, usia 5-6 tahun, 16 anak, bermain di halaman",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Saat bermain bebas di halaman, Bagas jatuh dari panjatan dan mendarat di tanah dengan posisi menyamping. Ia menangis keras memegangi lengan kanannya. Anak-anak lain berlarian mendekat, dan beberapa masih bergelantungan di panjatan yang sama.",
        choices: [
          {
            label:
              "Mendatangi Bagas segera, memintanya tidak bergerak dulu, memeriksa dengan tenang sambil bertanya bagian mana yang sakit, dan meminta guru pendamping mengarahkan anak-anak lain menjauh dan turun dari panjatan.",
            effect:
              "Bagas tetap di posisinya sementara kamu memeriksa lengan, kepala, dan tubuhnya sambil mengajaknya bicara. Ia bisa menggerakkan jari dan tidak ada benturan kepala. Anak-anak lain tertangani guru pendamping.",
            nextNodeId: "n2",
            scores: { safety: 2, classroomManagement: 2, empathy: 1 },
          },
          {
            label:
              "Langsung menggendong Bagas dan membawanya masuk ke dalam ruangan secepat mungkin.",
            effect:
              "Niatmu cepat, tapi memindahkan anak sebelum memeriksa cedera berisiko memperparah bila ada patah tulang. Bagas menjerit kesakitan saat lengannya tertekan waktu digendong.",
            nextNodeId: "n3",
            scores: { safety: -2, empathy: 1 },
          },
          {
            label:
              "Menenangkan dari jarak dekat sambil menunggu Bagas berhenti menangis dulu, karena anak sering menangis karena kaget saja.",
            effect:
              "Beberapa insiden memang hanya kaget, tapi menunggu tanpa memeriksa membuang waktu penilaian penting. Sementara itu anak-anak lain masih bergelantungan di panjatan tanpa pengawasan.",
            nextNodeId: "n3",
            scores: { safety: -1, empathy: 1, classroomManagement: -1 },
          },
          {
            label:
              "Berteriak menyuruh semua anak turun dari panjatan dulu sebelum mendatangi Bagas.",
            effect:
              "Anak-anak turun, tapi teriakanmu menambah kepanikan dan Bagas menangis makin keras merasa tidak segera ditolong. Dua kebutuhan itu seharusnya bisa ditangani paralel dengan guru pendamping.",
            nextNodeId: "n3",
            scores: { safety: 1, empathy: -1, communication: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Pemeriksaan awal: tidak ada luka terbuka dan tidak ada benturan kepala, tapi Bagas masih menangis dan menolak lengan kanannya disentuh. Ada kemerahan di lengan bawah dan ia enggan menggerakkannya.",
        choices: [
          {
            label:
              "Memperlakukannya sebagai cedera yang perlu dicek profesional: imobilisasi sederhana, kompres dingin, hubungi orang tua, dan sarankan pemeriksaan ke fasilitas kesehatan sesuai prosedur sekolah.",
            effect:
              "Orang tua Bagas datang dan membawanya ke klinik; hasilnya terkilir ringan yang perlu istirahat. Orang tuanya berterima kasih atas penanganan cepat dan prosedur yang rapi.",
            nextNodeId: "n4",
            scores: { safety: 2, communication: 2 },
          },
          {
            label:
              "Mengompres dan mengoleskan minyak, lalu mengajaknya istirahat di kelas sambil dilihat perkembangannya sampai jam pulang.",
            effect:
              "Bagas duduk menahan nyeri sepanjang sisa hari. Keengganan menggerakkan lengan pada anak adalah tanda yang perlu dicek profesional; menunda pemeriksaan memperpanjang nyerinya tanpa kepastian.",
            nextNodeId: "n3",
            scores: { safety: -2, empathy: 1 },
          },
          {
            label:
              "Menguji lengannya dengan memintanya menggerak-gerakkan dan mengangkat tangan tinggi-tinggi untuk memastikan tidak patah.",
            effect:
              "Bagas menjerit saat mencoba mengangkat lengan. Memaksa gerakan pada bagian yang dicurigai cedera justru berisiko; penilaian seperti itu sebaiknya dilakukan tenaga kesehatan.",
            nextNodeId: "n3",
            scores: { safety: -2 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Penanganan sempat kurang tepat dan Bagas masih kesakitan. Kepala sekolah mendengar keributan dan datang menanyakan situasi. Kamu perlu mengoreksi arah penanganan sekarang.",
        choices: [
          {
            label:
              "Melaporkan situasi apa adanya ke kepala sekolah termasuk langkahmu yang kurang tepat, lalu bersama-sama menjalankan prosedur: imobilisasi, hubungi orang tua, rujuk pemeriksaan.",
            effect:
              "Kepala sekolah membantu menghubungi orang tua sementara kamu menstabilkan lengan Bagas. Kejujuranmu membuat koreksi berjalan cepat dan Bagas segera mendapat penanganan yang benar.",
            nextNodeId: "n4",
            scores: { safety: 2, communication: 2 },
          },
          {
            label:
              "Menyampaikan pada kepala sekolah bahwa semuanya terkendali agar tidak terlihat lalai, sambil diam-diam melanjutkan penanganan.",
            effect:
              "Kepala sekolah pergi dengan informasi yang tidak akurat. Saat orang tua Bagas kemudian bertanya detail kejadian ke sekolah, cerita yang tidak sinkron menimbulkan kecurigaan dan masalah kepercayaan.",
            nextNodeId: "n4",
            scores: { communication: -2, safety: -1 },
          },
          {
            label:
              "Menyerahkan penanganan sepenuhnya ke kepala sekolah karena merasa sudah membuat kesalahan.",
            effect:
              "Bagas kebingungan karena guru yang paling ia kenal mundur saat ia kesakitan. Kepala sekolah menangani dengan baik, tapi kamu kehilangan kesempatan belajar menangani insiden secara utuh.",
            nextNodeId: "n4",
            scores: { empathy: -1, safety: 1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Bagas sudah ditangani dan dijemput orang tuanya. Anak-anak lain masih membicarakan kejadian itu dengan cemas; beberapa jadi takut bermain panjatan. Tersisa urusan dokumentasi dan tindak lanjut.",
        choices: [
          {
            label:
              "Menulis laporan insiden lengkap (kronologi, penanganan, saksi), mengecek kondisi panjatan dan area pendaratannya, lalu besok berbicara dengan anak-anak tentang cara bermain panjatan yang aman.",
            effect:
              "Laporanmu membantu sekolah menemukan bahwa area pendaratan panjatan terlalu keras dan perlu dilapisi matras. Anak-anak kembali bermain panjatan dengan aturan aman yang mereka pahami, bukan dengan rasa takut.",
            nextNodeId: "END",
            scores: { safety: 2, pedagogy: 2, communication: 1 },
          },
          {
            label:
              "Melarang semua anak bermain panjatan sampai waktu yang tidak ditentukan demi mencegah kejadian serupa.",
            effect:
              "Risiko memang hilang bersama manfaatnya: anak kehilangan sarana melatih motorik kasar dan keberanian. Beberapa anak justru memanjat pagar karena kebutuhan memanjatnya tidak tersalurkan.",
            nextNodeId: "END",
            scores: { safety: 1, pedagogy: -2, childAgency: -1 },
          },
          {
            label:
              "Menganggap kasus selesai karena Bagas sudah ditangani; tidak perlu laporan tertulis untuk terkilir ringan.",
            effect:
              "Tanpa dokumentasi, sekolah tidak belajar apa pun dari insiden ini dan area pendaratan yang keras tetap dibiarkan. Saat insiden serupa terulang bulan depan, tidak ada catatan pembanding.",
            nextNodeId: "END",
            scores: { safety: -2, communication: -1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: jangan pindahkan anak sebelum pemeriksaan awal, bagi peran dengan rekan untuk mengamankan anak lain, rujuk tanda cedera (enggan menggerakkan anggota tubuh) ke tenaga kesehatan, komunikasikan jujur ke orang tua dan pimpinan, serta tutup dengan laporan insiden dan perbaikan lingkungan bermain.",
    debriefRisky:
      "Hindari menggendong anak sebelum cedera dinilai, memaksa anak menggerakkan bagian yang sakit, menutupi kesalahan penanganan, atau melarang total alat bermain alih-alih memperbaiki keamanannya. Insiden tanpa dokumentasi akan terulang.",
  },
  {
    slug: "anak-menggigit-teman-saat-berebut",
    title: "Bekas Gigitan di Lengan Alya",
    description:
      "Seorang anak menggigit lengan temannya saat berebut boneka hingga meninggalkan bekas. Kamu harus menangani kedua anak, insidennya, dan komunikasi ke dua keluarga yang berbeda posisi.",
    difficulty: "LANJUT",
    ageContext: "Kelompok A, usia 3-4 tahun, 10 anak, sesi bermain peran",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Di sudut bermain peran, terdengar jeritan. Alya menangis kencang memegangi lengannya yang menunjukkan bekas gigitan memerah. Vino berdiri di sampingnya memeluk boneka yang tadi mereka perebutkan, wajahnya campuran takut dan bingung.",
        choices: [
          {
            label:
              "Menangani Alya lebih dulu: memeriksa bekas gigitan, mencuci dengan air mengalir dan sabun, memberi kompres dingin, sambil memastikan Vino tetap dalam jangkauan pandang.",
            effect:
              "Kulit Alya tidak robek, hanya memerah. Ia tenang setelah lukanya dirawat dan dipeluk. Vino menunggu dengan gelisah tapi tidak lari ke mana-mana karena kamu memintanya duduk di dekatmu.",
            nextNodeId: "n2",
            scores: { safety: 2, empathy: 2, classroomManagement: 1 },
          },
          {
            label:
              "Langsung menghadapi Vino dengan tegas: \"Kenapa menggigit?! Menggigit itu tidak boleh!\" sebelum memeriksa Alya.",
            effect:
              "Vino menangis ketakutan dan tidak mampu menjawab; anak 3 tahun yang baru meledak emosinya tidak bisa menjelaskan alasan. Sementara itu bekas gigitan Alya belum dirawat dan tangisnya makin keras.",
            nextNodeId: "n3",
            scores: { safety: -1, empathy: -1, communication: -1 },
          },
          {
            label:
              "Menggendong Alya menjauh untuk dirawat sambil meminta anak-anak lain tidak bermain dengan Vino dulu karena ia sedang \"berbahaya\".",
            effect:
              "Alya terawat, tapi label \"berbahaya\" langsung menempel: anak-anak menjauhi Vino sambil berbisik-bisik. Vino berdiri sendirian di sudut, dan perilaku menggigitnya justru berisiko menguat karena kebutuhan di baliknya tidak tertangani.",
            nextNodeId: "n3",
            scores: { safety: 1, empathy: -2 },
          },
          {
            label:
              "Memisahkan keduanya ke sisi ruangan berbeda dan meminta guru pendamping merawat Alya, sementara kamu duduk bersama Vino.",
            effect:
              "Pembagian peran berjalan: Alya dirawat guru pendamping dan kamu bisa menenangkan Vino yang gemetar. Hanya saja Alya sempat mencarimu, guru utamanya, saat lukanya dirawat.",
            nextNodeId: "n2",
            scores: { safety: 2, classroomManagement: 2, empathy: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Alya sudah tenang dan bekas gigitannya sudah dirawat. Vino duduk memeluk lutut, masih memegangi boneka. Saat kamu mendekat, ia berkata pelan, \"Boneka Vino... Alya rebut.\"",
        choices: [
          {
            label:
              "Memvalidasi emosinya sambil menegaskan batas: \"Vino kesal bonekanya diambil, Bu Guru mengerti. Tapi gigi bukan untuk menggigit teman. Kalau kesal, bilang 'Aku belum selesai' atau panggil Bu Guru.\"",
            effect:
              "Vino mengangguk dan mengulang pelan, \"Bilang... belum selesai.\" Ia mendapat dua hal sekaligus: perasaannya diakui dan alternatif tindakan yang konkret untuk situasi serupa.",
            nextNodeId: "n4",
            scores: { empathy: 2, communication: 2, pedagogy: 2 },
          },
          {
            label:
              "Meminta Vino segera meminta maaf dan memeluk Alya di depan teman-teman sebagai penyelesaian.",
            effect:
              "Vino mengucap \"maaf\" datar dan memeluk Alya dengan kaku; Alya sendiri masih takut dan menegang dipeluk. Ritual selesai di permukaan, tapi tidak ada yang belajar apa-apa tentang penyebab dan pencegahan.",
            nextNodeId: "n4",
            scores: { communication: -1, pedagogy: -1 },
          },
          {
            label:
              "Mengambil boneka dari Vino sebagai konsekuensi: \"Karena menggigit, bonekanya Bu Guru simpan.\"",
            effect:
              "Vino menjerit dan menangis meraung-raung; dari sudut pandangnya, ia digigit kehilangan dua kali: bonekanya direbut Alya, lalu diambil gurunya. Emosinya yang belum pulih meledak lagi.",
            nextNodeId: "n3",
            scores: { empathy: -2, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Situasi emosional belum selesai: ada anak yang menangis lagi dan suasana sudut bermain peran tegang. Anak-anak lain mengintip sambil berbisik. Waktu penjemputan tinggal 30 menit.",
        choices: [
          {
            label:
              "Menenangkan dulu anak yang menangis sampai regulasi emosinya pulih, lalu menata ulang suasana kelas dengan kegiatan tenang bersama, misalnya membaca buku di karpet.",
            effect:
              "Setelah semua anak tenang, kelas berkumpul membaca buku dan ketegangan mencair. Kamu kini punya ruang untuk menyiapkan komunikasi dengan orang tua kedua anak sebelum penjemputan.",
            nextNodeId: "n4",
            scores: { empathy: 2, classroomManagement: 2 },
          },
          {
            label:
              "Membiarkan emosi mereda sendiri sambil kamu mulai menulis kronologi kejadian untuk laporan.",
            effect:
              "Laporanmu setengah jadi, tapi tangisan yang dibiarkan memicu kegaduhan baru; dua anak lain ikut rewel. Dokumentasi penting, tapi urutannya setelah anak-anak stabil.",
            nextNodeId: "n4",
            scores: { classroomManagement: -1, communication: 1 },
          },
          {
            label:
              "Memanggil semua anak dan menjelaskan panjang lebar tentang bahaya menggigit selagi kejadiannya masih hangat.",
            effect:
              "Ceramah panjang untuk anak 3-4 tahun dalam suasana tegang tidak banyak diserap; anak-anak menunduk gelisah dan Vino kembali menangis merasa jadi pusat pembicaraan.",
            nextNodeId: "n4",
            scores: { pedagogy: -1, empathy: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Waktu penjemputan tiba. Ibu Alya melihat bekas gigitan di lengan anaknya dan wajahnya langsung berubah. Ibu Vino juga sudah datang, belum tahu apa-apa. Keduanya berdiri tak jauh satu sama lain.",
        choices: [
          {
            label:
              "Berbicara dengan masing-masing ibu secara terpisah: menjelaskan kronologi faktual, penanganan yang dilakukan, dan rencana pencegahan, tanpa membeberkan nama anak lain sebagai \"pelaku\" kepada pihak lain.",
            effect:
              "Ibu Alya tenang setelah tahu lukanya dirawat cepat dan sekolah punya rencana. Ibu Vino diajak bekerja sama mengajarkan kata-kata pengganti gigitan di rumah. Tidak terjadi konfrontasi antar orang tua.",
            nextNodeId: "END",
            scores: { communication: 2, safety: 1, empathy: 1 },
          },
          {
            label:
              "Mempertemukan kedua ibu langsung agar masalah selesai di tempat, dengan kamu sebagai penengah.",
            effect:
              "Emosi ibu Alya masih panas dan pertemuan dadakan berubah jadi konfrontasi; ibu Vino merasa diserang dan defensif. Mediasi orang tua butuh persiapan, bukan pertemuan spontan saat emosi tinggi.",
            nextNodeId: "END",
            scores: { communication: -2, empathy: -1 },
          },
          {
            label:
              "Menyampaikan pada ibu Alya bahwa \"anak kecil memang suka gigit-gigitan, nanti juga lupa\" agar ia tidak khawatir berlebihan.",
            effect:
              "Meremehkan kekhawatiran orang tua justru memperbesar masalah: ibu Alya merasa sekolah tidak serius menangani keselamatan anaknya dan mengadukan hal itu ke grup orang tua murid malam harinya.",
            nextNodeId: "END",
            scores: { communication: -2, safety: -1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: rawat anak yang tergigit lebih dulu, lalu dekati anak yang menggigit dengan validasi emosi plus batas yang jelas dan alternatif tindakan konkret. Komunikasikan ke masing-masing orang tua secara terpisah dan faktual, dengan rencana pencegahan, tanpa membocorkan identitas anak lain.",
    debriefRisky:
      "Hindari menginterogasi anak kecil yang sedang meledak emosinya, melabeli anak \"berbahaya\" di depan teman, memaksa maaf-pelukan sebagai ritual kosong, mempertemukan orang tua secara spontan saat emosi panas, atau meremehkan kekhawatiran orang tua.",
  },
  {
    slug: "anak-menirukan-kata-kasar-di-kelas",
    title: "Kata Kasar Menular di Kelas",
    description:
      "Seorang anak mengucapkan kata kasar yang ia dengar entah dari mana, dan anak-anak lain tertawa lalu ikut menirukan. Kamu harus memutus penularannya tanpa memberi kata itu panggung lebih besar.",
    difficulty: "LANJUT",
    ageContext: "Kelompok B, usia 5-6 tahun, 17 anak, kegiatan makan bersama",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Saat makan bersama, Dika tiba-tiba mengucapkan kata kasar dengan lantang. Seisi meja tertawa terbahak-bahak, dan dua anak langsung menirukannya sambil cekikikan. Dika tampak senang jadi pusat perhatian dan bersiap mengucapkannya lagi.",
        choices: [
          {
            label:
              "Merespons datar tanpa drama: \"Kata itu tidak kita pakai di sekolah,\" lalu langsung mengalihkan meja ke topik menarik, \"Siapa yang tahu sayur apa ini di sup kalian?\"",
            effect:
              "Tanpa reaksi heboh, kata itu kehilangan daya tariknya. Anak-anak beralih menebak sayuran, dan Dika ikut menjawab karena perhatian yang ia cari tetap didapat lewat jalur lain.",
            nextNodeId: "n2",
            scores: { classroomManagement: 2, communication: 2, pedagogy: 1 },
          },
          {
            label:
              "Terkejut keras: \"Astaga, Dika! Kata apa itu?! Siapa yang mengajarkan?!\" di depan semua anak.",
            effect:
              "Reaksi hebohmu justru menunjukkan bahwa kata itu sangat ampuh menarik perhatian. Meja makin riuh, dan tiga anak lain mencoba kata itu bergantian untuk melihat reaksimu.",
            nextNodeId: "n3",
            scores: { classroomManagement: -2, communication: -1 },
          },
          {
            label:
              "Mengabaikan sepenuhnya seolah tidak mendengar, berharap hilang sendiri.",
            effect:
              "Tanpa batas yang diucapkan, sebagian anak menyimpulkan kata itu boleh dipakai. Sepanjang makan, kata itu muncul lagi di meja lain, kini lebih sulit dilacak sumbernya.",
            nextNodeId: "n3",
            scores: { classroomManagement: -1, pedagogy: -1 },
          },
          {
            label:
              "Memanggil Dika keluar dari meja makan untuk ditegur empat mata saat itu juga.",
            effect:
              "Dika ditegur di luar dan kembali dengan wajah tertunduk. Namun meja yang ditinggal justru ramai menirukan kata itu tanpa pengawasan, dan Dika kini dicap \"yang dihukum\" oleh temannya.",
            nextNodeId: "n3",
            scores: { communication: 1, classroomManagement: -1, empathy: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Meja kembali tenang dan topik beralih. Namun kamu melihat Dika sesekali membisikkan kata itu ke telinga teman sebelahnya sambil terkikik. Ia jelas belum selesai bereksperimen dengan kata barunya.",
        choices: [
          {
            label:
              "Setelah makan, mengajak Dika bicara berdua dengan nada ingin tahu, bukan menghakimi: \"Kata yang tadi, Dika dengar di mana? Tahu tidak artinya?\"",
            effect:
              "Dika bercerita polos bahwa ia mendengarnya dari tayangan yang ditonton kakaknya, dan ia tidak tahu artinya, hanya suka reaksi orang-orang. Kamu bisa menjelaskan dengan tenang kenapa kata itu menyakiti hati orang.",
            nextNodeId: "n4",
            scores: { empathy: 2, communication: 2, pedagogy: 1 },
          },
          {
            label:
              "Memberi Dika peringatan di tempat: \"Bu Guru dengar lho. Sekali lagi bisik-bisik kata itu, Dika makan sendirian.\"",
            effect:
              "Bisikan berhenti karena ancaman, tapi Dika hanya belajar menyembunyikannya lebih rapi. Di halaman nanti, jauh dari telingamu, eksperimen katanya berlanjut.",
            nextNodeId: "n4",
            scores: { classroomManagement: 1, pedagogy: -1, empathy: -1 },
          },
          {
            label:
              "Membiarkan bisik-bisik itu karena sudah tidak diucapkan lantang, yang penting meja tenang.",
            effect:
              "Bisikan menyebar pelan dari telinga ke telinga seperti permainan. Sepulang sekolah, beberapa orang tua mendapati anaknya membawa pulang kata baru itu ke rumah.",
            nextNodeId: "n3",
            scores: { classroomManagement: -1, pedagogy: -1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Kata kasar itu sudah menyebar; terdengar dari beberapa meja dengan tawa cekikikan. Beberapa anak menggunakannya untuk saling ejek, dan satu anak menangis karena dikatai dengan kata itu.",
        choices: [
          {
            label:
              "Menenangkan anak yang menangis, lalu di lingkaran sore membahas dengan bahasa anak: \"Ada kata-kata yang membuat hati teman sakit. Di kelas kita, kita pakai kata-kata yang membuat hati senang,\" dan berlatih contoh bersama.",
            effect:
              "Anak yang menangis merasa dibela, dan diskusi lingkaran memberi seluruh kelas pemahaman serta kosakata pengganti. Kata kasar itu kehilangan fungsi sosialnya dan memudar dalam beberapa hari.",
            nextNodeId: "n4",
            scores: { empathy: 2, pedagogy: 2, communication: 2 },
          },
          {
            label:
              "Mengumumkan hukuman: siapa pun yang mengucapkan kata itu tidak boleh ikut bermain di halaman hari ini.",
            effect:
              "Kata itu memang tak terdengar lagi hari ini, tapi anak-anak sibuk saling memata-matai dan mengadukan temannya. Suasana kelas berubah dari belajar bersama menjadi saling awasi.",
            nextNodeId: "n4",
            scores: { classroomManagement: 1, empathy: -2, pedagogy: -1 },
          },
          {
            label:
              "Mencari tahu dan mencatat siapa saja yang sudah mengucapkan kata itu untuk dilaporkan ke masing-masing orang tua.",
            effect:
              "Proses pendataan memakan waktu dan terasa seperti sidang bagi anak-anak. Beberapa orang tua menerima laporan dengan malu dan memarahi anaknya di rumah, tanpa ada yang menjelaskan pada anak kenapa kata itu menyakitkan.",
            nextNodeId: "n4",
            scores: { communication: -1, empathy: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Gelombang kata kasar mereda. Kamu memikirkan tindak lanjut agar kejadian ini tidak berulang, termasuk bagaimana melibatkan orang tua tanpa membuat siapa pun merasa dipermalukan.",
        choices: [
          {
            label:
              "Mengirim info umum ke grup orang tua tanpa menyebut nama: kelas sedang belajar \"kata-kata yang membuat hati senang\", dengan tips singkat mendampingi tontonan anak di rumah.",
            effect:
              "Orang tua menyambut baik karena tidak ada yang dipermalukan, dan beberapa mulai lebih memperhatikan tontonan di rumah. Sekolah dan rumah bergerak searah tanpa drama.",
            nextNodeId: "END",
            scores: { communication: 2, pedagogy: 2 },
          },
          {
            label:
              "Menghubungi orang tua Dika secara khusus dengan nada menuntut agar tontonan di rumah dibereskan, karena anaknya sumber masalah.",
            effect:
              "Orang tua Dika merasa dituduh dan hubungan sekolah-rumah menegang. Padahal kata itu bisa datang dari mana saja, dan Dika hanyalah anak pertama yang kedengaran mengucapkannya.",
            nextNodeId: "END",
            scores: { communication: -2, empathy: -1 },
          },
          {
            label:
              "Menganggap kasus selesai karena kata itu sudah tidak terdengar; tidak perlu tindak lanjut.",
            effect:
              "Tanpa penguatan, beberapa minggu kemudian kata baru yang lebih kasar muncul dengan pola penyebaran sama, dan kamu harus memulai semuanya dari nol tanpa fondasi kesepakatan kelas.",
            nextNodeId: "END",
            scores: { pedagogy: -1, classroomManagement: -1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: tanggapi kata kasar dengan datar dan batas singkat, alihkan perhatian, lalu gali sumbernya lewat obrolan empat mata yang tidak menghakimi. Bangun kesepakatan kelas tentang kata-kata yang menyenangkan hati dan libatkan orang tua lewat edukasi umum tanpa menyebut nama.",
    debriefRisky:
      "Hindari reaksi heboh yang justru memberi kata itu kekuatan, hukuman yang memicu budaya saling lapor, mempermalukan anak atau orang tua tertentu, dan mengabaikan tanpa batas sama sekali. Anak sering tidak tahu arti kata yang ia tirukan.",
  },
  {
    slug: "anak-dijemput-terlambat-sendirian",
    title: "Langit Gelap, Nino Belum Dijemput",
    description:
      "Satu jam setelah sekolah bubar, seorang anak belum juga dijemput dan mulai cemas. Teleponnya tidak tersambung. Kamu harus menjaga perasaan dan keamanan anak sambil menjalankan prosedur.",
    difficulty: "LANJUT",
    ageContext: "Kelompok A, usia 4-5 tahun, penjemputan terakhir",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Pukul 12.30, semua anak sudah pulang kecuali Nino. Ia duduk di teras memeluk tasnya, matanya bolak-balik ke gerbang. Telepon ke ibunya tidak diangkat dua kali. Nino mulai bertanya dengan suara bergetar, \"Bu, Mama kok belum datang?\"",
        choices: [
          {
            label:
              "Duduk di sampingnya dan menjawab jujur tapi menenangkan: \"Mama belum sampai, mungkin masih di jalan. Bu Guru temani Nino sampai Mama datang, ya. Kita tunggu sambil main tebak-tebakan yuk.\"",
            effect:
              "Nino menggenggam tanganmu dan mulai menjawab tebak-tebakan meski sesekali melirik gerbang. Rasa amannya terjaga karena ada kepastian: ia tidak sendirian, apa pun yang terjadi.",
            nextNodeId: "n2",
            scores: { empathy: 2, communication: 2, safety: 1 },
          },
          {
            label:
              "Menghiburnya dengan janji pasti: \"Sebentar lagi Mama datang, paling lima menit!\"",
            effect:
              "Nino menghitung menunggu, dan ketika lima menit berlalu tanpa ibunya, kecemasannya justru berlipat karena janji gurunya tidak terbukti. Ia mulai menangis dan sulit percaya hiburanmu berikutnya.",
            nextNodeId: "n3",
            scores: { communication: -2, empathy: 1 },
          },
          {
            label:
              "Meninggalkan Nino sebentar di teras dengan penjaga sekolah agar kamu bisa fokus menelepon nomor-nomor darurat di kantor.",
            effect:
              "Urusan telepon berjalan, tapi Nino yang cemas ditinggal figur yang paling ia percaya justru menangis di teras. Penjaga sekolah kebingungan menenangkannya.",
            nextNodeId: "n3",
            scores: { communication: 1, empathy: -1 },
          },
          {
            label:
              "Mengajak Nino masuk dan menyibukkannya dengan mainan sambil kamu diam-diam menelepon, tanpa membahas keterlambatan ibunya sama sekali.",
            effect:
              "Nino bermain sebentar, tapi kecemasan yang tidak dibahas tidak hilang; ia terus melirik pintu dan akhirnya bertanya lagi dengan mata berkaca. Menghindari topik justru membuatnya merasa ada yang disembunyikan.",
            nextNodeId: "n3",
            scores: { classroomManagement: 1, communication: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Nino cukup tenang bersamamu. Sudah pukul 12.50, telepon ibu dan ayahnya belum tersambung juga. Di data sekolah ada satu nomor darurat lain: neneknya. Kepala sekolah masih ada di ruangannya.",
        choices: [
          {
            label:
              "Melaporkan situasi ke kepala sekolah, lalu menghubungi nomor darurat nenek sesuai prosedur, sambil tetap menemani Nino.",
            effect:
              "Nenek Nino mengangkat telepon: ternyata ibu Nino kecelakaan ringan motor dan ponselnya mati; nenek segera meluncur. Kepala sekolah mengetahui situasi dan prosedur berjalan rapi.",
            nextNodeId: "n4",
            scores: { safety: 2, communication: 2 },
          },
          {
            label:
              "Menunggu 30 menit lagi sebelum menghubungi siapa pun; mungkin orang tuanya hanya terjebak macet.",
            effect:
              "Menunggu tanpa mengaktifkan jalur darurat membuang waktu; ternyata ibu Nino mengalami kendala dan justru berharap sekolah menghubungi nenek. Nino makin lelah dan lapar menunggu tanpa kejelasan.",
            nextNodeId: "n3",
            scores: { safety: -1, communication: -1 },
          },
          {
            label:
              "Mengantar Nino pulang ke rumahnya dengan motormu karena alamatnya kamu tahu dan tidak terlalu jauh.",
            effect:
              "Niat baik, tapi membawa anak keluar sekolah tanpa izin orang tua dan tanpa prosedur adalah risiko besar: jika terjadi apa-apa di jalan, atau penjemput datang dan anak tidak ada, situasinya jauh lebih buruk.",
            nextNodeId: "n3",
            scores: { safety: -2, empathy: 1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Nino menangis lelah dan lapar; waktunya sudah lewat jam makan siang. Situasi penjemputan masih belum jelas dan kamu harus menstabilkan keadaan dulu.",
        choices: [
          {
            label:
              "Memenuhi kebutuhan dasarnya dulu: memberi makan siang cadangan sekolah dan minum, membiarkannya makan dengan tenang sambil kamu duduk di dekatnya, lalu melanjutkan menghubungi kontak darurat.",
            effect:
              "Setelah perut terisi, tangisan Nino mereda dan ia jauh lebih tenang. Dengan anak yang stabil, kamu bisa berpikir jernih menjalankan langkah prosedur berikutnya.",
            nextNodeId: "n2",
            scores: { safety: 2, empathy: 2 },
          },
          {
            label:
              "Terus berfokus menelepon berbagai nomor sambil membiarkan Nino menangis dulu, karena kejelasan penjemput adalah hal terpenting.",
            effect:
              "Kamu mendapat sedikit kemajuan di telepon, tapi Nino menangis sampai kelelahan dan tertidur di kursi teras tanpa makan. Kebutuhan dasar anak seharusnya berjalan seiring, bukan dikalahkan prosedur.",
            nextNodeId: "n2",
            scores: { safety: -1, empathy: -2, communication: 1 },
          },
          {
            label:
              "Mengunggah foto Nino ke media sosial sekolah dengan keterangan \"menunggu dijemput\" agar orang tuanya cepat melihat.",
            effect:
              "Informasi anak sendirian di sekolah kini tersebar publik, risiko keamanan dan privasi yang serius. Beberapa orang tua lain berkomentar, dan kepala sekolah memintamu segera menghapusnya.",
            nextNodeId: "n2",
            scores: { safety: -2, communication: -2 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Nenek Nino tiba pukul 13.20 dengan wajah panik dan menjelaskan kejadian ibu Nino. Nino berlari memeluk neneknya. Masih ada langkah penutup yang menentukan bagaimana kejadian ini berakhir bagi semua pihak.",
        choices: [
          {
            label:
              "Menenangkan nenek, menyampaikan apa saja yang dilakukan Nino selama menunggu dengan nada positif, memastikan identitas penjemput sesuai data, mencatat serah terima, dan menitip salam semoga ibu Nino lekas pulih.",
            effect:
              "Nenek pulang dengan tenang dan Nino melambai sambil tersenyum. Keesokan harinya ibu Nino menelepon sekolah, berterima kasih atas penanganan yang membuat anaknya tidak trauma menunggu.",
            nextNodeId: "END",
            scores: { communication: 2, safety: 2, empathy: 1 },
          },
          {
            label:
              "Menyerahkan Nino segera karena nenek sudah datang dan kamu juga sudah sangat terlambat pulang.",
            effect:
              "Nino pulang selamat, tapi tanpa verifikasi identitas dan catatan serah terima, prosedur keamanan penjemputan bolong. Untung penjemputnya benar neneknya; lain kali bisa saja tidak.",
            nextNodeId: "END",
            scores: { safety: -2, communication: -1 },
          },
          {
            label:
              "Mengingatkan nenek dengan tegas bahwa keterlambatan seperti ini merepotkan sekolah dan tidak boleh terulang.",
            effect:
              "Nenek yang sedang panik karena anaknya kecelakaan merasa disalahkan atas hal di luar kendalinya. Nino menyaksikan neneknya ditegur, dan keluarga itu membawa pulang rasa tidak enak alih-alih rasa aman.",
            nextNodeId: "END",
            scores: { empathy: -2, communication: -2 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: temani anak dengan kejujuran yang menenangkan (tanpa janji waktu yang tak bisa dijamin), penuhi kebutuhan dasarnya, aktifkan kontak darurat dan laporkan ke pimpinan sesuai prosedur, lalu tutup dengan verifikasi identitas penjemput dan serah terima yang tercatat.",
    debriefRisky:
      "Hindari janji \"sebentar lagi\" yang tak pasti, membawa anak pulang sendiri tanpa izin dan prosedur, mengunggah informasi anak ke media sosial, menyerahkan anak tanpa verifikasi, atau menyalahkan keluarga yang sedang tertimpa musibah.",
  },
  {
    slug: "karya-anak-dirobek-teman",
    title: "Gambar Naia Sobek",
    description:
      "Gambar yang dikerjakan seorang anak dengan susah payah dirobek temannya. Ada anak yang hancur hatinya dan anak lain yang perlu dipahami motifnya. Kamu harus menangani keduanya dengan adil.",
    difficulty: "MENENGAH",
    ageContext: "Kelompok B, usia 5-6 tahun, 14 anak, kegiatan menggambar bebas",
    startNodeId: "n1",
    nodes: [
      {
        id: "n1",
        scene:
          "Naia berteriak dan menangis: gambar keluarga yang ia kerjakan sejak tadi dirobek Keisha menjadi dua. Keisha berdiri dengan potongan kertas di tangan, wajahnya keras. Anak-anak satu meja terdiam menatap kalian.",
        choices: [
          {
            label:
              "Menghampiri dan memeluk Naia dulu: \"Sedih sekali ya, gambar yang Naia buat lama sekali sobek,\" sambil meminta Keisha tetap di tempat karena kalian akan bicara setelah ini.",
            effect:
              "Naia menangis di pelukanmu, kesedihannya tertampung. Keisha menunggu dengan gelisah; kamu belum tahu motifnya, tapi urutan penanganannya sudah tepat: korban dulu, lalu cari tahu.",
            nextNodeId: "n2",
            scores: { empathy: 2, classroomManagement: 1 },
          },
          {
            label:
              "Langsung menuntut Keisha: \"Keisha! Kenapa kamu robek?! Minta maaf sekarang!\"",
            effect:
              "Keisha mengatupkan mulut rapat-rapat dan menolak bicara. Naia masih menangis tanpa ada yang menenangkan. Kamu mendapat kepatuhan yang macet dan dua anak yang sama-sama tidak tertangani.",
            nextNodeId: "n3",
            scores: { empathy: -1, communication: -2 },
          },
          {
            label:
              "Menyelamatkan situasi dengan solusi cepat: memberi Naia kertas baru dan memintanya menggambar ulang, \"Nanti bisa bikin yang lebih bagus lagi kok.\"",
            effect:
              "Bagi Naia, gambar itu bukan sekadar kertas; itu karya berjam-jam yang tak tergantikan. Solusi instanmu terasa meremehkan kehilangannya, dan tangisnya makin keras.",
            nextNodeId: "n3",
            scores: { empathy: -2, classroomManagement: 1 },
          },
          {
            label:
              "Bertanya kepada anak-anak semeja, \"Siapa yang lihat kejadiannya? Coba ceritakan,\" untuk mendapat gambaran sebelum bertindak.",
            effect:
              "Anak-anak bicara bersahutan dengan versi berbeda-beda dan suasana jadi gaduh seperti persidangan kecil. Sementara itu Naia masih menangis dan Keisha makin tersudut oleh telunjuk teman-temannya.",
            nextNodeId: "n3",
            scores: { communication: 1, empathy: -1, classroomManagement: -1 },
          },
        ],
      },
      {
        id: "n2",
        scene:
          "Naia sudah lebih tenang, memeluk dua potongan gambarnya. Kamu duduk dengan Keisha yang sedari tadi diam. Setelah kamu bertanya pelan, Keisha akhirnya berbisik, \"Naia bilang gambarku jelek. Dia bilang aku nggak bisa gambar.\"",
        choices: [
          {
            label:
              "Memvalidasi rasa sakit Keisha sambil menegaskan batas: \"Sakit hati ya dibilang begitu. Kata-kata Naia tadi memang menyakitkan. Tapi merobek gambar juga menyakiti Naia. Yuk kita selesaikan dua-duanya.\"",
            effect:
              "Keisha mengangguk dengan mata berkaca; untuk pertama kalinya ia merasa dimengerti sekaligus tahu batas yang dilanggar. Ia mau diajak duduk bersama Naia untuk saling mendengar.",
            nextNodeId: "n4",
            scores: { empathy: 2, communication: 2, pedagogy: 1 },
          },
          {
            label:
              "Menganggap ejekan Naia sebagai pemicu yang menjelaskan segalanya, dan kini balik meminta Naia yang minta maaf lebih dulu.",
            effect:
              "Naia yang gambarnya sobek merasa jadi pihak yang disalahkan; kesedihannya berubah jadi rasa tidak adil. Kedua anak sama-sama pernah disakiti, dan membalik kesalahan tidak menyelesaikan keduanya.",
            nextNodeId: "n3",
            scores: { empathy: -1, communication: -1 },
          },
          {
            label:
              "Tetap fokus pada aturan: apa pun alasannya, merusak karya teman salah, jadi Keisha harus menerima konsekuensi kehilangan waktu bermain.",
            effect:
              "Keisha menerima hukuman dengan wajah tertutup; rasa sakit karena diejek tidak pernah dibahas. Dendamnya pada Naia mengendap, dan minggu depan konflik keduanya pecah lagi dengan bentuk lain.",
            nextNodeId: "n3",
            scores: { pedagogy: -1, empathy: -2, classroomManagement: 1 },
          },
        ],
      },
      {
        id: "n3",
        scene:
          "Penyelesaian belum utuh: masih ada tangisan atau kekesalan yang mengendap di salah satu anak, dan anak-anak semeja masih membicarakan kejadian tadi. Waktu kegiatan tersisa 15 menit.",
        choices: [
          {
            label:
              "Mengulang dari kebutuhan masing-masing: menenangkan yang masih sedih, mendengar cerita kedua anak tanpa memihak, lalu memandu mereka bicara langsung satu sama lain dengan kalimat sederhana.",
            effect:
              "Setelah kedua sisi didengar, terungkap ejekan dan perobekan sama-sama menyakitkan. Keduanya menyampaikan perasaan dengan bimbinganmu, dan ketegangan meja mencair.",
            nextNodeId: "n4",
            scores: { empathy: 2, communication: 2 },
          },
          {
            label:
              "Memisahkan Naia dan Keisha ke meja berbeda untuk hari-hari berikutnya agar tidak ada gesekan lagi.",
            effect:
              "Gesekan langsung memang hilang, tapi keduanya kehilangan kesempatan belajar berdamai. Anak-anak lain menangkap pesan bahwa konflik diselesaikan dengan menjauh, bukan dengan bicara.",
            nextNodeId: "END",
            scores: { classroomManagement: 1, pedagogy: -2 },
          },
          {
            label:
              "Menutup kejadian dengan pengumuman umum, \"Sudah, tidak usah dibahas lagi, ayo lanjut menggambar,\" agar suasana pulih cepat.",
            effect:
              "Meja kembali menggambar dalam senyap, tapi Naia menggambar dengan lesu dan Keisha melamun. Konflik yang ditutup paksa tidak selesai; ia hanya pindah ke dalam.",
            nextNodeId: "END",
            scores: { classroomManagement: 1, empathy: -1, pedagogy: -1 },
          },
        ],
      },
      {
        id: "n4",
        scene:
          "Naia dan Keisha sudah saling mendengar dengan bimbinganmu. Suasana melunak. Potongan gambar Naia masih di meja, dan kedua anak menatapmu menunggu langkah berikutnya.",
        choices: [
          {
            label:
              "Menawarkan perbaikan bersama: \"Bagaimana kalau kalian berdua menyambung gambar ini dengan selotip, lalu Keisha menambahkan sesuatu yang membuat gambarnya makin bagus, kalau Naia setuju?\"",
            effect:
              "Naia setuju dengan syarat ia yang memegang selotip. Keduanya bekerja menyambung gambar, dan Keisha menambahkan taman bunga di pinggirnya. Gambar \"keluarga di taman\" itu justru dipajang dengan cerita istimewa.",
            nextNodeId: "END",
            scores: { pedagogy: 2, childAgency: 2, empathy: 1 },
          },
          {
            label:
              "Menutup dengan saling meminta maaf secara formal di depan meja, lalu kembali ke kegiatan masing-masing.",
            effect:
              "Keduanya bersalaman dan suasana cukup pulih. Penyelesaian ini layak, meski kesempatan mengubah konflik menjadi kolaborasi yang berkesan terlewat begitu saja.",
            nextNodeId: "END",
            scores: { communication: 1, classroomManagement: 1 },
          },
          {
            label:
              "Menjadikan kejadian ini contoh untuk seluruh kelas: menceritakan ulang kejadian Naia dan Keisha di lingkaran penutup sebagai pelajaran bersama.",
            effect:
              "Niatmu edukatif, tapi kedua anak kembali jadi tontonan dan rasa malu mereka terungkit lagi di depan semua teman. Pelajaran kelas bisa diberikan tanpa menyebut kejadian dan nama.",
            nextNodeId: "END",
            scores: { empathy: -2, pedagogy: 1 },
          },
        ],
      },
    ],
    debriefGood:
      "Praktik terbaik: tenangkan dulu anak yang karyanya rusak, lalu gali motif anak yang merusak tanpa menghakimi; sering kali ada rasa sakit di baliknya. Validasi kedua sisi, tegaskan batas untuk keduanya (kata-kata dan tangan sama-sama bisa menyakiti), dan tawarkan pemulihan konkret seperti memperbaiki karya bersama.",
    debriefRisky:
      "Hindari memaksa maaf sebelum emosi tertampung, meremehkan nilai karya anak (\"bikin lagi saja\"), membalik kesalahan ke korban, menghukum tanpa membahas pemicu, atau menjadikan konflik dua anak sebagai tontonan kelas.",
  },
];
