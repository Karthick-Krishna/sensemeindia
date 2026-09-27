interface WhatsAppMessageParams {
  productName: string;
  category?: string;
  variant?: string;
  quantity?: number;
  productUrl?: string;
  sku?: string;
}

export function generateWhatsAppMessage({
  productName,
  category,
  variant,
  quantity = 1,
  productUrl,
  sku,
}: WhatsAppMessageParams): string {
  let message = `Hello SenseMe India,\n\nI am interested in:\n`;
  message += `Product: ${productName}\n`;
  if (category) message += `Category: ${category}\n`;
  if (variant) message += `Variant: ${variant}\n`;
  message += `Quantity: ${quantity}\n`;
  if (sku) message += `SKU: ${sku}\n`;
  if (productUrl) message += `Product URL:\n${productUrl}\n`;
  message += `\nPlease share the current price, availability and ordering details.\n\nThank you.`;
  return message;
}

export function generateWhatsAppUrl(
  phoneNumber: string,
  message: string
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function generateShareMessage(
  productName: string,
  productUrl: string
): string {
  return `Take a look at this botanical formulation from SenseMe India:\n${productName}\n${productUrl}`;
}

export function generateGeneralWhatsAppMessage(): string {
  return `Hello SenseMe India,\n\nI would like to know more about your botanical products. Please share details.\n\nThank you.`;
}

interface WholesaleMessageParams {
  businessType?: string;
  productsOfInterest?: string;
  estimatedVolume?: string;
}

export function generateWholesaleWhatsAppMessage(params?: WholesaleMessageParams): string {
  if (!params) {
    return `Hello SenseMe India,\n\nI am interested in wholesale/bulk ordering. Please share details about your wholesale rate card.\n\nThank you.`;
  }
  let message = `Hello SenseMe India,\n\nI am interested in wholesale/bulk supply with details:\n\n`;
  if (params.businessType) message += `Business: ${params.businessType}\n`;
  if (params.productsOfInterest) message += `Products of Interest: ${params.productsOfInterest}\n`;
  if (params.estimatedVolume) message += `Estimated Volume: ${params.estimatedVolume}\n`;
  message += `\nPlease share current bulk pricing and dispatch timelines.\n\nThank you.`;
  return message;
}
