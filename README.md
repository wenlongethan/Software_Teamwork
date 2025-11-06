# Software_Teamwork
build a nice restaurant system
Version 1.0 Until 5th Nov

```markdown
# 🍽️ Restaurant-System
**Private version for the restaurant system project**
*(BME - Software Architectures Course, 2025 Autumn)*

---

## 🧩 Project Overview
This project is a **web-based restaurant management system** developed for the *Software Architectures* course.
It aims to build a modular and scalable system supporting menu browsing, online ordering, cart management, and checkout functionality.

---

## 📅 Current Progress (as of 5th November 2025)
- ✅ Established full project and folder architecture
- ✅ Created GitHub private repository for version control
- ✅ Built core front-end pages (`index.html`, `restaurant.html`, `login.html`, etc.)
- ✅ Designed initial backend prototype structure (Flask / Node.js)

---

## 🏗️ System Architecture
restaurant-system/
├─ frontend/       ← HTML / CSS / JS
│   ├─ public/     ← Main pages（index, restaurant, login...）
│   ├─ assets/     ←  Stydles & scripts
│   └─ ...
├─ backend/        ← Flask / Node.js providoing RESTful APIs
│   ├─ app.py      ← Application entry point
│   ├─ restaurant.db ← SQLite database
│   ├─ api/        ← Modular API routes
│   │   ├─ menu.py ← /api/menu
│   │   ├─ cart.py ← /api/cart
│   │   └─ users.py ← /api/users
│   └─ ...
└─ README.me
```

```

---

## 🧭 System Architecture Diagram

```mermaid
flowchart LR
    subgraph FRONTEND [Frontend (Client)]
        A1[HTML Pages<br>(index, restaurant, login)]
        A2[CSS + JS<br>(Assets)]
    end

    subgraph BACKEND [Backend (Server)]
        B1[Flask / Node.js App]
        B2[API Endpoints<br>/api/menu /api/cart /api/checkout /api/users]
    end

    subgraph DATABASE [Database Layer]
        C1[(SQLite Database)]
        C2[Tables:<br>Menu / Orders / Users / Cart Items]
    end

    A1 -->|fetch() JSON| B2
    B2 -->|SQL Queries| C1
    C1 -->|Data Response| B2
    B2 -->|JSON Response| A1

