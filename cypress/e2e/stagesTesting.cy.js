import { cp } from '../pages/TrackingPage.js'

const setUp = () =>{
 return( cy.fixture('TrackingData.json').then((data) => {
    cy.visit(data.link);
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
  }))
}

describe('Testing Stages', () => {
describe('Suite 1', () => {
    beforeEach(() => {
      setUp()
    })
    
  / it('confirm that the buttons in any of the next stages are disabled',()=>{
      cy.fixture('TrackingData.json').then((data) => {
        for (let i = 1; i < 6; i++) {
          cp.checkDisabledButtons(i)
        }
        cp.checkSuccessMessage(data.valid_credentials.message)
      })
    })

  / it('confirm that the pending button is disabled in the pending state',()=>{
        cp.checkDisablePendingButton(0);
    })
    
  / it('click the rejected button in the pending state',()=>{
        cy.rejectionCause(0).should('not.be.visible')
        cy.causeSubmit(0).should('not.be.visible')
        cp.clickRejectedButton(0);
        cy.rejectionCause(0).should('be.visible')
        cy.causeSubmit(0).should('be.visible')
    })
    })

    describe('Suite 2', () => {
      beforeEach(() => {
        setUp()
        cp.clickRejectedButton(0);
      })
  /   it('submit empty rejection reason',()=>{
       cy.fixture('TrackingData.json').then((data) => {
          cy.rejectionCause(0).should('be.visible')
          cy.causeSubmit(0).should('be.visible').click();
          cp.checkErrorMessage(data.empty_reason_field_message)
       })
     })
     
     / it('submit rejection reason', ()=>{
       cy.fixture('TrackingData.json').then((data) => {
         cy.rejectionCause(0).should('be.visible').type(data.rejection_reason)
         cy.causeSubmit(0).should('be.visible').click();
         cp.checkRejectedMessage(0)
         cp.checkDisableRejectedButton(0)
         cy.rejectionCause(0).should('be.disabled')
         cy.causeSubmit(0).should('be.disabled')
        })
      })
      
    })
  
    describe('Suite 3', () => {
      beforeEach(() => {
        setUp()
        cp.checkRejectedState(0).then((isDisabled) => {
          if (!isDisabled) {
              cy.fixture('TrackingData.json').then((data) => {
                  cp.clickRejectedButton(0);
                  cy.rejectionCause(0).should('be.visible').type(data.rejection_reason);
                  cy.causeSubmit(0).should('be.visible').click();
                  cp.checkRejectedMessage(0);
                  cp.checkDisableRejectedButton(0);
                  cy.rejectionCause(0).should('be.disabled');
                  cy.causeSubmit(0).should('be.disabled');
              });
          }
      });
  });

    it('click the pending button in the rejected state', ()=>{
        cp.checkDisableRejectedButton(0)
        cp.clickPendingButton(0);
        cy.rejectionCause(0).should('not.be.visible')
        cy.causeSubmit(0).should('not.be.visible')
        cp.checkPendingMessage(0)
      })
    })

    describe('Suite 4', () => {
      beforeEach(() => {
        setUp()
      })

  / it('click the done button in the Pending state', ()=>{
        cp.checkDisablePendingButton(0)
        cp.clickDoneButton(0);
        cp.checkDone(0)
    })

    / it('confirm that the stage is in the done stage', ()=>{
        cp.checkDisabledButtons(0)
    })

  / it('confirm that the buttons in any of the next or previous stages are disabled',()=>{
      cy.fixture('TrackingData.json').then((data) => {
        for (let i = 0; i < 6; i++) {
          if(i != 1){
            cp.checkDisabledButtons(i)
          }
        }
        cp.checkSuccessMessage(data.valid_credentials.message)
      })
    })
  })

    describe('Suite 5', () => {
    beforeEach(()=>{
      setUp()
      cy.fixture('TrackingData.json').then((data) => {
        if (!cp.checkRejectedState(1)){
        cp.clickRejectedButton(1);
        cy.rejectionCause(1).should('be.visible').type(data.rejection_reason)
        cy.causeSubmit(1).should('be.visible').click();
        cp.checkRejectedMessage(1)
        cp.checkDisableRejectedButton(1)
        cy.rejectionCause(1).should('be.disabled')
        cy.causeSubmit(1).should('be.disabled')
      }
    })
    })

      it('click the done button in the rejected state', ()=>{
      cy.fixture('TrackingData.json').then((data) => {
        cp.clickDoneButton(1);
        cy.rejectionCause(1).should('not.be.visible')
        cy.causeSubmit(1).should('not.be.visible')
        cp.checkDone(1)
        cp.checkDisabledButtons(1)
      })
    })
    })
    
    describe('Suite 6', () => {
      beforeEach(()=>{
      setUp()
    })

      it('confirm that the buttons in any of the next or previous stages are disabled',()=>{
         for (let i = 2; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
             if(j != i){
                cp.checkDisabledButtons(j)
              }
            }
            cp.clickDoneButton(i);
            cp.checkDone(i)
            cp.checkDisabledButtons(i)
         }
        })
     })

    after(() => {
      cy.task('overwriteDataFile');
    });
})