export default {
  name: "report",
  description: "Submit a report.",
  options: [
    {
      name: "text",
      description: "Report message",
      type: 3, // STRING
      required: true,
    },
  ],
};
