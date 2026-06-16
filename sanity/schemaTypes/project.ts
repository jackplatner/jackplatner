import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

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
      name: "description",
      title: "Description",
      type: "string",
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
