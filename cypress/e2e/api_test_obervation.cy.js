import { apiRequest } from "../support/apiUtils"; // Import the function

describe("Bank of Canada API - Observations Group Endpoint", () => {
    const validGroup="FX_RATES_DAILY"
    const invalidGroup="XYZGROUp"
  it("Handles successful API response", () => {
    apiRequest(
      `/observations/group/${validGroup}/json?start_date=2023-01-23&end_date=2023-07-19`,
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("seriesDetail");
      expect(response.body.seriesDetail).to.have.property("FXUSDCAD");
      expect(response.body)
        .to.have.property("observations")
        .that.is.an("array");
    });
  });

  it("Handles invalid group name error gracefully", () => {
    apiRequest(`/observations/group/${invalidGroup}/json`).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.contain(`Group ${invalidGroup} not found`);
    });
  });

  it("Handles server error response", () => {
    apiRequest(`/observations/group/NONEXISTENT_GROUP/json`).then(
      (response) => {
        expect([404, 500]).to.include(response.status);
      },
    );
  });
});
