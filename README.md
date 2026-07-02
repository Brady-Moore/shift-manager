# ShiftSwap

A full-stack shift management application that allows managers to create and assign shifts while giving employees an easy workflow for requesting and claiming shift coverage.

**Live Demo:** [https://your-app.vercel.app](https://shift-manager-rosy.vercel.app/)

---

## Features

### Manager

- Create assigned shifts
- Create open shifts
- View weekly schedule
- Review claimed shift requests
- Approve or deny coverage requests
- Add manager notes when denying requests
- View request history

### Employee

- View assigned shifts
- Request shift coverage
- Browse open shifts
- Claim open shifts
- Claim another employee's coverage request
- View personal request history

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL (Neon)

### Deployment

- Vercel

---

## Screenshots


### Dashboard

### Weekly Schedule

### Request History

---

## Project Structure

```text
src/
├── app/
│   ├── actions/
│   └── dashboard/
├── components/
├── lib/
└── generated/
```

---

## Shift Coverage Workflow

```text
Manager creates shift
        │
        ▼
Employee requests coverage
        │
        ▼
Another employee claims request
        │
        ▼
Manager approves or denies
        │
        ▼
Shift ownership updated
```

---

## Local Development

```bash
git clone https://github.com/Brady-Moore/shift-manager.git

npm install

npx prisma migrate dev

npm run dev
```

---

## Environment Variables

```env
DATABASE_URL=
```

---

## Future Improvements

- Edit existing shifts
- Delete shifts
- Week-to-week schedule navigation
- Toast notifications
- Confirmation dialogs
- Search and filtering
- Calendar view
- Unit and integration tests
- Improved mobile experience

---

## Author

Brady Moore

GitHub: https://github.com/yourusername
