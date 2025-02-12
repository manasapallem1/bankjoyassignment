export function apiRequest(
  endpoint,
  method = "GET",
  failOnStatusCode = false,
  headers = { accept: "application/json" },
) {
  return cy.request({
    method,
    url: `${Cypress.config("baseUrl")}${endpoint}`,
    failOnStatusCode,
    headers,
  });
}

export function fetchLists(type, format) {
  return cy.request({
    method: "GET",
    url: `${Cypress.config("baseUrl")}/lists/${type}/${format}`,
    failOnStatusCode: false,
    headers: {
      accept: "application/json",
    },
  });
}
