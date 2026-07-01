const defaultData = {
  brideName: 'Siska Amelia',
  groomName: 'Dimas',
  brideDesc: 'Putri kedua dari Bpk. Wahab & Ibu Entin',
  groomDesc: 'Putra pilihan keluarga yang insya Allah menjadi imam terbaik',
  dateText: '30 Mei 2026',
  mapLink: 'https://maps.app.goo.gl/hRDqyxbHkKn1B6dF6',
  danaGroom: '082315640398',
  danaBride: '085314300851',
  openingText: 'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami.',
  storyOne: 'Kami saling mengenal dari pertemuan sederhana. Dari obrolan kecil, tumbuh rasa nyaman yang tidak pernah kami duga.',
  storyTwo: 'Hubungan ini tidak hanya tumbuh karena rasa sayang, tetapi juga karena niat baik untuk menjaga satu sama lain dan melangkah ke arah yang lebih serius dengan restu keluarga.',
  storyThree: 'Dengan memohon ridho Allah SWT, kami memantapkan hati untuk melangkah ke jenjang pernikahan dan membangun keluarga yang sakinah, mawaddah, warahmah.',
  prayerText: 'Semoga Allah menghimpun yang terserak dari keduanya, memberkahi mereka berdua, dan kiranya Allah meningkatkan kualitas keturunan mereka, menjadikannya pembuka pintu rahmat, sumber ilmu dan hikmah, serta pemberi rasa aman bagi umat.',
  closingText: 'Bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu. Atas kehadiran dan doanya kami ucapkan terima kasih. Wassalamu’alaikum Warahmatullahi Wabarakatuh.',
  brideImg: 'assets/bride_real.jpg',
  groomImg: 'assets/groom_real.jpg',
  photo1Img: 'assets/photo1.jpg',
  photo2Img: 'assets/photo2.jpg',
  photo3Img: 'assets/photo3.jpg',
  photo4Img: 'assets/photo4.jpg',
  photo5Img: 'assets/photo5.jpg',
  photo6Img: 'assets/photo6.jpg'
};

function getData(key) {
  return localStorage.getItem(key) || defaultData[key] || '';
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setSrc(id, value) {
  const el = document.getElementById(id);
  if (el) el.src = value;
}

function applyMainContent() {
  const brideName = getData('brideName');
  const groomName = getData('groomName');
  const mapLink = getData('mapLink');
  const danaGroom = getData('danaGroom');

  setText('heroNames', `${brideName.split(' ')[0]} & ${groomName}`);
  setText('weddingDateText', getData('dateText'));
  setText('openingText', getData('openingText'));
  setText('brideName', brideName);
  setText('groomName', groomName);
  setText('brideDesc', getData('brideDesc'));
  setText('groomDesc', getData('groomDesc'));
  setText('storyOne', getData('storyOne'));
  setText('storyTwo', getData('storyTwo'));
  setText('storyThree', getData('storyThree'));
  setText('prayerText', getData('prayerText'));
  setText('closingText', getData('closingText'));
  setText('danaGroom', danaGroom);
  setText('danaBride', getData('danaBride'));

  ['mapButton', 'mapButton2'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = mapLink;
  });

  const confirmWa = document.getElementById('confirmWa');
  if (confirmWa) {
    const waNumber = normalizeWaNumber(danaGroom);
    confirmWa.href = `https://wa.me/${waNumber}?text=${encodeURIComponent('Assalamualaikum, saya ingin konfirmasi amplop digital untuk ' + groomName + ' & ' + brideName + '.')}`;
  }

  const shareWa = document.getElementById('shareWa');
  if (shareWa) {
    const url = window.location.href;
    shareWa.href = `https://wa.me/?text=${encodeURIComponent('Assalamualaikum, saya mengundang Anda untuk hadir di acara pernikahan ' + groomName + ' & ' + brideName + '. Buka undangan: ' + url)}`;
  }

  setSrc('brideImg', getData('brideImg'));
  setSrc('groomImg', getData('groomImg'));
  for (let i = 1; i <= 6; i++) setSrc(`photo${i}`, getData(`photo${i}Img`));
}

function normalizeWaNumber(number) {
  const digits = String(number || '').replace(/\D/g, '');
  if (digits.startsWith('0')) return '62' + digits.slice(1);
  if (digits.startsWith('62')) return digits;
  return digits || '6285314300851';
}

