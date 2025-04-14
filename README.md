# VaultKey 🔑

VaultKey is a secure password management application designed to empower users in managing their passwords with confidence and ease. In an age where digital security is paramount, VaultKey combines elegant encryption with an intuitive user interface, ensuring that your sensitive data remains protected and easily accessible.

## Table of Contents 📚

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#️tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Dexie](#dexie)
- [Security and Privacy](#security-and-privacy)

## 🌟Overview

In today's digital landscape, managing multiple passwords can be overwhelming. VaultKey addresses this challenge by providing a user-friendly platform that not only stores passwords securely but also enhances user experience through features like password generation, organization, and easy access. The application is built with a focus on security, ensuring that users can trust VaultKey with their most sensitive information.

VaultKey is designed for both individuals and teams, offering features that cater to a wide range of users. Whether you're a casual user looking to manage personal passwords or a business needing to secure sensitive information, VaultKey provides the tools necessary to keep your data safe.

## 🌈Features

- **Zero-Knowledge Security**: Your data is encrypted with AES-256 before leaving your device. Only you have the key, ensuring that no one else can access your passwords.
- **Master Password Protection**: One master password unlocks your vault, ensuring that your master key never leaves your device. This adds an extra layer of security.
- **Password Generator**: Create strong, unique passwords with customizable options, helping you avoid weak or reused passwords.
- **Smart Organization**: Categorize passwords, add notes, and quickly find what you need with powerful search and filtering options, making password management efficient.
- **Client-Side Encryption**: All passwords are encrypted on your device before storage, ensuring that your data remains private and secure.
- **Passwordless Authentication**: Secure sign-in via magic links sent to your email, eliminating the need to remember multiple passwords.

## 🛠️Tech Stack

VaultKey is built using a modern tech stack that ensures performance, security, and scalability:

- **Frontend**:

  - **React**: A JavaScript library for building user interfaces, allowing for a dynamic and responsive user experience.
  - **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.
  - **Tailwind CSS**: A utility-first CSS framework that enables rapid UI development with a focus on customization and responsiveness.

- **Storage**:

  - **Dexie.js**: A wrapper for IndexedDB that simplifies local storage management, allowing for efficient data handling and querying.

- **Animation**:

  - **Framer Motion**: A library for creating smooth animations and transitions, enhancing the overall user experience.

- **Routing**:
  - **React Router**: A library for managing navigation and routing within the application, providing a seamless experience as users move between different sections.

## 🚀Getting Started

To get started with VaultKey, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/dcs-soni/vault-key.git
   cd vault-key
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Run the Development Server**:

   ```bash
   pnpm run dev
   ```

4. **Access the Application**: Open your browser and navigate to `http://localhost:3000` (or the specified port) to start using VaultKey.

## 📝Usage

Once the application is running, you can create an account or log in using a magic link sent to your email. After logging in, you can set up your master password and start managing your passwords securely. The intuitive interface allows you to easily add, edit, and organize your passwords, ensuring that you can access them whenever you need.

## 📚Dexie

VaultKey utilizes **[Dexie.js](https://dexie.org/)**, a powerful wrapper for IndexedDB, to provide a simple and efficient way to manage local storage. Dexie allows for:

- **Easy CRUD Operations**: Perform create, read, update, and delete operations on your data with a straightforward API.
- **IndexedDB Support**: Leverage the power of IndexedDB for storing large amounts of structured data securely.
- **Querying**: Use a powerful query language to retrieve data efficiently, making it easy to find the information you need.

By using Dexie, VaultKey ensures that all user data is stored securely on the client side, providing a seamless experience without compromising security.

## 🔒Security and Privacy

At VaultKey, we prioritize your security and privacy above all else. We understand that in today's digital world, protecting your sensitive information is crucial. Here are some key points about our commitment to security:

- **End-to-End Encryption**: Your data is encrypted on your device before it ever leaves, ensuring that only you have access to your passwords.
- **No Data Collection**: We do not collect or store any of your personal data. Your passwords and sensitive information remain solely on your device.
- **User Control**: You have complete control over your data. With features like master password protection and passwordless authentication, you can manage your security settings according to your preferences.

By choosing VaultKey, you are taking a proactive step towards safeguarding your digital life.
