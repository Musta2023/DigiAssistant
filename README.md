# DigiAssistant Pro

<p align="center">
  <img src="app/projectImages/logo_digitAssistant.png" alt="DigiAssistant Pro Logo" width="150"/>
</p>

<p align="center">
  <strong>An adaptive conversational web application for digital maturity assessment.</strong>
</p>

<br>

DigiAssistant Pro is an enterprise-grade platform designed to help organizations evaluate and optimize their digital maturity across key dimensions. It offers two distinct assessment flows: a dynamic, conversational assessment for a fast and personalized experience, and a comprehensive traditional evaluation for a deep audit.

## Key Features

- **Adaptive Conversational Assessment:** An engaging, chat-like experience that adapts to your answers, providing a personalized evaluation with just a few smart questions.
- **Intelligent Scoring:** A sophisticated scoring engine that automatically detects maturity gaps and determines your organization's digital profile.
- **Strategic Insights:** Expert-level recommendations and an actionable roadmap to guide your digital transformation journey.
- **Professional PDF Reports:** Generate detailed, executive-ready PDF reports with visualizations of your assessment results.
- **Benchmark Comparison:** Compare your maturity against industry standards and best practices.

## Tech Stack

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
    git clone https://github.com/your-username/digiassistant-pro.git
    cd digiassistant-pro
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
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1.  **Home Page:** Get an overview of the platform's features and choose your assessment type.

    *(Screenshot of the home page)*

2.  **Start Assessment:** Provide some basic information about your company to personalize the assessment.

    *(Screenshot of the start page)*

3.  **Conversational Assessment:** Answer a series of adaptive questions in a chat-like interface.

    *(Screenshot of the conversation page)*

4.  **Results:** View your personalized assessment results, including your digital maturity profile, dimension scores, and an action plan.

    *(Screenshot of the results page)*

5.  **PDF Report:** Download a detailed PDF report of your assessment results.

    *(Screenshot of the PDF report)*

## Project Structure

```
├── app/                  # Next.js 13 app router
│   ├── (pages)/          # Page components
│   ├── actions/          # Server actions
│   └── layout.tsx        # Root layout
├── backend/              # FastAPI backend
│   ├── api/              # API endpoints
│   ├── models/           # Pydantic models
│   └── main.py           # FastAPI app entrypoint
├── components/           # Shared React components
│   └── ui/               # UI components (buttons, cards, etc.)
├── data/                 # Static data (questions, criteria)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets (images, fonts)
└── README.md
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.