
**1. Retrieve all tasks assigned to a specific user**
```js
db.tasks.find({ UserId: "U123" })
```

**2. Count tasks based on status**
```js
db.tasks.aggregate([
  { $group: { _id: "$Status", count: { $sum: 1 } } }
])
```

**3. Find users with more than 5 tasks assigned**
```js
db.tasks.aggregate([
  { $group: { _id: "$UserId", taskCount: { $sum: 1 } } },
  { $match: { taskCount: { $gt: 5 } } }
])
```

**4. Retrieve completed tasks**
```js
db.tasks.find({ Status: "Completed" })
```

**5. Find overdue tasks**
```js
db.tasks.find({
  DueDate: { $lt: new Date() },
  Status: { $ne: "Completed" }
})
```

---

## Task 4: JavaScript & React Assessment

**1. Difference between `let`, `const`, and `var`**

| Feature | var | let | const |
|---|---|---|---|
| Scope | Function-scoped | Block-scoped | Block-scoped |
| Hoisting | Hoisted and initialized with `undefined` | Hoisted but not initialized (Temporal Dead Zone) | Hoisted but not initialized (Temporal Dead Zone) |
| Reassignment | Can be reassigned | Can be reassigned | Cannot be reassigned |
| Redeclaration | Can be redeclared in same scope | Cannot be redeclared in same scope | Cannot be redeclared in same scope |
| Global property | Creates property on `window` | Does not create property on `window` | Does not create property on `window` |

**2. What are React Hooks?**

React hooks are built-in functions that allow us to use React features in functional components, removing the need for class components. They enable state management and lifecycle features in functional components.

**3. Explain `useState` and `useEffect`**

`useState`:
- Used to store and update data in functional components
- Returns an array with two elements: current state value and a function to update it
- Syntax: `const [state, setState] = useState(initialValue)`

`useEffect`:
- Used for side effects like API calls, timers, and DOM manipulation
- Runs after the component renders
- Can include a dependency array to control when it re-runs
- Can return a cleanup function to prevent memory leaks

**4. What is Virtual DOM?**

Virtual DOM is a lightweight copy of the Real DOM. When data changes, React creates a new Virtual DOM, compares it with the previous one (a process called "diffing"), and updates only the changed parts of the Real DOM. This makes updates more efficient and improves performance.

**5. Difference between Props and State**

| Feature | Props | State |
|---|---|---|
| Mutability | Immutable (read-only) | Mutable |
| Ownership | Passed from parent component | Managed within the component |
| Purpose | To pass data from parent to child | To manage component's own data |
| Update | Updated by parent component | Updated using `setState` or `useState` |
| Re-render | Child re-renders when props change | Component re-renders when state changes |

**6. What is React Router and why is it used?**

React Router is a library for handling navigation and routing in React applications. It is used to:
- Create multi-page experiences within a single-page application
- Enable navigation between different components/views without page refresh
- Handle URL parameters and query strings
- Support nested routes and dynamic routing
- Manage browser history and deep linking

**7. Explain Event Loop in JavaScript**

The Event Loop is a mechanism that handles asynchronous operations in JavaScript. It works by:
- Executing synchronous code first (Call Stack)
- Moving asynchronous tasks (like `setTimeout`, API calls) to Web APIs
- Once asynchronous tasks complete, their callbacks go to the Task Queue (Callback Queue)
- The Event Loop continuously checks if the Call Stack is empty
- If empty, it moves callbacks from the Queue to the Stack for execution
- This process repeats, allowing non-blocking asynchronous execution

**8. What are Promises and Async/Await?**

Promises:
- Objects representing the eventual completion or failure of an asynchronous operation
- Have three states: Pending, Fulfilled, Rejected
- Use `.then()`, `.catch()`, and `.finally()` for handling results
- Example: `fetch('api/data').then(response => response.json())`

Async/Await:
- Syntactic sugar built on top of Promises for cleaner async code
- `async` declares a function that returns a Promise
- `await` pauses execution until the Promise resolves
- Makes asynchronous code look more like synchronous code

---

## Task 5: Node.js & API Concepts

**1. What is Express.js?**

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It offers:
- Simple routing mechanisms
- Middleware support for handling requests
- Utilities for building REST APIs quickly
- Template engine integration
- Easy integration with databases

**2. What is Middleware in Node.js?**

Middleware are functions that have access to the request object (`req`), response object (`res`), and the next middleware function (`next()`) in the application's request-response cycle. They execute sequentially and can:
- Execute any code
- Make changes to the request and response objects
- End the request-response cycle
- Call the next middleware in the stack

