This project was my onboarding project during my internship at Interactive Things Zurich.

# Getting Started

To get started with this repository, follow these steps:

1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone git@github.com:...
```
2. Change the directory to the project folder

3. Install Dependencies

Run the following command to install the project dependencies:

```bash
# You need to have yarn installed
yarn install
```

4. Start the Development Server

To start the Next.js development server, run:

```bash
yarn dev
```

This will start the development server, and you can access your application at http://localhost:3000.


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