function updateCountdown() {
  const target = new Date('2026-05-30T08:00:00+07:00').getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);
  setText('days', String(days).padStart(2, '0'));
  setText('hours', String(hours).padStart(2, '0'));
  setText('minutes', String(minutes).padStart(2, '0'));
  setText('seconds', String(seconds).padStart(2, '0'));
}

function appendChatMessage(type, text) {
  const box = document.getElementById('chatMessages');
  if (!box) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function botReply(text) {
  const msg = text.toLowerCase();
  if (msg.includes('lokasi') || msg.includes('dimana') || msg.includes('maps')) return 'Lokasi acara ada di Ds. Pangrumasan, Kp. Bojongsari. Tombol Google Maps sudah tersedia di bagian Detail Acara.';
  if (msg.includes('kapan') || msg.includes('tanggal') || msg.includes('jam')) return 'Insya Allah akad dimulai Sabtu, 30 Mei 2026 pukul 08.00 WIB dan resepsi pukul 09.00 WIB.';
  if (msg.includes('dana') || msg.includes('amplop') || msg.includes('hadiah')) return 'Amplop digital tersedia di bagian Amplop Digital. Silakan copy nomor DANA atau konfirmasi via WhatsApp.';
  if (msg.includes('assalam') || msg.includes('halo') || msg.includes('hai')) return 'Waalaikumsalam, halo! Ada yang bisa saya bantu tentang undangan ini?';
  return 'Terima kasih. Untuk informasi lebih lengkap, silakan cek bagian detail acara, lokasi, galeri, dan amplop digital.';
}

function renderComments() {
  const list = document.getElementById('commentList');
  if (!list) return;
  const comments = JSON.parse(localStorage.getItem('publicComments') || '[]');
  list.innerHTML = '';
  if (!comments.length) {
    list.innerHTML = '<div class="comment"><strong>Admin:</strong> Jadilah tamu pertama yang memberi doa terbaik.</div>';
    return;
  }
  comments.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'comment';
    const strong = document.createElement('strong');
    strong.textContent = `${item.name}: `;
    const span = document.createElement('span');
    span.textContent = item.text;
    div.appendChild(strong);
    div.appendChild(span);
    list.appendChild(div);
  });
}

function fileToDataUrl(file, cb) {
  const reader = new FileReader();
  reader.onload = (event) => cb(event.target.result);
  reader.readAsDataURL(file);
}

function fillAdminForm() {
  const fields = [
    'brideName', 'groomName', 'brideDesc', 'groomDesc', 'dateText', 'mapLink', 'danaGroom', 'danaBride',
    'openingText', 'storyOne', 'storyTwo', 'storyThree', 'prayerText', 'closingText'
  ];
  fields.forEach((key) => {
    const id = 'edit' + key.charAt(0).toUpperCase() + key.slice(1);
    const el = document.getElementById(id);
    if (el) el.value = getData(key);
  });
  setSrc('previewBride', getData('brideImg'));
  setSrc('previewGroom', getData('groomImg'));
  for (let i = 1; i <= 6; i++) setSrc(`previewPhoto${i}`, getData(`photo${i}Img`));
}

function setupAdminImages() {
  const inputs = [
    ['editBrideImg', 'previewBride', 'brideImg'],
    ['editGroomImg', 'previewGroom', 'groomImg'],
    ['editPhoto1', 'previewPhoto1', 'photo1Img'],
    ['editPhoto2', 'previewPhoto2', 'photo2Img'],
    ['editPhoto3', 'previewPhoto3', 'photo3Img'],
    ['editPhoto4', 'previewPhoto4', 'photo4Img'],
    ['editPhoto5', 'previewPhoto5', 'photo5Img'],
    ['editPhoto6', 'previewPhoto6', 'photo6Img']
  ];
  inputs.forEach(([inputId, previewId, key]) => {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (!input || !preview) return;
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;
      fileToDataUrl(file, (dataUrl) => {
        localStorage.setItem(key, dataUrl);
        preview.src = dataUrl;
      });
    });
  });
}

