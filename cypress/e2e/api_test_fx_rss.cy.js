import { apiRequest } from "../support/apiUtils"; // Import the function

describe("Bank of Canada API - Foreign Exchange Rates in RSS", () => {
  it("Handles successful API response", () => {
    apiRequest("/fx_rss").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include(
        "application/rss+xml",
      );

      expect(response.body).to.include('<?xml version="1.0"');
      expect(response.body).to.match(/<rdf:RDF[\s\S]*<\/rdf:RDF>/); // Regex check for RDF structure
    });
  });

  it("Handles invalid input error gracefully", () => {
    apiRequest("/fx_rss/INVALID_INPUT").then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("Handles server error response", () => {
    apiRequest("/fx_rss/error").then((response) => {
      expect([404, 500]).to.include(response.status);
    });
  });
});
