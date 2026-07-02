<p align="center">
  <img
    src="https://github.com/user-attachments/assets/112e516d-a458-4911-ae0e-17f49b56d509"
    alt="ShiftSwap"
    width="400"
  />
</p>

<p align="center">
  <strong>A full-stack shift management application built with Next.js, Prisma, and PostgreSQL.</strong>
</p>

<p align="center">
  <a href="https://shift-manager-rosy.vercel.app/">Live Demo</a>
</p>

ShiftSwap is a full-stack shift management application that streamlines employee shift scheduling and coverage requests. Managers can create, edit, and assign shifts while employees can request coverage, claim available shifts, and track the status of their requests through a complete approval workflow.

---

# Features

## Manager

- Create assigned shifts
- Create open shifts
- Edit existing shifts
- Delete shifts
- View the weekly schedule
- Review claimed shift requests
- Approve or deny coverage requests
- Add manager notes when denying requests
- View request history

## Employee

- View assigned shifts
- Request shift coverage
- Cancel pending coverage requests
- Browse open shifts
- Claim open shifts
- Claim another employee's coverage request
- View personal request history

---

# Tech Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL (Neon)

## Deployment

- Vercel

---

# Screenshots

### Sign In

<img width="468" height="317" alt="image" src="https://github.com/user-attachments/assets/36e8c326-dded-4957-9e3f-1299357d5880" />


### Dashboard

<img width="628" height="560" alt="image" src="https://github.com/user-attachments/assets/68d3b89e-c523-43f3-a19e-a1464f81aa84" />

### Weekly Schedule

<img width="645" height="431" alt="image" src="https://github.com/user-attachments/assets/ca69105a-413b-4940-bb28-de08448e2497" />

---

# Project Structure

```text
src/
├── app/
│   ├── actions/
│   ├── dashboard/
│   └── page.tsx
├── components/
├── lib/
├── prisma/
└── public/
```

---

# Shift Coverage Workflow

```text
Manager creates shift
        │
        ▼
Employee requests coverage
        │
        ▼
Coverage request appears in Open Requests
        │
        ▼
Another employee claims the shift
        │
        ▼
Manager approves or denies
        │
        ▼
Shift assignment updated
```

---

# Local Development

```bash
git clone https://github.com/Brady-Moore/shift-manager.git

cd shift-manager

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

---

# Environment Variables

```env
DATABASE_URL=postgresql://...
```

---

# Future Improvements

- Week-to-week schedule navigation
- Confirmation dialogs before destructive actions
- Toast notifications for successful actions
- Search and filtering
- Calendar view
- Unit and integration tests
- Enhanced mobile responsiveness

---

# Author

**Brady Moore**
