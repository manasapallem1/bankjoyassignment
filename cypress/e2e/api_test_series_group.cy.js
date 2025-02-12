import { apiRequest } from "../support/apiUtils"; // Import the function

describe("Bank of Canada API - Groups Endpoint", () => {
  it("Handles successful API response", () => {
    apiRequest("/groups/FX_RATES_DAILY/json").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("groupDetails");
      expect(response.body.groupDetails).to.have.property(
        "name",
        "FX_RATES_DAILY",
      );
      expect(response.body.groupDetails)
        .to.have.property("description")
        .and.to.contain("Daily average exchange rates - published once each business day by 16:30 ET. All Bank of Canada exchange rates are indicative rates only.");
    });
  });

  it("Handles invalid input error gracefully", () => {
    apiRequest("/groups/INVALID_INPUT/json").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.contain(
        "Group INVALID_INPUT not found.",
      );
    });
  });

  it("Handles missing data error", () => {
    apiRequest("/groups/nonexistent_group/json").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.contain(
        "Group nonexistent_group not found.",
      );
    });
  });

  it("Handles server error response", () => {
    apiRequest("/groups/cause_server_error/json").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.contain("Group cause_server_error not found.");
    });
  });
});
