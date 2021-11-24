/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

const app = require('../app');
const request = require('supertest');

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

describe('Backendtests', () => {
  let bubbleId = '';
  afterAll(() => {
    //  app.close();
  });

  /*-------------------------------------------------------------*/
  /*User Test*/
  /*-------------------------------------------------------------*/
  test('Create Bubble', async () => {
    const response = await request(app)
      .post('/api/bubble/createBubble')
      .send({
        title: 'test',
        email: 'schweiz.vogel@gmail.com',
        timezone: 'UTC+1',
        dates: [],
        options: {
          anonym: true,
          onlyOne: false,
          maybe: true,
        },
        location: 'Russikon',
        additionalInformation: 'bla bla bla',
      })
      .expect(201);
    bubbleId = response.shortId;
  });

  test('get Bubble', async () => {
    await request(app).get(`/api/bubble/getBubble/${bubbleId}`).expect(200);
  });

  test('Add Participant', async () => {
    await request(app)
      .post('/api/bubble/addParticipant/:id')
      .send({
        name: 'Leo',
        dates: ['2021-11-23T12:03:54.888+00:00'],
      })
      .expect(200);
  });

  /*-------------------------------------------------------------*/
  /*PracticeUse Test*/
  /*-------------------------------------------------------------*/
});

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