Common uses: Logging, authentication, parsing request bodies, error handling, and CORS configuration.

**3. Explain REST API principles**

REST (Representational State Transfer) API principles include:
- **Statelessness:** Each request from client to server must contain all necessary information; the server doesn't store client state
- **Client-Server Separation:** Client and server are independent and evolve separately
- **Resource-Based:** Resources are identified by URLs (e.g., `/users`, `/products/123`)
- **HTTP Methods used semantically:**
  - `GET` - Retrieve data
  - `POST` - Create data
  - `PUT`/`PATCH` - Update data
  - `DELETE` - Remove data
- **Uniform Interface:** Consistent response formats (e.g., JSON)
- **Cacheable:** Responses should indicate cacheability

**4. Difference between Authentication and Authorization**

| Feature | Authentication | Authorization |
|---|---|---|
| Purpose | Verifies identity (Who are you?) | Determines permissions (What can you do?) |
| Process | Validates credentials (username/password, tokens) | Checks permissions/roles |
| Timing | Happens first | Happens after authentication |
| Example | Logging in with email and password | Admin can delete users; regular users can't |

**5. What are HTTP Status Codes?**

| Status Code | Category | Meaning |
|---|---|---|
| 200 | Success | OK - Request successful |
| 201 | Success | Created - Resource successfully created |
| 204 | Success | No Content - Request successful but no content returned |
| 400 | Client Error | Bad Request - Invalid request syntax or parameters |
| 401 | Client Error | Unauthorized - Authentication required |
| 403 | Client Error | Forbidden - Authenticated but not authorized |
| 404 | Client Error | Not Found - Resource doesn't exist |
| 500 | Server Error | Internal Server Error - Server-side issue |

**6. What is CORS and how can it be handled?**

CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making requests to a different domain, protocol, or port than the one that served the web page.

Handling CORS in Express:

```js
// Method 1: Using the cors middleware package
const cors = require('cors');
app.use(cors());

// Method 2: Manual configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Method 3: Configuring specific origins
app.use(cors({
  origin: 'https://example.com',
  credentials: true
}));
```

---

## Task 6: Debugging Scenario

**Scenario:** API call succeeds but data isn't displayed on the UI.

**Troubleshooting Approach:**

1. **Check Network Tab**
   - Open browser DevTools → Network tab
   - Confirm the API request fired
   - Inspect the response payload and status code
   - Check for CORS errors

2. **Check Console Tab**
   - Look for JavaScript errors
   - Check for React warnings
   - Verify no silent failures

3. **Log State Updates**
```js
   const [data, setData] = useState(null);
   useEffect(() => {
     fetchData().then(response => {
       console.log('API Response:', response);
       setData(response);
     });
   }, []);
   // Note: state updates are asynchronous, so logging `data` immediately
   // after setData() won't reflect the new value. A separate useEffect
   // watching `data` (e.g. useEffect(() => {...}, [data])) confirms the update.
```

4. **Verify Data Structure**
   - Confirm response structure matches what component expects
   - Example: if expecting `response.data`, don't use `response`
   - Check for nested properties

5. **Check Conditional Rendering**
```js
   // Instead of:
   {data && data.map(item => <Item key={item.id} />)}
   // Verify data is truthy and has correct structure:
   {data?.length > 0 && data.map(item => <Item key={item.id} />)}
```

6. **Check for Missing Keys**
   - Ensure list items have unique `key` props
   - Missing keys can cause rendering issues

7. **Verify API URL**
   - Check environment variables
   - Ensure URL points to correct backend
   - Check for trailing slashes or typos

8. **Check useEffect Dependencies**
```js
   // Missing dependencies can cause stale data
   useEffect(() => {
     fetchData();
   }, []); // Empty array = runs once on mount
```

**Tools Used:**
- Browser DevTools (Network + Console tabs)
- React DevTools (to inspect component state and props)
- Postman/Thunder Client (to test API independently)
- Console.log statements (for debugging state flow)
- ESLint (to catch common React issues)

**Possible Causes:**

| Cause | Solution |
|---|---|
| Silently failed request | Check for uncaught errors in try-catch |
| Response shape mismatch | Adjust component to match actual response structure |
| Incorrect state updates | Verify setState is called correctly |
| Missing/incorrect useEffect dependencies | Add proper dependencies array |
| Faulty conditional rendering | Check rendering logic and conditions |
| Unhandled error response | Add error handling and show error UI |
| CORS issues | Configure CORS on server or use proxy |
| Empty/null data | Add loading/empty state handling |
| Asynchronous timing issues | Use async/await properly or handle promises correctly |
