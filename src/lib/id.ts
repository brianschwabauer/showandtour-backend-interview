interface GenerateIdOptions {
  /** The length of the ID @default 20 */
  length?: number;

  /** The string of characters to choose from when creating the ID */
  chars?: string;

  /** Whether the ID should exclude vowel characters @default false */
  excludeVowels?: boolean;

  /** Whether the ID should exclude ambigious characters (like 1/l) @default false */
  excludeAmbigiousChars?: boolean;
}

/** Returns a unique ID based on the given options for database operations */
export function generateID(options?: GenerateIdOptions): string {
  let id = '';
  const length = options?.length || 20;
  let chars =
    options?.chars ||
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (options?.excludeVowels) chars = chars.replace(/[AEIOUaeiou]/g, '');
  if (options?.excludeAmbigiousChars) chars = chars.replace(/[l01]/g, '');
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
