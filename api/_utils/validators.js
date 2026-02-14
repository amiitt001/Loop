
// Response Constraints
const MAX_RESPONSES = 50;
const MAX_QUESTION_LENGTH = 200;
const MAX_ANSWER_LENGTH = 1000;

/**
 * Validates the responses array.
 * @param {Array} responses - The responses array.
 * @returns {Object} - { valid: boolean, reason: string }
 */
export function validateResponses(responses) {
    if (!responses) return { valid: true }; // Optional field

    if (!Array.isArray(responses)) {
        return { valid: false, reason: 'Responses must be an array' };
    }

    if (responses.length > MAX_RESPONSES) {
        return { valid: false, reason: `Too many responses (max ${MAX_RESPONSES})` };
    }

    for (const response of responses) {
        if (typeof response !== 'object' || response === null) {
            return { valid: false, reason: 'Invalid response format' };
        }

        const { question, answer } = response;

        if (question && typeof question !== 'string') {
            return { valid: false, reason: 'Question must be a string' };
        }
        if (question && question.length > MAX_QUESTION_LENGTH) {
            return { valid: false, reason: `Question too long (max ${MAX_QUESTION_LENGTH} chars)` };
        }

        if (answer && typeof answer !== 'string') {
            return { valid: false, reason: 'Answer must be a string' };
        }
        if (answer && answer.length > MAX_ANSWER_LENGTH) {
            return { valid: false, reason: `Answer too long (max ${MAX_ANSWER_LENGTH} chars)` };
        }
    }

    return { valid: true };
}
