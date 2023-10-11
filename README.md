![image](https://github.com/hackerdud3/PulseEvents/assets/28582589/c9c33926-0392-4d7a-81fc-df00783d7764)
# PulseEvents

This is a full-stack web application for managing events. The application is built using Spring Boot, Spring Security, React, Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Technologies Used
- **Spring Boot🚀**: Developed the backend structure and RESTful API endpoints.
- **Java🚀**: Employed Java for core application logic and backend development in conjunction with the Spring Boot framework.
- **Spring Security🚀**: Configured spring security and implemented JWT authentication.
- **Next.js🚀**: Used React Framework for building the frontend.
- **TypeScript🚀**: Ensures type safety throughout the application.
- **Tailwind CSS🚀**: Utility-first CSS framework for styling the UI.
- **React🚀**: Library for building the user interface.
- **Redux🚀**: For managing global state, allowing centralized control of the application state, efficiency, and scalability within the react application.
- **MongoDB🚀**: NoSQL database for storing user, role, and event information.
- **Docker🚀**: Dockerized for easy deployment and development.
- **Vercel🚀**: For deployment
- **Components🚀**: tremor

## Features
- Secure authentication using Spring Security and JWT Authentication (JSON Web Tokens).
- Role-based authorization for different user roles (e.g., admin, user, mod).
- Input validation to ensure data integrity and security.
- Implemented Login/Signup components, protected routes, and context-based authentication on the frontend.
- Moderators can create new events with details like event name, venue, date, time, etc and also edit the events.
- Users can view the events and click on the interested button if they are interested.
- The events that are expired are not displayed.
- The total number of users interested, Event name, Venue, Date, and time are displayed in the event context along with the image.
- Docker for containerization, ensuring consistent and efficient deployment of applications across various environments



## Prerequisites

- Node.js and npm installed
- Java Development Kit (JDK)
- MongoDB Cloud Cluster with Amazon Web Services Cloud provider, connected and configured to spring application 

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

4. **Access the Application:**

   - Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Usage

- Navigate to the application and start managing your events!

## Contributing

Feel free to contribute to this project. Please open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
