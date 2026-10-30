export const HOTEL_PHONE = "+919064022151"; // Hotel Sonar Bangla Goa Direct Contact
export const HOTEL_PHONE_DISPLAY = "+91 90640 22151";
export const HOTEL_WHATSAPP = "919064022151"; // For wa.me link
export const HOTEL_EMAIL = "reservations.goa@sonarbangla.com";
export const HOTEL_ADDRESS = "Calangute - Baga Road, Near Beach, North Goa, 403516, India";
export const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=Hotel+Sonar+Bangla+Calangute+Goa";

export interface WhatsAppInquiryParams {
  roomName?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  roomType?: string;
  specialRequest?: string;
  photoTitle?: string;
  source?: string;
}

export function buildWhatsAppUrl(params: WhatsAppInquiryParams = {}): string {
  let message = `🌴 *Inquiry for Hotel Sonar Bangla (Goa)*\n\n`;

  if (params.roomName) {
    message += `🏨 *Room:* ${params.roomName}\n`;
  }
  if (params.roomType && !params.roomName) {
    message += `🏨 *Preferred Room Type:* ${params.roomType}\n`;
  }
  if (params.checkIn) {
    message += `📅 *Check-in Date:* ${params.checkIn}\n`;
  }
  if (params.checkOut) {
    message += `📅 *Check-out Date:* ${params.checkOut}\n`;
  }
  if (params.guests) {
    message += `👥 *Number of Guests:* ${params.guests}\n`;
  }
  if (params.photoTitle) {
    message += `📸 *Interested in this setup:* "${params.photoTitle}"\n`;
    message += `(I saw this in your Goa Moments gallery and want something similar!)\n`;
  }
  if (params.specialRequest) {
    message += `✨ *Special Request:* ${params.specialRequest}\n`;
  }

  message += `\nHello! Please share your best direct rates and room availability. Thank you!`;

  return `https://wa.me/${HOTEL_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function buildCallUrl(): string {
  return `tel:${HOTEL_PHONE}`;
}

