# TechNest Platform

Welcome to **TechNest**, a cutting-edge platform designed for tech enthusiasts to share, discover, and engage with articles on a wide range of technology topics. Whether you're a reader, writer, or admin, TechNest provides a seamless and intuitive experience tailored to your needs.

---

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
   - [User Management](#user-management)
   - [Topic Management](#topic-management)
   - [Article Submission and Approval](#article-submission-and-approval)
   - [Article Interaction](#article-interaction)
   - [Admin Management](#admin-management)
   - [Content Organization and Display](#content-organization-and-display)
   - [User Engagement and Community Building](#user-engagement-and-community-building)
3. [Non-Functional Requirements](#non-functional-requirements)
   - [Performance](#performance-requirements)
   - [Scalability](#scalability-requirements)
   - [Reliability and Availability](#reliability-and-availability)
   - [Usability](#usability-requirements)
   - [Security](#security-requirements)
   - [Content Management and Quality Assurance](#content-management-and-quality-assurance)
   - [Compatibility](#compatibility-requirements)
   - [Maintainability](#maintainability-requirements)
   - [Legal and Compliance](#legal-and-compliance-requirements)
4. [Our Team](#our-team)
5. [Contributing](#contributing)
6. [Video Demo and Documentation](#video-demo-and-documentation)
7. [Account For Testing](#account-for-testing)
---

## Introduction

TechNest is a platform that works with AI where users can read, write, and interact with articles on various technology topics. Users can personalize their feed based on topics they follow, also they can write their own articles or share outsourced ones! 

**During adding the article our AI model can predict the most relevant topic for that article based on the content**

---

## Features

### User Management
- **Registration**: Users can register by providing their full name, email, password, and profile picture.
- **Profile Editing**: Users can edit their profile information after registration.
- **Guest Access**: Unsigned users can view articles but cannot interact with them (e.g., like, comment, save).

### Topic Management
- **Follow/Unfollow Topics**: Users can follow or unfollow topics of interest.
- **Personalized Feed**: The system displays articles based on followed topics. If no topics are followed, the latest articles from all topics are shown randomly.

### Article Submission and Approval
- **Submit Articles**: Users can submit articles they write, which remain in a "pending" status until approved or declined by an admin.
- **Declined Articles**: If an article is declined, the system provides a reason for disapproval.
- **Delete Articles**: Users can delete their articles, regardless of approval status.
- **External Articles**: Users can submit external articles by adding a link and a thumbnail.
- **Topic Prediction**: The system suggests the most relevant topic for an article's content during submission. Users can override the suggestion and select a different topic.

### Article Interaction
- **Engagement Tools**: Users can like, comment on, save, and un-save articles.
- **View Comments**: Users can view all comments on any published article.
- **Publisher Info**: Users can view the publisher's name, email, and other articles.

### Admin Management
- **Topic Management**: Admins can add or remove topics available on the platform.
- **Article Review**: Admins can review pending articles, read their content, and approve or disapprove them.
- **Disapproval Feedback**: Admins must provide a reason when disapproving an article.
- **Role-Based Access**: Admin pages are restricted to admin accounts, and user pages are restricted to user accounts.

### Content Organization and Display
- **Relevance-Based Display**: Articles are displayed based on relevance to followed topics or randomly for users without preferences.
- **Comprehensive Topics**: The platform supports a wide range of tech topics to ensure diverse and inclusive content coverage.

### User Engagement and Community Building
- **Engagement Tools**: The platform provides tools for linking, commenting, bookmarking, and sharing articles.
- **Personalized Feed**: Users have a personalized feed tailored to their followed topics and recent interactions.

---

## Non-Functional Requirements

### Performance Requirements
- The system ensures a response time of less than 2 seconds for loading the homepage and navigating between major pages under normal load conditions.
- The platform supports up to 1,000 concurrent users with no degradation in performance.
- Topic predictions and results are displayed within at most 2 seconds during the "Write Article" process.

### Scalability Requirements
- The platform is scalable to accommodate a growing user base and an increasing volume of articles, comments, and interactions.
- The system allows seamless integration with third-party content aggregation APIs for future expansion.

### Reliability and Availability
- The platform has 99.9% uptime to ensure uninterrupted access to content.
- A robust backup and recovery mechanism is in place to prevent data loss in case of server failures.

### Usability Requirements
- The platform interface is intuitive and user-friendly, ensuring that users with basic technical knowledge can navigate and interact with the system.
- The system supports accessibility standards (e.g., WCAG 2.1) to ensure usability for individuals with disabilities.

### Security Requirements
- The system enforces user authentication to prevent unauthorized access to user and admin accounts.
- User passwords are stored using secure hashing techniques (e.g., bcrypt).
- The platform uses HTTPS for all communications to ensure data security during transmission.
- Admin-specific pages are restricted to admin accounts through role-based access control (RBAC).

### Content Management and Quality Assurance
- All content is moderated within 24 hours of submission to maintain quality and relevance.
- Admin actions (e.g., article approvals/disapprovals) are logged for auditing purposes.

### Compatibility Requirements
- The platform supports all major browsers (e.g., Chrome, Firefox, Edge, Safari) and maintains responsiveness across devices (desktop, tablet, mobile).
- The system provides a mobile-optimized user experience without requiring a dedicated app.

### Maintainability Requirements
- The platform codebase follows best practices and includes comprehensive documentation to facilitate future updates and debugging.
- The system supports modular design to allow easy addition or modification of features without impacting existing functionality.

### Legal and Compliance Requirements
- The system complies with GDPR and other relevant data privacy laws to ensure user data protection and consent.


---

## Our Team

We are team of 5 students
- Osama Eid - Frontend - Backend - Team Leader
- Mazen Essam - Frontend
- Ali Samy - AI
- Ayman Mostafa - Backend

---

## Contributing

We welcome contributions from the community! To contribute to TechNest, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to the branch.
4. Submit a pull request with a detailed description of your changes.

---

## Video Demo and Documentation

- For video demo that explain how it does works: [Video](https://drive.google.com/file/d/1dS2h3ItADJehGYYz9Q4smo0Gz3Vy440a/view?usp=sharing)
- For more details and snapshots for challenges that we have faced: [Documentation](https://drive.google.com/file/d/1fvap41Gg9P5I3hK_8bNz9ZCyGU_uSKbc/view?usp=sharing)

---

## Account For Testing

- For USER account you can test with:
- Email: test2@gmail.com
- Password: 0000

---

Thank you for using TechNest! We hope you enjoy your experience on the platform. For any questions or feedback, please reach out to us at [Osama Eid](mailto:osamaeid0101@gmail.com). 🚀