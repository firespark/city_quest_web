
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import authStyle from '../../styles/authStyle.module.css'

import checkTrue from '../../../assets/img/check-true.png'
import checkFalse from '../../../assets/img/check-false.png'

type AgreementProps = {
    agree: boolean
    setAgree: Dispatch<SetStateAction<boolean>>
}

export const Agreement = ({ agree, setAgree }: AgreementProps) => {

    return (
        <button
            type="button"
            className={`${mainStyle.plainButton} ${authStyle.authContainer} ${mainStyle.mt10}`}
            onClick={() => setAgree(!agree)}
            aria-pressed={agree}
        >
            <img
                src={agree ? checkTrue : checkFalse}
                className={mainStyle.checkbox}
                alt=""
            />

            <span className={mainStyle.checkboxText}>
                Соглашаюсь на обработку моих персональных данных
            </span>
        </button>
    )
}
