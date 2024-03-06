import API from "../../../src/api/config";

describe("purchase e2e test", () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.intercept(
        {
          method: "GET",
          url: `${API.CART}`,
        },
        { fixture: "cartProduct.json" },
      );
      cy.visit(
        "http://localhost:3000/mypage?tab=%EC%9E%A5%EB%B0%94%EA%B5%AC%EB%8B%88",
      );
    });
  });

  it("장바구니에 있는 상품 한 개 구매하기 사전 검증 성공 확인 및 pg사 호출 테스트", () => {
    cy.intercept(
      {
        method: "POST",
        url: `${API.ORDERS}`,
      },
      { fixture: "virtualOrder.json" },
    );
    cy.intercept(
      {
        method: "GET",
        url: `${API.MEMBER}`,
      },
      { fixture: "memberInfo.json" },
    );
    cy.intercept(
      {
        method: "GET",
        url: `${API.LOAD_ADDRESS}`,
      },
      { fixture: "defaultAddress.json" },
    );
    cy.intercept(
      {
        method: "GET",
        url: `${API.COUPON}`,
      },
      { fixture: "coupon.json" },
    );
    cy.intercept(
      {
        method: "POST",
        url: `${API.PAYMENTPREPARE}`,
      },
      {
        merchant_uid: "17097382350326",
        couponId: 1,
        deliveryPrice: 3000,
      },
    );
    cy.intercept({
      method: "PUT",
      url: `${API.UPDATE_ADDRESS}`,
    });
    cy.intercept({
      method: "PUT",
      url: `${API.UPDATE_PHONENUMBER}`,
    });
    // cy.contains("와이드 로우 핀턱 팬츠 연그레이").parent().click();
    cy.get("[data-cy='purchase-button']").click();
    cy.contains("사용가능한 쿠폰이 1장 있어요.").click();
    cy.contains("테스트 쿠폰").click();
    cy.contains("카카오페이").click();
    cy.contains("결제하기").click();
  });
});
