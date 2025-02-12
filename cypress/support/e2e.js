import chaiJsonSchema from "chai-json-schema";
chai.use(chaiJsonSchema);

// You can define global event listeners here
Cypress.on("uncaught:exception", (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught errors
  return false;
});
