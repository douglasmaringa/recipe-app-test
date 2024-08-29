# Recipe App

This is a React application for browsing, searching, and saving recipes. It uses Redux Toolkit for state management, and Tailwind CSS for styling.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Clone the Repository

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/douglasmaringa/recipe-app-test
   ```

2. Navigate into the project directory:

   ```bash
   cd recipe-app-test
   ```

### Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### Configure Environment Variables

There is no need to configure `REACT_APP_API_KEY` for this project.

### Run the Application

Start the development server:

```bash
npm run dev
```

This will start the development server and open the application in your default web browser. If it does not open automatically, you can navigate to ` http://localhost:5173/` in your browser.

### Folder Structure

- **src/components**: Contains reusable components.
- **src/redux**: Contains Redux slices and configuration.
- **src/pages**: Contains page components.
- **src/styles**: Contains Tailwind CSS configuration and global styles.

### Usage

- **Home Page**: View and search recipes. Pagination is supported.
- **Recipe Details Page**: View detailed information about a specific recipe. You can add or remove recipes from your favorites.
- **Favorite Recipes Page**: View your favorite recipes and remove them if needed.


### License

This project is licensed under the MIT License.
