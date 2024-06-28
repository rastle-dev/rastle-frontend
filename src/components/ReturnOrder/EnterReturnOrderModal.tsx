import styled from "styled-components";
import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";
import React, { useState } from "react";
import Icon from "@/components/Common/Icon";
import useOrderCancel from "@/hooks/useOrderCancel";
import { ReturnInfo } from "@/interface/Return/returnInfo";

const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem 3rem 2rem 3rem;
  h2 {
    text-align: left;
    font-size: 2rem;
    padding-bottom: 2rem;
    color: ${COLORS.블루};
  }
  p {
    font-weight: 300;
    font-size: 1.2rem;
  }
  h4 {
    font-size: 1.2rem;
    color: ${COLORS.RED};
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5rem;
  justify-content: space-between;
  align-items: center;
`;

interface ConfirmCheckBoxProps {
  isChecked?: boolean;
}

const ConfirmCheckBox = styled.div<ConfirmCheckBoxProps>`
  cursor: pointer;
  span {
    padding-left: 0.6rem;
    color: ${(props) => (props.isChecked ? "black" : "grey")};
  }
`;

const EnterButton = styled(Button)`
  border-radius: 0.625rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 1.3rem;
  float: right; /* 오른쪽으로 이동 */
  font-weight: 500;
  &:focus {
    border: none;
  }
`;

type EnterReturnOrderModalProps = {
  returnInfo: ReturnInfo;
};

export default function EnterReturnOrderModal({
  returnInfo,
}: EnterReturnOrderModalProps) {
  const { mutateRequestUserReturn } = useOrderCancel();
  const [isConfirmChecked, setIsConfirmChecked] = useState(false);
  return (
    <Wrapper>
      <h2>반품 신청 전, 꼭 확인해주세요!</h2>
      <p>•해당 제품은 반품 신청일 기준 다음날 14시에 수거할 예정이에요.</p>
      <p>•그 전에 꼭 제품을 문 앞에 놔둬주세요!</p>
      <p>•반품 신청하신 제품은 영업일 기준 2~3일 안에 환불될 예정이요.</p>
      <p>•궁금하신 점은 010-9290-7140 으로 문의 주시면 감사하겠습니다.😊</p>

      <BottomWrapper>
        <ConfirmCheckBox
          isChecked={isConfirmChecked}
          onClick={() => {
            setIsConfirmChecked((prev) => !prev);
          }}
        >
          {isConfirmChecked ? (
            <Icon
              iconSize="1.6rem"
              mobileIconSize="1.6rem"
              border={0.1}
              iconName="checkCircleFill"
              color={COLORS.BLACK}
            />
          ) : (
            <Icon
              iconSize="1.6rem"
              mobileIconSize="1.6rem"
              border={0.5}
              iconName="checkCircle"
              color={COLORS.GREY[400]}
            />
          )}
          <span>위 내용을 모두 확인하였습니다.</span>
        </ConfirmCheckBox>
        <EnterButton
          title="반품 신청하기"
          onClick={() => mutateRequestUserReturn.mutate(returnInfo)}
          disabled={!isConfirmChecked}
        />
      </BottomWrapper>
    </Wrapper>
  );
}
