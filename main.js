// ===== INIT AOS =====
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-quad'
    });

    // ===== TOAST NOTIFICATION =====
    function showToast(message, icon = 'bi-check-circle-fill') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = 'toast-custom';
      toast.innerHTML = `
        <i class="bi ${icon}"></i>
        <span>${message}</span>
      `;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = '0.4s ease';
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    }

    // ===== ADD TO CART =====
    const orderItems = [];
    
    document.querySelectorAll('.btn-add-cart:not([disabled])').forEach(button => {
      button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        const price = this.getAttribute('data-price');
        const formattedPrice = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(price);

        // Tambahkan ke daftar pesanan
        orderItems.push(product);
        
        // Update textarea dengan ringkasan pesanan
        const summary = orderItems.map(item => `- ${item}`).join('\n');
        const textarea = document.getElementById('formPesan');
        if (textarea) {
          textarea.value = `Halo Mak Uncu, saya mau pesan:\n${summary}\n\nAlamat pengiriman: `;
        }

        // Animasi button
        this.classList.add('added');
        this.innerHTML = '<i class="bi bi-check-lg"></i> Ditambahkan';
        setTimeout(() => {
          this.classList.remove('added');
          this.innerHTML = '<i class="bi bi-cart-plus"></i> Pesan';
        }, 2000);

        showToast(`${product} · ${formattedPrice} ditambahkan ke keranjang!`, 'bi-cart-check-fill');
      });
    });

    // ===== CONTACT FORM - Kirim ke WhatsApp =====
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nama = document.getElementById('formNama').value.trim();
      const hp = document.getElementById('formHp').value.trim();
      const pesan = document.getElementById('formPesan').value.trim();

      if (!nama || !hp || !pesan) {
        showToast('Mohon isi semua field yang diperlukan!', 'bi-exclamation-circle-fill');
        return;
      }

      // Format nomor WhatsApp (hapus karakter non-digit)
      const cleanHp = hp.replace(/\D/g, '');
      let waNumber = cleanHp;
      if (waNumber.startsWith('0')) {
        waNumber = '62' + waNumber.substring(1);
      } else if (!waNumber.startsWith('62')) {
        waNumber = '62' + waNumber;
      }

      // Buat pesan WhatsApp
      const message = `Nama: ${nama}\nNo. HP: ${hp}\n\nPesanan:\n${pesan}`;
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
      
      // Buka WhatsApp
      window.open(waUrl, '_blank');
      
      // Tampilkan toast sukses
      showToast('Pesan berhasil dikirim ke WhatsApp!', 'bi-whatsapp');
      
      // Reset form
      this.reset();
      document.getElementById('formPesan').value = '';
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const offset = targetEl.offsetTop - 76;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });

    // ===== NAVBAR CTA =====
    document.querySelector('.navbar .btn-primary-custom')?.addEventListener('click', function(e) {
      e.preventDefault();
      const contact = document.getElementById('contact');
      if (contact) {
        const offset = contact.offsetTop - 76;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });

    console.log('Soto Mak Uncu — Professional Landing Page ready! 🍲');