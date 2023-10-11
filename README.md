# PulseEvents

This is a full-stack web application for managing events. The application is built using Spring Boot, Spring Security, React, Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Features
- Secure authentication using Spring Security and JWT Authentication (JSON Web Tokens).
- Role-based authorization for different user roles (e.g., admin, user, mod).
- Input validation to ensure data integrity and security.
- Dockerized for easy deployment and development.

## Technologies Used

- **Spring Boot**: Provides the backend structure and RESTful API endpoints.
- **Next.js**: A React framework for building the frontend.
- **TypeScript**: Ensures type safety throughout the application.
- **Tailwind CSS**: Utility-first CSS framework for styling the UI.
- **React**: Library for building the user interface.
- **MongoDB**: NoSQL database for storing event information.

## Prerequisites

- Node.js and npm installed
- Java Development Kit (JDK)
- MongoDB installed and running locally

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/events-application.git
    ```

2. **Backend Setup:**

   - Navigate to the `backend` directory:

     ```bash
     cd backend
     ```

   - Install dependencies:

     ```bash
     mvn install
     ```

   - Start the Spring Boot application:

     ```bash
     mvn spring-boot:run
     ```

3. **Frontend Setup:**

   - Navigate to the `frontend` directory:

     ```bash
     cd frontend
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the Next.js application:

     ```bash
     npm run dev
     ```

4. **MongoDB Setup:**

   - Ensure that MongoDB is running locally on the default port (27017).

5. **Access the Application:**

   - Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Usage

- Navigate to the application and start managing your events!

## Contributing

Feel free to contribute to this project. Please open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
