# Milestone 0: The Plan

## Project Concept: Mawareth (Inheritance & Estate Management)
**Mawareth** is a comprehensive Fin-Tech platform designed to simplify and digitize the complex process of inheritance distribution. It empowers heirs to manage estates, vote on asset distribution, trade inherited assets in a specialized marketplace, and access financial buyouts for quick liquidity.

[Link to Fin-Tech Course Project Document] (Placeholder)

## Features & Use Cases
We have identified the following core use cases. The **System Architecture & Administration** and **Authentication** have been combined to create a consolidated "Lead" workload.

1.  **User Authentication & System Administration (Heavy Load)**
    -   *Authentication*: Secure Registration, Login, JWT handling, Password Encryption.
    -   *Authorization*: Role-based access control (Heir vs Admin vs Agent) and protected routes.
    -   *Admin Dashboard*: A centralized view for system administrators to oversee all users, estates, and system activity.
    -   *Profile Management*: Comprehensive user profile editing and verification status.
2.  **Estate Management & Consensus**
    -   Create digital estates for deceased individuals.
    -   Add heirs and assets to estates.
    -   Voting system for heirs to agree on asset distribution (Accept/Reject).
3.  **Solh Marketplace**
    -   List distressed or disputed assets for sale.
    -   External buyers (or other heirs) can view and bid on assets.
    -   "Unlock" listing details feature.
4.  **Buyout Applications (Finance)**
    -   Heirs can apply for immediate cash buyouts of their shares.
    -   Financial agents review and update application status.
5.  **AI Legal Assistant (Chatbot)**
    -   Interactive chat interface for legal and financial queries.
    -   Context-aware assistance for navigating the inheritance process.


7.  **Merath Docs (Automated Legal Document Generator)**
    
    **1. Overview**
    "Merath Docs" is a specialized LegalTech service designed to streamline the bureaucratic bottlenecks of inheritance. It functions as a "Digital Typist," allowing heirs to instantly generate standardized, Sharia-compliant legal drafts (Muswada) for a nominal fee (e.g., 200 EGP).
    This feature solves the "Notary Bottleneck" (Shahr 3qary), where heirs often face delays due to the lack of properly formatted preliminary contracts. By automating the drafting process, Merath accelerates the path to liquidity while generating a high-margin revenue stream for the platform.

    **2. Core Functionality**
    *   **Template Engine**: A logic-based system that merges user data (names, national IDs, asset descriptions) into legally verified standard templates.
    *   **Document Types (Standard Scope)**:
        *   **Partition Agreement (Aqd Qisma)**: A standard contract for the agreed division of assets.
        *   **Power of Attorney Draft (Seghat Tawkeel)**: Precise text for authorizing a lawyer at the Notary Public.
        *   **Inheritance Declaration (E3lam Weratha)**: A structured list of heirs and shares for court filing.
    *   **Paywall & Delivery**: Users can preview a watermarked version of the document but must pay to unlock and download the clean, high-resolution PDF.
    *   **QR Verification**: Each generated document includes a unique QR code for authenticity verification.

    **3. Legal Safety Architecture (Risk Mitigation)**
    To ensure compliance with Egyptian law regarding the "Unauthorized Practice of Law," this feature implements three strict guardrails:
    *   **The "Draft" Disclaimer**: All documents are explicitly labeled as "Preliminary Drafts" (Muswada). The system requires users to tick a mandatory checkbox acknowledging that Merath provides administrative support, not legal counsel.
    *   **Watermarking**: Pre-purchase previews are overlaid with a diagonal "DRAFT / مسودة" watermark to prevent unauthorized use.
    *   **Limited Scope**: The system strictly avoids custom legal advice. It only populates "Standard Form" contracts widely accepted by Egyptian Notaries.

    **4. Technical Implementation**

    **A. Database Schema (Mongoose)**
    ```javascript
    /**
     * DocumentSchema
     * Stores the state of generated legal drafts and payment status.
     */
    const DocumentSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      
      // The specific type of legal document
      type: { 
        type: String, 
        enum: ['partition_agreement', 'poa_draft', 'heir_inventory'], 
        required: true 
      },
      
      // Payment and Generation Status
      status: { 
        type: String, 
        enum: ['draft', 'purchased', 'expired'], 
        default: 'draft' 
      },
      
      // JSON object storing the specific fields filled by the user
      // Structure varies by document type (see below)
      formData: { type: Object, required: true },
      
      price: { type: Number, default: 200 },
      
      // Proof of disclaimer acceptance (CRITICAL for liability)
      isDisclaimerAccepted: { type: Boolean, required: true },
      
      generatedUrl: { type: String }, // S3 Link to the final PDF
      createdAt: { type: Date, default: Date.now }
    });
    ```

    **B. Data Structure (JSON Payload Example: Partition Agreement)**
    This structure is used by the frontend to capture user input before generating the PDF.
    ```json
    {
      "contractDate": "2025-12-15",
      "governorate": "Cairo",
      "deceasedDetails": {
        "name": "Ahmed Mohamed Ali",
        "deathDate": "2024-01-10",
        "inheritanceOrderNumber": "1234/2024"
      },
      "parties": [
        {
          "role": "First Party",
          "name": "Mohamed Ahmed",
          "nationalId": "29001011234567",
          "address": "15 Tahrir St, Cairo",
          "sharePercentage": 0.50
        },
        {
          "role": "Second Party",
          "name": "Sara Ahmed",
          "nationalId": "29205051234567",
          "address": "15 Tahrir St, Cairo",
          "sharePercentage": 0.25
        }
      ],
      "agreedDivision": [
        {
          "partyName": "Mohamed Ahmed",
          "assetReceived": "The entire apartment (Unit 5, Bldg 10, Nasr City)"
        },
        {
          "partyName": "Sara Ahmed",
          "assetReceived": "Cash payout of 1,000,000 EGP"
        }
      ]
    }
    ```

    **5. User Flow**
    *   **Selection**: User selects "Create Partition Agreement" from the Merath Docs dashboard.
    *   **Input**: User completes a multi-step form wizard (Heir Details -> Asset Details -> Division Logic).
    *   **Preview**: System generates a watermarked PDF for review.
    *   **Disclaimer**: User must check: "I understand this is a standard draft and not a substitute for a lawyer."
    *   **Payment**: User completes the transaction (simulated or Stripe).
    *   **Download**: The "DRAFT" watermark is removed, and the final PDF is downloaded.

