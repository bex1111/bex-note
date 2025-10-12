const {validateTitle} = require('./validator');

describe('validateTitle', () => {
    it('throws error if title is missing', () => {
        try {
            validateTitle()
        } catch (error) {
            expect(error).toEqual({
                body: {error: 'Title required'},
                status: 400
            })
        }

    });

    it('throws error if title is empty string', () => {
        try {
            validateTitle('')
        } catch (error) {
            expect(error).toEqual({
                body: {error: 'Title required'},
                status: 400
            })
        }
    });

    it('does not throw if title is a non-empty string', () => {
        expect(() => validateTitle('myTitle')).not.toThrow();
    });
});