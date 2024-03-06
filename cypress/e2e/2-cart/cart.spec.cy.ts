import API from "../../../src/api/config";

describe("cart e2e test", () => {
  beforeEach(() => {
    cy.login();
  });

  it("장바구니에 상품 담기 성공", () => {
    cy.contains("와이드 로우 핀턱 팬츠 연그레이").click();
    cy.intercept(
      {
        method: "POST",
        url: `${API.CART}`,
      },
      { statusCode: 200, data: "장바구니에 상품이 추가되었습니다." },
    ).as("addCartSuccess");
    cy.get("[data-cy='color-button']").click();
    cy.get("[data-cy='size-button']").eq(0).click();
    cy.contains("장바구니에 담기").click();
    cy.wait("@addCartSuccess").then((interception) => {
      expect(interception?.response?.statusCode).to.equal(200);
    });
  });
});
