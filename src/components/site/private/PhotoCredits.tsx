import type { PrivateDestination } from "@/lib/private-packages";

export function PhotoCredits({ destination }: { destination: PrivateDestination }) {
  const credits = [destination.photoCredit, ...destination.places.map((place) => place.photoCredit)]
    .filter((credit) => credit !== undefined)
    .filter((credit, index, list) => list.findIndex((item) => item.source === credit.source) === index);
  if (!credits.length) return null;
  return <div className="private-container private-photo-credits"><details>
    <summary>Photography credits</summary>
    <ul className="mt-3 space-y-2">{credits.map((credit) => <li key={credit.source}>
      <a href={credit.source} target="_blank" rel="noopener noreferrer">{credit.title}</a>
      {` — ${credit.author} · `}
      {credit.licenseUrl ? <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a> : credit.license}
      {" · Cropped and resized"}
    </li>)}</ul>
  </details></div>;
}