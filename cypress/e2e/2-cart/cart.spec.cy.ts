import API from "../../../src/api/config";

describe("cart e2e test", () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.intercept(
        {
          method: "GET",
          url: `${API.MEMBER}`,
        },
        { fixture: "memberInfo.json" },
      );
      cy.intercept(
        {
          method: "POST",
          url: `${API.CART}`,
        },
        { statusCode: 200, data: "장바구니에 상품이 추가되었습니다." },
      ).as("addCartSuccess");
      cy.intercept(
        {
          method: "GET",
          url: `${API.CART}`,
        },
        { fixture: "cartProduct.json" },
      );
      cy.intercept(
        {
          method: "DELETE",
          url: `${API.CART}${API.REMOVE}?deleteCartProductIdList=1`,
        },
        {
          data: "장바구니에서 선택한 상품이 삭제되었습니다.",
        },
      );
    });
  });

  it("Desktop - 장바구니에 상품 담기 및 상품 전체 삭제 테스트", () => {
    cy.contains("와이드 로우 핀턱 팬츠 연그레이").click();
    cy.get("[data-cy='color-button']").click();
    cy.get("[data-cy='size-button']").eq(0).click();
    cy.contains("장바구니에 담기").click();
    cy.wait("@addCartSuccess").then((interception) => {
      expect(interception?.response?.statusCode).to.equal(200);
    });
    cy.contains("장바구니로 이동하기").click();
    cy.contains("장바구니 비우기").click();
    cy.intercept(
      {
        method: "GET",
        url: `${API.CART}`,
      },
      { fixture: "emptyCart.json" },
    ).as("emptyCart");
    cy.contains("장바구니에 상품이 없어요.", {
      timeout: 3000,
    }).should("exist");
  });
  it("Mobile - 상품 개별 삭제 테스트 ", () => {
    cy.viewport(390, 844);
    cy.get("[data-cy='person-button']").click();
    cy.contains("장바구니").click();
    cy.intercept(
      {
        method: "GET",
        url: `${API.CART}`,
      },
      { fixture: "emptyCart.json" },
    ).as("emptyCart");
    cy.get("[data-cy='mobile-delete-button']").click();
    cy.contains("장바구니에 상품이 없어요.", {
      timeout: 3000,
    }).should("exist");
  });
});
