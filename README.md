# React UI Components – InputField & DataTable

This project is a small component library & demo built with **React + TypeScript + Vite + Tailwind CSS**, documented with **Storybook**. It showcases two reusable components: **InputField** and **DataTable**, including multiple variants, sizes, and states with full dark mode support.

---

## ✨ Features

### InputField
- 🎨 **Variants**: outlined (default), filled, ghost  
- 📏 **Sizes**: `sm`, `md`, `lg`  
- ✅ **Validation**: error state with message, `aria-invalid`  
- ⏳ **Loading**: spinner state  
- 🚫 **Disabled**: non-interactive mode  
- 🧹 **Clear button**: quick clear when `showClearButton`  
- 👁️ **Password toggle**: show/hide when `type="password"` + `showPasswordToggle`  
- 🌙 **Dark mode**: automatic styling for dark theme

### DataTable
- 📊 **Tabular data**: clean, responsive table layout  
- 🔄 **Sorting**: click column headers to sort  
- ☑️ **Selection (multiple)**: checkboxes  
- ⚪ **Selection (single)**: radio-style selection  
- ⏳ **Loading**: spinner/skeleton while fetching  
- 📭 **Empty state**: friendly message when no data  
- 🎨 **Custom cells**: render richer content  
- 📱 **Responsive**: mobile-friendly

---

## 📦 Requirements
- Node.js **18+** (recommended)  
- npm / yarn / pnpm / bun (any one package manager)

---

## 🚀 Getting Started

```bash
# 1) Install dependencies
npm install

# 2) Run the dev server
npm run dev
# App: http://localhost:5173
```

> If you’re using another package manager, replace `npm` with `yarn`, `pnpm`, or `bun`.

---

## 📖 Storybook

If Storybook is already set up (you should have a `.storybook/` folder), just run:
```bash
npm run storybook
# Storybook: http://localhost:6006
```

If Storybook isn’t installed yet, run:
```bash
npx storybook@latest init
```

Build a static Storybook (for deployment):
```bash
npm run build-storybook
# Output: storybook-static/
```

> Remember to **gitignore** `storybook-static/` (see `.gitignore` below).

---

## 🗂️ Project Structure (example)

```
.
├── src/
│   ├── components/
│   │   ├── InputField/           # InputField component
│   │   ├── Datatable/            # DataTable component
│   │   ├── Navbar/               # Navbar (fixed header)
│   │   ├── Contact/              # Contact section
│   │   ├── InputField_component.tsx
│   │   ├── Datatable_component.tsx
│   │   └── Features_Overview_component.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .storybook/                   # Storybook config
├── package.json
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🧩 Usage Examples

### InputField
```tsx
import { useState } from "react";
import InputField from "./components/InputField/InputField";

export default function Example() {
  const [email, setEmail] = useState("");

  return (
    <div className="max-w-md mx-auto p-6">
      <InputField
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        helperText="We'll never share your email"
        showClearButton
      />
    </div>
  );
}
```

### DataTable (example shape)
```tsx
import { useState } from "react";
import Datatable_component from "./components/Datatable_component";

export default function UsersTablePage() {
  // The Datatable_component in your project already manages demo data/states.
  // If you expose a base <DataTable /> primitive, import & use it here.
  const [selectionMode, setSelectionMode] = useState<"single" | "multiple">("multiple");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Datatable_component />
    </div>
  );
}
```

---

## 🧭 Scroll & Fixed Navbar Tip

If you use a fixed navbar and anchor links (e.g. `#features`), add `scroll-mt` to sections so headings aren’t hidden behind the navbar:

```tsx
<section id="features" className="scroll-mt-24">
  {/* content */}
</section>
```

Adjust `24` to match your navbar height (`24` = 6rem = 96px).

---

## 🛠 Scripts

Common scripts (your `package.json` may include more):
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

---

## 🔧 Tailwind Setup (quick check)

Ensure `tailwind.config.ts` includes your paths:
```ts
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: []
};
```

And `index.css` has the Tailwind layers:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🔒 .gitignore (recommended)

Create `.gitignore` in the project root:

```
# dependencies
node_modules/

# build
dist/
storybook-static/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
bun.lockb

# IDE
.vscode/
.idea/
.DS_Store
Thumbs.db

# env
.env
.env.local
.env.*.local
```

---

## 🤝 Contributing

Feel free to open issues and PRs. For feature branches:
```bash
git checkout -b feat/my-feature
git commit -m "feat: add my feature"
git push origin feat/my-feature
```

---

## 📜 License

MIT
