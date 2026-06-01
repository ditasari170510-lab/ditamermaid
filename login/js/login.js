document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Mengambil nilai input username dan password
    const usernameValue = document.getElementById("username").value.trim();
    const passwordValue = document.getElementById("password").value.trim();

    // Validasi dasar jika inputan kosong
    if (!usernameValue || !passwordValue) {
        alert("Username dan Password wajib diisi!");
        return;
    }

    try {
        // Menembak data ke API Heri Susanta
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(usernameValue)}&password=${encodeURIComponent(passwordValue)}`
        });

        const data = await res.json();

        // Cek respons dari server API
        if (data.status === "success") {
            // Simpan nama user yang login ke penyimpanan browser
            localStorage.setItem("username", data.username);
            
            // 1. Sembunyikan seluruh isi form username & password biar tidak menumpuk ke bawah
            document.getElementById("loginContentArea").style.display = "none";
            
            // 2. Munculkan pesan sukses pas di tengah-tengah kartu login
            const successBox = document.getElementById("successMessage");
            successBox.style.display = "block";
            
            // 3. Setelah 2 detik, langsung pindah otomatis ke halaman index utama
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);
             
        } else {
            // Pesan jika username atau password salah (bukan heri / 123)
            alert("Username atau Password salah, silakan coba lagi.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi masalah koneksi ke server API.");
    } 
});
