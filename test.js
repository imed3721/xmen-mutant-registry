const assert = require("node:assert/strict");

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
];

function test(description, callback) {
  try {
    callback();
    console.log(`✅ ${description}`);
  } catch (error) {
    console.error(`❌ ${description}`);
    throw error;
  }
}

// Test 1: Ensure the registry contains at least three mutants.
test("Registry contains at least three mutants", () => {
  assert.ok(
    mutants.length >= 3,
    `Expected at least 3 mutants, but found ${mutants.length}`
  );
});

// Test 2: Ensure required mutants are registered.
const expectedCodenames = [
  "Wolverine",
  "Storm",
  "Cyclops",
];

for (const codename of expectedCodenames) {
  test(`${codename} is registered`, () => {
    assert.ok(
      mutants.some((mutant) => mutant.codename === codename),
      `Expected to find mutant with codename "${codename}"`
    );
  });
}

// Test 3: Validate each mutant's required fields.
test("Every mutant has a name, codename, and power", () => {
  for (const mutant of mutants) {
    assert.ok(
      typeof mutant.name === "string" && mutant.name.trim().length > 0,
      "Every mutant must have a non-empty name"
    );

    assert.ok(
      typeof mutant.codename === "string" &&
        mutant.codename.trim().length > 0,
      "Every mutant must have a non-empty codename"
    );

    assert.ok(
      typeof mutant.power === "string" && mutant.power.trim().length > 0,
      "Every mutant must have a non-empty power"
    );
  }
});

// Test 4: Ensure codenames are unique.
test("All mutant codenames are unique", () => {
  const codenames = mutants.map((mutant) => mutant.codename);

  assert.equal(
    new Set(codenames).size,
    codenames.length,
    "Duplicate mutant codenames were found"
  );
});

console.log("\n🧬 All X-Men Mutant Registry tests passed!");
