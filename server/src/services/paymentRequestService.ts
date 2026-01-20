import crypto from 'crypto';
import QRCode from 'qrcode';

export type CreateEpcPayloadInput = {
  iban: string;
  bic?: string;
  beneficiaryName: string;
  amountCents: number;
  currency?: string;
  remittanceInformation: string;
  message?: string;
};

export function formatAmount(amountCents: number): string {
  const euros = amountCents / 100;
  return euros.toFixed(2);
}

export function formatEurAmount(amountCents: number): string {
  return `EUR${formatAmount(amountCents)}`;
}

export function createStructuredCommunication(): string {
  // Belgian structured communication (OGM/VCS): +++xxx/xxxx/xxxxx+++
  // Numeric value is 12 digits where last 2 are modulo 97 checksum.
  // Source: common BE structured communication rule.
  const base10 = crypto.randomInt(0, 10 ** 10);
  const base = base10.toString().padStart(10, '0');
  const mod = base10 % 97;
  const checkValue = 97 - mod;
  const checksum = (checkValue === 0 ? 97 : checkValue).toString().padStart(2, '0');
  const full = `${base}${checksum}`; // 12 digits
  return `+++${full.slice(0, 3)}/${full.slice(3, 7)}/${full.slice(7, 12)}+++`;
}

export function createEpcQrPayload(input: CreateEpcPayloadInput): string {
  const currency = input.currency || 'EUR';
  if (currency !== 'EUR') {
    throw new Error('Only EUR is supported');
  }

  const amount = formatEurAmount(input.amountCents);

  // EPC069-12 format (EPC QR Code / SEPA Credit Transfer)
  // Many bank apps accept version 001.
  // Fields:
  // 1 Service tag
  // 2 Version
  // 3 Character set (1 = UTF-8)
  // 4 Identification (SCT)
  // 5 BIC
  // 6 Beneficiary name
  // 7 IBAN
  // 8 Amount
  // 9 Purpose (optional)
  // 10 Remittance information (structured or unstructured)
  // 11 Information (optional)
  const lines = [
    'BCD',
    '001',
    '1',
    'SCT',
    (input.bic || '').toUpperCase(),
    input.beneficiaryName,
    input.iban.replace(/\s+/g, '').toUpperCase(),
    amount,
    '',
    input.remittanceInformation,
    input.message || '',
  ];

  return lines.join('\n');
}

export async function createEpcQrPngBuffer(payload: string): Promise<Buffer> {
  return QRCode.toBuffer(payload, {
    type: 'png',
    errorCorrectionLevel: 'M',
    margin: 2,
    scale: 8,
  });
}
