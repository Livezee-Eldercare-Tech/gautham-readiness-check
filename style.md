# LivEzee Vigil — Complete Design System, UI Kit & Styling Specification (`style.md`)

> **Version:** 6.0  
> **Target Products:** LivEzee Eldercare Platforms, Vigil Web Applications, Clinician Portals, and Reports.  
> **Design Philosophy:** Luxury Clinical — A refined blend of deep midnight navy, warm antique gold, crisp cream paper cards, and rich medical status accents (emerald, amber, crimson).

---

## Table of Contents
1. [Typography & Fonts](#1-typography--fonts)
2. [Color Palette & Design Tokens](#2-color-palette--design-tokens)
3. [Global & Base Styles](#3-global--base-styles)
4. [Layout & Structure](#4-layout--structure)
5. [UI Components & Elements](#5-ui-components--elements)
   - [Header & Brand](#header--brand)
   - [Intro Band & Banners](#intro-band--banners)
   - [Mode Toggle Switcher](#mode-toggle-switcher)
   - [Cards & Card Headers](#cards--card-headers)
   - [Badges & Status Tags](#badges--status-tags)
   - [Form Inputs, Selects & Textareas](#form-inputs-selects--textareas)
   - [Upload Dropzones & States](#upload-dropzones--states)
   - [File List Items & Statuses](#file-list-items--statuses)
   - [Previous Document Status Indicator](#previous-document-status-indicator)
   - [Section Focus Grid & Custom Checkboxes](#section-focus-grid--custom-checkboxes)
   - [Buttons](#buttons)
   - [Error & Warning Alerts](#error--warning-alerts)
   - [Loading Spinner & Generating Panel](#loading-spinner--generating-panel)
   - [Report View & Section Cards](#report-view--section-cards)
6. [Lab Heatmap Matrix & Tooltip System](#6-lab-heatmap-matrix--tooltip-system)
7. [Print & PDF Export Styles](#7-print--pdf-export-styles)
8. [DOCX (Word Document) Export Styling](#8-docx-word-document-export-styling)
9. [Complete Master CSS Reference](#9-complete-master-css-reference)

---

## 1. Typography & Fonts

### External Google Fonts Link
```html
<link href="https://fonts.googleapis.com/css2?family=Alata&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
```

### Font Families
| Role | Family | Fallback | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Sans** | `'Alata'` | `sans-serif` | Body text, headings, buttons, inputs, labels, cards, badges, table text. |
| **Secondary Serif** | `'EB Garamond'` | `serif` | Taglines, subtitle descriptors, generating status, clinical emphasis. |

### Type Scale & Hierarchy
| Element | Font | Size | Weight / Style | Line Height | Letter Spacing | Color | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Header Org Name** | `Alata` | `10px` | 400 Regular | `1.0` | `3px` | `rgba(255, 255, 255, 0.35)` | `uppercase` |
| **Header Product Name** | `Alata` | `17px` | 400 Regular | `1.2` | `1px` | `#ffffff` | Normal |
| **Header Tagline** | `EB Garamond` | `12px` | 400 Italic | `1.2` | Normal | `#c9a84c` (`--gold`) | Normal |
| **Intro Band** | `Alata` | `13px` | 400 Regular | `1.6` | Normal | `rgba(255, 255, 255, 0.6)` | Normal |
| **Card Header Title (`h3`)**| `Alata` | `11px` | 400 Regular | `1.0` | `1.5px` | `rgba(255, 255, 255, 0.9)` | `uppercase` |
| **Field Label (`.fl`)** | `Alata` | `11px` | 400 Regular | `1.0` | `0.5px` | `#666666` (`--muted`)| `uppercase` |
| **Input / Textarea Text** | `Alata` | `14px` | 400 Regular | `1.55` | Normal | `#2a2a2a` (`--text`) | Normal |
| **Mode Button Label (`.ml`)**| `Alata` | `11px` | 400 Regular | `1.0` | `1.5px` | Current Mode Color | `uppercase` |
| **Mode Button Desc (`.md`)** | `EB Garamond` | `11px` | 400 Italic | `1.2` | Normal | Opacity 0.6–0.75 | Normal |
| **Badges (`.badge`)** | `Alata` | `10px` | 400 Regular | `1.0` | `0.5px` | Contextual | Normal |
| **Report Title (`h2`)** | `Alata` | `20px` | 400 Regular | `1.2` | Normal | `#ffffff` | Normal |
| **Report Metadata** | `Alata` | `12px` | 400 Regular | `1.3` | Normal | `rgba(255, 255, 255, 0.4)` | Normal |
| **Report Section Title** | `Alata` | `11px` | 400 Regular | `1.0` | `1.5px` | `#1e436c` (`--navy`) | `uppercase` |
| **Report Section Body** | `Alata` | `14px` | 400 Regular | `1.7` | Normal | `#2a2a2a` (`--text`) | Normal |
| **Generating Status Text** | `EB Garamond` | `16px` | 400 Italic | `1.4` | Normal | `#c9a84c` (`--gold`) | Normal |
| **Heatmap Parameter Label**| `Alata` | `11px` | 400 Regular | `1.2` | Normal | `rgba(255, 255, 255, 0.75)`| Normal |
| **Heatmap Category Header**| `Alata` | `9px` | 400 Regular | `1.0` | `1.5px` | `rgba(201, 168, 76, 0.55)` | `uppercase` |
| **Heatmap Cell Value** | `Alata` | `9px` | 400 Regular | `1.0` | Normal | Contextual | Normal |

---

## 2. Color Palette & Design Tokens

### Core Theme Palette
```css
:root {
  --navy: #1e436c;   /* Primary Brand Navy */
  --blue: #295c94;   /* Interactive Hover Blue */
  --dark: #132a44;   /* Deep Page Background & Heatmap Canvas */
  --gold: #c9a84c;   /* Antique Gold Brand Accent & Borders */
  --warm: #f7f4ef;   /* Warm Cream Paper (Card & Section Backgrounds) */
  --white: #ffffff;  /* Pure White (Inputs & Inner Containers) */
  --mid: #d4d4d4;    /* Light Neutral Grey for Borders */
  --text: #2a2a2a;   /* Deep Charcoal Body Text */
  --muted: #666666;  /* Neutral Secondary Text & Labels */
}
```

### Color Specification Matrix
| Token | Hex Code | RGB | Typical Application |
| :--- | :--- | :--- | :--- |
| **Dark Canvas** (`--dark`) | `#132a44` | `19, 42, 68` | Body background, header, report header, heatmap panel background. |
| **Primary Navy** (`--navy`)| `#1e436c` | `30, 67, 108` | Primary buttons, card headers, active tab buttons, section left borders. |
| **Hover Blue** (`--blue`) | `#295c94` | `41, 92, 148` | Hover state on `.btn-run` and `.btn-navy`, active focus border. |
| **Accent Gold** (`--gold`)| `#c9a84c` | `201, 168, 76`| Taglines, `.btn-gold`, outline borders, gen-status, outlier highlights. |
| **Warm Cream** (`--warm`) | `#f7f4ef` | `247, 244, 239`| Form card background, report section background. |
| **Neutral White** (`--white`)| `#ffffff` | `255, 255, 255`| Input background, report section header bar, pure white highlights. |
| **Border Mid** (`--mid`) | `#d4d4d4` | `212, 212, 212`| Form borders, dropzone dashed lines, checkboxes. |
| **Body Charcoal** (`--text`)| `#2a2a2a` | `42, 42, 42` | Primary readable text on light backgrounds. |
| **Muted Grey** (`--muted`) | `#666666` | `102, 102, 102`| Field labels, unit text, secondary hints. |

### Clinical & Functional Color Matrix
| Status / Role | Background | Text / Foreground | Border / Accent |
| :--- | :--- | :--- | :--- |
| **Care Plan Emerald** | `#1a4a2e` | `#ffffff` | `#1a4a2e` |
| **Normal / In-Range** | `#1e5c2e` | `#8ee8a8` | `#1e5c2e` |
| **Borderline Low** | `#6b5c0e` | `#f5dc6a` | `#6b5c0e` |
| **Borderline High** | `#6b420e` | `#f5b86a` | `#6b420e` |
| **Abnormal / Out-of-Range** | `#7a1a1a` | `#ffaaaa` | `#c0392b` |
| **No Reference Range** | `#1e3a56` | `#7aade0` | `#1e3a56` |
| **Outlier Highlight** | `rgba(211, 84, 0, 0.1)` | `rgba(255, 200, 150, 0.9)` | `rgba(211, 84, 0, 0.4)` |
| **File Processing** | `#fff9ee` | `#1e436c` | `#f0c870` |
| **File Done / Success** | `#eef6ee` | `#1e436c` | `#90c090` |
| **System Error** | `#fef2f2` | `#991b1b` | `#fca5a5` |

---

## 3. Global & Base Styles

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Alata', sans-serif;
  background: var(--dark);
  min-height: 100vh;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}
```

---

## 4. Layout & Structure

### Container & Grid Layout
```css
.main {
  max-width: 940px;
  margin: 0 auto;
  padding: 28px 16px 60px;
}
```

### Responsive Breakpoints
```css
@media (max-width: 580px) {
  .field-row {
    flex-direction: column;
  }
  .report-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .focus-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 5. UI Components & Elements

### Header & Brand
The top navigation bar features the LivEzee parent organization, product name, and golden serif tagline.

```html
<div class="header">
  <div class="header-brand">
    <div class="org">LivEzee</div>
    <div class="product">Vigil</div>
    <div class="tagline">Client intelligence</div>
  </div>
</div>
```

```css
.header {
  background: var(--dark);
  border-bottom: 1px solid rgba(201, 168, 76, 0.3);
  padding: 16px 28px;
}

.header-brand .org {
  font-size: 10px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
}

.header-brand .product {
  font-size: 17px;
  color: var(--white);
  font-weight: 400;
  letter-spacing: 1px;
}

.header-brand .tagline {
  font-family: 'EB Garamond', serif;
  font-size: 12px;
  color: var(--gold);
  font-style: italic;
}
```

---

### Intro Band & Banners

```html
<div class="intro-band">
  <strong>Vigil v6</strong> — Bootstrap for first run. Update for all subsequent runs. Care plan is a primary input.
</div>
```

```css
.intro-band {
  background: rgba(201, 168, 76, 0.08);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 6px;
  padding: 16px 20px;
  margin-bottom: 18px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

.intro-band strong {
  color: var(--gold);
}
```

---

### Mode Toggle Switcher
Segmented controller switching between **Bootstrap Mode** (Initial Ingestion) and **Update Mode** (Quarterly Incremental).

```html
<div class="mode-toggle">
  <button class="mode-btn active" id="btnBootstrap">
    <span class="ml">Bootstrap</span>
    <span class="md">First run — up to 5 lab reports</span>
  </button>
  <div class="mode-div"></div>
  <button class="mode-btn" id="btnUpdate">
    <span class="ml">Update</span>
    <span class="md">Previous report + one new lab result</span>
  </button>
</div>
```

```css
.mode-toggle {
  display: flex;
  margin-bottom: 18px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(201, 168, 76, 0.3);
}

.mode-btn {
  flex: 1;
  padding: 13px 20px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.45);
  border: none;
  font-family: 'Alata', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  letter-spacing: 0.5px;
}

.mode-btn.active {
  background: var(--navy);
  color: var(--white);
}

.mode-btn .ml {
  display: block;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 3px;
}

.mode-btn .md {
  font-size: 11px;
  opacity: 0.6;
  font-family: 'EB Garamond', serif;
  font-style: italic;
}

.mode-btn.active .md {
  opacity: 0.75;
}

.mode-div {
  width: 1px;
  background: rgba(201, 168, 76, 0.2);
}
```

---

### Cards & Card Headers

```html
<div class="card">
  <div class="card-header">
    <h3>Client details</h3>
    <span class="badge badge-muted">Required</span>
  </div>
  <div class="card-body">
    <!-- Content -->
  </div>
</div>
```

```css
.card {
  background: var(--warm);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 14px;
}

.card-header {
  background: var(--navy);
  padding: 13px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header.care {
  background: #1a4a2e; /* Dedicated Forest Green for Care Plan */
}

.card-header h3 {
  font-size: 11px;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  font-weight: 400;
}

.card-body {
  padding: 20px;
}
```

---

### Badges & Status Tags

```html
<span class="badge badge-gold">PWM selects</span>
<span class="badge badge-red">Up to 3 — newest first</span>
<span class="badge badge-green">Tier 2 — strongly recommended</span>
<span class="badge badge-muted">Required</span>
```

```css
.badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 2px;
  letter-spacing: 0.5px;
}

.badge-gold {
  background: rgba(201, 168, 76, 0.2);
  color: var(--gold);
}

.badge-red {
  background: rgba(180, 40, 40, 0.25);
  color: #f99;
}

.badge-green {
  background: rgba(30, 90, 50, 0.35);
  color: #8ee8a8;
}

.badge-muted {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.45);
}
```

---

### Form Inputs, Selects & Textareas

```html
<div class="field-row">
  <div class="field">
    <label class="fl">Full name</label>
    <input type="text" placeholder="e.g. Mrs. So and So">
  </div>
  <div class="field narrow">
    <label class="fl">Age</label>
    <input type="text" placeholder="82">
  </div>
  <div class="field narrow">
    <label class="fl">Plan</label>
    <select>
      <option>Enhanced Living</option>
    </select>
  </div>
</div>
```

```css
.field {
  margin-bottom: 14px;
}

.field:last-child {
  margin-bottom: 0;
}

.field-row {
  display: flex;
  gap: 12px;
}

.field-row .field {
  flex: 1;
}

.field-row .field.narrow {
  flex: 0.45;
}

label.fl {
  display: block;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.5px;
  margin-bottom: 5px;
  text-transform: uppercase;
}

input[type=text],
select,
textarea {
  width: 100%;
  border: 1px solid var(--mid);
  border-radius: 3px;
  padding: 9px 11px;
  font-family: 'Alata', sans-serif;
  font-size: 14px;
  color: var(--text);
  background: var(--white);
  outline: none;
  transition: border-color 0.2s;
}

input[type=text]:focus,
select:focus,
textarea:focus {
  border-color: var(--navy);
}

textarea {
  resize: vertical;
  min-height: 80px;
  line-height: 1.55;
}
```

---

### Upload Dropzones & States
Dropzones are color-themed according to their clinical role:

```html
<!-- Standard Lab Zone -->
<div class="upload-zone">
  <div class="upload-icon">📋</div>
  <div class="upload-text"><strong>Click to attach</strong> — oldest available report</div>
  <div class="upload-hint">The baseline — what was the state when LivEzee started</div>
</div>

<!-- Outlier Lab Zone -->
<div class="upload-zone zone-outlier">
  <div class="upload-icon">⚠️</div>
  <div class="upload-text"><strong>Click to attach</strong> — crisis report</div>
</div>

<!-- Care Plan Zone -->
<div class="upload-zone zone-care">
  <div class="upload-icon">📋</div>
  <div class="upload-text"><strong>Click to attach</strong> — current care plan</div>
</div>

<!-- Previous Word Report Zone -->
<div class="upload-zone zone-prev">
  <div class="upload-icon">📄</div>
  <div class="upload-text"><strong>Click to load</strong> — previous Vigil Word report</div>
</div>
```

```css
.upload-zone {
  border: 1.5px dashed var(--mid);
  border-radius: 4px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  background: var(--white);
  transition: all 0.2s;
  margin-bottom: 10px;
}

.upload-zone:hover,
.upload-zone.drag-over {
  border-color: var(--navy);
  background: #f0f4f9;
}

.upload-zone.zone-outlier {
  border-color: rgba(211, 84, 0, 0.4);
  background: #fffbf6;
}

.upload-zone.zone-care {
  border-color: rgba(30, 90, 50, 0.4);
  background: #f6fbf8;
}

.upload-zone.zone-prev {
  border-color: rgba(201, 168, 76, 0.4);
  background: #fdfbf5;
}

.upload-zone input[type=file] {
  display: none;
}

.upload-icon {
  font-size: 20px;
  margin-bottom: 5px;
}

.upload-text {
  font-size: 13px;
  color: var(--muted);
}

.upload-text strong {
  color: var(--navy);
}

.upload-hint {
  font-size: 11px;
  color: #aaa;
  margin-top: 3px;
}
```

---

### File List Items & Statuses

```html
<div class="file-list">
  <!-- Default / Uploaded -->
  <div class="file-item">
    <span class="fn">[doc] Report_1.pdf</span>
    <span class="fs">1.4 MB</span>
    <button class="file-remove">×</button>
  </div>
  <!-- Processing State -->
  <div class="file-item processing">
    <span class="fn">... Report_2.pdf</span>
    <span class="fs">2.1 MB</span>
    <button class="file-remove">×</button>
  </div>
  <!-- Done State -->
  <div class="file-item done">
    <span class="fn">[doc] Report_3.pdf</span>
    <span class="fs">850 KB</span>
    <button class="file-remove">×</button>
  </div>
</div>
```

```css
.file-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #eef4fb;
  border: 1px solid #c5d9ee;
  border-radius: 3px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--navy);
}

.file-item.processing {
  background: #fff9ee;
  border-color: #f0c870;
}

.file-item.done {
  background: #eef6ee;
  border-color: #90c090;
}

.fn {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fs {
  font-size: 11px;
  color: var(--muted);
  flex-shrink: 0;
}

.file-remove {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
  flex-shrink: 0;
}

.file-remove:hover {
  color: #c0392b;
}
```

---

### Previous Document Status Indicator

```html
<div class="prev-status loaded">
  <strong>Loaded:</strong> Vigil_Report_July.docx
  <div class="prev-stats">
    <span class="pstat"><strong>69</strong> parameters</span>
    <span class="pstat"><strong>5</strong> time points</span>
    <span class="pstat">Outlier: <strong>1 May 2025</strong></span>
  </div>
</div>
```

```css
.prev-status {
  background: #f7f4ef;
  border: 1px solid #c5d9ee;
  border-radius: 4px;
  padding: 10px 14px;
  font-size: 12px;
  color: var(--navy);
  display: none;
  margin-top: 8px;
}

.prev-status.loaded {
  display: block;
  background: #eef6ee;
  border-color: #90c090;
}

.prev-status.error {
  display: block;
  background: #fef2f2;
  border-color: #fca5a5;
  color: #991b1b;
}

.prev-stats {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 5px;
}

.pstat {
  font-size: 11px;
  color: var(--muted);
}

.pstat strong {
  color: var(--navy);
}
```

---

### Section Focus Grid & Custom Checkboxes

```html
<div class="focus-grid">
  <label class="focus-toggle active">
    <input type="checkbox" checked>
    <div class="fcheck"></div>
    <div>
      <div class="focus-label">Medical time series</div>
      <div class="focus-sub">Parameter trends, % changes, trajectory</div>
    </div>
  </label>
</div>
```

```css
.focus-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.focus-toggle {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background: var(--white);
  border: 1px solid var(--mid);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}

.focus-toggle.active {
  background: #eef4fb;
  border-color: var(--blue);
}

.focus-toggle input {
  display: none;
}

.fcheck {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--mid);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  transition: all 0.15s;
}

.focus-toggle.active .fcheck {
  background: var(--navy);
  border-color: var(--navy);
}

.fcheck::after {
  content: '';
  display: none;
  width: 4px;
  height: 7px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translateY(-1px);
}

.focus-toggle.active .fcheck::after {
  display: block;
}

.focus-label {
  font-size: 13px;
  color: var(--text);
  line-height: 1.3;
}

.focus-sub {
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
}
```

---

### Buttons

```html
<!-- Main Run CTA -->
<button class="btn-run">Generate intelligence report</button>

<!-- Gold Action Button -->
<button class="btn-gold">Download Word</button>

<!-- Navy Action Button -->
<button class="btn-navy">New client</button>
```

```css
.btn-run {
  width: 100%;
  padding: 15px;
  background: var(--navy);
  color: var(--white);
  border: none;
  border-radius: 4px;
  font-family: 'Alata', sans-serif;
  font-size: 15px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 6px;
}

.btn-run:hover {
  background: var(--blue);
}

.btn-gold {
  padding: 8px 18px;
  background: none;
  border: 1px solid rgba(201, 168, 76, 0.4);
  color: var(--gold);
  border-radius: 3px;
  font-family: 'Alata', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-gold:hover {
  background: rgba(201, 168, 76, 0.1);
}

.btn-navy {
  padding: 8px 18px;
  background: var(--navy);
  border: 1px solid var(--navy);
  color: var(--white);
  border-radius: 3px;
  font-family: 'Alata', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-navy:hover {
  background: var(--blue);
}
```

---

### Error & Warning Alerts

```html
<div class="error-box">Input validation or parsing error message.</div>
```

```css
.error-box {
  display: none;
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 3px;
  padding: 11px 14px;
  font-size: 13px;
  color: #991b1b;
  margin-bottom: 14px;
}
```

---

### Loading Spinner & Generating Panel

```html
<div class="generating" id="generatingPanel">
  <div class="gen-ring"></div>
  <p>Analysing client data</p>
  <p class="gen-status" id="genStatus">Extracting lab values...</p>
</div>
```

```css
.generating {
  display: none;
  text-align: center;
  padding: 60px 20px;
}

.gen-ring {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(201, 168, 76, 0.15);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin: 0 auto 18px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.generating p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
}

.gen-status {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  color: var(--gold);
  font-size: 16px;
  margin-top: 8px;
}
```

---

### Report View & Section Cards

```html
<div class="report" id="reportPanel">
  <!-- Report Header -->
  <div class="report-header">
    <div>
      <h2 id="reportName">Mrs. Mohini Devi S</h2>
      <div class="meta" id="reportMeta">Age 83 · Enhanced Living · PWM: Vaishnavi S Nair · 7 Sep 2026</div>
    </div>
    <div class="report-actions">
      <button class="btn-gold">Download Word</button>
      <button class="btn-gold">Copy text</button>
      <button class="btn-navy">New client</button>
    </div>
  </div>

  <!-- Outlier Banner -->
  <div class="outlier-banner show">New outlier detected: 1 May 2025 (180% deviation).</div>

  <!-- Report Sections -->
  <div class="report-sections">
    <!-- Standard Section -->
    <div class="rsection">
      <div class="rsection-title">Medical time series analysis</div>
      <div class="rsection-body">Narrative text...</div>
    </div>
    <!-- Urgent Section -->
    <div class="rsection urgent">
      <div class="rsection-title">Risk flags</div>
      <div class="rsection-body">Urgent risk flags narrative...</div>
    </div>
  </div>
</div>
```

```css
.report {
  display: none;
}

.report-header {
  background: var(--dark);
  border: 1px solid rgba(201, 168, 76, 0.25);
  border-radius: 6px;
  padding: 18px 22px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}

.report-header h2 {
  font-size: 20px;
  color: var(--white);
  font-weight: 400;
}

.report-header .meta {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 3px;
}

.report-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.report-sections {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rsection {
  background: var(--warm);
  border-radius: 5px;
  overflow: hidden;
  border-left: 3px solid var(--navy);
}

.rsection.urgent {
  border-left-color: #c0392b; /* Crimson Red for Risk/Urgent Sections */
}

.rsection-title {
  background: var(--white);
  padding: 11px 16px;
  font-size: 11px;
  letter-spacing: 1.5px;
  color: var(--navy);
  text-transform: uppercase;
  border-bottom: 1px solid var(--mid);
}

.rsection-body {
  padding: 15px 16px;
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
  white-space: pre-wrap;
}

.outlier-banner {
  background: rgba(211, 84, 0, 0.1);
  border: 1px solid rgba(211, 84, 0, 0.3);
  border-radius: 4px;
  padding: 10px 14px;
  font-size: 12px;
  color: rgba(255, 200, 150, 0.9);
  margin-bottom: 12px;
  display: none;
}

.outlier-banner.show {
  display: block;
}
```

---

## 6. Lab Heatmap Matrix & Tooltip System

### Structure
The lab heatmap displays chronological biomarkers in a matrix format, categorized by physiological systems, with rotated date headers and color-coded status blocks.

```html
<div class="heatmap-panel">
  <div class="heatmap-titlebar">
    <h3>Lab timeline</h3>
    <div class="hm-legend">
      <div class="hm-leg"><div class="hm-swatch" style="background:#1e5c2e"></div>Within range</div>
      <div class="hm-leg"><div class="hm-swatch" style="background:#6b5c0e"></div>Borderline</div>
      <div class="hm-leg"><div class="hm-swatch" style="background:#7a1a1a"></div>Out of range</div>
      <div class="hm-leg"><div class="hm-swatch" style="background:#1e3a56"></div>No reference</div>
      <div class="hm-leg" style="color:rgba(211,84,0,0.9)">⚠ outlier</div>
    </div>
  </div>
  <div class="hm-scroll">
    <table class="hm-table">
      <thead>
        <tr>
          <th style="min-width:160px"></th>
          <th class="dc">10 Feb 2025</th>
          <th class="dc oc">⚠ 1 May 2025</th>
          <th class="dc nc">↑ 23 Jul 2026</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hm-cat"><td colspan="4">Hematology</td></tr>
        <tr>
          <td class="pl">Hemoglobin<span class="pu">gm/dL</span></td>
          <td class="hc"><div class="hm-block a-low">8.9</div></td>
          <td class="hc"><div class="hm-block b-low">10.3</div></td>
          <td class="hc"><div class="hm-block normal">11.5</div></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Floating Hover Tooltip -->
<div class="hm-tip" id="hmTip">
  <div class="tp">Hemoglobin</div>
  <div class="tv">11.5 gm/dL · 23 Jul 2026</div>
  <div class="tr">Ref: 11.5-16.0 gm/dL</div>
  <div class="ts normal">Within range</div>
</div>
```

```css
.heatmap-panel {
  background: var(--dark);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 6px;
  margin-bottom: 18px;
  overflow: hidden;
}

.heatmap-titlebar {
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.heatmap-titlebar h3 {
  font-size: 11px;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  font-weight: 400;
}

.hm-legend {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.hm-leg {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
}

.hm-swatch {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  flex-shrink: 0;
}

.hm-scroll {
  overflow-x: auto;
  padding: 16px 18px 20px;
}

.hm-table {
  border-collapse: separate;
  border-spacing: 0;
  min-width: 100%;
}

.hm-table th {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 400;
  padding: 4px 8px;
  vertical-align: bottom;
  white-space: nowrap;
}

/* Rotated Vertical Date Headers */
.hm-table th.dc {
  text-align: center;
  font-size: 9px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  padding: 6px 4px;
  min-width: 44px;
  color: rgba(255, 255, 255, 0.5);
}

.hm-table th.dc.oc {
  color: rgba(211, 84, 0, 0.9); /* Outlier Column */
}

.hm-table th.dc.nc {
  color: rgba(201, 168, 76, 0.9); /* Newest Column */
}

.hm-table td.pl {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  padding: 3px 12px 3px 0;
  white-space: nowrap;
  vertical-align: middle;
}

.hm-table td.pl .pu {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
  display: block;
  margin-top: 1px;
}

.hm-table td.hc {
  padding: 2px 3px;
  vertical-align: middle;
  text-align: center;
}

.hm-block {
  width: 40px;
  height: 32px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  cursor: default;
  transition: filter 0.15s;
}

.hm-block:hover {
  filter: brightness(1.2);
}

.hm-block.empty {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.1);
}

.hm-block.normal {
  background: #1e5c2e;
  color: #8ee8a8;
}

.hm-block.b-low {
  background: #6b5c0e;
  color: #f5dc6a;
}

.hm-block.b-high {
  background: #6b420e;
  color: #f5b86a;
}

.hm-block.a-low,
.hm-block.a-high {
  background: #7a1a1a;
  color: #ffaaaa;
}

.hm-block.no-ref {
  background: #1e3a56;
  color: #7aade0;
}

.hm-cat {
  padding: 10px 0 3px 0;
  font-size: 9px;
  letter-spacing: 1.5px;
  color: rgba(201, 168, 76, 0.55);
  text-transform: uppercase;
}

.hm-cat td:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding-top: 12px;
}

/* Tooltip Styles */
.hm-tip {
  position: fixed;
  background: #1a2a3a;
  border: 1px solid rgba(201, 168, 76, 0.35);
  border-radius: 4px;
  padding: 9px 13px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  pointer-events: none;
  z-index: 9999;
  display: none;
  max-width: 240px;
  line-height: 1.6;
}

.hm-tip .tp {
  color: var(--gold);
  font-size: 12px;
  margin-bottom: 4px;
}

.hm-tip .tv {
  color: #fff;
}

.hm-tip .tr {
  color: rgba(255, 255, 255, 0.45);
  font-size: 10px;
  margin-top: 2px;
}

.hm-tip .ts {
  margin-top: 4px;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 2px;
  display: inline-block;
}

.hm-tip .ts.normal {
  background: #1e5c2e;
  color: #8ee8a8;
}

.hm-tip .ts.b-low,
.hm-tip .ts.b-high {
  background: #6b5c0e;
  color: #f5dc6a;
}

.hm-tip .ts.a-low,
.hm-tip .ts.a-high {
  background: #7a1a1a;
  color: #ffaaaa;
}

.hm-tip .ts.no-ref {
  background: #1e3a56;
  color: #7aade0;
}
```

---

## 7. Print & PDF Export Styles

```css
@media print {
  body {
    background: #ffffff !important;
  }
  
  .header {
    background: #1e436c !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .intro-band,
  .mode-toggle,
  .card,
  .error-box,
  .generating,
  #inputSection {
    display: none !important;
  }
  
  .report {
    display: block !important;
  }
  
  .report-header {
    background: #1e436c !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    border: none;
  }
  
  .report-header h2 {
    color: #ffffff !important;
  }
  
  .report-header .meta {
    color: rgba(255, 255, 255, 0.7) !important;
  }
  
  .report-actions {
    display: none !important;
  }
  
  .heatmap-panel {
    background: #132a44 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    border: 1px solid #c9a84c;
  }
  
  .heatmap-titlebar {
    background: rgba(255, 255, 255, 0.04) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .hm-block {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .hm-block.normal {
    background: #1e5c2e !important;
    color: #8ee8a8 !important;
  }
  
  .hm-block.b-low {
    background: #6b5c0e !important;
    color: #f5dc6a !important;
  }
  
  .hm-block.b-high {
    background: #6b420e !important;
    color: #f5b86a !important;
  }
  
  .hm-block.a-low,
  .hm-block.a-high {
    background: #7a1a1a !important;
    color: #ffaaaa !important;
  }
  
  .hm-block.no-ref {
    background: #1e3a56 !important;
    color: #7aade0 !important;
  }
  
  .hm-block.empty {
    background: rgba(255, 255, 255, 0.04) !important;
  }
  
  .hm-table th,
  .hm-table td.pl {
    color: rgba(255, 255, 255, 0.75) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .hm-cat td {
    color: rgba(201, 168, 76, 0.8) !important;
  }
  
  .rsection {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    break-inside: avoid;
  }
  
  .rsection-title {
    color: #1e436c !important;
  }
  
  .rsection.urgent {
    border-left-color: #c0392b !important;
  }
  
  .outlier-banner {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

---

## 8. DOCX (Word Document) Export Styling

When generating downloadable `.docx` reports (via `docx.js` or `python-docx`), use these exact formatting constants:

### Palette Hex Codes for Word Export
```javascript
const navy     = '1E436C'; // Title & Standard Section Headers
const gold     = 'C9A84C'; // Divider Rules (Top & Bottom borders)
const warmGrey = 'F7F4EF'; // Background accents
const red      = 'A02020'; // Urgent Risk Section Headers
const textDark = '2A2A2A'; // Body text
const muted    = '666666'; // Subtitles & Metadata
const lightDim = 'AAAAAA'; // Confidential Footer
```

### Document Spacing & Typography Specs
* **Page Margins**: Top: `1200 dxa` (0.83 in), Right: `1100 dxa` (0.76 in), Bottom: `1200 dxa`, Left: `1100 dxa`.
* **Main Title (`LIVEEZEE VIGIL`)**: Bold, `size: 36` (18 pt), `color: '1E436C'`, `characterSpacing: 150`, Spacing: `before: 0, after: 100`.
* **Subtitle (`Client Intelligence Report`)**: Regular, `size: 22` (11 pt), `color: '888888'`, Spacing: `before: 0, after: 80`.
* **Metadata Line**: Regular, `size: 18` (9 pt), `color: '666666'`, Spacing: `before: 0, after: 480`, Bottom Border: Single `size: 8` (1 pt) `color: 'C9A84C'`.
* **Section Heading Banner**: All-caps, Bold, `size: 22` (11 pt), `color: 'FFFFFF'`, Shading fill: `'1E436C'` (or `'A02020'` if urgent), Spacing: `before: 400, after: 80`.
* **Body Bullet & Paragraphs**: `size: 20` (10 pt), `color: '2A2A2A'`, Spacing: `before: 30, after: 30`, Indent: `left: 120, right: 120`. Subheaders inside body: Bold, `color: '1E436C'`.
* **Section Divider**: Bottom Border: Single `size: 4` (0.5 pt) `color: 'C9A84C'`, Spacing: `before: 120, after: 80`.
* **Confidential Footer**: Centered, `size: 16` (8 pt), `color: 'AAAAAA'`, Spacing: `before: 800`.

---

## 9. Complete Master CSS Reference

Below is the entire, unified stylesheet consolidating all 5 modular CSS files into a single master sheet:

```css
/* ==========================================================================
   LivEzee Vigil v6 — Master Stylesheet
   ========================================================================== */

/* 1. Variables & Reset */
:root {
  --navy: #1e436c;
  --blue: #295c94;
  --dark: #132a44;
  --gold: #c9a84c;
  --warm: #f7f4ef;
  --white: #ffffff;
  --mid: #d4d4d4;
  --text: #2a2a2a;
  --muted: #666;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Alata', sans-serif;
  background: var(--dark);
  min-height: 100vh;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

/* 2. Layout */
.header {
  background: var(--dark);
  border-bottom: 1px solid rgba(201, 168, 76, 0.3);
  padding: 16px 28px;
}

.header-brand .org {
  font-size: 10px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
}

.header-brand .product {
  font-size: 17px;
  color: var(--white);
  font-weight: 400;
  letter-spacing: 1px;
}

.header-brand .tagline {
  font-family: 'EB Garamond', serif;
  font-size: 12px;
  color: var(--gold);
  font-style: italic;
}

.main {
  max-width: 940px;
  margin: 0 auto;
  padding: 28px 16px 60px;
}

.intro-band {
  background: rgba(201, 168, 76, 0.08);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 6px;
  padding: 16px 20px;
  margin-bottom: 18px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

.intro-band strong {
  color: var(--gold);
}

.mode-toggle {
  display: flex;
  margin-bottom: 18px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(201, 168, 76, 0.3);
}

.mode-btn {
  flex: 1;
  padding: 13px 20px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.45);
  border: none;
  font-family: 'Alata', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  letter-spacing: 0.5px;
}

.mode-btn.active {
  background: var(--navy);
  color: var(--white);
}

.mode-btn .ml {
  display: block;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 3px;
}

.mode-btn .md {
  font-size: 11px;
  opacity: 0.6;
  font-family: 'EB Garamond', serif;
  font-style: italic;
}

.mode-btn.active .md {
  opacity: 0.75;
}

.mode-div {
  width: 1px;
  background: rgba(201, 168, 76, 0.2);
}

/* 3. Cards & Badges */
.card {
  background: var(--warm);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 14px;
}

.card-header {
  background: var(--navy);
  padding: 13px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header.care {
  background: #1a4a2e;
}

.card-header h3 {
  font-size: 11px;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  font-weight: 400;
}

.badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 2px;
  letter-spacing: 0.5px;
}

.badge-gold {
  background: rgba(201, 168, 76, 0.2);
  color: var(--gold);
}

.badge-red {
  background: rgba(180, 40, 40, 0.25);
  color: #f99;
}

.badge-green {
  background: rgba(30, 90, 50, 0.35);
  color: #8ee8a8;
}

.badge-muted {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.45);
}

.card-body {
  padding: 20px;
}

/* 4. Form Fields */
.field {
  margin-bottom: 14px;
}

.field:last-child {
  margin-bottom: 0;
}

.field-row {
  display: flex;
  gap: 12px;
}

.field-row .field {
  flex: 1;
}

.field-row .field.narrow {
  flex: 0.45;
}

label.fl {
  display: block;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.5px;
  margin-bottom: 5px;
  text-transform: uppercase;
}

input[type=text],
select,
textarea {
  width: 100%;
  border: 1px solid var(--mid);
  border-radius: 3px;
  padding: 9px 11px;
  font-family: 'Alata', sans-serif;
  font-size: 14px;
  color: var(--text);
  background: var(--white);
  outline: none;
  transition: border-color 0.2s;
}

input[type=text]:focus,
select:focus,
textarea:focus {
  border-color: var(--navy);
}

textarea {
  resize: vertical;
  min-height: 80px;
  line-height: 1.55;
}

/* 5. Upload Dropzones */
.upload-zone {
  border: 1.5px dashed var(--mid);
  border-radius: 4px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  background: var(--white);
  transition: all 0.2s;
  margin-bottom: 10px;
}

.upload-zone:hover,
.upload-zone.drag-over {
  border-color: var(--navy);
  background: #f0f4f9;
}

.upload-zone.zone-outlier {
  border-color: rgba(211, 84, 0, 0.4);
  background: #fffbf6;
}

.upload-zone.zone-care {
  border-color: rgba(30, 90, 50, 0.4);
  background: #f6fbf8;
}

.upload-zone.zone-prev {
  border-color: rgba(201, 168, 76, 0.4);
  background: #fdfbf5;
}

.upload-zone input[type=file] {
  display: none;
}

.upload-icon {
  font-size: 20px;
  margin-bottom: 5px;
}

.upload-text {
  font-size: 13px;
  color: var(--muted);
}

.upload-text strong {
  color: var(--navy);
}

.upload-hint {
  font-size: 11px;
  color: #aaa;
  margin-top: 3px;
}

/* 6. File Lists & Items */
.file-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #eef4fb;
  border: 1px solid #c5d9ee;
  border-radius: 3px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--navy);
}

.file-item.processing {
  background: #fff9ee;
  border-color: #f0c870;
}

.file-item.done {
  background: #eef6ee;
  border-color: #90c090;
}

.fn {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fs {
  font-size: 11px;
  color: var(--muted);
  flex-shrink: 0;
}

.file-remove {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
  flex-shrink: 0;
}

.file-remove:hover {
  color: #c0392b;
}

.prev-status {
  background: #f7f4ef;
  border: 1px solid #c5d9ee;
  border-radius: 4px;
  padding: 10px 14px;
  font-size: 12px;
  color: var(--navy);
  display: none;
  margin-top: 8px;
}

.prev-status.loaded {
  display: block;
  background: #eef6ee;
  border-color: #90c090;
}

.prev-status.error {
  display: block;
  background: #fef2f2;
  border-color: #fca5a5;
  color: #991b1b;
}

.prev-stats {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 5px;
}

.pstat {
  font-size: 11px;
  color: var(--muted);
}

.pstat strong {
  color: var(--navy);
}

/* 7. Focus Checklist Grid */
.focus-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.focus-toggle {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background: var(--white);
  border: 1px solid var(--mid);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}

.focus-toggle.active {
  background: #eef4fb;
  border-color: var(--blue);
}

.focus-toggle input {
  display: none;
}

.fcheck {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--mid);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  transition: all 0.15s;
}

.focus-toggle.active .fcheck {
  background: var(--navy);
  border-color: var(--navy);
}

.fcheck::after {
  content: '';
  display: none;
  width: 4px;
  height: 7px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translateY(-1px);
}

.focus-toggle.active .fcheck::after {
  display: block;
}

.focus-label {
  font-size: 13px;
  color: var(--text);
  line-height: 1.3;
}

.focus-sub {
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
}

/* 8. Buttons & Actions */
.btn-run {
  width: 100%;
  padding: 15px;
  background: var(--navy);
  color: var(--white);
  border: none;
  border-radius: 4px;
  font-family: 'Alata', sans-serif;
  font-size: 15px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 6px;
}

.btn-run:hover {
  background: var(--blue);
}

.btn-gold {
  padding: 8px 18px;
  background: none;
  border: 1px solid rgba(201, 168, 76, 0.4);
  color: var(--gold);
  border-radius: 3px;
  font-family: 'Alata', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-gold:hover {
  background: rgba(201, 168, 76, 0.1);
}

.btn-navy {
  padding: 8px 18px;
  background: var(--navy);
  border: 1px solid var(--navy);
  color: var(--white);
  border-radius: 3px;
  font-family: 'Alata', sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.btn-navy:hover {
  background: var(--blue);
}

.error-box {
  display: none;
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 3px;
  padding: 11px 14px;
  font-size: 13px;
  color: #991b1b;
  margin-bottom: 14px;
}

/* 9. Generating Spinner */
.generating {
  display: none;
  text-align: center;
  padding: 60px 20px;
}

.gen-ring {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(201, 168, 76, 0.15);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin: 0 auto 18px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.generating p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
}

.gen-status {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  color: var(--gold);
  font-size: 16px;
  margin-top: 8px;
}

/* 10. Report Panel */
.report {
  display: none;
}

.report-header {
  background: var(--dark);
  border: 1px solid rgba(201, 168, 76, 0.25);
  border-radius: 6px;
  padding: 18px 22px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}

.report-header h2 {
  font-size: 20px;
  color: var(--white);
  font-weight: 400;
}

.report-header .meta {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 3px;
}

.report-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.report-sections {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rsection {
  background: var(--warm);
  border-radius: 5px;
  overflow: hidden;
  border-left: 3px solid var(--navy);
}

.rsection.urgent {
  border-left-color: #c0392b;
}

.rsection-title {
  background: var(--white);
  padding: 11px 16px;
  font-size: 11px;
  letter-spacing: 1.5px;
  color: var(--navy);
  text-transform: uppercase;
  border-bottom: 1px solid var(--mid);
}

.rsection-body {
  padding: 15px 16px;
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
  white-space: pre-wrap;
}

.outlier-banner {
  background: rgba(211, 84, 0, 0.1);
  border: 1px solid rgba(211, 84, 0, 0.3);
  border-radius: 4px;
  padding: 10px 14px;
  font-size: 12px;
  color: rgba(255, 200, 150, 0.9);
  margin-bottom: 12px;
  display: none;
}

.outlier-banner.show {
  display: block;
}

/* 11. Heatmap Panel & Table */
.heatmap-panel {
  background: var(--dark);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 6px;
  margin-bottom: 18px;
  overflow: hidden;
}

.heatmap-titlebar {
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.heatmap-titlebar h3 {
  font-size: 11px;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  font-weight: 400;
}

.hm-legend {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.hm-leg {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
}

.hm-swatch {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  flex-shrink: 0;
}

.hm-scroll {
  overflow-x: auto;
  padding: 16px 18px 20px;
}

.hm-table {
  border-collapse: separate;
  border-spacing: 0;
  min-width: 100%;
}

.hm-table th {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 400;
  padding: 4px 8px;
  vertical-align: bottom;
  white-space: nowrap;
}

.hm-table th.dc {
  text-align: center;
  font-size: 9px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  padding: 6px 4px;
  min-width: 44px;
  color: rgba(255, 255, 255, 0.5);
}

.hm-table th.dc.oc {
  color: rgba(211, 84, 0, 0.9);
}

.hm-table th.dc.nc {
  color: rgba(201, 168, 76, 0.9);
}

.hm-table td.pl {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  padding: 3px 12px 3px 0;
  white-space: nowrap;
  vertical-align: middle;
}

.hm-table td.pl .pu {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
  display: block;
  margin-top: 1px;
}

.hm-table td.hc {
  padding: 2px 3px;
  vertical-align: middle;
  text-align: center;
}

.hm-block {
  width: 40px;
  height: 32px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  cursor: default;
  transition: filter 0.15s;
}

.hm-block:hover {
  filter: brightness(1.2);
}

.hm-block.empty {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.1);
}

.hm-block.normal {
  background: #1e5c2e;
  color: #8ee8a8;
}

.hm-block.b-low {
  background: #6b5c0e;
  color: #f5dc6a;
}

.hm-block.b-high {
  background: #6b420e;
  color: #f5b86a;
}

.hm-block.a-low,
.hm-block.a-high {
  background: #7a1a1a;
  color: #ffaaaa;
}

.hm-block.no-ref {
  background: #1e3a56;
  color: #7aade0;
}

.hm-cat {
  padding: 10px 0 3px 0;
  font-size: 9px;
  letter-spacing: 1.5px;
  color: rgba(201, 168, 76, 0.55);
  text-transform: uppercase;
}

.hm-cat td:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding-top: 12px;
}

/* 12. Floating Tooltip */
.hm-tip {
  position: fixed;
  background: #1a2a3a;
  border: 1px solid rgba(201, 168, 76, 0.35);
  border-radius: 4px;
  padding: 9px 13px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  pointer-events: none;
  z-index: 9999;
  display: none;
  max-width: 240px;
  line-height: 1.6;
}

.hm-tip .tp {
  color: var(--gold);
  font-size: 12px;
  margin-bottom: 4px;
}

.hm-tip .tv {
  color: #fff;
}

.hm-tip .tr {
  color: rgba(255, 255, 255, 0.45);
  font-size: 10px;
  margin-top: 2px;
}

.hm-tip .ts {
  margin-top: 4px;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 2px;
  display: inline-block;
}

.hm-tip .ts.normal {
  background: #1e5c2e;
  color: #8ee8a8;
}

.hm-tip .ts.b-low,
.hm-tip .ts.b-high {
  background: #6b5c0e;
  color: #f5dc6a;
}

.hm-tip .ts.a-low,
.hm-tip .ts.a-high {
  background: #7a1a1a;
  color: #ffaaaa;
}

.hm-tip .ts.no-ref {
  background: #1e3a56;
  color: #7aade0;
}

/* 13. Responsive Rules */
@media (max-width: 580px) {
  .field-row {
    flex-direction: column;
  }
  .report-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .focus-grid {
    grid-template-columns: 1fr;
  }
}
```
