# Online Code Compiler

This project is an online code compiler built using React.js for the frontend and Express.js for the backend. It allows users to write, compile, and execute code in various programming languages such as Python, Java, C, C++, and JavaScript. The backend uses the Piston API for code execution.

**Authors**: Zhi Zheng, Dylan Anthony McLamb

## Features

- **Code Compilation**: Supports code compilation and execution for Python, Java, C, C++, and JavaScript.
- **Snippet Library**: Provides a library of code snippets for easy access and learning.
- **Security**: Implements rate limiting, enhanced CORS policy, and uses Helmet.js for security headers.
- **Real-Time Output**: Displays the output of the executed code in real-time.
- **Theme Switcher**: Allows users to switch between Day, Night, and Colorblind modes for improved accessibility.

## Libraries and Modules Used

### Backend

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **helmet**: Middleware to secure Express apps by setting various HTTP headers.
- **axios**: Promise-based HTTP client for the browser and Node.js.
- **express-rate-limit**: Basic rate-limiting middleware for Express.

### Frontend

- **react**: A JavaScript library for building user interfaces.
- **@mui/material**: Material-UI, a popular React UI framework.
- **axios**: Promise-based HTTP client for the browser and Node.js.
- **react-dom**: This package serves as the entry point to the DOM and server renderers for React.
- **vite**: Next Generation Frontend Tooling.
- **@uiw/react-codemirror**: A CodeMirror component for React, with multiple language modes and themes.
- **react-router-dom**: Declarative routing for React applications.

## Prerequisites

- Node.js and npm installed.
- Basic knowledge of HTML, CSS, JavaScript, React.js, and Express.js.

## Project Structure

```
.
├── server
│   ├── index.js
│   ├── .env
│   ├── package.json
│   └── ...
├── online-code-compiler
│   └── code-compiler
│       ├── src
│       │   ├── App.jsx
│       │   ├── App.css
│       │   ├── Navbar
│       │   │   ├── Navbar.jsx
│       │   │   ├── Navbar.css
│       │   ├── ThemeSwitcher
│       │   │   ├── ThemeSwitcher.jsx
│       │   │   ├── ThemeSwitcher.css
│       │   ├── snippets
│       │   │   ├── SnippetLibrary.jsx
│       │   │   ├── SnippetLibraryPage.jsx
│       │   │   ├── python.json
│       │   │   ├── java.json
│       │   │   ├── c.json
│       │   │   ├── cpp.json
│       │   │   ├── javascript.json
│       │   ├── index.css
│       │   ├── main.jsx
│       │   └── ...
│       ├── package.json
│       └── ...
```

## API Usage

The backend uses the Piston API for code execution. The request to the Piston API includes the language, code, and input.

### POST /compile

**Request Body**:
```json
{
  "code": "print('Hello, World!')",
  "language": "python",
  "input": ""
}
```

**Response**:
```json
{
  "output": "Hello, World!"
}
```

## Security Features

- **Helmet.js**: Adds security headers to protect the app.
- **Rate Limiting**: Limits the number of requests to prevent abuse.
- **CORS Policy**: Restricts access to the API from specified origins.

## Contributing

Contributions are welcome! Please follow the standard practices for GitHub repositories:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- **Piston API**: For providing the code execution backend.
- **React.js**: For the frontend framework.
- **Express.js**: For the backend framework.
- **GeeksforGeeks**: For educational resources.

Feel free to contribute and enhance this project. Happy coding!
