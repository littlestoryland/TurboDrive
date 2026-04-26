let mode = "LOGIN"; 

function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerText = msg; t.className = "show";
    setTimeout(() => { t.className = ""; }, 3000);
}

function updateUI() {
    const title = document.getElementById('formTitle');
    const btn = document.getElementById('mainBtn');
    const extra = document.getElementById('signup-extra');
    const toggle = document.getElementById('toggleLink');
    const forgot = document.getElementById('forgotBtn');

    if (mode === "LOGIN") {
        title.innerText = "Login"; 
        btn.innerText = "LOGIN";
        extra.style.display = "none";
        toggle.innerText = "New here? Sign Up";
        forgot.style.display = "block";
    } else if (mode === "SIGNUP") {
        title.innerText = "Sign Up"; 
        btn.innerText = "REGISTER";
        extra.style.display = "block";
        document.getElementById('extraLabel').innerText = "Recovery Key (Fav Car?)";
        toggle.innerText = "Back to Login";
        forgot.style.display = "none";
    } else if (mode === "RECOVERY") {
        title.innerText = "Reset Password"; 
        btn.innerText = "VERIFY KEY";
        extra.style.display = "block";
        document.getElementById('extraLabel').innerText = "Enter Recovery Key";
        toggle.innerText = "Cancel";
        forgot.style.display = "none";
    } else if (mode === "NEW_PASS") {
        title.innerText = "Set New Password"; 
        btn.innerText = "SAVE & LOGIN";
        extra.style.display = "none";
    }
}

function toggleAuth() {
    mode = (mode === "LOGIN") ? "SIGNUP" : "LOGIN";
    updateUI();
}

function toggleForgot() {
    mode = "RECOVERY";
    updateUI();
}

function handleAuth() {
    const user = document.getElementById('username').value.trim();
    const passField = document.getElementById('password');
    const ans = document.getElementById('securityAnswer') ? document.getElementById('securityAnswer').value.trim().toLowerCase() : '';

    if (!user) { showToast("Enter username"); return; }
    
    const stored = localStorage.getItem(user);
    const userData = stored ? JSON.parse(stored) : null;

    if (mode === "LOGIN") {
        if (userData && userData.pass === passField.value) {
            showToast("Welcome Back!");
            setTimeout(() => location.href = 'home.html', 1000);
        } else { showToast("Wrong credentials"); }
    } 
    else if (mode === "SIGNUP") {
        if (!passField.value || !ans) { showToast("Fill all fields"); return; }
        if (userData) { showToast("Username taken"); return; }
        
        localStorage.setItem(user, JSON.stringify({ pass: passField.value, recovery: ans }));
        showToast("Account Created! You can now login.");
        mode = "LOGIN"; updateUI();
    } 
    else if (mode === "RECOVERY") {
        if (userData && userData.recovery === ans) {
            showToast("Key Verified! Enter a New Password below.");
            mode = "NEW_PASS";
            passField.value = "";
            updateUI();
        } else { showToast("Wrong Recovery Key"); }
    }
    else if (mode === "NEW_PASS") {
        if (!passField.value) { showToast("Enter new password"); return; }
        userData.pass = passField.value;
        localStorage.setItem(user, JSON.stringify(userData));
        showToast("Password Saved! Logging in...");
        setTimeout(() => location.href = 'home.html', 1000);
    }
}

// Support hitting "Enter" to submit
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAuth();
});
