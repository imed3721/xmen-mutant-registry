const http = require("http");

const PORT = process.env.PORT || 8080;

const mutants = [
  {
    name: "Logan",
    codename: "Wolverine",
    power: "Regeneration",
  },
  {
    name: "Ororo Munroe",
    codename: "Storm",
    power: "Weather manipulation",
  },
  {
    name: "Scott Summers",
    codename: "Cyclops",
    power: "Optic blast",
  },
  {
    name: "Jean Grey",
    codename: "Jean Grey",
    power: "Telekinesis",
  },
  {
    name: "Remy LeBeau",
    codename: "Gambit",
    power: "Kinetic energy manipulation",
  },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Health check endpoint
  if (method === "GET" && url === "/healthz") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(JSON.stringify({ status: "healthy" }));
    return;
  }

  // Mutant registry API endpoint
  if (method === "GET" && url === "/mutants") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(JSON.stringify(mutants));
    return;
  }

  // HTML registry homepage
  if (method === "GET" && url === "/") {
    const mutantCards = mutants
      .map(
        (mutant) => `
          <article class="mutant-card">
            <h2>${mutant.codename}</h2>
            <p><strong>Name:</strong> ${mutant.name}</p>
            <p><strong>Power:</strong> ${mutant.power}</p>
          </article>
        `
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>X-Men Mutant Registry</title>
          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 2rem;
              font-family: Arial, sans-serif;
              background: #111827;
              color: #f9fafb;
            }

            main {
              max-width: 1000px;
              margin: 0 auto;
            }

            h1 {
              text-align: center;
              color: #60a5fa;
              margin-bottom: 2rem;
            }

            .mutant-grid {
              display: grid;
              grid-template-columns: repeat(
                auto-fit,
                minmax(240px, 1fr)
              );
              gap: 1rem;
            }

            .mutant-card {
              padding: 1.25rem;
              border: 1px solid #374151;
              border-radius: 12px;
              background: #1f2937;
            }

            .mutant-card h2 {
              margin-top: 0;
              color: #93c5fd;
            }

            .mutant-card p {
              line-height: 1.5;
            }

            footer {
              margin-top: 2rem;
              text-align: center;
              color: #9ca3af;
            }
          </style>
        </head>
        <body>
          <main>
            <h1>🧬 X-Men Mutant Registry</h1>

            <section class="mutant-grid" aria-label="Registered mutants">
              ${mutantCards}
            </section>

            <footer>
              <p>Mutant Registry API · ${mutants.length} registered mutants</p>
            </footer>
          </main>
        </body>
      </html>
    `;

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    res.end(html);
    return;
  }

  // Handle unsupported HTTP methods
  if (!["GET", "HEAD"].includes(method)) {
    res.writeHead(405, {
      "Content-Type": "application/json; charset=utf-8",
      Allow: "GET, HEAD",
    });

    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  // Not found
  res.writeHead(404, {
    "Content-Type": "application/json; charset=utf-8",
  });

  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🧬 X-Men Mutant Registry listening on port ${PORT}`);
});

// Graceful shutdown
function shutdown() {
  console.log("Shutting down X-Men Mutant Registry...");

  server.close((err) => {
    if (err) {
      console.error("Error closing server:", err);
      process.exitCode = 1;
    }
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
