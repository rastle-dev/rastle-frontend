import styled from "styled-components";

import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";

import React, { useState } from "react";

import Icon from "@/components/Common/Icon";
import useLoginInfo from "@/hooks/mypage/loginInfo/useLoginInfo";

const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 3rem 2rem 3rem;
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
export default function EnterDeleteUserModal() {
  const { deleteUser } = useLoginInfo();
  const [isConfirmChecked, setIsConfirmChecked] = useState(false);

  return (
    <Wrapper>
      <h2>탈퇴하기 전에 아래의 정보를 꼭 확인해주세요.</h2>
      <p>• 탈퇴 시, 현재 사용 중인 계정을 더 이상 사용할 수 없게 됩니다.</p>
      <p>
        • 현재 사용 중이신 계정으로 로그인 되어 있던 모든 기기에서 자동으로
        로그아웃 됩니다.
      </p>
      <p>• 한번 삭제된 계정은 이전 상태로 복구할 수 없습니다.</p>
      <p>• 해당 이메일로는 3개월이 지난 이후에 다시 가입하실 수 있습니다</p>

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
          <span>
            {isConfirmChecked
              ? "위 내용을 모두 확인하였습니다."
              : "위 내용을 모두 확인하였습니다."}
          </span>
        </ConfirmCheckBox>
        <EnterButton
          title="탈퇴하기"
          onClick={deleteUser}
          disabled={!isConfirmChecked}
        />
      </BottomWrapper>
    </Wrapper>
  );
}
