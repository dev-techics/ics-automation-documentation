import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "ICS Automation",
  tagline: "Intelligent Email & SMS Marketing Automation Platform",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://automation.icslegal.com",
  baseUrl: "/documentation/",

  onBrokenLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/dev-techics/ics-automation/tree/main/documentation/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/social-card.jpg",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "ICS Automation",
      logo: {
        alt: "ICS Automation Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://automation.icslegal.com",
          label: "Launch App",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/intro",
            },
            {
              label: "Frontend Guide",
              to: "/docs/Frontend/overview",
            },
            {
              label: "Backend Guide",
              to: "/docs/Backend/overview",
            },
            {
              label: "How to Use",
              to: "/docs/how_to_use",
            },
          ],
        },
        {
          title: "Platform",
          items: [
            {
              label: "Launch App",
              href: "https://automation.icslegal.com",
            },
          ],
        },
      ],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} ICS Legal. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
};

export default config;
