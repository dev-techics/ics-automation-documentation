import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "Introduction",
    },
    {
      type: "doc",
      id: "how_to_use",
      label: "How to Use",
    },
    {
      type: "category",
      label: "Frontend",
      link: { type: "doc", id: "Frontend/overview" },
      items: [
        "Frontend/overview",
        "Frontend/installation",
        "Frontend/structure",
        "Frontend/routing",
        "Frontend/layout",
        "Frontend/state-management",
        "Frontend/api-integration",
        "Frontend/authentication",
        {
          type: "category",
          label: "Pages",
          link: { type: "generated-index" },
          items: [
            "Frontend/pages/flow-builder",
            "Frontend/pages/template-builder",
            "Frontend/pages/lists-and-segments",
            "Frontend/pages/flow-list",
            "Frontend/pages/dashboard-home",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Backend",
      link: { type: "doc", id: "Backend/overview" },
      items: [
        "Backend/overview",
        "Backend/installation-&-setup",
        "Backend/architecture",
        "Backend/configuration",
        "Backend/database",
        "Backend/api-documentation",
        "Backend/automation-workflow",
        "Backend/jobs-queues",
        "Backend/flow-execution-algorithm",
        "Backend/logging-&-monitoring",
        "Backend/security",
        "Backend/maintenance-&-deployment",
        "Backend/troubleshooting",
      ],
    },
  ],
};

export default sidebars;
