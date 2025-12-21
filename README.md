# MAWARETH - Inheritance & Estate Management Platform
### Course: Electronic Business Development (BINF 503) - Winter 2025
**Milestone 0: The Plan**

---

## 1. Project Concept
**Mawareth** is a comprehensive Fin-Tech platform designed to simplify and digitize the complex process of inheritance distribution in Egypt. It empowers heirs to manage estates, vote on asset distribution, trade inherited assets in a specialized marketplace, and access financial buyouts for quick liquidity.

By combining Sharia-compliant logic with modern financial tools, Mawareth solves the crisis of "Dead Capital"—frozen real estate assets stuck in family disputes.

---

## 2. Team Members & Feature Accountability
**Team Size:** 7 Members

| Student Name | ID | Assigned Use Case (Feature Owner) | Workload Note |
| :--- | :--- | :--- | :--- |
| **Mohammed Waleed (Lead)** | **[ID]** | **1. Core Architecture, Auth & RBAC** | **Heavy Load:** Auth implementation (JWT/Bcrypt), Security, Admin Hierarchy (RBAC Logic), Database Design & DevOps. |
| **Omar Ehab** | **[ID]** | **2. Estate Management & Voting** | **Standard:** Estate CRUD, Consensus Logic, and the new **External Voting Link** system. |
| **Ali Safwat** | **[ID]** | **3. Solh Marketplace** | **Standard:** Full Trading Engine: Listing creation, Bidding logic, and Search filters. |
| **Mostafa 3arram** | **[ID]** | **4. Finance & Buyout Engine** | **Standard:** Inheritance Math Validation, Results calculation, and Buyout Application flow. |
| **Mariam Ahmed** | **[ID]** | **5. AI Legal Assistant** | **Standard:** Chatbot UI/UX, Google Gemini API integration, and Legal Persona engineering. |
| **Salma Momtaz** | **[ID]** | **6. Admin/Moderator Dashboard** | **Standard:** Dashboard UI, Charts/Stats, and Frontend implementation of Moderation tools. |
| **Mohammed Omar** | **[ID]** | **7. Merath Docs** | **Standard:** Document Generator page, PDF Template Engine, and Watermarking logic. |

---

## 3. Features & Use Cases Breakdown

### 1. User Authentication & Security (Lead)
* **Description:** The gateway to the platform ensuring secure access for Heirs, Investors, and Admins.
* **Key Features:** Secure Registration/Login, JWT Token management, Password Hashing (Bcrypt), and Role-Based Access Control (RBAC) to protect sensitive routes.

### 2. Estate Management & Consensus
* **Description:** The core logic for handling inherited properties and family voting.
* **Key Features:** Create digital estates; add heirs and assets; "Silent Consensus" voting system where heirs vote to (Sell/Keep) assets without confrontation.

### 3. Solh Marketplace
* **Description:** A specialized market for trading inherited shares.
* **Key Features:** List distressed/disputed assets; Investors view and bid on shares; "Unlock Details" feature to monetize lead data.

### 4. Buyout Applications (Finance)
* **Description:** A financial tool for heirs who need immediate liquidity.
* **Key Features:** Heirs apply for cash buyouts of their shares; System calculates value based on Sharia rules; Admin approval workflow.

### 5. AI Legal Assistant (Chatbot)
* **Description:** An intelligent support system providing instant legal clarity.
* **Key Features:** Context-aware chat interface; Answers questions on Sharia law and platform navigation; Chat history persistence.

### 6. Admin & Finance Dashboard
* **Description:** A centralized control room for platform administrators.
* **Key Features:** Overview of total users and active estates; Management of reported listings; System activity logs.

### 7. Merath Docs (Automated Legal Document Generator)
* **Overview:** A "Digital Typist" service designed to streamline bureaucratic bottlenecks. It allows heirs to instantly generate standardized, Sharia-compliant legal drafts (Muswada) for a nominal fee (e.g., 200 EGP), solving the "Notary Bottleneck" (Shahr 3qary).
    
