import API from "../../../src/api/config";

describe("login e2e test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("로그인 성공", () => {
    cy.intercept({
      method: "POST",
      url: `${API.LOGIN}`,
    }).as("loginSuccess");

    cy.contains("이메일 주소")
      .parent()
      .type(`${Cypress.env("CYPRESS_TEST_EMAIL")}`);
    cy.contains("비밀번호")
      .parent()
      .type(`${Cypress.env("CYPRESS_TEST_PASSWORD")}`);
    cy.contains("로그인").click();
    cy.wait("@loginSuccess")
      .its("response.body")
      .then((data) => {
        expect(data.data).to.equal("로그인 성공");
        cy.location("pathname", { timeout: 5000 }).should("equal", "/");
      });
  });
  it("로그인 실패", () => {
    cy.intercept(
      {
        method: "POST",
        url: `${API.LOGIN}`,
      },
      // { statusCode: 500, message: "자격 증명에 실패하였습니다." },
    ).as("loginSuccess");

    cy.contains("이메일 주소").parent().type("test@fail.com");
    cy.contains("비밀번호").parent().type("1234");
    cy.contains("로그인").click();
    cy.wait("@loginSuccess")
      .its("response.body")
      .then((data: any) => {
        expect(data.errorCode).to.equal(500);
      });
  });
});
