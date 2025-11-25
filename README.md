.

- **Frontend:**
  - [Next.js](https://nextjs.org/) (React Framework)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [TypeScript](https://www.typescriptlang.org/)
- **Backend:**
  - [FastAPI](https://fastapi.tiangolo.com/) (Python Framework)
- **Database:** (Not explicitly defined, but likely a simple data store or file-based for the MVP)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.9 or higher)
- [pnpm](https://pnpm.io/) (or your preferred package manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Musta2023/DigiAssistant.git
    
    ```

2.  **Install frontend dependencies:**
    ```bash
    pnpm install
    ```

3.  **Install backend dependencies:**
    ```bash
    cd backend
    python -m venv .venv
    source .venv/bin/activate  # On Windows, use `.venv\Scripts\activate`
    pip install -r requirements.txt
    cd ..
    ```

### Running the Application

1.  **Run the backend server:**
    ```bash
    cd backend
    uvicorn main:app --reload
    ```

2.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
