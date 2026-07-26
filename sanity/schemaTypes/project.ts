import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { BatchImageInput } from "../components/BatchImageInput";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Projects", value: "projects" },
          { title: "Residencies", value: "residencies" },
          { title: "Exhibitions", value: "exhibitions" },
          { title: "Ceramics", value: "ceramics" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      description: "Short caption shown under the homepage card, e.g. \"Award\" or \"Johnson, VT\".",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Longer text about the project, shown behind the Info link on the project page.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt text",
              type: "string",
            },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
      components: { input: BatchImageInput },
    }),
    orderRankField({ type: "project" }),
  ],
  preview: {
    select: { title: "title", category: "category", media: "images.0" },
    prepare({ title, category, media }) {
      return { title, subtitle: category, media };
    },
  },
});
