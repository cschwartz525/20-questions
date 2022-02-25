import React from 'react';
import { Question } from '../../../global/types';

type PreviousQuestionsProps = {
    answeredQuestions: Question[];
};

const PreviousQuestions = ({ answeredQuestions }: PreviousQuestionsProps): JSX.Element => {
    if (answeredQuestions?.length) {
        return (
            <ul>
                {answeredQuestions.map((item, index) => (
                    <li key={`question_${index}`}>{item.question}: {item.answer}</li>
                ))}
            </ul>
        );
    }

    return <></>;
};

export default PreviousQuestions;