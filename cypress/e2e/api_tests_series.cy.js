import { apiRequest } from "../support/apiUtils"; // Import the function

describe("Bank of Canada API - Series Endpoint", () => {
  const baseUrl = "https://www.bankofcanada.ca/valet";

  it("Handles successful API response", () => {
    apiRequest("/series/FXAUDCAD/json").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("seriesDetails");
      expect(response.body.seriesDetails).to.have.property("name", "FXAUDCAD");
      expect(response.body.seriesDetails).to.have.property("label", "AUD/CAD");
    });
  });

  it("Handles invalid input error gracefully", () => {
    apiRequest("/series/INVALID_INPUT/json").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.contain(
        "Series INVALID_INPUT not found.",
      );
    });
  });

  it("Handles missing data error", () => {
    apiRequest("/series/nonexistent_series/json").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.contain(
        "Series nonexistent_series not found.",
      );
    });
  });

  it("Handles server error response", () => {
    apiRequest("/series/cause_server_error/json").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.contain("Series cause_server_error not found.");
    });
  });
});