* **Core Functionality:**
    * **Template Engine:** Merges user data (names, IDs, assets) into legally verified templates.
    * **Document Scope:**
        * *Partition Agreement (Aqd Qisma):* Contract for agreed division.
        * *Power of Attorney Draft (Seghat Tawkeel):* Text for authorizing lawyers.
        * *Inheritance Declaration (E3lam Weratha):* Structured heir list.
    * **Paywall:** Users preview watermarked drafts but must pay to download the final PDF.
    * **QR Verification:** Ensures document authenticity.

* **Legal Safety Architecture:**
    * **Disclaimer:** Mandatory checkbox acknowledging the document is a "Draft" and not legal advice.
    * **Watermarking:** "DRAFT / مسودة" overlay on previews.
    * **Standardization:** Only populates standard forms accepted by Egyptian Notaries.

---

## 4. New Features added in Iteration 1

### 8. Admin Hierarchy (RBAC)
*   **Super Admin:** Can create other admins and see financial logs.
*   **Moderator (Semi-Admin):** Can only view pending Marketplace listings and click "Approve" or "Deny" (with a reason).
*   **Workflow:**
    *   *Super Admin View:* "User Management" tab -> Button "Promote to Moderator."
    *   *Moderator View:* "Pending Listings" tab -> Buttons "Approve" / "Reject."

### 9. External Voting Link
*   **The Problem:** Family members are stubborn. They won't download an app just to agree to sell a house.
*   **The Solution:** The app generates a unique link (e.g., `mawareth.eg/vote/123xyz`). The heir receives it on WhatsApp, clicks it, sees the house photo and price, and clicks "Mac Agree" or "I Disagree" without logging in (or by just entering their National ID for verification).
*   **Flow:**
    *   Heir A creates the Estate.
    *   Heir A adds Heir B's phone number.
    *   System generates a signed URL: `.../vote/:token`.
    *   Heir B clicks the link -> Sees "Do you agree to sell?" -> Clicks Yes.
    *   The system updates the database automatically.

---

## 4. Data Modeling (Mongoose Schemas)

### A. User Schema
Represents Heirs, Investors, and Admins.
```javascript
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['heir', 'investor', 'admin'], default: 'heir' },
  isVerified: { type: Boolean, default: false },
  adminNotes: { type: String }
});
```

### B. Estate Schema
Represents the property or asset being inherited.

```javascript
const EstateSchema = new mongoose.Schema({
  deceasedName: { type: String, required: true },
  assets: [{ title: String, value: Number, type: String }],
  heirs: [{ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    share: Number 
  }],
  status: { type: String, enum: ['Pending', 'Distributed'], default: 'Pending' },
  consensus: [{ heirId: String, vote: String }]
});
```

### C. MarketplaceListing Schema
Represents shares available for purchase.

```javascript
const MarketplaceListingSchema = new mongoose.Schema({
  estateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Estate' },
  price: { type: Number, required: true },
  description: { type: String },
  type: { type: String, enum: ['Real Estate', 'Gold', 'Land'] },
  status: { type: String, default: 'Active' }
});
```

### D. BuyoutApplication Schema
Represents a request for liquidity.

```javascript
const BuyoutApplicationSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Estate' },
  sharePercentage: { type: Number },
  requestedAmount: { type: Number },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'] }
});
```

### E. Chat Schema
Stores AI or Support conversation history.

```javascript
const ChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  type: { type: String, enum: ['AI', 'Support'] },
  messages: [{
    sender: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
  }]
});
```

### F. Document Schema (Merath Docs)
Stores generated legal drafts.

```javascript
const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { 
    type: String, 
    enum: ['partition_agreement', 'poa_draft', 'heir_inventory'] 
  },
  status: { type: String, enum: ['draft', 'purchased'], default: 'draft' },
  formData: { type: Object }, // Stores dynamic names/IDs
  price: { type: Number, default: 200 },
  isDisclaimerAccepted: { type: Boolean, required: true },
  generatedUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});
```

## 5. Technology Stack
This project utilizes the MERN stack:

* **MongoDB (Atlas):** Database
* **Express.js:** Backend Framework
* **React.js (Vite):** Frontend Framework
* **Node.js:** Runtime Environment