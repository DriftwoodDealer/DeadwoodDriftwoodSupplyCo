export function getLandscapeLengthInches(dimensions: string) {
  const length = Number(dimensions.match(/[\d.]+/)?.[0]);
  return Number.isFinite(length) ? length : null;
}

export function getLandscapeSizeName(dimensions: string) {
  const length = getLandscapeLengthInches(dimensions);
  if (length === null) return "Landscape Form";
  if (length < 24) return "Garden Accent";
  if (length < 36) return "Garden Form";
  if (length < 60) return "Statement Root";
  return "Estate Form";
}
