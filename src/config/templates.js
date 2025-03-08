export const cardTemplates = {
  classic: {
    id: "classic",
    name: "Thiệp Cổ Điển",
    description: "Thiết kế thanh lịch với hoa văn truyền thống",
    layout: "vertical",
    background: {
      primary: "var(--theme-background)",
      secondary: "var(--theme-background-secondary)",
      overlay: "rgba(255, 255, 255, 0.85)",
      image:
        "https://images.unsplash.com/photo-1490349368154-73de9c9bc37c?q=80",
      pattern: "https://www.transparenttextures.com/patterns/flower-trail.png",
    },
    fonts: {
      title: "Dancing Script",
      content: "Be Vietnam Pro",
    },
    styling: {
      borderRadius: "24px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      padding: "40px",
    },
    decorations: [], // Empty array as we're using background images instead
  },
  modern: {
    id: "modern",
    name: "Thiệp Hiện Đại",
    description: "Thiết kế tối giản với họa tiết geometric",
    layout: "horizontal",
    background: {
      primary: "var(--theme-background)",
      secondary: "var(--theme-background-secondary)",
      overlay: "rgba(255, 255, 255, 0.9)",
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80",
      pattern:
        "https://www.transparenttextures.com/patterns/clean-gray-paper.png",
    },
    fonts: {
      title: "Montserrat",
      content: "Roboto",
    },
    styling: {
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
      padding: "30px",
    },
    decorations: [], // Empty array as we're using background images instead
  },
};

export const defaultTemplate = cardTemplates.classic;
