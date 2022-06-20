const mongoose = require('mongoose');
const Score = require('./models/score')

const dbURI = 'mongodb+srv://rluser:RacingLines123@cluster0.vehm5.mongodb.net/RacingLinesDatabase?retryWrites=true&w=majority';

describe("Connection", () => {
    beforeAll(async () => {
        await mongoose.connect(dbURI)
            .then(() => console.log('connected to db'))
            .catch((err) => console.log(err));
    });

    test("Retrieve Score by Id", async () => {
        const id = '62925edd58c810164db79158';
        const score =  await Score.findById(id);
        expect(score.score).toBe(20);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

});