import React from 'react';
import { Question } from '../../../global/types';

type PreviousQuestionsProps = {
    answeredQuestions: Question[];
};

const PreviousQuestions = ({ answeredQuestions }: PreviousQuestionsProps): JSX.Element => {
    if (answeredQuestions?.length) {
        return (
            <div>
                <h4>Previous Questions and Answers</h4>
                <ul>
                    {answeredQuestions.map((item, index) => (
                        <li key={`question_${index}`}>{item.question}: {item.answer}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return <></>;
};

export default PreviousQuestions;