const topics = [
    {
        id: 1,
        title: "Empowerment Amil",
        desc: "Menggali & Meningkatkan potensi Amil, melampaui empowerment mustahiq.",
        icon: "🚀"
    },
    {
        id: 2,
        title: "Kesehatan Mental & Wellbeing",
        desc: "Menjaga keseimbangan kerja (work-life balance) dan kesehatan mental Amil.",
        icon: "🧘‍♂️"
    },
    {
        id: 3,
        title: "Rekrutmen & Seleksi",
        desc: "Strategi efektif merekrut talent unggul yang sejalan dengan culture OPZ.",
        icon: "🎯"
    },
    {
        id: 4,
        title: "KPI & Penilaian Kinerja",
        desc: "Menyusun indikator kinerja yang objektif dan terukur untuk para Amil.",
        icon: "📊"
    },
    {
        id: 5,
        title: "Kompensasi & Benefit",
        desc: "Manajemen remunerasi yang kompetitif dan adil untuk mempertahankan talent.",
        icon: "🎁"
    },
    {
        id: 6,
        title: "Strategi Komunikasi Internal",
        desc: "Membangun komunikasi asertif antar divisi untuk kelancaran program.",
        icon: "📢"
    },
    {
        id: 7,
        title: "Budaya Kerja & Engagement",
        desc: "Membangun lingkungan kerja kolaboratif dan meningkatkan keterikatan Amil.",
        icon: "🤝"
    },
    {
        id: 8,
        title: "Resolusi Konflik",
        desc: "Pendekatan efektif dalam menangani dinamika dan masalah antar tim.",
        icon: "⚖️"
    },
    {
        id: 9,
        title: "Retensi Karyawan",
        desc: "Strategi mempertahankan amil berprestasi dan mengelola talent management.",
        icon: "🛡️"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('quizGrid');
    const registrationSection = document.getElementById('registrationSection');
    const selectedThemeLabel = document.getElementById('selectedThemeLabel');
    const hiddenThemeInput = document.getElementById('hiddenThemeInput');
    const regForm = document.getElementById('regForm');
    const modalOverlay = document.getElementById('modalOverlay');
    const btnCloseModal = document.getElementById('btnCloseModal');

    // Generate Cards
    topics.forEach((topic, index) => {
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.dataset.id = topic.id;
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="card-number">0${topic.id}</div>
            <div class="card-icon">${topic.icon}</div>
            <h3 class="card-title">${topic.title}</h3>
            <p class="card-desc">${topic.desc}</p>
        `;

        card.addEventListener('click', () => selectCard(topic, card));
        grid.appendChild(card);
    });

    // Handle Selection
    function selectCard(topic, cardElement) {
        document.querySelectorAll('.topic-card').forEach(c => {
            c.classList.remove('selected');
        });

        cardElement.classList.add('selected');
        
        // Tampilkan Form
        registrationSection.style.display = 'block';
        
        // Update Label dan Input Hidden
        selectedThemeLabel.textContent = topic.title;
        hiddenThemeInput.value = topic.title;
        
        // Scroll ke form
        registrationSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    // Tangani saat form disubmit
    regForm.addEventListener('submit', () => {
        // Flag global submitted=true agar iframe tahu form sudah dikirim
        window.submitted = true;
        
        // Ubah tombol jadi loading state
        const btn = document.getElementById('btnSubmit');
        btn.textContent = 'Mengirim...';
        btn.disabled = true;
    });

    // Fungsi ini dipanggil dari dalam index.html lewat onload iframe
    window.showSuccessModal = function() {
        modalOverlay.classList.add('active');
        
        // Reset form dan tombol
        regForm.reset();
        const btn = document.getElementById('btnSubmit');
        btn.textContent = 'Kirim Pendaftaran';
        btn.disabled = false;
        
        // Sembunyikan form kembali
        registrationSection.style.display = 'none';
        document.querySelectorAll('.topic-card').forEach(c => {
            c.classList.remove('selected');
        });
    };

    // Close Modal
    if(btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
});
