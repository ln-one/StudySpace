/**
 * DOM 操作工具函数
 */

/**
 * 选择单个元素
 * @param {string} selector - CSS 选择器
 * @param {Element} parent - 父元素，默认 document
 * @returns {Element|null}
 */
function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * 选择多个元素
 * @param {string} selector - CSS 选择器
 * @param {Element} parent - 父元素，默认 document
 * @returns {NodeList}
 */
function $$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * 添加事件监听
 * @param {Element|string} target - 目标元素或选择器
 * @param {string} event - 事件类型
 * @param {Function} handler - 事件处理函数
 */
function on(target, event, handler) {
  const el = typeof target === 'string' ? $(target) : target;
  if (el) {
    el.addEventListener(event, handler);
  }
}

/**
 * 事件委托
 * @param {Element|string} parent - 父元素或选择器
 * @param {string} event - 事件类型
 * @param {string} childSelector - 子元素选择器
 * @param {Function} handler - 事件处理函数
 */
function delegate(parent, event, childSelector, handler) {
  const el = typeof parent === 'string' ? $(parent) : parent;
  if (el) {
    el.addEventListener(event, (e) => {
      const target = e.target.closest(childSelector);
      if (target && el.contains(target)) {
        handler.call(target, e);
      }
    });
  }
}

/**
 * 切换类名
 * @param {Element|string} target - 目标元素或选择器
 * @param {string} className - 类名
 * @param {boolean} force - 强制添加或移除
 */
function toggleClass(target, className, force) {
  const el = typeof target === 'string' ? $(target) : target;
  if (el) {
    el.classList.toggle(className, force);
  }
}

/**
 * 显示元素
 * @param {Element|string} target - 目标元素或选择器
 */
function show(target) {
  const el = typeof target === 'string' ? $(target) : target;
  if (el) {
    el.style.display = '';
  }
}

/**
 * 隐藏元素
 * @param {Element|string} target - 目标元素或选择器
 */
function hide(target) {
  const el = typeof target === 'string' ? $(target) : target;
  if (el) {
    el.style.display = 'none';
  }
}

/**
 * 创建元素
 * @param {string} tag - 标签名
 * @param {Object} attrs - 属性对象
 * @param {string|Element|Array} children - 子元素
 * @returns {Element}
 */
function createElement(tag, attrs = {}, children = null) {
  const el = document.createElement(tag);
  
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });
  
  if (children) {
    if (typeof children === 'string') {
      el.textContent = children;
    } else if (Array.isArray(children)) {
      children.forEach(child => el.appendChild(child));
    } else {
      el.appendChild(children);
    }
  }
  
  return el;
}
