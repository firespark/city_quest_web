
import type { Dispatch, SetStateAction } from 'react'

import formsStyle from '../../styles/formsStyle.module.css'

type AgreementProps = {
    agree: boolean
    setAgree: Dispatch<SetStateAction<boolean>>
}

export const Agreement = ({
    agree,
    setAgree
}: AgreementProps) => {

    return (
        <label className={formsStyle.blockAgreement}>
            <input
                type="checkbox"
                className={formsStyle.blockCheckbox}
                checked={agree}
                onChange={event => setAgree(event.target.checked)}
            />

            <span>
                Соглашаюсь на обработку моих персональных данных
            </span>
        </label>
    )
}