```

---

## 👥 Team Members & Roles

The closed loop of development - testing - user verification

| Member | Role | Responsibilities |
| --- | --- | --- |
| **Liu Hao** | 🎨 Front-end Developer  | Designs and develops responsive frontend interfaces using **HTML/CSS/JavaScript**. Responsible for overall styling, navigation layout, and visual user experience. Collaborates with the full-stack developer to integrate API-based dynamic content and ensures consistent branding and design across pages. |
| **Liang Wenlong** | 🧠 Project Manager / System Architect /Full Stack Developer / Database | Leads the **overall system architecture**, GitHub management, documentation, and integration of backend and frontend. Built the **Flask + SQLite backend**, designed RESTful APIs (`/api/menu`, `/api/checkout`), and implemented full frontend-backend connectivity including **menu rendering, cart logic, and checkout flow**. Responsible for system integration, deployment, and final debugging. |
| **Tawfik** | ⚙️ Front-end  Developer / Dynamic Interaction | Implements JavaScript-based **dynamic rendering and interactive features**, such as cart updates, item quantity changes, and responsive layout. Works closely with Liu Hao to improve UI responsiveness and user navigation flow. Assists in frontend API connection and usability enhancement. |
| **Aysel** | 💾 UI Designer |  Designs and refines the overall **visual appearance** of the website. Responsible for layout consistency, responsive styling, color palette, and branding across pages. Assists in optimizing **user experience (UX)** and visual hierarchy. Creates CSS enhancements and page templates for *About*, *Contact*, and *News* pages. Works closely with Liu Hao and Member A to ensure design cohesion and aesthetic quality. |
| **Bolorchimeg** | 🧮 Testing Engineer / User Feedback Coordinator / Documentation | Conducts **API testing** using Postman and browser developer tools to validate system reliability. Organizes **user testing sessions** with at least **5 external users**, collects feedback in **video/screenshot + comment form**, and compiles an improvement report. Responsible for preparing **testing documentation and final presentation slides**, ensuring the project reflects real user feedback and usability insights. |

## Team Members KPI

Everyone cook a dishes and take a beautiful photo of it!

| **Member** | **Objectives (KPI)** | **Deliverables / Evidence** | **Deadline** | **Success Criteria** |
| --- | --- | --- | --- | --- |
| **Liang Wenlong 🧠***Project Manager / System Architect / Full Stack Developer* | - Complete full backend–frontend integration (menu, cart, checkout)- Manage GitHub repository & documentation- Deliver working prototype + QR web access- Support members’ integration tasks and final testing | - Fully functional Flask + SQLite backend (`/api/menu`, `/api/checkout`)- GitHub repo with complete commits, README, and QR demo access- Weekly progress log and integration report | **Nov 13** | ✅ Fully working system✅ Clean documentation✅ All modules integrated and tested |
| **Liu Hao 🎨***Front-end Developer / UI Designer* | - Finalize responsive layout using HTML/CSS- Ensure consistent design across all pages- Implement branding, navigation, and color theme- Support API-based dynamic content display | - Polished `restaurant.html` and `style.css` with commits- Screenshot comparison (desktop vs. mobile)- Visual refinement and layout validation | **Nov 13** | ✅ Responsive on both desktop & mobile✅ Visual consistency✅ No broken layout or CSS conflict |
| **Member A ⚙️***Front-end Interaction Engineer* | - Implement dynamic rendering and cart logic in JS- Bind API data to DOM (`/api/menu`, `/api/checkout`)- Handle item add/remove, quantity, and total- Ensure no console errors and stable UX | - Updated `restaurant.js` logic- Demo video of interactive cart flow- Git commit history for script changes | **Nov 13** | ✅ Cart interaction stable✅ API connection functional✅ No JS console errors |
| **Member B 💻***UI Designer / Front-end Assistant* | - Refine global visual theme and responsive grid- Design consistent layout for *About, News, Contact* pages- Ensure unified typography, color, and spacing- Optimize layout readability and aesthetic balance | - Updated HTML & CSS structure- Screenshot gallery showing page consistency- Commit log for UI revisions | **Nov 19** | ✅ Unified color & font style✅ Consistent UI across pages✅ Improved readability and aesthetics |
| **Member C 🧪***Testing & Feedback Coordinator / Presentation Specialist* | - Conduct usability testing with ≥5 users (classmates/friends)- Collect feedback (screenshots, recordings, written comments)- Summarize improvement report and prepare slides | - Feedback forms (≥5 testers)- Screenshot or video evidence- Written test summary + final presentation slides | **Nov 13** | ✅ ≥5 testers reached✅ Documented feedback & report✅ Clear improvement suggestions |

---

## 🔧 Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla JS) |
| **Backend** | Flask (Python) / Express (Node.js) |
| **Database** | SQLite (initial) → MySQL/PostgreSQL (optional) |
| **Version Control** | GitHub (Private Repository) |
| **Development Tools** | PyCharm, Cursor, VSCode |

---

## 🧱 Development Roadmap

| Phase | Duration | Goals |
| --- | --- | --- |
| **Phase 1** | Nov 5 – Nov 12 | Finalize front-end UI and unify style and navigation |
| **Phase 2** | Nov 12 – Nov 19 | Implement dynamic rendering and cart logic (with fake data) |
| **Phase 3** | Nov 19 – Nov 26 | Build backend APIs (`/api/menu`, `/api/cart`, `/api/checkout`) |
| **Phase 4** | Nov 26 – Dec 3 | Integrate front-end with backend (Flask + SQLite) |
| **Phase 5** | Dec 3 – Dec 10 | Testing, documentation, architecture diagram, and presentation |

---

## 🚀 Planned Features

- 🧭 Multi-page navigation
- 🍕 Dynamic menu display with category filters
- 🛒 Shopping cart (add / remove / update items)
- 💳 Checkout form and order summary
- 👤 User login and registration system
- 📊 Admin dashboard for menu and order management

---

## 📘 How to Run

### 🔹 Run Frontend (Static Version)

Open `frontend/public/index.html` directly in your browser.

### 🔹 Run Backend (Flask Example)

```bash
cd backend
python app.py

```

Then open: [http://127.0.0.1:5001/api/menu](http://127.0.0.1:5000/api/menu)

---

## 🧩 Repository Purpose

This repository is for educational and collaborative purposes, representing a **private prototype** of the Restaurant-System project for coursework under *BME Software Architectures 2025 Autumn*.

---

© 2025 Restaurant-System Team. All rights reserved.
