# Intern Labs Repository

Welcome to the Intern Labs Repository! This repository is designed to help interns get started with building Next.js applications.
Each intern will have their own folder within the pages structure to work on their projects
Here's an overview of the repository structure and instructions on how to get started.

## Repository Structure

```
intern-labs/
├── README.md
├── next-env.d.ts
├── next.config.js
├── package.json
├── public/
│ ├── favicon.ico
│ ├── next.svg
│ └── vercel.svg
├── src/
│ ├── components/
│ │ └── SpiralCircles.tsx
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ ├── api/
│ │ │ └── hello.ts
│ │ └── <intern-folder>/ # Each intern has their own folder
│ │ │ └──index.tsx
│ │ ├── index.tsx
│ │ └── styles.module.css
│ └── styles/
│ ├── Home.module.css
│ └── globals.css
├── tsconfig.json
└── yarn.lock
```

# Getting Started

To get started with this repository, follow these steps:

1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone git@github.com:interactivethings/intern-labs.git
```
2. Change the directory to the 'intern-labs' folder

```bash
cd intern-labs
```

4. Install Dependencies

Run the following command to install the project dependencies:

```bash
# You need to have yarn installed
yarn install
```

3. Start the Development Server

To start the Next.js development server, run:

```bash
yarn dev
```

4. Navigate to Your Intern Folder

Each intern should navigate to their own folder within the pages directory. For example, if your project name is "schauspielhaus", make edits in
the `pages/schauspielhaus` directory.

This will start the development server, and you can access your application at http://localhost:3000.

5. Begin Your Internship Project

You are now ready to begin working on your internship project within your dedicated folder. You can create pages, components, and styles as needed for your project.

# Deploy

Git is used as source control management and the repository is connected to Vercel. Vercel is the platform we use to deploy sites.

- When pushing to the `main` branch, a deploy will automatically start and you can follow it on Vercel.
- When pushing to a branch, a preview deploy will automatically start

```bash
# Useful git commands
git add <file>
git add -u # Stage all changes
git commit -m "feat: Added spirals" # Commit changes
git push # Push changes to GitHub
```
