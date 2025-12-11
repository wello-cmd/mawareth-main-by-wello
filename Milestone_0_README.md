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

## Data Modeling (Mongoose Schemas)

### User (Auth & Admin)
-   `name`, `email`, `password`, `role` (heir/admin/agent), `phone`, `isVerified`, `adminNotes`.

### Estate
-   `deceasedName`, `assets` (Array of objects), `heirs` (Array of users + shares), `status` (Pending/Distributed), `consensus` (Voting tracking).

### MarketplaceListing
-   `title`, `description`, `price`, `type` (Real Estate/Gold/etc), `estateId`, `status`.

### BuyoutApplication
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
**Team Size:** 6 Members

| Student Name | ID | Assigned Use Case / Responsibility | Workload Note |
| :--- | :--- | :--- | :--- |
| **[Mohammed Waleed(Lead)]** | [ID] | **Authentication, Security** | **High:** Registration, Login, JWT, Password Security. |
| **[Omar Ehab]** | [ID] | **Estate Management** | Standard: Core estate CRUD and voting logic. |
| **[Mariam Ahmed]** | [ID] | **AI Legal Assistant** | Standard: Chatbot integration and message persistence. |
| **[Mostafa 3arram]** | [ID] | **Buyout Applications** | Standard: Financial application workflow. |
| **[Ali Safwat]** | [ID] | **Solh Marketplace** | Standard: Listing and bidding functionality. |
| **[Salma Momtaz]** | [ID] | **Admin/Finance Dashboard** | Standard: System overview, user management, and logs. |
