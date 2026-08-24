export const contactConfig = {
  whatsappNumber: '905555555555',
  whatsappMessage: 'Merhaba Temiz Yemek, bilgi almak ve sipariş vermek istiyorum.',
  instagramUrl: 'https://instagram.com/temizyemek',
  address: 'Temiz Yemek, İstanbul',
  workingHours: 'Her gün 10:00 - 21:00',
};

export const buildWhatsAppLink = () => {
  const phone = contactConfig.whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(contactConfig.whatsappMessage);
  return `https://wa.me/${phone}?text=${text}`;
};
