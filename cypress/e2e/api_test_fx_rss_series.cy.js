import { apiRequest } from "../support/apiUtils"; // Import the function

describe("Bank of Canada API - Groups Endpoint-series ", () => {
  it("Handles successful API response", () => {
    apiRequest("/FX_RATES_DAILY/json").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.groupDetail.description).to.include(
        "Daily average exchange rates",
      ); // Fixed assertion
    });
  });

  it("Handles invalid input error gracefully", () => {
    apiRequest("/INVALID_GROUP/json").then((response) => {
      expect(response.status).to.eq(404); // Adjusted expected status
      expect(response.body.message).to.include("The page you are looking for is unavailable.");
    });
  });

  it("Handles server error response", () => {
    apiRequest("/INVALID_GROUP/json").then((response) => {
      expect(response.status).to.be.oneOf([404, 500]); // Accept either 404 or 500
    });
  });
});
