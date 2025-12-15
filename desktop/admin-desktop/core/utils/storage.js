/**
 * 本地存储工具函数
 */

const STORAGE_PREFIX = 'studyspace_admin_';

/**
 * 设置本地存储
 * @param {string} key - 键名
 * @param {*} value - 值
 */
function setStorage(key, value) {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(STORAGE_PREFIX + key, data);
  } catch (e) {
    console.error('Storage set error:', e);
  }
}

/**
 * 获取本地存储
 * @param {string} key - 键名
 * @param {*} defaultValue - 默认值
 * @returns {*}
 */
function getStorage(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Storage get error:', e);
    return defaultValue;
  }
}

/**
 * 移除本地存储
 * @param {string} key - 键名
 */
function removeStorage(key) {
  localStorage.removeItem(STORAGE_PREFIX + key);
}

/**
 * 清空所有本地存储
 */
function clearStorage() {
  Object.keys(localStorage)
    .filter(key => key.startsWith(STORAGE_PREFIX))
    .forEach(key => localStorage.removeItem(key));
}

/**
 * 设置会话存储
 * @param {string} key - 键名
 * @param {*} value - 值
 */
function setSession(key, value) {
  try {
    const data = JSON.stringify(value);
    sessionStorage.setItem(STORAGE_PREFIX + key, data);
  } catch (e) {
    console.error('Session set error:', e);
  }
}

/**
 * 获取会话存储
 * @param {string} key - 键名
 * @param {*} defaultValue - 默认值
 * @returns {*}
 */
function getSession(key, defaultValue = null) {
  try {
    const data = sessionStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Session get error:', e);
    return defaultValue;
  }
}
