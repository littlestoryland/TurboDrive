let mode = "LOGIN"; 

function showToast(msg) {
    const t = document.getElementById('toast');
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
        title.innerText = "Login"; btn.innerText = "LOGIN";
        extra.style.display = "none";
        toggle.innerText = "New here? Sign Up";
        forgot.style.display = "block";
    } else if (mode === "SIGNUP") {
        title.innerText = "Sign Up"; btn.innerText = "REGISTER";
        extra.style.display = "block";
        toggle.innerText = "Back to Login";
        forgot.style.display = "none";
    } else if (mode === "RECOVERY") {
        title.innerText = "Reset Pass"; btn.innerText = "VERIFY";
        extra.style.display = "block";
        toggle.innerText = "Cancel";
        forgot.style.display = "none";
    }
}

function handleAuth() {
    const user = document.getElementById('username').value.trim();
    const passField = document.getElementById('password');
    const ans = document.getElementById('securityAnswer').value.trim().toLowerCase();

    if (!user) { showToast("Enter username"); return; }
    const stored = localStorage.getItem(user);
    const userData = stored ? JSON.parse(stored) : null;

    if (mode === "LOGIN") {
        if (userData && userData.pass === passField.value) {
            showToast("Welcome!");
            setTimeout(() => location.href = 'home.html', 1000);
        } else { showToast("Wrong credentials"); }
    } else if (mode === "SIGNUP") {
        if (!passField.value || !ans) { showToast("Fill all fields"); return; }
        localStorage.setItem(user, JSON.stringify({pass: passField.value, recovery: ans}));
        showToast("Done!"); mode = "LOGIN"; updateUI();
    } else if (mode === "RECOVERY") {
        if (userData && userData.recovery === ans) {
            showToast("Key Verified! Enter New Pass");
            mode = "NEW_PASS";
            document.getElementById('formTitle').innerText = "New Password";
            btn.innerText = "SAVE";
        } else { showToast("Wrong Key"); }
    }
}
