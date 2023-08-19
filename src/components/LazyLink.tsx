/**
 * 앞으로 Link를 사용할때는 <LazyLink/>를 사용해서 prefetch = false를 default로 놓기
 */

import Link, { LinkProps } from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
} & LinkProps;

export default function LazyLink({ children, ...props }: Props) {
  return (
    <Link {...props} prefetch={false}>
      {children}
    </Link>
  );
}
