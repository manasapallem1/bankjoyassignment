export const listResponseSchema = {
  type: "object",
  properties: {
    terms: {
      type: "object",
      properties: {
        url: { type: "string", format: "uri" },
      },
      required: ["url"],
    },
    series: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          label: { type: "string" },
          description: { type: "string" },
          link: { type: "string", format: "uri" },
        },
        required: ["label", "description", "link"],
      },
    },
    groups: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          label: { type: "string" },
          description: { type: "string" },
          link: { type: "string", format: "uri" },
        },
        required: ["label", "description", "link"],
      },
    },
  },
  required: ["terms"],
  additionalProperties: false,
};
