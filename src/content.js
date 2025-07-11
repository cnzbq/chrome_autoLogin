//console.log("内容脚本已加载");
// 页面条件检测
function shouldFill() {
  const pageTitle = document.title;
  const currentUrl = window.location.href;
  // 网站标题为xxxx以及路径包含login
  return pageTitle.includes('xxxx登录界面') && 
         currentUrl.includes('login');
}

// 增强型密码检测
function detectPasswordFields() {
  const candidates = [
    'input[type="password"]',
    'input[name*="pass"]',
    'input[id*="pass"]',
    '[aria-label*="password"]'
  ];
  
  return candidates.flatMap(selector => 
    [...document.querySelectorAll(selector)]
      .filter(el => el.offsetParent !== null)
  );
}

// 安全填充函数
function safeFill(field) {
  if (!field.value) {
    field.value = '需要填充的密码';
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }
  return false;
}

// 增强型登录按钮查找
function detectFindLoginButton() {
  const candidates = [
    'button[type="submit"]',
    'input[type="submit"]',
    '*[id*="login"]',
    '*[class*="login"]',
    '*[onclick*="login"]'
  ];
  return candidates.flatMap(s => 
    [...document.querySelectorAll(s)].filter(el => el.offsetParent)
  )[0]; // 取第一个有效按钮
}

// 查找登录按钮
function findLoginButton() {
  return document.querySelectorAll('button')[0];
}

if (shouldFill()) {
// 主逻辑
  const observer = new MutationObserver(() => {
    const fields = detectPasswordFields();
    if (fields.length > 0) {
      fields.some(safeFill);
	  
	  // 登录按钮
	  const loginBtn = findLoginButton();
	   if (loginBtn) {
		   setTimeout(() => {
			 loginBtn.click();
           }, 500); // 延迟500ms确保填充生效
	   }
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['type', 'name', 'id']
  });

  // 超时清理
  setTimeout(() => observer?.disconnect(), 5000);
}

// 获取当前日期
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 字符串逆转
function strReverse(str){
	return str.split('').reverse().join('')
}
