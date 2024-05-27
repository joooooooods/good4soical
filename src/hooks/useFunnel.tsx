import React, { ReactElement, ReactNode, useState } from 'react';

export interface StepProps {
    name: string;
    children: ReactNode;
}

export interface FunnelProps {
    children: Array<ReactElement<StepProps>>;
}

const useFunnel = (defaultStep: string) => {
    // state를 통해 현재 스텝을 관리한다.
    // setStep 함수를 통해 현재 스텝을 변경할 수 있다.
    const [step, setStep] = useState(defaultStep);

    // 각 단계를 나타내는 Step 컴포넌트
    // children을 통해 각 스텝의 컨텐츠를 렌더링 한다.
    const Step = (props: StepProps): ReactElement => {
        return <>{props.children}</>;
    };

    // 여러 단계의 Step 컴포넌트 중 현재 활성화된 스텝을 렌더링하는 Funnel
    // find를 통해 Step 중 현재 Step을 찾아 렌더링
    const Funnel = ({ children }: FunnelProps) => {
        const targetStep = children.find(
            childStep => childStep.props.name === step
        );

        return (
            <section className='mt-[40px]'>
                {step === 'Q1' && (
                    <p className='mb-[20px]'>
                        몇 가지 정보를 알려주시면 지원할 수 있는 대학을
                        추천해드려요.
                    </p>
                )}
                {targetStep}
            </section>
        );
    };

    return { Funnel, Step, setStep, currentStep: step } as const;
};

export default useFunnel;
