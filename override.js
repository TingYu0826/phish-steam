// const body        = document.body;
// const verifyModal = document.getElementById('verify-modal');
// const ccForm      = document.getElementById('cc-form');
//
// // 頁面一載入就顯示 Modal、鎖定背景滾動
// verifyModal.style.display = 'flex';
// body.style.overflow       = 'hidden';
//
// // 驗證完成後：隱藏 Modal、還原背景滾動
// ccForm.addEventListener('submit', e => {
//     e.preventDefault();
//     // 在這裡加入你的驗證邏輯…
//     verifyModal.style.display = 'none';
//     body.style.overflow       = '';
// });
//
// // 範例：驗證成功後，把 #success-modal 顯示出來
// document.getElementById('verify-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     // …送出驗證…
//     document.getElementById('verify-modal').style.display = 'none';
//     document.getElementById('result-modal').style.display = 'flex';
// });




// override.js (或 script.js)
//
// 1. 先取到 Modal 跟表單
const verifyModal = document.getElementById('verify-modal');
const ccForm      = document.getElementById('cc-form');

// 2. 頁面一載入，就把 Modal 顯示，並且 _不_ 鎖背景捲動
window.addEventListener('load', () => {
    verifyModal.style.display = 'flex';  // flex 代表你 CSS 裡 .modal-content 會置中
    // **移除** body.style.overflow = 'hidden';
});

// 3. 表單 submit 時隱藏 Modal、恢復背景捲動、再跳個提示
ccForm.addEventListener('submit', e => {
    e.preventDefault();

    // 隱藏信用卡驗證視窗
    verifyModal.style.display = 'none';

    // 恢復背景可以捲動（如果之前沒有設定 overflow:hidden，其實可以省這行）
    document.body.style.overflow = '';

    // 原本你要顯示「驗證成功」的 code 放這裡：
    //   例如 alert、或者再把 #result-modal 顯示出來
    alert('✅ 驗證成功，您的帳號已經解鎖！');
});
