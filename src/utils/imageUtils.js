// 生成隨機圖片URL
export const getRandomImage = (width = 300, height = 200) => {
  const categories = ['nature', 'city', 'food', 'business', 'technology'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return `https://source.unsplash.com/random/${width}x${height}/?${randomCategory}`;
};

// 生成產品圖片URL
export const getProductImage = (productId, width = 300, height = 300) => {
  return `https://source.unsplash.com/random/${width}x${height}/?product&sig=${productId}`;
};

// 生成用戶頭像URL
export const getUserAvatar = (userId, size = 100) => {
  return `https://source.unsplash.com/random/${size}x${size}/?portrait&sig=${userId}`;
}; 