# RevGuard

RevGuard is a financial tracking application designed for individualsto monitor and manage revenues and expenses. It features secure user authentication, detailed transaction logging, and insightful data visualizations.

Revguard is hosted at https://revguard.onrender.com

## Features
- Secure user authentication
- Income and expense tracking
- Transaction history management
- Visualizations and trend charts

## Installation

### Backend (Server with Frontend)
1. Clone the repository:
    ```bash
    git clone https://github.com/Marios-Liontas/RevGuard.git
    ```
2. Navigate to the project directory:
    ```bash
    cd RevGuard
    ```
3. Install backend dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables in `.env`.

5. Build the frontend (which will be served as static files):
    ```bash
    cd frontend
    npm install
    npm run build
    cd ..
    ```
6. Start the backend, which will serve both the API and the frontend:
    ```bash
    npm start
    ```

## Usage
- Access the app via your browser at the backend server URL.
- Sign up or log in with your credentials.
- Add, edit, or delete financial transactions.
- View and analyze financial trends through visual charts.

## Contributing
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add new feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature
    ```
5. Open a pull request.
