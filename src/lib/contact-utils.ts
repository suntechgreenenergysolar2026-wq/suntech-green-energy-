import type { CompanyProfile } from "@/lib/default-content";

const digitsOnly = (value: string) => value.replace(/[^\d]/g, "");

export const toPhoneHref = (value: string) => {
  const digits = digitsOnly(value);
  return digits ? `tel:${digits}` : "#";
};

export const toWhatsappHref = (value: string, message = "Hi SUNTECH GREEN ENERGY SOLAR, I am interested in solar solutions") => {
  let digits = digitsOnly(value);

  if (digits.length === 10) {
    digits = `91${digits}`;
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

export const getPhoneList = (companyProfile: CompanyProfile) =>
  [companyProfile.phone, companyProfile.alternatePhone].filter(Boolean) as string[];
