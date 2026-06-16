import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { sections } from "./sanity/sections";
import { apiVersion, dataset, projectId } from "./sanity/env";

const singletonTypes = new Set(["siteSettings", "contactPage"]);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Jack Platner",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter(
        ({ schemaType, id }) =>
          !singletonTypes.has(schemaType) && id !== "project",
      ),
      ...sections.map((section) => ({
        id: `project-${section.id}`,
        title: section.singular,
        schemaType: "project",
        value: { category: section.id },
      })),
    ],
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => !singletonTypes.has(item.templateId))
        : prev,
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => action && singletonActions.has(action))
        : prev,
  },
});
