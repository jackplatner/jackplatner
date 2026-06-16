import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const sections = [
  { id: "projects", title: "Projects" },
  { id: "residencies", title: "Residencies" },
  { id: "exhibitions", title: "Exhibitions" },
  { id: "ceramics", title: "Ceramics" },
];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Contact Page")
        .id("contactPage")
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
      S.divider(),
      ...sections.map((section) =>
        orderableDocumentListDeskItem({
          type: "project",
          id: `orderable-${section.id}`,
          title: section.title,
          filter: "category == $category",
          params: { category: section.id },
          S,
          context,
        }),
      ),
    ]);
