import API from "../../../src/api/config";

describe("purchase e2e test", () => {
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
        { fixture: "preparePayment.json" },
      ).as("paymentPrepare");
    });
    // cy.intercept({
    //   method: "PUT",
    //   url: `${API.UPDATE_ADDRESS}`,
    // });
    // cy.intercept({
    //   method: "PUT",
    //   url: `${API.UPDATE_PHONENUMBER}`,
    // });
  });

  it("장바구니에 있는 상품 전체 구매하기 사전 검증 성공 확인 및 pg사 호출 테스트", () => {
    cy.intercept(
      {
        method: "GET",
        url: `${API.CART}`,
      },
      { fixture: "cartProducts.json" },
    );
    cy.intercept(
      {
        method: "POST",
        url: `${API.ORDERS}`,
      },
      { fixture: "virtualCartOrder.json" },
    );
    cy.intercept("GET", "https://service.iamport.kr/users/pg/imp47805780", {
      fixture: "productDetail.json",
    });
    cy.visit(
      "http://localhost:3000/mypage?tab=%EC%9E%A5%EB%B0%94%EA%B5%AC%EB%8B%88",
    );
    cy.contains("전체상품 주문").click();
    cy.contains("사용가능한 쿠폰이 1장 있어요.").click();
    cy.contains("테스트 쿠폰").click();
    cy.contains("일반결제").click();
    cy.contains("결제하기").click();
    cy.wait("@paymentPrepare").then((interception) => {
      expect(interception?.response?.statusCode).to.equal(200);
    });
  });
  it("상품 상세페이지에서 바로 구매하기 사전 검증 성공 확인 및 pg사 호출 테스트", () => {
    cy.intercept("GET", "/_next/data/development/product.json?productId=14", {
      fixture: "productDetail.json",
    });
    cy.intercept(
      {
        method: "GET",
        url: `${API.CART}`,
      },
      { fixture: "directProduct.json" },
    );
    cy.intercept(
      {
        method: "POST",
        url: `${API.ORDERS}`,
      },
      { fixture: "virtualDirectOrder.json" },
    );
    cy.contains("와이드 로우 핀턱 팬츠 연그레이").click();
    cy.get("[data-cy='color-button']").click();
    cy.get("[data-cy='size-button']").eq(0).click();
    cy.contains("구매하기").click();
    cy.contains("사용가능한 쿠폰이 1장 있어요.").click();
    cy.contains("테스트 쿠폰").click();
    cy.contains("일반결제").click();
    cy.contains("결제하기").click();
    cy.wait("@paymentPrepare").then((interception) => {
      expect(interception?.response?.statusCode).to.equal(200);
    });
  });
});
