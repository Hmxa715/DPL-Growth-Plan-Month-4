// 1. Print "Hello Deno"
console.log("Hello from Deno!");

// 2. Read a local file (example.txt in the same directory)
const decoder = new TextDecoder("utf-8");
try {
  const data = await Deno.readFile("example.txt");
  console.log("\n File contents:");
  console.log(decoder.decode(data));
} catch (err) {
  console.error("Failed to read file:", err.message);
}

// 3. Fetch data from a public API
try {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todo = await response.json();
  console.log("\n Fetched Todo:");
  console.log(todo);
} catch (err) {
  console.error("Fetch error:", err.message);
}

/*
How to run this Deno script:

1. Create a file named 'example.txt' in the same directory with some text content.
2. Use the following command in your terminal (make sure Deno is installed):

   deno run --allow-read --allow-net deno-intro.ts

   --allow-read : allows reading local files
   --allow-net  : allows making network requests

Difference between Deno and Node.js:

- Deno is secure by default: it requires explicit permission flags for file, network, and environment access.
- Deno uses direct URL imports instead of package managers like npm. You import modules from URLs.
- Deno includes built-in tools like a test runner, formatter, and linter — no config or setup needed.
*/

export {};
