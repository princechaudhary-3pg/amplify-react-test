import { defineFunction } from "@aws-amplify/backend";

export const generateThumb = defineFunction({
  name: "resize-image",
  entry: "./handler.ts",
  bundling: {
    minify: false
  },
  timeoutSeconds: 60
});