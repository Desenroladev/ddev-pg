export class DatabaseError extends Error {

    constructor(err: Error) {
        super(err.message);
        this.name = 'DatabaseError';
    }

}