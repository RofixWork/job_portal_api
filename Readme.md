# Jobify API Documentation

Welcome to the Jobify API! This API provides a comprehensive set of endpoints for managing job postings, user authentication, and user profiles within the Jobify platform. Below is an overview of the available endpoints and their functionalities.

## Base URL

```
https://job-portal-api-bice.vercel.app/
```

## Endpoints

### Authentication

- **Register a New User**

  - **Endpoint:** `POST /auth/register`
  - **Description:** Create a new user account.
  - **Request Body:**
    ```json
    {
      "name": "John",
      "email": "john@example.com",
      "password": "yourpassword",
      "lastName": "Doe",
      "location": "City"
    }
    ```

- **User Login**

  - **Endpoint:** `POST /auth/login`
  - **Description:** Authenticate an existing user and retrieve a token.
  - **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```

- **User Logout**

  - **Endpoint:** `GET /auth/logout`
  - **Description:** Log out the current user.

### User Management

- **Get Current User**

  - **Endpoint:** `GET /user/current-user`
  - **Description:** Retrieve details of the authenticated user.

- **Update User Profile**

  - **Endpoint:** `PATCH /user/update-user`
  - **Description:** Update the profile information of the authenticated user.
  - **Request Body:**
    ```json
    {
      "name": "John",
      "email": "john@example.com",
      "lastName": "Doe",
      "location": "New City"
    }
    ```

- **Application Statistics**

  - **Endpoint:** `GET /user/admin/app-stats`
  - **Description:** Retrieve application statistics. *(Admin access required)*

### Job Management

- **Get All Jobs**

  - **Endpoint:** `GET /jobs`
  - **Description:** Retrieve a list of all job postings.

- **Create a New Job**

  - **Endpoint:** `POST /jobs`
  - **Description:** Create a new job posting.
  - **Request Body:**
    ```json
    {
      "company": "Company Name",
      "position": "Job Position",
      "jobLocation": "City",
      "jobType": "full-time", // Options: 'full-time', 'part-time', 'remote', 'internship'
      "jobStatus": "pending"  // Options: 'pending', 'interview', 'declined', 'accepted'
    }
    ```

- **Get Single Job**

  - **Endpoint:** `GET /jobs/{id}`
  - **Description:** Retrieve details of a specific job posting by its ID.

- **Update Job**

  - **Endpoint:** `PATCH /jobs/{id}`
  - **Description:** Update details of an existing job posting.
  - **Request Body:**
    ```json
    {
      "company": "Updated Company Name",
      "position": "Updated Job Position",
      "jobLocation": "New City",
      "jobType": "part-time", // Options: 'full-time', 'part-time', 'remote', 'internship'
      "jobStatus": "interview" // Options: 'pending', 'interview', 'declined', 'accepted'
    }
    ```

- **Delete Job**

  - **Endpoint:** `DELETE /jobs/{id}`
  - **Description:** Delete a job posting by its ID.

## Notes

- Ensure that all requests requiring authentication include the appropriate authentication headers.
- Replace `{id}` in the endpoints with the actual ID of the job or resource you intend to access or modify.
- The API responses will typically include status codes and messages indicating the success or failure of the requests.

For more detailed information and to test the endpoints interactively, please refer to the [Jobify API Documentation](https://job-portal-api-bice.vercel.app/).