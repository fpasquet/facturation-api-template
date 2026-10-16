export interface Invoice {
  id: number;
  /** Numéro public : FAC-AAAA-NNNN. */
  number: string;
  customer: string;
  /** Montant TTC, en centimes. */
  amountCents: number;
  issuedAt: string;
}

export interface NewInvoice {
  customer: string;
  amountCents: number;
}

/** Numéro public d'une facture : l'année d'émission et l'identifiant sur quatre chiffres. */
export const invoiceNumber = (id: number, issuedAt: Date): string =>
  `FAC-${issuedAt.getFullYear()}-${String(id).padStart(4, '0')}`;

/** Facture saisie : client de 1 à 120 caractères, montant en centimes entier ; null si elle est refusée. */
export function newInvoice(input: unknown): NewInvoice | null {
  if (typeof input !== 'object' || input === null) return null;
  const { customer, amountCents } = input as Record<string, unknown>;
  if (typeof customer !== 'string' || !Number.isInteger(amountCents)) return null;
  const name = customer.trim().replaceAll(/\s+/g, ' ');
  return name && name.length <= 120 ? { customer: name, amountCents: amountCents as number } : null;
}
