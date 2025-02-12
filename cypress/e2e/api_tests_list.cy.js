import { fetchLists } from "../support/apiUtils";
import { listResponseSchema } from "../support/schemas";
import { apiRequest } from "../support/apiUtils"; // Import the function

describe("Bank of Canada List-Automation ", () => {
  it("Validates the response for groups list and checks schema", () => {
    fetchLists("groups", "json").then((response) => {
      cy.log(response.body);
      expect(response.status).to.eq(200);
      expect(response.body).to.be.jsonSchema(listResponseSchema); // Schema validation
    });
  });

  it("Handles invalid input error gracefully", () => {
    apiRequest("/lists/invalid_type/json").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property(
        "message",
        "invalid_type is not valid, use series or group.",
      );
    });
  });

  it("Handles missing data error gracefully", () => {
    apiRequest("lists/nonexistent_series/json").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property(
        "message",
        "nonexistent_series is not valid, use series or group.",
      );
    });
  });

  it("Handles server error gracefully", () => {
    fetchLists("series", "json").then((response) => {
      if (response.status === 500) {
        cy.log("Server error encountered, retrying...");
      }
    });
  });
});
