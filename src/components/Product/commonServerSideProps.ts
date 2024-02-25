import { GetServerSideProps, GetServerSidePropsContext } from "next";
import QUERYKEYS from "@/constants/querykey";
import { loadProductDetail } from "@/api/shop";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const commonServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();
  const { productId } = context.query; // context에서 productId를 가져옵니다.
  // Prefetch queries
  if (productId) {
    const numericProductId = Number(productId);
    await queryClient.prefetchQuery(
      [QUERYKEYS.LOAD_PRODUCT_DETAIL, numericProductId],
      () => loadProductDetail(numericProductId),
    );
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default commonServerSideProps;
