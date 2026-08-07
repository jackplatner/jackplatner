export const categories = [
  { id: "projects", label: "Projects" },
  { id: "residencies", label: "Residencies" },
  { id: "exhibitions", label: "Exhibitions" },
  { id: "ceramics", label: "Ceramics" },
  { id: "photography", label: "Photography" },
];

export const categoryIds = categories.map((c) => c.id);

export function categoryLabel(id: string): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
