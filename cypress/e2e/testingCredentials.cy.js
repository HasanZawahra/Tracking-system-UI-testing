import { cp } from '../pages/CredentialsPage.js'

describe('Testing entering the credentials feature', () => {
  beforeEach(() => {
    cy.fixture('credentialsData.json').then((data) => {
      cy.visit(data.link)
    })
  })

  it('valid credentials',()=>{
    cy.fixture('credentialsData.json').then((data) => {
      cp.enterId(data.valid_credentials.id);
      cp.enterPassword(data.valid_credentials.password);
      cp.checkVisibilityBefore();
      cp.clickTrackButton();
      cp.checkSuccessMessage(data.valid_credentials.message);
      cp.checkVisibilityAfter(data.valid_credentials.texts[0],
         data.valid_credentials.texts[1],
         data.valid_credentials.texts[2], 
         data.valid_credentials.texts[3], 
         data.valid_credentials.texts[4], 
         data.valid_credentials.texts[5],
         data.valid_credentials.buttons.done,
         data.valid_credentials.buttons.pending,
         data.valid_credentials.buttons.rejected
        );
    })
  })
  
  it('empty credentials',()=>{
    cy.fixture('credentialsData.json').then((data) => {
      cp.clickTrackButton();
      cp.checkErrorMessage(data.empty_credentials.message);
    })
  })


  it('wrong password',()=>{
    cy.fixture('credentialsData.json').then((data) => {
      cp.enterId(data.wrong_password.id);
      cp.enterPassword(data.wrong_password.password);
      cp.clickTrackButton();
      cp.checkErrorMessage(data.wrong_password.message);
    })
  })

  it('wrong id',()=>{
    cy.fixture('credentialsData.json').then((data) => {
      cp.enterId(data.wrong_id.id);
      cp.enterPassword(data.wrong_id.password);
      cp.clickTrackButton();
      cp.checkErrorMessage(data.wrong_id.message);
    })
  })

  it('wrong id and password',()=>{
    cy.fixture('credentialsData.json').then((data) => {
      cp.enterId(data.wrong_id_and_password.id);
      cp.enterPassword(data.wrong_id_and_password.password);
      cp.clickTrackButton();
      cp.checkErrorMessage(data.wrong_id_and_password.message);
    })
  })
  
  it('empty password',()=>{
    cy.fixture('credentialsData.json').then((data) => {
      cp.enterId(data.empty_password.id);
      cp.clickTrackButton();
      cp.checkErrorMessage(data.empty_password.message);
    })
  })

  it('empty id',()=>{
    cy.fixture('credentialsData.json').then((data) => {
      cp.enterPassword(data.empty_id.password);
      cp.clickTrackButton();
      cp.checkErrorMessage(data.empty_id.message);
    })
  })
})