import { apiRequest } from "../support/apiUtils"; // Import the function

describe("Bank of Canada API - Forex Rate for CAD to USD", () => {
  const seriesName = "FXUSDCAD";

  it("Finds the average Forex conversion rate (CAD to USD) for recent 10 weeks", () => {
    apiRequest(`/observations/${seriesName}/json?recent_weeks=10`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("observations");

        const rates = response.body.observations.map((obs) =>
          parseFloat(obs[seriesName].v),
        );

        const avgRate =
          rates.reduce((sum, rate) => sum + rate, 0) / rates.length;

        expect(avgRate).to.be.a("number").and.to.be.greaterThan(0);

        cy.log(
          `Average CAD to USD conversion rate for recent 10 weeks: ${avgRate}`,
        );
      },
    );
  });
});
