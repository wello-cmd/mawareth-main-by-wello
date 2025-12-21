# Mawareth Team Code Guide
## "Who owns what code?"

This document breaks down the codebase by team member assignment. Use this to practice explaining "your part" of the code.

---

### 1. Mohammed Waleed (Lead)
**Ref:** `Core Architecture, Auth & RBAC`

You own the **Security Gate** and the **Foundation**. Your code decides who gets in and who stays out.

#### Backend (Node/Express):
*   `src/server.ts`: The main entry point. You explain how the server starts and how middleware (CORS, Helmet) protects it.
*   `src/config/db.ts`: Database connection logic.
*   `src/routes/authRoutes.ts`: The definitions of `/login` and `/register`.
*   `src/controllers/authController.ts`: **CRITICAL FILE.** This contains the logic for:
    *   Hashing passwords (bcrypt).
    *   Generating JWTs (signToken).
    *   Registering users (and the `phone` field logic).
*   `src/middleware/authMiddleware.ts`: The `protect` function that checks the token.

#### Frontend (React):
*   `src/contexts/AuthContext.tsx`: The global state that holds the `user` object. Explain `login()`, `logout()`, and `isAuthenticated`.
*   `src/components/auth/ProtectedRoute.tsx`: The security guard component. Explain how it redirects users if they aren't logged in.
*   `src/pages/Auth.tsx`: The Login/Signup UI.

---

### 2. Omar Ehab
**Ref:** `Estate Management & Voting`

You own the **Assets** and **Consensus**. Your code handles the "Family" logic.

#### Backend:
*   `src/models/Estate.ts`: The schema defining what an Estate is (heirs, assets, stats).
*   `src/routes/estateRoutes.ts` & `src/controllers/estateController.ts`: Logic to create estates and adding heirs.

#### Frontend:
*   `src/pages/Dashboard.tsx`: The main user view showing their estates.
*   `src/components/dashboard/AddEstateDialog.tsx`: The form to create a new estate.
*   `src/pages/VotePage.tsx`: **Your Key Feature.** Explain how the external voting link works (fetching estate by ID and submitting a vote).
*   `src/pages/PendingApproval.tsx`: The "Waiting Room" for unverified users.

---

### 3. Ali Safwat
**Ref:** `Solh Marketplace`

You own the **Trading Engine**. Your code moves money and shares.

#### Backend:
*   `src/models/MarketplaceListing.ts`: Schema for a share being sold.
*   `src/routes/marketplaceRoutes.ts` & `src/controllers/marketplaceController.ts`: Logic for:
    *   `createListing`: The 30% rule validation.
    *   `placeBid`: The auction logic (highest bidder updates).

#### Frontend:
*   `src/pages/Marketplace.tsx`: The browsing page. Explain the "Filter" logic (active vs sold).
*   `src/pages/SubmitListing.tsx`: The form where users sell their shares.
*   `src/components/marketplace/*`: Any sub-components like `ListingCard`.

---

### 4. Mostafa 3arram
**Ref:** `Finance & Buyout Engine`

You own the **Numbers**. Your code verifies the math.

#### Backend:
*   `src/models/BuyoutApplication.ts`: Schema for "Cash Out" requests.
*   `src/routes/buyoutRoutes.ts`: Endpoints for submitting applications.

#### Frontend:
*   `src/pages/Calculator.tsx`: **Your Key Feature.** This page contains heavy logic for Islamic Inheritance Math (Faraid). You should explain how the input (Wife/Son/Daughter) converts to a share fraction.
*   `src/pages/Finance.tsx`: The dashboard showing financial status.
*   `src/pages/LoanApplication.tsx`: The form to request a buyout.

---

### 5. Mariam Ahmed
**Ref:** `AI Legal Assistant`

You own the **Brain**. Your code talks to the user.

#### Backend:
*   `src/routes/chatRoutes.ts` & `src/controllers/chatController.ts`: The bridge to Google Gemini.
*   `src/services/geminiService.ts` (if exists) or controller logic: Where the prompt engineering happens ("You are a legal assistant...").

#### Frontend:
*   `src/components/chat/AIChatbot.tsx`: The floating chat bubble. Explain how it sends the user's message and waits for the streaming response.

---

### 6. Salma Momtaz
**Ref:** `Admin/Moderator Dashboard`

You own the **Control Room**. Your code manages the chaos.

#### Backend:
*   `src/routes/userRoutes.ts`: Endpoints to get "all users" for the table.
*   `src/controllers/userController.ts`: Logic to approve/verify/delete users.

#### Frontend:
*   `src/pages/Admin.tsx`: **Your Key Feature.** This is a complex page. Explain:
    *   The `Tabs` system (Pending vs Users).
    *   The `Role` dropdown logic we just added.
    *   The security check `!['admin', ...].includes(currentUser.role)` that hides the page from non-admins.
*   `src/components/finance/ResultsDisplay.tsx`: The nice charts/visuals for data.

---

### 7. Mohammed Omar
**Ref:** `Merath Docs`

You own the **Paperwork**. Your code generates the PDF.

#### Backend:
*   *Pending Implementation:* You will need to build `src/routes/documentRoutes.ts` to execute valid PDF generation on the server.

#### Frontend:
*   `src/pages/MerathDocs.tsx`: The library of available templates.
*   `src/pages/DocumentGenerator.tsx`: The dynamic form. Explain how the form updates the "Preview" text in real-time as the user types names.
