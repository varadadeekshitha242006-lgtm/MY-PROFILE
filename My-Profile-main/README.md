# Varada Deekshitha — Personal Portfolio

A full-stack personal portfolio website built with **React JS** (frontend) and **Django REST Framework** (backend), backed by **SQLite**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React JS, Vite, CSS3 |
| Backend | Python, Django, Django REST Framework |
| Database | SQLite |
| Fonts | Inter, Fira Code, Playfair Display |

---

## Project Structure

```
protofilo/
├── frontend/                  # React JS (Vite)
│   ├── public/
│   │   ├── profile.jpeg
│   │   └── Varada_Deekshitha_Resume.pdf
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx
│       │   ├── Experience.jsx
│       │   ├── Contact.jsx
│       │   ├── Footer.jsx
│       │   └── Cursor.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── backend/                   # Django REST API
│   ├── core/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── portfolio/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── management/
│   │       └── commands/
│   │           └── seed.py
│   └── manage.py
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- pip

---

### Backend Setup

```bash
cd backend

# Install dependencies
pip install django djangorestframework django-cors-headers

# Apply migrations
python manage.py migrate

# Seed database with portfolio data
python manage.py seed

# Create admin user (optional)
python manage.py createsuperuser

# Run server
python manage.py runserver
```

Backend runs at → `http://127.0.0.1:8000`

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/` | All projects (`?featured=true` filter) |
| GET | `/api/skills/` | Skills flat list + grouped by category |
| GET | `/api/experience/` | Experience & education entries |
| POST | `/api/contact/` | Submit contact message |
| GET | `/api/summary/` | All data in a single call |

Admin panel → `http://127.0.0.1:8000/admin/`

---

## Features

- Dark aesthetic UI with violet / teal / rose color palette
- Animated hero section with typewriter role effect
- Interactive Skills section with tab switcher
- Project cards with filter (All / Featured / React / Django / AI)
- Timeline-based Experience & Certifications section
- Contact form wired to Django REST API
- Custom cursor with smooth lag animation
- Fully responsive — mobile, tablet, desktop
- Resume opens in new tab (PDF)

---

## Sections

| Section | Description |
|---------|-------------|
| Hero | Name, animated role, stat cards, CTA buttons |
| About | Bio, profile photo, detail grid, resume button |
| Skills | Tab switcher with stats — Frontend, Backend, Database, DSA & Tools |
| Projects | Cards with filter — Skillora, Agentic AI, Gaming Zone, Portfolio, Web Dev |
| Experience | Timeline — CodeAlpha, Indian Servers, Infosys Springboard |
| Certifications | NPTEL Silver Medals, HackerRank, Infosys, GeeksforGeeks |
| Contact | Contact info + message form |

---

## Contact

**Varada Deekshitha**
- Email: varadadeekshitha@gmail.com
- Phone: +91 8019107794
- LinkedIn: [linkedin.com/in/varada-deekshitha-7b071b309](https://www.linkedin.com/in/varada-deekshitha-7b071b309)
- GitHub: [github.com/Varada-Deekshitha](https://github.com/Varada-Deekshitha)
- CodeChef: [codechef.com/users/varadadeekshi](https://www.codechef.com/users/varadadeekshi)

---

© 2026 Varada Deekshitha · B.Tech CSE 2023–2027 · Satya Institute of Technology and Management (SITAM)
