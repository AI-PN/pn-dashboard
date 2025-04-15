# Patient Network Dashboard

A modern healthcare management dashboard built with Next.js and Supabase, designed to help healthcare providers manage patient records, appointments, and communications efficiently.

## Features

- **Patient Management**
  - View and search patient records
  - Add new patients
  - Track patient status and history
  - View detailed patient information

- **Appointment Scheduling**
  - Schedule and manage appointments
  - View appointment history
  - Set appointment priorities and status

- **Communication**
  - Real-time chat with patients
  - Message history tracking
  - Read status indicators
  - Support for both doctor and patient messages

- **Task Management**
  - Create and assign tasks
  - Set task priorities
  - Track task completion status
  - Link tasks to specific patients

## Tech Stack

- **Frontend**
  - Next.js 13+ (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - React Query (for data fetching)

- **Backend**
  - Supabase
    - Authentication
    - Database
    - Real-time subscriptions
    - Storage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/patient-network-dashboard.git
   cd patient-network-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

1. **patients**
   - id (uuid)
   - name (text)
   - age (integer)
   - status (enum: 'Active', 'Pending', 'Stable')
   - image_url (text, nullable)
   - last_visit (timestamp)
   - created_at (timestamp)

2. **messages**
   - id (uuid)
   - content (text)
   - patient_id (uuid, references patients)
   - sender_id (uuid, references profiles)
   - sender_type (enum: 'doctor', 'patient')
   - is_read (boolean)
   - created_at (timestamp)

3. **tasks**
   - id (uuid)
   - title (text)
   - time (timestamp)
   - priority (enum: 'High', 'Medium', 'Low')
   - patient_id (uuid, references patients)
   - status (enum: 'Pending', 'Completed')
   - created_at (timestamp)

4. **profiles**
   - id (uuid)
   - full_name (text)
   - avatar_url (text, nullable)
   - created_at (timestamp)

## Project Structure

```
pn-dashboard/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── patients/          # Patient-related pages
│   │   ├── communication/     # Chat and messaging pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utility functions and configurations
│   │   ├── supabase.ts      # Supabase client and types
│   │   └── types.ts         # TypeScript type definitions
│   └── styles/              # Global styles
├── public/                  # Static assets
└── package.json            # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
