# Avoma - Take Home Assignment (Frontend)

## Overview

This application is built with React, Vite, React Router DOM, TailwindCSS, and React Query. This project displays a list of posts fetched from a public API (https://jsonplaceholder.typicode.com/posts). It also allows to search for a particular post by name using client side filtering. Users can also view the comments for each post by clicking on the post link.

## Features

- **Posts List**: Display title, and description of each post
- **Post Details**: Clicking on a post title navigates to the post details
- **Comments**: Comments are displayed with email and body in post details page.
- **Client-Side Filtering**: Allows users to filter posts by name.
- **Back Button**: Navigate back to the posts list from the post details page.
- **No Data Refetch**: Data is cached to prevent refetching

## Technologies Used

- **React**
- **Vite**
- **React Router DOM**
- **TailwindCSS**
- **React Query**
- **TypeScript**

## Setup Instructions

### Clone the Repository

```bash
git clone git@github.com:mehtab39/avoma-fe-assignment.git
cd avoma-fe-assignment
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application will be running on [http://localhost:5173](http://localhost:5173).

### Build the Application

To create a production build of the application, run:

```bash
npm run build
```

## Design Decisions

- **Vite**: Vite provides a fast development experience with its efficient bundling.
- **React Router DOM**: Used for handling routing and navigation within the application.
- **TailwindCSS**: Used for styling. Tailwind allows rapid and consistent design.
- **React Query**: For data fetching and caching to manage server state efficiently.
- **TypeScript**: Provides type safety and improves code quality.
- **withQuery HOC**: Created to abstract data fetching logic, handle loading and error states and remove duplicacy from the codebase.

