import type { Pest } from "@/data/pests";

/** Pull the first N complete sentences from prose. */
function firstSentences(text: string, count: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences?.length) {
    const trimmed = text.trim();
    return trimmed.length > 220 ? `${trimmed.slice(0, 217).trim()}…` : trimmed;
  }
  return sentences.slice(0, count).join(" ").trim();
}

/** Short modal blurb: one context line + one risk line. */
export function getPestModalSummary(pest: Pest): string {
  return `${firstSentences(pest.overview, 1)} ${firstSentences(pest.dangerToFamily, 1)}`.trim();
}

/** Top warning signs only — keeps the modal scannable. */
export function getPestModalSigns(pest: Pest, limit = 3): string[] {
  return pest.signs.slice(0, limit);
}
