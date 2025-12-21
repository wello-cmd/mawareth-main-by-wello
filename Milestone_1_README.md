# Milestone 1: The MVP (Core Implementation)

## Goal
The primary goal of Milestone 1 is to establish the "skeleton" of the application. This means having the **Database connected**, the **Backend API running**, and the **Frontend communicating with the Backend** for at least one core feature (Authentication).

## Success Criteria (Definition of Done)
1.  **Repository Setup**: GitHub repository active with all members invited.
2.  **Environment Configuration**: Node.js, MongoDB Atlas (Cloud), and React (Vite) installed and configured.
3.  **Database Connection**: Backend successfully connects to MongoDB Atlas.
4.  **Authentication System**:
    -   User Schema created.
    -   Register/Login API endpoints working (Postman tested).
    -   Frontend forms for Login/Register connected to API.
5.  **Basic Routing**: Frontend React Router set up with placeholders for all main pages (Dashboard, Estate, Marketplace, etc.).

## Task Breakdown by Role

### **[Student 1 (Lead)] - Setup & Auth**
-   [x] Initialize Project (MERN Stack).
-   [x] Configure MongoDB Atlas Connection.
-   [ ] Implement User Schema & Auth Routes (Login/Register).
-   [ ] JWT Token implementation.

### **[Student 2] - Estate Core**
-   [ ] Create Mongoose Schema for `Estate`.
-   [ ] Create "Get All Estates" API endpoint.
-   [ ] Create "Add Estate" frontend form (Basic).

### **[Student 3] - AI Chatbot Setup**
-   [ ] Create Mongoose Schema for `Chat`.
-   [ ] Set up Gemini API Key in `.env`.
-   [ ] Create basic backend route to send test message to Gemini.

### **[Student 4] - Buyout Setup**
-   [ ] Create Mongoose Schema for `BuyoutApplication`.
-   [ ] Create basic API route for submitting an application.

### **[Student 5] - Marketplace Setup**
-   [ ] Create Mongoose Schema for `MarketplaceListing`.
-   [ ] Create "View Marketplace" frontend page (Static or Basic Fetch).

### **[Student 6] - Admin Dashboard Setup**
-   [ ] Create Admin Dashboard Layout (Frontend).
-   [ ] Create "Get User Statistics" API endpoint (Mock or Real).

## Technical Deliverables
-   **Postman Collection**: Export of tested API endpoints.
-   **Screenshots**:
    1.  Terminal showing DataBase Connection Success.
    2.  Postman showing a successful Login request (Token received).
    3.  Frontend Screenshot of the Landing Page.