## Data Modeling (Mongoose Schemas)

### User (Auth & Admin)
-   `name`, `email`, `password`, `role` (heir/admin/agent), `phone`, `isVerified`, `adminNotes`.

### Estate
-   `deceasedName`, `assets` (Array of objects), `heirs` (Array of users + shares), `status` (Pending/Distributed), `consensus` (Voting tracking).

### MarketplaceListing
-   `title`, `description`, `price`, `type` (Real Estate/Gold/etc), `estateId`, `status`.

### BuyoutApplication
-   `applicantId`, `estateId`, `sharePercentage`, `requestedAmount`, `status` (Pending/Approved/Rejected).

### Chat
-   `participants` (Array of User IDs), `messages` (Array of content + timestamp), `type` (AI/Support).

## Team Formation & Accountability
**Team Size:** 7 Members

| Student Name | ID | Assigned Use Case / Responsibility | Workload Note |
| :--- | :--- | :--- | :--- |
| **[Mohammed Waleed(Lead)]** | [ID] | **Authentication, Security** | **High:** Registration, Login, JWT, Password Security. |
| **[Omar Ehab]** | [ID] | **Estate Management** | Standard: Core estate CRUD and voting logic. |
| **[Mariam Ahmed]** | [ID] | **AI Legal Assistant** | Standard: Chatbot integration and message persistence. |
| **[Mostafa 3arram]** | [ID] | **Buyout Applications** | Standard: Financial application workflow. |
| **[Ali Safwat]** | [ID] | **Solh Marketplace** | Standard: Listing and bidding functionality. |
| **[Salma Momtaz]** | [ID] | **Admin/Finance Dashboard** | Standard: System overview, user management, and logs. |
| **[Mohammed Omar (Docs Lead)]** | [ID] | **Merath Docs Feature** | Standard: Document generation engine and forms. |