function saveAdminText() {
  const fields = [
    'brideName', 'groomName', 'brideDesc', 'groomDesc', 'dateText', 'mapLink', 'danaGroom', 'danaBride',
    'openingText', 'storyOne', 'storyTwo', 'storyThree', 'prayerText', 'closingText'
  ];
  fields.forEach((key) => {
    const id = 'edit' + key.charAt(0).toUpperCase() + key.slice(1);
    const el = document.getElementById(id);
    if (el) localStorage.setItem(key, el.value.trim() || defaultData[key] || '');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const nameForm = document.getElementById('nameForm');
  if (nameForm) {
    nameForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const fullName = document.getElementById('fullName').value.trim();
      if (!fullName) return;
      localStorage.setItem('visitorName', fullName);
      const overlay = document.getElementById('loadingOverlay');
      const msg = document.getElementById('loadingMessage');
      msg.textContent = `Selamat datang ${fullName}, di website The Wedding Dimas & Siska. Mohon tunggu ya...`;
      overlay.style.display = 'grid';
      setTimeout(() => window.location.href = 'main.html', 2200);
    });
    return;
  }

  if (document.getElementById('heroNames')) {
    const visitorName = localStorage.getItem('visitorName');
    if (!visitorName) {
      window.location.href = 'index.html';
      return;
    }
    applyMainContent();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    renderComments();

    appendChatMessage('bot', `Halo ${visitorName}! Selamat datang di undangan Dimas & Siska.`);

    const music = document.getElementById('weddingMusic');
    const musicBtn = document.getElementById('musicBtn');
    if (music && musicBtn) {
      musicBtn.addEventListener('click', async () => {
        try {
          if (music.paused) {
            await music.play();
            musicBtn.textContent = 'Ⅱ';
          } else {
            music.pause();
            musicBtn.textContent = '♫';
          }
        } catch (error) {
          alert('File musik belum ada. Masukkan file backsound.mp3 ke folder assets.');
        }
      });
    }

    const helpPanel = document.getElementById('helpPanel');
    document.getElementById('chatToggle').addEventListener('click', () => helpPanel.classList.toggle('open'));
    document.getElementById('closeHelp').addEventListener('click', () => helpPanel.classList.remove('open'));

    document.getElementById('chatForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if (!text) return;
      appendChatMessage('user', text);
      input.value = '';
      setTimeout(() => appendChatMessage('bot', botReply(text)), 500);
    });

    document.getElementById('commentForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.getElementById('commentInput');
      const text = input.value.trim();
      if (!text) return;
      const comments = JSON.parse(localStorage.getItem('publicComments') || '[]');
      comments.push({ name: visitorName, text, time: Date.now() });
      localStorage.setItem('publicComments', JSON.stringify(comments));
      input.value = '';
      renderComments();
    });

    document.querySelectorAll('.copy-btn').forEach((button) => {
      button.addEventListener('click', async () => {
        const target = document.getElementById(button.dataset.copyTarget);
        const text = target ? target.textContent.trim() : '';
        try {
          await navigator.clipboard.writeText(text);
          const old = button.textContent;
          button.textContent = 'Copied';
          setTimeout(() => (button.textContent = old), 1200);
        } catch (error) {
          alert('Nomor: ' + text);
        }
      });
    });

    window.addEventListener('storage', (event) => {
      if (event.key === 'publicComments') renderComments();
    });
    return;
  }

  if (document.getElementById('adminLoginForm')) {
    const loginForm = document.getElementById('adminLoginForm');
    const loginError = document.getElementById('loginError');
    const loginContainer = document.getElementById('loginFormContainer');
    const adminPanel = document.getElementById('adminPanel');
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('adminEmail').value.trim();
      const pass = document.getElementById('adminPassword').value.trim();
      const ok = email === 'sunandarradit3@gmail.com' && pass === '082009';
      if (!ok) {
        loginError.style.display = 'block';
        return;
      }
      loginError.style.display = 'none';
      loginContainer.style.display = 'none';
      adminPanel.style.display = 'block';
      fillAdminForm();
      setupAdminImages();
    });

    document.getElementById('saveContentForm').addEventListener('submit', (event) => {
      event.preventDefault();
      saveAdminText();
      const success = document.getElementById('saveSuccess');
      success.style.display = 'block';
      setTimeout(() => success.style.display = 'none', 2200);
    });
  }
});
