// import type { StorybookConfig } from "@storybook/react-vite";

// const config: StorybookConfig = {
//     stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
//     addons: [],
//     framework: {
//         name: "@storybook/react-vite",
//         options: {}
//     },
//     staticDirs: ["../public"]
// };
// export default config;
import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  staticDirs: ["../public"],

  viteFinal: async (config) => {
    // 👇 Thêm phần này để Storybook hiểu alias @
    if (!config.resolve) config.resolve = {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../src"),
    };

    return config;
  },
};

export default config;
